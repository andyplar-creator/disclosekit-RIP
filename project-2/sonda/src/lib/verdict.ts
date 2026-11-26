// Werdykt testu liczony z surowych liczb i progow eksperymentu.
// Czysta funkcja: te same liczby zawsze daja ten sam werdykt, bez "interpretacji".
//
// Zasady (po rundzie z trzema niezaleznymi sedziami, 2026-11-26):
// 1. Sam adres e-mail NIGDY nie daje GO. Licza sie tylko zgloszenia, ktore wlasciciel
//    recznie ocenil jako prawdziwe firmy, oraz prawdziwe platnosci.
// 2. Werdykt liczy sie wylacznie z platnego ruchu, bo tylko on jest powtarzalny.
// 3. Przy malej probie zero platnosci niczego nie dowodzi, wiec platnosc moze tylko
//    POTWIERDZIC popyt, nigdy go wykluczyc.
// 4. NO-GO dotyczy kanalu (reklam w wyszukiwarce), a nie produktu.

import type { Thresholds } from '../types';

export interface FunnelCounts {
  /** Unikalne wejscia z reklam (bez robotow). */
  adClicks: number;
  /** Unikalni odwiedzajacy (bez robotow), z dowolnego zrodla. */
  humanVisitors: number;
  /** Zgloszenia z reklam, jeszcze nieocenione przez wlasciciela. */
  adLeadsNew: number;
  /** Zgloszenia z reklam ocenione jako prawdziwe firmy (w tym te, ktore przyslaly dane). */
  adLeadsQualified: number;
  /** Zgloszenia z reklam, ktore przyslaly prawdziwe dane albo odbyly rozmowe. */
  adLeadsWithData: number;
  /** Wszystkie zgloszenia (bez testowych), z dowolnego zrodla. */
  allLeads: number;
  /** Oplacone pilotaze w trybie produkcyjnym Stripe. */
  paidOrders: number;
}

export type VerdictState = 'NO_DATA' | 'COLLECTING' | 'REVIEW' | 'GO' | 'INCONCLUSIVE' | 'NO_GO';

export interface Verdict {
  state: VerdictState;
  /** Postep zbierania danych: 0..1 wzgledem minAdClicks. */
  progress: number;
  headline: string;
  reasons: string[];
}

export function computeVerdict(c: FunnelCounts, t: Thresholds): Verdict {
  const progress = t.minAdClicks > 0 ? Math.min(1, c.adClicks / t.minAdClicks) : 1;
  const reasons: string[] = [];
  const pending =
    c.adLeadsNew > 0 ? `Nieocenione zgłoszenia z reklam: ${c.adLeadsNew}. Dopóki ich nie ocenisz, nie liczą się do werdyktu.` : null;

  if (t.goPaidOrders > 0 && c.paidOrders >= t.goPaidOrders) {
    reasons.push(`Opłacone pilotaże: ${c.paidOrders} (próg: ${t.goPaidOrders}). Prawdziwa płatność od nieznanej firmy to najmocniejszy sygnał.`);
    if (pending) reasons.push(pending);
    return { state: 'GO', progress, headline: 'GO: firma zapłaciła za pilotaż', reasons };
  }

  if (c.adLeadsQualified >= t.goQualifiedLeads && c.adLeadsWithData >= 1) {
    reasons.push(
      `Zgłoszenia z reklam ocenione jako prawdziwe firmy: ${c.adLeadsQualified} (próg: ${t.goQualifiedLeads}), z czego ${c.adLeadsWithData} przysłało dane albo odbyło rozmowę.`,
    );
    reasons.push('To GO dla reklam jako kanału wejściowego. Obsłuż te firmy ręcznie; nie jest to sygnał do pisania nowego produktu.');
    if (pending) reasons.push(pending);
    return { state: 'GO', progress, headline: 'GO: reklamy przyprowadzają firmy', reasons };
  }

  if (c.adClicks === 0) {
    reasons.push('Nie było jeszcze żadnego wejścia z reklamy. Werdykt liczy się tylko z płatnego ruchu, bo tylko on jest powtarzalny.');
    if (c.humanVisitors > 0) reasons.push(`Wejścia z innych źródeł: ${c.humanVisitors}. Nie wchodzą do werdyktu (to mogą być znajomi albo Ty).`);
    return { state: 'NO_DATA', progress: 0, headline: 'Brak danych', reasons };
  }

  if (c.adClicks < t.minAdClicks) {
    reasons.push(`Wejścia z reklam: ${c.adClicks} z ${t.minAdClicks} potrzebnych do werdyktu.`);
    reasons.push(`Firmy ocenione do tej pory: ${c.adLeadsQualified}. Przy tak małej próbie nic z tego nie wynika.`);
    if (pending) reasons.push(pending);
    return { state: 'COLLECTING', progress, headline: 'Zbieram dane', reasons };
  }

  reasons.push(
    `Wejścia z reklam: ${c.adClicks}. Firmy ocenione jako prawdziwe: ${c.adLeadsQualified}, w tym z danymi lub po rozmowie: ${c.adLeadsWithData}. Opłacone pilotaże: ${c.paidOrders}.`,
  );
  reasons.push(
    `Progi GO: ${t.goPaidOrders > 0 ? `${t.goPaidOrders} opłacony pilotaż albo ` : ''}${t.goQualifiedLeads} prawdziwe firmy, z których co najmniej jedna przysłała dane lub odbyła rozmowę.`,
  );

  const atEnd = c.adClicks >= t.maxAdClicks;
  const wouldBeNoGo = c.paidOrders === 0 && (c.adLeadsQualified === 0 || (atEnd && c.adLeadsQualified <= 1));

  if (wouldBeNoGo && pending) {
    reasons.push(pending);
    return { state: 'REVIEW', progress, headline: 'Najpierw oceń zgłoszenia', reasons };
  }

  if (wouldBeNoGo) {
    reasons.push(
      atEnd
        ? `Osiągnięto górny limit testu (${t.maxAdClicks} wejść z reklam). Dalsze wydawanie nie zmieni obrazu.`
        : `Po ${t.minAdClicks} wejściach z właściwych fraz nie zgłosiła się ani jedna prawdziwa firma.`,
    );
    reasons.push('To NO-GO dla reklam w wyszukiwarce jako kanału. Nie jest to werdykt o samym produkcie: zostają polecenia i partnerzy wdrożeniowi.');
    reasons.push('Zanim uznasz wynik, przeczytaj raport wyszukiwanych haseł w Google Ads. Jeśli większość kliknięć przyszła z niewłaściwych fraz, test jest nieważny, a nie przegrany.');
    return { state: 'NO_GO', progress, headline: 'NO-GO: reklamy nie przyprowadzają firm', reasons };
  }

  if (atEnd) {
    reasons.push(`Osiągnięto górny limit testu (${t.maxAdClicks} wejść), a sygnał jest częściowy. To szara strefa: obsłuż zgłoszone firmy ręcznie, niczego nowego nie buduj.`);
  } else {
    reasons.push(`Sygnał jest częściowy. Kontynuuj do ${t.maxAdClicks} wejść bez zmian na stronie; rozmawiaj z firmami, które się zgłosiły.`);
  }
  if (pending) reasons.push(pending);
  return { state: 'INCONCLUSIVE', progress, headline: 'Nierozstrzygnięte: sygnał częściowy', reasons };
}
