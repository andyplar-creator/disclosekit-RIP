// Rejestr eksperymentow. Nowy eksperyment = nowy plik z konfiguracja + jedna linia tutaj.
// Status 'draft' jest widoczny tylko dla zalogowanego wlasciciela; 'live' dla wszystkich;
// 'stopped' zwraca 404, ale dane zostaja w panelu. Patrz statusOf() nizej.

import type { Env, Experiment, ExperimentStatus } from '../types';
import { zamowieniaZMaila } from './zamowienia-z-maila';

export const EXPERIMENTS: Experiment[] = [zamowieniaZMaila];

/**
 * Faktyczny status eksperymentu. Uruchomienie testu nie wymaga zmiany kodu:
 * wystarczy dopisac slug do zmiennej LIVE_EXPERIMENTS w wrangler.jsonc i wdrozyc.
 * Usuniecie sluga z tej listy z powrotem ukrywa strone (dane zostaja w panelu).
 */
export function statusOf(experiment: Experiment, env: Pick<Env, 'LIVE_EXPERIMENTS'>): ExperimentStatus {
  const live = (env.LIVE_EXPERIMENTS ?? '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
  if (live.includes(experiment.slug)) return 'live';
  return experiment.status;
}

/**
 * Czy eksperyment ma wlaczone pole "wklej wlasna wiadomosc" (demo na zywo)?
 * Wlacza je konfiguracja eksperymentu (livePaste: true) albo zmienna LIVE_PASTE_EXPERIMENTS.
 * Samo wlaczenie nie wystarczy: potrzebny jest jeszcze klucz ANTHROPIC_API_KEY.
 */
export function livePasteOn(experiment: Experiment, env: Pick<Env, 'LIVE_PASTE_EXPERIMENTS'>): boolean {
  if (!experiment.demo) return false;
  if (experiment.demo.livePaste) return true;
  return (env.LIVE_PASTE_EXPERIMENTS ?? '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean)
    .includes(experiment.slug);
}

export function findExperiment(slug: string): Experiment | null {
  return EXPERIMENTS.find((experiment) => experiment.slug === slug) ?? null;
}

/** Bledy konfiguracji, ktore zatrzymalyby test albo wprowadzily klienta w blad. */
export function validateExperiment(experiment: Experiment): string[] {
  const problems: string[] = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(experiment.slug)) problems.push('slug może zawierać tylko małe litery, cyfry i myślniki');
  const t = experiment.thresholds;
  if (t.minAdClicks < 40) problems.push('minAdClicks poniżej 40: werdykt z tak małej próby jest przypadkowy');
  if (t.maxAdClicks < t.minAdClicks) problems.push('maxAdClicks jest mniejsze niż minAdClicks');
  if (t.goQualifiedLeads < 1) problems.push('goQualifiedLeads musi wynosić co najmniej 1');
  if (t.goPaidOrders < 0) problems.push('goPaidOrders nie może być ujemne');
  if (t.noGoMaxQualifiedLeads < 0) problems.push('noGoMaxQualifiedLeads nie może być ujemne');
  if (t.noGoMaxQualifiedLeads >= t.goQualifiedLeads) problems.push('noGoMaxQualifiedLeads musi być mniejsze niż goQualifiedLeads, inaczej ten sam wynik byłby naraz GO i NO-GO');
  if (t.maxAdClicks < 150) problems.push('maxAdClicks poniżej 150: NO-GO z tak małej próby zapadałoby zbyt często przez przypadek');
  const pilot = experiment.offer.pilot;
  if (pilot) {
    if (!Number.isInteger(pilot.amountGrossMinor) || pilot.amountGrossMinor < 200) problems.push('kwota pilotażu musi być liczbą całkowitą w groszach, co najmniej 200');
    if (!pilot.guarantee.trim()) problems.push('płatny pilotaż bez opisanej gwarancji zwrotu');
  }
  if (experiment.offer.request.nextSteps.length === 0) problems.push('formularz zgłoszenia bez opisu, co stanie się po wysłaniu');
  if (experiment.demo && experiment.demo.examples.length === 0) problems.push('demo bez żadnego przykładu');
  const phrases = experiment.keywordGroups.reduce((sum, group) => sum + group.phrases.length, 0);
  if (phrases < 3) problems.push('mniej niż 3 frazy do sprawdzenia w Planerze słów kluczowych (R4)');
  return problems;
}
