# Deep-dive: Wąski monitor przetargów dla dystrybutorów żywności i kawy z automatycznym wyciąganiem formularza asortymentowego do Excela

Slug: `food-tender-monitor-with-extraction`. Data badania: 2026-11-26. Autor: agent badawczy (analiza sceptyczna jednego kandydata).

## Jak czytać ten dokument

- **Wykonałem 24 wyszukiwania** (limit: 28). Trzy kolejne zostały odrzucone, bo wyczerpał się wspólny limit wyszukiwań całej sesji. Nie obchodziłem limitu. Lista tego, czego przez to nie sprawdziłem, jest w sekcji "Otwarte pytania".
- **Nie otwierałem żadnej strony bezpośrednio** (sieć kontenera to blokuje). Wszystko pochodzi ze streszczeń wyników wyszukiwania. Większość opisów funkcji i cen to deklaracje samych dostawców z ich stron sprzedażowych. Przed decyzją kliknij w link i sprawdź na własne oczy.
- **Nie mam narzędzia do wolumenów wyszukiwań.** W dokumencie nie ma ani jednej liczby "ile osób tego szuka". Liczbowa część reguły R4 pozostaje niezweryfikowana.
- Oznaczenia: **zweryfikowane** = fakt lub liczba z linkiem; **częściowo** = dowód pośredni; **niezweryfikowane** = moje rozumowanie albo brak danych; **szacunek** = moja własna liczba, nie fakt; **[z pamięci modelu]** = wiem to z treningu, nie sprawdziłem w tej sesji.

## Werdykt

**Martwy** - w wersji opisanej w kandydacie (abonament ok. 99 zł/mies. za wąski monitor przetargów spożywczych plus wyciąganie formularza do Excela). Pewność: średnio-wysoka co do wersji opisanej, niska co do wariantu ratunkowego opisanego niżej (ten oceniam jako słaby).

Pięć powodów, od najmocniejszego:

1. **Połowa "monitor" ma darmowe zamienniki, które już są wąskie.** Atlas Przetargów ma osobną kategorię "żywność", darmowe codzienne alerty e-mail po branży, regionie i zamawiającym oraz statystyki konkurencji (ile ofert, kto wygrywa, jakie wartości) - wg własnej strony bezpłatnie ([monitoring](https://atlasprzetargow.pl/monitoring-przetargow), [kategoria żywność](https://atlasprzetargow.pl/przetargi/kategoria/zywnosc)). PrzetargHub przedstawia się jako "darmowa wyszukiwarka przetargów publicznych" i też ma branżę "żywność" ([link](https://przetarghub.pl/), [link](https://przetarghub.pl/branza/zywnosc/strona/36/)). Płatny monitoring z analizą zaczyna się od 69 zł/mies. ([PrzetargPro](https://przetargpro.pl/przetarg/dostawa-produktow-zywnosciowych-do-szkoly-podstawowej-w-chylicach-f366bee1ad9b)). Wąski monitor za 99 zł nie daje nic, czego klient nie ma za 0-69 zł. To łamie regułę substytucji. [zweryfikowane - na podstawie stron dostawców]
2. **Połowa "wyciąganie formularza" nie jest wyróżnikiem.** Co najmniej jedno narzędzie robi dużo więcej: Lentra deklaruje, że wypełnia formularz asortymentowo-cenowy w układzie zamawiającego, dopasowuje pozycje do katalogu firmy, proponuje produkty równoważne i wyciąga z SWZ zasady przeliczania opakowań ([lentra.pl](https://lentra.pl/)). Podobne deklaracje mają Eulora ([link](https://eulora.pl/)), Mimira ([link](https://mimira.eu/przetargi/wiki/najlepsze-programy-do-automatyzacji-przetargow)), Przetargowy Janusz ([link](https://przetargowyjanusz.pl/)), Pretendent ([link](https://www.pretendent.info/)) i Tender Vision ([link](https://www.tender-vision.com/)). Samo "przepisanie tabeli do Excela" to mniej niż oni oferują. [zweryfikowane co do istnienia; jakość ich działania niezweryfikowana]
3. **Samo przepisanie tabeli z jednego pliku robi darmowy ChatGPT/Claude w kilka minut** [z pamięci modelu, nie testowałem w tej sesji], a część zamawiających i tak daje formularz w pliku edytowalnym (przykład: szkoła w Chojnowie - formularz cenowy w .doc, formularz oferty w .docx: [link](https://sp4.chojnow.eu/zamowienia_publiczne,m1,s1201.html)). Prawdziwa wartość to dopasowanie pozycji do własnego cennika hurtowni i wypełnienie formularza zamawiającego - a to wymaga wgrania cennika każdego klienta, czyli wdrożenia i wsparcia, nie pasywności. [niezweryfikowane - rozumowanie]
4. **Trudna część techniczna to nie AI, tylko dostęp do załączników.** Ogłoszenia są w BZP i TED, ale SWZ i formularze leżą na "stronie prowadzonego postępowania": e-Zamówienia, platformazakupowa.pl, SmartPZP, Logintrade, Marketplanet, a przy zamówieniach podprogowych na stronach BIP szkół ([opis platform](https://mimira.eu/przetargi/wiki/platformy-zakupowe-w-zamowieniach-publicznych)). Jeden z tanich konkurentów (TenderMonitor, 69 zł) sam pisze, że jeszcze nie pobiera i nie analizuje załączników SWZ ([link](https://tendermonitor.pl/)). Zbieranie plików z kilku platform i tysięcy stron BIP nie mieści się w 2-3 tygodniach budowy ani w 2-4 h/tydz. utrzymania. [częściowo]
5. **Abonament nie pasuje do rytmu kupującego (R2).** Umowy na żywność są roczne lub na rok szkolny (tytuły ogłoszeń: "w 2027 r.", "do 31.12.2027 r.", "w roku szkolnym 2026/2027": [link](https://atlasprzetargow.pl/przetarg/2026-BZP-00547388), [link](https://atlasprzetargow.pl/przetarg/2026-BZP-00558926), [link](https://www.gov.pl/web/zsckr-szczecin/zapytanie-ofertowe---dostawa-produktow-suchych-przetworow-tluszczy-oraz-artykulow-spozywczych-roznych-do-stolowki-szkolnej-w-roku-szkolnym-20262027)). Hurtownia ma dwa krótkie sezony ofertowania w roku i zna swoich kilkudziesięciu lokalnych zamawiających. Po sezonie nie ma powodu płacić. [częściowo - wniosek z tytułów ogłoszeń, nie z danych o rezygnacjach]

Dodatkowo: Twój klient referencyjny to dystrybutor **kawy**, a przetargi, w których kawa jest osobną częścią, to w wynikach wyszukiwania głównie jednostki wojskowe (szczegóły w pytaniu 5). Nie ma dowodu, że Twój klient w ogóle startuje w przetargach. Przewaga "ten sam typ klienta" jest niepotwierdzona.

**Co musiałoby być prawdą, żeby zmienić werdykt:** (a) hurtownie spożywcze masowo szukają w Google narzędzia do wypełniania formularzy (sprawdzisz w Planerze słów kluczowych w 20 minut) oraz (b) narzędzia typu Lentra / Janusz źle radzą sobie z formularzami spożywczymi. Żadnego z tych dwóch punktów nie potwierdziłem ani nie obaliłem.

## Odpowiedzi na pytania zabojcze

### 1. Czy istniejące polskie narzędzia przetargowe już wyciągają formularze asortymentowe albo streszczają dokumenty z AI? Co oferują i za ile?

**Odpowiedź: tak, i to na kilku poziomach cenowych. Streszczanie SWZ przez AI jest już standardem od planu darmowego. Wypełnianie formularza asortymentowo-cenowego z dopasowaniem do katalogu też już istnieje.**

Status: **zweryfikowane** co do istnienia i cen (strony dostawców); **niezweryfikowane** co do jakości (brak niezależnych recenzji).

- **Lentra** - najbliżej Twojego pomysłu, tylko dalej. Deklaruje: wyszukiwanie w BZP, TED i Bazie Konkurencyjności, wyciąganie z SWZ zasad przeliczania opakowań, terminów dostaw, kar i wymaganych dokumentów, wypełnianie formularza asortymentowo-cenowego "w układzie zamawiającego", dopasowanie pozycji do katalogu firmy, propozycje produktów równoważnych, pytania o pozycje bez odpowiednika, sprawdzenie oferty przed złożeniem, bazę cen z ofert złożonych w przetargach na leki i wyroby medyczne. Ceny wg fragmentu strony: Mail+ 1 222 zł/mies. (abonament 179 zł + 7 pakietów po 149 zł), Pro 797 zł/mies. (abonament 599 zł + 2 pakiety po 99 zł), Pro Max od 1 599 zł/mies. z 250 kredytami ([lentra.pl](https://lentra.pl/)). Katalog oprogramowania podaje start od 179 zł netto/mies. i 14 dni próby ([Software Advice](https://www.softwareadvice.com/product/772498-Lentra/)). Uwaga: kwoty 1 222 i 797 zł wyglądają na przykładowe konfiguracje z kalkulatora; nie wiem dokładnie, czym jest "pakiet" (moja interpretacja: jedna część/pakiet przetargu). Nie ustaliłem, kto stoi za Lentrą ani ilu ma klientów.
- **Eulora** - analiza SWZ "linijka po linijce", dobór produktów z katalogu firmy, wypełnianie oferty z cytatem przy każdej wartości. Powstała w dziale przetargów polskiego producenta sprzętu IT. Ceny nie znalazłem. ([eulora.pl](https://eulora.pl/))
- **Mimira** - generuje formularze Word i Excel, weryfikuje je ekspert zamówień publicznych; szacunkowe wyceny na podstawie ponad 2 mln historycznych postępowań (deklaracja dostawcy / materiał sponsorowany: [link](https://finanse.wp.pl/mimira-aplikacja-do-przetargow-ai-ktora-automatyzuje-zamowienia-publiczne-od-wyszukiwania-po-dokumentacje-przetargowa-7315206206642240a), [link](https://mimira.eu/przetargi/wiki/najlepsze-programy-do-automatyzacji-przetargow)). Cennik zamknięty, klient korporacyjny ([porównanie PrzetargPro](https://przetargpro.pl/blog/ai-w-przetargach-platformy-porownanie-2026)).
- **Przetargowy Janusz** - 249 / 599 / 1 199 zł netto/mies., 14 dni próby bez karty; najniższy plan obejmuje wypełnianie ofert z limitem 10 przetargów miesięcznie ([link](https://przetargowyjanusz.pl/)). Analiza SWZ bez limitu; formularz cenowy użytkownik wypełnia w aplikacji ([link](https://przetargowyjanusz.pl/porownania/przetargowy-janusz-vs-mimira)). Wg konkurenta: darmowo do 20 streszczeń SWZ miesięcznie ([link](https://przetargpro.pl/porownania/przetargowy-janusz)).
- **PrzetargPro** - monitoring 69 zł/mies. ([link](https://przetargpro.pl/przetarg/dostawa-produktow-zywnosciowych-do-szkoly-podstawowej-w-chylicach-f366bee1ad9b)); analiza SWZ z werdyktem 299 zł/mies. (plan Start) albo 199 zł jednorazowo ([link](https://przetargpro.pl/porownania/przetargowy-janusz)). Sam pisze, że generowanie pełnej oferty przez AI to na razie obietnica ([link](https://przetargpro.pl/blog/ai-w-zamowieniach-publicznych-przyszlosc-jest-teraz)).
- **Pretendent** - 49 / 149 / 499 zł/mies.; analiza SWZ, lista wymagań, szkic oferty, kontrola kompletności ([link](https://www.pretendent.info/)).
- **Och! Przetargi** - od 150 zł/mies.; pełna analiza SWZ "w około minutę", w próbie 3 analizy ([link](https://ochprzetargi.pl/)).
- **Tender Vision** - analiza kosztów, generowanie dokumentów oferty z SWZ, kontrola kompletności ([link](https://www.tender-vision.com/)). Ceny nie znalazłem.
- **TenderMonitor** - 69 zł/mies.; ocena dopasowania 0-100%; **nie pobiera jeszcze i nie analizuje pełnych załączników SWZ** ([link](https://tendermonitor.pl/)).
- **Biznes Polska (biznes-polska.ai)** - stary gracz dodał AI: analiza SWZ i OPZ, dopasowanie do profilu firmy, analiza konkurencji, "Agent AI". Bez jawnego cennika ([link](https://biznes-polska.ai/), [link](https://www.biznes-polska.pl/przetargi-ai/)).
- **Oferent** - klasyczny monitoring bez analizy dokumentów, 2 000 zł netto/rok (wg PrzetargPro: [link](https://przetargpro.pl/blog/oferent-com-pl-opinie-cennik-alternatywy)).
- **Ofertis** - to firma doradcza (analiza SWZ jako usługa ludzi), nie narzędzie AI ([link](https://ofertis.pl/)).
- **Pressinfo** - brak jawnego cennika ([link](https://przetargpro.pl/blog/najlepsza-wyszukiwarka-przetargow-porownanie)); funkcji AI nie potwierdziłem. **Niezweryfikowane.**
- **Ofertai, Monitor Urzędowy** - celowane wyszukiwanie nie zwróciło nic o ich funkcjach. **Niezweryfikowane.** Ceny znane z pierwszego przeglądu: Ofertai 499 zł/rok ([link](https://ofertai.pl/)), Monitor Urzędowy 69 zł brutto/mies. ([link](https://monitorurzedowy.pl/page/cennik)).
- Do tego kolejne serwisy, które pojawiły się w wynikach i których nie było w pierwszym przeglądzie: [przetargomat.ai](https://przetargomat.ai/), [asystentprzetargow.pl](https://asystentprzetargow.pl/), [proponuj.pl](https://proponuj.pl/) ("przetargi z analizą SWZ i kompletem oferty"), [platformaofertowa.pl](https://platformaofertowa.pl/) ("przetargi bez abonamentu"), [radarprzetargow.com](https://radarprzetargow.com/), [przetarg-ai.pl](https://przetarg-ai.pl/), [useminerva.com](https://www.useminerva.com/pl/blog/serwisy-przetargowe-porownanie). Rój jest większy, niż pokazał pierwszy przegląd.

Czego **nie** znalazłem: narzędzia, które reklamuje się wprost dla branży spożywczej. Lentra mówi o lekach i wyrobach medycznych, Eulora o sprzęcie IT. To jedyna szczelina - ale wąska, bo mechanizm (pozycje formularza -> katalog -> ceny) jest ten sam.

### 2. Wolumen: ile przetargów na żywność rocznie, ilu oferentów, jaka część zakupów idzie poza BZP?

**Odpowiedź: oficjalnej rocznej liczby dla CPV 15 nie znalazłem. Dane z agregatora sugerują rząd kilku tysięcy postępowań rocznie w BZP i TED. Typowo 3 oferty na postępowanie. Udziału zakupów podprogowych nie udało się ustalić.**

Status: **częściowo** (liczby z jednego komercyjnego agregatora, różne daty migawek; brak danych UZP w podziale na CPV).

- Atlas Przetargów w kategorii "żywność" pokazuje ok. 30 544 ogłoszeń w bazie (nie wiadomo, z jakiego okresu i czy z wynikami), najwięcej: mazowieckie 4 535, śląskie 4 105, dolnośląskie 2 863; strona z datą 12 sierpnia 2026 ([link](https://atlasprzetargow.pl/przetargi/kategoria/zywnosc)). W nagłówku pada też liczba 377 jako wartość miesięczna, ale opis jest niejasny.
- PrzetargHub pokazywał ok. 727 aktywnych przetargów w branży żywność ([link](https://przetarghub.pl/branza/zywnosc/strona/36/)). Uwaga: listopad to szczyt sezonu, więc to nie jest średnia.
- Dla samego kodu 15000000 (dokładne dopasowanie) Atlas liczy statystyki z ok. 89-101 postępowań z ostatnich 365 dni - to mało, bo większość ogłoszeń używa kodów szczegółowych, np. 15800000 (podstrony Atlasu, np. [link](https://atlasprzetargow.pl/przetarg/2026-BZP-00558926)).
- **Szacunek (mój, nie fakt):** podstrony Atlasu dla woj. śląskiego opierają statystyki na próbie 1 295-1 370 postępowań z dwóch lat, czyli ok. 650-690 rocznie. Śląskie to ok. 13% bazy żywnościowej Atlasu (4 105 z 30 544). Dałoby to ok. 4 800-5 100 postępowań na żywność rocznie w całej Polsce w BZP i TED. To zgrubny rząd wielkości z dwóch liczb z różnych migawek. Sam sprawdzisz to dokładnie w 5 minut, filtrując wyszukiwarkę BZP na ezamowienia.gov.pl po kodach CPV 15* za 2025 r.
- **Liczba ofert:** typowo ok. 2,7 oferty w dostawach żywności w woj. śląskim, 3 w dolnośląskim i opolskim, 4 w warmińsko-mazurskim; udział postępowań z jedną ofertą 18-30% zależnie od regionu (19% w śląskim). Najtańsza oferta wygrywa w ok. 95% postępowań z 3-5 ofertami, a najdroższa jest typowo tylko ok. 8% droższa od najtańszej. Mediana szacunkowej wartości netto ok. 275-340 tys. zł, środkowa połowa przetargów ok. 160-480 tys. zł. Źródło: podstrony Atlasu Przetargów (liczby pojawiły się w streszczeniach kilku podstron i nie umiem każdej przypisać do konkretnej: [kategoria](https://atlasprzetargow.pl/przetargi/kategoria/zywnosc), [przykład 1](https://atlasprzetargow.pl/przetarg/2026-BZP-00458320), [przykład 2](https://atlasprzetargow.pl/przetarg/2026-BZP-00556069), [przykład 3](https://atlasprzetargow.pl/przetarg/2026-BZP-00553776)).
- Dla porównania cały rynek wg sprawozdania Prezesa UZP za 2025 r.: średnio 2,92 oferty na postępowanie ([prawowprzetargu.pl](https://www.prawowprzetargu.pl/pl/database/sprawozdanie-prezesa-uzp-za-2025-co-z-danych-wynika-dla-zamawiajacych-i-wykonawcow/)); 3,01 poniżej progów unijnych i 2,47 powyżej (wg opracowań: [mimira.eu](https://mimira.eu/przetargi/wiki/analiza-rynku-zamowien-publicznych-poradnik), [itexa.ai](https://itexa.ai/artykuly/uwagi-do-projektu-sprawozdania)). Wartość zamówień udzielonych wg ustawy: ponad 350 mld zł ([UZP](https://www.gov.pl/web/uzp/sprawozdanie-prezesa-uzp-z-funkcjonowania-systemu-zamowien-publicznych-w-2025-roku)).
- **Poza BZP:** od 1 stycznia 2026 r. próg stosowania ustawy to 170 000 zł netto (wcześniej 130 000 zł) i obowiązuje też w 2027 r. ([Portal ZP](https://www.portalzp.pl/nowosci/zamowienia-publiczne-20262027-od-jakiej-kwoty-obowiazuje-ustawa-pzp-35440.html), [Infor](https://ksiegowosc.infor.pl/obrot-gospodarczy/zamowienia-publiczne/7622366,zamowienia-podprogowe-2026-nowe-zasady-zakupow-publicznych-ponizej-170-tys-zl.html)). Poniżej progu szkoły robią zapytania ofertowe wg własnych regulaminów i wieszają je na swoich stronach BIP - przykłady z 2026 r.: [SP Mirzec](https://bip.mirzec.pl/wp-content/uploads/2026/08/Zapytanie-cenowe-SP-Mirzec-2026-sig.pdf), [SP 34 Rybnik](https://sp34.bip.edukacja.rybnik.eu/_files_/1._zapytanie_ofertowe_sp_34_2026_artykuy_spozywcze_oraz_ryby_i_mrozonki.pdf), [SP 59 Szczecin](https://sp59.szczecin.pl/bip/przetargi/zapytanie-ofertowe-na-dostawe-artykulow-zywnosciowych), [ZSCKR Szczecin](https://www.gov.pl/web/zsckr-szczecin/zapytanie-ofertowe---dostawa-produktow-suchych-przetworow-tluszczy-oraz-artykulow-spozywczych-roznych-do-stolowki-szkolnej-w-roku-szkolnym-20262027). **Jaka to część rynku - nie wiem.** Zapytanie o dane UZP zostało odrzucone przez limit. Podwyższenie progu o 40 tys. zł prawie na pewno przesunęło część małych zakupów żywności z BZP na strony BIP [niezweryfikowane - wniosek], a mediana wartości 275-340 tys. zł pokazuje, że wiele postępowań jest niedaleko progu.

### 3. Czy istnieją wertykalne narzędzia przetargowe dla dostawców żywności (Polska, zagranica) i czy zarabiają?

**Odpowiedź: osobnego płatnego narzędzia tylko dla branży spożywczej nie znalazłem ani w Polsce, ani za granicą. Wszędzie "wertykal" to podstrona branżowa w serwisie ogólnym. Danych o przychodach brak.**

Status: **częściowo** (jedno wyszukiwanie na Polskę, jedno na zagranicę; brak danych o przychodach kogokolwiek).

- **Polska** - strony "przetargi na żywność" mają już: Atlas Przetargów (darmowy, z alertami i statystykami: [link](https://atlasprzetargow.pl/przetargi/kategoria/zywnosc)), PrzetargHub (darmowy: [link](https://przetarghub.pl/branza/zywnosc/strona/36/)), PrzetargPro (podstrony pojedynczych przetargów z przyciskiem zakupu monitoringu za 69 zł: [link](https://przetargpro.pl/przetarg/dostawa-produktow-zywnosciowych-do-szkoly-podstawowej-w-chylicach-f366bee1ad9b)), i-przetargi.com.pl ([link](https://i-przetargi.com.pl/profil/artykuly-spozywcze)), Portal ZP ([link](https://www.portalzp.pl/szukaj-przetargow/rg/pleu/b/spozywcza/rp/bzp)), eGospodarka ([link](https://www.przetargi.egospodarka.pl/Rozne-produkty-spozywcze)), a nawet portal branży spożywczej jedzenie.info.pl z działem przetargów ([link](https://www.jedzenie.info.pl/przetargi/index)). Czyli strony programatyczne "przetargi żywność - [województwo]", które miały być Twoim kanałem SEO, już istnieją u co najmniej 6 serwisów, w tym darmowych.
- **Zagranica (głównie Wielka Brytania)** - to samo: serwisy ogólne z podstroną "food / catering": Stotles ([link](https://www.stotles.com/tenders/topics/restaurant-and-food-serving-tenders)), PSIP (68 aktywnych przetargów catering i żywność: [link](https://psip.co.uk/tenders/catering-food)), BidSkim ([link](https://bidskim.com/market/catering-hospitality)), Hyde Bids ([link](https://www.hydebids.com/sector/tendering-in-food-drink/)), TendersOnTime ([link](https://www.tendersontime.com/food-and-beverages-tenders/)), Jorpex ([link](https://jorpex.com/use-cases/catering-tenders/)). Nie znalazłem żadnego serwisu wyłącznie spożywczego z ujawnionymi przychodami.
- **Czy zarabiają** - nie wiem. Jedyne liczby o trakcji w całej kategorii dotyczą Mimiry (ogólna, korporacyjna): ponad 4 mln zł rundy pre-seed w marcu 2026 r., ponad 100 klientów, blisko tysiąc ofert (deklaracje prasowe: [mambiznes.pl](https://mambiznes.pl/news/mimira-zamyka-runde-finansowania-pre-seed-polski-startup-ze-wsparciem-brytyjskiego-funduszu/), [xyz.pl](https://xyz.pl/brytyjski-fundusz-i-polski-gigant-przetargowy-uwierzyli-w-startup-mimira-miliony-na-automatyzacje-pozyskiwania-publicznych-kontraktow/), [mycompanypolska.pl](https://mycompanypolska.pl/artykul/z-zabki-i-topowego-vc-do-wlasnego-startupu-4-mln-zl-dla-mimiry-na-automatyzacje-przetargow/20187)). Przychodów nie podano.
- Wniosek [niezweryfikowane]: brak osobnego wertykalnego narzędzia spożywczego to według Twojej reguły R4 brak dowodu popytu, a nie okazja. Kategorię obsługują podstrony serwisów ogólnych.

### 4. Dostęp do danych: API i warunki dla BZP / e-Zamówienia i TED; jak publikowane są załączniki

**Odpowiedź: ogłoszenia - dostępne i darmowe (TED bez klucza, BZP przez API z regulaminem). Załączniki - to jest problem: nie leżą w jednym miejscu.**

Status: **częściowo** (API potwierdzone; warunków ponownego wykorzystania danych BZP i licencji TED nie znalazłem; formaty załączników znam z 5 przykładów).

- **BZP / e-Zamówienia:** jest usługa API pod adresem ezamowienia.gov.pl/mo-board/api/v1/notice; pozwala odczytywać opublikowane ogłoszenia krajowe wg kryteriów i je zliczać ([Portal ZP](https://www.portalzp.pl/nowosci/w-sierpniu-br.-nowe-funkcjonalnosci-na-platformie-ezamowienia-27840.html), [regulamin platformy](https://ezamowienia.gov.pl/pl/regulamin/)). Obowiązuje osobny regulamin API (zarządzenie Prezesa UZP nr 1/2023: [link](https://media.ezamowienia.gov.pl/pod/2023/02/Regulamin-korzystania-z-API-1.pdf)). Nieoficjalny katalog podaje cięższą ścieżkę: formalny wniosek do UZP, uwierzytelnianie OAuth2 i raport z testów integracyjnych ([otwarteapi.pl](https://otwarteapi.pl/en/e-zamowienia)) - źródło nieoficjalne, do sprawdzenia. W praktyce kilkanaście małych serwisów korzysta z tych danych, więc da się [wniosek]. Ministerstwo Cyfryzacji publikuje definicje interfejsów ([link](https://www.gov.pl/web/cyfryzacja/standardy-uslug-i-danych-dla-platformy-e-zamowienia-udostepniamy-ostatnia-trzecia-czesc)). Warunków ponownego wykorzystania danych nie znalazłem - **niezweryfikowane**.
- **TED:** API wyszukiwania działa anonimowo, bez klucza; obowiązuje polityka uczciwego użycia; są paczki XML dzienne i miesięczne oraz usługa otwartych danych (SPARQL) bez limitu zapytań ([dokumentacja](https://docs.ted.europa.eu/api/latest/index.html), [strona dla ponownych użytkowników](https://ted.europa.eu/en/simap/developers-corner-for-reusers), [pytania i odpowiedzi 2025](https://op.europa.eu/en/web/ted-reusers-workshops/questions-and-answers-2025), [ponowne wykorzystanie](https://ted.europa.eu/en/help/data-reuse)). Tekstu licencji w wynikach nie było - **niezweryfikowane**; dane TED są co do zasady przeznaczone do ponownego wykorzystania [z pamięci modelu].
- **Załączniki (SWZ, formularze):** ogłoszenie jest w BZP, ale dokumenty są na "stronie prowadzonego postępowania" - może to być e-Zamówienia albo komercyjna platforma: SmartPZP (eB2B), Logintrade, platformazakupowa.pl, Marketplanet ([mimira.eu](https://mimira.eu/przetargi/wiki/platformy-zakupowe-w-zamowieniach-publicznych), [useminerva.com](https://www.useminerva.com/pl/blog/platforma-e-zamowienia-bzp-ted-poradnik)). Zamówienia podprogowe - na stronach BIP poszczególnych szkół. Nie znalazłem informacji, że którakolwiek platforma udostępnia załączniki przez API. Czyli każda platforma to osobny mechanizm pobierania, który trzeba napisać i potem pilnować. [częściowo]
- **Formaty formularzy** w 5 przykładach z 2026 r.: PDF (SP 34 Rybnik: [link](https://sp34.bip.edukacja.rybnik.eu/_files_/1._zapytanie_ofertowe_sp_34_2026_artykuy_spozywcze_oraz_ryby_i_mrozonki.pdf); ZSCKR Szczecin: [link](https://www.gov.pl/web/zsckr-szczecin/zapytanie-ofertowe---dostawa-produktow-suchych-przetworow-tluszczy-oraz-artykulow-spozywczych-roznych-do-stolowki-szkolnej-w-roku-szkolnym-20262027)), .doc i .docx (SP 4 Chojnów: [link](https://sp4.chojnow.eu/zamowienia_publiczne,m1,s1201.html)), sześć osobnych załączników na grupy produktów (SP 50 Warszawa, pieczywo, warzywa, nabiał, mięso, mrożonki, dania gotowe: [link](https://atlasprzetargow.pl/przetarg/2026-BZP-00555134)). Pliku .xlsx w tej próbce nie było. Jaki odsetek to skany - **nie wiem**. Pięć przykładów to za mało na statystykę.

### 5. Czy małe hurtownie spożywcze naprawdę startują w przetargach? Czy szukają narzędzi w internecie?

**Odpowiedź: startują - to potwierdzone pośrednio. Czy szukają narzędzi online - brak jakiegokolwiek dowodu.**

Status: pierwsza część **częściowo**, druga **niezweryfikowane**.

- W postępowaniach poniżej progów unijnych MŚP złożyły 87% ofert, w dostawach 84% (analiza sprawozdania UZP za 2025 r.: [prawowprzetargu.pl](https://www.prawowprzetargu.pl/pl/database/sprawozdanie-prezesa-uzp-za-2025-co-z-danych-wynika-dla-zamawiajacych-i-wykonawcow/)). To dane dla wszystkich dostaw, nie tylko żywności.
- Zamówienia są dzielone na części (np. jaja, kiszonki, owoce i warzywa, mrożonki, ryby), więc mały lokalny dostawca może startować tylko w swojej grupie ([przykład](https://atlasprzetargow.pl/przetarg/2026-BZP-00529680)).
- Przykład wyniku: placówka w Bieszczadach wybrała ofertę jednoosobowej firmy "Handel-Hurt-Detal art. rolno-spożywcze" z Sanoka za 29 116,83 zł brutto; dwie hurtownie odrzucono z powodów formalnych ([link](https://bieszczadzkizespol.szkolnastrona.pl/a,366,wyniki-przetargu-na-dostawe-zywnosci); data tego wyniku nieznana, może być stara).
- Bywa próg doświadczenia: szkoła pod Piasecznem wymagała wcześniejszej dostawy artykułów spożywczych za min. 170 000 zł brutto w ostatnich 3 latach ([link](https://przetargpro.pl/przetarg/dostawa-produktow-zywnosciowych-do-szkoly-podstawowej-w-chylicach-f366bee1ad9b)).
- Konkurencja cenowa jest ostra: najtańsza oferta wygrywa w ok. 95% przypadków, rozrzut cen ok. 8% (źródło jak w pytaniu 2). Dla Ciebie to zła wiadomość: kupujący żyje z cienkiej marży i liczy każdą złotówkę kosztu stałego. [wniosek]
- **Kawa:** w wynikach przetargi z kawą i herbatą jako osobną częścią to głównie jednostki wojskowe (zadania typu "dostawa kawy i herbaty", "zupy, sosy, kawa, herbata, dania instant"), kod CPV 15860000 często tylko jako dodatkowy ([Portal ZP](https://www.portalzp.pl/przetargi/dostawa-kawy-i-herbaty--12349399), [TED](https://ted.europa.eu/pl/notice/91876-2026/pdf), [TED](https://ted.europa.eu/pl/notice/19251-2026/pdf)). Liczby takich postępowań nie ustaliłem. Wniosek [niezweryfikowane]: dystrybutor kawy to nie jest typowy oferent w przetargach szkolnych; Twój klient z Gdańska może w ogóle nie startować.
- **Czy szukają narzędzi:** nie znalazłem żadnego artykułu z prasy branżowej, forum ani stowarzyszenia o tym, jak hurtownie spożywcze szukają przetargów. Zapytanie celowane w to zostało odrzucone przez limit. Hipoteza [niezweryfikowane]: lokalna hurtownia zna swoich zamawiających, wie, że ogłaszają co roku w tych samych miesiącach, i sprawdza ich strony ręcznie albo ma darmowy alert.

### 6. Chęć płacenia i rezygnacje w wąskich narzędziach przetargowych; czy 99 zł/mies. udźwignie Google Ads?

**Odpowiedź: chęć płacenia za monitoring istnieje, ale dno cenowe to 0 zł. O rezygnacjach nie ma żadnych danych. Moim zdaniem 99 zł/mies. nie udźwignie reklamy - ale to rozumowanie, nie pomiar.**

Status: ceny **zweryfikowane**; rezygnacje i koszt kliknięcia **niezweryfikowane**.

- Drabina cen w kategorii: 0 zł (Atlas Przetargów, PrzetargHub, plany darmowe PrzetargPro i Janusza) -> 49-69 zł/mies. (Pretendent Starter, TenderMonitor, PrzetargPro Monitoring) -> 150-299 zł/mies. (Och! Przetargi, PrzetargPro Start) -> 249-1 199 zł/mies. (Janusz, z wypełnianiem ofert) -> ok. 800-1 600 zł/mies. (Lentra). Linki w pytaniu 1.
- Wniosek z drabiny: pieniądze są w **wypełnianiu oferty** (249-1 600 zł/mies.), a nie w alertach (0-69 zł). 99 zł/mies. za "alert + tabelka w Excelu" trafia w pustkę między poziomami. [wniosek]
- Lentra pobiera 99-149 zł za dodatkowy "pakiet" ([lentra.pl](https://lentra.pl/)). Jeśli pakiet to jedna część przetargu (moja interpretacja), to jest to kotwica dla ceny za sztukę.
- **Rezygnacje:** zero danych. Sezonowość (pytanie 2 i Werdykt pkt 5) sugeruje wysokie rezygnacje po sezonie. [niezweryfikowane]
- **Google Ads:** kosztu kliknięcia dla fraz przetargowych nie znam (zapytanie odrzucone przez limit, a bez Planera i tak byłaby to liczba z drugiej ręki). Rachunek jest w sekcji "Ekonomia" i jest w całości szacunkiem.

### 7. Czy inna branża lepiej pasuje do "dokumenty przetargu -> wyceniony arkusz"?

**Odpowiedź: obiektywnie tak - leki i wyroby medyczne. Ale ta branża jest już obsadzona i nie pasuje do Ciebie. Dla Twoich ograniczeń: żadna.**

Status: **częściowo**.

- **Wyroby medyczne i leki** - tu jest najwięcej dowodów: Lentra buduje pod to wprost (dopasowanie do katalogu, równoważność z porównaniem parametrów, baza cen z ofert w przetargach na leki i wyroby medyczne: [lentra.pl](https://lentra.pl/)) i bierze ok. 800-1 600 zł/mies.; w rundzie Mimiry uczestniczył prezes dystrybutora wyrobów medycznych Zarys International ([mambiznes.pl](https://mambiznes.pl/news/mimira-zamyka-runde-finansowania-pre-seed-polski-startup-ze-wsparciem-brytyjskiego-funduszu/)); formularze szpitalne mają pakiety, numery katalogowe, producenta, jednostki miary ([przykład](https://szpitalparkitka.com.pl/media/konkursy/5af8e7d13d42039730ba41231b5ac0f0.1.doc)). Dlaczego nie dla Ciebie [wniosek]: ocena równoważności wyrobu medycznego wymaga wiedzy branżowej, kupujący to firmy z działami przetargów (sprzedaż przez rozmowy, nie przez Google), a miejsce zajmują gracze z finansowaniem.
- **Sprzęt IT** - zajęte przez Eulorę ([link](https://eulora.pl/)).
- **Budownictwo** - Lentra jest w zagranicznych katalogach wpisana jako narzędzie dla wykonawców budowlanych ([Software Advice](https://www.softwareadvice.com/product/772498-Lentra/)); tam "formularzem" jest kosztorys, a to osobny świat z własnymi programami [z pamięci modelu].
- **Środki czystości, materiały biurowe** - nie sprawdziłem (limit). **Niezweryfikowane.** Mechanizm jest ten sam, więc narzędzia ogólne (Lentra, Janusz) obsługują je tak samo jak żywność.

## Konkurencja

| Nazwa | Cena | Trakcja | Słabość | Link |
|---|---|---|---|---|
| Atlas Przetargów | 0 zł (wyszukiwarka i alerty e-mail); nieokreślone płatne dodatki | nieznana | brak analizy dokumentów i oceny dopasowania (wg konkurenta); ręczne | https://atlasprzetargow.pl/monitoring-przetargow |
| PrzetargHub | 0 zł | nieznana | tylko lista ogłoszeń | https://przetarghub.pl/ |
| PrzetargPro | plan darmowy; 69 zł/mies. monitoring; 299 zł/mies. analiza SWZ; 199 zł jednorazowo | nieznana | sam przyznaje, że pełna oferta z AI to obietnica | https://przetargpro.pl/porownania/przetargowy-janusz |
| TenderMonitor | 69 zł/mies. | nieznana; ślady małego projektu | nie pobiera załączników SWZ | https://tendermonitor.pl/ |
| Pretendent | 49 / 149 / 499 zł/mies. | nieznana | ogólny, brak branży | https://www.pretendent.info/ |
| Och! Przetargi | od 150 zł/mies. | nieznana | tylko analiza SWZ, bez wypełniania | https://ochprzetargi.pl/ |
| Przetargowy Janusz | 249 / 599 / 1 199 zł netto/mies.; darmowo 20 streszczeń | nieznana; spółka z 2026 r. | limit 10 przetargów w najniższym planie; formularz cenowy wypełnia użytkownik | https://przetargowyjanusz.pl/ |
| Lentra | abonament od 179 zł + pakiety po 99-149 zł; przykłady 797 i 1 222 zł/mies.; Pro Max od 1 599 zł/mies. | nieznana; właściciel nieustalony | drogo dla małej hurtowni; nastawienie na medycynę | https://lentra.pl/ |
| Eulora | nie znaleziono | nieznana | wywodzi się ze sprzętu IT | https://eulora.pl/ |
| Mimira | cennik zamknięty | ponad 4 mln zł pre-seed (marzec 2026), deklarowane 100+ klientów | klient korporacyjny, sprzedaż przez rozmowy | https://mimira.eu/przetargi/wiki/najlepsze-programy-do-automatyzacji-przetargow |
| Tender Vision | nie znaleziono | nieznana | ogólny | https://www.tender-vision.com/ |
| Biznes Polska (biznes-polska.ai) | brak jawnego cennika | ponad 20 lat na rynku (deklaracja) | sprzedaż przez handlowca | https://biznes-polska.ai/ |
| Oferent | 2 000 zł netto/rok | stary gracz | brak analizy dokumentów | https://przetargpro.pl/blog/oferent-com-pl-opinie-cennik-alternatywy |
| Ofertis | 350-480 zł netto/mies. (z pierwszego przeglądu) | stary gracz | usługa ludzi, nie automat | https://ofertis.pl/ |
| Pressinfo | brak jawnego cennika | stary gracz | AI niepotwierdzone | https://przetargpro.pl/blog/najlepsza-wyszukiwarka-przetargow-porownanie |
| Ofertai | 499 zł/rok (z pierwszego przeglądu) | nieznana | funkcji nie zweryfikowałem | https://ofertai.pl/ |
| Monitor Urzędowy | 69 zł brutto/mies. (z pierwszego przeglądu) | nieznana | funkcji nie zweryfikowałem | https://monitorurzedowy.pl/page/cennik |
| ChatGPT / Claude (darmowe lub w abonamencie, który klient już ma) | 0 zł | - | trzeba ręcznie wgrać plik; nie zna cennika hurtowni | [z pamięci modelu] |

Nikt z tej listy nie ujawnia liczby klientów ani przychodów (poza deklaracją prasową Mimiry). Wiele z tych serwisów może nie mieć ani jednego płacącego klienta.

## Najlepszy wariant produktu

Uczciwie: najlepszy wariant **nie jest już tym kandydatem** i nie jest samodzielnym projektem nr 2. Oceniam go jako **słaby**.

**"Wypełniony formularz asortymentowo-cenowy za sztukę" - bez monitoringu, bez abonamentu.**

- **Dla kogo:** hurtownia spożywcza, która już startuje w przetargach i zapytaniach ofertowych (szkoły, przedszkola, DPS-y, szpitale) i co sezon ręcznie wycenia kilkanaście-kilkadziesiąt formularzy.
- **Co robi:** klient sam wgrywa plik formularza (PDF, DOC, DOCX, XLSX - obojętnie skąd: z BZP, z platformy, ze strony BIP szkoły) i raz swój cennik w Excelu. Dostaje formularz z dopasowanymi produktami, przeliczonymi opakowaniami, cenami i sumami oraz listą pozycji, których system nie był pewien. Człowiek zatwierdza - ten sam wzorzec co w PLAR Orders.
- **Dlaczego tak:** (1) omija cały problem pobierania załączników z wielu platform; (2) obejmuje też zapytania podprogowe, których monitory nie widzą; (3) cena za sztukę pasuje do sezonowego rytmu (R2); (4) dopasowanie do własnego cennika i zachowanie układu zamawiającego to coś, czego darmowy czat nie zrobi wygodnie przy 300 pozycjach.
- **Cena (szacunek):** 49-79 zł netto za formularz albo paczka 10 formularzy za ok. 399 zł. Musi być wyraźnie poniżej 99-149 zł, które Lentra bierze za pakiet ([lentra.pl](https://lentra.pl/)), i poniżej 249 zł/mies. Janusza ([link](https://przetargowyjanusz.pl/)).
- **Kanał:** tu wariant się sypie. Nie mam dowodu, że ktokolwiek szuka tego w Google. Fraza "formularz asortymentowo-cenowy" jest wpisywana raczej przez osoby szukające pliku konkretnego przetargu niż narzędzia [niezweryfikowane]. Jedyny realny kanał to Twoi obecni i przyszli klienci PLAR Orders - czyli **dodatek do PLAR Orders**, sprzedawany w ramach konsultingu, a nie pasywny produkt z ruchem z wyszukiwarki.
- **Wniosek:** jeśli klient z Gdańska albo inna hurtownia, którą znasz, powie "tak, tracę na to 2 dni przed każdym przetargiem" - zrób to jako moduł PLAR Orders dla tego klienta. Nie buduj z tego osobnego produktu.

## Ekonomia (z zaznaczeniem szacunkow)

Wersja z kandydata (abonament 99 zł netto/mies.):

- **Wielkość rynku (szacunek, bardzo zgrubny):** ok. 5 000 postępowań rocznie (szacunek z pytania 2) razy ok. 3 oferty ([Atlas](https://atlasprzetargow.pl/przetargi/kategoria/zywnosc)) to ok. 15 000 ofert rocznie. Jeśli aktywna firma składa 10-30 ofert rocznie (szacunek), to aktywnie startujących firm jest w Polsce ok. 500-1 500 (szacunek). To cały rynek, nie Twój udział.
- **Realny udział (szacunek):** 1-2% tych firm, czyli 5-30 klientów. Przy 99 zł to 500-3 000 zł/mies. w sezonie i mniej poza nim. To mieści się w bazowych wynikach z pierwszego przeglądu (0-500 USD/mies. w pierwszym roku), ale u dołu.
- **Czas życia klienta (szacunek):** 3-6 miesięcy z powodu sezonowości, czyli 300-600 zł przychodu z klienta.
- **Koszt pozyskania z Google Ads (szacunek, brak danych o cenie kliknięcia):** przy 2-5 zł za kliknięcie i 1-2% wizyt kończących się płatnością klient kosztuje 100-500 zł. W środku tego przedziału reklama zjada cały przychód z klienta. Żeby to się spinało, konwersja musiałaby być powyżej 3% przy kliknięciu poniżej 3 zł - nie mam podstaw, żeby tego oczekiwać przy darmowych zamiennikach.
- **Koszty własne (szacunek):** hosting ok. 0 zł; modele AI do czytania załączników - jeśli przetwarzać wszystkie przetargi spożywcze z góry, to tysiące dokumentów rocznie i koszt przed pierwszym przychodem; jeśli tylko na żądanie klienta - grosze do kilku złotych za dokument.

Wariant "za sztukę" (49-79 zł za formularz): jednorazowa płatność 49-79 zł nie udźwignie reklamy w ogóle, chyba że klient wraca kilkanaście razy w roku (szacunek). Sens ma tylko bez kosztu pozyskania, czyli u klientów, których już masz.

## Zakres budowy i pasywnosc

**Wersja z kandydata:**
- Pobieranie ogłoszeń z BZP i TED, filtr po CPV 15 i regionie, codzienny e-mail, Stripe, strona sprzedażowa: 6-9 dni z agentem AI (szacunek z pierwszego przeglądu, nie mam podstaw go zmieniać).
- Pobieranie załączników: osobny mechanizm dla e-Zamówień, platformazakupowa.pl, SmartPZP, Logintrade, Marketplanet i stron BIP. Każdy może się zepsuć przy zmianie strony. Szacunek: 2-4 tygodnie na 2-3 największe platformy i ciągłe poprawki potem. **To nie mieści się w regule 2-3 tygodni na sprzedawalną wersję pierwszą.**
- Wyciąganie tabel z PDF/DOC/DOCX do Excela: 5-8 dni (szacunek). Skany wymagają rozpoznawania tekstu i dają błędy w ilościach i jednostkach.
- **Pasywność: nie.** Szczyt pracy klienta (listopad-grudzień oraz lato) to jednocześnie szczyt awarii i pytań, a oferty mają twarde terminy co do godziny (przykład: termin 30.11.2026, 09:00: [link](https://atlasprzetargow.pl/przetarg/2026-BZP-00555134)). Pominięty przetarg albo źle przepisana ilość to realna strata klienta. Szacunek: 4-8 h/tydz. w sezonie, 1-2 h poza nim.

**Wariant "za sztukę":** wgranie pliku, odczyt tabeli, dopasowanie do cennika, eksport, Stripe: 2-3 tygodnie (szacunek) - mieści się w regule, bo korzysta z mechanizmu dopasowania z PLAR Orders. Pasywność słaba: każdy nowy klient to inny cennik i inne nazwy produktów, a błąd ceny w ofercie przetargowej wiąże klienta na rok.

**Uwaga o kalendarzu:** dziś jest 26 listopada. Szczyt przetargów na 2027 r. trwa teraz. Produkt zbudowany w 2-3 tygodnie wyszedłby w połowie grudnia, po szczycie, i czekałby na następną falę (przetargi na rok szkolny, prawdopodobnie czerwiec-sierpień - wniosek z tytułów ogłoszeń, nie z danych).

## Ryzyka

1. **Darmowe zamienniki monitoringu** (Atlas Przetargów, PrzetargHub) z gotowymi podstronami dla żywności. Najpoważniejsze - zabija połowę produktu.
2. **Wyróżnik już istnieje u innych** i to w mocniejszej wersji (wypełnianie formularza, nie tylko przepisanie).
3. **Brak kanału.** Podstrony "przetargi żywność - [region]" mają już co najmniej 6 serwisów. Nowa domena ich nie przebije, a reklama się nie spina przy 99 zł.
4. **Sezonowość i rezygnacje.** Dwa krótkie okna w roku.
5. **Kupujący o cienkiej marży.** Najtańsza oferta wygrywa w ok. 95% przypadków ([Atlas](https://atlasprzetargow.pl/przetargi/kategoria/zywnosc)). Taki klient nie lubi kosztów stałych.
6. **Rynek przesuwa się poza BZP.** Próg 170 000 zł od 2026 r. wypycha małe zakupy na strony BIP, gdzie Twój monitor nic nie widzi.
7. **Odpowiedzialność za błąd.** Źle odczytana ilość, jednostka albo przelicznik opakowania = klient składa błędną ofertę albo przegrywa. Potrzebne mocne zastrzeżenia w regulaminie i ekran zatwierdzania.
8. **Zależność od platform.** Regulaminy komercyjnych platform zakupowych mogą zabraniać automatycznego pobierania - nie sprawdziłem.
9. **Fałszywa przewaga "znam tego klienta".** Dystrybutor kawy to nie hurtownia zaopatrująca szkoły. Jeden klient referencyjny w innej podbranży to nie kanał.
10. **Powtórka z disclosekit.** Pomysł wychodzi od technologii, którą masz ("umiem wyciągać pozycje z dokumentów"), a nie od zmierzonego popytu.

## Najtanszy test checi zaplaty (R1) z progami

Moja rekomendacja: nie wydawaj na to budżetu testowego, jeśli masz innych kandydatów z lepszym werdyktem. Jeśli mimo to chcesz sprawdzić, rób kroki po kolei i zatrzymaj się na pierwszym niezaliczonym.

**Krok 0 - Planer słów kluczowych (0 zł, 20 minut).** Lista fraz niżej, lokalizacja Polska.
- Zaliczone: jedna fraza zakupowa branży spożywczej ma co najmniej 1 000 wyszukiwań miesięcznie albo trzy mają po co najmniej 100.
- Koniec: żadna fraza spożywcza nie przekracza 100. Wysoki wynik dla ogólnego "monitoring przetargów" **nie liczy się** - tę frazę obsadza kilkunastu graczy.

**Krok 1 - trzy rozmowy z ludźmi, których już znasz (0 zł, ok. 1 godziny).** Klient z Gdańska plus 2-3 hurtownie z Twojego konsultingu. To nie sprzedaż na zimno. Pytania: czy startujecie w przetargach lub zapytaniach ofertowych, ile razy w roku, skąd wiecie o ogłoszeniach, ile trwa wypełnienie jednego formularza, czego do tego używacie, ile za to płacicie.
- Zaliczone: co najmniej 2 z 3-4 firm składają co najmniej 5 ofert rocznie i same mówią, że wypełnianie formularza to dzień pracy lub więcej.
- Koniec: żadna nie startuje regularnie albo wszystkie mówią "znamy zamawiających, mamy to w Excelu z zeszłego roku".

**Krok 2 - płatna usługa "na piechotę" (do 100 EUR, 14 dni, zero kodu).** Jedna strona: "Wyślij formularz asortymentowo-cenowy i swój cennik. W 24 godziny odeślemy formularz wypełniony w układzie zamawiającego. 79 zł netto za formularz, płatne z góry" + Stripe Checkout + reklamy na frazy z listy. Zamówienia realizujesz ręcznie z pomocą Claude. Trzeba to zrobić od razu (szczyt sezonu trwa do połowy grudnia) albo dopiero przed następną falą.
- Zaliczone: co najmniej 5 opłaconych formularzy od co najmniej 3 różnych firm w 14 dni i co najmniej 2 firmy zamawiają drugi raz.
- Koniec: mniej niż 3 płatności. Bez dogrywek, bez "ale ludzie klikali".
- Uwaga: ten krok testuje wariant "za sztukę", nie monitor z kandydata. Monitora za 99 zł nie warto testować wcale - darmowe zamienniki rozstrzygają sprawę.

## Frazy do sprawdzenia w Planerze slow kluczowych

Frazy branżowe (to one decydują):
- przetargi żywność
- przetargi na dostawę żywności
- przetargi artykuły spożywcze
- przetargi spożywcze
- przetargi dostawa artykułów spożywczych
- przetargi na żywność do szkół
- przetargi dla hurtowni spożywczych
- zapytanie ofertowe dostawa żywności
- przetargi mięso
- przetargi pieczywo
- przetargi warzywa i owoce
- przetargi nabiał
- przetargi kawa
- przetargi catering

Frazy o formularzu (sprawdzają wariant "za sztukę"):
- formularz asortymentowo-cenowy
- formularz cenowy przetarg
- jak wypełnić formularz asortymentowo-cenowy
- wycena przetargu program
- program do przetargów
- analiza SWZ AI
- AI przetargi

Frazy ogólne (tylko dla porównania, nie jako dowód dla tej niszy):
- monitoring przetargów
- wyszukiwarka przetargów
- darmowa wyszukiwarka przetargów

Po sprawdzeniu wolumenów wpisz 3 najlepsze frazy branżowe w Google w oknie incognito i policz, ile z pierwszych 10 wyników to Atlas Przetargów, PrzetargHub, PrzetargPro, Portal ZP, eGospodarka i i-przetargi. Jeśli 6 lub więcej - kanał SEO jest zamknięty.

## Otwarte pytania

1. **Wolumeny wyszukiwań** dla wszystkich fraz - nie mam narzędzia.
2. **Czy klient z Gdańska w ogóle startuje w przetargach.** Jeden telefon.
3. **Dokładna roczna liczba postępowań w CPV 15** w BZP i TED - mój szacunek 4 800-5 100 jest zgrubny. Do sprawdzenia w wyszukiwarce BZP w 5 minut.
4. **Jaka część zakupów żywności idzie poniżej progu 170 000 zł** (strony BIP, platformazakupowa.pl) - zapytanie odrzucone przez limit.
5. **Jak dobrze Lentra, Janusz i Eulora radzą sobie z formularzem spożywczym na 300 pozycji** - nikt tego niezależnie nie opisał. Da się sprawdzić za darmo na 14-dniowych okresach próbnych Lentry i Janusza, wgrywając jeden prawdziwy formularz szkolny.
6. **Kto stoi za Lentrą i ilu ma klientów** - nie ustaliłem.
7. **Warunki API e-Zamówień** (czy potrzebny formalny wniosek, czy wolno pobierać załączniki automatycznie, zasady ponownego wykorzystania) i **regulaminy platform komercyjnych**.
8. **Jaki odsetek formularzy to skany**, a jaki pliki edytowalne - 5 przykładów to za mało.
9. **Rezygnacje** w tanich serwisach przetargowych - zero danych.
10. **Koszt kliknięcia** w Google Ads dla fraz przetargowych - zapytanie odrzucone przez limit; sprawdzisz w Planerze razem z wolumenami.
11. **Funkcje AI w Ofertai, Monitorze Urzędowym i Pressinfo** - nie potwierdzone.
12. **Środki czystości i materiały biurowe** jako alternatywna branża - nie zbadane.
13. **Kto najczęściej wygrywa przetargi na żywność** (mali lokalni dostawcy czy kilku dużych) - zapytanie odrzucone przez limit; Atlas Przetargów pokazuje wyniki i wykonawców za darmo.

## Zrodla

Wszystkie adresy pojawiły się w wynikach wyszukiwania z 2026-11-26. Treści stron nie otwierałem bezpośrednio.

Narzędzia do ofertowania i analizy SWZ:
- https://lentra.pl/
- https://www.softwareadvice.com/product/772498-Lentra/
- https://www.capterra.com/p/10265150/Lentra/
- https://eulora.pl/
- https://mimira.eu/przetargi/wiki/najlepsze-programy-do-automatyzacji-przetargow
- https://finanse.wp.pl/mimira-aplikacja-do-przetargow-ai-ktora-automatyzuje-zamowienia-publiczne-od-wyszukiwania-po-dokumentacje-przetargowa-7315206206642240a (materiał o charakterze sponsorowanym)
- https://poradnikprzedsiebiorcy.pl/-mimira-platforma-przetargowa-ai-do-wyszukiwania-przetargow-i-automatyzacji-dokumentacji
- https://mambiznes.pl/news/mimira-zamyka-runde-finansowania-pre-seed-polski-startup-ze-wsparciem-brytyjskiego-funduszu/
- https://xyz.pl/brytyjski-fundusz-i-polski-gigant-przetargowy-uwierzyli-w-startup-mimira-miliony-na-automatyzacje-pozyskiwania-publicznych-kontraktow/
- https://itwiz.pl/mimira-z-4-mln-zl-na-cyfryzacje-przetargow-publicznych/
- https://mycompanypolska.pl/artykul/z-zabki-i-topowego-vc-do-wlasnego-startupu-4-mln-zl-dla-mimiry-na-automatyzacje-przetargow/20187
- https://www.rmf.fm/magazyn/news,89025,w-polowie-przetargow-w-skladana-jest-jedna-oferta-mimira-pozyskala-4-mln-pln-by-to-zmienic.html
- https://przetargowyjanusz.pl/
- https://przetargowyjanusz.pl/porownania/przetargowy-janusz-vs-mimira
- https://przetargowyjanusz.pl/porownania/najlepsza-platforma-do-przetargow
- https://przetargowyjanusz.pl/blog/zapytanie-ofertowe-jak-odpowiedziec
- https://przetargpro.pl/porownania/przetargowy-janusz
- https://przetargpro.pl/porownania/atlas-przetargow
- https://przetargpro.pl/blog/ai-w-przetargach-platformy-porownanie-2026
- https://przetargpro.pl/blog/ai-w-zamowieniach-publicznych-przyszlosc-jest-teraz
- https://przetargpro.pl/blog/najlepsza-wyszukiwarka-przetargow-porownanie
- https://przetargpro.pl/blog/oferent-com-pl-opinie-cennik-alternatywy
- https://tendermonitor.pl/
- https://www.pretendent.info/
- https://ochprzetargi.pl/
- https://www.tender-vision.com/
- https://przetarg-ai.pl/
- https://przetargomat.ai/
- https://asystentprzetargow.pl/
- https://proponuj.pl/
- https://platformaofertowa.pl/
- https://radarprzetargow.com/
- https://www.useminerva.com/pl/blog/serwisy-przetargowe-porownanie
- https://biznes-polska.ai/
- https://www.biznes-polska.pl/przetargi-ai/
- https://ofertis.pl/
- https://ofertai.pl/ (z pierwszego przeglądu)
- https://monitorurzedowy.pl/page/cennik (z pierwszego przeglądu)

Serwisy z kategorią "żywność" i dane o rynku:
- https://atlasprzetargow.pl/przetargi/kategoria/zywnosc
- https://atlasprzetargow.pl/monitoring-przetargow
- https://atlasprzetargow.pl/o-nas
- https://atlasprzetargow.pl/blog/gdzie-szukac-przetargow
- https://atlasprzetargow.pl/przetarg/2026-BZP-00458320
- https://atlasprzetargow.pl/przetarg/2026-BZP-00556069
- https://atlasprzetargow.pl/przetarg/2026-BZP-00553776
- https://atlasprzetargow.pl/przetarg/2026-BZP-00558926
- https://atlasprzetargow.pl/przetarg/2026-BZP-00547388
- https://atlasprzetargow.pl/przetarg/2026-BZP-00529680
- https://atlasprzetargow.pl/przetarg/2026-BZP-00555134
- https://atlasprzetargow.pl/baza-konkurencyjnosci/o/296138-dostawa-produktow-zywnosciowych-od-listopada-2026r-do-lutego-2027-r-dla
- https://przetarghub.pl/
- https://przetarghub.pl/branza/zywnosc/strona/36/
- https://przetargpro.pl/przetarg/dostawa-produktow-zywnosciowych-do-szkoly-podstawowej-w-chylicach-f366bee1ad9b
- https://i-przetargi.com.pl/profil/artykuly-spozywcze
- https://www.portalzp.pl/szukaj-przetargow/rg/pleu/b/spozywcza/rp/bzp
- https://www.przetargi.egospodarka.pl/Rozne-produkty-spozywcze
- https://www.jedzenie.info.pl/przetargi/index
- https://bieszczadzkizespol.szkolnastrona.pl/a,366,wyniki-przetargu-na-dostawe-zywnosci
- https://www.portalzp.pl/przetargi/dostawa-kawy-i-herbaty--12349399
- https://ted.europa.eu/pl/notice/91876-2026/pdf
- https://ted.europa.eu/pl/notice/19251-2026/pdf

Statystyki i przepisy:
- https://www.gov.pl/web/uzp/sprawozdanie-prezesa-uzp-z-funkcjonowania-systemu-zamowien-publicznych-w-2025-roku
- https://www.prawowprzetargu.pl/pl/database/sprawozdanie-prezesa-uzp-za-2025-co-z-danych-wynika-dla-zamawiajacych-i-wykonawcow/
- https://www.portalzp.pl/komunikaty-uzp/sprawozdanie-prezesa-uzp-za-2025-rok-pelny-raport-o-rynku-zamowien-publicznych-64787.html
- https://itexa.ai/artykuly/uwagi-do-projektu-sprawozdania
- https://mimira.eu/przetargi/wiki/analiza-rynku-zamowien-publicznych-poradnik
- https://www.portalzp.pl/nowosci/zamowienia-publiczne-20262027-od-jakiej-kwoty-obowiazuje-ustawa-pzp-35440.html
- https://ksiegowosc.infor.pl/obrot-gospodarczy/zamowienia-publiczne/7622366,zamowienia-podprogowe-2026-nowe-zasady-zakupow-publicznych-ponizej-170-tys-zl.html

Zapytania ofertowe i formularze (przykłady):
- https://bip.mirzec.pl/wp-content/uploads/2026/08/Zapytanie-cenowe-SP-Mirzec-2026-sig.pdf
- https://sp34.bip.edukacja.rybnik.eu/_files_/1._zapytanie_ofertowe_sp_34_2026_artykuy_spozywcze_oraz_ryby_i_mrozonki.pdf
- https://sp4.chojnow.eu/zamowienia_publiczne,m1,s1201.html
- https://www.gov.pl/web/zsckr-szczecin/zapytanie-ofertowe---dostawa-produktow-suchych-przetworow-tluszczy-oraz-artykulow-spozywczych-roznych-do-stolowki-szkolnej-w-roku-szkolnym-20262027
- https://sp59.szczecin.pl/bip/przetargi/zapytanie-ofertowe-na-dostawe-artykulow-zywnosciowych
- https://bip.medynia.schoolpage.pl/zamowienia-publiczne/
- https://szpitalparkitka.com.pl/media/konkursy/5af8e7d13d42039730ba41231b5ac0f0.1.doc

Dostęp do danych:
- https://ezamowienia.gov.pl/pl/regulamin/
- https://media.ezamowienia.gov.pl/pod/2023/02/Regulamin-korzystania-z-API-1.pdf (2023)
- https://otwarteapi.pl/en/e-zamowienia (źródło nieoficjalne)
- https://www.gov.pl/web/cyfryzacja/standardy-uslug-i-danych-dla-platformy-e-zamowienia-udostepniamy-ostatnia-trzecia-czesc
- https://www.portalzp.pl/nowosci/w-sierpniu-br.-nowe-funkcjonalnosci-na-platformie-ezamowienia-27840.html
- https://docs.ted.europa.eu/api/latest/index.html
- https://ted.europa.eu/en/simap/developers-corner-for-reusers
- https://ted.europa.eu/en/help/data-reuse
- https://op.europa.eu/en/web/ted-reusers-workshops/questions-and-answers-2025
- https://mimira.eu/przetargi/wiki/platformy-zakupowe-w-zamowieniach-publicznych
- https://www.useminerva.com/pl/blog/platforma-e-zamowienia-bzp-ted-poradnik

Zagranica:
- https://www.stotles.com/tenders/topics/restaurant-and-food-serving-tenders
- https://psip.co.uk/tenders/catering-food
- https://bidskim.com/market/catering-hospitality
- https://www.hydebids.com/sector/tendering-in-food-drink/
- https://www.tendersontime.com/food-and-beverages-tenders/
- https://jorpex.com/use-cases/catering-tenders/
- https://cumbriagrowthhub.co.uk/documents/Public-Sector-Food-and-Catering-How-To-Guide.pdf
