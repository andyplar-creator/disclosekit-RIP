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

export interface AdView {
  utm_campaign: string | null;
  utm_term: string | null;
}

/** Ostatnie dzisiejsze wejscie tego odwiedzajacego z reklamy (z kampania i fraza), jesli bylo. */
export async function lastAdView(db: D1Database, experiment: string, visitor: string, since: number): Promise<AdView | null> {
  return db
    .prepare(
      `SELECT utm_campaign, utm_term FROM events
       WHERE experiment = ? AND visitor = ? AND type = 'view' AND is_ad = 1 AND created_at >= ?
       ORDER BY id DESC LIMIT 1`,
    )
    .bind(experiment, visitor, since)
    .first<AdView>();
}

export interface LeadInput {
  experiment: string;
  email: string;
  company: string | null;
  nip: string | null;
  erp: string | null;
  volume: string | null;
  phone: string | null;
  note: string | null;
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

export type LeadWrite = 'created' | 'updated';

/**
 * Zapisuje zgloszenie. Gdy ten sam adres wysyla formularz ponownie, NIE odrzucamy go:
 * uzupelniamy dane (telefon, NIP, prosba o fakture pro forma) i oznaczamy jako ponowione.
 * Ocena nadana przez wlasciciela zostaje; wyjatek: wczesniejsze zgloszenie bylo automatycznie
 * oznaczone jako podejrzane, a nowe jest czyste - wtedy wraca do oceny.
 */
export async function upsertLead(db: D1Database, lead: LeadInput): Promise<LeadWrite> {
  const existing = await db
    .prepare(`SELECT id, flag FROM leads WHERE experiment = ? AND email = ?`)
    .bind(lead.experiment, lead.email)
    .first<{ id: number; flag: string | null }>();

  if (!existing) {
    const result = await db
      .prepare(
        `INSERT INTO leads (experiment, email, company, nip, erp, volume, phone, note, wants_invoice, status, flag, consent, visitor, is_ad, utm_campaign, utm_term, is_test, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
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
        lead.note,
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
    if ((result.meta.changes ?? 0) > 0) return 'created';
    // Wyscig dwoch rownoczesnych wysylek: wiersz powstal miedzy SELECT a INSERT. Traktujemy jak ponowienie.
  }

  const clearFlag = Boolean(existing?.flag) && lead.flag === null;
  await db
    .prepare(
      `UPDATE leads SET
         company = COALESCE(?, company),
         nip = COALESCE(?, nip),
         erp = COALESCE(?, erp),
         volume = COALESCE(?, volume),
         phone = COALESCE(?, phone),
         note = COALESCE(?, note),
         wants_invoice = MAX(wants_invoice, ?),
         is_ad = MAX(is_ad, ?),
         utm_campaign = COALESCE(utm_campaign, ?),
         utm_term = COALESCE(utm_term, ?),
         flag = CASE WHEN ? = 1 THEN NULL ELSE flag END,
         status = CASE WHEN ? = 1 THEN 'new' ELSE status END,
         resubmitted_at = ?
       WHERE experiment = ? AND email = ?`,
    )
    .bind(
      lead.company,
      lead.nip,
      lead.erp,
      lead.volume,
      lead.phone,
      lead.note,
      lead.wantsInvoice ? 1 : 0,
      lead.isAd ? 1 : 0,
      lead.utmCampaign,
      lead.utmTerm,
      clearFlag ? 1 : 0,
      clearFlag ? 1 : 0,
      lead.now,
      lead.experiment,
      lead.email,
    )
    .run();
  return 'updated';
}

export interface OrderStartInput {
  experiment: string;
  sessionId: string;
  amountMinor: number;
  currency: string;
  visitor: string;
  isAd: boolean;
  livemode: boolean;
  /** true dla platnosci zalogowanego wlasciciela: nie liczy sie do werdyktu ani przychodu. */
  excluded: boolean;
  now: number;
}

export async function insertOrderStarted(db: D1Database, order: OrderStartInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO orders (experiment, stripe_session_id, status, amount_minor, currency, visitor, is_ad, livemode, excluded, created_at)
       VALUES (?, ?, 'started', ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (stripe_session_id) DO NOTHING`,
    )
    .bind(
      order.experiment,
      order.sessionId,
      order.amountMinor,
      order.currency,
      order.visitor,
      order.isAd ? 1 : 0,
      order.livemode ? 1 : 0,
      order.excluded ? 1 : 0,
      order.now,
    )
    .run();
}

export interface StoredOrder {
  experiment: string;
  stripe_session_id: string;
  status: string;
  visitor: string;
  is_ad: number;
  excluded: number;
}

export async function getOrderBySession(db: D1Database, sessionId: string): Promise<StoredOrder | null> {
  return db
    .prepare(`SELECT experiment, stripe_session_id, status, visitor, is_ad, excluded FROM orders WHERE stripe_session_id = ?`)
    .bind(sessionId)
    .first<StoredOrder>();
}

export interface PaidDetails {
  email: string | null;
  company: string | null;
  nip: string | null;
}

/**
 * Oznacza zamowienie jako oplacone. Zwraca true tylko przy pierwszym przejsciu w stan "paid",
 * dzieki czemu powtorzony webhook nie dopisze drugiego zdarzenia.
 */
export async function markOrderPaid(db: D1Database, sessionId: string, details: PaidDetails, now: number): Promise<boolean> {
  const result = await db
    .prepare(
      `UPDATE orders SET status = 'paid', email = COALESCE(?, email), company = COALESCE(?, company), nip = COALESCE(?, nip), paid_at = ?
       WHERE stripe_session_id = ? AND status <> 'paid'`,
    )
    .bind(details.email, details.company, details.nip, now, sessionId)
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
  /** Zgloszenia automatycznie oznaczone jako podejrzane, ktorych wlasciciel jeszcze nie przywrocil. */
  flaggedLeads: number;
  views: number;
  botViews: number;
  demoRuns: number;
  ctaClicks: number;
  checkoutsStarted: number;
  /** Prawdziwe platnosci Stripe od firm z reklam (bez wykluczonych). */
  stripePaidAd: number;
  /** Zgloszenia z reklam ocenione jako "zaplacila" (przelew / pro forma). */
  manualPaidAd: number;
  paidOrdersTest: number;
  /** Platnosci wykluczone przez wlasciciela (wlasne proby, zwroty). */
  paidExcluded: number;
  paidRevenueMinor: number;
}

async function scalar(db: D1Database, sql: string, ...binds: unknown[]): Promise<number> {
  const row = await db
    .prepare(sql)
    .bind(...binds)
    .first<{ n: number | null }>();
  return row?.n ?? 0;
}

const REAL_LEAD = `experiment = ? AND is_test = 0 AND flag IS NULL AND created_at >= ?`;

/** Liczby lejka dla eksperymentu od chwili `since` (sekundy). */
export async function funnelStats(db: D1Database, experiment: string, since: number): Promise<FunnelStats> {
  const q = (sql: string) => scalar(db, sql, experiment, since);
  const [
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
    manualPaidAd,
    otherLeadsNew,
    otherLeadsQualified,
    manualPaidOther,
    invoiceRequests,
    flaggedLeads,
    stripePaidAd,
    stripePaidOther,
    paidOrdersTest,
    paidExcluded,
    paidRevenueMinor,
    googleRows,
    googleClicksSum,
  ] = await Promise.all([
    q(`SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 1 AND created_at >= ?`),
    q(`SELECT COUNT(DISTINCT visitor) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND created_at >= ?`),
    q(`SELECT COUNT(DISTINCT visitor) AS n FROM events WHERE experiment = ? AND type = 'view' AND is_bot = 0 AND is_ad = 1 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'demo_run' AND is_bot = 0 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM events WHERE experiment = ? AND type = 'cta_click' AND is_bot = 0 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND excluded = 0 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD}`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 1`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 1 AND status = 'new'`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 1 AND status IN ('qualified', 'data_received', 'paid')`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 1 AND status IN ('data_received', 'paid')`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 1 AND status = 'paid'`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 0 AND status = 'new'`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 0 AND status IN ('qualified', 'data_received', 'paid')`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND is_ad = 0 AND status = 'paid'`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE ${REAL_LEAD} AND wants_invoice = 1`),
    q(`SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND is_test = 0 AND flag IS NOT NULL AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 1 AND excluded = 0 AND is_ad = 1 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 1 AND excluded = 0 AND is_ad = 0 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 0 AND created_at >= ?`),
    q(`SELECT COUNT(*) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 1 AND excluded = 1 AND created_at >= ?`),
    q(`SELECT COALESCE(SUM(amount_minor), 0) AS n FROM orders WHERE experiment = ? AND status = 'paid' AND livemode = 1 AND excluded = 0 AND created_at >= ?`),
    // Wpisy z Google Ads liczymy od dnia, w ktorym zaczyna sie liczenie (dzien w UTC).
    scalar(db, `SELECT COUNT(*) AS n FROM ad_reports WHERE experiment = ? AND day >= date(?, 'unixepoch')`, experiment, since),
    scalar(db, `SELECT COALESCE(SUM(clicks), 0) AS n FROM ad_reports WHERE experiment = ? AND day >= date(?, 'unixepoch')`, experiment, since),
  ]);
  return {
    views,
    botViews,
    humanVisitors,
    adClicks,
    googleClicks: googleRows > 0 ? googleClicksSum : null,
    demoRuns,
    ctaClicks,
    checkoutsStarted,
    allLeads,
    adLeads,
    adLeadsNew,
    adLeadsQualified,
    adLeadsWithData,
    otherLeadsNew,
    otherLeadsQualified,
    invoiceRequests,
    flaggedLeads,
    stripePaidAd,
    manualPaidAd,
    paidOrders: stripePaidAd + manualPaidAd,
    paidOther: stripePaidOther + manualPaidOther,
    paidOrdersTest,
    paidExcluded,
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
  note: string | null;
  wants_invoice: number;
  status: LeadStatus;
  flag: string | null;
  is_ad: number;
  utm_campaign: string | null;
  utm_term: string | null;
  is_test: number;
  created_at: number;
  resubmitted_at: number | null;
}

/**
 * Zgloszenia do panelu. Najpierw te, ktore czekaja na czlowieka (nieocenione, potem ocenione, na koncu podejrzane),
 * zeby zalew smieci nie mogl wypchnac prawdziwych zgloszen poza widoczna liste.
 */
export async function listLeads(db: D1Database, experiment: string, limit: number): Promise<RawLead[]> {
  const result = await db
    .prepare(
      `SELECT id, email, company, nip, erp, volume, phone, note, wants_invoice, status, flag, is_ad, utm_campaign, utm_term, is_test, created_at, resubmitted_at
       FROM leads WHERE experiment = ?
       ORDER BY CASE WHEN status = 'new' THEN 0 WHEN flag IS NOT NULL THEN 2 ELSE 1 END, id DESC
       LIMIT ?`,
    )
    .bind(experiment, limit)
    .all<RawLead>();
  return result.results ?? [];
}

export async function countLeadRows(db: D1Database, experiment: string): Promise<number> {
  return scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ?`, experiment);
}

/** Reczna ocena zgloszenia przez wlasciciela. Ocena inna niz "odrzucone" zdejmuje automatyczne oznaczenie "podejrzane". */
export async function setLeadStatus(db: D1Database, experiment: string, leadId: number, status: LeadStatus): Promise<boolean> {
  const result = await db
    .prepare(`UPDATE leads SET status = ?, flag = CASE WHEN ? = 'disqualified' THEN flag ELSE NULL END WHERE id = ? AND experiment = ?`)
    .bind(status, status, leadId, experiment)
    .run();
  return (result.meta.changes ?? 0) > 0;
}

/** Wlasciciel poprawia zrodlo zgloszenia (np. firma wrocila nastepnego dnia bez parametru reklamy). */
export async function setLeadSource(db: D1Database, experiment: string, leadId: number, isAd: boolean): Promise<void> {
  await db
    .prepare(`UPDATE leads SET is_ad = ? WHERE id = ? AND experiment = ?`)
    .bind(isAd ? 1 : 0, leadId, experiment)
    .run();
}

/** Trwale usuwa zgloszenie (np. gdy ktos wycofa zgode na kontakt). */
export async function deleteLead(db: D1Database, experiment: string, leadId: number): Promise<void> {
  await db.prepare(`DELETE FROM leads WHERE id = ? AND experiment = ?`).bind(leadId, experiment).run();
}

export interface RawOrder {
  id: number;
  stripe_session_id: string;
  status: string;
  amount_minor: number;
  currency: string;
  email: string | null;
  company: string | null;
  nip: string | null;
  is_ad: number;
  livemode: number;
  excluded: number;
  created_at: number;
  paid_at: number | null;
}

export async function listOrders(db: D1Database, experiment: string, limit: number): Promise<RawOrder[]> {
  const result = await db
    .prepare(
      `SELECT id, stripe_session_id, status, amount_minor, currency, email, company, nip, is_ad, livemode, excluded, created_at, paid_at
       FROM orders WHERE experiment = ? ORDER BY id DESC LIMIT ?`,
    )
    .bind(experiment, limit)
    .all<RawOrder>();
  return result.results ?? [];
}

/** Wlasciciel wyklucza platnosc z werdyktu (wlasna proba, zwrot) albo ja przywraca. */
export async function setOrderExcluded(db: D1Database, experiment: string, orderId: number, excluded: boolean): Promise<void> {
  await db
    .prepare(`UPDATE orders SET excluded = ? WHERE id = ? AND experiment = ?`)
    .bind(excluded ? 1 : 0, orderId, experiment)
    .run();
}

export async function setOrderSource(db: D1Database, experiment: string, orderId: number, isAd: boolean): Promise<void> {
  await db
    .prepare(`UPDATE orders SET is_ad = ? WHERE id = ? AND experiment = ?`)
    .bind(isAd ? 1 : 0, orderId, experiment)
    .run();
}

/** Prawdziwe platnosci rozpoczete ponad `olderThan` sekund temu i nadal niepotwierdzone przez webhook. */
export async function staleLiveOrders(db: D1Database, olderThan: number, now: number): Promise<number> {
  return scalar(db, `SELECT COUNT(*) AS n FROM orders WHERE status = 'started' AND livemode = 1 AND created_at < ?`, now - olderThan);
}

export interface AdReport {
  day: string;
  clicks: number;
  cost_minor: number;
  currency: string;
}

/** Zapisuje dzien z Google Ads. Zwraca poprzedni wpis dla tego dnia, jesli zostal zastapiony. */
export async function upsertAdReport(db: D1Database, experiment: string, report: AdReport, now: number): Promise<AdReport | null> {
  const previous = await db
    .prepare(`SELECT day, clicks, cost_minor, currency FROM ad_reports WHERE experiment = ? AND day = ?`)
    .bind(experiment, report.day)
    .first<AdReport>();
  await db
    .prepare(
      `INSERT INTO ad_reports (experiment, day, clicks, cost_minor, currency, created_at) VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (experiment, day) DO UPDATE SET clicks = excluded.clicks, cost_minor = excluded.cost_minor, currency = excluded.currency`,
    )
    .bind(experiment, report.day, report.clicks, report.cost_minor, report.currency, now)
    .run();
  return previous;
}

export async function listAdReports(db: D1Database, experiment: string, since: number): Promise<AdReport[]> {
  const result = await db
    .prepare(`SELECT day, clicks, cost_minor, currency FROM ad_reports WHERE experiment = ? AND day >= date(?, 'unixepoch') ORDER BY day DESC LIMIT 60`)
    .bind(experiment, since)
    .all<AdReport>();
  return result.results ?? [];
}

/** Od kiedy liczymy lejek (0 = od poczatku). */
export async function countingSince(db: D1Database, experiment: string): Promise<number> {
  const row = await db.prepare(`SELECT counting_since FROM experiment_state WHERE experiment = ?`).bind(experiment).first<{ counting_since: number }>();
  return row?.counting_since ?? 0;
}

export async function setCountingSince(db: D1Database, experiment: string, since: number): Promise<void> {
  await db
    .prepare(`INSERT INTO experiment_state (experiment, counting_since) VALUES (?, ?) ON CONFLICT (experiment) DO UPDATE SET counting_since = excluded.counting_since`)
    .bind(experiment, since)
    .run();
}

export async function getMeta(db: D1Database, key: string): Promise<string | null> {
  const row = await db.prepare(`SELECT value FROM meta WHERE key = ?`).bind(key).first<{ value: string }>();
  return row?.value ?? null;
}

export async function setMeta(db: D1Database, key: string, value: string): Promise<void> {
  await db.prepare(`INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value`).bind(key, value).run();
}

/** Zwieksza licznik zapisany w tabeli meta (np. liczbe odrzuconych podpisow webhooka). */
export async function bumpMeta(db: D1Database, key: string): Promise<void> {
  await db
    .prepare(`INSERT INTO meta (key, value) VALUES (?, '1') ON CONFLICT (key) DO UPDATE SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)`)
    .bind(key)
    .run();
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

/** Usuwa wylacznie wpis probny autotestu (po adresie), nie ruszajac testowych zgloszen wlasciciela. */
export async function deleteProbeLead(db: D1Database, experiment: string, email: string): Promise<void> {
  await db.prepare(`DELETE FROM leads WHERE experiment = ? AND email = ? AND is_test = 1`).bind(experiment, email).run();
}

export async function countTestLeads(db: D1Database, experiment: string, email: string): Promise<number> {
  return scalar(db, `SELECT COUNT(*) AS n FROM leads WHERE experiment = ? AND email = ? AND is_test = 1`, experiment, email);
}
