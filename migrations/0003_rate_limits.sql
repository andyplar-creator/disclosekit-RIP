-- 0003_rate_limits.sql
-- Move free-tier rate limit from KV (non-atomic, eventually-consistent)
-- to D1 for atomic increment via INSERT ... ON CONFLICT DO UPDATE RETURNING.
--
-- Rationale (Codex Review Gate #1, HIGH finding):
-- KV read-modify-write lets parallel or cross-colo requests each see
-- count=N and all pass before any write — bypassing the 3/day cap by
-- several multiples under burst load.
--
-- D1 SQLite supports atomic UPSERT which resolves the race in a single
-- round-trip. Cost: ~1 write per generation for free-tier users; trivially
-- under D1 free tier (5M writes/day).

CREATE TABLE IF NOT EXISTS rate_limits (
  hash TEXT PRIMARY KEY,              -- sha256(ip|YYYY-MM-DD)
  used INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL         -- unix seconds; 48h after first insert
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_expires ON rate_limits(expires_at);

-- Cleanup strategy: rows are bounded by (IP x day) so table size is small.
-- Periodic cleanup of expired rows can be added later via a Cron Trigger.
-- For MVP, accept unbounded growth; D1 free tier (5GB) absorbs it easily.
