// Minimal Stripe helper using fetch + form-encoded bodies.
// No SDK — keeps the Worker bundle small and fast.

export interface CheckoutSessionParams {
  priceId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  clientReferenceId?: string;
  // Tag the plan on both the Session and the Subscription so the webhook
  // can read it deterministically — avoids fragile amount_total / currency
  // heuristics across coupons, VAT, price changes.
  plan?: 'pro' | 'team';
  // Stripe Idempotency-Key. Two requests with the same key return the same
  // Checkout Session — protects against double-click and network-retry
  // duplicate subscriptions. Callers should derive this from a stable tuple
  // (e.g. email + priceId + time-bucket).
  idempotencyKey?: string;
}

export async function createCheckoutSession(
  secretKey: string,
  p: CheckoutSessionParams
): Promise<{ id: string; url: string }> {
  const form = new URLSearchParams();
  form.set('mode', 'subscription');
  form.set('line_items[0][price]', p.priceId);
  form.set('line_items[0][quantity]', '1');
  form.set('success_url', p.successUrl);
  form.set('cancel_url', p.cancelUrl);
  form.set('allow_promotion_codes', 'true');
  form.set('billing_address_collection', 'auto');
  form.set('automatic_tax[enabled]', 'true');
  // B2B VAT ID collection. EU business customers can enter their VAT-UE
  // (NIP-UE) at checkout → Stripe applies reverse charge (0% VAT, customer
  // self-accounts). Required for Sp. z o.o. cross-EU B2B sales.
  form.set('tax_id_collection[enabled]', 'true');
  // Card-only for MVP. Sidesteps async payment methods (SEPA, bank debit)
  // where payment_status is 'unpaid' at checkout.session.completed and
  // access must not be granted until async_payment_succeeded. We still
  // check payment_status defensively in the webhook. Expand this list in
  // Week 2 once async handling is verified end-to-end.
  form.set('payment_method_types[0]', 'card');
  if (p.customerEmail) form.set('customer_email', p.customerEmail);
  if (p.clientReferenceId) form.set('client_reference_id', p.clientReferenceId);
  if (p.plan) {
    form.set('metadata[plan]', p.plan);
    // Also copy to the subscription so future subscription.updated events
    // can identify plan without re-fetching the session.
    form.set('subscription_data[metadata][plan]', p.plan);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${secretKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (p.idempotencyKey) headers['Idempotency-Key'] = p.idempotencyKey;

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers,
    body: form.toString(),
  });
  if (!res.ok) {
    // Redact body — Stripe error responses echo customer email and submitted
    // params. Log only status + request-id (safe) server-side.
    const requestId = res.headers.get('request-id') ?? 'unknown';
    throw new Error(`Stripe checkout ${res.status} (request-id: ${requestId})`);
  }
  const data = (await res.json()) as { id: string; url: string };
  return data;
}

// NOTE: Billing portal session creation intentionally removed.
// We rely on Stripe's hosted Customer Portal (magic-link email flow) instead
// of exposing a /billing endpoint on our side. Re-add this helper only when
// we ship authenticated session management. See worker.ts route comments.

// Verify Stripe webhook signature without the SDK.
// Implements Stripe's v1 signing scheme: HMAC-SHA256 over "<timestamp>.<rawBody>".
// https://docs.stripe.com/webhooks#verify-manually
export async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string | null,
  secret: string,
  toleranceSeconds = 300
): Promise<boolean> {
  if (!sigHeader) return false;

  // Parse the header manually — Object.fromEntries collapses duplicate keys,
  // but Stripe sends multiple `v1=` entries during secret rotation and any
  // of them should verify. Collect all v1 values.
  let t: string | undefined;
  const v1Values: string[] = [];
  for (const entry of sigHeader.split(',')) {
    const eq = entry.indexOf('=');
    if (eq <= 0) continue;
    const k = entry.slice(0, eq).trim();
    const v = entry.slice(eq + 1).trim();
    if (k === 't') t = v;
    else if (k === 'v1') v1Values.push(v);
  }
  if (!t || v1Values.length === 0) return false;

  const ts = parseInt(t, 10);
  if (!Number.isFinite(ts)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > toleranceSeconds) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(`${t}.${rawBody}`));
  const expected = Array.from(new Uint8Array(mac))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Accept if ANY v1 entry matches (timing-safe). This covers rotation
  // windows where Stripe signs with both old and new secrets simultaneously.
  for (const v1 of v1Values) {
    if (timingSafeEqual(expected, v1)) return true;
  }
  return false;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
