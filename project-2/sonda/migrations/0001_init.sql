-- Sonda: schemat bazy D1.
-- KONWENCJA CZASU: wszystkie kolumny *_at przechowuja czas uniksowy w SEKUNDACH (10 cyfr).
-- (Lekcja z disclosekit, Miss #9: zapytania monitorujace liczyly milisekundy, baza trzymala
--  sekundy i przez 25 dni kazdy filtr "ostatnie N dni" zwracal 0.)

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('view', 'cta_click', 'demo_run', 'lead', 'checkout_started', 'paid')),
  visitor TEXT NOT NULL,                 -- dzienny, zahaszowany identyfikator (bez IP, bez ciasteczek)
  is_ad INTEGER NOT NULL DEFAULT 0,      -- 1 = wejscie z reklamy (gclid / utm_medium=cpc)
  is_bot INTEGER NOT NULL DEFAULT 0,     -- 1 = rozpoznany robot (nie liczy sie do lejka)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  ref_host TEXT,
  detail TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_exp_type ON events (experiment, type, created_at);
CREATE INDEX IF NOT EXISTS idx_events_visitor ON events (visitor, experiment, created_at);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  nip TEXT,
  erp TEXT,                              -- program magazynowy / ERP podany w formularzu
  volume TEXT,                           -- ile zamowien tygodniowo (tekst z formularza)
  phone TEXT,
  wants_invoice INTEGER NOT NULL DEFAULT 0,  -- 1 = chce platny pilotaz na fakture pro forma
  -- Ocena nadawana RECZNIE przez wlasciciela. Tylko 'qualified' i 'data_received' licza sie do werdyktu.
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'data_received', 'disqualified')),
  -- Powod automatycznego oznaczenia jako podejrzane: 'honeypot' (wypelnione ukryte pole) albo 'bot_ua'.
  -- Podejrzane zgloszenia NIE sa kasowane: wlasciciel widzi je w panelu i moze zmienic ocene.
  flag TEXT,
  consent INTEGER NOT NULL,
  visitor TEXT NOT NULL,
  is_ad INTEGER NOT NULL DEFAULT 0,
  utm_campaign TEXT,
  utm_term TEXT,
  is_test INTEGER NOT NULL DEFAULT 0,    -- 1 = wpis z autotestu panelu, nie liczy sie do lejka
  created_at INTEGER NOT NULL,
  UNIQUE (experiment, email)
);
CREATE INDEX IF NOT EXISTS idx_leads_exp ON leads (experiment, created_at);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('started', 'paid', 'expired')),
  amount_minor INTEGER NOT NULL,         -- kwota brutto w groszach / centach
  currency TEXT NOT NULL,
  email TEXT,
  visitor TEXT NOT NULL,
  is_ad INTEGER NOT NULL DEFAULT 0,
  livemode INTEGER NOT NULL DEFAULT 0,   -- 0 = tryb testowy Stripe, 1 = prawdziwe pieniadze
  created_at INTEGER NOT NULL,
  paid_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_orders_exp ON orders (experiment, status, created_at);

-- Reczne wpisy z Google Ads (kliknięcia i koszt wg Google), zeby porownac je z tym, co widzi Sonda.
CREATE TABLE IF NOT EXISTS ad_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment TEXT NOT NULL,
  day TEXT NOT NULL,                     -- RRRR-MM-DD
  clicks INTEGER NOT NULL,
  cost_minor INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'pln',
  created_at INTEGER NOT NULL,
  UNIQUE (experiment, day)
);

-- Limity zapytan. Atomowy UPSERT w D1 (nie KV: KV jest ostatecznie spojne i limit dawalo sie obejsc).
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (key, window_start)
);
