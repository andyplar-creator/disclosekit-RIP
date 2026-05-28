// AI Disclosure Kit — main Cloudflare Worker.
// Serves landing pages (statically rendered HTML) and the /api/generate endpoint.
//
// Routes:
//   GET  /                        → home (landing + tool)
//   GET  /pricing                 → pricing page
//   GET  /article-50              → Article 50 explainer (SEO content)
//   GET  /api                     → API docs (public)
//   GET  /templates               → programmatic SEO index
//   GET  /templates/[slug]        → pre-filled tool page
//   GET  /privacy                 → privacy policy
//   GET  /terms                   → terms
//   GET  /success                 → post-checkout success
//   GET  /cancel                  → post-checkout cancel
//   GET  /sitemap.xml             → sitemap
//   GET  /robots.txt              → robots
//   POST /api/generate            → free-tier generation (IP rate-limited)
//   POST /api/capture-email       → post-gen email capture (IP hourly rate-limited)
//   POST /api/v1/disclosure       → paid API (bearer token)
//   POST /checkout                → start Stripe Checkout
//   POST /webhook/stripe          → Stripe webhook (signature-verified)
//
// Subscription management: handled by Stripe's hosted Customer Portal.
// Users receive a magic-link email from Stripe after checkout and with
// each invoice. No authenticated endpoint is exposed on our side — this
// avoids the account-takeover risk of an unauthenticated /billing?cid=.

import type { Env, DisclosureRequest, SystemType } from './types';
import { renderHome } from './pages/home';
import { renderPricing, renderCheckoutSuccess, renderCheckoutCancel, renderApiDocs, renderArticle50Page } from './pages/pricing';
import { renderTemplatePage, renderTemplatesIndex, renderSitemap, renderRobots } from './pages/programmatic';
import { renderPrivacy, renderTerms } from './pages/legal';
import { generate as generateDisclosure } from './lib/llm';
import { checkAndIncrementFreeUsage, checkAndIncrementHourly, hashIp, ipHashForDay } from './lib/ratelimit';
import { logUsage, upsertUserFromStripe, setSubscriptionStatus, setSubscriptionStatusByCheckoutSession, getUserByApiKey, captureEmail } from './lib/db';
import { createCheckoutSession, verifyStripeSignature } from './lib/stripe';

const HTML_HEADERS = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60, s-maxage=3600' };
const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };
const XML_HEADERS = { 'content-type': 'application/xml; charset=utf-8' };
const TEXT_HEADERS = { 'content-type': 'text/plain; charset=utf-8' };

const VALID_SYSTEMS: SystemType[] = [
  'chatbot', 'text_generator', 'image_generator', 'video_generator',
  'audio_generator', 'deepfake', 'emotion_recognition', 'biometric_categorisation',
];
const VALID_LANGS = ['en', 'pl', 'de', 'fr', 'es', 'it', 'nl', 'cs', 'sv', 'pt'];

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    try {
      return await handle(request, env);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('worker error:', msg);
      // CLAUDE.md invariant #11: never include raw provider/internal details
      // in caller-facing responses. Generic message; detail goes to logs only.
      return jsonResponse({ error: 'Internal error' }, 500);
    }
  },
};

async function handle(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method;
  const site = env.SITE_URL.replace(/\/$/, '');
  const freeDailyLimit = parseInt(env.FREE_DAILY_LIMIT || '3', 10) || 3;

  // ---------- www → apex 301 redirect ----------
  // Requests to www.disclosekit.com are routed here via Workers Custom Domain;
  // we permanently redirect to the canonical apex so SITE_URL stays single-origin
  // for SEO, OG tags, and analytics. Preserves path + query string.
  if (url.hostname.startsWith('www.')) {
    const apex = url.hostname.slice(4);
    const target = `https://${apex}${url.pathname}${url.search}`;
    return new Response(null, {
      status: 301,
      headers: { location: target, 'cache-control': 'public, max-age=3600' },
    });
  }

  // ---------- Static HTML pages ----------
  // HEAD requests get the same routing as GET — CF Workers automatically
  // strips the body from the Response, preserving status + headers.
  // This unblocks Googlebot / crawler preflight checks (they send HEAD
  // before GET and treat 404 as "don't fetch").
  if (method === 'GET' || method === 'HEAD') {
    if (pathname === '/' || pathname === '') {
      return new Response(renderHome(site, freeDailyLimit), { headers: HTML_HEADERS });
    }
    if (pathname === '/pricing') return new Response(renderPricing(site), { headers: HTML_HEADERS });
    if (pathname === '/article-50') return new Response(renderArticle50Page(site), { headers: HTML_HEADERS });
    if (pathname === '/api') return new Response(renderApiDocs(site), { headers: HTML_HEADERS });
    if (pathname === '/templates') return new Response(renderTemplatesIndex(site), { headers: HTML_HEADERS });
    if (pathname === '/privacy') return new Response(renderPrivacy(site), { headers: HTML_HEADERS });
    if (pathname === '/terms') return new Response(renderTerms(site), { headers: HTML_HEADERS });
    if (pathname === '/success') return new Response(renderCheckoutSuccess(site), { headers: HTML_HEADERS });
    if (pathname === '/cancel') return new Response(renderCheckoutCancel(site), { headers: HTML_HEADERS });
    if (pathname === '/sitemap.xml') return new Response(renderSitemap(site), { headers: XML_HEADERS });
    if (pathname === '/robots.txt') return new Response(renderRobots(site), { headers: TEXT_HEADERS });

    // Programmatic template pages
    const tpl = pathname.match(/^\/templates\/([a-z0-9-]+)$/);
    if (tpl) {
      const html = renderTemplatePage(tpl[1], site);
      if (!html) return new Response('Template not found', { status: 404, headers: TEXT_HEADERS });
      return new Response(html, { headers: HTML_HEADERS });
    }

  }

  // ---------- API: free-tier generation ----------
  if (method === 'POST' && pathname === '/api/generate') {
    return handleFreeGenerate(request, env, freeDailyLimit);
  }

  // ---------- API: post-gen email capture ----------
  if (method === 'POST' && pathname === '/api/capture-email') {
    return handleCaptureEmail(request, env);
  }

  // ---------- API: paid (bearer auth) ----------
  if (method === 'POST' && pathname === '/api/v1/disclosure') {
    return handlePaidGenerate(request, env);
  }

  // ---------- Checkout ----------
  if (method === 'POST' && pathname === '/checkout') {
    return handleCheckout(request, env);
  }

  // ---------- Stripe webhook ----------
  if (method === 'POST' && pathname === '/webhook/stripe') {
    return handleStripeWebhook(request, env);
  }

  // Health check for uptime monitoring (GET + HEAD both OK)
  if (pathname === '/healthz' && (method === 'GET' || method === 'HEAD')) {
    return new Response('ok', { status: 200, headers: TEXT_HEADERS });
  }

  return new Response('Not found', { status: 404, headers: TEXT_HEADERS });
}

// ------------------------------------------------------------------
// Handlers
// ------------------------------------------------------------------

async function handleFreeGenerate(request: Request, env: Env, freeDailyLimit: number): Promise<Response> {
  const body = await safeJson(request);
  if (!body) return jsonResponse({ error: 'Invalid JSON body' }, 400);

  const req = validateDisclosureRequest(body);
  if (!req.ok) return jsonResponse({ error: req.error }, 400);

  const ip = getClientIp(request);
  // Rate limit is now backed by D1 (atomic UPSERT) — KV was non-atomic and
  // bypassable under parallel load. The KV binding is kept for future use
  // (e.g., 15-min session→API-key stash once key delivery ships).
  const rate = await checkAndIncrementFreeUsage(env.DB, ip, freeDailyLimit);
  if (!rate.allowed) {
    return jsonResponse(
      {
        error: `Daily free limit reached (${freeDailyLimit}/day). Upgrade for unlimited generations.`,
        upsell: true,
      },
      429
    );
  }

  try {
    const result = await generateDisclosure(env, req.value);
    const ipHash = await ipHashForDay(ip);
    await logUsage(env.DB, {
      userId: null,
      ipHash,
      systemType: req.value.systemType,
      industry: req.value.industry ?? null,
      lang: req.value.language,
      tokensIn: result.meta.tokensIn,
      tokensOut: result.meta.tokensOut,
      model: result.meta.model,
      latencyMs: result.meta.latencyMs,
    });
    return jsonResponse({ ...result, remaining: rate.remaining });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('generation failed:', msg);
    return jsonResponse({ error: 'Generation failed — please retry in a moment.' }, 502);
  }
}

async function handleCaptureEmail(request: Request, env: Env): Promise<Response> {
  const body = await safeJson(request);
  if (!body) return jsonResponse({ ok: false, error: 'validation' }, 400);

  const req = validateCaptureRequest(body);
  if (!req.ok) return jsonResponse({ ok: false, error: 'validation' }, 400);

  const ip = getClientIp(request);
  const rate = await checkAndIncrementHourly(env.DB, ip, 'cap', 10);
  if (!rate.allowed) {
    return jsonResponse(
      { ok: false, error: 'rate_limit', retry_after_seconds: 3600 },
      429,
    );
  }

  try {
    const ipH = await hashIp(ip);
    const { alreadySubscribed } = await captureEmail(
      env.DB,
      req.value.email,
      req.value.source,
      true,
      ipH,
    );
    return jsonResponse({ ok: true, already_subscribed: alreadySubscribed });
  } catch (err) {
    console.error('capture failed:', err instanceof Error ? err.message : String(err));
    return jsonResponse({ ok: false, error: 'server' }, 500);
  }
}

function validateCaptureRequest(
  body: unknown,
): { ok: true; value: { email: string; source: 'home_post_gen' } } | { ok: false } {
  if (typeof body !== 'object' || body === null) return { ok: false };
  const b = body as Record<string, unknown>;
  if (typeof b.email !== 'string' || b.email.length === 0 || b.email.length > 254) return { ok: false };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return { ok: false };
  if (b.consent !== true) return { ok: false };
  if (b.source !== 'home_post_gen') return { ok: false };
  return { ok: true, value: { email: b.email.trim(), source: 'home_post_gen' } };
}

async function handlePaidGenerate(request: Request, env: Env): Promise<Response> {
  const auth = request.headers.get('authorization') ?? '';
  const m = auth.match(/^Bearer\s+(adk_[A-Za-z0-9]+)$/);
  if (!m) return jsonResponse({ error: 'Missing or invalid API key' }, 401);

  const user = await getUserByApiKey(env.DB, m[1]);
  if (!user) return jsonResponse({ error: 'API key not recognized' }, 401);
  if (user.status !== 'active') return jsonResponse({ error: 'Subscription not active', status: user.status }, 402);

  const body = await safeJson(request);
  if (!body) return jsonResponse({ error: 'Invalid JSON body' }, 400);
  const req = validateDisclosureRequest(body);
  if (!req.ok) return jsonResponse({ error: req.error }, 400);

  try {
    const result = await generateDisclosure(env, req.value);
    await logUsage(env.DB, {
      userId: user.id,
      ipHash: null,
      systemType: req.value.systemType,
      industry: req.value.industry ?? null,
      lang: req.value.language,
      tokensIn: result.meta.tokensIn,
      tokensOut: result.meta.tokensOut,
      model: result.meta.model,
      latencyMs: result.meta.latencyMs,
    });
    return jsonResponse(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Log server-side (safe) but return a generic message — raw errors can
    // include provider payloads / PII and must never leak to API callers.
    console.error('paid generation failed:', msg);
    return jsonResponse({ error: 'Generation failed — please retry in a moment.' }, 502);
  }
}

async function handleCheckout(request: Request, env: Env): Promise<Response> {
  const form = await request.formData().catch(() => null);
  if (!form) return new Response('Bad request', { status: 400 });

  const plan = String(form.get('plan') ?? '');
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response('Please enter a valid email address.', { status: 400 });
  }

  // DNS MX check — catches typos like "iclud.com" (no mail server) before we
  // create a Stripe session that would then silently fail to deliver receipts.
  // Fail-open on DNS errors so transient issues don't block real users.
  const emailDomain = email.split('@')[1]!;
  if (!(await hasEmailDeliveryDomain(emailDomain))) {
    return new Response(
      `We couldn't verify mail delivery for "${emailDomain}". Please check for typos (e.g. icloud.com, not iclud.com) and try again.`,
      { status: 400 }
    );
  }

  let priceId: string;
  if (plan === 'pro') priceId = env.PRICE_ID_PRO;
  else if (plan === 'team') priceId = env.PRICE_ID_TEAM;
  else return new Response('Invalid plan', { status: 400 });

  const site = env.SITE_URL.replace(/\/$/, '');

  // Stripe Idempotency-Key: derive from (email, priceId, 5-min time bucket).
  // Double-click on the form within 5 min returns the same Checkout Session;
  // after 5 min (e.g. user abandoned and retried later) a new session is
  // created. Prevents duplicate subscriptions from accidental repeat POSTs.
  const bucket = Math.floor(Date.now() / (5 * 60 * 1000));
  const idempotencyKey = await sha256Hex(`${email}|${priceId}|${bucket}`);

  try {
    const session = await createCheckoutSession(env.STRIPE_SECRET_KEY, {
      priceId,
      customerEmail: email,
      successUrl: `${site}/success?sid={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${site}/cancel`,
      plan: plan as 'pro' | 'team',
      idempotencyKey,
    });
    return Response.redirect(session.url, 303);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('checkout failed:', msg);
    return new Response('Checkout unavailable right now — please retry.', { status: 502 });
  }
}

async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  const raw = await request.text();
  const sig = request.headers.get('stripe-signature');
  const ok = await verifyStripeSignature(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!ok) return new Response('Invalid signature', { status: 400 });

  let event: any;
  try { event = JSON.parse(raw); } catch { return new Response('Bad payload', { status: 400 }); }

  try {
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      const customerId: string = s.customer;
      const subscriptionId: string | null = s.subscription ?? null;
      const email: string = s.customer_details?.email ?? s.customer_email;
      const paymentStatus: string = s.payment_status ?? 'unpaid';

      // Plan comes from session metadata (set by createCheckoutSession).
      // This is deterministic across currencies, coupons, VAT, and price
      // changes. Fall back to amount heuristic only if metadata is absent
      // (e.g. a legacy session created before this change).
      let plan: 'pro' | 'team';
      const planMeta = s.metadata?.plan;
      if (planMeta === 'pro' || planMeta === 'team') {
        plan = planMeta;
      } else {
        console.warn('checkout.session.completed missing metadata.plan — falling back to amount inference', { sessionId: s.id });
        plan = (s.amount_total ?? 0) >= 9000 ? 'team' : 'pro';
      }

      if (!email) {
        // Stripe doesn't retry 4xx, so a 400 here would mean a paying customer
        // never gets an account. Return 500 instead — Stripe will retry the
        // webhook and we can debug via logs without losing the customer.
        console.error('checkout.session.completed missing email — returning 500 to trigger Stripe retry', { sessionId: s.id });
        return new Response('Missing email — will retry', { status: 500 });
      }

      // Defense-in-depth: only activate once payment has actually cleared.
      // Card-only checkout (see stripe.ts payment_method_types) makes this
      // 'paid' at completion in practice, but async methods (SEPA, bank debit)
      // would arrive 'unpaid' here and flip later via
      // checkout.session.async_payment_succeeded.
      const initialStatus: 'active' | 'pending' = paymentStatus === 'paid' ? 'active' : 'pending';

      await upsertUserFromStripe(env.DB, {
        email,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        plan,
        status: initialStatus,
      });
      // TODO Week 2: stash result.apiKeyRaw in KV keyed by s.id for a
      // 15-min success-page retrieval + send welcome email.
    } else if (event.type === 'checkout.session.async_payment_succeeded') {
      // Async payment cleared — flip 'pending' user to 'active'.
      const s = event.data.object;
      await setSubscriptionStatusByCheckoutSession(env.DB, s.customer, 'active');
    } else if (event.type === 'checkout.session.async_payment_failed') {
      // Async payment failed — flip 'pending' user to 'canceled'.
      const s = event.data.object;
      await setSubscriptionStatusByCheckoutSession(env.DB, s.customer, 'canceled');
    } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      const customerId: string = sub.customer;
      const status = event.type === 'customer.subscription.deleted'
        ? 'canceled'
        : (sub.status === 'past_due' ? 'past_due' : (sub.status === 'active' ? 'active' : 'canceled'));
      await setSubscriptionStatus(env.DB, customerId, status as 'active' | 'past_due' | 'canceled');
    } else if (event.type === 'invoice.payment_failed') {
      const inv = event.data.object;
      await setSubscriptionStatus(env.DB, inv.customer, 'past_due');
    }

    return new Response('ok', { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('webhook handler error:', msg);
    // Return 500 so Stripe retries; do NOT return 2xx on persisted failure.
    return new Response('handler error', { status: 500 });
  }
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

function validateDisclosureRequest(body: any): { ok: true; value: DisclosureRequest } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Body must be an object' };
  const sys = body.systemType;
  if (typeof sys !== 'string' || !VALID_SYSTEMS.includes(sys as SystemType)) {
    return { ok: false, error: `Invalid systemType. Must be one of: ${VALID_SYSTEMS.join(', ')}` };
  }
  const lang = body.language ?? 'en';
  if (typeof lang !== 'string' || !VALID_LANGS.includes(lang)) {
    return { ok: false, error: `Invalid language. Must be one of: ${VALID_LANGS.join(', ')}` };
  }
  const industry = body.industry == null ? undefined : String(body.industry).slice(0, 40);
  const productName = body.productName == null ? undefined : String(body.productName).slice(0, 80);
  const deploymentContext = body.deploymentContext == null ? undefined : String(body.deploymentContext).slice(0, 400);
  const tone = body.tone === 'formal' ? 'formal' : 'conversational';
  return {
    ok: true,
    value: { systemType: sys as SystemType, industry, language: lang, productName, deploymentContext, tone },
  };
}

function getClientIp(request: Request): string {
  // Only trust cf-connecting-ip — Cloudflare sets this and strips any spoofed
  // x-forwarded-for / x-real-ip from external requests. Before the custom
  // domain is attached, *.workers.dev requests also pass through CF, so this
  // header is always authoritative. Do NOT add fallbacks — attackers can
  // forge them to bypass the free-tier rate limit.
  return request.headers.get('cf-connecting-ip') || 'unknown';
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

async function safeJson(request: Request): Promise<any | null> {
  try { return await request.json(); } catch { return null; }
}

async function sha256Hex(s: string): Promise<string> {
  const enc = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Query Cloudflare DNS-over-HTTPS for MX records on the email domain.
 * Rejects domains that clearly cannot receive mail (parked, typo, nonexistent).
 *
 * We intentionally DO NOT fall back to A records despite the RFC 5321
 * implicit-MX rule: in 2026 every legitimate email provider publishes MX,
 * while parked/typo domains commonly have A records pointing to parking
 * services (e.g., parkingcrew.net) and would slip through an A fallback.
 *
 * Fail-open: any DNS error, timeout, or ambiguous response returns `true`
 * to avoid blocking real users during transient DNS issues. Only
 * unambiguous "domain doesn't exist" / "no MX" returns `false`.
 *
 * Background: caught the real typo `iclud.com` (vs `icloud.com`) during
 * M1 live-mode smoke test where the customer's Stripe receipt went into
 * the void.
 */
async function hasEmailDeliveryDomain(domain: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { Accept: 'application/dns-json' }, signal: controller.signal }
    );
    clearTimeout(timeout);
    if (!res.ok) return true; // fail-open on DNS service error
    const dns = (await res.json()) as { Answer?: unknown[]; Status?: number };
    if (dns.Status === 3) return false; // NXDOMAIN — domain does not exist
    return Array.isArray(dns.Answer) && dns.Answer.length > 0;
  } catch {
    clearTimeout(timeout);
    return true; // fail-open on network/abort
  }
}
