-- 0002_hash_api_keys.sql
-- Replace plaintext api_key column with api_key_hash (SHA-256).
--
-- Rationale: a DB leak of plaintext API keys is instant paid-API compromise
-- for every customer. Storing only a hash means the raw key exists
-- transiently during webhook creation and is unrecoverable afterwards.
--
-- SQLite disallows DROP COLUMN on UNIQUE columns, so we use DROP + CREATE.
-- This is SAFE pre-launch because users has 0 rows (verified before apply).
-- Post-launch, this pattern would require a separate re-issue-key flow.

DROP INDEX IF EXISTS idx_users_api_key;
DROP INDEX IF EXISTS idx_users_stripe_customer;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'pro',            -- 'pro' | 'team'
  status TEXT NOT NULL DEFAULT 'active',       -- 'active' | 'past_due' | 'canceled' | 'pending'
  api_key_hash TEXT UNIQUE,                    -- sha256(raw key); raw key never stored
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_api_key_hash ON users(api_key_hash);
