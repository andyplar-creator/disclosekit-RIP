// Sonda: router Cloudflare Workera.
//
// Strony publiczne:   /<slug>, /<slug>/dziekuje, /polityka-prywatnosci, /regulamin
// API publiczne:      POST /api/<slug>/lead | event | checkout | demo
// Stripe:             POST /stripe/webhook
// Panel wlasciciela:  /admin, /admin/selftest, /admin/x/<slug>

import { EXPERIMENTS, findExperiment, livePasteOn, statusOf, validateExperiment } from './experiments';
import { runAudit } from './lib/audit';
import {
  adVisitorsByTerm,
  funnelStats,
  getOrderBySession,
  insertLead,
  insertOrderStarted,
  listAdReports,
  listLeads,
  listOrders,
  setLeadStatus,
  markOrderExpired,
  markOrderPaid,
  recentEvents,
  recordEvent,
  upsertAdReport,
  visitorCameFromAd,
} from './lib/db';
import { demoIsConfigured, MAX_DEMO_INPUT_CHARS } from './lib/demo-config';
import { htmlHeaders, newNonce, page } from './lib/html';
import {
  cleanText,
  csvCell,
  dayKey,
  dayStart,
  isBotUserAgent,
  isValidEmail,
  normalizeEmail,
  nowSeconds,
  parseAttribution,
  verifyStripeSignature,
  visitorHash,
} from './lib/pure';
import { hitRateLimit } from './lib/ratelimit';
import { adminIsConfigured, clearSessionCookie, createSessionCookie, isAdmin, tokenMatches } from './lib/session';
import { createCheckoutSession, parseStripeEvent } from './lib/stripe';
import { computeVerdict } from './lib/verdict';
import { renderDetail, renderLogin, renderOverview, renderSelftest } from './pages/admin';
import { renderLanding, renderOrderTable, renderThanks, type Flash, type LandingState } from './pages/landing';
import { renderPrivacy, renderTerms } from './pages/legal';
import type { Attribution, Env, Experiment, LeadStatus, Locale } from './types';

const DAY = 86400;
const DEV_SALT = 'sonda-dev-salt-not-for-production';

interface Ctx {
  request: Request;
  env: Env;
  url: URL;
  now: number;
  visitor: string;
  isBot: boolean;
  admin: boolean;
}

function html(body: string, nonce: string, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(body, { status, headers: htmlHeaders(nonce, extra) });
}

function redirect(location: string, extra: Record<string, string> = {}): Response {
  return new Response(null, { status: 303, headers: { Location: location, 'Cache-Control': 'no-store', ...extra } });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

function notFound(): Response {
  const nonce = newNonce();
  const body = `<main><section class="hero"><div class="wrap"><h1>404</h1><p class="lede">Nie ma takiej strony.</p></div></section></main>`;
  return html(page({ title: '404', locale: 'pl', body, nonce }), nonce, 404);
}

function refHost(request: Request, ownHost: string): string | null {
  const referer = request.headers.get('Referer');
  if (!referer) return null;
  try {
    const host = new URL(referer).host;
    return host === ownHost ? null : host.slice(0, 80);
  } catch {
    return null;
  }
}

/** Eksperyment, ktory wolno pokazac temu odwiedzajacemu. Szkice widzi tylko zalogowany wlasciciel. */
function visibleExperiment(slug: string, admin: boolean, env: Env): { experiment: Experiment; preview: boolean } | null {
  const experiment = findExperiment(slug);
  if (!experiment) return null;
  const status = statusOf(experiment, env);
  if (status === 'live') return { experiment, preview: false };
  if (status === 'draft' && admin) return { experiment, preview: true };
  return null;
}

function attributionFromForm(form: FormData): Attribution {
  const get = (name: string) => cleanText(form.get(name), 120);
  return {
    isAd: form.get('ad') === '1',
    utmSource: get('utm_source'),
    utmMedium: get('utm_medium'),
    utmCampaign: get('utm_campaign'),
    utmTerm: get('utm_term'),
  };
}

const NO_ATTRIBUTION: Attribution = { isAd: false, utmSource: null, utmMedium: null, utmCampaign: null, utmTerm: null };

function paymentsEnabled(env: Env): boolean {
  // Oba sekrety albo zaden: nie bierzemy pieniedzy, ktorych panel nie zobaczy.
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
}

// ---------------------------------------------------------------- strony publiczne

async function handleLanding(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found) return notFound();
  const { experiment, preview } = found;
  const attribution = parseAttribution(c.url.searchParams);

  if (!preview && c.request.method === 'GET') {
    try {
      await recordEvent(c.env.DB, {
        experiment: experiment.slug,
        type: 'view',
        visitor: c.visitor,
        attribution,
        isBot: c.isBot,
        refHost: refHost(c.request, c.url.host),
        detail: null,
        now: c.now,
      });
    } catch {
      console.error('landing: nie udalo sie zapisac zdarzenia view');
    }
  }

  const flashMap: Record<string, Flash> = {
    'zapis=ok': 'lead_ok',
    'zapis=duplikat': 'lead_duplicate',
    'zapis=blad': 'lead_invalid',
    'zapis=brak': 'lead_missing',
    'zapis=zgoda': 'lead_consent',
    'zapis=limit': 'rate',
    'platnosc=niedostepna': 'pay_unavailable',
    'platnosc=regulamin': 'pay_terms',
    'platnosc=anulowana': 'pay_cancelled',
    'platnosc=limit': 'rate',
  };
  let flash: Flash = null;
  for (const key of ['zapis', 'platnosc']) {
    const value = c.url.searchParams.get(key);
    if (value) flash = flashMap[`${key}=${value}`] ?? flash;
  }

  const nonce = newNonce();
  const state: LandingState = {
    nonce,
    attribution,
    flash,
    paymentsEnabled: paymentsEnabled(c.env),
    livePaste: livePasteOn(experiment, c.env) && demoIsConfigured(c.env),
    isPreview: preview,
  };
  return html(renderLanding(experiment, c.env, state), nonce);
}

async function handleThanks(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found) return notFound();
  const nonce = newNonce();
  return html(renderThanks(found.experiment, c.env, nonce), nonce);
}

function handleLegal(c: Ctx, kind: 'privacy' | 'terms'): Response {
  const locale: Locale = c.url.searchParams.get('lang') === 'en' ? 'en' : 'pl';
  const nonce = newNonce();
  return html(kind === 'privacy' ? renderPrivacy(c.env, locale, nonce) : renderTerms(c.env, locale, nonce), nonce);
}

// ---------------------------------------------------------------- API publiczne

async function handleLead(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found) return notFound();
  const { experiment, preview } = found;
  const back = (code: string) => redirect(`/${experiment.slug}?zapis=${code}#zapis`);

  let form: FormData;
  try {
    form = await c.request.formData();
  } catch {
    return back('blad');
  }

  // Pulapka na roboty: prawdziwy czlowiek nie widzi pola "website". Niczego jednak nie kasujemy po cichu:
  // podejrzane zgloszenie trafia do panelu z ocena "odrzucone", a wlasciciel moze ja zmienic.
  // (Gdyby filtr pomylil sie na prawdziwym kliencie, zgloszenie nie moze przepasc.)
  const flag: 'honeypot' | 'bot_ua' | null = cleanText(form.get('website'), 200) ? 'honeypot' : c.isBot ? 'bot_ua' : null;

  const limit = await hitRateLimit(c.env.DB, `lead:${c.visitor}`, DAY, 10, c.now);
  if (!limit.allowed) return back('limit');

  const email = normalizeEmail(String(form.get('email') ?? ''));
  if (!isValidEmail(email)) return back('blad');
  if (form.get('consent') !== '1') return back('zgoda');

  const fromForm = attributionFromForm(form);
  const isAd = fromForm.isAd || (await visitorCameFromAd(c.env.DB, experiment.slug, c.visitor, dayStart(c.now)));

  // Zgloszenie bez firmy, programu i liczby zamowien nie pozwala ocenic, czy to prawdziwy klient.
  const company = cleanText(form.get('company'), 120);
  const erp = cleanText(form.get('erp'), 120);
  const volume = cleanText(form.get('volume'), 80);
  if (!company || !erp || !volume) return back('brak');

  const created = await insertLead(c.env.DB, {
    experiment: experiment.slug,
    email,
    company,
    nip: cleanText(form.get('nip'), 20),
    erp,
    volume,
    phone: cleanText(form.get('phone'), 30),
    wantsInvoice: form.get('wants_invoice') === '1',
    flag,
    visitor: c.visitor,
    isAd,
    utmCampaign: fromForm.utmCampaign,
    utmTerm: fromForm.utmTerm,
    isTest: preview,
    now: c.now,
  });
  if (!created) return back('duplikat');

  if (!preview) {
    await recordEvent(c.env.DB, {
      experiment: experiment.slug,
      type: 'lead',
      visitor: c.visitor,
      attribution: { ...fromForm, isAd },
      isBot: flag !== null,
      refHost: null,
      detail: flag,
      now: c.now,
    });
  }
  return back('ok');
}

async function handleEvent(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found || found.preview) return new Response(null, { status: 204 });
  let target = '';
  let ad = false;
  try {
    const body = (await c.request.json()) as { target?: unknown; ad?: unknown };
    target = typeof body.target === 'string' ? body.target : '';
    ad = body.ad === true;
  } catch {
    return new Response(null, { status: 204 });
  }
  if (!/^[a-z0-9_]{1,40}$/.test(target)) return new Response(null, { status: 204 });
  const limit = await hitRateLimit(c.env.DB, `event:${c.visitor}`, DAY, 60, c.now);
  if (!limit.allowed) return new Response(null, { status: 204 });
  await recordEvent(c.env.DB, {
    experiment: found.experiment.slug,
    type: 'cta_click',
    visitor: c.visitor,
    attribution: { ...NO_ATTRIBUTION, isAd: ad },
    isBot: c.isBot,
    refHost: null,
    detail: target,
    now: c.now,
  });
  return new Response(null, { status: 204 });
}

async function handleCheckout(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found) return notFound();
  const { experiment, preview } = found;
  const back = (code: string) => redirect(`/${experiment.slug}?platnosc=${code}#zapis`);
  const preorder = experiment.offer.pilot;
  if (!preorder || !paymentsEnabled(c.env) || c.isBot) return back('niedostepna');

  let form: FormData;
  try {
    form = await c.request.formData();
  } catch {
    return back('niedostepna');
  }
  if (form.get('terms') !== '1') return back('regulamin');

  const limit = await hitRateLimit(c.env.DB, `checkout:${c.visitor}`, DAY, 10, c.now);
  if (!limit.allowed) return back('limit');

  const fromForm = attributionFromForm(form);
  const isAd = fromForm.isAd || (await visitorCameFromAd(c.env.DB, experiment.slug, c.visitor, dayStart(c.now)));
  const apiBase = c.env.STRIPE_API_BASE || 'https://api.stripe.com';

  try {
    const session = await createCheckoutSession({
      apiBase,
      secretKey: c.env.STRIPE_SECRET_KEY as string,
      amountGrossMinor: preorder.amountGrossMinor,
      currency: preorder.currency,
      productName: preorder.productName,
      locale: experiment.locale,
      successUrl: `${c.env.SITE_URL}/${experiment.slug}/dziekuje?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${c.env.SITE_URL}/${experiment.slug}?platnosc=anulowana#zapis`,
      experiment: experiment.slug,
      visitor: c.visitor,
      // Ten sam odwiedzajacy w tej samej minucie dostaje te sama sesje (podwojne klikniecie, ponowienie sieci).
      idempotencyKey: `sonda:${experiment.slug}:${c.visitor}:${Math.floor(c.now / 60)}`,
    });
    // Przekierowujemy tylko na strone platnosci Stripe (w testach: na podstawiony serwer).
    const allowedTarget = session.url.startsWith('https://checkout.stripe.com/') || Boolean(c.env.STRIPE_API_BASE);
    if (!allowedTarget) return back('niedostepna');

    await insertOrderStarted(c.env.DB, {
      experiment: experiment.slug,
      sessionId: session.id,
      amountMinor: preorder.amountGrossMinor,
      currency: preorder.currency,
      visitor: c.visitor,
      isAd,
      livemode: session.livemode,
      now: c.now,
    });
    if (!preview) {
      await recordEvent(c.env.DB, {
        experiment: experiment.slug,
        type: 'checkout_started',
        visitor: c.visitor,
        attribution: { ...fromForm, isAd },
        isBot: false,
        refHost: null,
        detail: session.livemode ? 'live' : 'test',
        now: c.now,
      });
    }
    return redirect(session.url);
  } catch {
    console.error('checkout: Stripe odrzucil utworzenie sesji');
    return back('niedostepna');
  }
}

async function handleDemo(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found || !found.experiment.demo) return json({ error: 'not_found' }, 404);
  // Demo na zywo dziala tylko w eksperymentach, ktore swiadomie je wlaczyly (livePaste: true).
  if (!livePasteOn(found.experiment, c.env)) return json({ error: 'disabled' }, 403);
  if (!demoIsConfigured(c.env)) return json({ error: 'not_configured' }, 503);
  if (c.isBot) return json({ error: 'forbidden' }, 403);

  let text = '';
  let ad = false;
  try {
    const body = (await c.request.json()) as { text?: unknown; ad?: unknown };
    text = typeof body.text === 'string' ? body.text.trim() : '';
    ad = body.ad === true;
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  if (!text) return json({ error: 'empty' }, 400);
  if (text.length > MAX_DEMO_INPUT_CHARS) return json({ error: 'too_long' }, 413);

  // Dwa limity: na odwiedzajacego i globalny dobowy (ochrona rachunku za API).
  const perVisitor = await hitRateLimit(c.env.DB, `demo:${c.visitor}`, DAY, 6, c.now);
  if (!perVisitor.allowed) return json({ error: 'rate_limited' }, 429);
  const cap = Math.max(1, Number.parseInt(c.env.DEMO_DAILY_CAP || '300', 10) || 300);
  const global = await hitRateLimit(c.env.DB, 'demo:global', DAY, cap, c.now);
  if (!global.allowed) return json({ error: 'rate_limited' }, 429);

  // Biblioteka Anthropic laduje sie dopiero tutaj, wiec nie spowalnia zwyklych wejsc na strone.
  const { extractOrder } = await import('./lib/demo');
  const result = await extractOrder(c.env, text);
  if (!result.ok) {
    const status = result.reason === 'too_long' ? 413 : result.reason === 'rate_limited' ? 429 : 502;
    return json({ error: result.reason }, status);
  }
  if (!found.preview) {
    // Zapisujemy tylko fakt uruchomienia i liczbe pozycji. Tresci wiadomosci nie zapisujemy.
    await recordEvent(c.env.DB, {
      experiment: found.experiment.slug,
      type: 'demo_run',
      visitor: c.visitor,
      attribution: { ...NO_ATTRIBUTION, isAd: ad },
      isBot: false,
      refHost: null,
      detail: `items=${result.order.items.length};clarify=${result.order.to_clarify.length}`,
      now: c.now,
    });
  }
  return json({ html: renderOrderTable(result.order, found.experiment.locale) });
}

// ---------------------------------------------------------------- Stripe webhook

async function handleStripeWebhook(c: Ctx): Promise<Response> {
  const secret = c.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return json({ error: 'webhook_not_configured' }, 503);
  const raw = await c.request.text();
  const valid = await verifyStripeSignature(raw, c.request.headers.get('Stripe-Signature'), secret, c.now);
  if (!valid) return json({ error: 'bad_signature' }, 400);
  const event = parseStripeEvent(raw);
  if (!event) return json({ error: 'bad_payload' }, 400);

  const sessionId = event.data.object.id;
  const paidNow =
    (event.type === 'checkout.session.completed' && event.data.object.payment_status === 'paid') ||
    event.type === 'checkout.session.async_payment_succeeded';

  if (paidNow) {
    const order = await getOrderBySession(c.env.DB, sessionId);
    if (order) {
      const email = event.data.object.customer_details?.email ?? null;
      const first = await markOrderPaid(c.env.DB, sessionId, email ? normalizeEmail(email) : null, c.now);
      if (first) {
        await recordEvent(c.env.DB, {
          experiment: order.experiment,
          type: 'paid',
          visitor: order.visitor,
          attribution: { ...NO_ATTRIBUTION, isAd: order.is_ad === 1 },
          isBot: false,
          refHost: null,
          detail: event.livemode ? 'live' : 'test',
          now: c.now,
        });
      }
    }
  } else if (event.type === 'checkout.session.expired') {
    await markOrderExpired(c.env.DB, sessionId);
  }
  return json({ received: true });
}

// ---------------------------------------------------------------- panel wlasciciela

function sameOrigin(c: Ctx): boolean {
  const origin = c.request.headers.get('Origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === c.url.host;
  } catch {
    return false;
  }
}

async function handleAdmin(c: Ctx, path: string): Promise<Response> {
  const nonce = newNonce();
  const secure = c.url.protocol === 'https:';
  const method = c.request.method;

  if (!adminIsConfigured(c.env)) return html(renderLogin(nonce, 'unconfigured'), nonce, 503);
  if (method === 'POST' && !sameOrigin(c)) return json({ error: 'forbidden' }, 403);

  if (path === '/admin/login' && method === 'POST') {
    const limit = await hitRateLimit(c.env.DB, `login:${c.visitor}`, 3600, 10, c.now);
    if (!limit.allowed) return html(renderLogin(nonce, 'rate'), nonce, 429);
    let token = '';
    try {
      token = String((await c.request.formData()).get('token') ?? '');
    } catch {
      token = '';
    }
    if (!tokenMatches(c.env, token)) return html(renderLogin(nonce, 'wrong'), nonce, 401);
    return redirect('/admin', { 'Set-Cookie': await createSessionCookie(c.env, c.now, secure) });
  }

  if (!c.admin) {
    if (method === 'GET' || method === 'HEAD') return html(renderLogin(nonce, 'ok'), nonce, 401);
    return json({ error: 'unauthorized' }, 401);
  }

  if (path === '/admin/logout' && method === 'POST') {
    return redirect('/admin', { 'Set-Cookie': clearSessionCookie(secure) });
  }

  if (path === '/admin' && method === 'GET') {
    const rows = await Promise.all(
      EXPERIMENTS.map(async (experiment) => {
        const stats = await funnelStats(c.env.DB, experiment.slug, 0);
        return { experiment, status: statusOf(experiment, c.env), stats, verdict: computeVerdict(stats, experiment.thresholds) };
      }),
    );
    return html(renderOverview(nonce, rows), nonce);
  }

  if (path === '/admin/selftest' && method === 'GET') {
    return html(renderSelftest(nonce, await runAudit(c.env, c.url, c.now)), nonce);
  }

  const match = /^\/admin\/x\/([a-z0-9-]+)(\/ad-report|\/leads\.csv|\/lead-status)?$/.exec(path);
  if (match) {
    const experiment = findExperiment(match[1] ?? '');
    if (!experiment) return notFound();
    const action = match[2] ?? '';

    if (action === '/ad-report' && method === 'POST') {
      const form = await c.request.formData();
      const day = String(form.get('day') ?? '');
      const clicks = Number.parseInt(String(form.get('clicks') ?? ''), 10);
      const cost = Number.parseFloat(String(form.get('cost') ?? '').replace(',', '.'));
      if (/^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isInteger(clicks) && clicks >= 0 && Number.isFinite(cost) && cost >= 0) {
        await upsertAdReport(c.env.DB, experiment.slug, { day, clicks, cost_minor: Math.round(cost * 100), currency: 'pln' }, c.now);
        return redirect(`/admin/x/${experiment.slug}?saved=1`);
      }
      return redirect(`/admin/x/${experiment.slug}`);
    }

    if (action === '/lead-status' && method === 'POST') {
      const form = await c.request.formData();
      const leadId = Number.parseInt(String(form.get('id') ?? ''), 10);
      const status = String(form.get('status') ?? '');
      const allowed: LeadStatus[] = ['new', 'qualified', 'data_received', 'disqualified'];
      if (Number.isInteger(leadId) && (allowed as string[]).includes(status)) {
        await setLeadStatus(c.env.DB, experiment.slug, leadId, status as LeadStatus);
      }
      return redirect(`/admin/x/${experiment.slug}#zgloszenia`);
    }

    if (action === '/leads.csv' && method === 'GET') {
      const leads = await listLeads(c.env.DB, experiment.slug, 5000);
      const lines = [
        ['kiedy_utc', 'email', 'firma', 'nip', 'program', 'zamowien_tygodniowo', 'telefon', 'chce_faktury', 'ocena', 'z_reklamy', 'kampania', 'fraza', 'testowy'].map(csvCell).join(','),
      ];
      for (const lead of leads) {
        lines.push(
          [
            new Date(lead.created_at * 1000).toISOString(),
            lead.email,
            lead.company,
            lead.nip,
            lead.erp,
            lead.volume,
            lead.phone,
            lead.wants_invoice ? 'tak' : 'nie',
            lead.flag ? `${lead.status} (podejrzane: ${lead.flag})` : lead.status,
            lead.is_ad ? 'tak' : 'nie',
            lead.utm_campaign,
            lead.utm_term,
            lead.is_test ? 'tak' : 'nie',
          ]
            .map(csvCell)
            .join(','),
        );
      }
      return new Response('﻿' + lines.join('\r\n') + '\r\n', {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="leady-${experiment.slug}.csv"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    if (action === '' && method === 'GET') {
      const [stats, terms, events, leads, orders, adReports] = await Promise.all([
        funnelStats(c.env.DB, experiment.slug, 0),
        adVisitorsByTerm(c.env.DB, experiment.slug, 0),
        recentEvents(c.env.DB, experiment.slug, 100),
        listLeads(c.env.DB, experiment.slug, 200),
        listOrders(c.env.DB, experiment.slug, 100),
        listAdReports(c.env.DB, experiment.slug),
      ]);
      return html(
        renderDetail(nonce, {
          experiment,
          status: statusOf(experiment, c.env),
          stats,
          verdict: computeVerdict(stats, experiment.thresholds),
          terms,
          events,
          leads,
          orders,
          adReports,
          problems: validateExperiment(experiment),
          today: dayKey(c.now),
          saved: c.url.searchParams.get('saved') === '1',
        }),
        nonce,
      );
    }
  }

  return notFound();
}

// ---------------------------------------------------------------- router

async function route(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.length > 1 && url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;
  const method = request.method;

  if (path === '/healthz') return new Response('ok', { headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' } });
  if (path === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /admin\nDisallow: /api\nDisallow: /stripe\n', { headers: { 'Content-Type': 'text/plain' } });
  }
  if (path === '/favicon.ico') return new Response(null, { status: 204 });
  if (method !== 'GET' && method !== 'HEAD' && method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD, POST' } });

  const now = nowSeconds();
  const userAgent = request.headers.get('User-Agent');
  const ip = request.headers.get('CF-Connecting-IP') ?? 'local';
  const ctx: Ctx = {
    request,
    env,
    url,
    now,
    visitor: await visitorHash(env.VISITOR_SALT || DEV_SALT, ip, userAgent ?? '', now),
    isBot: isBotUserAgent(userAgent),
    admin: await isAdmin(env, request, now),
  };

  if (path === '/stripe/webhook') return method === 'POST' ? handleStripeWebhook(ctx) : notFound();
  if (path === '/admin' || path.startsWith('/admin/')) return handleAdmin(ctx, path);

  const api = /^\/api\/([a-z0-9-]+)\/(lead|event|checkout|demo)$/.exec(path);
  if (api) {
    if (method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
    const slug = api[1] ?? '';
    switch (api[2]) {
      case 'lead':
        return handleLead(ctx, slug);
      case 'event':
        return handleEvent(ctx, slug);
      case 'checkout':
        return handleCheckout(ctx, slug);
      case 'demo':
        return handleDemo(ctx, slug);
    }
  }

  if (method === 'POST') return notFound();

  if (path === '/') {
    const target = findExperiment(env.DEFAULT_EXPERIMENT);
    if (!target) return notFound();
    return new Response(null, { status: 302, headers: { Location: `/${target.slug}${url.search}`, 'Cache-Control': 'no-store' } });
  }
  if (path === '/polityka-prywatnosci') return handleLegal(ctx, 'privacy');
  if (path === '/regulamin') return handleLegal(ctx, 'terms');

  const thanks = /^\/([a-z0-9-]+)\/dziekuje$/.exec(path);
  if (thanks) return handleThanks(ctx, thanks[1] ?? '');

  const landing = /^\/([a-z0-9-]+)$/.exec(path);
  if (landing) return handleLanding(ctx, landing[1] ?? '');

  return notFound();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const response = await route(request, env);
      if (request.method === 'HEAD') return new Response(null, { status: response.status, headers: response.headers });
      return response;
    } catch (error) {
      // Do logow trafia tylko nazwa bledu: komunikaty moga zawierac dane z formularzy.
      console.error(`sonda: nieobsluzony blad (${error instanceof Error ? error.name : 'unknown'})`);
      return new Response('Wystąpił błąd. Spróbuj ponownie za chwilę.', { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
    }
  },
} satisfies ExportedHandler<Env>;
