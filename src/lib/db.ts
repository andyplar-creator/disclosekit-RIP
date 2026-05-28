import type { User } from '../types';

export async function logUsage(
  db: D1Database,
  row: {
    userId: number | null;
    ipHash: string | null;
    systemType: string;
    industry: string | null;
    lang: string;
    tokensIn: number;
    tokensOut: number;
    model: string;
    latencyMs: number;
  }
): Promise<void> {
  await db.prepare(
    `INSERT INTO usage_logs (user_id, ip_hash, system_type, industry, lang, tokens_in, tokens_out, model, latency_ms, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    row.userId,
    row.ipHash,
    row.systemType,
    row.industry,
    row.lang,
    row.tokensIn,
    row.tokensOut,
    row.model,
    row.latencyMs,
    Math.floor(Date.now() / 1000)
  ).run();
}

/**
 * Upsert a user row from a Stripe webhook event.
 *
 * The raw API key is generated transiently inside this function, hashed with
 * SHA-256, and only the hash is persisted. The caller receives the raw key
 * in the return value (in the `apiKeyRaw` field) for one-time delivery to
 * the customer (e.g., short-lived KV stash keyed by session_id, welcome
 * email). After that delivery window the raw key is unrecoverable.
 *
 * ON CONFLICT(email): if the user already exists, preserve their existing
 * `api_key_hash` — we never rotate a user's key silently on repeat checkouts.
 */
export async function upsertUserFromStripe(
  db: D1Database,
  p: {
    email: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string | null;
    plan: 'pro' | 'team';
    status: 'active' | 'past_due' | 'canceled' | 'pending';
  }
): Promise<{ user: User; apiKeyRaw: string | null; isNewUser: boolean }> {
  const now = Math.floor(Date.now() / 1000);
  const apiKeyRaw = await generateApiKey();
  const apiKeyHash = await sha256Hex(apiKeyRaw);

  // Check if user exists BEFORE upsert so we can decide whether to expose
  // the new raw key. Existing user => keep their old hash, return null raw.
  const existing = await db.prepare('SELECT id FROM users WHERE email = ?')
    .bind(p.email)
    .first<{ id: number }>();
  const isNewUser = !existing;

  await db.prepare(
    `INSERT INTO users (email, stripe_customer_id, stripe_subscription_id, plan, status, api_key_hash, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
       stripe_customer_id = excluded.stripe_customer_id,
       stripe_subscription_id = excluded.stripe_subscription_id,
       plan = excluded.plan,
       status = excluded.status,
       updated_at = excluded.updated_at`
  ).bind(
    p.email,
    p.stripeCustomerId,
    p.stripeSubscriptionId,
    p.plan,
    p.status,
    apiKeyHash,
    now,
    now
  ).run();

  const row = await db.prepare('SELECT * FROM users WHERE email = ?').bind(p.email).first<User>();
  if (!row) throw new Error('user not found after upsert');

  return {
    user: row,
    apiKeyRaw: isNewUser ? apiKeyRaw : null,
    isNewUser,
  };
}

export async function setSubscriptionStatus(
  db: D1Database,
  stripeCustomerId: string,
  status: 'active' | 'past_due' | 'canceled' | 'pending'
): Promise<void> {
  await db.prepare(
    `UPDATE users SET status = ?, updated_at = ? WHERE stripe_customer_id = ?`
  ).bind(status, Math.floor(Date.now() / 1000), stripeCustomerId).run();
}

/**
 * Flip a user with stripe_customer_id from any pending state to the given
 * status. Used on checkout.session.async_payment_succeeded|failed events.
 */
export async function setSubscriptionStatusByCheckoutSession(
  db: D1Database,
  stripeCustomerId: string,
  newStatus: 'active' | 'canceled'
): Promise<void> {
  await db.prepare(
    `UPDATE users SET status = ?, updated_at = ?
     WHERE stripe_customer_id = ? AND status = 'pending'`
  ).bind(newStatus, Math.floor(Date.now() / 1000), stripeCustomerId).run();
}

/**
 * Look up a user by their plaintext API key. The key is SHA-256 hashed
 * and compared against `api_key_hash` in D1. Raw keys are never stored.
 */
export async function getUserByApiKey(db: D1Database, apiKey: string): Promise<User | null> {
  const hash = await sha256Hex(apiKey);
  return (await db.prepare("SELECT * FROM users WHERE api_key_hash = ? AND status = 'active'")
    .bind(hash)
    .first<User>()) ?? null;
}

export async function captureEmail(
  db: D1Database,
  email: string,
  source: string,
  consentMarketing: boolean,
  ipHash: string,
): Promise<{ alreadySubscribed: boolean }> {
  const lowered = email.trim().toLowerCase();
  const now = Math.floor(Date.now() / 1000);
  const result = await db.prepare(
    `INSERT INTO email_captures
       (email, source, consented_marketing, consent_timestamp, ip_hash, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO NOTHING`
  ).bind(lowered, source, consentMarketing ? 1 : 0, now, ipHash, now).run();

  const alreadySubscribed = (result.meta?.changes ?? 0) === 0;
  return { alreadySubscribed };
}

async function generateApiKey(): Promise<string> {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `adk_${hex}`;
}

export async function sha256Hex(s: string): Promise<string> {
  const enc = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
