-- 2026-05-12: extend email_captures for capture endpoint.
-- ip_hash and consent_timestamp added for GDPR-compliant audit trail.
-- Source field stays nullable in schema; application enforces NOT NULL via validator.
-- Existing rows: 0 at time of this migration, so defaults are harmless.

ALTER TABLE email_captures ADD COLUMN consent_timestamp INTEGER NOT NULL DEFAULT 0;
ALTER TABLE email_captures ADD COLUMN ip_hash TEXT;
