// Logowanie do panelu: jeden sekret ADMIN_TOKEN, po zalogowaniu podpisane ciasteczko sesji.
// Ciasteczko dostaje wylacznie wlasciciel po zalogowaniu. Odwiedzajacy landing nie dostaja zadnych ciasteczek.

import type { Env } from '../types';
import { constantTimeEqual, hmacSha256Hex } from './pure';

const COOKIE_NAME = 'sonda_admin';
const SESSION_SECONDS = 7 * 86400;
export const MIN_ADMIN_TOKEN_LENGTH = 24;

export function adminIsConfigured(env: Env): boolean {
  return Boolean(env.ADMIN_TOKEN && env.ADMIN_TOKEN.length >= MIN_ADMIN_TOKEN_LENGTH);
}

export function tokenMatches(env: Env, candidate: string): boolean {
  if (!adminIsConfigured(env)) return false;
  return constantTimeEqual(candidate, env.ADMIN_TOKEN as string);
}

export async function createSessionCookie(env: Env, now: number, secure: boolean): Promise<string> {
  const expires = now + SESSION_SECONDS;
  const signature = await hmacSha256Hex(env.ADMIN_TOKEN as string, `session.${expires}`);
  const flags = ['HttpOnly', 'SameSite=Strict', 'Path=/', `Max-Age=${SESSION_SECONDS}`];
  if (secure) flags.push('Secure');
  return `${COOKIE_NAME}=${expires}.${signature}; ${flags.join('; ')}`;
}

export function clearSessionCookie(secure: boolean): string {
  const flags = ['HttpOnly', 'SameSite=Strict', 'Path=/', 'Max-Age=0'];
  if (secure) flags.push('Secure');
  return `${COOKIE_NAME}=; ${flags.join('; ')}`;
}

export async function isAdmin(env: Env, request: Request, now: number): Promise<boolean> {
  if (!adminIsConfigured(env)) return false;
  const header = request.headers.get('Cookie');
  if (!header) return false;
  let value: string | null = null;
  for (const part of header.split(';')) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${COOKIE_NAME}=`)) value = trimmed.slice(COOKIE_NAME.length + 1);
  }
  if (!value) return false;
  const dot = value.indexOf('.');
  if (dot < 1) return false;
  const expires = Number(value.slice(0, dot));
  const signature = value.slice(dot + 1);
  if (!Number.isInteger(expires) || expires < now) return false;
  const expected = await hmacSha256Hex(env.ADMIN_TOKEN as string, `session.${expires}`);
  return constantTimeEqual(signature, expected);
}
