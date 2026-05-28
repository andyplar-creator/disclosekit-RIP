// Free-tier rate limit: N generations per IP per UTC day.
// Persisted in D1 via atomic UPSERT. The KV-backed implementation was
// replaced after Codex Review Gate #1 flagged non-atomic read-modify-write
// on eventually-consistent storage (parallel/cross-colo requests could
// bypass the cap). D1 SQLite `INSERT ... ON CONFLICT DO UPDATE RETURNING`
// gives us a single-round-trip atomic increment.
//
// We hash the IP with the UTC date so raw IPs are never persisted — only
// a per-day-per-IP hash lives in D1.

export async function checkAndIncrementFreeUsage(
  db: D1Database,
  ip: string,
  dailyLimit: number
): Promise<{ allowed: boolean; remaining: number; used: number }> {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
  const hash = await sha256Hex(`${ip}|${date}`);
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + 60 * 60 * 48; // 48h safety margin

  // Atomic upsert. RETURNING gives us the post-increment value in one hop.
  // Note: we increment unconditionally; callers detect over-limit by
  // comparing `used` against `dailyLimit`. This means a request that lands
  // at the cap still increments to N+1, but subsequent requests continue
  // to be rejected (used stays > limit). Acceptable under-count is impossible;
  // marginal over-count is fine — the user is already rate-limited.
  const row = await db.prepare(
    `INSERT INTO rate_limits (hash, used, expires_at) VALUES (?, 1, ?)
     ON CONFLICT(hash) DO UPDATE SET used = rate_limits.used + 1
     RETURNING used`
  ).bind(hash, expiresAt).first<{ used: number }>();

  const used = row?.used ?? 1;

  if (used > dailyLimit) {
    return { allowed: false, remaining: 0, used };
  }
  return { allowed: true, remaining: dailyLimit - used, used };
}

export async function ipHashForDay(ip: string, date = new Date()): Promise<string> {
  const d = date.toISOString().slice(0, 10);
  return sha256Hex(`${ip}|${d}`);
}

// Hourly rate limit, generic prefix. Reuses the rate_limits table with a
// different key format (prefix + IP + hour) so endpoints don't collide.
// Same atomic UPSERT semantics — CLAUDE.md invariant #8 preserved.
export async function checkAndIncrementHourly(
  db: D1Database,
  ip: string,
  prefix: string,
  hourlyLimit: number
): Promise<{ allowed: boolean; remaining: number; used: number }> {
  const hour = new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH UTC
  const hash = await sha256Hex(`${prefix}:${ip}|${hour}`);
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + 60 * 60 * 2; // 2h safety margin

  const row = await db.prepare(
    `INSERT INTO rate_limits (hash, used, expires_at) VALUES (?, 1, ?)
     ON CONFLICT(hash) DO UPDATE SET used = rate_limits.used + 1
     RETURNING used`
  ).bind(hash, expiresAt).first<{ used: number }>();

  const used = row?.used ?? 1;
  if (used > hourlyLimit) return { allowed: false, remaining: 0, used };
  return { allowed: true, remaining: hourlyLimit - used, used };
}

export async function hashIp(ip: string): Promise<string> {
  return sha256Hex(ip);
}

async function sha256Hex(s: string): Promise<string> {
  const enc = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
