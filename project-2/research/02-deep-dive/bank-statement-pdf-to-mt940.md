# Deep-dive: Konwerter wyciągów bankowych PDF -> MT940 / import do programu księgowego dla biur rachunkowych

Data badania: 2026-11-26. Slug: `bank-statement-pdf-to-mt940`.

**Jak czytać ten dokument**

- **[zweryfikowane]** - fakt lub liczba, którą widziałem w wynikach wyszukiwania, z linkiem.
- **[częściowo]** - dowód pośredni (źródło wtórne, materiał sprzedawcy, stara strona, sprzeczne streszczenia).
- **[niezweryfikowane]** - moje rozumowanie albo brak dowodu. Traktuj jak hipotezę.
- **szacunek** - moja liczba "na oko". Nie jest dowodem i nie wolno jej cytować jako faktu.

**Ograniczenia badania (ważne)**

- Wykorzystałem wszystkie 28 z 28 dozwolonych wyszukiwań. Niczego nie obchodziłem.
- Stron nie otwierałem bezpośrednio (sieć w tym środowisku to blokuje). Wszystkie liczby pochodzą ze streszczeń wyników wyszukiwania. Słowo "zweryfikowane" znaczy więc "widziałem liczbę przy tym adresie w wynikach", a nie "kliknąłem i sprawdziłem cennik własnymi oczami". Kluczowe ceny potwierdź sam przed decyzją.
- Nie mam narzędzia do wolumenów wyszukiwań. W całym dokumencie nie ma ani jednej liczby "ile osób tego szuka". Ilościowa część reguły R4 jest **niezweryfikowana** i musisz ją sprawdzić sam w Planerze słów kluczowych (lista fraz na końcu).
- Żadnego konwertera nie testowałem na prawdziwym wyciągu. Nie wiem, który działa dobrze.
- Pamięć użytkownika była pusta - żaden fakt w tym dokumencie nie pochodzi z pamięci.

## Werdykt

**słaby.** Nie martwy, ale nie wybierałbym go jako projektu, w który wkładasz tygodnie życia.

Powody, od najważniejszego:

1. **Wzorzec, na którym opierał się ten pomysł, właśnie się psuje.** Założyciel bankstatementconverter.com (ten "jednoosobowy biznes za 16-40 tys. USD miesięcznie") opublikował 28 sierpnia 2026 wpis pod tytułem "My business is dying": przychód spadł o 24% od lutego 2026, przychód abonamentowy o 12%. Jako przyczyny sam podaje: ludzie robią konwersję w darmowych czatach AI oraz zalew konkurentów zbudowanych przez AI [zweryfikowane - wpis własny założyciela: https://bankstatementconverter.com/blog/posts/2026-08-28-business-is-dying/ ; dyskusja: https://news.ycombinator.com/item?id=49474776]. To jest dokładnie Twoja reguła substytucji, potwierdzona przez lidera kategorii.
2. **Naśladowcy zarabiają grosze, także ci "krajowi".** Zweryfikowane przychody klonów na TrustMRR za ostatnie 30 dni: 31, 57, 69, 134, 433 USD. Najlepszy klon wyspecjalizowany w jednym kraju (Australia) ma 746 USD [zweryfikowane - linki w pytaniu 5]. Polska wersja pod MT940 to węższa nisza na biedniejszym rynku.
3. **Duzi gracze już mają tę funkcję w środku programu.** Comarch ERP Optima od wersji 2025.1 sama czyta wyciągi z PDF, skanów i zdjęć [zweryfikowane: https://pomoc.comarch.pl/optima/pl/2026/dokumentacja/czy-za-pomoca-uslugi-comarch-ocr-mozna-zaczytywac-wyciagi-bankowe/]. SaldeoSMART czyta wyciągi PDF w pakietach dla biur [zweryfikowane: https://www.saldeosmart.pl/wyciagi-bankowe]. Scanye pobiera surowe dane prosto z banku i oddaje MT940 [zweryfikowane: https://help.scanye.pl/pl/articles/10436996-jak-pobierac-wyciagi-bankowe-na-zadanie]. Zostaje Ci resztka rynku: użytkownicy Symfonii, Rewizora, RAKS-a bez tych dodatków.
4. **W tej resztce jest już co najmniej 6-8 sprzedawców i bardzo niska podłoga cenowa.** ClearVault: 1 USD za 10 stron. Comarch: około 0,39-0,52 zł za stronę. emSzmal: 98 zł netto jednorazowo. Szczegóły w pytaniu 1.
5. **Popyt ilościowy jest niezweryfikowany, a ślady jakościowe są słabe.** Dwa wyszukiwania nie znalazły ani jednego wątku na forum, w którym księgowa prosi o takie narzędzie, ani jednego artykułu porównawczego "najlepszy konwerter wyciągów".
6. **To nie będzie pasywne.** Każdy bank ma własny układ PDF, każdy program księgowy własną odmianę MT940 i własne kodowanie znaków. Błąd w pliku to błąd w księgach klienta, a księgowe pracują pod terminy.

**Uwaga o "sygnale zbieżności".** To, że dwie soczewki z pierwszego przeglądu wskazały ten sam pomysł, nie jest podwójnym dowodem. Obie patrzyły na te same wyniki wyszukiwania i tę samą historię bankstatementconverter.com. To jeden dowód policzony dwa razy [niezweryfikowane - moje rozumowanie].

**Co musiałoby się okazać prawdą, żeby werdykt wzrósł do "warunkowy":** (a) Planer słów kluczowych pokazuje wolumen spełniający R4, (b) ręczny test konkurentów pokazuje, że żaden nie robi dobrze PDF -> MT940 dla Symfonii/Rewizora, (c) płatny test z sekcji R1 daje co najmniej 5 płatności. Wszystkie trzy naraz. Samo (a) nie wystarczy.

## Odpowiedzi na pytania zabojcze

### 1. Ceny i darmowe poziomy polskich konwerterów. Czy któryś jest darmowy I dobry?

**Krótka odpowiedź:** nie znalazłem narzędzia, które jest jednocześnie w pełni darmowe i sprawdzone dla PDF -> MT940. Ale podłoga cenowa jest bardzo niska, a darmowe zamienniki dla "PDF -> Excel" istnieją. Status całości: **częściowo** (jakości żadnego narzędzia nie testowałem; płatnej ceny Pan od IT nie znalazłem).

| Narzędzie | Co robi | Cena / darmowy poziom | Status |
|---|---|---|---|
| Pan od IT (panodit.pl) | PDF -> MT940 / STA online; mBank, PKO BP, ING, Pekao; kontrola sald; także JPK_WB -> MT940 | 10 operacji za darmo, bez konta. **Ceny powyżej limitu nie znalazłem w dwóch wyszukiwaniach.** | częściowo - https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940 , https://panodit.pl/narzedzia/jpk-wb-do-mt940 |
| ClearVault (clearvaultapp.com) | PDF/CSV/MT940/OFX/Excel na wejściu; MT940, CAMT.053, CSV, Excel i inne na wyjściu; polskie strony "bank x program" | **1,00 USD za kredyt = 10 stron**, wszystkie formaty w cenie; "księgowość online" od 4,99 USD/mies.; 3 miesiące próbne. Operator strony nieznany. | częściowo - https://clearvaultapp.com/ , https://clearvaultapp.com/pl/pdf-wyciag-bankowy-do-mt940 |
| converts.ninja | **CSV** -> MT940 (mBank, PKO BP, Santander). Nie obsługuje PDF. | Darmowy | zweryfikowane - https://converts.ninja/ , https://converts.ninja/mbank-mt940 |
| Taxshield | mBank **CSV** -> MT940 | Darmowy (z pierwszego przeglądu, nie sprawdzałem ponownie) | częściowo - https://taxshield.pl/konwerter/mbank-csv-mt940.html |
| mt940.eu (Hologramy) | CSV -> MT940 | Ceny nie znalazłem | częściowo - https://mt940.eu/ |
| mt940.pl | Usługa abonamentowa z konwersją PDF -> MT940 w cenie | 30 zł/mies. za aktywnego klienta, 50 zł jednorazowej aktywacji, **minimalna opłata 210 zł/mies.** Strona ma około 870 dni - ceny mogły się zmienić. | częściowo (stare) - https://mt940.pl/cennik/ |
| Multicomp (program na Windows) | Konwerter formatów bankowych do MT940, także z wydruków PDF | 410 zł netto (504,30 zł brutto), licencja wieczysta, jedno stanowisko; format PDF/HTML wybranego banku z pakietu "wyciągi wydruki" 767 zł netto; pakiet "wyciągi krajowe" 1790 zł netto; aktualizacje +30% rocznie; demo do 5 operacji. Streszczenia różnią się, czy 767 zł to cena pakietu czy jednego formatu. | zweryfikowane (cena bazowa) - https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html , https://multicomp.pasaz24.pl/product/Konwerter-wyciagow-bankowych-do-formatu-MT940-li-s13722 |
| Lido Konwerter (konwerter.com.pl) | Program z modułem "wyciągi bankowe" i długą listą formatów | Ceny nie znalazłem | częściowo - https://www.konwerter.com.pl/pliki/Konwerter_Lido_spis_formatow_modulu_wyciagi_bankowe.pdf |
| emSzmal 3 PRO | Pobiera historię **prosto z bankowości internetowej** (bez plików) i wkłada do Optimy, nexo, GT, WF-FaKir; czyta też CSV, XML, MT940, JPK_WB. Odczytu PDF nie znalazłem. | **98,15 zł netto (106 zł brutto), licencja bezterminowa**, 6 miesięcy aktualizacji; dodatek "Biznes" 65,74 zł netto. Data cennika nieznana. | zweryfikowane - https://www.emszmal.pl/index.php?zobacz=cennik , https://emszmal.pl/index.php?zobacz=import_wyciagow_bankowych |
| Flobo | Wyciągi w MT940 i PDF w abonamencie | 25 zł/mies. (2 rachunki), 65 zł/mies. (4), 195 zł/mies. (8). Nie wiem, czy konwersja PDF jest w tej cenie. | częściowo - https://flobo.io/wyciagi-bankowe/ |
| StatementExtract | PDF -> MT940 (zagraniczny) | Darmowo 1 PDF dziennie, maks. 5 stron | częściowo - https://statementextract.com/convert/pdf-to-mt940/ |
| bank-statement-conversion.com | PDF -> MT940 (banki zagraniczne) | 0,70 USD za stronę; 9,99 USD/mies. za 50 stron | zweryfikowane - https://bank-statement-conversion.com/en/pdf-to-mt940 |
| bankstatementconverte.com/pl | PDF -> Excel/CSV, polska wersja strony, "zasilany przez AI" | Deklaruje: **darmowy, bez limitu stron, bez rejestracji**. Polskich banków ani MT940 nie wymienia. | częściowo - https://bankstatementconverte.com/pl/ |
| ScanToExcel | Darmowy OCR do Excela, w tym wyciągi | Darmowy | częściowo - https://www.scantoexcel.com/pl |

Wnioski:

- **Darmowy i dobry dla PDF -> MT940: nie znalazłem** [częściowo]. Pan od IT daje za darmo tylko 10 operacji, czyli kawałek wyciągu. To zgodne z Twoją regułą R3 - on też trzyma darmowy poziom jako demo.
- **Darmowe PDF -> Excel/CSV istnieją** (dwa wyżej) i darmowe CSV -> MT940 istnieją. Jakości na polskich wyciągach nie znam [niezweryfikowane].
- **Podłoga cenowa:** ClearVault 1 USD za 10 stron; Comarch OCR około 0,39-0,52 zł za stronę (patrz pytanie 2); emSzmal 98 zł raz na zawsze. Nie sprzedasz tego drożej niż mniej więcej 0,40-0,50 zł za stronę [niezweryfikowane - wniosek z kotwic].
- **Zrób sam w 30 minut:** wejdź na panodit.pl i clearvaultapp.com z własnym wyciągiem firmowym PLAR. Sprawdź cenę po limicie i czy plik wczytuje się do programu Twojego biura rachunkowego.

### 2. Czy programy księgowe już czytają PDF albo łączą się z bankiem?

**Krótka odpowiedź: w dużej części tak, i w latach 2025-2026 ta luka jest aktywnie zamykana.** Status: **częściowo** (Optima, Saldeo, Scanye zweryfikowane w dokumentacji producentów; reszta ze źródeł wtórnych; RAKS i Streamsoft niesprawdzone).

| Program | Czyta PDF wyciągu? | Połączenie z bankiem? | Status i link |
|---|---|---|---|
| Comarch ERP Optima | **Tak, od wersji 2025.1** - zdjęcia, skany i PDF przez usługę Comarch OCR; pliki JPG, PDF, PNG, TIFF; z automatycznym rozliczeniem lub bez | Jedno źródło (październik 2026) opisuje bezpośrednie połączenie "Web Service" z bankiem, inne temu przeczy; banki spółdzielcze w większości bez Web Service | zweryfikowane (OCR) - https://pomoc.comarch.pl/optima/pl/2026/dokumentacja/czy-za-pomoca-uslugi-comarch-ocr-mozna-zaczytywac-wyciagi-bankowe/ ; częściowo (Web Service) - https://elte-s.com/baza-wiedzy/wyciagi-bankowe-comarch-erp-optima-mt940-ocr-web-service/ , https://wgkom.pl/kasa-bank/ |
| Symfonia FK | Nie znalazłem. Import MT940, XML, CSV | Tak - produkt "Web API Bank" (import wyciągów i eksport przelewów); listy banków nie widziałem | częściowo - https://pomoc.symfonia.pl/data/s50/fk50c/-/data/import_wyciagow_bankowych2.htm , https://symfonia.pl/oprogramowanie/web-api-bank/ |
| Rewizor nexo / InsERT | Nie znalazłem. Import MT940 i CSV przez "parsery"; własny parser wymaga wersji PRO | Tak - "bankowość on-line w InsERT nexo" (w wynikach: mBank CompanyNet, BNP Paribas, ING; nie wiem, czy to pełna lista) | częściowo - https://www.insert.com.pl/dla_uzytkownikow/e-pomoc_techniczna/3583,bankowosc-on-line-w-insert-nexo.html , https://help.scanye.pl/pl/articles/10102432-rewizor-nexo-krok-iii-import-wyciagu-bankowego-z-pliku-mt940 |
| RAKS | Nie sprawdzałem | Nie sprawdzałem | niezweryfikowane |
| Streamsoft | Nie sprawdzałem | Nie sprawdzałem | niezweryfikowane |
| SaldeoSMART | **Tak** - PDF pobrany z banku jest odczytywany automatycznie; rozliczenie: 3 transakcje = 1 kredyt; w pakietach dla biur. **Nie czyta skanów, CSV ani XLS.** | Tak - "integracja z bankiem" pobiera transakcje bez plików; PDF jest wyjściem zapasowym | zweryfikowane - https://www.saldeosmart.pl/wyciagi-bankowe , https://pomoc.saldeosmart.pl/hc/pl/articles/360016275078-Odczytywanie-wyci%C4%85g%C3%B3w-bankowych-miniprzewodnik-cz-10 |
| Scanye | Nie - celowo. Pobiera surowe dane z banku "na żądanie" (funkcja z 28.01.2025) i oddaje MT940 lub CSV; pisze wprost, że to eliminuje błędy OCR | Tak | zweryfikowane - https://help.scanye.pl/pl/articles/10436996-jak-pobierac-wyciagi-bankowe-na-zadanie , https://help.scanye.pl/pl/articles/10442532-aktualizacja-28-01-2025-notatki-wewnetrzne-i-wyciagi-bankowe-na-zadanie ; cennik: pozycja "Wyciągi mt940" 55 PLN (jednostka niejasna) - https://scanye.pl/cennik |
| wFirma | Nie znalazłem | Według porównania: automatyczne pobieranie z wielu banków oraz Revolut, N26, Wise | częściowo - https://sprytnafirma.pl/wfirma |
| inFakt | Nie znalazłem | Według porównania: 18 banków przez PSD2, własna licencja AISP | częściowo - https://navyflame.com/baza-wiedzy/porownanie-systemow-fakturowych |
| iFirma | Nie znalazłem | Według porównania: ponad 12 banków przez GoCardless/Ponto, limit 90 dni | częściowo - https://navyflame.com/baza-wiedzy/porownanie-systemow-fakturowych |
| Fakturownia | Nie znalazłem | Import CSV, XLSX, MT940 | częściowo - https://futari.pl/ranking-ksiegowosc.html |

Ile kosztuje odczyt wyciągu w Optimie: pakiety Comarch OCR&KSeF liczone w stronach - 250 stron za 130 zł netto/mies., 500 za 195 zł, 1000 za 390 zł; demo do 50 stron bezpłatnie; pakiet roczny 2000 stron za 1095 zł. Sprzedawca wylicza około 0,52 zł za stronę w najmniejszym pakiecie i 0,39 zł przy 1000 stron [częściowo - ceny od partnerów Comarch: https://optima-esklep.pl/poradniki/comarch-ocr-faktury-kosztowe , https://mapsolutions.pl/comarch-ocr-nowe-roczne-pakiety/ , https://sklep.comarch.pl/pakiet-comarch-ocr-mikro-250-stron-miesiecznie-u/3-20838-10791]. Jedna strona OCR liczy się tak samo jak jeden dokument KSeF, a darmowy KSeF w Comarch skończył się 31 lipca 2026 [częściowo: https://www.systemyit.pl/koniec-darmowego-ksef-w-comarch-od-31-lipca-2026-zobacz-nowy-cennik-i-wybierz-wlasciwy-pakiet/]. Wniosek [niezweryfikowane]: biuro na Optimie i tak kupuje te pakiety pod KSeF, więc odczyt wyciągów ma "już opłacony".

Co z tego wynika dla Ciebie:

- Optima jest w źródłach konsekwentnie wymieniana jako najpopularniejszy program w biurach rachunkowych, ale rzetelnego udziału procentowego nie znalazłem (jedyna liczba to 25% głosów w internetowej ankiecie cytowanej przez Scanye, niereprezentatywna) [częściowo: https://scanye.pl/blog/programy-ksiegowe-dla-biur-rachunkowych-ranking]. Największy kawałek rynku ma więc funkcję w środku.
- Zostają użytkownicy Symfonii, InsERT (Rewizor, Rachmistrz), RAKS-a i mniejszych programów, którzy nie mają Saldeo ani Scanye. Sprzedawca Pan od IT pisze, że te programy PDF nie wczytają [częściowo, twierdzenie sprzedawcy: https://panodinformatyki.com/konwersja-wyciagu-bankowego-pdf-na-csv-mt940-i-import-do-programu-ksiegowego/]. To jest Twój jedyny realny segment i już jest obsługiwany przez Multicomp, Lido, Pan od IT, ClearVault i emSzmal.

### 3. Które banki i typy kont NIE dają MT940? Jak częste to jest u mikrofirm?

**Krótka odpowiedź: nie udało mi się tego ustalić.** Trzy wyszukiwania nie znalazły ani jednego polskiego banku, który na koncie firmowym w ogóle nie daje MT940. Status: **niezweryfikowane** co do skali, **częściowo** co do mechanizmu.

Co znalazłem:

- MT940 jest opisywany jako najszerzej dostępny eksport wyciągu w polskich bankach [częściowo: https://ksefimport.pl/blog/format-wyciagu-bankowego-mt940-camt053-jpk-wb-faktury-ksef].
- **Bywa płatny albo wymaga włączenia.** mBank: 50 zł miesięcznie za usługę raportów MT940 dla jednego rachunku; w niektórych pakietach dla jednoosobowych działalności 0 zł [zweryfikowane: https://www.mbank.pl/firmy/uslugi-serwis-transakcyjny/wyciagi-mt940/ , https://www.mbank.pl/pdf/oplaty/taryfa-firmy.pdf , https://www.mbank.pl/firmy/promocje/konto-standard-z-gwarancja/]. Erste: eWyciąg bezpłatny, komunikat MT940 10 zł - według poradnika, nie taryfy banku [częściowo: https://www.premiownia.pl/poradniki/konto-firmowe-dla-ksiegowej-i-uslug]. Alior, segment korporacyjny: aktywacja 100 zł i 10 zł za komunikat - stara taryfa z 2017 roku [częściowo: https://www.aliorbank.pl/dam/jcr:ef1d3167-f0de-414a-9c2a-d1b90c544472/kb-taryfa-oplat-i-prowizji-mikro-male-srednie-korporacje-27032017.pdf].
- Program mKsiegowa deklaruje import MT940 z Alior, Millennium (konto Biznes), Nest Banku, Santandera i iPKO Biznes - czyli te banki MT940 dają [częściowo, strona oznaczona jako "legacy": https://mksiegowa.pl/www/pl/doc/legacy/BankTransactionsImport].
- **Revolut Business daje MT940 i CAMT.053.** Konto osobiste Revolut - tylko PDF i CSV [częściowo, blogi stron trzecich: https://www.statementbridge.nl/en/blog/download-bank-statement-revolut , https://bankwriter.com/bank-guides/bank-tutorials/export-revolut-statements-to-csv/]. To obala popularne założenie "Revolut = tylko PDF".
- Konta **osobiste** często nie mają MT940 [częściowo: https://www.brokik.com/rozwiazania/import-wyciagu-bankowego-mt940].

Kiedy więc PDF jest jedyną opcją [niezweryfikowane - moje rozumowanie]:

1. Jednoosobowa działalność prowadzona na koncie osobistym.
2. Klient nie włączył płatnego MT940 albo nie umie go pobrać i wysyła PDF "bo tak łatwiej".
3. Konta zagraniczne i fintechy w wersji osobistej.
4. Zaległe okresy, gdy są tylko stare PDF-y.

**Istotne zastrzeżenie.** W KPiR nie księguje się każdej operacji z wyciągu - do księgi trafiają głównie koszty bankowe (kolumna 13). Każdą pozycję wyciągu trzeba zaksięgować dopiero w pełnej księgowości [zweryfikowane: https://poradnikprzedsiebiorcy.pl/-czy-wiesz-jak-rozliczac-koszty-i-przychody-bankowe-w-kpir , https://www.saldeosmart.pl/blog/ksiegowy/jak-zaksiegowac-wyciag-bankowy/]. Wniosek [niezweryfikowane]: grupa, w której PDF jest najczęściej jedyną opcją (mikrofirma na koncie osobistym, KPiR), to jednocześnie grupa, w której import wyciągu jest najmniej potrzebny. Firmy na pełnych księgach mają konta firmowe, a te zwykle dają MT940. Te dwa zbiory słabo się pokrywają i to obniża realny popyt. Liczby podmiotów na pełnych księgach nie znalazłem.

### 4. Dowody popytu

Status: **częściowo** (jakościowo), **niezweryfikowane** (ilościowo).

- **Liczba biur rachunkowych - źródła są sprzeczne.** 30 988 aktywnych jednoosobowych działalności z kodem 69.20.Z (CEIDG, wrzesień 2026) [częściowo, komercyjny agregator: https://outreachpilot.pl/firmy/biura-rachunkowe]; 62 674 aktywne JDG łącznie w kodach 69.20.A, B i C według PKD 2025 (listopad 2026) [częściowo: https://outreachpilot.pl/pkd/69-20-z]; "blisko 35 000" biur i kancelarii [częściowo, materiał sprzedawcy bazy: https://www.bazyb2b.pl/baza-biur-rachunkowych]; 46 850 aktywnych podmiotów w REGON na 30 czerwca 2014 [zweryfikowane, ale sprzed 12 lat: https://www.rynkometr.pl/pkd/6920Z]; około 70 tys. w starym dokumencie na gov.pl, który sam zaznacza, że dokładnej liczby nikt nie zna [częściowo: https://www.gov.pl/attachment/25767c10-8b37-4da7-a17f-f87c7410ccd7]. Uczciwie: rząd wielkości to kilkadziesiąt tysięcy podmiotów, z czego duża część to jednoosobowe księgowe. Dokładnej liczby nie ma.
- **Wątki na forach i grupach: nie znalazłem żadnego.** Dwa wyszukiwania nastawione na fora i grupy księgowych zwróciły wyłącznie strony sprzedawców. Zastrzeżenie: grupy na Facebooku nie są indeksowane, więc brak wyników to słaby dowód negatywny, a nie dowód braku potrzeby [niezweryfikowane].
- **Artykuły porównawcze: nie znalazłem.** Dla konwerterów PDF -> KSeF istnieje "porównanie 5 narzędzi" (pierwszy przegląd). Dla konwerterów wyciągów - nic. To sygnał, że kategoria jest mniejsza [niezweryfikowane].
- **Reklamy Google konkurentów: niezweryfikowane.** Nie mam jak tego sprawdzić wyszukiwaniem. Zrobisz to sam w Centrum przejrzystości reklam Google (wpisz multicomp.pl, clearvaultapp.com, panodit.pl).
- **Strony transakcyjne w wynikach: zaliczone.** Na polskie zapytania wychodzą prawie same narzędzia i sklepy: Multicomp, Pan od IT, ClearVault, converts.ninja, mt940.pl, mt940.eu, Lido, emSzmal, Flobo, Mobevo [zweryfikowane - linki w tabeli konkurencji].
- **Ktoś za to płaci:** Multicomp trzyma cenę 410-1790 zł netto plus 30% rocznie za aktualizacje; mt940.pl ma minimalną opłatę 210 zł miesięcznie [linki wyżej]. Nie wiem, ile sztuk sprzedają.
- **Kierunek rynku jest przeciwko Tobie:** Comarch dodał odczyt wyciągów w 2025.1, Scanye dodało wyciągi na żądanie w styczniu 2025, programy do faktur łączą się z bankami przez PSD2 [linki w pytaniu 2]. Potrzeba "PDF -> plik" kurczy się z roku na rok [częściowo].

**Ocena R4:** część jakościowa (co najmniej 3 strony transakcyjne w wynikach) - zaliczona. Część ilościowa - **niezweryfikowana**. Bez Planera słów kluczowych nie ma zgody na budowę.

### 5. Dowód międzynarodowy i stopy bazowe

Status: **zweryfikowane** co do kierunku (spadek lidera, grosze u klonów), **częściowo** co do bieżącej kwoty lidera.

Lider, bankstatementconverter.com:

- Starszy wywiad: 12,5 tys. USD przychodu miesięcznego, 126 218 USD za 12 miesięcy [zweryfikowane, ale stare: https://www.starterstory.com/stories/bankstatementconverter]. Profil założyciela wspomina o 40 tys. USD miesięcznie "według wywiadu źródłowego" [częściowo: https://fndrlist.com/startup-ecosystem/angus-cheng].
- **Wpis własny z 28 sierpnia 2026, "My business is dying":** przychód -24% od lutego 2026, przychód abonamentowy -12%; tabela pokazuje ujemną zmianę od kwietnia 2026 (w lipcu -19 960, w dolarach hongkońskich). Założyciel przestał publikować przychody, bo "dużo ludzi zaczęło budować własne konwertery przy pomocy AI". Podejrzewa, że użytkownicy przechodzą na darmowe czaty AI, choć sam uważa je za wolniejsze i droższe. Dodaje, że uwaga w mediach społecznościowych nie przekłada się na sprzedaż [zweryfikowane: https://bankstatementconverter.com/blog/posts/2026-08-28-business-is-dying/ ; omówienie: https://wayneatkinson.com/blog/my-business-is-dying-lesson-for-saas-founders].
- Danych o ruchu z Google wpis nie podaje. Że spadł ruch z wyszukiwarki, to tylko domysł komentującego na Hacker News [niezweryfikowane: https://news.ycombinator.com/item?id=49474776].
- Bieżąca kwota: wpis TrustMRR dla tej nazwy pokazał w jednym odczycie około 3 tys. USD za 30 dni i 2,6 tys. USD MRR, a w drugim "brak aktywnych subskrypcji" i założyciela, który nie pasuje do firmy. **Nie ufam żadnej z tych wartości** [niezweryfikowane: https://trustmrr.com/startup/bankstatementconverter].

Klony (zweryfikowany przychód, ostatnie 30 dni, z tytułów stron TrustMRR):

| Klon | Ostatnie 30 dni | Uwagi | Link |
|---|---|---|---|
| Convert Bank Statement | 31 USD | | https://trustmrr.com/startup/convert-bank-statement |
| Bank statement Converter Pro | 57 USD (inny serwis: 72 USD) | 3 aktywne subskrypcje | https://trustmrr.com/startup/bank-statement-converter-pro , https://foundersmarket.xyz/business/bank-statement-converter-pro |
| Bank Statement Converter | 69 USD | Indie, założony w 2026, działa lokalnie w przeglądarce | https://trustmrr.com/startup/bank-statement-converter |
| Bank to file | 134 USD | | https://trustmrr.com/startup/bank-to-file |
| Bankstatemently | 433 USD | 14 aktywnych subskrypcji | https://trustmrr.com/startup/bankstatemently |
| **Aussie Bank Statement Converter** | **746 USD** | wersja pod banki jednego kraju; MRR 144 USD | https://trustmrr.com/startup/aussie-bank-statement-converter |

Co dało liderowi wygraną [częściowo - z wywiadów cytowanych w pierwszym przeglądzie]: start w marcu 2021, czyli przed erą czatów AI; domena dokładnie odpowiadająca frazie wyszukiwania; lata dopisywania poprawek pod kolejne banki; budowanie na oczach publiczności. Żadnej z tych przewag nie da się dziś odtworzyć. Ostatnia obróciła się przeciwko niemu - sam pisze, że przez to ma wielu naśladowców.

**Stopa bazowa dla Ciebie** [szacunek, oparty na tabeli]: krajowy klon w dobrym scenariuszu to kilkaset USD miesięcznie (wzorzec australijski: 746 USD). Australia to bogatszy rynek z prostszym celem (CSV do Excela). W Polsce cel jest trudniejszy (MT940 pod konkretny program), a kupujących mniej. Realistyczny pierwszy rok: 0-2000 zł miesięcznie, z większym prawdopodobieństwem przy dolnej granicy.

### 6. Zaufanie i ochrona danych - czy to realna blokada sprzedaży?

**Krótka odpowiedź: to realne tarcie, ale nie twarda blokada dla małych biur.** Status: **częściowo** (źródła to blogi doradców RODO, nie przepisy ani stanowiska UODO).

- Biuro rachunkowe jest zwykle podmiotem przetwarzającym, a klient administratorem. Działa na podstawie umowy powierzenia z art. 28 RODO [częściowo: https://www.legiscope.com/blog/rodo-biuro-rachunkowe.html , https://bezpieczniwbiznesie.pl/rodo-w-biurze-rachunkowym/].
- **Ty byłbyś dalszym podmiotem przetwarzającym.** Dostawcy chmury i systemów online są traktowani jako podprocesorzy. Podpowierzenie wymaga uprzedniej zgody administratora, czyli klienta biura - ogólnej albo szczegółowej [częściowo: https://e-rodo.com/rodo-w-biurze-rachunkowym/ , https://panodrodo.pl/blog/umowa-powierzenia-przetwarzania-danych-art-28-rodo/]. W praktyce biuro powinno mieć Twoją usługę objętą zgodą w umowach ze swoimi klientami. Ostrożne biuro tego nie zrobi dla nieznanej strony.
- Umowa może być elektroniczna, więc wystarczy akceptacja przy rejestracji [częściowo: https://panodrodo.pl/blog/umowa-powierzenia-przetwarzania-danych-art-28-rodo/].
- Sygnał z rynku, że prywatność sprzedaje: ClearVault deklaruje szyfrowanie i usuwanie plików po przetworzeniu, Pan od IT działa bez konta, jeden z klonów na TrustMRR przetwarza wszystko lokalnie w przeglądarce [zweryfikowane jako deklaracje sprzedawców: https://clearvaultapp.com/pl/pdf-wyciag-bankowy-do-mt940 , https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940 , https://trustmrr.com/startup/bank-statement-converter].
- Kwestii tajemnicy bankowej wyszukiwanie nie pokryło [niezweryfikowane].

Minimum, którego potrzebujesz, żeby biuro w ogóle rozważyło wgranie pliku [niezweryfikowane - moja lista]: umowa powierzenia do zaakceptowania jednym kliknięciem; przetwarzanie w UE; usuwanie plików po godzinach, nie dniach; jasna lista podprocesorów; pełne dane spółki z NIP i adresem. **Pułapka:** jeśli odczyt robi model AI przez API dostawcy spoza UE, to ten dostawca też jest podprocesorem. Musisz mieć z nim umowę powierzenia i przetwarzanie w regionie UE albo czytać PDF bez modelu AI.

Ta sama obawa (wklejanie danych klientów do czata) jest też Twoim argumentem przeciwko ChatGPT. Ale działa w obie strony: nieznana mała strona nie budzi większego zaufania niż znany czat w płatnym planie firmowym [niezweryfikowane].

### 7. Rzeczywistość techniczna i utrzymanie

Status: **częściowo**.

- **Odmiany MT940.** InsERT pisze wprost: każdy bank modyfikuje MT940 po swojemu, co z reguły wymaga dedykowanego parsera, a własny parser wymaga wersji nexo PRO [zweryfikowane: https://www.insert.com.pl/dla_uzytkownikow/e-pomoc_techniczna/1337,insert-nexo-%E2%80%93-jak-wczytac-oraz-rozliczyc-automatycznie-wyciagi-bankowe-w-formacie-mt940.html?token=IjIwMjEvMTEvMjksIDA2OjAyOjA2LS0-LCAi.8sQlupqGYBoEJgqQFIVtJXphUp4]. Dla Ciebie: plik musi udawać MT940 konkretnego banku, który dany program umie wczytać. To osobny profil eksportu na każdy program.
- **Kodowanie znaków.** W instrukcjach pojawiają się CP852 (pliki STA), UTF-8 i CP1250 - zależnie od programu [częściowo: https://mksiegowa.pl/www/pl/doc/legacy/BankTransactionsImport , https://help.scanye.pl/pl/articles/10102432-rewizor-nexo-krok-iii-import-wyciagu-bankowego-z-pliku-mt940 , https://taxcoach.pl/blog/instrukcje/instrukcja-pobierania-wyciagow-z-pko-sa-w-mt940-utf8.html]. Zły wybór to "krzaczki" w nazwach kontrahentów albo odrzucony plik. Numer rachunku w pliku musi się zgadzać z rachunkiem założonym w programie.
- **Skany.** SaldeoSMART, duży gracz z wieloletnim doświadczeniem, w ogóle nie obsługuje skanów wyciągów ani jednego pliku dla kilku rachunków [zweryfikowane: https://pomoc.saldeosmart.pl/hc/pl/articles/360016275078-Odczytywanie-wyci%C4%85g%C3%B3w-bankowych-miniprzewodnik-cz-10]. Skoro oni tego nie robią, to jest trudne. Scanye pisze, że nawet najlepszy OCR czasem się myli, i dlatego pobiera dane prosto z banku [zweryfikowane: https://help.scanye.pl/pl/articles/10436996-jak-pobierac-wyciagi-bankowe-na-zadanie].
- **Układy PDF banków.** Multicomp sprzedaje obsługę wydruków PDF osobno, wycenia aktualizacje na 30% ceny rocznie i testuje konwersję na pliku przysłanym przez klienta [zweryfikowane: https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html]. Lido utrzymuje osobny dokument ze spisem formatów i osobny z opisem zmian MT940 [częściowo: https://www.konwerter.com.pl/pliki/opis_zmian_MT940.pdf]. Założyciel zagranicznego lidera zaczął od ogólnego algorytmu, a potem latami dopisywał poprawki pod banki [częściowo: https://www.starterstory.com/stories/bankstatementconverter].
- **Typowe ciche błędy odczytu przez AI:** pomylony znak kwoty (wpływ/wydatek), zdublowane lub zgubione wiersze na granicach stron, powtórzone nagłówki. Plik wygląda poprawnie, a jest błędny [częściowo, źródłem jest sprzedawca konkurencyjnego narzędzia: https://www.kontocsv.de/en/guides/chatgpt-bank-statement-xero]. Jedyna obrona to twarda kontrola: saldo początkowe + suma operacji = saldo końcowe.

Ile to pracy [szacunek]: macierz "około 8-10 banków x 4-5 programów x kodowanie" plus skany, wyciągi wielowalutowe, rachunki VAT. Pierwsze 3 miesiące 3-6 godzin tygodniowo, później 2-3 godziny, jeśli odczyt przez model AI okaże się stabilny. Zgłoszenia skupiają się wokół terminów księgowych w miesiącu, gdy księgowa chce odpowiedzi tego samego dnia.

### 8. Frazy zakupowe do Planera słów kluczowych

Pełna lista jest w sekcji "Frazy do sprawdzenia w Planerze słów kluczowych" niżej. Status wolumenów: **niezweryfikowane** - nie podaję żadnej liczby.

## Konkurencja

| Nazwa | Cena | Trakcja | Słabość | Link |
|---|---|---|---|---|
| Comarch OCR w Optimie | około 0,39-0,52 zł za stronę w pakietach (250 stron = 130 zł netto/mies.); demo 50 stron | Wbudowane w program opisywany jako najpopularniejszy w biurach; liczby użytkowników nie znam | Tylko dla Optimy; płatne strony; wynik trzeba zweryfikować ręcznie | https://pomoc.comarch.pl/optima/pl/2026/dokumentacja/czy-za-pomoca-uslugi-comarch-ocr-mozna-zaczytywac-wyciagi-bankowe/ |
| SaldeoSMART | 3 transakcje = 1 kredyt; w pakietach (pakiety firmowe od 379 zł netto/mies. według strony partnera) | Znana marka wśród biur; liczby nie znam | Nie czyta skanów ani CSV/XLS; trzeba kupić cały pakiet | https://www.saldeosmart.pl/wyciagi-bankowe , https://systemsaldeo.pl/saldeo-dla-firm-cennik/ |
| Scanye | "Wyciągi mt940" 55 PLN (jednostka niejasna); aplikacja dla biur od 559 zł | Nie znam | Wymaga podłączenia konta klienta; nie pomaga przy zaległych PDF-ach | https://scanye.pl/cennik |
| emSzmal 3 PRO | 98,15 zł netto jednorazowo | Wieloletni produkt, integracje z Optimą, nexo, GT, WF-FaKir; liczby nie znam | Program na Windows; potrzebny dostęp do bankowości klienta; brak dowodu odczytu PDF | https://www.emszmal.pl/index.php?zobacz=cennik |
| Multicomp | 410 zł netto + pakiety 767-1790 zł + 30% rocznie | Nie znam; cena utrzymywana od lat | Instalacja, licencja na stanowisko, płatność za formaty | https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html |
| Lido Konwerter | Nie znalazłem | Nie znam | Program na komputer | https://www.konwerter.com.pl/pliki/Konwerter_Lido_spis_formatow_modulu_wyciagi_bankowe.pdf |
| Pan od IT | 10 operacji darmo; ceny płatnej nie znalazłem | Nie znam; wychodzi wysoko na wszystkie moje zapytania | Mało banków (4-5), brak widocznego cennika | https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940 |
| ClearVault | 1 USD za 10 stron | Nie znam; dużo polskich stron "bank x program" | Nieznany operator, ceny w USD, strony generowane masowo (w tytułach zostało "{Format}") | https://clearvaultapp.com/ , https://clearvaultapp.com/pl/pko-bp-mt940-wyciag-bankowy-do-insert |
| mt940.pl / Mobevo | 30 zł/mies. za klienta, minimum 210 zł/mies. (stare) | Nie znam | Stare strony, wysoki próg wejścia | https://mt940.pl/cennik/ , https://pomoc.mobevo.pl/wiedza/wyciagi-bankowe/ |
| converts.ninja | Darmowy | Nie znam | Tylko CSV, nie PDF | https://converts.ninja/ |
| Flobo | 25-195 zł/mies. | Nie znam | Niejasne, czy konwertuje PDF | https://flobo.io/wyciagi-bankowe/ |
| Darmowe czaty AI (ChatGPT, Claude, Gemini) | 0 zł | Lider kategorii sam wskazuje je jako powód spadku | Ciche błędy, brak gwarancji sald, kłopot z RODO | https://bankstatementconverter.com/blog/posts/2026-08-28-business-is-dying/ |

W kolumnie "Trakcja" prawie wszędzie stoi "nie znam". Nie znalazłem żadnej liczby klientów ani przychodu polskiego konkurenta.

## Najlepszy wariant produktu

Jeśli mimo werdyktu chcesz to sprawdzić, najostrzejsza wersja wygląda tak:

- **Dla kogo:** małe biura rachunkowe i samodzielne księgowe pracujące na **Symfonii, Rewizorze (GT i nexo) i RAKS-ie**, obsługujące klientów na pełnych księgach. Nie Optima - tam funkcja jest w programie.
- **Co:** "Wyciąg PDF -> plik, który Twój program wczyta za pierwszym razem". Użytkownik wybiera program, nie format. Na wyjściu plik w odmianie i kodowaniu pod ten program oraz widoczny dowód: saldo początkowe + operacje = saldo końcowe, liczba operacji zgodna. Jeśli kontrola sald nie przechodzi, strony nie są naliczane.
- **Czego nie robić:** "PDF do Excela" (darmowe czaty to zjadły), łączenia z kontem bankowym (licencja płatnicza), skanów w wersji pierwszej.
- **Cena** [szacunek]: paczki przedpłacone bez abonamentu - 100 stron za 49 zł netto, 500 stron za 199 zł netto, ważne 12 miesięcy. Biuro kupuje raz na kilka miesięcy, użytkownik okazjonalny raz. To spełnia R2 dla obu grup. Darmowe demo (R3): pierwsza strona jednego wyciągu, nigdy cały plik.
- **Kanał:** wyłącznie istniejące wyszukiwania - strony "bank x program" z Twojego generatora plus Google Ads na frazy zakupowe. Nie ma tu sklepu z aplikacjami ani katalogu, który sam przyprowadzi kupujących. To najsłabszy punkt względem Twojej własnej reguły dystrybucji.

Uczciwie: ten wariant różni się od Pan od IT i ClearVault tylko wykonaniem (więcej banków, wybór programu zamiast formatu, gwarancja sald). To nie jest trwała przewaga. Konkurent skopiuje to w tydzień.

## Ekonomia (z zaznaczeniem szacunkow)

- **Cena:** około 0,40-0,49 zł za stronę [szacunek, z kotwic: ClearVault 1 USD/10 stron - https://clearvaultapp.com/ ; Comarch 0,39-0,52 zł/strona - https://optima-esklep.pl/poradniki/comarch-ocr-faktury-kosztowe].
- **Przychód z jednego biura** [szacunek]: biuro z 10 klientami przysyłającymi PDF, po 5 stron miesięcznie, to 50 stron, czyli około 25 zł miesięcznie. Większe biuro - może 100 zł. Przyjmuję 25-100 zł miesięcznie na płacące biuro.
- **Ile biur potrzeba** [arytmetyka na szacunkach]: 2000 zł miesięcznie wymaga 20-80 stale płacących biur. 500 zł miesięcznie - 5-20 biur.
- **Koszt własny** [szacunek]: odczyt strony przez model AI to grosze (rząd 0,02-0,10 zł); hosting około 0 zł; prowizja Stripe - sprawdź w swoim koncie. Marża na stronie jest wysoka. Problemem nie jest marża, tylko liczba kupujących.
- **Koszt pozyskania klienta:** **niezweryfikowany.** Nie znam ceny kliknięcia dla tych fraz. W disclosekit płaciłeś 13,48 zł za kliknięcie (liczba z Twojego post-mortem, cytowana w pierwszym przeglądzie). Dla niszowych fraz konwertera stawka może być niższa, ale to tylko przypuszczenie - Planer pokaże widełki. Przy pierwszym zakupie za 49 zł reklama spina się tylko wtedy, gdy koszt płacącego klienta nie przekracza około 100 zł i klient wraca [szacunek].
- **Sufit:** najlepszy zweryfikowany klon krajowy zarabia 746 USD za 30 dni [https://trustmrr.com/startup/aussie-bank-statement-converter], pozostałe 31-433 USD [linki w pytaniu 5]. Lider kategorii traci 24% przychodu w pół roku [https://bankstatementconverter.com/blog/posts/2026-08-28-business-is-dying/].
- **Realistyczny wynik po 12 miesiącach** [szacunek]: 0-2000 zł miesięcznie, najpewniej kilkaset złotych. Przy 3-6 godzinach utrzymania tygodniowo to słaba stawka godzinowa w porównaniu z Twoim konsultingiem.

## Zakres budowy i pasywnosc

**Zakres wersji pierwszej** [szacunek]:

- wgranie PDF (tylko pliki pobrane z banku, bez skanów);
- odczyt operacji - model AI albo parser, z twardą kontrolą sald;
- podgląd tabeli z możliwością poprawki przed eksportem;
- eksport pod 3 programy (Symfonia, Rewizor, RAKS) z właściwym kodowaniem; start od 5 największych banków;
- paczki stron przez Stripe Checkout;
- automatyczne usuwanie plików, umowa powierzenia do akceptacji, lista podprocesorów;
- strony "bank x program" z istniejącego generatora.

**Czas** [szacunek]: 10-15 dni roboczych pracy z agentem. Przy Twoich 5-8 godzinach tygodniowo to 6-10 tygodni kalendarzowych, nie 2-3. **To przekracza Twoją regułę budowy**, chyba że zetniesz zakres do jednego programu i trzech banków.

**Blokada praktyczna:** potrzebujesz prawdziwych wyciągów PDF z każdego banku i dostępu do Symfonii, Rewizora i RAKS-a, żeby sprawdzić, czy plik się wczytuje. Masz jeden rachunek firmowy i żadnego z tych programów. Bez zaprzyjaźnionego biura rachunkowego nie przetestujesz produktu [niezweryfikowane - zakładam to z Twojego profilu].

**Pasywność** [szacunek]: 3-6 godzin tygodniowo przez pierwsze miesiące, 2-3 godziny później. Na granicy albo powyżej limitu 2-4 godzin. Nie jest to wsparcie całodobowe ani doradztwo regulowane, ale jest wrażliwe na terminy: księgowa z niewczytującym się plikiem tuż przed zamknięciem miesiąca nie poczeka do weekendu. Jest też odpowiedzialność - błędny plik to błędne księgi cudzego klienta. Potrzebny jasny regulamin i kontrola sald jako zabezpieczenie.

## Ryzyka

1. **Kategoria się kurczy.** Lider traci przychód przez darmowe czaty AI i zalew klonów. Wchodziłbyś w rynek schodzący.
2. **Funkcja staje się częścią programu księgowego.** Optima, Saldeo i Scanye już ją mają. Jeśli Symfonia lub InsERT dodadzą odczyt PDF, Twój segment znika. Nie znalazłem zapowiedzi, ale też jej nie szukałem.
3. **Wolumen wyszukiwań może nie spełnić R4.** Niezweryfikowany. Brak wątków na forach i artykułów porównawczych sugeruje małą niszę.
4. **Słabe pokrycie potrzeby.** Kto ma tylko PDF (konto osobiste, KPiR), ten zwykle nie musi importować wyciągu. Kto musi (pełne księgi), ten zwykle ma MT940 z banku.
5. **Niska cena przy wysokim koszcie utrzymania.** Podłoga 0,40 zł za stronę, a każdy nowy układ banku i każda odmiana programu to Twoja praca.
6. **Pasywność i odpowiedzialność.** Zgłoszenia pod terminy, ryzyko cichych błędów w danych finansowych.
7. **Zaufanie.** Nieznana strona prosi o wyciągi cudzych klientów. Ostrożne biura odpadną, zanim zobaczą cenę.
8. **Brak przewagi.** Twoja referencja z hurtowni tu nie działa. Zostaje szybkość budowy, a tę ma dziś każdy.
9. **Brak danych testowych i programów do sprawdzenia importu.**
10. **Kanał zależny tylko od Google.** Nie ma sklepu z aplikacjami. Nowa domena pozycjonuje się miesiącami, a konkurenci już mają strony "bank x program".

## Najtanszy test checi zaplaty (R1) z progami

Trzy etapy. Każdy ma próg "stop". Żadnego kodu funkcji przed etapem 3.

**Etap 0 - za darmo, 1-2 godziny. Bramka R4 i sprawdzenie zamienników.**

1. Planer słów kluczowych (Polska, język polski) dla listy fraz z następnej sekcji.
   - **Zaliczone:** co najmniej jedna fraza zakupowa z co najmniej 1000 wyszukiwań miesięcznie albo co najmniej 3 warianty po co najmniej 100.
   - **Stop:** wszystko poniżej. Nie przechodzisz dalej.
   - Uwaga praktyczna (moja wiedza ogólna, nie z tego badania): konto bez aktywnych kampanii pokazuje szerokie przedziały typu "100-1 tys.". Przedział traktuj ostrożnie - licz jego dolną granicę.
2. Wgraj własny wyciąg firmowy do Pan od IT i ClearVault. Zapisz cenę po limicie i jakość.
   - **Stop:** któryś oddaje cały wyciąg poprawnie i za darmo albo za grosze, a plik wczytuje się do programu księgowego.
3. Daj ten sam PDF darmowemu ChatGPT i Claude z prośbą o MT940. Zmierz czas i sprawdź salda.
   - **Stop:** poprawny plik w około 10 minut. To Twoja własna reguła substytucji.
4. Zapytaj własne biuro rachunkowe (to nie jest sprzedaż wychodząca): jaki program, jak często klienci przysyłają PDF, co wtedy robią, ile by zapłacili.
   - **Sygnał ostrzegawczy:** "prosimy klienta o MT940" albo "mamy to w Saldeo/Optimie".
5. Centrum przejrzystości reklam Google: czy Multicomp, ClearVault, Pan od IT się reklamują. Tylko informacyjnie.

**Etap 1 - około 120 EUR na reklamy, 10-14 dni, bez kodu funkcji.**

- Jedna strona: "Wyciąg PDF -> plik do Symfonii / Rewizora / RAKS-a, z kontrolą sald. 100 stron = 49 zł netto. Zwrot pieniędzy, jeśli plik się nie wczyta."
- Prawdziwa płatność przez Stripe (link do płatności wystarczy). Po płatności klient wgrywa PDF, a Ty dostarczasz plik ręcznie w 24 godziny w dni robocze. Jeśli nie dasz rady - zwrot. To uczciwa przedsprzedaż, nie atrapa.
- Przygotuj krótką umowę powierzenia i usuwaj pliki po dostarczeniu. Przetwarzasz prawdziwe dane.
- Reklamy tylko na frazy zakupowe, dopasowanie ścisłe lub do wyrażenia, tylko Polska.
- **Zaliczone (wszystkie warunki naraz):** co najmniej 5 płatności od 5 różnych kupujących; co najmniej 3 z nich to biura rachunkowe lub księgowe; koszt reklamy na jednego płacącego nie przekracza 100 zł.
- **Stop:** 0-1 płatność po wydaniu budżetu albo po 200 kliknięciach. Także: średnia cena kliknięcia powyżej 5 zł i zero płatności w pierwszych 100 kliknięciach.
- **Strefa szara (2-4 płatności):** nie buduj. Dołóż najwyżej 100 EUR tylko wtedy, gdy co najmniej połowa płacących to biura.
- Zapisy na listę i "kliknięcia w cennik" się nie liczą. Liczą się tylko pieniądze.

**Etap 2 - za darmo, 2 tygodnie po etapie 1. Test powtarzalności.**

- Napisz do płacących z etapu 1 po zamknięciu kolejnego miesiąca.
- **Zaliczone:** co najmniej 2 z 5 kupują lub zużywają strony ponownie.
- **Stop:** nikt nie wraca. To znaczy, że potrzeba jest jednorazowa (zaległości), a nie comiesięczna.

**Etap 3:** budowa, dopiero po zaliczeniu etapów 0, 1 i 2.

Łączny koszt do decyzji: około 120-220 EUR i 10-15 godzin. Mieści się w budżecie.

## Frazy do sprawdzenia w Planerze slow kluczowych

Ustawienia: lokalizacja Polska, język polski. Dla żadnej frazy nie znam wolumenu.

**Frazy zakupowe główne**

- konwerter mt940
- konwerter mt940 online
- mt940 konwerter
- konwerter wyciągów bankowych
- konwerter wyciągów bankowych do mt940
- konwerter wyciągów bankowych pdf
- program do konwersji wyciągów bankowych
- pdf do mt940
- pdf na mt940
- konwerter pdf mt940
- wyciąg bankowy pdf do mt940
- wyciąg pdf na mt940
- generator mt940
- konwerter sta
- ocr wyciągów bankowych

**Frazy "do programu księgowego"**

- import wyciągu bankowego pdf
- wyciąg bankowy pdf do optimy
- import wyciągów bankowych symfonia pdf
- wyciąg pdf do symfonii
- import wyciągu bankowego rewizor pdf
- import wyciągów bankowych rewizor nexo
- import wyciągów bankowych raks
- import wyciągu bankowego subiekt

**Frazy sąsiednie (CSV, Excel, JPK)**

- csv do mt940
- konwerter csv mt940
- excel do mt940
- jpk_wb do mt940
- konwerter jpk_wb
- wyciąg bankowy pdf do excel
- wyciąg bankowy pdf do csv
- wyciąg pdf do excela
- wyciąg bankowy do excela

**Frazy "bank x format" (pod strony programmatic SEO)**

- mbank mt940
- mbank wyciąg mt940
- mbank pdf do mt940
- ing mt940
- ing wyciąg mt940
- pko mt940
- ipko mt940
- pekao mt940
- santander mt940
- millennium mt940
- alior mt940
- bnp paribas mt940
- nest bank mt940
- velobank mt940
- revolut mt940
- revolut wyciąg pdf do csv
- wise mt940
- paypal mt940

**Marki konkurentów (miara popytu na gotowe rozwiązania; nie reklamuj się na nich bez namysłu)**

- emszmal
- multicomp konwerter mt940
- saldeo wyciągi bankowe
- comarch ocr wyciągi bankowe
- scanye wyciągi bankowe

**Frazy informacyjne - sprawdź, ale nie licz do progu R4**

- mt940 co to
- format mt940
- jak pobrać wyciąg mt940

Zapisz dla każdej frazy: wolumen, widełki stawki za kliknięcie i poziom konkurencji reklamowej. Poziom "wysoki" przy niskim wolumenie oznacza, że konkurenci już licytują o tych samych kilku kupujących.

## Otwarte pytania

1. Jaki jest wolumen wyszukiwań fraz zakupowych w Polsce? (Planer, etap 0.)
2. Ile kosztuje Pan od IT po przekroczeniu 10 darmowych operacji i jak dobrze działa na pełnym wyciągu?
3. Kto stoi za ClearVault i czy ich polskie strony w ogóle mają ruch?
4. Czy Symfonia lub InsERT planują odczyt PDF wyciągów w programie? Nie szukałem zapowiedzi.
5. Czy RAKS i Streamsoft czytają PDF albo łączą się z bankami? Niesprawdzone.
6. Który polski bank realnie nie daje MT940 na koncie firmowym mikrofirmy? Nie znalazłem żadnego - być może takiego nie ma.
7. Ile firm w Polsce prowadzi pełne księgi i jaka część ich wyciągów trafia do biur jako PDF?
8. Jaki udział w biurach rachunkowych mają Optima, Symfonia i InsERT? Brak rzetelnego badania.
9. Czy darmowy ChatGPT lub Claude oddaje dziś poprawny MT940 z polskiego wyciągu na 10-20 stron? Do sprawdzenia w 20 minut.
10. Czy konkurenci prowadzą kampanie Google Ads i jakie są stawki za kliknięcie?
11. Jaki jest bieżący przychód bankstatementconverter.com? Dwa odczyty TrustMRR są sprzeczne.
12. Czy wyciągi bankowe wgrywane do zewnętrznego narzędzia rodzą dodatkowe wymogi z tytułu tajemnicy bankowej? Niesprawdzone.
13. Skąd weźmiesz przykładowe wyciągi z 5-8 banków i dostęp do Symfonii, Rewizora i RAKS-a do testów importu?

## Zrodla

Wszystkie adresy pochodzą z wyników 28 wyszukiwań z 2026-11-26. Treść znam ze streszczeń wyników, nie z bezpośredniego otwarcia stron.

Lider międzynarodowy i klony:

- https://bankstatementconverter.com/blog/posts/2026-08-28-business-is-dying/
- https://bankstatementconverter.com/blog/
- https://news.ycombinator.com/item?id=49474776
- https://wayneatkinson.com/blog/my-business-is-dying-lesson-for-saas-founders
- https://fndrlist.com/startup-ecosystem/angus-cheng
- https://www.starterstory.com/stories/bankstatementconverter (starszy wywiad)
- https://trustmrr.com/startup/bankstatementconverter
- https://trustmrr.com/startup/bank-statement-converter
- https://trustmrr.com/startup/bank-statement-converter-pro
- https://foundersmarket.xyz/business/bank-statement-converter-pro
- https://trustmrr.com/startup/convert-bank-statement
- https://trustmrr.com/startup/aussie-bank-statement-converter
- https://trustmrr.com/startup/bankstatemently
- https://trustmrr.com/startup/bank-to-file
- https://trustmrr.com/startup/your-bank-statement-converter
- https://trustmrr.com/startup/parse-my-statement

Polskie i zagraniczne konwertery:

- https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940
- https://panodit.pl/narzedzia/jpk-wb-do-mt940
- https://panodit.pl/narzedzia
- https://panodinformatyki.com/konwersja-wyciagu-bankowego-pdf-na-csv-mt940-i-import-do-programu-ksiegowego/
- https://clearvaultapp.com/
- https://clearvaultapp.com/pl/pdf-wyciag-bankowy-do-mt940
- https://clearvaultapp.com/pl/csv-wyciag-bankowy-do-mt940
- https://clearvaultapp.com/pl/santander-pl-pdf-wyciag-bankowy-do-mt940
- https://clearvaultapp.com/pl/pko-bp-mt940-wyciag-bankowy-do-insert
- https://clearvaultapp.com/pl/santander-pl-mt940-wyciag-bankowy-do-comarch-erp
- https://converts.ninja/
- https://converts.ninja/mbank-mt940
- https://converts.ninja/pko-bp-mt940
- https://converts.ninja/santander-bz-wbk-mt940
- https://taxshield.pl/konwerter/mbank-csv-mt940.html (z pierwszego przeglądu)
- https://mt940.eu/
- https://mt940.pl/cennik/ (strona stara, około 870 dni)
- https://pomoc.mobevo.pl/wiedza/wyciagi-bankowe/ (stara)
- https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html
- https://sklep.multicomp.pl/pdf_datasheet.php?products_id=493
- https://multicomp.pasaz24.pl/product/Konwerter-wyciagow-bankowych-do-formatu-MT940-li-s13722
- https://www.konwerter.com.pl/pliki/Konwerter_Lido_spis_formatow_modulu_wyciagi_bankowe.pdf
- https://www.konwerter.com.pl/pliki/opis_zmian_MT940.pdf
- https://www.emszmal.pl/index.php?zobacz=cennik
- https://emszmal.pl/index.php?zobacz=import_wyciagow_bankowych
- https://www.emszmal.pl/index.php?zobacz=import_wyciagow_bankowych_subiekt_nexo
- https://www.emszmal.pl/Dokumentacja/emSzmal3.pdf
- https://flobo.io/wyciagi-bankowe/
- https://flobo.io/bankowosc/konwerter-wyciagow-mt940-kiedy-i-dlaczego-sie-go-uzywa/
- https://statementextract.com/convert/pdf-to-mt940/
- https://bank-statement-conversion.com/en/pdf-to-mt940
- https://bankstatementconverte.com/pl/
- https://www.scantoexcel.com/pl
- https://www.kontocsv.de/en/guides/chatgpt-bank-statement-xero

Programy księgowe i ich funkcje bankowe:

- https://pomoc.comarch.pl/optima/pl/2026/dokumentacja/czy-za-pomoca-uslugi-comarch-ocr-mozna-zaczytywac-wyciagi-bankowe/
- https://pomoc.comarch.pl/optima/pl/2026/dokumentacja/elektroniczna-wymiana-danych-z-bankiem/
- https://pomoc.comarch.pl/optima/pl/2026/dokumentacja/comarch-ocr-poradnik-korzystania-z-uslugi/
- https://pomoc.comarch.pl/xl/hr/pl/2025/dokumentacja/comarch-ocr-import-wyciagow-bankowych-ze-zdjecia-skanu-lub-pliku-pdf/
- https://elte-s.com/baza-wiedzy/wyciagi-bankowe-comarch-erp-optima-mt940-ocr-web-service/
- https://wgkom.pl/kasa-bank/
- https://sklep.comarch.pl/pakiet-comarch-ocr-mikro-250-stron-miesiecznie-u/3-20838-10791
- https://optima-esklep.pl/poradniki/comarch-ocr-faktury-kosztowe
- https://mapsolutions.pl/comarch-ocr-nowe-roczne-pakiety/
- https://sklep.cdnpartner.pl/comarch-ocr-10000-stron-na-rok,3,5451,3891
- https://www.systemyit.pl/koniec-darmowego-ksef-w-comarch-od-31-lipca-2026-zobacz-nowy-cennik-i-wybierz-wlasciwy-pakiet/
- https://pomoc.symfonia.pl/data/s50/fk50c/-/data/import_wyciagow_bankowych2.htm
- https://pomoc.symfonia.pl/data/s50/Symfonia/-/data/import_wyciagow_bankowych.htm
- https://symfonia.pl/oprogramowanie/web-api-bank/
- https://kluczesoft.pl/wiedza/aplikacje/symfonia-program-ksiegowy-cena
- https://www.insert.com.pl/dla_uzytkownikow/e-pomoc_techniczna/3583,bankowosc-on-line-w-insert-nexo.html
- https://www.insert.com.pl/dla_uzytkownikow/e-pomoc_techniczna/1337,insert-nexo-%E2%80%93-jak-wczytac-oraz-rozliczyc-automatycznie-wyciagi-bankowe-w-formacie-mt940.html?token=IjIwMjEvMTEvMjksIDA2OjAyOjA2LS0-LCAi.8sQlupqGYBoEJgqQFIVtJXphUp4
- https://kafelman.com/import-wyciagu-bankowego-do-rewizor-nexo-pro/
- https://www.saldeosmart.pl/wyciagi-bankowe
- https://pomoc.saldeosmart.pl/hc/pl/articles/360016275078-Odczytywanie-wyci%C4%85g%C3%B3w-bankowych-miniprzewodnik-cz-10
- https://pomoc.saldeosmart.pl/hc/pl/articles/20369027656221-Instrukcja-SaldeoSMART-dla-biura-rachunkowego
- https://systemsaldeo.pl/saldeo-dla-firm-cennik/
- https://scanye.pl/cennik
- https://scanye.pl/biura-rachunkowe
- https://help.scanye.pl/pl/articles/10436996-jak-pobierac-wyciagi-bankowe-na-zadanie
- https://help.scanye.pl/pl/articles/10442532-aktualizacja-28-01-2025-notatki-wewnetrzne-i-wyciagi-bankowe-na-zadanie
- https://help.scanye.pl/pl/articles/10102432-rewizor-nexo-krok-iii-import-wyciagu-bankowego-z-pliku-mt940
- https://help.scanye.pl/pl/articles/9969106-wyciagi-bankowe-lista-obslugiwanych-programow
- https://scanye.pl/blog/programy-ksiegowe-dla-biur-rachunkowych-ranking
- https://sprytnafirma.pl/wfirma
- https://navyflame.com/baza-wiedzy/porownanie-systemow-fakturowych
- https://futari.pl/ranking-ksiegowosc.html
- https://mksiegowa.pl/www/pl/doc/legacy/BankTransactionsImport
- https://wektorwiedzy.pl/blog/ranking-programow-dla-biur-rachunkowych-2026/

Banki i format MT940:

- https://www.mbank.pl/firmy/uslugi-serwis-transakcyjny/wyciagi-mt940/
- https://www.mbank.pl/pdf/oplaty/taryfa-firmy.pdf
- https://www.mbank.pl/firmy/promocje/konto-standard-z-gwarancja/
- https://www.premiownia.pl/poradniki/konto-firmowe-dla-ksiegowej-i-uslug
- https://www.aliorbank.pl/dam/jcr:ef1d3167-f0de-414a-9c2a-d1b90c544472/kb-taryfa-oplat-i-prowizji-mikro-male-srednie-korporacje-27032017.pdf (stara taryfa, 2017)
- https://www.bnpparibas.pl/_fileserver/item/1521369
- https://ksefimport.pl/blog/format-wyciagu-bankowego-mt940-camt053-jpk-wb-faktury-ksef
- https://www.brokik.com/rozwiazania/import-wyciagu-bankowego-mt940
- https://www.statementbridge.nl/en/blog/download-bank-statement-revolut
- https://bankwriter.com/bank-guides/bank-tutorials/export-revolut-statements-to-csv/
- https://taxcoach.pl/blog/instrukcje/instrukcja-pobierania-wyciagow-z-pko-sa-w-mt940-utf8.html

Księgowanie wyciągów, liczba biur, RODO:

- https://poradnikprzedsiebiorcy.pl/-czy-wiesz-jak-rozliczac-koszty-i-przychody-bankowe-w-kpir
- https://www.saldeosmart.pl/blog/ksiegowy/jak-zaksiegowac-wyciag-bankowy/
- https://poradnikprzedsiebiorcy.pl/-ksiegowanie-wyciagow-bankowych-jak-robic-to-zgodnie-z-przepisami
- https://outreachpilot.pl/firmy/biura-rachunkowe
- https://outreachpilot.pl/pkd/69-20-z
- https://www.rynkometr.pl/pkd/6920Z (dane z 2014)
- https://www.bazyb2b.pl/baza-biur-rachunkowych
- https://www.gov.pl/attachment/25767c10-8b37-4da7-a17f-f87c7410ccd7 (stary dokument)
- https://www.legiscope.com/blog/rodo-biuro-rachunkowe.html
- https://panodrodo.pl/blog/umowa-powierzenia-przetwarzania-danych-art-28-rodo/
- https://e-rodo.com/rodo-w-biurze-rachunkowym/
- https://bezpieczniwbiznesie.pl/rodo-w-biurze-rachunkowym/
- https://blog.konektosmart.pl/przetwarzanie-danych-osobowych-w-biurze-rachunkowym/

Dossier z pierwszego przeglądu (kontekst):

- /home/user/disclosekit-RIP/project-2/research/01-sweep/productize-plar-orders.md
- /home/user/disclosekit-RIP/project-2/research/01-sweep/boring-utility-apis-and-tools.md
