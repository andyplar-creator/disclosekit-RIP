// Stale i sprawdzenie konfiguracji demo. Osobny, lekki plik: reszta Workera moze z niego korzystac
// bez ladowania biblioteki Anthropic (ta laduje sie dopiero przy pierwszym uruchomieniu demo).

import type { Env } from '../types';

export const DEFAULT_DEMO_MODEL = 'claude-opus-5-5';
export const MAX_DEMO_INPUT_CHARS = 6000;

export function demoIsConfigured(env: Env): boolean {
  return Boolean(env.ANTHROPIC_API_KEY);
}
