# Soczewka: niszowe subskrypcje alertów i monitoringu (niche-alert-subscriptions)

Data badania: 2026-11-26. Autor: agent badawczy (jedna soczewka z kilkunastu).

## Jak czytać ten dokument (ważne ograniczenie)

- Zaplanowane było 15-30 wyszukiwań. **Wykonałem 12.** Potem wspólny limit wyszukiwań całej sesji (200 zapytań dzielonych przez wszystkich agentów) się wyczerpał i 4 kolejne zapytania pogłębiające nie zostały wykonane. Nie obchodziłem tego limitu.
- Skutek: ceny i lista konkurentów pochodzą z wyników wyszukiwania (głównie ze stron samych dostawców). **Nie otwierałem tych stron bezpośrednio** (sieć kontenera blokuje pobieranie stron). Każdą cenę przed decyzją trzeba kliknąć i sprawdzić.
- Nie mam narzędzia do wolumenów wyszukiwań. **Żadnej liczby wyszukiwań w tym dokumencie nie ma, bo żadnej nie widziałem.** Połowa bramki R4 ("czy jest >= 1000 wyszukiwań/mies.") jest wszędzie NIEZWERYFIKOWANA.
- Oznaczenia: **[liczba]** = liczba ze źródła z linkiem; **[fakt]** = zaobserwowany fakt z linkiem; **[wniosek]** = moje rozumowanie bez źródła; **szacunek** = moja własna liczba, nie fakt; **[z pamięci modelu]** = wiem to z treningu, nie sprawdziłem w tej sesji.

## Werdykt

**Ta soczewka jest dla Ciebie słaba. Przeżył jeden kandydat, i to z niską pewnością.**

Trzy powody:

1. **Rynek został zalany w latach 2025-2026 przez takie same projekty jak Twój** - małe serwisy zbudowane z pomocą AI na darmowych, publicznych danych. W jednym przebiegu wyszukiwań znalazłem z cennikami: co najmniej 8 nowych serwisów przetargowych, 6 serwisów z alertami o dotacjach, 8 sprzedawców baz nowych firm, 4 serwisy monitoringu znaków towarowych, 6 narzędzi monitoringu cen na Allegro. Szczegóły w tabeli niżej. [fakt, linki w tabeli]
2. **Ceny spadły do poziomu, przy którym reklama się nie spina.** Typowe ceny wejścia: 19-99 zł/mies. Przy takiej cenie jeden klient z Google Ads musiałby kosztować kilkanaście złotych, a to w B2B mało realne. [wniosek]
3. **"Łatwo zbudować" znaczy tu "brak przewagi".** Dane są darmowe (BZP, TED, Baza Konkurencyjności, CEIDG, KRS, GUNB), więc każdy z Claude Code robi to samo w 2 tygodnie. Starzy gracze mają lata pozycji w Google, nowi mają darmowe plany "na zawsze". Ty nie masz ani jednego, ani drugiego. [wniosek]

Jedyny segment, w którym widziałem **wysokie ceny (300-2500 zł netto/mies.) i brak roju klonów AI**, to rejestry wymagań prawnych BHP/środowisko dla firm z ISO 14001/45001. Ale tam problemem jest zaufanie i wiedza ekspercka, której nie masz. Opis niżej.

### Dowód nasycenia - co znalazłem w 12 wyszukiwaniach

| Nisza | Ilu graczy z publiczną ceną | Przykładowe ceny (ze stron dostawców) | Darmowy urzędowy zamiennik |
|---|---|---|---|
| Monitoring przetargów | 8+ nowych + starzy gracze | TenderMonitor 69 zł/mies. ([link](https://tendermonitor.pl/)); Pretendent 49/149/499 zł/mies. ([link](https://www.pretendent.info/)); SellWith 199/399/599 zł netto/mies. ([link](https://sellwith.pl/cennik)); PrzetargPro: plan darmowy bez limitu czasu, płatne od 69 zł/mies., analiza SWZ od 299 zł/mies. ([link](https://przetargpro.pl/porownania/przetargowy-janusz)); TenderFlow Pro 199 zł/mies. ([link](https://tender-flow-pro.com/pricing)); Och! Przetargi od 150 zł/mies. ([link](https://ochprzetargi.pl/)); Przetargowy Janusz: darmowo do 20 streszczeń SWZ/mies., wypełnianie ofert od 249 zł netto/mies. ([link](https://przetargowyjanusz.pl/porownania/najlepsza-platforma-do-przetargow)) | tak (e-Zamówienia, TED) [z pamięci modelu] |
| Alerty o dotacjach | 6 | DotacjaPro: raport 49 zł jednorazowo, alerty 29 zł/mies. ([link](https://dotacjapro.pl/)); GrantRadar 99 i 299 zł/mies. ([link](https://grant.deals/)); Radar Dotacji 499 zł netto/mies. ([link](https://radar-dotacji.pl/)); KiedyNabory 99 zł netto/mies. lub 990 zł netto/rok ([link](https://kiedynabory.pl/)) | tak (wyszukiwarka funduszy) [z pamięci modelu] |
| Bazy nowych firm (leady) | 8 | nowe-firmy.pl od 49 zł/mies. ([link](https://nowe-firmy.pl/)); Firmneo 69-189 zł/mies. ([link](https://firmneo.pl/)); firmy-ceidg.pl 99 zł/mies. lub 891 zł/rok ([link](https://firmy-ceidg.pl/)); Brokerdanych 399 zł netto/mies. ([link](https://brokerdanych.pl/baza-nowych-firm)); MGBI od 0,02 zł netto za rekord ([link](https://baza.mgbi.pl/)); RejestrB2B od 0,03 zł netto za rekord ([link](https://rejestrb2b.pl/bazy-firm/biura-rachunkowe/)); PKDFinder 500 firm za 29 zł ([link](https://pkd-finder.pl/)) | tak (CEIDG, KRS) |
| Monitoring znaków towarowych | 4 | LogoDirect od 19 zł netto/mies. ([link](https://logodirect.pl/cennik/)); Marktoro 199 zł netto/rok za znak w PL, 317 zł netto/rok w UE ([link](https://marktoro.pl/)); Pravna 97 zł netto/mies. ([link](https://www.pravna.pl/monitoring-znaku-towarowego/)); ochronamarki.eu od 89 zł netto/mies. ([link](https://ochronamarki.eu/monitoring-znaku-towarowego/)) | nie |
| Monitoring cen na Allegro | 6 + narzędzie Allegro | AleMonitor 59,99-99,99 zł netto/mies. ([link](https://www.alemonitor.pl/site/pricing)); PriceWizard 89-379 zł netto/mies. ([link](https://pricewizard.pl/cennik/)); Foxyprices 99 zł netto/mies. ([link](https://www.foxyprices.com/)); Allegro Analytics od 199 zł/mies. (wg strony Dealavo: [link](https://dealavo.com/pl/monitoring-cen-allegro/)) | częściowo (narzędzia Allegro) |
| Alerty licytacji komorniczych | 3-4 | Licytor Premium 109 zł/mies., 288 zł/3 mies., 1080 zł/rok ([link](https://licytor.pl/cennik)); Komornika.pl 399 zł netto/mies. lub 199 zł netto/mies. przy płatności rocznej ([link](https://komornika.pl/)) | tak, darmowe alerty e-mail/SMS na e-licytacje.komornik.pl (wg wyników wyszukiwania) |
| Monitoring KRS / kontrahentów | 5+ | firmy.ai od 19 zł/mies. za 5 firm ([link](https://firmy.ai/monitoring)); Wyszukiwarka KRS 20/40/80 zł netto za 24 h/30 dni/360 dni ([link](https://www.wyszukiwarkakrs.pl/subscriptions)); COIG 300 zł netto/mies. ([link](https://www.coig.com.pl/monitoring-wykreslen-w-krs.php)); Kancelaria Szalański 390 zł netto/mies. ([link](https://szalanskikancelaria.pl/uslugi/monitoring/)) | tak, darmowy Newsletter KRS, do 50 podmiotów (wg bloga KPMG z 2022 r., stare źródło: [link](https://kpmg.com/pl/pl/blogs/home/posts/2022/08/newsletter-krs-jako-narzedzie-zapewniajace-ochrone-przed-kradzieza-spolki-blog-prawniczy.html)) |
| Pozwolenia na budowę (leady) | 2 | statusbudowy.pl: 19 zł jednorazowo za wniosek, 49 i 199 zł/mies. ([link](https://statusbudowy.pl/)); Budowo.pl - plan PRO, ceny nie znalazłem ([link](https://www.budowo.pl/)) | tak, darmowa wyszukiwarka GUNB ([link](https://www.budowo.pl/wyszukiwarka-gunb)) |
| Rejestr wymagań prawnych BHP/środowisko | 3-4 + konsultanci | SINGULA od 300 / 1000 / 2500 zł netto/mies. ([link](https://singula.pl/)); Lexes (QES) - wycena indywidualna ([link](https://www.qes.pl/produkt/baza-lexes-pl-zdalna-identyfikacja-i-ocena-zgodnosci-wymagan-prawnych/)); szablon IKMJ 161 zł + VAT jednorazowo ([link](https://ikmj.org/produkt/dokumentacja-iso-140012015-monitorowanie-wymagan-prawnych/)) | nie |

Uwaga do tabeli: nie znalazłem **żadnych** danych o liczbie klientów ani przychodach tych serwisów. Jedno wyszukiwanie celowane w to (przychody/MRR nowych serwisów przetargowych) nie zwróciło nic. Wiele z tych stron może być martwymi projektami bez klientów. Wiem tylko, że istnieją i mają cenniki. [fakt: brak danych]

Stare serwisy przetargowe sprzedają dostęp roczny: w podsumowaniu wyników wyszukiwania padły kwoty 1099 zł netto (iPrzetargi), 1900 zł (Biznes Polska) i 2000 zł (Oferent) za rok. **Nie ustaliłem, z której strony pochodzi ta liczba** (prawdopodobnie [wytworcy.pl](https://wytworcy.pl/blog/najlepsza-baza-przetargow) albo [ofertarium.com](https://ofertarium.com/en/poradnik/ranking-platform-do-monitoringu-przetargow)), więc traktuj ją jako niezweryfikowaną.

## Kandydaci

### 1. Rejestr wymagań prawnych BHP/środowisko z automatycznym monitoringiem zmian (dla firm z ISO 14001/45001)

Pewność: **niska**. To "najmniej zły" pomysł w tej soczewce, a nie pomysł dobry.

**Dla kogo.** Specjalista ds. ochrony środowiska / BHP albo pełnomocnik ISO w firmie produkcyjnej lub usługowej, która ma certyfikat ISO 14001 lub ISO 45001. Druga grupa: zewnętrzni konsultanci BHP/ISO, którzy prowadzą takie rejestry dla kilku-kilkunastu klientów. Płaci firma, na fakturę VAT.

**Problem.** Norma wymaga, żeby firma miała aktualny wykaz przepisów, które jej dotyczą, i okresowo oceniała, czy je spełnia. Praktyka: przegląd co najmniej raz w roku albo po każdej zmianie przepisów. [fakt, opis konsultanta: [pakulaconsulting.pl](https://pakulaconsulting.pl/ISO-14001/wymagania-prawne-systemu-zarzadzania-srodowiskowego-ISO-14001)] Audytor to sprawdza. Ręczne śledzenie Dziennika Ustaw to nudna, powtarzalna praca.

**Jak często.** Stale. Przepisy zmieniają się co miesiąc, audyt jest co roku. To prawdziwie powtarzalna potrzeba (inaczej niż w disclosekit).

**Cena (zgodnie z R2).**
- Rejestr startowy dopasowany do profilu firmy: jednorazowo 299-499 zł netto (szacunek). Dowód, że ludzie kupują to jednorazowo: gotowy zestaw dokumentów IKMJ za 161 zł + VAT [liczba: [ikmj.org](https://ikmj.org/produkt/dokumentacja-iso-140012015-monitorowanie-wymagan-prawnych/)].
- Comiesięczne aktualizacje i alerty: 149-249 zł netto/mies. (szacunek), czyli poniżej najtańszego pakietu SINGULA (od 300 zł netto/mies.) [liczba: [singula.pl](https://singula.pl/)].
- Darmowa część tylko jako demo (R3): np. podgląd zmian z ostatniego miesiąca dla jednego obszaru, bez eksportu i bez dopasowania do firmy.

**Kanał dystrybucji.** Tylko wyszukiwarka: Google Ads i SEO na frazy typu "rejestr wymagań prawnych", "wykaz wymagań prawnych BHP", "wymagania prawne ISO 14001", "monitoring zmian prawnych ochrona środowiska". **Słaby punkt:** nie wiem, ile osób tego szuka. Podejrzewam, że mało (wąski termin zawodowy) [wniosek]. Drugi słaby punkt: ta usługa jest często sprzedawana "przy okazji" przez konsultanta, który wdrażał ISO, czyli kanałem relacji, którego nie masz [wniosek].

**Konkurencja i ceny.**
- SINGULA (WISO): pakiety od 300 zł netto/mies. (startowy), od 1000 zł netto/mies. (z identyfikacją wymagań przez konsultantów), od 2500 zł netto/mies. (profesjonalny). Obszary: środowisko, BHP, energia. [liczba: [singula.pl](https://singula.pl/)]
- Lexes (QES Consulting): baza wymagań BHP, środowisko, ppoż., REACH, CLP; aktualizacja minimum raz w miesiącu; cena indywidualna po formularzu. [fakt: [qes.pl](https://www.qes.pl/produkt/baza-lexes-pl-zdalna-identyfikacja-i-ocena-zgodnosci-wymagan-prawnych/)]
- REGULIS: aktualizowane rejestry dla ISO 14001 i 45001 z samodzielną oceną zgodności; ceny nie znalazłem. [fakt: [regulis.pl](https://regulis.pl/)]
- Konsultanci robiący to ręcznie jako usługę: Audit-Eko ([link](https://audit-eko.pl/oferta_6.htm)), WISO ([link](https://wiso.pl/identyfikacja-i-ocena-zgodnosci-z-wymaganiami-prawnymi/)), QES ([link](https://www.qes.pl/produkt/identyfikacja-wymagan-prawnych-majacych-zastosowanie-w-przedsiebiorstwie/)).
- Słabość konkurencji [wniosek, niezweryfikowane]: ceny "na zapytanie", sprzedaż przez rozmowę z konsultantem, brak samoobsługi z kartą. Nie sprawdziłem jakości ich produktów ani tego, czy sami już używają AI.
- Nie sprawdzone z powodu limitu wyszukiwań: duzi wydawcy prawniczy (LEX, Legalis) i wydawnictwa dla behapowców, które prawie na pewno mają własne alerty. To może być główny, tańszy zamiennik. [wniosek]

**Dowody popytu.**
- [liczba] Trzy poziomy cen SINGULA 300/1000/2500 zł netto/mies. - ktoś utrzymuje taki cennik publicznie. [singula.pl](https://singula.pl/)
- [liczba] Jednorazowy produkt 161 zł + VAT. [ikmj.org](https://ikmj.org/produkt/dokumentacja-iso-140012015-monitorowanie-wymagan-prawnych/)
- [fakt] Co najmniej 3 strony transakcyjne w wynikach (SINGULA, Lexes/QES, IKMJ, Regulis). **Zastrzeżenie:** moje zapytanie zawierało słowa "abonament cennik", więc wynik jest przechylony w stronę stron sprzedażowych. To słabszy dowód, niż wygląda.
- [wniosek] W tym jednym wyszukiwaniu nie pojawił się żaden nowy serwis AI z cennikiem 49 zł/mies., inaczej niż w przetargach i dotacjach. Jedno wyszukiwanie to za mało, żeby twierdzić, że ich nie ma.
- [brak danych] Wolumen wyszukiwań: nie znam. Liczba firm z certyfikatami w Polsce: nie sprawdziłem (są publiczne statystyki ISO Survey).

**Dlaczego nie ChatGPT.** ChatGPT napisze rejestr raz, w 10 minut. Nie zrobi trzech rzeczy: (1) nie będzie sam co miesiąc sprawdzał Dziennika Ustaw i wysyłał zmian - to automat działający bez nadzoru; (2) potrafi zmyślić albo podać nieaktualny akt, a audytor to wyłapie; (3) nie zostawia historii zmian jako dowodu dla audytu. **Uczciwie:** to jest średnio mocna obrona. Kto ma już LEX-a z alertami albo konsultanta w abonamencie, nie potrzebuje tego produktu. [wniosek]

**Skąd dane (automatyzacja).** Polskie akty prawne są dostępne przez darmowe publiczne API Sejmu (ELI), unijne przez EUR-Lex [z pamięci modelu - do potwierdzenia przed budową]. Brak scrapingu, brak danych osobowych, brak ryzyka RODO. To najczystszy potok danych w całej soczewce. Reszta to klasyfikacja i streszczanie przez model językowy plus eksport do Excela / Google Sheets - czyli dokładnie to, co umiesz z PLAR Orders (AI proponuje, człowiek zatwierdza).

**Zakres v1 i czas budowy.** Pobieranie nowych aktów, przypisanie do ok. 8 obszarów (odpady, emisje, woda i ścieki, chemikalia, BHP, ppoż., energia, opakowania), ankieta profilu firmy, comiesięczny e-mail ze zmianami, eksport rejestru z historią zmian, płatność Stripe. Szacunek: 10-15 dni roboczych z agentem kodującym.

**Pasywność.** Szacunek 2-4 h/tydz.: comiesięczne sprawdzenie treści przed wysyłką, pilnowanie potoku danych, odpowiedzi na pytania. Zagrożenie: klienci będą pytać "czy to nas dotyczy?", a to już jest doradztwo, którego nie chcesz i nie powinieneś udzielać.

**Ryzyko (od najpoważniejszego).**
1. **Zaufanie i wiedza.** Nie jesteś ekspertem BHP ani środowiska. Jeden pominięty przepis u klienta = niezgodność na audycie = utrata klienta i opinii. Bez płatnego eksperta do weryfikacji produkt jest niewiarygodny; z ekspertem przestaje być tani i pasywny.
2. **Mały rynek.** Kupujących są w Polsce najwyżej tysiące firm, nie setki tysięcy (szacunek z pamięci, niezweryfikowany).
3. **Kanał.** Jeśli te usługi kupuje się przez polecenie konsultanta, a nie przez Google, to nie masz jak do nich dotrzeć bez sprzedaży bezpośredniej.
4. **Odpowiedzialność.** Formalnie to informacja prawna, nie porada, ale klient polega na niej w kwestii zgodności. Potrzebny jasny regulamin i zastrzeżenia.

**Ocena R4.** **Niezaliczona - do sprawdzenia.** Potwierdzone: istnieją płatni gracze z publicznymi cenami i strony transakcyjne w wynikach. Niepotwierdzone: wolumen wyszukiwań. Pierwszy krok, zanim powstanie cokolwiek: wpisać 6-8 fraz do Planera słów kluczowych w Twoim koncie Google Ads (0 zł, 20 minut). Jeśli żadna fraza zakupowa nie ma >= 1000/mies. ani 3 warianty nie mają >= 100/mies. - pomysł umiera bez żalu. Dopiero potem test R1: strona + Stripe + ok. 100 EUR reklam.

## Odrzucone pomysły i dlaczego

**Odrzucone na podstawie dowodów z tej sesji**

1. **Ogólny monitoring przetargów (Polska).** 8+ nowych serwisów AI z cenami 49-599 zł/mies., w tym plany darmowe na zawsze, plus starzy gracze z umowami rocznymi. Dane są darmowe, więc brak przewagi. Spółka jednego z nowych graczy została zarejestrowana dopiero w lipcu 2026 r. z kapitałem 5000 zł ([bizraport.pl](https://www.bizraport.pl/krs/0001252875/przetargowy-janusz-spolka-z-ograniczona-odpowiedzialnoscia)) - czyli ten wyścig trwa teraz i jesteś w nim spóźniony.
2. **Alerty przetargowe dla jednej wąskiej branży.** Nowi gracze pokrywają BZP, TED i Bazę Konkurencyjności, bo to łatwe. Prawdziwa luka to zamówienia podprogowe rozrzucone po tysiącach stron BIP i platform zakupowych - a to wymaga ciężkiego scrapingu lub ludzi. Nie do zbudowania w 2-3 tygodnie. [wniosek, nie wyszukiwane osobno]
3. **Alerty o dotacjach dla MŚP / NGO.** 6 graczy z cenami od 29 zł/mies. ([dotacjapro.pl](https://dotacjapro.pl/)) do 499 zł netto/mies. ([radar-dotacji.pl](https://radar-dotacji.pl/)). NGO mają niską skłonność do płacenia [wniosek]. Najlepsza wąska nisza (nabory KFS i BUR dla firm szkoleniowych) jest już zajęta przez [KiedyNabory.pl](https://kiedynabory.pl/) za 99 zł netto/mies.
4. **Bazy nowo zarejestrowanych firm (leady dla księgowych, ubezpieczycieli, agencji).** 8 sprzedawców, dno cenowe 0,02-0,03 zł za rekord. Do tego ryzyko prawne: sprzedajesz dane osobowe jednoosobowych przedsiębiorców (obowiązek informacyjny z art. 14 RODO; UODO karał już za to firmę handlującą danymi z CEIDG), a kupujący użyje ich do telefonów i e-maili, które od listopada 2024 r. wymagają uprzedniej zgody (Prawo komunikacji elektronicznej) [oba punkty z pamięci modelu - do potwierdzenia u prawnika]. W praktyce to sprzedaż narzędzia do spamu.
5. **Monitoring zmian w KRS / CEIDG u kontrahentów.** Jest darmowy urzędowy Newsletter KRS, a klony zaczynają się od 19 zł/mies. ([firmy.ai](https://firmy.ai/monitoring)). Brak miejsca.
6. **Monitoring upadłości i restrukturyzacji (KRZ).** Luka jest prawdziwa: urzędowy portal nie wysyła alertów ([weryfikacjafaktur.pl](https://weryfikacjafaktur.pl/blog/krajowy-rejestr-zadluzonych/)). Ale wg jednego z dostawców rejestr nie ma publicznego API i dane trzeba kupować od komercyjnego dostawcy ([verifykator.pl](https://www.verifykator.pl/pl/rejestry/krz)). Czyli albo płatne źródło (koszt stały przed przychodem), albo scraping systemu Ministerstwa Sprawiedliwości. Dodatkowo w rejestrze są dane osób fizycznych (upadłość konsumencka) - ryzyko RODO. Obecni gracze: MGBI, COIG (300 zł netto/mies.), kancelarie (390 zł netto/mies.). Zapytanie o szczegóły API i cennik MGBI nie zostało wykonane (limit).
7. **Alerty licytacji komorniczych.** Dwóch płatnych graczy z wysokimi cenami (109 zł/mies. i 199-399 zł netto/mies.) - to akurat dobry sygnał, że inwestorzy płacą. Ale: jest darmowy urzędowy alert e-mail/SMS, a Licytor ma podstrony dla każdej miejscowości i typu nieruchomości (np. [taka](https://licytor.pl/licytacje/slaskie/rogow/lokale-uslugowe)), czyli dokładnie tę strategię SEO, którą Ty chciałbyś zastosować, tylko od lat. Nie znalazłem wąskiej podniszy, którą obsługują źle (zapytanie o sprzedaż syndyków nie zostało wykonane - limit).
8. **Monitoring cen konkurencji na Allegro.** Najmocniejszy dowód popytu w całej soczewce (6 wyspecjalizowanych narzędzi z cenami 60-379 zł netto/mies.), ale właśnie dlatego nie ma jak wejść: wyspecjalizowani gracze, oficjalne narzędzie Allegro od 199 zł/mies., pełna zależność od API i regulaminu Allegro, a błąd w automatycznej zmianie cen kosztuje klienta pieniądze = wsparcie na żądanie, nie pasywność. Regulaminu API Allegro nie sprawdziłem (limit).
9. **Monitoring znaków towarowych.** Dno cenowe 19 zł netto/mies. i 199 zł netto/rok za znak. Mało kupujących (tylko firmy z zarejestrowanym znakiem), kancelarie dorzucają to do rejestracji.
10. **Leady z pozwoleń na budowę (rejestr GUNB).** Dane darmowe i urzędowe, ale: darmowa wyszukiwarka GUNB jest zamiennikiem, [Budowo.pl](https://www.budowo.pl/) już to robi razem z przetargami, a przy inwestorach prywatnych lead to sam adres działki bez kontaktu [z pamięci modelu]. Ciekawostka warta zapamiętania: [statusbudowy.pl](https://statusbudowy.pl/) bierze 19 zł **jednorazowo** za pilnowanie jednego wniosku - to wzorcowe dopasowanie ceny do częstotliwości (R2).
11. **Alerty o konkursach ofert NFZ dla przychodni i gabinetów.** Nie znalazłem żadnego dedykowanego płatnego serwisu, tylko strony oddziałów NFZ, izby lekarskie i firmy doradcze ([gpmed.pl](https://gpmed.pl/jak-przygotowac-oferte-konkursowa-dla-nfz/)). Brzmi jak luka, ale wg Twojej zasady R4 brak płacących konkurentów to brak dowodu popytu, nie okazja. Do tego źródeł jest tylko 16 (oddziały wojewódzkie), a przychodnia śledzi jeden - agregacja daje mało wartości [wniosek]. Zapytanie pogłębiające nie zostało wykonane (limit).

**Odrzucone bez wyszukiwania (limit się skończył) - tylko moje rozumowanie, niższa pewność**

12. **Przeglądy zmian w prawie dla jednego zawodu (księgowi, HR, transport).** Rynek dużych wydawców i darmowych newsletterów kancelarii; ogólne streszczenie zmian robi też darmowy ChatGPT; kupujący ufa marce wydawcy. [wniosek]
13. **Monitoring opinii (Google, portale).** Globalnie zatłoczona kategoria SaaS z dużymi graczami; brak wąskiej polskiej przewagi. [wniosek]
14. **Monitoring ofert pracy jako sygnałów sprzedażowych.** Scraping portali pracy wbrew regulaminom; kupują to zespoły sprzedaży bezpośredniej, do których nie masz kanału. [wniosek]
15. **Monitoring wygasających domen.** Rejestratorzy przypominają za darmo, rynek wtórny domen mają wyspecjalizowane giełdy. [wniosek]
16. **Alerty o zmianach planów miejscowych dla działki; alerty o sprzedażach syndyków.** Nie zbadane wcale. Nie są ani kandydatami, ani odrzucone na dowodach - to puste pola. Oba wymagałyby zbierania danych z bardzo wielu rozproszonych stron urzędowych, co łamie zasadę budowy w 2-3 tygodnie. [wniosek]

## Co warto wynieść z tej soczewki, nawet jeśli nic z niej nie wybierzesz

- **Publiczne dane + alert e-mail to w 2026 r. towar, nie produkt.** Jeśli Twój następny pomysł da się opisać jako "pobieram darmowe dane urzędowe i wysyłam powiadomienia", załóż, że 5 osób już to zrobiło w tym roku. [wniosek oparty na tabeli wyżej]
- **Wysokie ceny utrzymują się tam, gdzie klient kupuje odpowiedzialność i wiedzę eksperta, a nie dane** (300-2500 zł/mies. w rejestrach prawnych, 300-390 zł/mies. w monitoringu prowadzonym przez kancelarię i wywiadownię) - a tego akurat AI-solo-founder nie ma. [wniosek]
- **Model "jednorazowa opłata za pilnowanie jednej sprawy"** (19 zł w statusbudowy.pl, 49 zł za raport w DotacjaPro) jest ciekawszy niż abonament: pasuje do R2 i nie wymaga utrzymania klienta. Warto go przyłożyć do pomysłów z innych soczewek.

## Źródła

Wszystkie poniższe adresy pojawiły się w wynikach wyszukiwania z 2026-11-26. Treści stron nie otwierałem bezpośrednio.

Przetargi
- https://tendermonitor.pl/
- https://www.pretendent.info/
- https://sellwith.pl/cennik
- https://przetargpro.pl/porownania/przetargowy-janusz
- https://przetargpro.pl/porownania/biznes-polska
- https://przetargpro.pl/blog/ai-w-przetargach-platformy-porownanie-2026
- https://tender-flow-pro.com/pricing
- https://ochprzetargi.pl/
- https://przetargowyjanusz.pl/porownania/najlepsza-platforma-do-przetargow
- https://www.bizraport.pl/krs/0001252875/przetargowy-janusz-spolka-z-ograniczona-odpowiedzialnoscia
- https://wytworcy.pl/blog/najlepsza-baza-przetargow
- https://ofertarium.com/en/poradnik/ranking-platform-do-monitoringu-przetargow
- https://ofertis.pl/abonament/
- https://mimira.eu/przetargi/wiki/najlepsze-narzedzia-ai-przetargi

Dotacje
- https://dotacjapro.pl/
- https://grant.deals/
- https://radar-dotacji.pl/
- https://kiedynabory.pl/
- https://befunded.pl/
- https://granty.pl/pricing-tables/

Bazy nowych firm
- https://nowe-firmy.pl/
- https://firmneo.pl/
- https://firmy-ceidg.pl/
- https://brokerdanych.pl/baza-nowych-firm
- https://baza.mgbi.pl/
- https://rejestrb2b.pl/bazy-firm/biura-rachunkowe/
- https://pkd-finder.pl/
- https://fabrykaleadow.pl/aplikacja-fabryka-leadow/

KRS / KRZ
- https://firmy.ai/monitoring
- https://www.wyszukiwarkakrs.pl/subscriptions
- https://www.coig.com.pl/monitoring-wykreslen-w-krs.php
- https://szalanskikancelaria.pl/uslugi/monitoring/
- https://kpmg.com/pl/pl/blogs/home/posts/2022/08/newsletter-krs-jako-narzedzie-zapewniajace-ochrone-przed-kradzieza-spolki-blog-prawniczy.html (2022 - stare)
- https://www.mgbi.pl/blog/koniec-publikacji-wpisow-krs-w-msig/
- https://szopalabs.com/blog/monitoring-zmian-w-krs
- https://www.verifykator.pl/pl/rejestry/krz
- https://weryfikacjafaktur.pl/blog/krajowy-rejestr-zadluzonych/

Znaki towarowe
- https://marktoro.pl/
- https://logodirect.pl/cennik/
- https://www.pravna.pl/monitoring-znaku-towarowego/
- https://ochronamarki.eu/monitoring-znaku-towarowego/

Allegro
- https://www.alemonitor.pl/site/pricing
- https://pricewizard.pl/cennik/
- https://www.foxyprices.com/
- https://dealavo.com/pl/monitoring-cen-allegro/
- https://priceva.com/pl/monitoring-cen-allegro
- https://pricesafari.pl/

Licytacje
- https://licytor.pl/cennik
- https://licytor.pl/licytacje/slaskie/rogow/lokale-uslugowe
- https://komornika.pl/
- https://www.adradar.pl/payment?id_tier_price=103

Pozwolenia na budowę
- https://www.budowo.pl/
- https://www.budowo.pl/wyszukiwarka-gunb
- https://statusbudowy.pl/

Rejestry wymagań prawnych
- https://singula.pl/
- https://www.qes.pl/produkt/baza-lexes-pl-zdalna-identyfikacja-i-ocena-zgodnosci-wymagan-prawnych/
- https://www.qes.pl/produkt/identyfikacja-wymagan-prawnych-majacych-zastosowanie-w-przedsiebiorstwie/
- https://regulis.pl/
- https://ikmj.org/produkt/dokumentacja-iso-140012015-monitorowanie-wymagan-prawnych/
- https://pakulaconsulting.pl/ISO-14001/wymagania-prawne-systemu-zarzadzania-srodowiskowego-ISO-14001
- https://audit-eko.pl/oferta_6.htm
- https://wiso.pl/identyfikacja-i-ocena-zgodnosci-z-wymaganiami-prawnymi/

NFZ
- https://gpmed.pl/jak-przygotowac-oferte-konkursowa-dla-nfz/
- https://www.nfz-warszawa.pl/dla-swiadczeniodawcow/kontraktowanie/konkursy/
- https://nfz-lodz.pl/kontraktowanie/komunikaty
