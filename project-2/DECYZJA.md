# Projekt #2 — decyzja

Stan na 2026-11-26. Ten plik zastępuje czytanie całego researchu. Dowody są w `research/`, narzędzie w `sonda/`.

## Werdykt w trzech zdaniach

1. **Żaden nowy produkt nie zasłużył na budowę.** Z 12 soczewek wyszło 189 pozycji (22 kandydatów i 167 odrzuconych;
   część się powtarza, kilkanaście to „nie zdążyłem zbadać"). Ośmiu finalistów dostało pogłębioną weryfikację:
   2 martwych, 6 słabych.
2. **Twój najlepszy „w miarę pasywny" dochód już istnieje i nazywa się PLAR Orders.** Jeden dodatkowy klient to
   4 900 zł + 12 × 800 zł = 14 500 zł w pierwszym roku. Mediana zweryfikowanego przychodu solo-projektów to
   136–169 USD miesięcznie (próby 3,5–5 tys. projektów), przy medianie wzrostu 0%.
3. **Wąskim gardłem jest kanał sprzedaży, a nie produkt.** Projekt #2 to więc znalezienie kanału dla PLAR Orders:
   najpierw polecenia i partnerzy wdrożeniowi, obok tani test reklam. Nie nowy kod.

To nie jest odpowiedź, o którą prosiłeś („nowy projekt"). To odpowiedź, którą dają dane, i dokładnie ten rodzaj
sprzeciwu, którego zabrakło przy disclosekit (Miss #5 i #12).

## Skąd ten werdykt

Szczegóły: `research/03-decision/evidence-digest.md`. W skrócie:

| Ustalenie | Co z niego wynika |
|---|---|
| Prawie każda nisza, którą da się znaleźć wyszukiwarką, ma 3–15 klonów zbudowanych z pomocą AI, z cenami 0–99 zł/mies. | Umiejętność szybkiego budowania nie jest już przewagą. |
| Lider kategorii konwerterów wyciągów sam napisał w sierpniu 2026 „My business is dying" (przychód −24% od lutego), wskazując darmowe czaty AI. | Substytucja przez czat zabija także liderów. Reguła substytucji z LESSONS.md jest ważniejsza niż kiedykolwiek. |
| W sklepach z aplikacjami: gdzie jest popyt, lider ma świetne oceny; gdzie lider jest słaby, popytu nie ma. | To rynek efektywny. „Luka" zwykle oznacza pustą półkę. |
| Shopify od listopada 2026 wymaga 10 instalacji na płatnych sklepach, zanim wolno zgłosić kolejną aplikację. | Strategia „wystawię kilka małych aplikacji" przestała być tania. |
| Agenci AI jeszcze realnie nie płacą. | Pilot Agent Spend Governance to dziś wiedza i wiarygodność, nie przychód. |
| Nadal zarabia to, czego klon nie skopiuje w weekend: zaufanie, wdrożenie pod klienta, pozycja w kanale. | To opis PLAR Orders, a nie taniego narzędzia samoobsługowego. |

Cztery fakty nośne sprawdziłem ponownie osobnymi wyszukiwaniami (digest, sekcja 5). Jedną liczbę skorygowałem
w dół: mediana przychodu to 136–169 USD, nie 445.

## Czego research NIE ustalił

- **Wolumenu wyszukiwań dla żadnej frazy.** Nie miałem narzędzia. To największa dziura w całej bazie dowodów
  i zamykasz ją sam w 30–45 minut (`sonda/docs/01-BRAMKI.md`).
- Research szedł wyłącznie przez wyniki wyszukiwarki, bez otwierania stron. Liczby z dossier traktuj jak tropy
  z linkiem, nie jak audyt.
- Pierwszy sweep został przycięty limitem wyszukiwań. Każde dossier mówi wprost, czego nie sprawdziło.

## Jak powstała decyzja

Moją roboczą decyzję (zestaw testowy + test taniej wersji „Lite za 199 zł") oddałem trzem niezależnym sędziom
z zadaniem jej podważenia. Wszyscy trzej zgodzili się z diagnozą i odrzucili receptę. Mieli rację w czterech punktach,
które zmieniły plan:

1. **„Lite za 199 zł" testowałby produkt, którego nie masz i nie powinieneś chcieć.** Podcina jedyny przychód,
   a 15 klientów po 199 zł to mniej pieniędzy i więcej obsługi niż 4 klientów po 800 zł.
2. **Budżet 100 EUR nie kupi werdyktu.** To ok. 425 zł (szacunek kursu): 32 kliknięcia po 13,48 zł (Twój koszt
   z maja) albo 85 po 5 zł. Jeśli naprawdę 1 na 100 klikających by zapłacił, zero wpłat zobaczysz w 73% prób
   przy 32 kliknięciach i w 43% przy 85. Zero niczego wtedy nie dowodzi.
3. **Sam adres e-mail nie jest sygnałem** dla kupującego, który wpuszcza narzędzie w obieg zamówień.
   Sygnałem jest firma, która podała program i liczbę zamówień, a potem przysłała dane albo zapłaciła.
4. **Zestaw testowy urósł ponad „jeden wieczór" z reguły R1.** Zamroziłem jego zakres: jeden eksperyment,
   żadnych szkiców pod pomysły ocenione jako słabe.

Opinie w całości: `research/03-decision/judge-*.md`.

## Plan

Kolejność ma znaczenie. Nic z punktów 3–4 nie rusza przed punktem 1.

### 1. Dwie darmowe bramki (ten tydzień, ok. 2 godziny Twojego czasu)

- **Planer słów kluczowych** dla fraz z `sonda/docs/01-BRAMKI.md`. To decyduje, czy test reklam w ogóle ma co mierzyć.
- **Rozmowa z obecnym klientem**: cztery pytania (ten sam plik). Plus jedna liczba z Twojego kalendarza:
  ile godzin tygodniowo kosztuje Cię dziś ten klient. Ona wyznacza sufit liczby klientów przy limicie 2–4 h/tydz.

### 2. Kanał partnerski i polecenia (90 dni, 1–2 h tygodniowo) — główny tor

Plan, bramki i szkice wiadomości: `sonda/docs/04-KANAL-PARTNERSKI.md`. Start przez ciepłe kontakty: klient
referencyjny, firma serwisująca jego program magazynowy, dwa zapytania o katalogi partnerskie (InsERT, IdoSell).

To wymaga **Twojej decyzji**: poluzowania reguły „zero outboundu" do „zero zimnych telefonów i masowych maili,
ale rozmowy z kilkoma firmami, które na tym zarobią, są dozwolone". Bez tej decyzji PLAR Orders zostaje usługą
dla jednego klienta, a ja nie znalazłem niczego lepszego.

### 3. Test reklam jako kanału wejściowego (tylko jeśli bramka z punktu 1 przejdzie)

Narzędzie jest gotowe: `sonda/`. Strona sprzedaje istniejący PLAR Orders, z Twoim prawdziwym cennikiem i referencją.
Sygnały: zgłoszenie firmy (firma, program, liczba zamówień) i opcjonalny płatny pilotaż.

| Parametr | Wartość | Skąd |
|---|---|---|
| Minimalna próba | 60 unikalnych wejść z reklam | poniżej tego zero zgłoszeń nic nie znaczy |
| Koniec testu | 200 wejść albo 28 dni | sędziowie: 60–200 |
| Budżet | do 300 EUR; przy 100 EUR przyjmij z góry, że werdyktu może nie być | rachunek wyżej |
| GO | 1 opłacony pilotaż od nieznanej firmy ALBO 3 prawdziwe firmy, z których co najmniej 1 przysłała dane lub odbyła rozmowę | synteza trzech opinii |
| NO-GO | 60+ wejść i ani jednej prawdziwej firmy; albo 200 wejść i najwyżej jedna | jw. |
| Co znaczy NO-GO | „Google Ads nie jest kanałem", a nie „PLAR Orders nie ma popytu" | |
| Kiedy NIE puszczać reklam | 15 grudnia – 10 stycznia (szczyt sezonu i inwentaryzacje u hurtowni; to wniosek, nie dane) | sędziowie |

Wdrożenie: `sonda/docs/02-WDROZENIE.md`. Kampania: `sonda/docs/03-REKLAMY.md`.

### 4. Rzeczy za 0 zł, które nie czekają

- Jeden e-mail do IdoSell (warunki IdoSell Apps) i jeden do InsERT (warunki katalogu „Rozwiązania partnerskie").
  Szkice są w pliku o kanale partnerskim. Wyślij i zapomnij.
- Wpis w kalendarzu na ostatni tydzień stycznia 2027: sprawdzić budżet Funduszu Pracy na 2027 i frazy sezonowe
  dla zestawu „wniosek o dotację z PUP". Do tego czasu nic w tej sprawie nie rób.

## Czego nie robić przez najbliższe 30 dni

- Nie pisać kodu „PLAR Orders Lite" (rejestracja, abonament w Stripe, kreator kartoteki), niezależnie od liczby zgłoszeń.
- Nie publikować ceny 199 zł ani żadnej innej poniżej obecnego cennika.
- Nie budować niczego z listy finalistów (aplikacja Shopify, łącznik IdoSell, zestaw PUP, konwerter MT940, KSeF do arkuszy).
- Nie uruchamiać reklam przed bramką słów kluczowych, w dopasowaniu przybliżonym ani w sieci partnerów wyszukiwania.
- Nie liczyć samych adresów e-mail jako dowodu popytu.
- Nie zamawiać trzeciej rundy researchu. Druga dała tę samą odpowiedź co pierwsza.
- Nie obiecywać importu do Subiekta ani Optimy, dopóki ścieżka pliku nie jest sprawdzona.
- Nie eksperymentować na produkcyjnej instalacji klienta referencyjnego. Jedna referencja to cały Twój kapitał.
- Nie otwierać trzeciego frontu (Agent Spend Governance), dopóki agenci realnie nie płacą.

## Wyzwalacze zmiany planu (lekcja Miss #5)

| Jeśli… | …to |
|---|---|
| Planer pokaże mniej niż 300 wyszukiwań miesięcznie łącznie dla całej listy fraz | Żadnych reklam. Zostaje punkt 2. |
| Planer pokaże 300–2 000 | Strona jako stały punkt wejścia przy 5–10 zł dziennie, ocena po 90 dniach. |
| Obecny klient kosztuje Cię ponad 1,5 h tygodniowo | Najpierw odchudź obsługę albo podnieś cenę; nie dokładaj klientów. |
| Po 30 dniach: 0 poleceń i mniej niż 3 odpowiedzi od firm serwisujących ERP | Zmień listę adresatów albo treść; jeszcze nie rezygnuj. |
| Po 90 dniach: 10 firm zapytanych, mniej niż 2 rozmowy, 0 poleceń | Kanał partnerski zamknięty. PLAR Orders zostaje aktywem jednego klienta; w styczniu wróć do notatki o PUP. |
| Test reklam da GO | Obsłuż firmy ręcznie na istniejącym systemie. Kod samoobsługowy dopiero po 3 płacących pilotażach prowadzonych ręcznie. |

## Analiza potrzeby kupującego (szablon z Miss #12)

| Pytanie | PLAR Orders |
|---|---|
| Częstotliwość | codziennie |
| Powtarzalność | stałe miejsce pracy operatora, nie pojedynczy dokument |
| Źródło wartości | oszczędność czasu i mniej pomyłek |
| Substytucja | czat nie zna kartoteki, nie siedzi na skrzynce, nie prowadzi historii; wyspecjalizowane narzędzie ma sens |

Cztery odpowiedzi po stronie „abonament". Model cenowy, który masz, pasuje do sposobu użycia. Dla porównania:
disclosekit miał cztery odpowiedzi po stronie przeciwnej.

## Co jest Twoją decyzją, a nie moją

1. Czy poluzować „zero outboundu" (punkt 2).
2. Czy i za ile oferować płatny pilotaż (w konfiguracji stoi propozycja 490 zł netto, zaliczane na poczet wdrożenia).
3. Czy cytat z referencji może stać na stronie testowej (potwierdź u klienta).
4. Czy przenieść `project-2/` do prywatnego repozytorium. To repozytorium jest publiczne: progi, cennik pilotażu
   i ten plik widzi każdy, także klient i konkurencja.
