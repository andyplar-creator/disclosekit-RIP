// Warstwa danych (D1). Wszystkie czasy w SEKUNDACH uniksowych.

import type { Attribution, EventType, LeadStatus } from '../types';
import type { FunnelCounts } from './verdict';

export interface EventInput {
  experiment: string;
  type: EventType;
  visitor: string;
  attribution: Attribution;
  isBot: boolean;
  refHost: string | null;
  detail: string | null;
  now: number;
}

export async function recordEvent(db: D1Database, e: EventInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO events (experiment, type, visitor, is_ad, is_bot, utm_source, utm_medium, utm_campaign, utm_term, ref_host, detail, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      e.experiment,
      e.type,
      e.visitor,
      e.attribution.isAd ? 1 : 0,
      e.isBot ? 1 : 0,
      e.attribution.utmSource,
      e.attribution.utmMedium,
      e.attribution.utmCampaign,
      e.attribution.utmTerm,
      e.refHost,
      e.detail,
      e.now,
    )
    .run();
}

/** Czy ten odwiedzajacy wszedl dzis na strone eksperymentu z reklamy? */
export async function visitorCameFromAd(db: D1Database, experiment: string, visitor: string, since: number): Promise<boolean> {
  const row = await db
    .prepare(`SELECT 1 AS hit FROM events WHERE experiment = ? AND visitor = ? AND type = 'view' AND is_ad = 1 AND created_at >= ? LIMIT 1`)
    .bind(experiment, visitor, since)
    .first<{ hit: number }>();
  return Boolean(row);
}

export interface LeadInput {
  experiment: string;
  email: string;
  company: string | null;
  nip: string | null;
  erp: string | null;
  volume: string | null;
  phone: string | null;
  wantsInvoice: boolean;
  /** Powod automatycznego oznaczenia jako podejrzane; takie zgloszenie startuje z ocena "odrzucone". */
  flag: 'honeypot' | 'bot_ua' | null;
  visitor: string;
  isAd: boolean;
  utmCampaign: string | null;
  utmTerm: string | null;
  isTest: boolean;
  now: number;
}

/** Zapisuje lead. Zwraca true, jesli to nowy adres w tym eksperymencie; false, jesli juz byl. */
export async function insertLead(db: D1Database, lead: LeadInput): Promise<boolean> {
  const result = await db
    .prepare(
      `INSERT INTO leads (experiment, email, company, nip, erp, volume, phone, wants_invoice, status, flag, consent, visitor, is_ad, utm_campaign, utm_term, is_test, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (experiment, email) DO NOTHING`,
    )
    .bind(
      lead.experiment,
      lead.email,
      lead.company,
      lead.nip,
      lead.erp,
      lead.volume,
      lead.phone,
      lead.wantsInvoice ? 1 : 0,
      lead.flag ? 'disqualified' : 'new',
      lead.flag,
      lead.visitor,
      lead.isAd ? 1 : 0,
      lead.utmCampaign,
      lead.utmTerm,
      lead.isTest ? 1 : 0,
      lead.now,
    )
    .run();
  return (result.meta.changes ?? 0) > 0;
}

export interface OrderStartInput {
  experiment: string;
  sessionId: string;
  amountMinor: number;
  currency: string;
  visitor: string;
  isAd: boolean;
  livemode: boolean;
  now: number;
}

export async function insertOrderStarted(db: D1Database, order: OrderStartInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO orders (experiment, stripe_session_id, status, amount_minor, currency, visitor, is_ad, livemode, created_at)
       VALUES (?, ?, 'started', ?, ?, ?, ?, ?, ?)
       ON CONFLICT (stripe_session_id) DO NOTHING`,
    )
    .bind(order.experiment, order.sessionId, order.amountMinor, order.currency, order.visitor, order.isAd ? 1 : 0, order.livemode ? 1 : 0, order.now)
    .run();
}

export interface StoredOrder {
  experiment: string;
  stripe_session_id: string;
  status: string;
  visitor: string;
  is_ad: number;
}

export async function getOrderBySession(db: D1Database, sessionId: string): Promise<StoredOrder | null> {
  return db
    .prepare(`SELECT experiment, stripe_session_id, status, visitor, is_ad FROM orders WHERE stripe_session_id = ?`)
    .bind(sessionId)
    .first<StoredOrder>();
}

/**
 * Oznacza zamowienie jako oplacone. Zwraca true tylko przy pierwszym przejsciu w stan "paid",
 * dzieki czemu powtorzony webhook nie dopisze drugiego zdarzenia.
 */
export async function markOrderPaid(db: D1Database, sessionId: string, email: string | null, now: number): Promise<boolean> {
  const result = await db
    .prepare(`UPDATE orders SET status = 'paid', email = COALESCE(?, email), paid_at = ? WHERE stripe_session_id = ? AND status <> 'paid'`)
    .bind(email, now, sessionId)
    .run();
  return (result.meta.changes ?? 0) > 0;
}

export async function markOrderExpired(db: D1Database, sessionId: string): Promise<void> {
  await db.prepare(`UPDATE orders SET status = 'expired' WHERE stripe_session_id = ? AND status = 'started'`).bind(sessionId).run();
}

export interface FunnelStats extends FunnelCounts {
  /** Wszystkie zgloszenia z reklam, niezaleznie od oceny. */
  adLeads: number;
  /** Zgloszenia z prosba o fakture pro forma za platny pilotaz. */
  invoiceRequests: number;
  /** Zgloszenia automatycznie oznaczone jako podejrzane (robot). Widoczne w panelu, nie licza sie do lejka. */
  flaggedLeads: number;
  views: number;
  botViews: number;
  demoRuns: number;
  ctaClicks: number;
  checkoutsStarted: number;
  paidOrdersTest: number;
  paidRevenueMinor: number;
}

async function scalar(db: D1Database, sql: string, ...binds: unknown[]): Promise<number> {
  const row = await db
    .prepare(sql)
    .bind(...binds)
    .first<{ n: number | null }>();
  return row?.n ?? 0;
}

/** Liczby lejka dla eksperymentu od chwili `since` (sekundy). */
export async function funnelStats(db: D1Database, experiment: string, since: number): Promise<FunnelStats> {
  const [views, botViews, humanVisitors, adClicks, demoRuns, ctaClicks, checkoutsStarted, allLeads, adLeads, adLeadsNew, adLeadsQualified, adLeadsWithData, invoiceRequests, flaggedLeads, paidOrders, paidOrdersTest, paidRevenueMinor] =
    await Promise.all([
      scalar(db, `SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 1 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(DISTINCT visitor) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND created_at >= ?`, experiment, since),
      scalar(
        db,
        `SELECT COUNT(DISTINCT visitor) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND is_ad = 1 AND created_at >= ?`,
        experiment,
        since,
      ),
      scalar(db, `SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'demo_run' AND is_bot = 0 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'cta_click' AND is_bot = 0 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND flag IS NULL AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND flag IS NULL AND is_ad = 1 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND is_ad = 1 AND status = 'new' AND created_at >= ?`, experiment, since),
      scalar(
        db,
        `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND is_ad = 1 AND status IN ('qualified', 'data_received') AND created_at >= ?`,
        experiment,
        since,
      ),
      scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND is_ad = 1 AND status = 'data_received' AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND flag IS NULL AND wants_invoice = 1 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND flag IS NOT NULL AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 1 AND created_at >= ?`, experiment, since),
      scalar(db, `SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 0 AND created_at >= ?`, experiment, since),
      scalar(
        db,
        `SELECT COALESCE(SUM(amount_minor), 0) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 1 AND created_at >= ?`,
        experiment,
        since,
      ),
    ]);
  return {
    views,
    botViews,
    humanVisitors,
    adClicks,
    demoRuns,
    ctaClicks,
    checkoutsStarted,
    allLeads,
    adLeads,
    adLeadsNew,
    adLeadsQualified,
    adLeadsWithData,
    invoiceRequests,
    flaggedLeads,
    paidOrders,
    paidOrdersTest,
    paidRevenueMinor,
  };
}

export interface TermRow {
  utm_campaign: string | null;
  utm_term: string | null;
  visitors: number;
}

/** Wejscia z reklam w rozbiciu na kampanie i fraze (to, co Google podstawi pod {keyword}). */
export async function adVisitorsByTerm(db: D1Database, experiment: string, since: number): Promise<TermRow[]> {
  const result = await db
    .prepare(
      `SELECT utm_campaign, utm_term, COUNT(DISTINCT visitor) AS visitors
       FROM events
       WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND is_ad = 1 AND created_at >= ?
       GROUP BY utm_campaign, utm_term
       ORDER BY visitors DESC
       LIMIT 30`,
    )
    .bind(experiment, since)
    .all<TermRow>();
  return result.results ?? [];
}

export interface RawEvent {
  id: number;
  type: string;
  visitor: string;
  is_ad: number;
  is_bot: number;
  utm_campaign: string | null;
  utm_term: string | null;
  ref_host: string | null;
  detail: string | null;
  created_at: number;
}

export async function recentEvents(db: D1Database, experiment: string, limit: number): Promise<RawEvent[]> {
  const result = await db
    .prepare(
      `SELECT id, type, visitor, is_ad, is_bot, utm_campaign, utm_term, ref_host, detail, created_at
       FROM events WHERE experiment = ? ORDER BY id DESC LIMIT ?`,
    )
    .bind(experiment, limit)
    .all<RawEvent>();
  return result.results ?? [];
}

export interface RawLead {
  id: number;
  email: string;
  company: string | null;
  nip: string | null;
  erp: string | null;
  volume: string | null;
  phone: string | null;
  wants_invoice: number;
  status: LeadStatus;
  flag: string | null;
  is_ad: number;
  utm_campaign: string | null;
  utm_term: string | null;
  is_test: number;
  created_at: number;
}

export async function listLeads(db: D1Database, experiment: string, limit: number): Promise<RawLead[]> {
  const result = await db
    .prepare(
      `SELECT id, email, company, nip, erp, volume, phone, wants_invoice, status, flag, is_ad, utm_campaign, utm_term, is_test, created_at
       FROM leads WHERE experiment = ? ORDER BY id DESC LIMIT ?`,
    )
    .bind(experiment, limit)
    .all<RawLead>();
  return result.results ?? [];
}

/** Reczna ocena zgloszenia przez wlasciciela. Zwraca true, jesli zgloszenie istnieje w tym eksperymencie. */
export async function setLeadStatus(db: D1Database, experiment: string, leadId: number, status: LeadStatus): Promise<boolean> {
  const result = await db.prepare(`UPDATE leads SET status = ? WHERE id = ? AND experiment = ?`).bind(status, leadId, experiment).run();
  return (result.meta.changes ?? 0) > 0;
}

export interface RawOrder {
  id: number;
  stripe_session_id: string;
  status: string;
  amount_minor: number;
  currency: string;
  email: string | null;
  is_ad: number;
  livemode: number;
  created_at: number;
  paid_at: number | null;
}

export async function listOrders(db: D1Database, experiment: string, limit: number): Promise<RawOrder[]> {
  const result = await db
    .prepare(
      `SELECT id, stripe_session_id, status, amount_minor, currency, email, is_ad, livemode, created_at, paid_at
       FROM orders WHERE experiment = ? ORDER BY id DESC LIMIT ?`,
    )
    .bind(experiment, limit)
    .all<RawOrder>();
  return result.results ?? [];
}

export interface AdReport {
  day: string;
  clicks: number;
  cost_minor: number;
  currency: string;
}

export async function upsertAdReport(db: D1Database, experiment: string, report: AdReport, now: number): Promise<void> {
  await db
    .prepare(
      `INSERT INTO ad_reports (experiment, day, clicks, cost_minor, currency, created_at) VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (experiment, day) DO UPDATE SET clicks = excluded.clicks, cost_minor = excluded.cost_minor, currency = excluded.currency`,
    )
    .bind(experiment, report.day, report.clicks, report.cost_minor, report.currency, now)
    .run();
}

export async function listAdReports(db: D1Database, experiment: string): Promise<AdReport[]> {
  const result = await db
    .prepare(`SELECT day, clicks, cost_minor, currency FROM ad_reports WHERE experiment = ? ORDER BY day DESC LIMIT 60`)
    .bind(experiment)
    .all<AdReport>();
  return result.results ?? [];
}

/** Najmniejsza i najwieksza wartosc created_at w tabeli, do kontroli jednostek czasu. */
export async function timestampRange(db: D1Database, table: 'events' | 'leads' | 'orders'): Promise<{ min: number | null; max: number | null }> {
  const row = await db.prepare(`SELECT MIN(created_at) AS min, MAX(created_at) AS max FROM ${table}`).first<{ min: number | null; max: number | null }>();
  return { min: row?.min ?? null, max: row?.max ?? null };
}

export async function tableExists(db: D1Database, name: string): Promise<boolean> {
  const row = await db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`).bind(name).first<{ name: string }>();
  return Boolean(row);
}

export async function deleteTestLeads(db: D1Database, experiment: string): Promise<void> {
  await db.prepare(`DELETE FROM leads WHERE experiment = ? AND is_test = 1`).bind(experiment).run();
}

export async function countTestLeads(db: D1Database, experiment: string, email: string): Promise<number> {
  return scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND email = ? AND is_test = 1`, experiment, email);
}
