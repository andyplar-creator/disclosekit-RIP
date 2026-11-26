// Sonda: router Cloudflare Workera.
//
// Strony publiczne:   /<slug>, /<slug>/dziekuje, /polityka-prywatnosci, /regulamin
// API publiczne:      POST /api/<slug>/lead | event | checkout | demo
// Stripe:             POST /stripe/webhook
// Panel wlasciciela:  /admin, /admin/selftest, /admin/x/<slug> (+ akcje POST)

import { EXPERIMENTS, findExperiment, livePasteOn, statusOf, validateExperiment } from './experiments';
import { runAudit } from './lib/audit';
import {
  adVisitorsByTerm,
  bumpMeta,
  countingSince,
  countLeadRows,
  deleteLead,
  funnelStats,
  getOrderBySession,
  insertOrderStarted,
  lastAdView,
  listAdReports,
  listLeads,
  listOrders,
  markOrderExpired,
  markOrderPaid,
  recentEvents,
  recordEvent,
  setCountingSince,
  setLeadSource,
  setLeadStatus,
  setMeta,
  setOrderExcluded,
  setOrderSource,
  upsertAdReport,
  upsertLead,
} from './lib/db';
import { demoIsConfigured, MAX_DEMO_INPUT_CHARS } from './lib/demo-config';
import { e, htmlHeaders, newNonce, page } from './lib/html';
import {
  cleanText,
  csvCell,
  dayStart,
  ipDayKey,
  isBotUserAgent,
  isValidEmail,
  normalizeEmail,
  nowSeconds,
  parseAttribution,
  siteOrigin,
  verifyStripeSignature,
  visitorHash,
  yesterdayInWarsaw,
} from './lib/pure';
import { hitRateLimit } from './lib/ratelimit';
import { adminIsConfigured, clearSessionCookie, createSessionCookie, isAdmin, tokenMatches } from './lib/session';
import { createCheckoutSession, customField, parseStripeEvent } from './lib/stripe';
import { computeVerdict } from './lib/verdict';
import { LEAD_STATUS_LABEL, renderDetail, renderLogin, renderOverview, renderSelftest } from './pages/admin';
import { renderLanding, renderOrderTable, renderThanks, type Flash, type FormValues, type LandingState } from './pages/landing';
import { renderPrivacy, renderTerms } from './pages/legal';
import type { Attribution, Env, Experiment, LeadStatus, Locale } from './types';

const DAY = 86400;
const DEV_SALT = 'sonda-dev-salt-not-for-production';

interface Ctx {
  request: Request;
  env: Env;
  exec: ExecutionContext;
  url: URL;
  /** Adres strony bez sciezki i ukosnika: z SITE_URL, a gdy jest bledny - z biezacego zadania. */
  origin: string;
  now: number;
  /** Dzienny identyfikator odwiedzajacego (IP + przegladarka): do liczenia unikalnych wejsc. */
  visitor: string;
  /** Dzienny klucz samego adresu IP: do limitow zapytan (nie da sie go zmienic naglowkiem przegladarki). */
  ipKey: string;
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

function simplePage(title: string, bodyHtml: string, status: number): Response {
  const nonce = newNonce();
  const body = `<main><section class="hero"><div class="wrap">${bodyHtml}</div></section></main>`;
  return html(page({ title, locale: 'pl', body, nonce }), nonce, status);
}

function notFound(): Response {
  return simplePage('404', '<h1>404</h1><p class="lede">Nie ma takiej strony.</p>', 404);
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

/** Eksperyment, ktory wolno pokazac temu odwiedzajacemu. Niepubliczne widzi tylko zalogowany wlasciciel. */
function visibleExperiment(slug: string, admin: boolean, env: Env): { experiment: Experiment; preview: boolean } | null {
  const experiment = findExperiment(slug);
  if (!experiment) return null;
  if (statusOf(experiment, env) === 'live') return { experiment, preview: false };
  if (admin) return { experiment, preview: true };
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

/**
 * Krotkie powiadomienie dla wlasciciela (opcjonalne, NOTIFY_WEBHOOK_URL): strona obiecuje odpowiedz
 * w 2 dni robocze, wiec wlasciciel musi sie dowiedziec o zgloszeniu. Bez danych osobowych w tresci.
 */
function notifyOwner(c: Ctx, text: string, slug: string): void {
  const target = c.env.NOTIFY_WEBHOOK_URL;
  if (!target) return;
  const body = JSON.stringify({ text, experiment: slug, panel: `${c.origin}/admin/x/${slug}` });
  c.exec.waitUntil(
    fetch(target, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).then(
      () => undefined,
      () => console.error('powiadomienie: nie udalo sie wyslac'),
    ),
  );
}

// ---------------------------------------------------------------- strony publiczne

function landingResponse(c: Ctx, experiment: Experiment, preview: boolean, attribution: Attribution, flash: Flash, form: FormValues | null, status = 200): Response {
  const nonce = newNonce();
  const state: LandingState = {
    nonce,
    attribution,
    flash,
    form,
    paymentsEnabled: paymentsEnabled(c.env),
    livePaste: livePasteOn(experiment, c.env) && demoIsConfigured(c.env),
    isPreview: preview,
  };
  return html(renderLanding(experiment, c.env, state), nonce, status);
}

async function handleLanding(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found) return notFound();
  const { experiment, preview } = found;
  const attribution = parseAttribution(c.url.searchParams);

  // Wejscia zalogowanego wlasciciela nigdy nie trafiaja do lejka (ani w podgladzie, ani na publicznej stronie).
  if (!preview && !c.admin && c.request.method === 'GET') {
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
    'zapis=zaktualizowane': 'lead_updated',
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
  return landingResponse(c, experiment, preview, attribution, flash, null);
}

async function handleThanks(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found) return notFound();
  // Potwierdzenie pokazujemy tylko dla sesji platnosci, ktora naprawde u nas powstala.
  const sessionId = c.url.searchParams.get('session_id') ?? '';
  let known = false;
  if (/^[A-Za-z0-9_]{8,200}$/.test(sessionId)) {
    const order = await getOrderBySession(c.env.DB, sessionId);
    known = Boolean(order && order.experiment === found.experiment.slug);
  }
  const nonce = newNonce();
  return html(renderThanks(found.experiment, c.env, nonce, known), nonce);
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

  let form: FormData;
  try {
    form = await c.request.formData();
  } catch {
    return landingResponse(c, experiment, preview, NO_ATTRIBUTION, 'lead_error', null, 400);
  }

  const fromForm = attributionFromForm(form);
  const values: FormValues = {
    email: String(form.get('email') ?? '').trim().slice(0, 254),
    company: cleanText(form.get('company'), 120) ?? '',
    erp: cleanText(form.get('erp'), 120) ?? '',
    volume: cleanText(form.get('volume'), 80) ?? '',
    nip: cleanText(form.get('nip'), 20) ?? '',
    phone: cleanText(form.get('phone'), 30) ?? '',
    note: cleanText(form.get('note'), 600) ?? '',
    wantsInvoice: form.get('wants_invoice') === '1',
    consent: form.get('consent') === '1',
  };
  // Przy bledzie NIE przekierowujemy: oddajemy te sama strone z wpisanymi danymi i z zachowanym zrodlem wejscia.
  const again = (flash: Flash, status: number) => landingResponse(c, experiment, preview, fromForm, flash, values, status);

  try {
    const limit = await hitRateLimit(c.env.DB, `lead:${c.ipKey}`, DAY, 30, c.now);
    if (!limit.allowed) return again('rate', 429);

    const email = normalizeEmail(values.email);
    if (!isValidEmail(email)) return again('lead_invalid', 422);
    if (!values.consent) return again('lead_consent', 422);
    // Zgloszenie bez firmy, programu i liczby zamowien nie pozwala ocenic, czy to prawdziwy klient.
    if (!values.company || !values.erp || !values.volume) return again('lead_missing', 422);

    // Pulapka na roboty: czlowiek nie widzi pola "website". Niczego nie kasujemy po cichu:
    // podejrzane zgloszenie trafia do panelu z ocena "odrzucone", a wlasciciel moze ja zmienic.
    const flag: 'honeypot' | 'bot_ua' | null = cleanText(form.get('website'), 200) ? 'honeypot' : c.isBot ? 'bot_ua' : null;

    // Zrodlo: ukryte pola formularza, a gdy ich brak - dzisiejsze wejscie tego odwiedzajacego z reklamy.
    const earlier = fromForm.isAd && fromForm.utmTerm ? null : await lastAdView(c.env.DB, experiment.slug, c.visitor, dayStart(c.now));
    const isAd = fromForm.isAd || earlier !== null;
    const utmCampaign = fromForm.utmCampaign ?? earlier?.utm_campaign ?? null;
    const utmTerm = fromForm.utmTerm ?? earlier?.utm_term ?? null;
    const isTest = preview || c.admin;

    const written = await upsertLead(c.env.DB, {
      experiment: experiment.slug,
      email,
      company: values.company,
      nip: values.nip || null,
      erp: values.erp,
      volume: values.volume,
      phone: values.phone || null,
      note: values.note || null,
      wantsInvoice: values.wantsInvoice,
      flag,
      visitor: c.visitor,
      isAd,
      utmCampaign,
      utmTerm,
      isTest,
      now: c.now,
    });

    if (!isTest) {
      if (written === 'created') {
        await recordEvent(c.env.DB, {
          experiment: experiment.slug,
          type: 'lead',
          visitor: c.visitor,
          attribution: { ...fromForm, isAd, utmCampaign, utmTerm },
          isBot: flag !== null,
          refHost: null,
          detail: flag,
          now: c.now,
        });
      }
      if (flag === null) {
        notifyOwner(c, written === 'created' ? 'Nowe zgłoszenie firmy w Sondzie.' : 'Firma uzupełniła swoje zgłoszenie w Sondzie.', experiment.slug);
      }
    }
    return redirect(`/${experiment.slug}?zapis=${written === 'created' ? 'ok' : 'zaktualizowane'}#zapis`);
  } catch {
    console.error('lead: blad zapisu zgloszenia');
    return again('lead_error', 500);
  }
}

async function handleEvent(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found || found.preview || c.admin) return new Response(null, { status: 204 });
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
  const limit = await hitRateLimit(c.env.DB, `event:${c.ipKey}`, DAY, 200, c.now);
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
  const pilot = experiment.offer.pilot;
  if (!pilot || !paymentsEnabled(c.env) || c.isBot) return back('niedostepna');

  let form: FormData;
  try {
    form = await c.request.formData();
  } catch {
    return back('niedostepna');
  }
  if (form.get('terms') !== '1') return back('regulamin');

  try {
    const limit = await hitRateLimit(c.env.DB, `checkout:${c.ipKey}`, DAY, 20, c.now);
    if (!limit.allowed) return back('limit');

    const fromForm = attributionFromForm(form);
    const earlier = fromForm.isAd ? null : await lastAdView(c.env.DB, experiment.slug, c.visitor, dayStart(c.now));
    const isAd = fromForm.isAd || earlier !== null;
    const apiBase = c.env.STRIPE_API_BASE || 'https://api.stripe.com';
    // Platnosc zalogowanego wlasciciela to jego wlasna proba: od razu wykluczona z werdyktu i przychodu.
    const ownTest = preview || c.admin;

    const session = await createCheckoutSession({
      apiBase,
      secretKey: c.env.STRIPE_SECRET_KEY as string,
      amountGrossMinor: pilot.amountGrossMinor,
      currency: pilot.currency,
      productName: pilot.productName,
      locale: experiment.locale,
      successUrl: `${c.origin}/${experiment.slug}/dziekuje?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${c.origin}/${experiment.slug}?platnosc=anulowana#zapis`,
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
      amountMinor: pilot.amountGrossMinor,
      currency: pilot.currency,
      visitor: c.visitor,
      isAd,
      livemode: session.livemode,
      excluded: ownTest,
      now: c.now,
    });
    if (!ownTest) {
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
    console.error('checkout: nie udalo sie utworzyc sesji platnosci');
    return back('niedostepna');
  }
}

async function handleDemo(c: Ctx, slug: string): Promise<Response> {
  const found = visibleExperiment(slug, c.admin, c.env);
  if (!found || !found.experiment.demo) return json({ error: 'not_found' }, 404);
  // Demo na zywo dziala tylko w eksperymentach, ktore swiadomie je wlaczyly.
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

  // Dwa limity: na adres IP i globalny dobowy (ochrona rachunku za API).
  const perIp = await hitRateLimit(c.env.DB, `demo:${c.ipKey}`, DAY, 6, c.now);
  if (!perIp.allowed) return json({ error: 'rate_limited' }, 429);
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
  if (!found.preview && !c.admin) {
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
  if (!valid) {
    // Najczestsza przyczyna: sekret z trybu testowego przy kluczu produkcyjnym. Autotest pokaze ten licznik.
    console.error('stripe webhook: odrzucony podpis (sprawdz STRIPE_WEBHOOK_SECRET dla wlasciwego trybu)');
    try {
      await bumpMeta(c.env.DB, 'webhook_bad_signature');
    } catch {
      // licznik jest pomocniczy
    }
    return json({ error: 'bad_signature' }, 400);
  }
  const event = parseStripeEvent(raw);
  if (!event) return json({ error: 'bad_payload' }, 400);
  await setMeta(c.env.DB, event.livemode ? 'webhook_ok_live' : 'webhook_ok_test', String(c.now));

  const sessionId = event.data.object.id;
  const paidNow =
    (event.type === 'checkout.session.completed' && event.data.object.payment_status === 'paid') ||
    event.type === 'checkout.session.async_payment_succeeded';

  if (paidNow) {
    const order = await getOrderBySession(c.env.DB, sessionId);
    if (order) {
      const email = event.data.object.customer_details?.email ?? null;
      const first = await markOrderPaid(
        c.env.DB,
        sessionId,
        { email: email ? normalizeEmail(email) : null, company: customField(event, 'company'), nip: customField(event, 'nip') },
        c.now,
      );
      if (first && order.excluded === 0) {
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
        if (event.livemode) notifyOwner(c, 'Prawdziwa płatność za pilotaż w Sondzie.', order.experiment);
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

const LEAD_STATUSES: LeadStatus[] = ['new', 'qualified', 'data_received', 'paid', 'disqualified'];

async function handleAdminAction(c: Ctx, experiment: Experiment, action: string): Promise<Response> {
  const form = await c.request.formData();
  const id = Number.parseInt(String(form.get('id') ?? ''), 10);
  const base = `/admin/x/${experiment.slug}`;

  switch (action) {
    case '/lead-status': {
      const status = String(form.get('status') ?? '');
      if (Number.isInteger(id) && (LEAD_STATUSES as string[]).includes(status)) await setLeadStatus(c.env.DB, experiment.slug, id, status as LeadStatus);
      return redirect(`${base}#zgloszenia`);
    }
    case '/lead-source': {
      if (Number.isInteger(id)) await setLeadSource(c.env.DB, experiment.slug, id, form.get('ad') === '1');
      return redirect(`${base}#zgloszenia`);
    }
    case '/lead-delete': {
      // Usuwanie jest nieodwracalne, wiec wymaga zaznaczenia pola potwierdzenia.
      if (Number.isInteger(id) && form.get('confirm') === '1') {
        await deleteLead(c.env.DB, experiment.slug, id);
        return redirect(`${base}?msg=usunieto#zgloszenia`);
      }
      return redirect(`${base}?msg=potwierdz#zgloszenia`);
    }
    case '/order-exclude': {
      if (Number.isInteger(id)) await setOrderExcluded(c.env.DB, experiment.slug, id, form.get('excluded') === '1');
      return redirect(`${base}#platnosci`);
    }
    case '/order-source': {
      if (Number.isInteger(id)) await setOrderSource(c.env.DB, experiment.slug, id, form.get('ad') === '1');
      return redirect(`${base}#platnosci`);
    }
    case '/start-counting': {
      // "Zacznij liczyc od teraz" odcina wlasne proby sprzed startu kampanii; "od poczatku" przywraca calosc.
      await setCountingSince(c.env.DB, experiment.slug, form.get('mode') === 'all' ? 0 : c.now);
      return redirect(`${base}?msg=licznik`);
    }
    case '/ad-report': {
      const day = String(form.get('day') ?? '');
      const clicks = Number.parseInt(String(form.get('clicks') ?? ''), 10);
      const cost = Number.parseFloat(String(form.get('cost') ?? '').replace(',', '.'));
      if (/^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isInteger(clicks) && clicks >= 0 && Number.isFinite(cost) && cost >= 0) {
        const previous = await upsertAdReport(c.env.DB, experiment.slug, { day, clicks, cost_minor: Math.round(cost * 100), currency: 'pln' }, c.now);
        return redirect(`${base}?msg=${previous ? 'zastapiono' : 'zapisano'}&dzien=${day}#reklamy`);
      }
      return redirect(`${base}?msg=bledne#reklamy`);
    }
  }
  return notFound();
}

async function handleAdmin(c: Ctx, path: string): Promise<Response> {
  const nonce = newNonce();
  const secure = c.url.protocol === 'https:';
  const method = c.request.method;

  if (!adminIsConfigured(c.env)) return html(renderLogin(nonce, 'unconfigured'), nonce, 503);
  if (method === 'POST' && !sameOrigin(c)) return json({ error: 'forbidden' }, 403);

  if (path === '/admin/login' && method === 'POST') {
    try {
      const limit = await hitRateLimit(c.env.DB, `login:${c.ipKey}`, 3600, 10, c.now);
      if (!limit.allowed) return html(renderLogin(nonce, 'rate'), nonce, 429);
    } catch {
      // Baza niedostepna (np. brak migracji). Logowanie musi mimo to dzialac, bo dopiero panel to zdiagnozuje.
      console.error('login: limiter niedostepny, baza nie odpowiada');
    }
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

  // Autotest ma dzialac takze wtedy, gdy baza jest pusta albo niedostepna: po to istnieje.
  if (path === '/admin/selftest' && method === 'GET') {
    return html(renderSelftest(nonce, await runAudit(c.env, c.url, c.now)), nonce);
  }

  try {
    if (path === '/admin' && method === 'GET') {
      const rows = await Promise.all(
        EXPERIMENTS.map(async (experiment) => {
          const since = await countingSince(c.env.DB, experiment.slug);
          const stats = await funnelStats(c.env.DB, experiment.slug, since);
          return { experiment, status: statusOf(experiment, c.env), stats, verdict: computeVerdict(stats, experiment.thresholds) };
        }),
      );
      return html(renderOverview(nonce, rows), nonce);
    }

    const match = /^\/admin\/x\/([a-z0-9-]+)(\/[a-z-]+(?:\.csv)?)?$/.exec(path);
    if (match) {
      const experiment = findExperiment(match[1] ?? '');
      if (!experiment) return notFound();
      const action = match[2] ?? '';

      if (method === 'POST') return handleAdminAction(c, experiment, action);

      if (action === '/leads.csv') {
        const leads = await listLeads(c.env.DB, experiment.slug, 5000);
        // Srednik jako separator: polski Excel otwiera wtedy plik od razu w kolumnach.
        const header = ['kiedy_utc', 'email', 'firma', 'nip', 'program', 'zamowien_tygodniowo', 'telefon', 'notatka', 'chce_faktury', 'ocena', 'podejrzane', 'zrodlo', 'kampania', 'fraza', 'testowe', 'ponowione_utc'];
        const lines = [header.map(csvCell).join(';')];
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
              lead.note,
              lead.wants_invoice ? 'tak' : 'nie',
              LEAD_STATUS_LABEL[lead.status] ?? lead.status,
              lead.flag === 'honeypot' ? 'ukryte pole' : lead.flag === 'bot_ua' ? 'robot' : '',
              lead.is_ad ? 'reklama' : 'inne',
              lead.utm_campaign,
              lead.utm_term,
              lead.is_test ? 'tak' : 'nie',
              lead.resubmitted_at ? new Date(lead.resubmitted_at * 1000).toISOString() : '',
            ]
              .map(csvCell)
              .join(';'),
          );
        }
        return new Response('﻿' + lines.join('\r\n') + '\r\n', {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="zgloszenia-${experiment.slug}.csv"`,
            'Cache-Control': 'no-store',
          },
        });
      }

      if (action === '') {
        const since = await countingSince(c.env.DB, experiment.slug);
        const [stats, terms, events, leads, leadRows, orders, adReports] = await Promise.all([
          funnelStats(c.env.DB, experiment.slug, since),
          adVisitorsByTerm(c.env.DB, experiment.slug, since),
          recentEvents(c.env.DB, experiment.slug, 100),
          listLeads(c.env.DB, experiment.slug, 500),
          countLeadRows(c.env.DB, experiment.slug),
          listOrders(c.env.DB, experiment.slug, 200),
          listAdReports(c.env.DB, experiment.slug, since),
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
            leadRowsTotal: leadRows,
            orders,
            adReports,
            problems: validateExperiment(experiment),
            defaultDay: yesterdayInWarsaw(c.now),
            since,
            message: c.url.searchParams.get('msg'),
            messageDay: c.url.searchParams.get('dzien'),
            paymentsEnabled: paymentsEnabled(c.env),
          }),
          nonce,
        );
      }
    }
  } catch {
    // Najczesciej: nie uruchomiono migracji albo w wrangler.jsonc jest zly identyfikator bazy.
    console.error('admin: blad bazy danych');
    return simplePage(
      'Baza danych nie odpowiada',
      `<h1>Baza danych nie odpowiada</h1>
<div class="msg err">Panel nie może odczytać danych. Najczęstsza przyczyna: nie uruchomiono migracji albo w pliku <code>wrangler.jsonc</code> jest zły <code>database_id</code>.</div>
<p>Co zrobić: otwórz <a href="/admin/selftest">Autotest</a> (pokaże, których tabel brakuje), a potem w katalogu projektu uruchom <code>npm run db:migrate:remote</code> i wdróż ponownie.</p>`,
      500,
    );
  }

  return notFound();
}

// ---------------------------------------------------------------- router

async function route(request: Request, env: Env, exec: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  // Wielokrotne ukosniki i ukosnik na koncu traktujemy jak zwykla sciezke (np. gdy ktos wklei adres z "//").
  const collapsed = url.pathname.replace(/\/{2,}/g, '/');
  const path = collapsed.length > 1 && collapsed.endsWith('/') ? collapsed.slice(0, -1) : collapsed;
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
  const salt = env.VISITOR_SALT || DEV_SALT;
  const ctx: Ctx = {
    request,
    env,
    exec,
    url,
    origin: siteOrigin(env.SITE_URL) ?? url.origin,
    now,
    visitor: await visitorHash(salt, ip, userAgent ?? '', now),
    ipKey: await ipDayKey(salt, ip, now),
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
  async fetch(request: Request, env: Env, exec: ExecutionContext): Promise<Response> {
    try {
      const response = await route(request, env, exec);
      if (request.method === 'HEAD') return new Response(null, { status: response.status, headers: response.headers });
      return response;
    } catch (error) {
      // Do logow trafia tylko nazwa bledu: komunikaty moga zawierac dane z formularzy.
      console.error(`sonda: nieobsluzony blad (${error instanceof Error ? error.name : 'unknown'})`);
      const contact = env.CONTACT_EMAIL ? ` Jeśli to się powtarza, napisz na ${e(env.CONTACT_EMAIL)}.` : '';
      return new Response(`Wystąpił błąd. Spróbuj ponownie za chwilę.${contact}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }
  },
} satisfies ExportedHandler<Env>;
