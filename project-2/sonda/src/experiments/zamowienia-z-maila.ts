// Eksperyment flagowy: czy reklamy w wyszukiwarce przyprowadza hurtownie do ISTNIEJACEGO PLAR Orders.
//
// To NIE jest test nowego, taniego produktu. Po rundzie z trzema niezaleznymi sedziami (2026-11-26)
// wariant "Lite za 199 zl" zostal odrzucony: podcinalby jedyny przychod i mierzyl produkt, ktorego nie ma.
//
// SKAD POCHODZA TRESCI (stan plar.ai/orders na 2026-11-26):
//   Z TWOJEJ STRONY, przeniesione prawie doslownie: naglowek i podtytul, zdanie o dzialaniu od maja 2026,
//     cytat z referencji, cztery kroki "jak to dziala", obie listy "co robi / czego nie udaje",
//     "dla kogo / nie dla kogo", cennik (4 900 zl + od 800 zl), brak rocznego zobowiazania,
//     dodatek "integracja Comarch / Subiekt".
//   NOWE OBIETNICE, ktorych na plar.ai/orders NIE MA (kazda oznaczona slowem DECYZJA):
//     odpowiedzi w sekcji pytan (na Twojej stronie widzialem tylko pytania), lista "co sie stanie po wyslaniu"
//     (w tym darmowe przerobienie 5 przykladowych zamowien), termin odpowiedzi 2 dni robocze
//     (plar.ai/orders mowi: 1 dzien roboczy), platny pilotaz 30 dni i jego warunki zwrotu,
//     trzy przyklady w sekcji demo (wymyslone wiadomosci, wyniki przygotowane recznie).
//
// Kazde zdanie ponizej to obietnica zlozona klientowi. Zanim dopiszesz ten eksperyment do LIVE_EXPERIMENTS,
// przeczytaj calosc i skresl to, czego nie dowieziesz. Zadnych wymyslonych liczb ani opinii.

import type { Experiment } from '../types';

export const zamowieniaZMaila: Experiment = {
  slug: 'zamowienia-z-maila',
  status: 'draft',
  locale: 'pl',
  internalName: 'PLAR Orders: test reklam jako kanału wejściowego',
  hypothesis:
    'Właściciele małych hurtowni i firm dystrybucyjnych, którzy szukają w Google sposobu na przepisywanie zamówień z maila, zgłoszą swoją firmę do pilotażu PLAR Orders albo za niego zapłacą.',
  researchWarning:
    'Research (2026-11-26): wolumen fraz zakupowych jest niezweryfikowany i prawdopodobnie mały. Zanim wdrożysz stronę i wydasz złotówkę na reklamy, sprawdź frazy w Planerze słów kluczowych (plik docs/01-BRAMKI.md). Budżet 100 EUR to za mało na werdykt: przy koszcie kliknięcia z disclosekit (13,48 zł) daje ok. 32 kliknięcia.',
  meta: {
    title: 'Zamówienia z maili i SMS-ów bez przepisywania — pilotaż | PLAR Orders',
    description:
      'PLAR Orders czyta zamówienia z maili i SMS-ów od Twoich odbiorców, a Twój zespół tylko je zatwierdza. Zgłoś firmę do pilotażu na własnych zamówieniach.',
  },
  hero: {
    eyebrow: '// Dla hurtowni i dystrybutorów B2B',
    headline: 'Zamówienia z maili i SMS-ów. Bez przepisywania.',
    sub: 'Twoi odbiorcy piszą zamówienia tak jak zawsze. PLAR Orders je czyta, wyciąga produkty, ilości i klienta, a Twój zespół tylko zatwierdza w panelu. Nic się nie gubi.',
    primaryCta: 'Zgłoś firmę do pilotażu',
    secondaryCta: 'Zobacz przykłady',
  },
  proof: {
    text: 'Działa produkcyjnie od maja 2026 u dystrybutora w Trójmieście, z podpisaną referencją.',
    linkLabel: 'Pełny opis i cennik PLAR Orders',
    linkUrl: 'https://plar.ai/orders',
  },
  // DECYZJA: cytat jest opublikowany na plar.ai/orders. Potwierdź u klienta, że możesz go użyć także tutaj.
  reference: {
    quote: 'System został skonfigurowany pod nasz sposób pracy, a nie odwrotnie.',
    author: 'Łukasz Smukała, Prezes Zarządu — Kreatywna Sp. z o.o. (Only Good Coffee, Gdańsk)',
    source: 'Z podpisanego listu referencyjnego. Pełny list do wglądu na rozmowie.',
  },
  // DECYZJA: przykłady są POGLĄDOWE (wymyślone wiadomości, wyniki przygotowane ręcznie; strona to podpisuje).
  // Najlepiej przepuść te trzy wiadomości przez prawdziwy PLAR Orders i wklej tu to, co naprawdę widzi operator.
  // Sprawdź też, czy wymyślone nazwy firm nie pokrywają się z prawdziwymi.
  demo: {
    kind: 'orders',
    title: 'Tak wygląda zamówienie po odczytaniu',
    intro: 'Trzy przykładowe wiadomości i to, co zobaczy operator. Gdy czegoś brakuje, system nie zgaduje, tylko oznacza zamówienie jako do uściślenia.',
    examples: [
      {
        label: 'Mail od kawiarni',
        input: `Dzień dobry,
poproszę na czwartek:
- 6 kg Brazylia Santos ziarno
- 2 kartony mleka owsianego barista
- syrop waniliowy 3 szt
Dostawa na Długą 12.
Pozdrawiam
Marta, Kawiarnia Pod Zegarem`,
        output: {
          is_order: true,
          customer: 'Kawiarnia Pod Zegarem (Marta)',
          delivery_date: 'czwartek',
          delivery_address: 'Długa 12',
          items: [
            { product: 'Brazylia Santos ziarno', quantity: 6, unit: 'kg', note: null },
            { product: 'mleko owsiane barista', quantity: 2, unit: 'karton', note: null },
            { product: 'syrop waniliowy', quantity: 3, unit: 'szt', note: null },
          ],
          to_clarify: ['Jakiej wielkości kartony mleka owsianego (ile sztuk w kartonie)?'],
        },
      },
      {
        label: 'SMS od sklepu',
        input: `hej, 10x espresso blend 1kg, 4x bezkofeinowa 250g, filtry V60 02 - 2 opakowania. na jutro rano jak sie da. sklep Zielony Koszyk`,
        output: {
          is_order: true,
          customer: 'sklep Zielony Koszyk',
          delivery_date: 'jutro rano',
          delivery_address: null,
          items: [
            { product: 'espresso blend 1kg', quantity: 10, unit: 'szt', note: null },
            { product: 'bezkofeinowa 250g', quantity: 4, unit: 'szt', note: null },
            { product: 'filtry V60 02', quantity: 2, unit: 'opakowanie', note: null },
          ],
          to_clarify: ['Brak adresu dostawy w wiadomości.'],
        },
      },
      {
        label: 'Niejasne zamówienie od nowego klienta',
        input: `Dzień dobry, chcielibyśmy zamówić kawę do biura na przyszły tydzień, jakieś 2-3 kg, i coś do czyszczenia ekspresu. Faktura na spółkę.
Biuro Rachunkowe Klamra`,
        output: {
          is_order: true,
          customer: 'Biuro Rachunkowe Klamra',
          delivery_date: 'przyszły tydzień',
          delivery_address: null,
          items: [
            { product: 'kawa', quantity: null, unit: 'kg', note: 'klient pisze „jakieś 2-3 kg”, nie podaje rodzaju' },
            { product: 'środek do czyszczenia ekspresu', quantity: null, unit: null, note: 'nie podano, który' },
          ],
          to_clarify: [
            'Jaka kawa i dokładnie ile: 2 czy 3 kg?',
            'Który środek do czyszczenia ekspresu i w jakiej ilości?',
            'Na który dzień przyszłego tygodnia i pod jaki adres?',
          ],
        },
      },
    ],
    // DECYZJA: pole "wklej wlasna wiadomosc" jest wylaczone. Wlacza je zmienna LIVE_PASTE_EXPERIMENTS
    // (plus klucz ANTHROPIC_API_KEY). Zrob to dopiero, gdy bramka slow kluczowych przejdzie i gdy zaakceptujesz
    // koszt wywolan modelu oraz to, ze ludzie beda wklejac dane swoich klientow.
    livePaste: false,
    placeholder: 'Wklej tutaj treść maila lub SMS-a z zamówieniem…',
    button: 'Pokaż, co z tego wyjdzie',
    privacyNote:
      'Tekst trafia do modelu AI (Claude, Anthropic) tylko po to, żeby pokazać wynik. Nie zapisujemy go. Nie wklejaj danych, których nie chcesz przetwarzać.',
    // DECYZJA: tu wstaw link do 90-sekundowego nagrania prawdziwego panelu (za zgodą klienta, z zamazanymi danymi).
    // videoUrl: 'https://...',
    // videoLabel: 'Zobacz 90-sekundowe nagranie panelu',
  },
  steps: [
    { title: 'Klient pisze normalnie', body: 'Mail, SMS, „jak zawsze”. PLAR odbiera z jednego adresu i jednego numeru.' },
    { title: 'PLAR czyta i sortuje', body: 'Wyciąga produkty, ilości, klienta, adres. Wyświetla w Twoim panelu.' },
    { title: 'Ty zatwierdzasz', body: 'Operator z Twojego zespołu klika „OK” albo poprawia detal. Sekundy na zamówienie.' },
    { title: 'Reszta dzieje się sama', body: 'Zamówienie ląduje w arkuszu, historia operacji jest zapisana.' },
  ],
  scope: {
    doesTitle: 'Co dokładnie robi PLAR Orders',
    does: [
      'Odbiera maile z jednego wskazanego adresu i SMS-y z jednego numeru',
      'Wyciąga z treści produkty, ilości, klienta, adres dostawy i datę',
      'Wyświetla zamówienia w jednej liście w Twoim panelu',
      'Pozwala operatorowi zatwierdzić, poprawić detal albo odrzucić',
      'Zapisuje zatwierdzone zamówienia w Twoim arkuszu Google Sheets',
      'Zapisuje historię: kto, kiedy i co poprawił',
    ],
    doesNotTitle: 'Czego PLAR nie udaje',
    doesNot: [
      'Nie zastępuje Twojego ERP (Comarch, Subiekt, Symfonia). Działa obok.',
      'Nie czyta załączników w formie zdjęć. Screenshot operator musi otworzyć i wpisać.',
      'Nie zgadnie „tego co zawsze”, jeśli klient jest nowy. Takie zamówienia trafiają do panelu z flagą „do uściślenia”.',
      'Nie obsługuje reklamacji, zwrotów ani korekt. Tylko pierwotne zamówienia.',
    ],
  },
  fit: {
    forTitle: 'To jest dla Ciebie, jeśli…',
    for: [
      'Prowadzisz hurtownię albo firmę dystrybucyjną B2B (5–30 osób)',
      'Odbiorcy zamawiają mailem, SMS-em albo telefonem, rzadko przez formularz',
      'Codziennie ktoś u Ciebie przepisuje te zamówienia ręcznie do arkusza albo systemu magazynowego',
    ],
    notForTitle: 'To nie jest dla Ciebie, jeśli…',
    notFor: [
      'Macie już platformę B2B z koszykiem i klienci tam zamawiają',
      'Jesteście firmą 100+ z zakupami przez przetargi',
      'Działacie w branży ściśle regulowanej (farmacja, alkohol, paliwa)',
    ],
  },
  offer: {
    title: 'Pilotaż na Twoich zamówieniach',
    priceLines: ['Wdrożenie: 4 900 zł jednorazowo', 'Abonament: od 800 zł miesięcznie'],
    priceNote: 'Ceny netto, bez rocznego zobowiązania. Zaczynamy od Twoich przykładowych zamówień, żebyś zobaczył wynik przed decyzją o wdrożeniu.',
    request: {
      title: 'Zgłoś firmę do pilotażu',
      body: 'Odpiszę osobiście, bez prezentacji slajdów i bez gotowych pakietów.',
      button: 'Wyślij zgłoszenie',
      // DECYZJA: plar.ai/orders obiecuje odpowiedź w 1 dzień roboczy. Tu stoją 2 dni, bo Sonda sama nie wysyła
      // powiadomień (chyba że ustawisz NOTIFY_WEBHOOK_URL). Zmień tylko, jeśli na pewno dotrzymasz.
      success: 'Zgłoszenie przyjęte. Odpiszę osobiście w ciągu 2 dni roboczych.',
      companyLabel: 'Firma',
      nipLabel: 'NIP (opcjonalnie)',
      erpLabel: 'Program magazynowy lub ERP, z którego korzystacie',
      volumeLabel: 'Ile zamówień mailem lub SMS-em dostajecie tygodniowo?',
      phoneLabel: 'Telefon (opcjonalnie)',
      noteLabel: 'Jak dziś przyjmujecie zamówienia? (opcjonalnie)',
      // DECYZJA: zostaw puste (''), jeśli nie chcesz oferować płatnego pilotażu na fakturę.
      // Gdy firma zapłaci przelewem, oznacz jej zgłoszenie w panelu oceną „zapłaciła (przelew / pro forma)”.
      invoiceCheckbox: 'Chcę od razu zamówić płatny pilotaż (30 dni) na fakturę pro forma.',
      // DECYZJA: cała lista to nowe obietnice (na plar.ai/orders jest 15-minutowa rozmowa, nie przerabianie zamówień).
      nextSteps: [
        'Odpiszę w ciągu 2 dni roboczych.',
        'Poproszę o 5 przykładowych zamówień (możesz zamazać dane klientów).',
        'Odeślę je w postaci, w jakiej zobaczyłby je Twój operator.',
        'Dopiero wtedy decydujesz, czy chcesz rozmawiać dalej.',
      ],
    },
    // DECYZJA: płatny pilotaż to NOWA oferta (rekomendacja sędziów: 300-500 zł netto, jednorazowo,
    // zaliczane na poczet wdrożenia). Kwotę zmieniasz TYLKO w amountGrossMinor: to kwota BRUTTO w groszach
    // (490 zł netto x 1,23 = 602,70 zł -> 60270). Strona sama dopisuje ją do przycisku i do pola wyboru.
    // Usuń cały blok "pilot" i wyczyść invoiceCheckbox, jeśli nie chcesz płatnego pilotażu.
    pilot: {
      title: 'Płatny pilotaż na 30 dni',
      body: 'Konfiguruję PLAR Orders pod kilku Twoich odbiorców i przez 30 dni pracujecie na prawdziwych zamówieniach. Kwota zalicza się na poczet wdrożenia.',
      button: 'Opłacam pilotaż',
      amountGrossMinor: 60270,
      currency: 'pln',
      productName: 'PLAR Orders: pilotaż 30 dni',
      // To samo zdanie co w regulaminie (src/pages/legal.ts). Zmieniasz jedno, zmień oba.
      guarantee:
        'Jeśli nie uruchomię pilotażu w 14 dni od wpłaty, zwracam całą kwotę bez wezwania. Możesz też zażądać zwrotu całej kwoty w dowolnej chwili pilotażu i do 7 dni po jego zakończeniu.',
      termsCheckbox: 'Kupuję jako przedsiębiorca i akceptuję regulamin płatnego pilotażu.',
    },
  },
  // DECYZJA: odpowiedzi poniżej złożyłem z innych zdań Twojej strony (na plar.ai/orders widziałem same pytania).
  // Wklej tu swoje prawdziwe odpowiedzi.
  faq: [
    {
      q: 'Czy musimy zmieniać nasze procesy?',
      a: 'Nie. Twoi odbiorcy piszą tak jak dotąd. Zmienia się tylko to, że zamówienia trafiają do jednego panelu wstępnie opracowane, a operator je zatwierdza zamiast przepisywać.',
    },
    {
      q: 'Co jeśli klient pisze „jak zawsze” albo nie podaje ilości?',
      a: 'System nie zgaduje. Takie zamówienie trafia do panelu z flagą „do uściślenia” i operator dopytuje klienta.',
    },
    {
      q: 'Czy to działa z naszym ERP (Comarch, Subiekt, Symfonia)?',
      a: 'PLAR Orders nie zastępuje ERP i działa obok niego: zatwierdzone zamówienia zapisuje w arkuszu Google Sheets. Integracja z Comarch lub Subiektem jest dostępna jako płatny dodatek; cennik jest na plar.ai/orders.',
    },
    {
      q: 'Co z danymi naszych klientów?',
      a: 'Zamówienia przetwarzam wyłącznie po to, żeby przygotować je do zatwierdzenia. Przed startem pilotażu dostajesz umowę powierzenia przetwarzania danych.',
    },
    { q: 'Czy jest zobowiązanie na rok?', a: 'Nie. Nie ma rocznego zobowiązania, a pierwsze 3 miesiące to okres weryfikacji.' },
  ],
  // Progi po rundzie z sędziami i po recenzji:
  //   poniżej 60 wejść z reklam nic nie mówimy; koniec testu przy 200;
  //   GO = 1 opłacony pilotaż od firmy z reklamy ALBO 3 prawdziwe firmy (co najmniej 1 z danymi lub po rozmowie);
  //   NO-GO dopiero przy 200 wejściach i najwyżej 1 prawdziwej firmie. Przy 60 wejściach zero zgłoszeń
  //   zdarza się w ok. połowie prób nawet przy realnej konwersji 1,1%, więc wcześniej byłby to rzut monetą.
  thresholds: { minAdClicks: 60, maxAdClicks: 200, goPaidOrders: 1, goQualifiedLeads: 3, noGoMaxQualifiedLeads: 1 },
  keywordGroups: [
    {
      name: 'Problem (to chcesz testować)',
      note: 'Ktoś szuka rozwiązania dokładnie tego kłopotu. Mały wolumen, właściwa intencja.',
      phrases: [
        'przepisywanie zamówień z maila',
        'automatyzacja zamówień hurtownia',
        'automatyczne wprowadzanie zamówień',
        'zamówienia z maila do excela',
        'zamówienia z maila do subiekta',
        'import zamówień do subiekta',
      ],
    },
    {
      name: 'Kategoria (raportuj osobno)',
      note: 'Większy wolumen, ale szukający chcą raczej platformy B2B z koszykiem. Tu licytują firmy z handlowcami.',
      phrases: ['platforma b2b dla hurtowni', 'system zamówień b2b', 'program do przyjmowania zamówień', 'system zamówień dla hurtowni'],
    },
    {
      name: 'Poza zakresem (sprawdź wolumen, nie kupuj)',
      note: 'Te frazy obiecują coś, czego strona wprost nie oferuje (odczyt skanów i PDF). Kliknięcia z nich zaniżałyby wynik testu.',
      phrases: ['ocr zamówień', 'zamówienia pdf do subiekta'],
    },
  ],
};
