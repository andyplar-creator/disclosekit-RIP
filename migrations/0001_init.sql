-- Users table: one row per paying customer.
-- Free-tier users are tracked anonymously via KV rate limiting, not D1.
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'pro',            -- 'pro' | 'team'
  status TEXT NOT NULL DEFAULT 'active',       -- 'active' | 'past_due' | 'canceled'
  api_key TEXT UNIQUE,                         -- for Pro API access
  created_at INTEGER NOT NULL,                 -- unix seconds
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_api_key ON users(api_key);

-- Usage log: one row per generation (free or paid).
-- Used for spot-checking AI quality and tracking AI spend.
CREATE TABLE IF NOT EXISTS usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,                             -- NULL for anonymous free-tier
  ip_hash TEXT,                                -- sha256(ip + date) for free-tier tracking
  system_type TEXT NOT NULL,                   -- 'chatbot' | 'image_gen' | 'text_gen' | etc
  industry TEXT,
  lang TEXT NOT NULL DEFAULT 'en',
  tokens_in INTEGER NOT NULL DEFAULT 0,
  tokens_out INTEGER NOT NULL DEFAULT 0,
  model TEXT NOT NULL,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_usage_user ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_created ON usage_logs(created_at);

-- Email captures from free-tier (for update notifications, e.g., Code of Practice)
CREATE TABLE IF NOT EXISTS email_captures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  source TEXT,                                 -- 'free_tool' | 'blog' | 'pricing'
  consented_marketing INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
