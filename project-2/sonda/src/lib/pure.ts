// Czyste funkcje pomocnicze: bez dostepu do bazy i sieci, wiec latwo je testowac.
// Uzywaja tylko Web Crypto (dostepne w Cloudflare Workers i w Node 22).

import type { Attribution } from '../types';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Prosta, celowo zachowawcza walidacja adresu e-mail. */
export function isValidEmail(value: string): boolean {
  if (value.length < 6 || value.length > 254) return false;
  if (/\s/.test(value)) return false;
  const at = value.lastIndexOf('@');
  if (at < 1 || at !== value.indexOf('@')) return false;
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  if (local.length > 64 || domain.length < 4) return false;
  if (!/^[A-Za-z0-9._%+-]+$/.test(local)) return false;
  if (!/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(domain)) return false;
  if (domain.startsWith('-') || domain.endsWith('-') || domain.includes('..')) return false;
  const tld = domain.slice(domain.lastIndexOf('.') + 1);
  return /^[A-Za-z]{2,}$/.test(tld);
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/** Przycina tekst z formularza do bezpiecznej dlugosci; pusty tekst zamienia na null. */
export function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|monitor|uptime|headless|lighthouse|pingdom|curl\/|wget\/|python-requests|scrapy|facebookexternalhit|whatsapp|telegram|discord|skypeuripreview|google-inspectiontool|adsbot/i;

/** Rozpoznaje oczywiste roboty po naglowku User-Agent. Pusty User-Agent tez traktujemy jak robota. */
export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent || userAgent.length < 12) return true;
  return BOT_PATTERN.test(userAgent);
}

function param(params: URLSearchParams, name: string, maxLength = 120): string | null {
  const value = params.get(name);
  if (!value) return null;
  const cleaned = value.trim().slice(0, maxLength);
  return cleaned || null;
}

/**
 * Odczytuje zrodlo wejscia z adresu URL.
 * Wejscie z reklamy = jest identyfikator klikniecia Google (gclid / gbraid / wbraid)
 * albo utm_medium wskazuje platny ruch (cpc, ppc, paid...).
 */
export function parseAttribution(params: URLSearchParams): Attribution {
  const utmSource = param(params, 'utm_source');
  const utmMedium = param(params, 'utm_medium');
  const utmCampaign = param(params, 'utm_campaign');
  const utmTerm = param(params, 'utm_term');
  const hasClickId = Boolean(params.get('gclid') || params.get('gbraid') || params.get('wbraid') || params.get('msclkid'));
  const paidMedium = utmMedium ? /^(cpc|ppc|paid|paidsearch|paid_search|ads?)$/i.test(utmMedium) : false;
  return { isAd: hasClickId || paidMedium, utmSource, utmMedium, utmCampaign, utmTerm };
}

/** Dzien w UTC w formacie RRRR-MM-DD dla czasu uniksowego w sekundach. */
export function dayKey(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

/** Poczatek doby UTC (sekundy) dla czasu uniksowego w sekundach. */
export function dayStart(unixSeconds: number): number {
  return unixSeconds - (unixSeconds % 86400);
}

export function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/** Czas uniksowy w sekundach ma dzis 10 cyfr. 13 cyfr oznacza milisekundy, czyli blad. */
export function looksLikeUnixSeconds(value: number): boolean {
  return Number.isInteger(value) && value > 1_500_000_000 && value < 10_000_000_000;
}

export function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let out = '';
  for (const byte of bytes) out += byte.toString(16).padStart(2, '0');
  return out;
}

export async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return toHex(signature);
}

/** Porownanie w stalym czasie, zeby nie dalo sie zgadywac sekretu po czasie odpowiedzi. */
export function constantTimeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  return diff === 0;
}

/**
 * Dzienny identyfikator odwiedzajacego bez ciasteczek: HMAC z (dzien, IP, przegladarka).
 * Adres IP nie jest nigdzie zapisywany, a identyfikator zmienia sie co dobe.
 */
export async function visitorHash(salt: string, ip: string, userAgent: string, unixSeconds: number): Promise<string> {
  const digest = await hmacSha256Hex(salt, `${dayKey(unixSeconds)}|${ip}|${userAgent}`);
  return digest.slice(0, 24);
}

/** Sprawdza podpis webhooka Stripe (schemat v1: HMAC-SHA256 z "<czas>.<surowa tresc>"). */
export async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  nowUnixSeconds: number,
  toleranceSeconds = 300,
): Promise<boolean> {
  if (!signatureHeader || !secret) return false;
  let timestamp: number | null = null;
  const candidates: string[] = [];
  for (const part of signatureHeader.split(',')) {
    const [key, value] = part.split('=', 2);
    if (!key || !value) continue;
    if (key.trim() === 't') timestamp = Number(value.trim());
    if (key.trim() === 'v1') candidates.push(value.trim());
  }
  if (timestamp === null || !Number.isFinite(timestamp) || candidates.length === 0) return false;
  if (Math.abs(nowUnixSeconds - timestamp) > toleranceSeconds) return false;
  const expected = await hmacSha256Hex(secret, `${timestamp}.${rawBody}`);
  return candidates.some((candidate) => constantTimeEqual(candidate, expected));
}

export function formatMoney(amountMinor: number, currency: string, locale: 'pl' | 'en' = 'pl'): string {
  const value = amountMinor / 100;
  const formatted = value.toLocaleString(locale === 'pl' ? 'pl-PL' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const code = currency.toLowerCase();
  if (code === 'pln') return `${formatted} zł`;
  if (code === 'usd') return `$${formatted}`;
  if (code === 'eur') return `${formatted} €`;
  return `${formatted} ${currency.toUpperCase()}`;
}

/** Zabezpiecza komorke CSV przed wstrzyknieciem formuly do arkusza. */
export function csvCell(value: string | number | null): string {
  if (value === null) return '';
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
