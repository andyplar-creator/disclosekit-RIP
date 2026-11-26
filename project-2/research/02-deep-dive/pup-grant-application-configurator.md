# Deep-dive: Konfigurator wniosku i biznesplanu pod dotację z urzędu pracy (PUP), dopasowany do konkretnego urzędu, opłata jednorazowa

Data: 2026-11-26. Autor: agent badawczy (analiza sceptyczna jednego kandydata).

**Jak czytać ten dokument.** Przy każdej odpowiedzi jest status:

- **zweryfikowane** – liczba lub fakt widziany w źródle, link obok;
- **częściowo** – dowód pośredni albo źródło niskiej jakości;
- **niezweryfikowane** – moje rozumowanie albo brak dowodu.

Słowo **szacunek** oznacza moją własną liczbę "na oko". Nie traktuj jej jak danych.

**Cztery ograniczenia, o których musisz wiedzieć:**

1. Wykorzystałem cały limit: 22 z 22 wyszukiwań. Więcej nie mogłem.
2. Nie mogłem otwierać stron (blokada sieci). Wszystko pochodzi ze streszczeń wyników wyszukiwarki. Tam, gdzie streszczenie nie mówiło jasno, z której strony jest liczba, piszę to wprost. Zanim wydasz pieniądze, kliknij w linki przy kluczowych liczbach.
3. Nie mam narzędzia do wolumenów wyszukiwań ani do cen kliknięć. **Nie podaję żadnej liczby wyszukiwań ani żadnego CPC, bo ich nie znam.** To musisz sprawdzić sam w Planerze słów kluczowych (lista fraz na końcu).
4. Moja wyszukiwarka nie jest polskim Google i nie pokazuje reklam. Nie widziałem, kto kupuje reklamy na te frazy.

---

## Werdykt

**Słaby.** Nie martwy, ale wyraźnie słabszy, niż wyglądał po pierwszym przeglądzie (tam: "średni").

Uczciwe podsumowanie w siedmiu punktach:

1. **Rynek płatny istnieje naprawdę.** Znalazłem co najmniej 10 sprzedawców z cennikami od 29 zł do ok. 2 000 zł. To odróżnia ten pomysł od disclosekit. Druga połowa reguły R4 (strony sprzedażowe w wynikach) jest prawdopodobnie spełniona.
2. **Ale rynek właśnie się kurczy, i to mocno.** Pieniądze na aktywizację bezrobotnych (z nich idą dotacje) spadły z ok. 3,65 mld zł w 2025 r. do ok. 2,14 mld zł w 2026 r., a na 2027 r. Minister Finansów zamroził je na poziomie 2026. Gazeta Prawna pisze wprost: "mniej pieniędzy na start biznesu, mniej naborów". Jesienne nabory w 2026 r. to po 4-10 wniosków na urząd. Linki w pytaniu 1 i 4.
3. **Twój wyróżnik jest prawdziwy, ale jest też Twoim kosztem.** Urzędy w 2026 r. nadal mają własne druki (potwierdzone na przykładach Poznania, Łodzi, Puław, Nowego Dworu Gdańskiego). Tyle że druki zmieniają się nie raz w roku, tylko z naborem (Puławy mają wersję oznaczoną "Wn-DOT-202602", Łódź osobne druki dla dwóch źródeł pieniędzy). Każdy obsługiwany urząd to stała praca utrzymaniowa w szczycie sezonu.
4. **Pomysł nie jest nowy i ktoś stoi dokładnie w Twoim punkcie cenowym.** gotowebiznesplany.pl sprzedaje komplet za 199 zł i wariant z "Systemem AI do wniosku i biznesplanu" za 299 zł. eformator.com ma generator online (247-497 zł). biznesplany24.pl i atlasdotacji.pl mają już strony per urząd. Na GitHubie leży otwarty generator na Claude API.
5. **Darmowy substytut jest mocny.** Druk urzędu jest darmowy na stronie urzędu, a ChatGPT/Claude przyjmują dziś wgrany plik. Konkurent sam wycenił "pomoc AI" na 100 zł (zestaw poleceń do czatu). Nie znalazłem twardego powodu, dla którego czat nie wystarczy; jest tylko wygoda i strach przed błędem formalnym.
6. **Ekonomia reklam jest cienka i niezweryfikowana.** Przy 199 zł brutto zostaje Ci ok. 154 zł przed reklamą (szacunek, po 23% VAT). Na te same frazy mogą licytować firmy sprzedające pisanie wniosku za 400-2 000 zł. Kosztu kliknięcia nie znam.
7. **Realistyczny sufit to rząd kilkuset do ok. 2 000 zł miesięcznie średnio w roku (szacunek)**, skupione w lutym-kwietniu, z obsługą zestresowanych klientów w krótkich oknach naborów. To mieści się w stawkach bazowych z pierwszego przeglądu (0-500 USD/mies.), nie powyżej nich.

**Co musiałoby się okazać, żeby podnieść ocenę do "warunkowy":** (a) Planer słów kluczowych pokaże co najmniej 1 000 wyszukiwań miesięcznie na najlepszą frazę zakupową w miesiącach luty-marzec albo trzy warianty po co najmniej 100; (b) stawka za górę strony na frazy zakupowe nie przekroczy ok. 2,5 zł; (c) test przedsprzedaży z progami z sekcji R1 przejdzie w tygodniach prawdziwych naborów. Dopóki tego nie sprawdzisz, nie pisz ani linijki kodu.

**Jeśli inny kandydat ma kanał typu "sklep z aplikacjami dużej platformy" i twardszy dowód popytu, powinien wygrać z tym.**

---

## Odpowiedzi na pytania zabojcze

### 1. Ile osób rocznie dostaje dotację i ile składa wnioski? Jaki budżet na 2027?

**Status: liczba dotacji – niezweryfikowane (oficjalnej liczby krajowej nie znalazłem mimo 5 prób). Cięcia budżetu – zweryfikowane w kilku źródłach.**

Czego NIE znalazłem: oficjalnej krajowej liczby przyznanych dotacji za 2024, 2025 ani 2026 r. ani liczby złożonych wniosków. Ministerstwo publikuje raport "Efektywność podstawowych form aktywizacji zawodowej", ale streszczenia wyników nie zawierały liczby osób dla tej formy.

Co znalazłem:

- Wydatki Funduszu Pracy na wszystkie podstawowe formy aktywizacji w powiatowych urzędach pracy w 2024 r.: 3 196 379 530,32 zł (zweryfikowane) https://www.gov.pl/web/rodzina/informacja-o-wartosciach-wskaznikow-osiagnietych-przez-powiatowe-urzedy-pracy-w-2024-r
- Jeden z raportów ministerstwa (starszy rocznik) podaje, że "prawie jedna trzecia" wydatków na podstawowe formy szła na dotacje na podjęcie działalności (częściowo – nie potrafię wskazać, który z tych trzech plików to mówi): https://www.gov.pl/attachment/24681dbf-dcd6-4986-8d9a-3d769032fdd9 , https://www.gov.pl/attachment/1ef3a17b-7ae9-4951-a2b0-c8b024b65f5a , https://www.gov.pl/attachment/c1c4b111-cd8d-4978-a622-a5694f013e96
- **Mój szacunek na 2024 r.:** jedna trzecia z 3,2 mld zł to ok. 1 mld zł; przy średniej dotacji 35-40 tys. zł daje to ok. 26-30 tys. dotacji. Zgadza się to z niepodpartym źródłem zdaniem Bankiera "ponad 30 tys. osób rocznie" https://www.bankier.pl/smart/dofinansowanie-z-urzedu-pracy-co-zrobic-zeby-uzyskac-bezzwrotne-dotacje-z-up
- Liczba z pierwszego przeglądu ("ponad 47 000 dotacji w 2025 r. o wartości 1,8 mld zł", https://atlasdotacji.pl/dotacje-z-urzedu-pracy) wygląda na zawyżoną albo liczoną razem ze środkami unijnymi. Nie ma źródła. Nie opieraj na niej planu.

**Cięcia 2026 (to najważniejsze nowe ustalenie):**

- Środki na aktywizację, w tym dotacje: ok. 3,65 mld zł w 2025 r. i ok. 2,14 mld zł w 2026 r. (częściowo – źródłem jest serwis komercyjny) https://dofinansowaniepup.pl/dofinansowanie-na-otwarcie-firmy-2026/
- To samo w prasie: samorządy dostały w 2026 r. 2,1 mld zł, o 1,5 mld zł mniej niż w 2025 r. (zweryfikowane co do rzędu wielkości; liczba pochodzi z jednego z dwóch artykułów Gazety Prawnej, nie wiem którego) https://edgp.gazetaprawna.pl/samorzad/samorzad-terytorialny-i-finanse/artykuly/11301788,mniej-pieniedzy-na-aktywizacje-bezrobotnych-minister-radzi-skorzystac.html , https://edgp.gazetaprawna.pl/kadry-i-place/artykuly/11289414,urzedy-pracy-walcza-o-dodatkowe-pieniadze-na-aktywizacje-bezrobotnych.html
- Inny szacunek: do powiatowych urzędów trafi ok. 1,7-1,8 mld zł (firma doradcza powołująca się na dane DGP) https://blankpaper.eu/w-2026-roku-trudniej-o-dotacje-z-urzedu-pracy/
- Podlasie: urzędy mają w 2026 r. o 44% mniej pieniędzy, a środki Funduszu Pracy spadły o 68,7% (częściowo – serwis regionalny) https://up.podlasie.pl/dotacje/
- Podkarpacie: spadek ok. 40% według radnych opozycji (częściowo – źródło polityczne) https://czytajrzeszow.pl/?id=56569&idd=6&poz=ml0
- Gazeta Prawna: "Mniej pieniędzy na start biznesu, mniej naborów w urzędach pracy"; urzędy ograniczają droższe formy wsparcia (zweryfikowane) https://edgp.gazetaprawna.pl/samorzad/samorzad-terytorialny-i-finanse/artykuly/11232999,mniej-pieniedzy-na-start-biznesu-mniej-naborow-w-urzedach-pracy.html
- Rezerwa: w lipcu 2026 r. dołożono 87 mln zł z rezerwy (z tego 86,6 mln zł dla samorządów). To kropla wobec 1,5 mld zł ubytku (zweryfikowane; ten sam artykuł GP co wyżej, nr 11301788).

**Perspektywa 2027:**

- Minister Finansów ustalił, że wydatki Funduszu Pracy w projekcie planu na 2027 r. nie mogą przekroczyć poziomu z 2026 r. Związek Powiatów Polskich nazywa to zamrożeniem na zaniżonym poziomie (zweryfikowane) https://www.zpp.pl/index.php/artykul/4150-zpp-domaga-sie-wyjasnien-w-sprawie-zamrozenia-srodkow-funduszu-pracy-na-2027-rok
- Na sierpniowym posiedzeniu Komisji Wspólnej Rządu i Samorządu rząd nie zapowiedział zwiększenia środków (zweryfikowane) https://wartowiedziec.pl/legislacja/31-komisja-wspolna-rzadu-i-samorzadu-terytorialnego/81722-powiatowe-urzedy-pracy-dalej-bez-wystarczajacych-srodkow-podsumowanie-sierpniowego-posiedzenia-plenarnego-kwrist
- Dyrektorzy urzędów proponują ustawowe minimum (40% wpływów ze składek), ale to tylko postulat https://wartowiedziec.pl/polityka-spoleczna/82034-konwent-dyrektorow-pup-krytycznie-o-funduszach-na-aktywizacje-bezrobotnych
- Ostatecznego planu finansowego Funduszu Pracy na 2027 r. nie widziałem (niezweryfikowane).

**Mój szacunek na 2026 i 2027 r.:** jeśli pieniędzy jest o ok. 40% mniej, a urzędy tną najpierw drogie formy (dotacja jest jedną z najdroższych), to dotacji jest ok. 15-20 tys. rocznie zamiast ok. 30 tys. To szacunek, nie dane.

**Skala w pojedynczych urzędach (zweryfikowane, żebyś czuł rząd wielkości):**

- Opole: plan co najmniej 129 dotacji w 2025 r., maks. 33 000 zł https://opole.praca.gov.pl/strona-glowna/-/asset_publisher/O8lyjBAmtU97/content/23091563-nabor-wnioskow-o-przyznanie-jednorazowo-srodkow-na-podjecie-dzialalnosci-gospodarczej-przez-bezrobotnego
- Powiat wysokomazowiecki: 67 osób w 2024 r. https://wysokomazowiecki.pl/efektywnosc-programow-rynku-pracy-realizowanych-w-2024-roku/
- Grójec: 13 osób w naborze z maja 2025 r. https://grojec.praca.gov.pl/strona-glowna/-/asset_publisher/Qat7ebECUfDp/content/przyznanie-dofinansowan-na-rozpoczecie-dzialalnosci-gospodarczej-dla-13-osob-bezrobotnych-
- Warszawa, jedno zadanie w 2024 r.: 60 uczestników https://warszawa.praca.gov.pl/-/23068863-nabor-wnioskow-o-przyznanie-jednorazowo-srodkow-na-podjecie-dzialalnosci-gospodarczej
- Jesień 2026: Łódź – pieniądze na ok. 9 wniosków; Bydgoszcz – nabór uzupełniający na 10 wniosków; Gryfino – nabór zamykany po 4 wnioskach (linki w pytaniu 4).

Liczba "ponad 500 wniosków, 70 dotacji" z pierwszego przeglądu (Warszawa, marzec 2025) pozostaje niepotwierdzona. Nie używaj jej w reklamie.

### 2. Czy nowa ustawa albo praca.gov.pl ujednoliciły wniosek? Czy urzędy w 2026 r. mają nadal własne druki?

**Status: zweryfikowane – urzędy nadal mają własne druki, regulaminy i kryteria. Jednego krajowego formularza nie ma.**

- Podstawą jest ustawa z 20 marca 2025 r. o rynku pracy i służbach zatrudnienia, obowiązująca od 1 czerwca 2025 r. https://www.infor.pl/twoje-pieniadze/swiadczenia/7048722,dofinansowanie-z-pup-do-dzialalnosci-gospodarczej-na-podstawie-nowych.html ; urzędy wydały po niej własne regulaminy, np. Myszków (Dz.U. 2025 poz. 620 jako podstawa) https://myszkow.praca.gov.pl/documents/d/powiatowy-urzad-pracy-w-myszkowie/regulamin-w-sprawie-przyznania-jednorazowych-srodkow-na-podjecie-dzialalnosci-gospodarczej-od-01-06-2025
- Własne druki na 2026 r.:
  - Poznań – plik Word "Wniosek o przyznanie jednorazowo środków na podjęcie działalności gospodarczej 2026" https://poznan.praca.gov.pl/dla-bezrobotnych-i-poszukujacych-pracy/formy-wsparcia/dofinansowanie-podjecia-dzialalnosci-gospodarczej
  - Łódź – własny druk na 23 strony, osobna wersja dla Funduszu Pracy i osobna dla projektu unijnego, zasady "obowiązujące od 09 marca 2026" https://lodz.praca.gov.pl/documents/d/powiatowy-urzad-pracy-w-lodzi/1-wniosek-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-fp-2026 oraz https://lodz.praca.gov.pl/documents/d/powiatowy-urzad-pracy-w-lodzi/1-wniosek-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-2026-efs-pdf
  - Puławy – obowiązuje wersja druku "Wn-DOT-202602" (czyli wersje zmieniają się w ciągu roku) https://pulawy.praca.gov.pl/-/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-2026.02
  - Nowy Dwór Gdański – własny druk na 2026 r. https://ndg.praca.gov.pl/documents/2122840/4170071/wniosek+o+dofinansowanie+podj%C4%99cia+DG+2026r.pdf/3bcafd5a-9808-22fb-8341-20be6c32944b?t=1772451054479
- Składanie elektroniczne istnieje, ale to tylko "koperta": wniosek urzędu wysyła się jako załącznik przez praca.gov.pl (moduł "Pismo do urzędu", PSZ-PU) albo e-Doręczenia, z podpisem kwalifikowanym lub profilem zaufanym. To nie jest jeden formularz krajowy. https://szczecin.praca.gov.pl/-/12920658-instrukcja-wyslania-wniosku-o-przyznanie-jednorazowo-srodkow-na-podjecie-dzialalnosci-gospodarczej , https://gdynia.praca.gov.pl/formy-aktywizacji/dofinansowanie-podjecia-dzialalnosci-gospodarczej
- Kwota maksymalna to 6-krotność przeciętnego wynagrodzenia i zmienia się co kwartał: 57 377,28 zł (1.06-31.08.2026), 55 398,78 zł (1.09-30.11.2026), 55 902,06 zł (od 1.12.2026) (częściowo – dane z serwisu komercyjnego) https://biznesplany24.pl/1-kwota-dotacji/ . Urzędy często dają mniej: Opole maks. 33 000 zł (link wyżej).

**Ryzyko na przyszłość (niezweryfikowane):** dla innej formy wsparcia, KFS, ministerstwo już wprowadziło jeden elektroniczny formularz PSZ-KFS na praca.gov.pl (pytanie 7). Jeśli zrobi to samo z dotacjami, Twój wyróżnik "pod konkretny urząd" znika z dnia na dzień. Nie znalazłem zapowiedzi takiej zmiany, ale też jej nie szukałem osobnym zapytaniem.

### 3. Konkurencja i darmowe substytuty

**Status: zweryfikowane co do istnienia i cen; niezweryfikowane co do sprzedaży (żaden sprzedawca nie pokazał liczb, opinii nie znalazłem).**

Pełna tabela jest w sekcji "Konkurencja". Najważniejsze wnioski:

- **Twój punkt cenowy i Twój pomysł są zajęte.** gotowebiznesplany.pl: komplet 199 zł (PDF + Word + Excel), "System AI do wniosku i biznesplanu" 100 zł, razem 299 zł. System AI to "przewodnik w 18 krokach z gotowymi poleceniami i plikami do Twojego czatu (ChatGPT albo Claude)". Sklep zastrzega, że wniosku klienta nie sprawdza. https://www.gotowebiznesplany.pl/wzor/biznesplan-uslugi-grawerskie/
- **Generator online już jest:** MYBIZPLAN https://eformator.com/ (247-497 zł, ceny z pierwszego przeglądu).
- **Strony "per urząd" już są:** biznesplany24.pl ma podstrony dla urzędów (np. https://biznesplany24.pl/pup-poznan-dofinansowanie-na-otwarcie-firmy/ , https://biznesplany24.pl/pup-pultusk-dotacja-na-podjecie-dzialalnosci/ ) i kategorię z terminami naborów https://biznesplany24.pl/category/nabor-wnioskow-o-dotacje-terminy/ . atlasdotacji.pl ma strony pojedynczych naborów, wyglądające na generowane automatycznie https://atlasdotacji.pl/nabory/pupg-a21634794662 . Są też strony lokalne, np. https://wadowice24.pl/pieniadze/dotacja-z-pup-wadowice-2026-jak-dostac-pieniadze-na-firme/ . Twój generator stron SEO nie daje tu przewagi – ktoś już to zrobił.
- **Wzory "z konkretnych urzędów" kosztują 39,90-44,90 zł:** https://wzorybiznesplanu.pl/salon-kosmetyczny.html , https://wzorybiznesplanu.pl/komis-wzor-wniosku.html
- **Pisanie na zamówienie pod regulamin urzędu:** https://dofinansowaniepup.pl/ ; widełki rynku od 30-50 zł za wzór do ok. 2 000 zł za usługę https://www.krb.edu.pl/ile-kosztuje-wniosek-o-dotacje-z-pup/
- **Otwarty kod:** generator na Claude API z mapowaniem pól formularza, arkuszem finansowym, kontrolą jakości i eksportem DOCX https://github.com/jakublesniak1510-gif/Biznesplan-do-dotacji-z-Urz-du-Pracy . Autor sam pisze, że jakość tekstów jest "do sprawdzenia". Znaczenie: bariera wejścia jest zerowa.

**Darmowe substytuty:**

- Druk wniosku, regulamin i kryteria są za darmo na stronie każdego urzędu (linki w pytaniu 2) (zweryfikowane).
- biznesplany24.pl rozdaje darmowy poradnik PDF, już 6. wydanie (2026) https://biznesplany24.pl/wp-content/uploads/2025/12/Dotacje-z-PUP-2026-poradnik-edycja-6.pdf (zweryfikowane, że istnieje).
- Gotowego, darmowego, wypełnionego wzoru w wynikach nie znalazłem – wyniki prowadziły do płatnych sklepów (częściowo; to dobra wiadomość dla sprzedawców).
- Poleceń do ChatGPT krążących na grupach na Facebooku nie udało mi się potwierdzić ani wykluczyć (niezweryfikowane – wyszukiwarka nie sięga do grup).
- **Moja ocena substytucji (niezweryfikowane, rozumowanie):** osoba, która umie wgrać druk urzędu do ChatGPT lub Claude, dostanie wypełniony szkic za darmo w godzinę-dwie. To nie jest "10 minut", ale nie ma tu twardej blokady (brak integracji, brak danych niedostępnych dla czatu, brak wymogu formatu, którego czat nie obsłuży). Zostaje tylko wygoda, strach przed błędem formalnym i brak umiejętności. To słabszy powód niż te, których wymaga Twoja reguła substytucji. Sygnał z rynku: konkurent wycenia sam "system AI" na 100 zł.

### 4. Sezonowość: kiedy są nabory, ile rund, jak szybko kończą się pieniądze?

**Status: zweryfikowane na przykładach z 2026 r. – wiele krótkich rund w roku, nie tylko styczeń-marzec. Pieniądze kończą się w dniach, nie miesiącach.**

- Główna fala luty-kwiecień: Zielona Góra 2-6 lutego i 28-29 kwietnia 2026 https://zielonagora.praca.gov.pl/strona-glowna/-/asset_publisher/Qat7ebECUfDp/content/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-1 ; Rzeszów 5-6 marca 2026 https://rzeszow.praca.gov.pl/rynek-pracy/aktualnosci/-/asset_publisher/8VCc6CLiHUaO/content/nabor-wnioskow-o-przyznanie-dofinansowania-podjecia-dzialalnosci-gospodarczej ; Warszawa 18-22 marca 2024 (link w pytaniu 1).
- Wstrzymania: Poznań wstrzymał przyjmowanie wniosków "z powodu pozyskania wystarczającej liczby wniosków" – w streszczeniach pojawiły się dwie daty, 11 kwietnia 2026 i 15 września 2026 (strona ma niespójne daty, sprawdź sam) https://poznan.praca.gov.pl/dla-bezrobotnych-i-poszukujacych-pracy/formy-wsparcia/dofinansowanie-podjecia-dzialalnosci-gospodarczej
- Jesienne dogrywki, bardzo małe:
  - Gdynia: 5-6 listopada 2026 (dwa dni) https://gdynia.praca.gov.pl/formy-aktywizacji/dofinansowanie-podjecia-dzialalnosci-gospodarczej
  - Bydgoszcz: nabór uzupełniający na 10 wniosków, 2-6 listopada 2026, po telefonicznym umówieniu wizyty https://bydgoszcz.praca.gov.pl/-/126358-srodki-na-podjecie-dzialalnosci-gospodarczej
  - Łódź: od 17 listopada 2026, pieniądze na ok. 9 wniosków https://lodz.praca.gov.pl/-/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-w-ramach-projektu-lodz-aktywizuje-zawodowo-iv
  - Gryfino: 10-18 listopada 2026, z zamknięciem po wpływie 4 wniosków https://gryfino.praca.gov.pl/-/i-konkurs-wnioskow-srodki-na-podjecie-dzialalnosci-gospodarczej-dla-osob-bezrobotnych-w-wieku-30-lat-i-wiecej-fp-2026-skopiuj-
  - Legnica: "ostatni nabór w 2026 roku", 23-30 listopada https://powiat-legnicki.eu/4480-ostatni-nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-w-2026-roku

**Co z tego wynika (rozumowanie):**

- Dobra strona: popyt nie znika całkiem po marcu; ludzie przygotowują wniosek "na zapas", bo okno to 2-5 dni.
- Zła strona: okna są tak krótkie i tak małe, że klient kupuje w panice na kilka dni przed terminem. To oznacza pytania "na już" i reklamy, które trzeba włączać i wyłączać pod konkretne nabory. To nie jest pasywne.
- Test reklamowy w grudniu da fałszywe "nie". Sensowne okno testu: od ogłoszeń pierwszych naborów 2027 (zwykle koniec stycznia-marzec; częściowo, na podstawie dat z 2026 r.).

### 5. Prawo i odpowiedzialność

**Status: częściowo. Nie znalazłem zakazu ani kar, ale nie znalazłem też przepisu, który wprost to rozstrzyga.**

- **Czy wolno odpłatnie przygotowywać wnioski?** Nie znalazłem żadnego ograniczenia. Usługa jest powszechnie i jawnie sprzedawana (https://dofinansowaniepup.pl/ , https://www.krb.edu.pl/ile-kosztuje-wniosek-o-dotacje-z-pup/ ). To dowód pośredni, nie analiza prawna (częściowo). Nie jest to zawód regulowany (niezweryfikowane, z pamięci).
- **Czy urzędy karzą za biznesplan z AI albo kupiony?** Nie znalazłem żadnego źródła, które mówi, że urzędy wykrywają AI albo odrzucają wniosek za samo pochodzenie tekstu (częściowo – brak dowodu to nie dowód braku). Ryzyko leży w treści: plan ogólny, bez liczb, z nietrafionym kodem PKD albo niezgodny z lokalnymi kryteriami odpada. Stary wątek na forum opisuje odrzucenie skopiowanego planu https://bizneston.pl/viewtopic.php?f=22&t=767 . Uwaga: większość stron ostrzegających przed "gotowcami" to sprzedawcy pisania na zamówienie, więc mają w tym interes.
- **Koszt zakupu nie jest kosztem dotacji.** Według poradnika biznesplany24.pl środków z dotacji nie można przeznaczyć na przygotowanie wniosku i biznesplanu (częściowo – dwa streszczenia tego samego poradnika różniły się w tym punkcie) https://biznesplany24.pl/wp-content/uploads/2025/12/Dotacje-z-PUP-2026-poradnik-edycja-6.pdf . Czyli płaci bezrobotny z własnej kieszeni.
- **Prawo konsumenta – zwrot w 14 dni.** Klient kupujący na odległość ma 14 dni na odstąpienie, także przy treściach cyfrowych. Traci to prawo tylko wtedy, gdy łącznie: został poinformowany o utracie prawa, przyjął to do wiadomości, wyraził wyraźną zgodę na dostarczenie przed upływem 14 dni, a Ty wysłałeś mu potwierdzenie umowy i tej zgody. Sam zapis w regulaminie "nie przyjmujemy zwrotów" nie wystarcza (zweryfikowane w opracowaniach, nie w tekście ustawy) https://www.ifirma.pl/blog/zwrot-produktow-cyfrowych-w-sklepie-internetowym-czy-mozna-zwrocic-kurs-online-lub-e-book/ ; przewodnik UOKiK https://prawakonsumenta.uokik.gov.pl/pliki/rewolucja-konsumencka-2023-przewodnik-po-zmianach-w-prawie-konsumenckim.pdf ; tekst ustawy (prawdopodobnie tekst jednolity z 2026 r., sprawdź) https://www.prawo.pl/akty/dz-u-2026-1244-t-j,18105223.html
- **Reklamacja "niezgodności z umową" (z pamięci, niezweryfikowane):** od 2023 r. konsument może reklamować treść cyfrową niezgodną z umową. Jeśli sprzedasz "komplet pod urząd X", a druk okaże się nieaktualny, klient ma podstawę do zwrotu pieniędzy. Przy drukach zmieniających się z naborem to realne ryzyko.
- **Co grozi sprzedawcy, gdy dotacja zostanie odmówiona?** Jeśli nie obiecujesz skuteczności – prawnie niewiele (niezweryfikowane, rozumowanie). Konkurenci zastrzegają to wprost ("profesjonalnie przygotowany biznesplan nie gwarantuje przyznania dofinansowania" – https://biznesplany24.pl/ ). Praktycznie grożą Ci: żądania zwrotu, spory o płatność kartą, złe opinie. Nie wolno Ci reklamować się "skutecznością X%" bez dowodu.
- **Dane osobowe (rozumowanie):** druk zawiera PESEL, adres, historię zatrudnienia, czasem dane poręczycieli. Jeśli konfigurator to przetwarza, potrzebujesz polityki prywatności i umowy powierzenia z dostawcą modelu AI. Bezpieczniej: pola osobowe klient wypełnia sam w gotowym pliku.
- **Oświadczenia pod odpowiedzialnością karną (rozumowanie):** wnioskodawca podpisuje oświadczenia i potem umowę z zabezpieczeniem. Nie generuj za niego oświadczeń; zostaw je puste z instrukcją.

### 6. Ekonomia reklam

**Status: niezweryfikowane. Nie mam ani wolumenów, ani cen kliknięć, ani widoku reklam.**

- Nie wiem, czy konkurenci kupują reklamy na te frazy. Sprawdź to ręcznie w trybie incognito (5 minut).
- Nie znalazłem żadnej wskazówki o koszcie kliknięcia.
- Wyliczenie progu opłacalności jest w sekcji "Ekonomia". W skrócie (szacunek): przy cenie 199 zł i kliknięciu za 1,50 zł potrzebujesz, żeby kupował co najmniej 1 na 100 klikających tylko po to, żeby wyjść na zero; przy 129 zł – 1,5 na 100. Żeby zarobić, potrzeba dwa razy tyle.
- **Strukturalna słabość (rozumowanie):** na frazy typu "biznesplan do urzędu pracy" mogą licytować firmy, które sprzedają pisanie wniosku za 400-2 000 zł (https://www.krb.edu.pl/ile-kosztuje-wniosek-o-dotacje-z-pup/ ). Ich klient jest wart 3-10 razy więcej niż Twój, więc stać je na droższe kliknięcie.
- Cena 129 zł jest moim zdaniem za niska na reklamy. Jeśli w ogóle, to 199 zł.

### 7. Czy jest lepszy sąsiedni produkt na tym samym silniku?

**Status: częściowo. Największy i najbardziej powtarzalny sąsiad to KFS, ale nie przechodzi Twoich reguł dystrybucji. Żaden sąsiad nie jest wyraźnie lepszy.**

- **KFS (Krajowy Fundusz Szkoleniowy) – wnioski pracodawców, co roku.**
  - Budżet 2026: 419 591 tys. zł, z czego 417 493 tys. zł dla 16 wojewódzkich urzędów pracy (zweryfikowane; liczba z jednej z tych dwóch stron) https://psz.praca.gov.pl/kfs-2026 , https://kik.edu.pl/aktualnosci/kfs-2026-sprawdz-ile-wynosi-budzet-i-kto-moze-otrzymac-dofinansowanie/
  - Budżet 2027: 421 600 tys. zł (częściowo – serwis komercyjny) https://na-szkolenie.pl/dofinansowanie-szkolenia-kfs/ . Czyli KFS, inaczej niż dotacje, nie został obcięty.
  - Popyt: w jednym naborze w Warszawie (marzec-kwiecień 2026) wpłynęło 927 wniosków na 19 435 441,38 zł przy limicie 15 888 084,48 zł (zweryfikowane) https://psz.praca.gov.pl/web/8188476/kfs-2026
  - Kupujący to firma (faktura VAT, wraca co roku) – lepsze niż bezrobotny płacący raz.
  - **Ale dwa powody, dla których to nie działa dla Ciebie:** (1) wniosek składa się wyłącznie elektronicznie na jednolitym formularzu PSZ-KFS na praca.gov.pl, więc nie ma przewagi "pod konkretny urząd" (częściowo – blogi firm szkoleniowych; jedno starsze źródło twierdzi inaczej) https://wektorwiedzy.pl/blog/kfs-2027-priorytety-plan-wydatkowania-i-zmiany/ , https://eitt.pl/baza-wiedzy/kfs-2027-cztery-priorytety-i-nowe-zasady-finansowania-szkolen/ ; (2) firmy szkoleniowe wypełniają wnioski za darmo, bo zarabiają na szkoleniu: "Nie pobieramy żadnych opłat za wypełnianie wniosków" https://pkfszkolenia.pl/baza-wiedzy/kfs , podobnie https://odnova.org.pl/dofinansowania-kfs/ i https://zdz-plock.com.pl/konsultacje-i-pomoc-przy-wypelnianiu-wnioskow-do-krajowego-funduszu-szkoleniowego/ (zweryfikowane). Cena odniesienia to zero. Jest też już serwis https://wniosek-kfs.pl/ .
  - Jedyny sensowny wariant to narzędzie sprzedawane firmom szkoleniowym, a to wymaga sprzedaży bezpośredniej, której nie chcesz.
- **Pożyczka BGK "Pierwszy biznes – Wsparcie w starcie":** blisko 7 tys. pożyczek na 511 mln zł przez 10 lat (do I kw. 2024), czyli ok. 700 rocznie (zweryfikowane; dane stare) https://media.bgk.pl/komunikat-prasowy/bgk-podsumowal-10-lat-programu-pierwszy-biznes-wsparcie-w-starcie/ . Operatorzy wstrzymują nabory po wyczerpaniu limitu https://www.pfp.com.pl/pozyczki/pierwszy-biznes-wsparcie-w-starcie-pozyczka-na-samozatrudnienie_1/ . Za mały rynek. Martwe.
- **PFRON (dotacja dla osób z niepełnosprawnością):** maks. 138 496,95 zł (częściowo) https://up.podlasie.pl/dotacje/ . Liczby beneficjentów nie znalazłem (niezweryfikowane). Wyższa stawka, ale mała grupa i wrażliwy klient. Co najwyżej dodatek, nie osobny produkt.
- **Refundacja wyposażenia stanowiska pracy (dla pracodawców):** finansowana z tego samego, obciętego Funduszu Pracy. Nie badałem osobno (niezweryfikowane). W Lubuskiem efektywność tej formy to 92,56% wobec 97,06% dla dotacji https://lubuskie.pl/wiadomosci/25876/ktore-formy-aktywizacji-najlepiej-wspieraja-bezrobotnych-wojewod – to mówi o skuteczności formy, nie o popycie na wzory.
- **Dotacje unijne na start:** nie znalazłem aktualnej listy (niezweryfikowane). Część naborów w urzędach pracy to w praktyce projekty unijne z osobnym drukiem (np. Łódź, link w pytaniu 2), więc ten sam silnik je obsłuży – ale to dodatkowe druki do utrzymania, a nie nowy rynek.
- **ARiMR (rolnicy):** nie badałem – zabrakło wyszukiwań (niezweryfikowane). Rozumowanie: większe kwoty, ale biznesplany robią tam doradcy rolniczy i wymagana jest wiedza branżowa. Nie dla Ciebie.

**Najlepsza podnisza, uczciwie:** żadna z sąsiednich nie jest lepsza po przyłożeniu Twoich reguł. KFS jest większy i powtarzalny, ale kanał zajęły firmy szkoleniowe dające to za darmo. Jeśli zostajesz w tym temacie, to przy dotacjach PUP w wąskim wariancie opisanym niżej.

### 8. Frazy zakupowe do sprawdzenia

Pełna lista jest w sekcji "Frazy do sprawdzenia w Planerze slow kluczowych". Status: niezweryfikowane – nie znam wolumenu żadnej z nich.

---

## Konkurencja

Ceny i opisy pochodzą ze streszczeń wyników (ten przegląd i pierwszy). "Trakcja" = jakikolwiek widoczny dowód sprzedaży. Nie znalazłem go u nikogo.

| Nazwa | Cena | Widoczna trakcja | Słabość | Link |
|---|---|---|---|---|
| gotowebiznesplany.pl | komplet 199 zł; "System AI" 100 zł; razem 299 zł | brak danych; ma wiele stron branżowych "2026/2027" | sam pisze, że wniosku klienta nie sprawdza; klient sam pracuje w czacie; nie pod konkretny urząd | https://www.gotowebiznesplany.pl/wzor/biznesplan-uslugi-grawerskie/ |
| MYBIZPLAN (eformator.com) | wniosek 247 zł, biznesplan PUP 297 zł, pełny 497 zł (z pierwszego przeglądu) | brak danych | drogo dla bezrobotnego; dopasowanie do druku urzędu niepotwierdzone | https://eformator.com/ |
| biznesplany24.pl | wzory od 29 zł; pisanie na zamówienie 1 290 zł (z pierwszego przeglądu) | 6. wydanie darmowego poradnika, strony per urząd, kalendarz naborów, osobny sklep – wygląda na wieloletniego lidera treści; liczb sprzedaży brak | wzór trzeba samemu przerobić; usługa droga | https://biznesplany24.pl/ , https://sklep.biznesplany24.pl/biznesplan/firma-remontowo-budowlana/ |
| wzorybiznesplanu.pl | 39,90-44,90 zł za przykład | brak danych | statyczne przykłady z konkretnych urzędów, aktualność nieznana | https://wzorybiznesplanu.pl/pl/index/5 |
| biznesnagotowo.pl | 64,99 zł (z pierwszego przeglądu) | brak danych | statyczny PDF | https://biznesnagotowo.pl/dotacje-z-urzedu-pracy |
| dotacje-z-pup.pl | nie widziałem | brak danych | gotowce do samodzielnej przeróbki | https://dotacje-z-pup.pl/gotowe-biznesplany/ |
| bizplanner.pl | nie widziałem | brak danych; dużo treści poradnikowych na 2026 | gotowce | https://bizplanner.pl/gotowy-biznes-plan-na-dotacje-pup/ |
| pierwszadotacja.net | nie widziałem | brak danych | gotowce | https://pierwszadotacja.net/wzory-gotowych-biznes-planow/ |
| dofinansowaniepup.pl | nie widziałem (usługa pisania pod regulamin urzędu) | brak danych | praca ręczna, zapewne kilkaset zł | https://dofinansowaniepup.pl/ |
| Rynek usług pisania (przegląd) | od 30-50 zł za wzór do ok. 2 000 zł za usługę | – | – | https://www.krb.edu.pl/ile-kosztuje-wniosek-o-dotacje-z-pup/ |
| atlasdotacji.pl | treść + strony pojedynczych naborów (model zarobku nieznany) | brak danych | nie sprzedaje wypełnionego wniosku (niepotwierdzone) | https://atlasdotacji.pl/nabory/pupg-a21634794662 |
| Otwarty generator na GitHubie (Claude API) | 0 zł + własny klucz API | brak danych | wymaga umiejętności technicznych; jakość "do sprawdzenia" według autora | https://github.com/jakublesniak1510-gif/Biznesplan-do-dotacji-z-Urz-du-Pracy |
| Allegro (wzory) | 29-44,90 zł (z pierwszego przeglądu, część ofert archiwalna) | brak danych | statyczne pliki | https://allegro.pl/oferta/biznesplan-biuro-rachunkowe-wzor-do-dotacji-13273683019 |
| Darmowe: druk i regulamin urzędu + ChatGPT/Claude | 0 zł | – | wymaga 1-2 godzin i umiejętności pracy z czatem (szacunek) | np. https://poznan.praca.gov.pl/dokumenty-do-pobrania |

---

## Najlepszy wariant produktu

Jeśli mimo wszystko chcesz to testować, najostrzejsza wersja wygląda tak (to nadal wariant słabego pomysłu):

- **Dla kogo:** osoba zarejestrowana jako bezrobotna w jednym z 10-15 dużych urzędów, które właśnie ogłosiły nabór. Nie "cała Polska", nie 340 urzędów.
- **Co dostaje:** wypełniony aktualny druk swojego urzędu (wersja z bieżącego naboru) + biznesplan + tabele finansowe, które się sumują i mieszczą w limicie tego urzędu + lista załączników + lista "za co ten urząd daje punkty". Pola z danymi osobowymi i oświadczenia zostają puste do samodzielnego wpisania.
- **Wyróżnik wobec gotowebiznesplany.pl i eformator.com:** "to jest druk Twojego urzędu z naboru 2027, a nie ogólny wzór" oraz automatyczna kontrola formalna (kwoty, limity, komplet załączników). Nic więcej Cię nie odróżnia.
- **Cena:** 199 zł jednorazowo. Nie 129 zł – przy 23% VAT i reklamach 129 zł się nie spina (wyliczenie niżej). Bez abonamentu. Darmowa część to tylko demo: lista załączników i kryteriów dla danego urzędu.
- **Kanał:** Google Ads na frazy zakupowe oraz frazy z nazwą urzędu, włączane tylko w tygodniach ogłoszonych naborów. Strony per urząd traktuj jako strony docelowe dla reklam, nie jako źródło darmowego ruchu – konkurenci mają lata przewagi w treści, a do sezonu 2027 zostało za mało czasu, żeby nowa domena się przebiła (rozumowanie).
- **Czego nie robić:** nie obiecywać skuteczności; nie obsługiwać urzędu, którego aktualnego druku nie masz; nie budować aplikacji przed testem.

---

## Ekonomia (z zaznaczeniem szacunkow)

**Na jednej sprzedaży (wszystko szacunek poza arytmetyką VAT):**

| Pozycja | Cena 199 zł | Cena 129 zł |
|---|---|---|
| Netto po 23% VAT | 161,79 zł | 104,88 zł |
| Prowizja płatności (szacunek, ok. 2% + 1 zł, z pamięci) | ok. 5 zł | ok. 3,60 zł |
| Koszt modelu AI na jeden komplet (szacunek) | ok. 1-3 zł | ok. 1-3 zł |
| Zostaje przed reklamą (szacunek) | ok. 154 zł | ok. 99 zł |

Uwaga: wielu małych konkurentów to zapewne jednoosobowe firmy zwolnione z VAT, więc z tej samej ceny zostaje im o 23% więcej (niezweryfikowane, rozumowanie).

**Ile osób z kliknięć musi kupić, żeby wyjść na zero (arytmetyka na moich szacunkach):**

| Koszt kliknięcia (nieznany!) | Przy 199 zł | Przy 129 zł |
|---|---|---|
| 1,00 zł | 0,65% | 1,0% |
| 1,50 zł | 1,0% | 1,5% |
| 2,50 zł | 1,6% | 2,5% |

Żeby połowa marży została Tobie, te odsetki trzeba podwoić. Rzeczywistego kosztu kliknięcia i rzeczywistej konwersji nie znam – to ma pokazać test.

**Wielkość rynku i Twój kawałek (cały łańcuch to szacunek):**

- dotacji w 2027 r.: ok. 15-20 tys. (szacunek z pytania 1);
- wniosków 2-4 razy więcej: ok. 40-80 tys.;
- 5-10% składających kupuje jakąkolwiek płatną pomoc: ok. 2-8 tys. zakupów rocznie, dzielonych między co najmniej 10 sprzedawców;
- nowy gracz z 3-5% udziału: ok. 60-400 sprzedaży rocznie;
- przy ok. 154 zł przed reklamą i koszcie pozyskania 60-100 zł zostaje ok. 55-95 zł na sprzedaży;
- **wynik: ok. 3 000-38 000 zł rocznie, czyli ok. 300-3 200 zł miesięcznie średnio; środek przedziału to ok. 1 000 zł miesięcznie**, z czego większość w lutym-kwietniu.

Każde z czterech założeń może być błędne o 100%. Najmniej pewne: odsetek kupujących płatną pomoc (nie mam żadnego źródła).

**Koszty stałe:** hosting ok. 0 zł (Twój obecny stos), domena kilkadziesiąt zł rocznie (szacunek).

---

## Zakres budowy i pasywnosc

**Zakres wersji 1 (bez pisania kodu teraz – to tylko opis):**

1. Strona docelowa per urząd dla 10-15 urzędów.
2. Kreator: 20-30 pytań o planowaną firmę.
3. Dla każdego urzędu: aktualny druk przerobiony na szablon z polami do wypełnienia (to jest najcięższa część).
4. Generowanie treści przez model AI + automatyczne sprawdzenie liczb (suma wydatków = kwota wniosku, kwota mieści się w limicie urzędu, tabele się zgadzają).
5. Eksport do DOCX, płatność jednorazowa Stripe, wysyłka e-mailem, zgoda konsumenta na natychmiastowe dostarczenie.

**Czy zmieścisz się w 2-3 tygodniach? Raczej nie w pełnym zakresie (szacunek).** Druk potrafi mieć 23 strony z tabelami (Łódź). Przerobienie jednego druku na szablon i sprawdzenie wyniku to szacunkowo 2-4 godziny z agentem AI. Dla 15 urzędów to 30-60 godzin samych szablonów, czyli 4-10 tygodni przy 5-8 h tygodniowo. Realna wersja na 2-3 tygodnie to 3-5 urzędów albo realizacja ręczna (Ty + Claude) bez aplikacji.

**Pasywność – tu pomysł łamie Twoją regułę w sezonie (szacunek):**

- luty-kwiecień: 5-10 h tygodniowo (śledzenie ogłoszeń naborów, aktualizacja druków przy każdej nowej wersji, pytania klientów "na jutro", zwroty, włączanie i wyłączanie reklam);
- reszta roku: 0-1 h tygodniowo plus pojedyncze jesienne dogrywki;
- średnio w roku ok. 2-3 h tygodniowo, ale nierówno. Jeśli Twoje doradztwo ma szczyt w I kwartale, to się zderzy.

Nie jest to doradztwo regulowane ani wsparcie 24/7, ale klient w panice przed dwudniowym naborem oczekuje odpowiedzi w godzinach.

---

## Ryzyka

Od największego:

1. **Kurczący się rynek.** Budżet 2026 obcięty o ok. 40%, 2027 zamrożony (pytanie 1). Mniej naborów to mniej okazji do zakupu. Wchodziłbyś w rynek w dołku, bez wiedzy, czy i kiedy się odbije.
2. **Brak dowodu na wolumen wyszukiwań.** Pierwsza połowa R4 jest nadal niezweryfikowana. Dokładnie tak zaczął się disclosekit.
3. **Mocny darmowy substytut i klon w tej samej cenie.** ChatGPT/Claude + darmowy druk; gotowebiznesplany.pl za 199/299 zł; otwarty generator na GitHubie.
4. **Reklamy mogą się nie spinać.** Jednorazowe 199 zł brutto, VAT 23%, konkurenci z koszykiem 400-2 000 zł na tych samych frazach.
5. **Utrzymanie druków.** Wersje zmieniają się z naborem. Nieaktualny druk = reklamacja i zła opinia.
6. **Jedna decyzja ministerstwa kasuje wyróżnik.** Jednolity e-formularz (jak PSZ-KFS) zrównałby Cię z każdym ogólnym generatorem.
7. **Klient i wizerunek.** Sprzedajesz osobom bezrobotnym dokument, po którym większość i tak może nie dostać pieniędzy (mało dotacji na urząd). Spodziewaj się żądań zwrotu i ostrych opinii. To też nie buduje marki PLAR wobec firm – brak synergii z PLAR Orders.
8. **Dane osobowe** w drukach (PESEL, poręczyciele) – dodatkowe obowiązki albo ograniczenie funkcji.
9. **SEO nie zdąży na sezon 2027** i przegrywa z wieloletnimi serwisami; treści informacyjne dodatkowo zjada podsumowanie AI w Google (z pierwszego przeglądu).
10. **Bezrobocie rośnie, ale to nie pomaga:** więcej chętnych przy mniejszej puli to większa konkurencja o dotację, a nie więcej dotacji. Czy to zwiększa chęć zapłaty za pomoc – nie wiem (niezweryfikowane).

---

## Najtanszy test checi zaplaty (R1) z progami

Trzy kroki. Każdy ma próg STOP. Nie przechodź dalej, jeśli poprzedni nie przeszedł.

**Krok 0 – Planer słów kluczowych (0 zł, 30 minut, możesz zrobić dziś).**

- Wklej listę fraz z następnej sekcji, lokalizacja: Polska, pokaż rozbicie miesięczne za 2026 r.
- PRZECHODZI: najlepsza fraza zakupowa ma co najmniej 1 000 wyszukiwań w lutym lub marcu 2026 ALBO co najmniej trzy frazy zakupowe mają po co najmniej 100; ORAZ stawka za górę strony (górny zakres) dla fraz zakupowych nie przekracza ok. 2,50 zł.
- STOP: nie spełnia. Koniec, zero wydanych pieniędzy.
- Frazy informacyjne ("dotacja z urzędu pracy", "ile wynosi dotacja") nie liczą się do progu.

**Krok 1 – ręczny przegląd wyników (0 zł, 1 godzina).**

- W oknie incognito wpisz 5 fraz zakupowych. Policz: ile reklam, kto je kupuje, ile stron sprzedażowych w pierwszej dziesiątce.
- PRZECHODZI: co najmniej 3 strony sprzedażowe w pierwszej dziesiątce i widać reklamy sprzedawców (to znaczy, że komuś się opłaca).
- Ostrzeżenie: jeśli reklamy kupują tylko firmy z usługą za 400 zł i więcej, Twoje 199 zł będzie przegrywać licytacje.
- Dodatkowo: poproś darmowy ChatGPT o wypełnienie druku jednego urzędu (wgraj plik). Jeśli wynik po godzinie jest "do złożenia", to Twój produkt nie ma racji bytu – STOP.

**Krok 2 – przedsprzedaż z realizacją ręczną (ok. 450 zł, czyli ok. 105 EUR – szacunek; tylko w tygodniach ogłoszonych naborów, czyli najwcześniej koniec stycznia-marzec 2027; NIE w grudniu).**

- Jedna strona dla 3 dużych urzędów z ogłoszonym naborem. Przycisk Stripe: "Wypełniony wniosek i biznesplan na druku Twojego urzędu, 199 zł, dostawa w 24 h, pełny zwrot, jeśli nie dostarczymy". Wymagana zgoda na natychmiastowe dostarczenie.
- Reklamy tylko na frazy zakupowe i frazy z nazwą urzędu, do 300 kliknięć.
- Zamówienia realizujesz ręcznie z Claude. Mierz czas na jedno zamówienie.
- **PRZECHODZI:** co najmniej 5 opłaconych zamówień z maksymalnie 300 kliknięć (czyli co najmniej 1,7%) ORAZ koszt reklamy na zamówienie nie większy niż 80 zł.
- **STOP:** 0-1 opłaconych zamówień po 300 kliknięciach albo po wydaniu 450 zł; albo średni koszt kliknięcia powyżej 2,50 zł.
- **Strefa szara (2-4 zamówienia):** jedna powtórka na innych 3 urzędach. Jeśli znowu poniżej 5 – STOP.
- Dodatkowy próg: jeśli ręczna realizacja jednego zamówienia zajmuje ponad 45 minut mimo pomocy Claude, automatyzacja będzie trudniejsza, niż zakładasz – policz to przed budową.
- Zapisy na listę e-mail nie liczą się jako dowód. Liczy się tylko wpłata.

---

## Frazy do sprawdzenia w Planerze slow kluczowych

**Zakupowe (te decydują o progu R4):**

- gotowy biznesplan do urzędu pracy
- gotowy biznesplan dotacja
- gotowy biznesplan pup
- biznesplan do urzędu pracy wzór
- biznesplan dotacja z urzędu pracy wzór
- wypełniony wniosek o dotację z urzędu pracy
- wniosek o dotację z urzędu pracy wzór
- wniosek o dofinansowanie podjęcia działalności gospodarczej wzór wypełniony
- napisanie biznesplanu cena
- ile kosztuje biznesplan do urzędu pracy
- pisanie biznesplanów do urzędu pracy
- pisanie wniosków o dotacje z urzędu pracy
- biznesplan na zamówienie
- biznesplan kupię
- generator biznesplanu
- biznesplan online
- biznesplan ai
- biznesplan chatgpt

**Pośrednie (ktoś szykuje wniosek, ale jeszcze nie kupuje):**

- biznesplan do urzędu pracy
- biznesplan pup
- jak napisać biznesplan do urzędu pracy
- jak wypełnić wniosek o dotację z urzędu pracy
- wniosek o dofinansowanie podjęcia działalności gospodarczej
- jednorazowe środki na podjęcie działalności gospodarczej
- wniosek o dotację z urzędu pracy

**Z nazwą urzędu (sprawdź dla 10 największych miast; podmień miasto):**

- dotacja urząd pracy warszawa
- dotacja pup kraków
- dofinansowanie urząd pracy wrocław
- nabór wniosków dotacja urząd pracy poznań 2027
- wniosek o dotację pup łódź
- dotacja na otwarcie firmy gdańsk urząd pracy

**Branżowe (tak sprzedają konkurenci):**

- biznesplan salon kosmetyczny wzór
- biznesplan firma remontowa wzór
- biznesplan firma sprzątająca wzór
- biznesplan mechanik samochodowy wzór
- biznesplan fryzjer dotacja
- biznesplan sklep internetowy dotacja

**Informacyjne (tylko dla orientacji w skali, nie do progu):**

- dotacja z urzędu pracy
- dotacja z urzędu pracy 2027
- dofinansowanie z urzędu pracy na otwarcie firmy
- dotacja na otwarcie firmy 2027
- ile wynosi dotacja z urzędu pracy

**Sąsiednie (żeby porównać skalę z KFS i resztą):**

- wniosek kfs wzór
- jak wypełnić wniosek kfs
- wniosek kfs 2027
- pomoc w wypełnieniu wniosku kfs
- wniosek o refundację kosztów wyposażenia stanowiska pracy wzór
- biznesplan wsparcie w starcie
- wniosek pfron działalność gospodarcza

---

## Otwarte pytania

1. Ile jest wyszukiwań fraz zakupowych w lutym-marcu i ile kosztuje kliknięcie? (Krok 0 – rozstrzyga większość sprawy.)
2. Ile dotacji faktycznie przyznano w 2025 i 2026 r. w skali kraju i ile wniosków złożono? Oficjalnej liczby nie znalazłem. Gdzie szukać: raport ministerstwa "Efektywność podstawowych form aktywizacji zawodowej" na gov.pl oraz sprawozdanie MRPiPS-02.
3. Jaki będzie ostateczny plan finansowy Funduszu Pracy na 2027 r. – czy zamrożenie się utrzyma?
4. Czy ministerstwo planuje jednolity e-formularz dla dotacji na podjęcie działalności (tak jak PSZ-KFS)?
5. Czy gotowebiznesplany.pl i eformator.com faktycznie sprzedają? Nie znalazłem opinii ani liczb. Sprawdź opinie Google, Trustpilot, daty rejestracji domen, obecność reklam.
6. Jak często duże urzędy zmieniają druk w ciągu roku? Mam jeden twardy przykład (Puławy, wersja z lutego 2026) i jeden pośredni (Łódź).
7. Czy darmowy ChatGPT/Claude z wgranym drukiem urzędu daje wynik "do złożenia"? Godzinny test własnoręczny.
8. Czy na grupach na Facebooku krążą darmowe polecenia i wypełnione wzory? Nie miałem do nich dostępu.
9. Czy koszt przygotowania wniosku na pewno nie może być pokryty z dotacji? Źródła były niejednoznaczne.
10. Sąsiedzi niezbadani z braku wyszukiwań: ARiMR, refundacja wyposażenia stanowiska pracy, liczba dotacji PFRON, lista regionalnych dotacji unijnych na start.
11. Liczba urzędów pracy "ok. 340" – z pamięci, niepotwierdzona.

---

## Zrodla

Wszystkie adresy pojawiły się w wynikach wyszukiwania z 2026-11-26. Znam je ze streszczeń, nie z otwartych stron.

**Liczby, budżet, cięcia**
- https://www.gov.pl/web/rodzina/informacja-o-wartosciach-wskaznikow-osiagnietych-przez-powiatowe-urzedy-pracy-w-2024-r
- https://www.gov.pl/attachment/c1c4b111-cd8d-4978-a622-a5694f013e96
- https://www.gov.pl/attachment/24681dbf-dcd6-4986-8d9a-3d769032fdd9
- https://www.gov.pl/attachment/1ef3a17b-7ae9-4951-a2b0-c8b024b65f5a
- https://edgp.gazetaprawna.pl/samorzad/samorzad-terytorialny-i-finanse/artykuly/11232999,mniej-pieniedzy-na-start-biznesu-mniej-naborow-w-urzedach-pracy.html
- https://edgp.gazetaprawna.pl/samorzad/samorzad-terytorialny-i-finanse/artykuly/11301788,mniej-pieniedzy-na-aktywizacje-bezrobotnych-minister-radzi-skorzystac.html
- https://edgp.gazetaprawna.pl/kadry-i-place/artykuly/11289414,urzedy-pracy-walcza-o-dodatkowe-pieniadze-na-aktywizacje-bezrobotnych.html
- https://www.zpp.pl/index.php/artykul/4150-zpp-domaga-sie-wyjasnien-w-sprawie-zamrozenia-srodkow-funduszu-pracy-na-2027-rok
- https://wartowiedziec.pl/polityka-spoleczna/81617-zpp-domaga-sie-wyjasnien-w-sprawie-zamrozenia-srodkow-funduszu-pracy-na-2027-rok
- https://wartowiedziec.pl/legislacja/31-komisja-wspolna-rzadu-i-samorzadu-terytorialnego/81722-powiatowe-urzedy-pracy-dalej-bez-wystarczajacych-srodkow-podsumowanie-sierpniowego-posiedzenia-plenarnego-kwrist
- https://wartowiedziec.pl/polityka-spoleczna/82034-konwent-dyrektorow-pup-krytycznie-o-funduszach-na-aktywizacje-bezrobotnych
- https://www.portalsamorzadowy.pl/praca/pomoc-dla-bezrobotnych-moze-zostac-ograniczona-powiaty-boja-sie-zamrozenia-finansowania,673004.html
- https://kutno.net.pl/lodzkie-i-centralna-polska/powiatowy-urzad-pracy-z-finansowym-paralizem-to-uderzy-w-mieszkancow/8SDPyfJWhCU8dzgd54ka
- https://czytajrzeszow.pl/?id=56569&idd=6&poz=ml0
- https://dofinansowaniepup.pl/dofinansowanie-na-otwarcie-firmy-2026/
- https://blankpaper.eu/w-2026-roku-trudniej-o-dotacje-z-urzedu-pracy/
- https://up.podlasie.pl/dotacje/
- https://www.bankier.pl/smart/dofinansowanie-z-urzedu-pracy-co-zrobic-zeby-uzyskac-bezzwrotne-dotacje-z-up
- https://atlasdotacji.pl/dotacje-z-urzedu-pracy
- https://lubuskie.pl/wiadomosci/25876/ktore-formy-aktywizacji-najlepiej-wspieraja-bezrobotnych-wojewod
- https://wysokomazowiecki.pl/efektywnosc-programow-rynku-pracy-realizowanych-w-2024-roku/

**Urzędy pracy: druki, nabory, regulaminy**
- https://poznan.praca.gov.pl/dla-bezrobotnych-i-poszukujacych-pracy/formy-wsparcia/dofinansowanie-podjecia-dzialalnosci-gospodarczej
- https://poznan.praca.gov.pl/dokumenty-do-pobrania
- https://lodz.praca.gov.pl/documents/d/powiatowy-urzad-pracy-w-lodzi/1-wniosek-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-fp-2026
- https://lodz.praca.gov.pl/documents/d/powiatowy-urzad-pracy-w-lodzi/1-wniosek-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-2026-efs-pdf
- https://lodz.praca.gov.pl/-/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-w-ramach-projektu-lodz-aktywizuje-zawodowo-iv
- https://pulawy.praca.gov.pl/-/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-2026.02
- https://ndg.praca.gov.pl/documents/2122840/4170071/wniosek+o+dofinansowanie+podj%C4%99cia+DG+2026r.pdf/3bcafd5a-9808-22fb-8341-20be6c32944b?t=1772451054479
- https://myszkow.praca.gov.pl/documents/d/powiatowy-urzad-pracy-w-myszkowie/regulamin-w-sprawie-przyznania-jednorazowych-srodkow-na-podjecie-dzialalnosci-gospodarczej-od-01-06-2025
- https://szczecin.praca.gov.pl/-/12920658-instrukcja-wyslania-wniosku-o-przyznanie-jednorazowo-srodkow-na-podjecie-dzialalnosci-gospodarczej
- https://gdynia.praca.gov.pl/formy-aktywizacji/dofinansowanie-podjecia-dzialalnosci-gospodarczej
- https://bydgoszcz.praca.gov.pl/-/126358-srodki-na-podjecie-dzialalnosci-gospodarczej
- https://gryfino.praca.gov.pl/-/i-konkurs-wnioskow-srodki-na-podjecie-dzialalnosci-gospodarczej-dla-osob-bezrobotnych-w-wieku-30-lat-i-wiecej-fp-2026-skopiuj-
- https://powiat-legnicki.eu/4480-ostatni-nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-w-2026-roku
- https://zielonagora.praca.gov.pl/strona-glowna/-/asset_publisher/Qat7ebECUfDp/content/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej-1
- https://rzeszow.praca.gov.pl/rynek-pracy/aktualnosci/-/asset_publisher/8VCc6CLiHUaO/content/nabor-wnioskow-o-przyznanie-dofinansowania-podjecia-dzialalnosci-gospodarczej
- https://opole.praca.gov.pl/strona-glowna/-/asset_publisher/O8lyjBAmtU97/content/23091563-nabor-wnioskow-o-przyznanie-jednorazowo-srodkow-na-podjecie-dzialalnosci-gospodarczej-przez-bezrobotnego
- https://grojec.praca.gov.pl/strona-glowna/-/asset_publisher/Qat7ebECUfDp/content/przyznanie-dofinansowan-na-rozpoczecie-dzialalnosci-gospodarczej-dla-13-osob-bezrobotnych-
- https://warszawa.praca.gov.pl/-/23068863-nabor-wnioskow-o-przyznanie-jednorazowo-srodkow-na-podjecie-dzialalnosci-gospodarczej
- https://wadowice.praca.gov.pl/strona-glowna/-/asset_publisher/Qat7ebECUfDp/content/nabor-wnioskow-o-dofinansowanie-podjecia-dzialalnosci-gospodarczej?p_r_p_assetEntryId=37285296
- https://www.infor.pl/twoje-pieniadze/swiadczenia/7048722,dofinansowanie-z-pup-do-dzialalnosci-gospodarczej-na-podstawie-nowych.html
- https://powroty.gov.pl/pl_PL/web/zielona-linia/-/dotacja-na-otwarcie-dzialalnosci-gospodarczej-z-urzedu-pracy.-jak-ja-uzyskac-w-swietle-nowych-przepisow-

**Konkurencja i substytuty**
- https://www.gotowebiznesplany.pl/wzor/biznesplan-uslugi-grawerskie/
- https://www.gotowebiznesplany.pl/wzor/biznesplan-sprzatanie-nieruchomosci-i-samochodow/
- https://eformator.com/
- https://biznesplany24.pl/
- https://biznesplany24.pl/1-kwota-dotacji/
- https://biznesplany24.pl/biznesplan-pup-wzory/
- https://biznesplany24.pl/pup-poznan-dofinansowanie-na-otwarcie-firmy/
- https://biznesplany24.pl/pup-pultusk-dotacja-na-podjecie-dzialalnosci/
- https://biznesplany24.pl/category/nabor-wnioskow-o-dotacje-terminy/
- https://biznesplany24.pl/biznesplan-zamowienie-wzory-doradztwo/
- https://biznesplany24.pl/wp-content/uploads/2025/12/Dotacje-z-PUP-2026-poradnik-edycja-6.pdf
- https://sklep.biznesplany24.pl/biznesplan/firma-remontowo-budowlana/
- https://wzorybiznesplanu.pl/pl/index/5
- https://wzorybiznesplanu.pl/salon-kosmetyczny.html
- https://wzorybiznesplanu.pl/komis-wzor-wniosku.html
- https://biznesnagotowo.pl/dotacje-z-urzedu-pracy
- https://dotacje-z-pup.pl/gotowe-biznesplany/
- https://bizplanner.pl/gotowy-biznes-plan-na-dotacje-pup/
- https://bizplanner.pl/gotowe-biznesplany-pod-dotacje/
- https://pierwszadotacja.net/wzory-gotowych-biznes-planow/
- https://dofinansowaniepup.pl/
- https://www.krb.edu.pl/ile-kosztuje-wniosek-o-dotacje-z-pup/
- https://atlasdotacji.pl/nabory/pupg-a21634794662
- https://wadowice24.pl/pieniadze/dotacja-z-pup-wadowice-2026-jak-dostac-pieniadze-na-firme/
- https://wnioski24.pl/dotacje-na-rozpoczecie-dzialalnosci-gospodarczej/
- https://github.com/jakublesniak1510-gif/Biznesplan-do-dotacji-z-Urz-du-Pracy
- https://mycompanypolska.pl/artykul/pulkownik-od-mysliwcow-f-35-zbudowal-ai-do-wnioskow-o-dotacje-wiekszosc-pracy-robia-za-niego-boty/21518
- https://bizneston.pl/viewtopic.php?f=22&t=767
- https://biznesplany.fachowa-porada.eu/biznesplan-zostal-odrzucony/
- https://allegro.pl/oferta/biznesplan-biuro-rachunkowe-wzor-do-dotacji-13273683019

**Prawo konsumenta**
- https://www.ifirma.pl/blog/zwrot-produktow-cyfrowych-w-sklepie-internetowym-czy-mozna-zwrocic-kurs-online-lub-e-book/
- https://www.ifirma.pl/blog/aktualnosci/umowa-o-dostarczeniu-tresci-cyfrowych-jako-element-regulaminu-sprzedazy-produktow-cyfrowych/
- https://prawakonsumenta.uokik.gov.pl/pliki/rewolucja-konsumencka-2023-przewodnik-po-zmianach-w-prawie-konsumenckim.pdf
- https://www.prawo.pl/akty/dz-u-2026-1244-t-j,18105223.html
- https://pro.rp.pl/prawo-w-firmie/art11867411-zakup-tresci-cyfrowych-a-odstapienie-od-umowy

**Sąsiednie programy**
- https://psz.praca.gov.pl/kfs-2026
- https://psz.praca.gov.pl/web/8188476/kfs-2026
- https://warszawa.praca.gov.pl/kfs-2027
- https://kik.edu.pl/aktualnosci/kfs-2026-sprawdz-ile-wynosi-budzet-i-kto-moze-otrzymac-dofinansowanie/
- https://na-szkolenie.pl/dofinansowanie-szkolenia-kfs/
- https://wektorwiedzy.pl/blog/kfs-2027-priorytety-plan-wydatkowania-i-zmiany/
- https://eitt.pl/baza-wiedzy/kfs-2027-cztery-priorytety-i-nowe-zasady-finansowania-szkolen/
- https://wniosek-kfs.pl/
- https://pkfszkolenia.pl/baza-wiedzy/kfs
- https://odnova.org.pl/dofinansowania-kfs/
- https://zdz-plock.com.pl/konsultacje-i-pomoc-przy-wypelnianiu-wnioskow-do-krajowego-funduszu-szkoleniowego/
- https://kfs.pl/
- https://media.bgk.pl/komunikat-prasowy/bgk-podsumowal-10-lat-programu-pierwszy-biznes-wsparcie-w-starcie/
- https://www.pfp.com.pl/pozyczki/pierwszy-biznes-wsparcie-w-starcie-pozyczka-na-samozatrudnienie_1/
- https://dotacje-online.pl/pierwszy-biznes-wsparcie-w-starcie/

**Kontekst z pierwszego przeglądu**
- /home/user/disclosekit-RIP/project-2/research/01-sweep/digital-products-templates.md
