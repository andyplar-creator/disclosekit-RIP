# Skrót dowodów po dwóch rundach researchu (stan: 2026-11-26)

Ten plik streszcza `01-sweep/` (12 soczewek, 189 pozycji: 22 kandydatów i 167 odrzuconych, część się powtarza) i `02-deep-dive/` (8 finalistów).
Służy jako wejście do decyzji o projekcie #2. Liczby mają źródła w dossier; tu są tylko wnioski.

## 1. Ograniczenia researchu (czytaj najpierw)

- Tylko wyniki wyszukiwarki. Stron nie dało się otwierać; nie było narzędzia do wolumenów słów kluczowych.
  **Żaden kandydat nie ma zweryfikowanego wolumenu wyszukiwań** (liczbowa połowa reguły R4).
- Pierwszy sweep został przycięty limitem wyszukiwań (7-23 zapytań na soczewkę zamiast 15-30).
- Cztery deep-dive'y zapisały pełne dossier, ale padły na ostatnim kroku (limit użycia). Treść jest kompletna,
  brakuje tylko ustrukturyzowanego podsumowania - werdykty poniżej pochodzą z sekcji "Werdykt" każdego dossier.
- Cztery fakty nośne sprawdziłem ponownie, osobnym wyszukiwaniem (sekcja 5).

## 2. Werdykty ośmiu finalistów

| # | Kandydat | Werdykt | Najważniejszy powód |
|---|---|---|---|
| 1 | PLAR Orders jako aplikacja Shopify (mail/PDF -> szkic zamówienia) | słaby, bliżej martwego | ok. 12-15 takich aplikacji, nie 2; klony po 3,5 i 6,5 miesiąca mają 0 opinii; dno cenowe 15-30 USD/mies. bez limitu; nowa zasada Shopify: 10 instalacji na płatnych sklepach, zanim wolno zgłosić kolejną aplikację |
| 2 | Konfigurator wniosku o dotację z urzędu pracy (PUP) | słaby | płatny rynek istnieje (10+ sprzedawców, 29-2000 zł), ale pieniądze na aktywizację spadły z ok. 3,65 mld zł (2025) do 2,14 mld zł (2026); konkurent stoi dokładnie w tym punkcie cenowym (199/299 zł z "systemem AI"); mocny darmowy substytut (druk urzędu + czat AI); sufit: kilkaset do ok. 2000 zł/mies. średnio (szacunek) |
| 3 | Konwerter wyciągów PDF -> MT940 | słaby | lider kategorii (bankstatementconverter.com) sam napisał w sierpniu 2026 "My business is dying" (przychód -24% od lutego; ludzie robią to w darmowych czatach AI); klony zarabiają 31-746 USD/mies.; Comarch Optima i SaldeoSMART mają tę funkcję w środku |
| 4 | Polskie źródło (KSeF) -> Arkusze Google | słaby, na granicy martwego | usługę sprzedaje już kilka firm od 8-9 zł/mies., jest darmowe rozszerzenie open source; trzeba trzymać tokeny KSeF klientów; recenzja Google 2-8 tygodni |
| 5 | Most Stripe -> KSeF | martwy | ok. 11 gotowych lub zapowiedzianych rozwiązań, co najmniej 4 w sklepie aplikacji Stripe, ceny 0-50 zł/mies. |
| 6 | "Polska nisza" w sklepie aplikacji Shopify / Shoper | słaby, na granicy martwego | reguła z danych: słaby konkurent = brak popytu, duży popyt = mocny konkurent; Shoper zabiera 30% |
| 7 | Monitor przetargów spożywczych z wyciąganiem asortymentu | martwy | darmowe monitory mają już kategorię "żywność"; narzędzia typu Lentra robią więcej niż samo wyciąganie; abonament nie pasuje do dwóch sezonów ofertowania w roku |
| 8 | Zwiad po niezbadanych ekosystemach | słaby | jedyne nowe znalezisko: IdoSell Apps (prawdziwy sklep z aplikacjami, IdoSell sam rozlicza abonamenty), ale bez danych o prowizji, instalacjach i popycie |

**Żaden finalista nie przechodzi reguł R1-R4 z `LESSONS.md` na tyle, żeby uzasadnić pisanie produktu.**

## 3. Wnioski przekrojowe (ważniejsze niż pojedyncze pomysły)

1. **Budowanie przestało być przewagą.** Prawie każda nisza, którą da się znaleźć wyszukiwarką, ma w 2026 r.
   3-15 klonów zbudowanych z pomocą AI, z cenami 0-99 zł/mies. To dotyczy alertów przetargowych, dotacji,
   leadów z CEIDG, narzędzi KSeF, generatorów pism, konwerterów, aplikacji "pod regulację" w sklepach e-commerce.
2. **Substytucja przez darmowy czat AI zabija także liderów**, nie tylko nowych (przykład: bankstatementconverter.com).
3. **Stawki bazowe są niskie.** W próbach 3,5-5 tys. projektów ze zweryfikowanym przychodem mediana to ok. 136-169 USD
   miesięcznie; mediana wzrostu miesiąc do miesiąca to 0%. Realistyczny pierwszy rok nowego mikro-produktu: 0-500 USD/mies.
4. **Sklepy z aplikacjami to jedyny kanał działający bez publiczności i outboundu, ale są rynkiem efektywnym**:
   tam, gdzie jest popyt, lider ma dobre oceny; tam, gdzie lider jest słaby, popytu nie ma.
5. **Strony informacyjne umierają przez AI Overviews**; strony transakcyjne tracą mniej.
6. **Agenci AI jeszcze realnie nie płacą** (wydatki w ekosystemie x402 są śladowe; sklepy z wtyczkami nie wypłacają twórcom).
7. **To, co nadal zarabia, wymaga czegoś, czego klon nie skopiuje w weekend**: zaufania, wdrożenia pod klienta,
   dostępu do danych albo pozycji w kanale. To zwykle nie jest w pełni pasywne.

## 4. Jedyna rzecz, która już zarabia

PLAR Orders: 4 900 zł wdrożenia + od 800 zł/mies., jeden klient produkcyjny od maja 2026, podpisana referencja
(dane z plar.ai). Jeden taki klient to przychód cykliczny rzędu 200 USD/mies., czyli powyżej mediany całego
zweryfikowanego rynku solo-projektów. Słabość: brak kanału pozyskania klientów bez outboundu.

Co research mówi o samoobsługowej wersji ("PLAR Orders Lite", 199-399 zł/mies.):
- za: konkurenci z cennikami (Ordify, CStore 450-990 zł/mies., agencje 8-22 tys. zł za wdrożenie) - czyli hurtownie
  za to płacą. **Korekta po rundzie sędziów:** funkcja zamówień z maila przez AI jest u Ordify dopiero w planie Pro
  za 949 zł netto/mies. (plan Starter za 279 zł jej nie ma), a łącznik do ERP od planu za 1 259 zł. Sprawdził to jeden
  sędzia, drugi nie zdołał potwierdzić; zweryfikuj na ordify.pl. Jeśli to prawda, 800 zł/mies. jest już poniżej
  najbliższego konkurenta; mocna odpowiedź na regułę substytucji (czat nie zna kartoteki
  towarów, nie siedzi na skrzynce, nie odda pliku dla Subiekta);
- przeciw: wolumen fraz zakupowych niezweryfikowany i prawdopodobnie mały; brak sklepu z aplikacjami;
  szacowane 3-6 h wsparcia tygodniowo przy kilkunastu klientach (powyżej limitu pasywności);
  kod PLAR Orders nie leży w tym repozytorium.

## 5. Fakty nośne sprawdzone ponownie (osobne wyszukiwania, 2026-11-26)

| Fakt | Wynik ponownego sprawdzenia |
|---|---|
| Wpis "My Business Is Dying" założyciela Bank Statement Converter | potwierdzony przez agregator (zeli.app, 28.08.2026): przychód -24% od lutego, nowi subskrybenci spadli ze 191 do 45 miesięcznie; wśród przyczyn czaty AI i mocniejszy konkurent. Oryginału na blogu nie otworzyłem. |
| Zasada Shopify "10 instalacji przed kolejną aplikacją" | potwierdzona w oficjalnym changelogu Shopify ("build, grow, then expand"): każda istniejąca aplikacja musi mieć co najmniej 10 instalacji na pełnopłatnych sklepach; aplikacje z zerem instalacji po 6 miesiącach są usuwane. |
| Cięcia Funduszu Pracy | potwierdzone: 2,14 mld zł dla urzędów pracy w 2026 r., o 1,5 mld zł mniej niż w 2025 r. (Gazeta Prawna / Forsal). Liczb na 2027 r. nie znalazłem. |
| Mediana przychodu solo-projektów | analizy "986 startupów, mediana 445 USD" nie udało mi się odnaleźć ponownie. Większe próby (3 478-5 079 projektów) dają medianę 136-169 USD/mies. Używam tych niższych liczb. |

## 6. Opcje na stole

- **A. Test popytu na samoobsługowe "zamówienia z maila" (PLAR Orders Lite)** - landing po polsku z działającym demo
  (wklej maila z zamówieniem, zobacz wynik), przedsprzedaż pilotażu i zapis na listę; ok. 100 EUR reklam.
  Wynik przydaje się tak czy inaczej: jeśli Lite nie chwyci, demo i tak wzmacnia stronę pełnego PLAR Orders.
- **B. Test przedsprzedaży zestawu "wniosek o dotację z PUP"** - tylko w tygodniach prawdziwych naborów (luty-marzec 2027).
- **C. Test angielskiego landingu "PO z maila -> szkic zamówienia w Shopify"** przed jakimkolwiek kodem pod Shopify.
- **D. Jeden e-mail do IdoSell** z pytaniem o warunki IdoSell Apps (0 zł).
- **E. Nie zaczynać żadnego nowego projektu**; czas włożyć w kanał sprzedaży PLAR Orders (np. partnerzy wdrażający
  Subiekta/Optimę u hurtowni), czyli poluzować regułę "zero outboundu" do "zero zimnych telefonów".
- **F. Coś, czego research nie znalazł.**

Wspólny mianownik A-C: zgodnie z R1 najpierw test chęci zapłaty, potem kod. Dlatego niezależnie od wyboru
potrzebne jest jedno narzędzie: gotowy do wdrożenia zestaw do testów R1 (landing + płatność + pomiar + werdykt).

## 7. Wynik rundy sędziów (dopisane po panelu)

Trzech niezależnych sędziów (sceptyczny inwestor, kontrariański budowniczy, realista od dopasowania do założyciela)
oceniło roboczą decyzję. Pełne opinie: `judge-*.md` w tym katalogu. Wszyscy trzej zgodzili się częściowo:

- diagnoza trafna (żaden nowy produkt, jedyny zarabiający zasób to PLAR Orders, wąskim gardłem jest kanał sprzedaży);
- recepta do zmiany: opcja E (kanał dla PLAR Orders) na pierwsze miejsce, test A przerobiony z „Lite za 199 zł" na test
  wejścia do istniejącego PLAR Orders, opcje B i C nieprzygotowywane, bramka słów kluczowych przed jakimkolwiek wdrożeniem.

Ostateczna decyzja i plan: `../../DECYZJA.md`.
