# Soczewka: nudne API i mikro-narzędzia dla programistów i MŚP (boring-utility-apis-and-tools)

Data badania: 2026-11-26. Zakres: API danych firmowych PL/UE (NIP, REGON, biała lista, KRS), pomocniki KSeF (podgląd XML, walidatory, konwertery, bramki API), konwertery e-faktur UE, narzędzia dokumentowe, API zrzutów ekranu, marketplace'y API (RapidAPI, Apify).

Jak czytać oznaczenia:

- **[liczba]** - twarda liczba, zawsze z linkiem do strony, przy której ją zobaczyłem.
- **[obserwacja]** - fakt bez liczby, z linkiem.
- **[wnioskowanie]** - moje rozumowanie, bez źródła. Może być błędne.
- **szacunek** - moja liczba "na oko". Nie wolno jej cytować jako faktu.

## Werdykt

**Ta soczewka jest dla Ciebie słaba. Nie znalazłem ani jednego mocnego kandydata. Zostawiam dwóch warunkowych (oba z niską pewnością), resztę odrzucam.**

Co ustaliłem na twardo:

1. **Polskie API danych firmowych to towar za grosze.** GUS udostępnia API REGON bezpłatnie [obserwacja: https://api.stat.gov.pl/Home/RegonApi]. Prywatna nakładka DataPort.pl sprzedaje 50 zapytań dziennie za 99 zł **rocznie**, a 1000 dziennie za 699 zł rocznie [liczba: https://dataport.pl/api/reference]. Inny serwis deklaruje dostęp bez klucza i bez rejestracji [obserwacja: https://skanfirmy.pl/api-gus]. Przy takich cenach nie ma tu biznesu dla nowego gracza.
2. **KSeF to prawdziwy, istniejący popyt, ale przyszedłbyś spóźniony na zatłoczoną imprezę.** Na jedno zapytanie o podgląd faktury XML dostałem 8 darmowych narzędzi. Na zapytanie o konwerter PDF do XML - 5 płatnych/freemium narzędzi i artykuł "porównanie 5 najpopularniejszych". Ceny już spadły do około 9-13 groszy za konwersję (wyliczenie własne z cennika https://ksefpdf.pl/). Bramek KSeF API dla programistów znalazłem 6.
3. **RapidAPI nie jest kanałem, który "sam sprzedaje".** Relacje pojedynczych programistów mówią o 200-300 USD albo 400-800 USD miesięcznie i o 4-12 miesiącach czekania na pierwszego płacącego klienta [liczba, samoopis na forum, niezweryfikowany: https://community.latenode.com/t/individual-developers-earning-revenue-through-rapidapi-platform/26534]. Prowizja platformy to wg źródeł wtórnych 20% albo 25% [liczba, źródła się różnią: https://www.buildmvpfast.com/alternatives/rapidapi , https://1xapi.com/blog/how-to-monetize-api-rapidapi-pricing-strategy-usage-tracking-2026].
4. **"Nudne API" potrafi zarabiać, ale nie pasywnie i nie szybko.** ScreenshotOne (API zrzutów ekranu, jeden założyciel-inżynier) doszedł do 33 tys. USD przychodu miesięcznie po 4 latach pracy, przy ponad 1000 płacących klientów [liczba: https://indiefounder.me/stories/dmytro-krasun-screenshotone/]. Traci przy tym około 9% przychodu miesięcznie na odejściach klientów [liczba: https://superframeworks.com/case-study/screenshotone]. W połowie 2025 miał 20 tys. USD, startował od 7 USD w lipcu 2022 [liczba: https://www.solounicorn.club/blog/day-32-screenshotone]. To dowód, że kategoria istnieje, i jednocześnie dowód, że to pełnoetatowa praca doświadczonego programisty, a nie projekt na 2-4 h tygodniowo.

Wspólny wzór [wnioskowanie]: w tej soczewce pieniądze są tam, gdzie trzeba być niezawodną infrastrukturą dla cudzych faktur (bramki KSeF po 299-500 zł miesięcznie za jeden NIP). To wymaga dyżurów, bezpieczeństwa i zaufania - łamie regułę pasywności i regułę budowy. Wszystko, co proste i pasywne (podgląd, walidator, generator), jest już rozdawane za darmo.

### Ograniczenia tego badania (ważne)

- **Wykonałem tylko 12 wyszukiwań zamiast planowanych 15-30.** Przy kolejnych narzędzie odmówiło: wspólny limit 200 wyszukiwań na cały przebieg (dzielony przez wszystkich równoległych badaczy) został wyczerpany. Nie obchodziłem tego limitu.
- **Cztery zaplanowane zapytania się nie wykonały:** zarobki twórców w Apify Store; przychody bankstatementconverter.com; cennik ksefimport.pl i kseftools.pl; narzędzia do powiadomień o nowych fakturach w KSeF.
- **W ogóle nie zbadałem wyszukiwaniem:** monitorów uptime/cron, backendów formularzy, API obrazków OG, kodów QR do przelewów, walidatorów JPK, API kodów pocztowych, kursów NBP, dni roboczych, IBAN. Odrzucam je niżej wyłącznie na podstawie wnioskowania i tak to oznaczam.
- **Nie mam narzędzia do wolumenów wyszukiwań.** Bramka R4 ma dwie połowy: wolumen słów kluczowych i obecność stron transakcyjnych w wynikach. Sprawdziłem tylko drugą połowę. Pierwszą musisz sprawdzić sam w Planerze słów kluczowych na swoim koncie Google Ads (30 minut, za darmo) - przy każdym kandydacie podaję listę fraz.
- **Liczby pochodzą ze streszczeń wyników wyszukiwania**, nie z bezpośredniego wejścia na strony (pobieranie stron jest w tym środowisku zablokowane). Przed jakąkolwiek decyzją kliknij link i potwierdź cenę własnymi oczami.
- Badanie można dokończyć w kolejnym przebiegu (nowa wiadomość) albo po podniesieniu limitu wyszukiwań.

## Kandydaci

Kolejność = ranking. Obaj kandydaci mają **niską pewność**, bo wolumen wyszukiwań jest niezweryfikowany.

### 1. Konwerter wyciągów bankowych dla biur rachunkowych (PDF/CSV z banku -> MT940 albo plik do programu księgowego)

Uwaga: to pogranicze mojej soczewki ("narzędzia dokumentowe"). Możliwe, że inna soczewka też to opisuje.

- **Dla kogo:** biura rachunkowe i samodzielne księgowe, które dostają od klientów wyciągi w PDF lub w nietypowym CSV i muszą je wprowadzić do programu księgowego. Płaci właściciel biura.
- **Problem:** program księgowy przyjmuje wyciąg w formacie MT940 albo w kilku konkretnych układach CSV. Klient przysyła PDF z konta, które MT940 nie daje. Księgowa przepisuje operacje ręcznie.
- **Jak często:** co miesiąc, dla każdego klienta biura [wnioskowanie]. To potrzeba powtarzalna u biur i jednorazowa/zrywowa u pojedynczych firm.
- **Cena (szacunek, do sprawdzenia testem R1):** paczka jednorazowa około 39 zł za 10 wyciągów dla użytkownika okazjonalnego oraz abonament dla biura około 99 zł miesięcznie z limitem wyciągów. Kotwice z rynku: program stacjonarny Multicomp kosztuje 410 zł netto (504,30 zł brutto) za stanowisko, licencja bezterminowa [liczba: https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html]. Wersja darmowa wyłącznie jako demo: pierwsze 10 operacji z wyciągu, nigdy cały wyciąg (reguła R3). Tak samo robi konkurent [obserwacja: https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940].
- **Kanał dystrybucji:** istniejące wyszukiwania w Google. Strony generowane programowo dla kombinacji bank x format x program księgowy (np. "wyciąg ING PDF do MT940", "Revolut do Comarch Optima") - do tego masz gotowy generator. Plus test Google Ads na frazach kupujących. Kanał nie wymaga Twojej widowni. Czy wolumen jest wystarczający - **niezweryfikowane**.
- **Konkurencja i ceny:**
  - Multicomp, program na Windows: 410 zł netto za stanowisko, demo do 5 operacji [liczba: https://multicomp.pasaz24.pl/product/Konwerter-wyciagow-bankowych-do-formatu-MT940-li-s13722]. Słabość: instalacja na komputerze, licencja na każde stanowisko osobno.
  - Pan od IT, konwerter online PDF -> MT940: 4 banki (mBank, PKO BP, ING, Pekao), 10 operacji za darmo bez konta [obserwacja: https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940]. Ceny powyżej limitu nie widziałem. Słabość: tylko 4 banki.
  - Taxshield: darmowy konwerter mBank CSV -> MT940 [obserwacja: https://taxshield.pl/konwerter/mbank-csv-mt940.html]. Słabość: jeden bank, tylko CSV.
  - converts.ninja: darmowy konwerter MT940, dodaje kolejne banki [obserwacja: https://converts.ninja/].
  - mt940.pl [obserwacja: https://mt940.pl/jak-dziala-mt940/] - oferty nie zdążyłem sprawdzić.
  - Serwisy zagraniczne po angielsku, np. https://bank-statement-conversion.com/ [obserwacja]. Słabość: nie są dopasowane do polskich banków i programów.
- **Dowody popytu z linkami:**
  - Ktoś sprzedaje to w Polsce za 410 zł netto za stanowisko, czyli ktoś to kupuje [liczba: https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html].
  - Na jedno zapytanie po polsku wyszło co najmniej 5 stron z narzędziem (nie poradników): Multicomp, Pan od IT, Taxshield, converts.ninja, mt940.pl [obserwacja, linki wyżej].
  - Angielski odpowiednik (bankstatementconverter.com) jest znany jako dochodowy jednoosobowy biznes. **Aktualnych liczb nie zdołałem zweryfikować w tym przebiegu - traktuj to jako niepotwierdzone.**
  - Wolumen wyszukiwań: **brak danych.**
- **Dlaczego nie ChatGPT** [wnioskowanie]: (1) MT940 to sztywny format, program księgowy odrzuca plik z jednym błędem; (2) przy wyciągu na 200-300 operacji czat potrafi zgubić lub zmienić wiersz, a księgowa nie sprawdzi tego ręcznie - parser z automatyczną kontrolą "saldo początkowe + operacje = saldo końcowe" daje dowód poprawności; (3) praca hurtowa: 30 klientów x 12 miesięcy; (4) poufność danych klientów. Uczciwie: dla jednego krótkiego wyciągu do Excela darmowy ChatGPT wystarczy. Dlatego produkt nie może być "PDF do Excela", tylko "zweryfikowany MT940 hurtowo".
- **Ryzyko:**
  - Największe: wolumen wyszukiwań może być za mały. Wiele kont firmowych daje MT940 w bankowości, więc potrzeba dotyczy tylko części kont [wnioskowanie].
  - Utrzymanie: bank zmienia układ PDF i parser przestaje działać. Każdy "mój bank nie jest obsługiwany" to prośba o pracę. Multicomp wlicza w cenę przetestowanie konwersji na pliku przesłanym przez klienta [obserwacja: https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html], co sugeruje, że formaty są kapryśne. To zagraża limitowi 2-4 h tygodniowo.
  - Zaufanie i RODO: wyciągi zawierają dane osobowe. Potrzebna umowa powierzenia, przetwarzanie bez przechowywania plików, najlepiej bez wysyłania treści do zewnętrznego modelu AI.
  - Nie wolno iść w "podłącz swoje konto bankowe" - to wymagałoby licencji płatniczej. Tylko konwersja plików wgranych przez użytkownika.
  - Sufit przychodu jest prawdopodobnie niski: kilka tysięcy zł miesięcznie (szacunek).
- **Ocena R4:** połowa "strony transakcyjne w wynikach" - **zaliczona** (co najmniej 5 narzędzi, w tym płatne). Połowa "wolumen" - **niezweryfikowana**. Do sprawdzenia w Planerze słów kluczowych (Polska): "konwerter mt940", "pdf do mt940", "mt940 konwerter online", "konwerter wyciągów bankowych", "wyciąg bankowy pdf do excel", "csv do mt940", "mbank mt940", "revolut mt940". Jeśli żadna fraza nie ma 1000 miesięcznie i mniej niż 3 mają po 100 - **stop, nie budować**.
- **Test R1 (jeśli R4 przejdzie):** jedna strona z ofertą + płatność Stripe za paczkę z gwarancją zwrotu + 100 EUR w Google Ads. Twój własny próg: co najmniej 5 zapisów lub płatności na 50 kliknięć.
- **Zakres v1 (szacunek):** parsery dla 5-6 największych banków, wyjście MT940 i CSV, kontrola sald, Stripe, strony SEO. Około 10-15 dni roboczych budowy z agentem. Potrzebne prawdziwe przykładowe wyciągi z każdego banku.

### 2. Most "KSeF -> Arkusze Google / e-mail / n8n, Make, Zapier" (automatyczne pobieranie faktur kosztowych)

- **Dla kogo:** małe firmy, które prowadzą koszty i projekty w Arkuszach Google, Airtable lub Notion, oraz agencje i freelancerzy automatyzacji, którzy budują przepływy dla klientów. Uczciwie: także Twoi klienci konsultingowi.
- **Problem:** platformy automatyzacji nie mają natywnego konektora KSeF, a samodzielne połączenie wymaga wieloetapowego logowania, szyfrowania i obróbki XML [obserwacja, deklaracje sprzedawców: https://ksefimport.pl/blog/ksef-make-com-automatyzacja-faktur , https://kseftools.pl/blog/ksef-zapier].
- **Jak często:** stale, codziennie - faktury kosztowe wpadają cały czas [wnioskowanie]. Potrzeba powtarzalna, więc abonament.
- **Cena (szacunek, do sprawdzenia testem R1):** 39-79 zł miesięcznie za jeden NIP. Kotwice: bramka dla programistów 299 zł netto miesięcznie za firmę [liczba: https://www.ksefapi.dev/]; pakiet API od 10 zł netto [liczba: https://ksefservice.pl/pricing.php]; pełny program do faktur od 29 zł miesięcznie [liczba, źródło wtórne: https://notyfikacje.pl/konwerter-pdf-do-ksef-porownanie-5-najpopularniejszych-narzedzi-2026/]. Cennika bezpośrednich konkurentów (ksefimport.pl, kseftools.pl) **nie zdołałem sprawdzić**.
- **Kanał dystrybucji:** (a) długi ogon w Google: "KSeF Google Sheets", "KSeF n8n", "KSeF Make", "KSeF Zapier", "KSeF Airtable"; (b) katalogi platform: węzeł społecznościowy n8n, aplikacja w Make/Zapier, dodatek w Google Workspace Marketplace - **nie zweryfikowałem, czy te katalogi realnie przysyłają kupujących w Polsce**; (c) Twoi obecni klienci - ciepły kanał, ale to już nie jest pasywne.
- **Konkurencja i ceny:**
  - KSeF Import: pobiera faktury do Arkuszy Google, stamtąd Zapier/Make/n8n; integracje z Airtable i Notion; sam podaje ograniczenie - stałe okno pobierania, starszych faktur nie pobierze [obserwacja: https://ksefimport.pl/mozliwosci/integracje]. Cena: nie sprawdzona.
  - KsefTools: ten sam model mostu przez Arkusze [obserwacja: https://kseftools.pl/blog/ksef-zapier]. Cena: nie sprawdzona.
  - KSeF Canvas: gotowe konektory n8n, Zapier i Make na GitHubie, nastawione na wystawianie faktur [obserwacja: https://github.com/mdabrowski25/ksefcanvas-integrations].
  - Darmowy szablon przepływu w n8n do pobierania faktur z KSeF [obserwacja: https://ksefimport.pl/blog/ksef-n8n-automatyzacja-open-source - wskazuje szablon n8n nr 13925]. Słabość: wymaga umiejętności technicznych.
  - Bramki KSeF API dla programistów: 299 zł netto/mies. za firmę [liczba: https://www.ksefapi.dev/], 500 zł/mies. za NIP [liczba: https://ksefapi.pl/en/ksef-cennik-oferta/], 299-799 USD/mies. [liczba: https://ksefapi.com/].
  - Każdy program do faktur z KSeF oraz darmowa aplikacja Ministerstwa Finansów - pokazują faktury kosztowe bez dopłaty [wnioskowanie].
- **Dowody popytu z linkami:**
  - Co najmniej trzy produkty sprzedają dokładnie tę usługę (KSeF Import, KsefTools, KSeF Canvas) [obserwacja, linki wyżej].
  - Co najmniej trzy agencje publikują ofertę automatyzacji KSeF [obserwacja: https://octopus-lab.pl/projects/automatyzacja-raportu-finansowego-ksef-n8n , https://www.automationminds.net/narzedzia/ksef , https://www.nocodework.io/post/ksef-automatyzacja-obiegu-faktur].
  - Obowiązek KSeF objął największe firmy od 1 lutego 2026, pozostałe od 1 kwietnia 2026, a najmniejsze (do 10 tys. zł sprzedaży na fakturach miesięcznie) obejmie od 1 stycznia 2027 [liczba: https://www.ifirma.pl/blog/ksef-2027-co-sie-zmieni-kogo-dotyczyc-bedzie-ostatni-z-etapow-wdrozenia-ksef/]. Pamiętaj o własnej lekcji: termin ustawowy to nie popyt.
  - Wolumen wyszukiwań: **brak danych.** Mój szacunek: frazy typu "KSeF n8n" są niszowe i mogą nie przejść progu R4.
- **Dlaczego nie ChatGPT:** czat nie zaloguje się do KSeF i nie będzie sam co godzinę sprawdzał nowych faktur. To automatyzacja działająca bez nadzoru - twardy wyjątek od reguły substytucji [wnioskowanie]. Ale darmowym zamiennikiem nie jest tu ChatGPT, tylko program do faktur, który klient już ma.
- **Ryzyko:**
  - Bezpieczeństwo: trzeba przechowywać tokeny lub certyfikaty KSeF klientów, czyli klucz do wszystkich ich faktur. Wyciek z systemu napisanego przez agenta AI i prowadzonego przez osobę nietechniczną to realne zagrożenie dla klientów i dla Twojej spółki. To najpoważniejszy minus.
  - Pasywność: konfiguracja uprawnień w KSeF jest trudna dla laików, a każda zmiana lub awaria API po stronie ministerstwa to zgłoszenia. Limit 2-4 h tygodniowo jest zagrożony [wnioskowanie].
  - Spóźnienie: dwóch bezpośrednich konkurentów ma kilkumiesięczną przewagę i własne treści w Google.
  - Mała nisza: "firma, która chce faktur w Arkuszu, a nie w programie do faktur" to wąska grupa [wnioskowanie].
  - Limity API: konkurent podaje około 60 faktur na godzinę na NIP [liczba, deklaracja sprzedawcy: https://ksefimport.pl/mozliwosci/integracje].
- **Ocena R4:** "strony transakcyjne" - **zaliczone słabo** (3 produkty). "Wolumen" - **niezweryfikowany, podejrzewam, że za niski** (szacunek). Do sprawdzenia w Planerze: "pobieranie faktur z KSeF", "KSeF powiadomienia e-mail", "KSeF Google Sheets", "KSeF eksport faktur do Excela", "KSeF n8n", "KSeF Make", "KSeF Zapier".
- **Moja uczciwa rada** [wnioskowanie]: to wygląda lepiej jako dodatek do Twojego konsultingu albo do PLAR Orders (jedno wdrożenie u klienta, płatne jak usługa) niż jako samodzielny pasywny produkt.

## Odrzucone pomysly i dlaczego

1. **Podgląd/wizualizator faktury KSeF (XML -> PDF).** Co najmniej 8 darmowych narzędzi działających w przeglądarce (część wprost deklaruje brak rejestracji i brak limitu): https://wizualizacjaksef.pl/ , https://ksefeusz.pl/ , https://ksefusz.pl/ , https://systemfaktur.pl/ , https://enology.pl/ksef/podglad-faktury/ , https://ksef-pl.com/en , https://www.szlachetnebiuro.pl/kalkulatory/ksef-xml-na-pdf-excel/ , https://fa3.site/ [obserwacja]. Darmowe pokrywa 100% zadania - dokładnie błąd disclosekit.
2. **Walidator XML FA(3).** Darmowe walidatory już są [obserwacja: https://systemfaktur.pl/blog/walidator-ksef-xml-fa3 , https://fa3.site/]. Nie widać, kto miałby płacić.
3. **Konwerter PDF -> XML KSeF.** Popyt jest (5 narzędzi + artykuł porównawczy), ale: 300 konwersji kosztuje 39,99 zł, 1000 konwersji 89,99 zł netto [liczba: https://ksefpdf.pl/], czyli 9-13 groszy za sztukę (wyliczenie własne). Konkurent daje 3 konwersje dziennie za darmo [liczba: https://fakturaflow.pl/konwerter-pdf-xml] - to pokrywa całą potrzebę mikrofirmy. Fala stycznia 2027 to najmniejsze firmy, czyli najmniej faktur i najmniejsza skłonność do płacenia [wnioskowanie]. Nowa domena nie zdąży się wypozycjonować przed styczniem. Najbliżej przeżycia ze wszystkich pomysłów KSeF, ale ekonomia reklam się nie spina.
4. **Excel/CSV -> KSeF (wysyłka hurtowa).** Zajęte: skoroszyt iForm za 249 zł netto rocznie [liczba: https://www.iform.pl/content/35-ksef], import w Fakturowni [obserwacja: https://pomoc.fakturownia.pl/import-faktur-z-pliku-excel-xls-csv-najczestsze-pytania-i-problemy], KSeF-link [obserwacja: https://www.tgsoft.pl/Blog.aspx?id=299], KSeFGPT [obserwacja: https://ksefgpt.pl/pl/wiedza/poradnik/masowa-wysylka-faktur-do-ksef-z-excela], paczki do 150 faktur w SystemFaktur [liczba: https://systemfaktur.pl/]. Ciekawostka: https://excel-do-ksef.pl/ to strona w statusie "walidacja zainteresowania" - ktoś robi tu Twój test R1 [obserwacja].
5. **Konwerter eksportów ze starych programów (Symfonia, Subiekt) do KSeF.** Istnieje: 30 zł miesięcznie do 20 faktur [liczba: https://konwerterksef.pl/]. Wymaga znajomości starych programów stacjonarnych i dużo wsparcia [wnioskowanie].
6. **Bramka KSeF API dla programistów.** Sześciu graczy: https://www.ksefapi.dev/ (299 zł netto/mies.), https://ksefapi.pl/en/ksef-cennik-oferta/ (500 zł/mies. za NIP), https://ksefapi.com/ (299-799 USD/mies.), https://ksefservice.pl/pricing.php (od 10 zł netto), https://nip24.pl/en/ksef-rest-api-oferta-cennik/ (500 wywołań za 150 zł, obecnie bezpłatnie dla klientów), https://ksef.io/ [liczby z linków]. Tu są realne pieniądze, ale to infrastruktura krytyczna podatkowo: dyżury, bezpieczeństwo, umowy. Łamie regułę pasywności i regułę budowy.
7. **API danych firm (NIP, REGON, KRS, CEIDG, VAT).** Oficjalne źródła są darmowe, nakładki kosztują 99-699 zł rocznie [liczba: https://dataport.pl/api/reference] albo nic [obserwacja: https://skanfirmy.pl/api-gus , https://otwarteapi.pl/en/gus-regon]. Brak marży.
8. **Hurtowa weryfikacja białej listy VAT / VIES, monitoring kontrahentów.** Rynek z lat 2019-2020, co najmniej 9 dostawców w wynikach: https://nip-excel.pl/ , https://www.listapodatnikow.pl/ , https://www.iform.pl/blog/wpis/weryfikacja-nip-w-excelu-biala-lista-vies-i-sprawdzanie-kontrahenta?page_type=post , https://comsoft.radom.pl/biala-lista-vat/ , http://www.1-click.pl/pl/mse/biala-lista-w-excelu/- , https://nip.waw.pl/ , https://asbgroup.eu/pl/zbiorczy-weryfikator-bialej-listy-white-list-validator/ , https://mercomp.pl/produkty/elektroniczny-wykaz-podatnikow-vat/ , http://vatnumber.info/masowe-sprawdzanie-podatnika-vat-biala-lista/ [obserwacja]. Ministerstwo daje darmowe API i plik do masowej weryfikacji. Cen nie udało się ustalić.
9. **Konwerter e-faktur UE (PDF -> Factur-X / ZUGFeRD / XRechnung).** Istnieje model "za sztukę": 1,49 EUR za fakturę, 10 za 7,95 EUR, 50 za 24,95 EUR [liczba: https://einvoicewiz.com/]. Ale na Apify to samo kosztuje 10-50 USD za 1000 dokumentów [liczba: https://apify.com/kamerozkan/zugferd-to-xrechnung-converter/api , https://apify.com/bahs/e-invoice-reader-converter , https://apify.com/dach_automation_tools/xrechnung-zugferd-to-pdf-datev-bridge]. Nie masz przewagi językowej (niemiecki, francuski), popytu nie zweryfikowałem, a poprawny plik PDF/A-3 z walidacją wymaga cięższych narzędzi niż Cloudflare Workers [wnioskowanie]. Odrzucone jako niezweryfikowane i poza Twoją przewagą; inna soczewka może to ocenić lepiej.
10. **API zrzutów ekranu / HTML -> PDF / obrazki OG.** Kategoria zarabia (ScreenshotOne: 33 tys. USD miesięcznie po 4 latach [liczba: https://indiefounder.me/stories/dmytro-krasun-screenshotone/]), ale wymaga lat pracy inżyniera, ciężkiej infrastruktury przeglądarek, wsparcia technicznego i marketingu treści po angielsku; odpływ 9% przychodu miesięcznie [liczba: https://superframeworks.com/case-study/screenshotone]. Łamie regułę pasywności, budowy i dystrybucji.
11. **Sprzedaż dowolnego API przez RapidAPI jako kanał.** Relacje: 200-800 USD miesięcznie, pierwszy klient po 4-12 miesiącach, prowizja 20-25% [liczby, samoopisy i źródła wtórne: https://community.latenode.com/t/individual-developers-earning-revenue-through-rapidapi-platform/26534 , https://community.latenode.com/t/individual-developers-earning-revenue-through-rapidapi-marketplace/26533 , https://www.buildmvpfast.com/alternatives/rapidapi]. Marketplace nie zastępuje popytu. Apify Store jako alternatywny kanał - **nie zdołałem sprawdzić zarobków twórców**.
12. **Monitory uptime i cron, backendy formularzy.** Nie badane wyszukiwaniem w tym przebiegu. Odrzucam z wnioskowania: rynki nasycone darmowymi planami dużych graczy, a monitor, który sam ma awarię, jest bezwartościowy - wymaga niezawodności 24/7, czyli nie jest pasywny.
13. **Kody QR do przelewów, kursy NBP, dni robocze i święta, kody pocztowe, IBAN/bank.** Nie badane wyszukiwaniem. Odrzucam z wnioskowania: dane publiczne i darmowe, generatory rozdawane za darmo, brak kupującego.
14. **Walidatory i przeglądarki JPK.** Nie badane wyszukiwaniem. Odrzucam z wnioskowania: funkcja wbudowana w programy księgowe i w darmowe narzędzia ministerstwa. Wymagałoby osobnego sprawdzenia, zanim uznamy to za pewne.
15. **Własny punkt dostępowy PEPPOL.** Odrzucam z wnioskowania: wymaga certyfikacji i roli operatora infrastruktury - poza regułą budowy.

## Zrodla

Wszystkie poniższe adresy pojawiły się w wynikach moich 12 wyszukiwań z 2026-11-26. Treść znam ze streszczeń wyników, nie z bezpośredniego otwarcia stron.

KSeF - podgląd, walidacja:
- https://wizualizacjaksef.pl/
- https://ksefeusz.pl/
- https://ksefusz.pl/
- https://systemfaktur.pl/
- https://systemfaktur.pl/blog/walidator-ksef-xml-fa3
- https://enology.pl/ksef/podglad-faktury/
- https://ksef-pl.com/en
- https://www.szlachetnebiuro.pl/kalkulatory/ksef-xml-na-pdf-excel/
- https://fa3.site/

KSeF - konwertery PDF/Excel:
- https://fakturaflow.pl/konwerter-pdf-xml
- https://fakturaflow.pl/
- https://ksefgpt.pl/pl/wiedza/poradnik/darmowy-konwerter-pdf-do-xml-ksef
- https://ksefgpt.pl/en/konwerter-pdf
- https://ksefpdf.pl/
- https://konwerterksef.pl/
- https://notyfikacje.pl/konwerter-pdf-do-ksef-porownanie-5-najpopularniejszych-narzedzi-2026/
- https://pomoc.fakturownia.pl/import-faktur-z-pliku-excel-xls-csv-najczestsze-pytania-i-problemy
- https://www.iform.pl/content/35-ksef
- https://www.iform.pl/3017-krajowy-system-e-faktur-ksef
- https://www.tgsoft.pl/Blog.aspx?id=299
- https://ksefgpt.pl/pl/wiedza/poradnik/masowa-wysylka-faktur-do-ksef-z-excela
- https://excel-do-ksef.pl/

KSeF - bramki API i automatyzacja:
- https://ksefservice.pl/pricing.php
- https://ksefapi.com/
- https://nip24.pl/en/ksef-rest-api-oferta-cennik/
- https://www.ksefapi.dev/
- https://ksefapi.pl/en/ksef-cennik-oferta/
- https://ksef.io/
- https://poradnik-podatkowy.pl/ksef-integracja-systemy-erp
- https://online-ksiegowosc.pl/ksef-api-integracja-systemy
- https://fakturyksef.com/blog/ksef-api/
- https://github.com/mdabrowski25/ksefcanvas-integrations
- https://ksefimport.pl/mozliwosci/integracje
- https://ksefimport.pl/blog/ksef-n8n-automatyzacja-open-source
- https://ksefimport.pl/blog/ksef-make-com-automatyzacja-faktur
- https://kseftools.pl/blog/ksef-zapier
- https://octopus-lab.pl/projects/automatyzacja-raportu-finansowego-ksef-n8n
- https://www.automationminds.net/narzedzia/ksef
- https://www.nocodework.io/post/ksef-automatyzacja-obiegu-faktur
- https://narzedziadlafirm.pl/artykul/ksef-od-lutego-2026-jak-automatyzacja-zmienia-obieg-faktur-w-polskiej-firmie

KSeF - harmonogram:
- https://www.ifirma.pl/blog/ksef-2027-co-sie-zmieni-kogo-dotyczyc-bedzie-ostatni-z-etapow-wdrozenia-ksef/
- https://www.podatki.egospodarka.pl/199329,Nowy-harmonogram-KSeF-Kary-od-2028-a-kontrole-fiskusa-juz-w-2027,1,68,1.html
- https://jpk.info.pl/faktury/e-faktura-ustrukturyzowana-ksef/harmonogram/

API danych firm:
- https://api.stat.gov.pl/Home/RegonApi
- https://dataport.pl/api/reference
- https://dataport.pl/api
- https://skanfirmy.pl/api-gus
- https://otwarteapi.pl/en/gus-regon
- https://brokerdanych.pl/blog/gus-api-bir-jak-pobierac-dane-firm-z-rejestru-regon

Biała lista VAT / weryfikacja hurtowa:
- https://grantthornton.pl/publikacja/biala-lista-vat-wyzwania-masowej-automatycznej-weryfikacji-kontrahentow/ (stary artykuł, około 6 lat)
- https://nip-excel.pl/
- https://www.listapodatnikow.pl/
- https://www.iform.pl/blog/wpis/weryfikacja-nip-w-excelu-biala-lista-vies-i-sprawdzanie-kontrahenta?page_type=post
- https://comsoft.radom.pl/biala-lista-vat/
- http://www.1-click.pl/pl/mse/biala-lista-w-excelu/-
- https://nip.waw.pl/
- https://asbgroup.eu/pl/zbiorczy-weryfikator-bialej-listy-white-list-validator/
- https://mercomp.pl/produkty/elektroniczny-wykaz-podatnikow-vat/
- http://vatnumber.info/masowe-sprawdzanie-podatnika-vat-biala-lista/

Wyciągi bankowe:
- https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html
- https://multicomp.pasaz24.pl/product/Konwerter-wyciagow-bankowych-do-formatu-MT940-li-s13722
- https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940
- https://taxshield.pl/konwerter/mbank-csv-mt940.html
- https://converts.ninja/
- https://mt940.pl/jak-dziala-mt940/
- https://bank-statement-conversion.com/

E-faktury UE:
- https://einvoicewiz.com/
- https://apify.com/dach_automation_tools/xrechnung-zugferd-to-pdf-datev-bridge
- https://apify.com/bahs/e-invoice-reader-converter
- https://apify.com/kamerozkan/zugferd-to-xrechnung-converter/api

Marketplace'y API i API zrzutów ekranu:
- https://www.buildmvpfast.com/alternatives/rapidapi
- https://1xapi.com/blog/how-to-monetize-api-rapidapi-pricing-strategy-usage-tracking-2026
- https://checkthat.ai/brands/rapidapi
- https://community.latenode.com/t/individual-developers-earning-revenue-through-rapidapi-platform/26534
- https://community.latenode.com/t/individual-developers-earning-revenue-through-rapidapi-marketplace/26533
- https://indiefounder.me/stories/dmytro-krasun-screenshotone/
- https://superframeworks.com/case-study/screenshotone
- https://www.solounicorn.club/blog/day-32-screenshotone
- https://www.indiehackers.com/post/tech/hitting-25k-mrr-by-making-his-goals-less-ambitious-jQRZDnzwm8DFAaS4Xrq0
