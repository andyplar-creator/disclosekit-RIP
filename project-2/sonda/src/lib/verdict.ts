// Werdykt testu liczony z surowych liczb i progow eksperymentu.
// Czysta funkcja: te same liczby zawsze daja ten sam werdykt, bez "interpretacji".
//
// Zasady (po rundzie z trzema sedziami i po recenzji kodu, 2026-11-26/27):
// 1. Sam adres e-mail NIGDY nie daje GO. Licza sie tylko zgloszenia, ktore wlasciciel
//    recznie ocenil jako prawdziwe firmy, oraz platnosci od firm z reklam.
// 2. Werdykt liczy sie wylacznie z platnego ruchu, bo tylko on jest powtarzalny.
// 3. Zero przy malej probie niczego nie dowodzi. NO-GO zapada dopiero na koncu testu (maxAdClicks),
//    nigdy wczesniej. Przy 60 wejsciach i konwersji 1,1% zero zgloszen zdarza sie w polowie prob.
// 4. NO-GO nie zapada, dopoki cokolwiek czeka na ocene albo dopoki sa prawdziwe firmy z "innych zrodel":
//    strona jest zasilana reklamami, wiec taka firma to najpewniej ktos, kto wrocil bez parametru reklamy.
// 5. NO-GO nie zapada bez klikniec wpisanych z Google Ads: wlasny licznik wejsc da sie sztucznie napompowac.
// 6. NO-GO dotyczy kanalu (reklam w wyszukiwarce), a nie produktu.

import type { Thresholds } from '../types';

export interface FunnelCounts {
  /** Unikalne wejscia z reklam wg Sondy (bez robotow). */
  adClicks: number;
  /** Klikniecia wg Google Ads wpisane recznie przez wlasciciela; null, gdy nic nie wpisano. */
  googleClicks: number | null;
  /** Unikalni odwiedzajacy (bez robotow), z dowolnego zrodla. */
  humanVisitors: number;
  /** Zgloszenia z reklam, jeszcze nieocenione przez wlasciciela. */
  adLeadsNew: number;
  /** Zgloszenia z reklam ocenione jako prawdziwe firmy (takze te z danymi i te, ktore zaplacily). */
  adLeadsQualified: number;
  /** Zgloszenia z reklam, ktore przyslaly dane, odbyly rozmowe albo zaplacily. */
  adLeadsWithData: number;
  /** Zgloszenia z innych zrodel, jeszcze nieocenione. */
  otherLeadsNew: number;
  /** Zgloszenia z innych zrodel ocenione jako prawdziwe firmy. */
  otherLeadsQualified: number;
  /** Wszystkie zgloszenia (bez testowych i podejrzanych), z dowolnego zrodla. */
  allLeads: number;
  /** Oplacone pilotaze od firm z reklam: prawdziwe platnosci Stripe (niewykluczone) + zgloszenia ocenione jako "zaplacila". */
  paidOrders: number;
  /** Prawdziwe platnosci z innych zrodel (nie licza sie do werdyktu o reklamach). */
  paidOther: number;
}

export type VerdictState = 'NO_DATA' | 'COLLECTING' | 'REVIEW' | 'GO' | 'INCONCLUSIVE' | 'NO_GO';

export interface Verdict {
  state: VerdictState;
  /** Wejscia z reklam uzyte do progow: mniejsza z liczb Sondy i Google (gdy Google wpisano). */
  effectiveAdClicks: number;
  /** Postep zbierania danych: 0..1 wzgledem maxAdClicks. */
  progress: number;
  headline: string;
  reasons: string[];
}

export function computeVerdict(c: FunnelCounts, t: Thresholds): Verdict {
  // Do progow bierzemy ostrozniejsza z dwoch liczb: wlasny licznik da sie napompowac jednym skryptem.
  const effectiveAdClicks = c.googleClicks === null ? c.adClicks : Math.min(c.adClicks, c.googleClicks);
  const progress = t.maxAdClicks > 0 ? Math.min(1, effectiveAdClicks / t.maxAdClicks) : 1;
  const reasons: string[] = [];
  const done = (state: VerdictState, headline: string): Verdict => ({ state, effectiveAdClicks, progress, headline, reasons });

  const notes: string[] = [];
  if (c.adLeadsNew > 0) notes.push(`Nieocenione zgłoszenia z reklam: ${c.adLeadsNew}. Dopóki ich nie ocenisz, nie liczą się do werdyktu.`);
  if (c.otherLeadsNew > 0) notes.push(`Nieocenione zgłoszenia z innych źródeł: ${c.otherLeadsNew}.`);
  if (c.otherLeadsQualified > 0) {
    notes.push(
      `Prawdziwe firmy ze źródłem „inne”: ${c.otherLeadsQualified}. Strona jest zasilana reklamami, więc to najpewniej osoby, które wróciły bez parametru reklamy (inny dzień, inne urządzenie). Jeśli tak było, zmień im źródło na „reklama” w tabeli zgłoszeń.`,
    );
  }
  if (c.paidOther > 0) notes.push(`Płatności ze źródeł innych niż reklamy: ${c.paidOther}. Nie liczą się do werdyktu o reklamach; jeśli firma przyszła z reklamy, zmień źródło płatności.`);
  if (c.googleClicks !== null && c.adClicks > c.googleClicks * 1.2 + 2) {
    notes.push(
      `UWAGA: Sonda widzi ${c.adClicks} wejść z reklam, a Google raportuje ${c.googleClicks} kliknięć. Nadwyżka to nie są prawdziwe kliknięcia (roboty, ktoś otwiera adres reklamy ręcznie). Do progów biorę liczbę z Google.`,
    );
  }

  if (t.goPaidOrders > 0 && c.paidOrders >= t.goPaidOrders) {
    reasons.push(`Opłacone pilotaże od firm z reklam: ${c.paidOrders} (próg: ${t.goPaidOrders}). Płatność to najmocniejszy sygnał.`);
    reasons.push('Sprawdź w tabeli płatności, że to nie Twoja własna próba: takie płatności oznacz jako „nie licz”.');
    reasons.push(...notes);
    return done('GO', 'GO: firma z reklamy zapłaciła za pilotaż');
  }

  if (c.adLeadsQualified >= t.goQualifiedLeads && c.adLeadsWithData >= 1) {
    reasons.push(
      `Zgłoszenia z reklam ocenione jako prawdziwe firmy: ${c.adLeadsQualified} (próg: ${t.goQualifiedLeads}), z czego ${c.adLeadsWithData} przysłało dane, odbyło rozmowę albo zapłaciło.`,
    );
    reasons.push('To GO dla reklam jako kanału wejściowego. Obsłuż te firmy ręcznie; nie jest to sygnał do pisania nowego produktu.');
    reasons.push(...notes);
    return done('GO', 'GO: reklamy przyprowadzają firmy');
  }

  if (c.adClicks === 0) {
    reasons.push('Nie było jeszcze żadnego wejścia z reklamy. Werdykt liczy się tylko z płatnego ruchu, bo tylko on jest powtarzalny.');
    if (c.humanVisitors > 0) reasons.push(`Wejścia z innych źródeł: ${c.humanVisitors}. Nie wchodzą do werdyktu (to mogą być znajomi albo Ty).`);
    reasons.push(...notes);
    return done('NO_DATA', 'Brak danych');
  }

  if (effectiveAdClicks < t.minAdClicks) {
    reasons.push(`Wejścia z reklam: ${effectiveAdClicks} z ${t.minAdClicks}, poniżej których nic nie da się powiedzieć.`);
    reasons.push(`Firmy ocenione do tej pory: ${c.adLeadsQualified}. Przy tak małej próbie nic z tego nie wynika.`);
    reasons.push(...notes);
    return done('COLLECTING', 'Zbieram dane');
  }

  reasons.push(
    `Wejścia z reklam: ${effectiveAdClicks}. Firmy ocenione jako prawdziwe: ${c.adLeadsQualified}, w tym z danymi, po rozmowie lub po wpłacie: ${c.adLeadsWithData}. Opłacone pilotaże: ${c.paidOrders}.`,
  );
  reasons.push(
    `Progi GO: ${t.goPaidOrders > 0 ? `${t.goPaidOrders} opłacony pilotaż albo ` : ''}${t.goQualifiedLeads} prawdziwe firmy, z których co najmniej jedna przysłała dane lub odbyła rozmowę.`,
  );

  const atEnd = effectiveAdClicks >= t.maxAdClicks;

  if (!atEnd) {
    reasons.push(
      c.adLeadsQualified === 0
        ? `Na razie żadna prawdziwa firma. To słaby sygnał, nie wyrok: przy ${effectiveAdClicks} wejściach zero zgłoszeń zdarza się często także wtedy, gdy popyt istnieje. Kontynuuj do ${t.maxAdClicks} wejść bez zmian na stronie.`
        : `Sygnał jest częściowy. Kontynuuj do ${t.maxAdClicks} wejść bez zmian na stronie; rozmawiaj z firmami, które się zgłosiły.`,
    );
    reasons.push(...notes);
    return done('INCONCLUSIVE', c.adLeadsQualified === 0 ? 'Nierozstrzygnięte: za mała próba na NO-GO' : 'Nierozstrzygnięte: sygnał częściowy');
  }

  // Koniec testu.
  const fewCompanies = c.adLeadsQualified <= t.noGoMaxQualifiedLeads;
  if (!fewCompanies) {
    reasons.push(`Osiągnięto górny limit testu (${t.maxAdClicks} wejść), a sygnał jest częściowy. To szara strefa: obsłuż zgłoszone firmy ręcznie, niczego nowego nie buduj.`);
    reasons.push(...notes);
    return done('INCONCLUSIVE', 'Nierozstrzygnięte: sygnał częściowy');
  }

  // Tu wynik liczbowy to NO-GO. Zanim go oglosimy: czy na pewno nic nie czeka na czlowieka?
  const blockers: string[] = [];
  if (c.adLeadsNew + c.otherLeadsNew > 0) blockers.push('są nieocenione zgłoszenia');
  if (c.otherLeadsQualified > 0) blockers.push('są prawdziwe firmy ze źródłem „inne”');
  if (c.paidOther > 0) blockers.push('są płatności ze źródłem „inne”');
  if (c.googleClicks === null) blockers.push('nie wpisałeś kliknięć z Google Ads, więc nie da się potwierdzić liczby wejść');
  if (blockers.length > 0) {
    reasons.push(`Liczby wskazują na NO-GO, ale nie ogłaszam go, bo ${blockers.join('; ')}.`);
    reasons.push(...notes);
    return done('REVIEW', 'Najpierw sprawdź i oceń');
  }

  reasons.push(`Osiągnięto górny limit testu (${t.maxAdClicks} wejść z reklam) i zgłosiło się najwyżej ${t.noGoMaxQualifiedLeads} prawdziwych firm. Dalsze wydawanie nie zmieni obrazu.`);
  reasons.push('To NO-GO dla reklam w wyszukiwarce jako kanału. Nie jest to werdykt o samym produkcie: zostają polecenia i partnerzy wdrożeniowi.');
  reasons.push('Zanim uznasz wynik, przeczytaj raport wyszukiwanych haseł w Google Ads. Jeśli większość kliknięć przyszła z niewłaściwych fraz, test jest nieważny, a nie przegrany.');
  reasons.push(...notes);
  return done('NO_GO', 'NO-GO: reklamy nie przyprowadzają firm');
}
