# Deep-dive: Polska aplikacja w sklepie z aplikacjami e-commerce (Shopify PL i/lub Shoper App Store) - polowanie na lukę

Data badania: 2026-11-26. Slug: `polish-ecommerce-appstore-gap`.

## Jak czytać ten dokument (uczciwie o ograniczeniach)

- Wykonałem **26 wyszukiwań**. Dwa ostatnie (zarobki twórców aplikacji Shoper; płatności BLIK/Przelewy24/PayU oraz Opineo/Trusted Shops na Shopify) zostały odrzucone, bo skończył się wspólny limit wyszukiwań dla całego przebiegu. Nie obchodziłem limitu.
- **Nie mogłem otwierać stron.** Wszystkie liczby pochodzą ze streszczeń wyników wyszukiwania dla podanych adresów. Liczby opinii aplikacji różnią się między źródłami (pokazuję rozbieżności). Przed jakąkolwiek decyzją kliknij i potwierdź liczby oznaczone **[DO POTWIERDZENIA]**.
- Nie mam narzędzia do wolumenów słów kluczowych. **Nigdzie nie podaję liczby wyszukiwań.** Bramki R4 nie da się tu zaliczyć "na liczbach" - na końcu jest lista fraz do Planera słów kluczowych.
- Etykiety: **zweryfikowane** = fakt lub liczba z linkiem, **częściowo** = dowód pośredni, **niezweryfikowane** = moje rozumowanie. Moje własne strzały mają słowo **szacunek**.
- Z pamięci użytkownika (memory) nie wykorzystałem niczego - była pusta.

## Werdykt

**SŁABY (na granicy martwego). Nie znalazłem ani jednej luki, która ma jednocześnie słabego konkurenta i dowód popytu. Nie buduj tego bez nowego dowodu.**

Dlaczego, w pięciu punktach:

1. **Reguła, która wyszła z danych: "słaby konkurent = brak popytu, duży popyt = mocny konkurent".** Tam, gdzie polscy sprzedawcy naprawdę płacą, obecne aplikacje mają bardzo dobre oceny: InPost by Progus ma 112 opinii, w tym 110 pięciogwiazdkowych i zero ocen 1-2 gwiazdki ([listing](https://apps.shopify.com/inpost-4/reviews)); Fakturownia Integration ma 19 opinii, wszystkie na 5 ([listing](https://apps.shopify.com/fakturownia-integration/reviews)). Tam, gdzie konkurent jest słaby albo pusty, prawie nikt nie kupuje: wFirma od WP Desk ma 1 opinię ([listing](https://apps.shopify.com/wfirma-invoices/reviews)), iFirma od WP Desk ma 0 opinii ([listing](https://apps.shopify.com/ifirma)), Allegro od WP Desk ma 0 opinii pół roku po premierze 19.05.2026 ([listing](https://apps.shopify.com/allegro-od-wp-desk)), Ceneo Feed XML ma 3-4 opinie ([listing](https://apps.shopify.com/ceneo-feed-xml/reviews)). "Słaby wFirma od WP Desk" z pierwszego sweepu to nie luka, tylko pusta półka.
2. **Każda widoczna nisza "zgodność z prawem UE/PL" jest zalana klonami, często darmowymi.** Przycisk odstąpienia od umowy: ok. 10 aplikacji, kilka z darmowym planem ([przykład 1](https://apps.shopify.com/widerrufs-button-eu), [przykład 2](https://apps.shopify.com/eu-withdrawal-button-5)). GPSR: ok. 19 aplikacji, prawie wszystkie z zerem opinii ([przykład](https://apps.shopify.com/gpsready)). Omnibus: co najmniej 6 aplikacji, lider z darmowym planem do 100 produktów ([Complimus](https://apps.shopify.com/omnibus-price)). To potwierdza wniosek z pierwszego sweepu: szybkie budowanie z AI nie jest przewagą.
3. **Shopify 10.11.2026 zaostrzył zasady** ([Shopifreaks](https://www.shopifreaks.com/shopify-tightens-its-app-store-rules-with-identity-checks-install-minimums-for-new-listings-and-removal-of-apps-with-no-installs/), [Luseri](https://luseri.com/shopify-app-review-process)): jedna aplikacja w recenzji naraz, kolejną można zgłosić dopiero, gdy każda opublikowana ma co najmniej 10 instalacji w aktywnych płatnych sklepach, aplikacje z zerem instalacji po 6 miesiącach są usuwane. Strategia "wystawię kilka małych aplikacji i zobaczę, która chwyci" przestała być tania. Pierwsza aplikacja musi być trafiona.
4. **Shoper zabiera 30%.** Wydawca dostaje 70% ceny netto ([regulamin dla wydawców, PDF](https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf)) - wersja obowiązująca do 31.08.2026; treści wersji od 01.09.2026 nie udało się sprawdzić **[DO POTWIERDZENIA]**. Do tego baza sklepów stoi w miejscu, ceny aplikacji są niskie (20-200 zł/mies.), a polskie potrzeby (InPost, faktury, Ceneo, Allegro) Shoper ma wbudowane lub oficjalne - "polska specyfika" nie jest tam luką.
5. **Trzy tropy, które zostały, są cienkie** (szczegóły w pytaniu 6): pole NIP w koszyku dla sklepów bez planu Plus, pakiet Ceneo (Zaufane Opinie), raport dla księgowej. Żaden nie przechodzi Twoich reguł: pierwszy i drugi łamią regułę substytucji (darmowy fragment kodu lub funkcja wbudowana w aplikacje fakturowe), trzeci nie ma żadnego dowodu popytu i ociera się o podatki.

**Co to znaczy dla wyboru projektu:** kanał (sklep z aplikacjami) pozostaje dobry, ale ten konkretny kandydat - "polska nisza" - nie ma produktu. Jeśli inny kandydat z listy ma twardszy dowód popytu (np. wariant oparty o działający silnik PLAR Orders), powinien wygrać z tym. Ten kandydat zasługuje najwyżej na 2 godziny ręcznego sprawdzenia w przeglądarce (sekcja R1), nie na tygodnie pracy.

## Odpowiedzi na pytania zabojcze

### 1. Warunki dla wydawców w Shoper App Store

**Status: częściowo.**

| Co | Ustalenie | Status | Źródło |
|---|---|---|---|
| Prowizja | Podstawą rozliczeń jest cena netto dostępu do aplikacji; **wydawca dostaje 70%**, Shoper zatrzymuje 30% | zweryfikowane dla wersji regulaminu 28.06.2025-31.08.2026; wersja od 01.09.2026 nieprzeczytana **[DO POTWIERDZENIA]** | [regulamin PDF](https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf), [lista regulaminów](https://www.shoper.pl/regulaminy/regulaminy-integracji-i-rozszerzen) |
| Kto pobiera pieniądze | Shoper rozlicza sklep, wydawca dostaje swoją część od Shopera (tak wynika z zapisu "Wydawca będzie otrzymywał od Właściciela Serwisu 70%") | częściowo | [regulamin PDF](https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf) |
| Modele cenowe | Wydawca ustawia pakiety cenowe: rozliczenie miesięczne, kwartalne, półroczne lub roczne; istnieją też aplikacje z jednorazową opłatą aktywacyjną | zweryfikowane | [Shoper - warianty aplikacji](https://www.shoper.pl/learn/artykul/jak-w-shoperze-utworzyc-warianty-aplikacji), [yournextstore](https://yournextstore.com/pl/blog/shoper-ukryte-koszty) |
| Typowe ceny | 1-79 zł/mies. albo 49-499 zł za aktywację; typowo 20-200 zł/mies. za aplikację | zweryfikowane (blogi firm trzecich, nie oficjalny cennik) | [yournextstore](https://yournextstore.com/pl/blog/shoper-ukryte-koszty), [growcommerce](https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/) |
| Proces publikacji | Rejestracja w programie partnerskim, sklep testowy, weryfikacja przez administratora Shoper, publikacja; wymagany e-mail kontaktowy widoczny dla klientów | zweryfikowane (z pierwszego sweepu + ta sesja); **czas weryfikacji nieznany** | [jak dodać aplikację](https://www.shoper.pl/learn/artykul/jak-w-shoperze-dodac-lub-zaktualizowac-aplikacje), [twórca aplikacji](https://www.shoper.pl/program-partnerski/tworca-aplikacji) |
| Liczba aplikacji | "Ponad 250 dodatków" | częściowo (materiał partnera Shopera) | [matuszczak.pro](https://matuszczak.pro/ranking-aplikacji-shoper) |
| Liczby instalacji | **Nie znalazłem.** Katalog pokazuje oceny, ale z małą liczbą głosów (kilka-kilkadziesiąt) | niezweryfikowane | [shopgadget - katalog](https://www.shopgadget.pl/shoper/appstore-aplikacje) |
| Zarobki wydawców | **Nie znalazłem ani jednego opublikowanego wyniku.** Wyszukiwanie wprost zostało odrzucone przez limit | niezweryfikowane | - |
| Konkurencja wśród wydawców | Jedna agencja wypuściła 4 aplikacje w samym październiku 2026, razem za 209 zł/mies. | zweryfikowane (pierwszy sweep) | [Scharmach](https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting) |
| Wielkość rynku | 15 448 aktywnych sklepów, lekki spadek | zweryfikowane (pierwszy sweep) | [StoreLeads](https://storeleads.app/reports/shoper) |

**Wniosek (niezweryfikowane, moje rozumowanie):** przy cenie 49 zł/mies. zostaje Ci 34,30 zł netto od sklepu (70% z 49 zł - wyliczenie własne). Żeby dojść do 2000 zł/mies., potrzebujesz ok. 58 płacących sklepów, czyli ok. 0,4% całej bazy Shopera (wyliczenie własne z liczb powyżej) na jednej aplikacji, w sklepie, gdzie agencje wydają po kilka aplikacji miesięcznie. Bez konkretnej luki to nie ma podstaw.

### 2. Shopify Polska: mapa polskich potrzeb i istniejących aplikacji

**Status: częściowo** (większość kategorii sprawdzona przez wyniki wyszukiwania; trzy kategorie niesprawdzone z powodu limitu).

| Potrzeba | Co już jest | Opinie (liczba) | Ocena luki |
|---|---|---|---|
| Faktury - Fakturownia (+KSeF) | Fakturownia Integration; Fakturownia Integrator (darmowo do 3 dokumentów); Faktly; Sufio; POP; ksefshop.pl (zapowiedziany) | 19 opinii, wszystkie 5/5 ([listing](https://apps.shopify.com/fakturownia-integration/reviews)); inna aplikacja Fakturowni: 4 opinie 5/5 ([listing](https://apps.shopify.com/reviews/1788613)); Faktly: 1 opinia ([porównanie konkurenta](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)) | **Brak luki.** 5-6 graczy |
| Faktury - wFirma | WP Desk, 9,99 USD/mies.; do tego łącznik Base.com | 5,0 z 1 opinii ([listing](https://apps.shopify.com/wfirma-invoices/reviews)); pierwszy sweep widział 3,0 z 2 ocen - rozbieżność **[DO POTWIERDZENIA]** | **Brak dowodu popytu.** 1-2 opinie to pusta półka, nie słaby konkurent |
| Faktury - iFirma | WP Desk ([dokumentacja](https://www.wpdesk.pl/docs/ifirma-dla-shopify/)); iFirma sama wymienia Shopify wśród integracji ([pomoc iFirma](https://pomoc.ifirma.pl/pomoc-artykul/e-sklepy-najczesciej-spotykane-pytania/)) | 0 opinii ([listing](https://apps.shopify.com/ifirma)) | **Brak dowodu popytu** |
| Faktury - inFakt | WP Desk 9,99 USD; Make It Easy 17,99 USD (pierwszy sweep: [kkdigital](https://kkdigital.pl/fakturowanie-w-shopify-ksef/)) | nie ustaliłem | Zajęte przez 2 graczy |
| ERP - Subiekt GT/nexo, Comarch Optima | Łączniki Base.com ([Subiekt](https://base.com/pl-PL/integracje/shopify/subiekt/), [Optima](https://base.com/pl-PL/integracje/shopify/optima/)); Sellintegro - wtyczka Subiekt GT za 999 zł netto/mies. ([cennik](https://panel.sellintegro.pl/pl/54-shopify)) | nie dotyczy (sprzedaż poza App Store) | **Nie dla Ciebie.** Programy instalowane na komputerze klienta; Subiekt GT wymaga osobnej licencji Sfera ([web-systems](https://www.web-systems.pl/integracja-woocommerce-subiekt-optima/)). To wdrożenia, nie pasywny produkt |
| Przewoźnicy - InPost | InPost by Progus; InPost Tale Commerce 19 USD/mies.; Codie (InPost + Orlen Paczka + DPD Pickup) | Progus: 112 opinii, 110 na 5/5 ([listing](https://apps.shopify.com/inpost-4/reviews)); Tale: 4,9 (48) ([listing](https://apps.shopify.com/paczkomaty-inpost), pierwszy sweep); Codie: 4,7 (53) ([kolekcja App Store](https://apps.shopify.com/collections/thank-you-order-status-pickup-points)) | **Brak luki.** Mocni gracze, zero ocen 1-2 gwiazdki u lidera |
| Przewoźnicy - DPD Pickup, DHL, Orlen Paczka, Poczta Polska | Pointly 4,99 USD/mies. (InPost, DPD, DHL, Orlen) ([listing](https://apps.shopify.com/pointly-punkty-odbioru)); ShipD 5,0 (31) ([listing](https://apps.shopify.com/packeta?locale=pl)); Atlas Pickup Points 4,9 (83), 60+ przewoźników ([listing](https://apps.shopify.com/atlas-pickup-points)); Parcel Lockers Pickup Points PRO - 31 kurierów, w tym Poczta Polska ([Asttero](https://www.asttero.com/en/blog/post/top-6-courier-apps-on-shopify)); mapa Apaczki ([Apaczka](https://www.apaczka.pl/integracje/shopify-2/mapa-punktow-shopify/)) | jak obok | **Brak luki.** Cena już na dnie (4,99 USD) |
| Przewoźnicy - Allegro One | Nie znalazłem osobnej aplikacji | - | **Niezweryfikowane.** Brak dowodu, że ktoś tego szuka na Shopify |
| Porównywarki - feed Ceneo | Ceneo Feed XML (Brand Active) od 4,99 USD; Feedyio (Ceneo w planie darmowym, płatne 9,99 i 19,99 USD) | Brand Active: 1,3 z 3 opinii lub 1,7 z 4, skargi na synchronizację stanów ([opinie](https://apps.shopify.com/ceneo-feed-xml/reviews), [listing](https://apps.shopify.com/ceneo-feed-xml)); Feedyio: 5,0 ze 105-150 opinii ([opinie](https://apps.shopify.com/reviews/1525949), [katalog](https://shoplist.co/apps/feedyio-product-xml-feeds)) | **Brak luki.** Słabego gracza już zastąpił mocny z darmowym planem |
| Porównywarki - Skąpiec | Nie znalazłem nic | - | **Niezweryfikowane** |
| Opinie - Ceneo Zaufane Opinie | Brak oficjalnej wtyczki Ceneo dla Shopify w wynikach; obejście: własny piksel w ustawieniach sklepu, "ok. 5 minut" wg poradnika dostawcy ([Feedyio](https://feedyio.com/post/ceneo-zaufane-opinie-shopify)) | - | **Cienka luka**, ale łamie regułę substytucji (darmowy fragment kodu) |
| Opinie - Opineo, Trusted Shops | Nie sprawdzone (limit wyszukiwań) | - | **Niezweryfikowane** |
| Allegro - synchronizacja | Allegro od WP Desk, 9,99 USD/mies., wydana 19.05.2026 ([listing](https://apps.shopify.com/allegro-od-wp-desk)); realnie rynek obsługują BaseLinker i Apilo (35-179 zł netto/mies.) ([Apilo](https://apilo.com/pl/integracje/allegro/shopify/)) | WP Desk: 0 opinii | **Brak luki dla solo.** Synchronizacja ofert, stanów i zamówień to ciężki produkt; kupujący wybierają integratory |
| Omnibus (najniższa cena z 30 dni) | Complimus (darmowo do 100 produktów, płatne od 14,99 USD); OmnibusReady 7,99 USD; Omnibus Price Compliance 16,99 USD; Netkodo 9,99 USD; Meetanshi 4,99 USD; czeska aplikacja 9,90 USD | Complimus: 4,9 (69) ([listing](https://apps.shopify.com/omnibus-price)); pozostałe 0-1 opinii ([OmnibusReady](https://apps.shopify.com/omnibusready), [Compliance](https://apps.shopify.com/omnibus-price-compliance), [Netkodo](https://apps.shopify.com/omnibus-by-netkodo), [Meetanshi](https://apps.shopify.com/eu-omnibus-price-tracker), [czeska](https://apps.shopify.com/omnibus-compliant-price?locale=cs)) | **Martwe.** 6+ aplikacji, lider z darmowym planem |
| NIP / dane firmy w koszyku | Brak dedykowanej aplikacji z istotną liczbą opinii w wynikach. Obejścia: pole w koszyku w aplikacjach fakturowych ([Make It Easy](https://intercom.help/makeiteasy/en/articles/9598022-b2b-handling-collect-vat-id-and-send-it-to-fakturownia), [ksefshop](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)), ogólne aplikacje do pól ([Custom Checkout Fields](https://apps.shopify.com/custom-checkout-fields), [FieldPilot](https://kuberstar.com/products/fieldpilot)), natywne pole "numer VAT firmy" od 25.02.2026, ale tylko VIES i tylko z Shopify Tax - krajowy NIP się tam nie zapisze ([sdconcept](https://sdconcept.pl/blog/nip-w-checkoutcie-shopify)) | - | **Cienka luka** (patrz pytanie 5) |
| GPSR (dane producenta) | Ok. 19 aplikacji; GPSReady od 7,99 USD (10 produktów za darmo), EU Ready 8,99 USD, Complyo darmowo do 50 produktów | prawie wszędzie 0 opinii ([GPSReady](https://apps.shopify.com/gpsready), [EU Ready](https://apps.shopify.com/gpsr-ready), [Complyo](https://apps.shopify.com/gpsr-dpp-compliance)) | **Martwe.** Zalane klonami, bez kupujących |
| Przycisk odstąpienia od umowy (od 19.06.2026) | Ok. 10 aplikacji, część z darmowym planem | 6-7 opinii u ocenionych ([Appsentials 4,8 (7)](https://apps.shopify.com/widerrufs-button-eu), [Withdrawly 4,8 (6)](https://apps.shopify.com/withdrawly), [Slash](https://apps.shopify.com/eu-withdrawal-button-5), [MIDA](https://apps.shopify.com/tc-eu-withdrawal-button), [Tiny](https://apps.shopify.com/eu-withdrawal-ai)) | **Martwe.** Pierwszy sweep miał rację |
| Płatności BLIK / Przelewy24 / PayU | Źródła są sprzeczne: jedno mówi, że Shopify Payments obejmuje BLIK i Przelewy24, inne, że Przelewy24 jest zamknięte dla nowych aktywacji (blogi z wyników dla zapytania o braki Shopify, m.in. [spaceads](https://www.spaceads.pl/blog/czy-warto-zalozyc-sklep-na-shopify), [thenewlook](https://thenewlook.pl/shopify-w-polsce/) - przypisanie niepewne) | - | **Niezweryfikowane.** Moje rozumowanie: bramki płatnicze to obszar regulowany i dla operatorów płatności, nie dla solo |
| Eksport księgowy (JPK, rejestr VAT, OSS) | Ogólnoeuropejskie: Bizyness od 16 USD/mies. ([listing](https://apps.shopify.com/bizyness)), SimpleVAT ([listing](https://apps.shopify.com/simplevat)), VAT Guard ([listing](https://apps.shopify.com/vat-guard)). Polskiej aplikacji "JPK / raport dla księgowej" nie znalazłem. Biura rachunkowe robią to jako usługę ([MIA Consult](https://miaconsultgroup.pl/en/e-commerce/)) | - | **Hipoteza bez dowodu popytu** (patrz pytanie 5) |

**Odpowiedź na pytanie "gdzie nie ma aplikacji albo jest tylko źle oceniana":**
- Źle oceniana: tylko Ceneo Feed XML (1,3-1,7), ale ma 3-4 opinie i obok stoi Feedyio z oceną 5,0 i darmowym planem.
- Brak dedykowanej aplikacji (na ile widać z wyników): pole NIP w koszyku, Ceneo Zaufane Opinie, Skąpiec, Allegro One, polski raport księgowy/JPK. Dla żadnej z tych pozycji nie mam dowodu, że sprzedawcy za to zapłacą.

### 3. Skargi sprzedawców

**Status: częściowo.** Grupy na Facebooku (np. "Shopify Polska") nie są widoczne dla wyszukiwarki - tego źródła nie zbadałem.

Co znalazłem:
- **NIP w koszyku - realna, powtarzająca się skarga.** Dwa wątki na oficjalnym forum Shopify: "Legal Requirement in Poland - need VAT/NIP field in checkout" ([wątek](https://community.shopify.com/t/legal-requirement-in-poland-need-vat-nip-field-in-checkout/556266)) oraz "Adding a Dedicated NIP Field for VAT Invoices in Checkout" ([wątek](https://community.shopify.com/c/technical-q-a/adding-a-dedicated-nip-field-for-vat-invoices-in-checkout/m-p/3027446)). Odpowiedzi społeczności: na planie Plus użyj aplikacji Checkout Boost; bez Plus "zrób pole w koszyku, nie w checkoucie". Polski sprzedawca skarży się, że aplikacje do pól w checkoucie wymagają najdroższego planu. Zweryfikowane.
- **Ceneo Feed XML:** skargi na synchronizację stanów magazynowych, ocena 1,3-1,7 ([opinie](https://apps.shopify.com/ceneo-feed-xml/reviews)). Zweryfikowane, ale tylko 3-4 opinie.
- **Fakturownia Integration:** jedna wzmianka o błędnej stawce VAT, szybko naprawionej przez wsparcie ([opinie](https://apps.shopify.com/fakturownia-integration/reviews)). To pokazuje, skąd bierze się praca wsparcia przy aplikacjach fakturowych.
- **Księgowi o Shopify:** raporty Shopify są "sprzedażowe, nie księgowe" i wymagają przerabiania; wypłaty są pomniejszone o prowizje, zwroty i korekty sprawiają kłopot ([amavat](https://amavat.pl/czy-ksiegowy-musi-znac-shopify/), [Base](https://base.com/pl-PL/blog/shopify-w-polsce/)). Uwaga: to blogi biur rachunkowych i dostawców, którzy sprzedają własne usługi - nie skargi sprzedawców.
- **Agencje o brakach Shopify w Polsce:** brak KSeF, brak natywnego Allegro, InPost przez aplikację ([amavat](https://amavat.pl/czy-shopify-obsluguje-ksef/), [IdoSell - konkurent, więc stronniczy](https://www.idosell.com/pl/blog/idosell-vs-shopify-pelne-koszty-prowadzenia-sklepu-w-polsce), [shipdock](https://shipdockapp.pl/blog/shopify-wysylka-polska)). Wszystkie te braki są już obsadzone aplikacjami.
- **Shoper:** nie znalazłem żadnego wątku o brakującej aplikacji. Skargi dotyczą ceny po pierwszym roku i zamkniętego kodu ([sprzedajewnecie](https://sprzedajewnecie.pl/shoper-opinie-recenzja/), [24hshop](https://24hshop.pl/shoper-opinie-funkcje-i-cennik-czy-to-sie-oplaca) - przypisanie niepewne), nie App Store. Partner Shopera pisze, że część aplikacji to "rozwiązania szukające problemu" ([matuszczak.pro](https://matuszczak.pro/ranking-aplikacji-shoper)).
- **Opinii 1-3 gwiazdki przy dużych polskich aplikacjach nie znalazłem** (InPost by Progus: zero ocen 1-2).

### 4. IdoSell, PrestaShop Addons, WooCommerce - czy jest otwarcie dla nowego gracza

**Status: częściowo (IdoSell, WooCommerce), niezweryfikowane (PrestaShop).**

- **IdoSell Apps.** Platforma dla zewnętrznych deweloperów istnieje. Cenę ustala deweloper, sklepy płacą miesięczną subskrypcję za każdą aplikację, rozliczenia prowadzi IdoSell ([IdoSell Apps](https://www.idosell.com/pl/idosell-apps), [dla deweloperów](https://www.idosell.com/pl/dla-developerow/)). **Prowizji nie podano** (tylko hasło "korzystne warunki komercyjne"), procesu weryfikacji też nie. Luki nie znalazłem i nie mam żadnych danych o instalacjach ani zarobkach. IdoSell to platforma dla większych sklepów z rozbudowanymi funkcjami wbudowanymi (moje rozumowanie, niezweryfikowane) - słabe miejsce na "polską lukę".
- **PrestaShop Addons.** Wyszukiwanie zwróciło tylko ogólne rankingi modułów; nic o polskich modułach ani zarobkach. Z pierwszego sweepu: sprzedawca dostaje 60-83% ceny ([how to sell](https://addons.prestashop.com/en/content/25-how-to-sell-on-prestashop-addons)), obsługa posprzedażowa jest po stronie dewelopera ([FAQ](https://addons.prestashop.com/en/content/1-faq)). Do tego PHP jest poza Twoim stosem. Otwarcia nie widać, ale uczciwie: nie zbadane.
- **WooCommerce.** WP Desk obsadza InPost, Allegro, Przelewy24, PayU i KSeF i aktywnie aktualizuje wtyczki (wpisy z lutego 2026 o wsparciu WooCommerce 10.6 - [changelog WP Desk](https://www.wpdesk.pl/kategoria-docs/wtyczki/changelog/page/3/)); dodatek KSeF jest na wordpress.org ([wtyczka](https://wordpress.org/plugins/ksef-for-flexible-invoices/)); są darmowe alternatywy (np. darmowa wtyczka inFakt - [wordpress.org](https://en-ca.wordpress.org/plugins/?p=270569)). Pierwszy sweep naliczył co najmniej 5 wtyczek KSeF, część za 0 zł. **Otwarcia nie ma**, a wtyczki WordPress to konflikty z innymi wtyczkami i ciężkie wsparcie.

### 5. Dla każdego tropu: kto płaci, jak często, jaka cena, co się psuje, sufit

Uwaga: to są **tropy, nie zweryfikowane luki**. Wszystkie sufity to moje szacunki.

**Trop A - pole NIP i dane firmy w koszyku dla sklepów Shopify bez planu Plus**
- Kto płaci: polski sklep na planie Basic/Grow, który sprzedaje też firmom i musi zebrać NIP do faktury.
- Jak często: stale (przy każdym zamówieniu B2B) - abonament pasuje (R2).
- Cena, którą rynek już akceptuje: 4,99 USD/mies. za prosty dodatek (Pointly - [listing](https://apps.shopify.com/pointly-punkty-odbioru); Ceneo Feed XML - [listing](https://apps.shopify.com/ceneo-feed-xml)); 9,99 USD za integracje WP Desk ([listing](https://apps.shopify.com/wfirma-invoices)). Dla samego pola: 4,99-6,99 USD (szacunek).
- Co się psuje: zgodność z motywami sklepu (każdy koszyk wygląda inaczej, zwłaszcza koszyki wysuwane) - to główne źródło zgłoszeń (moje rozumowanie); darmowe API rządowe do sprawdzania NIP (GUS, biała lista VAT) miewają przerwy (z pamięci modelu, niezweryfikowane w tej sesji).
- Dlaczego to cienkie: (1) aplikacje fakturowe mają to pole w pakiecie ([Make It Easy](https://intercom.help/makeiteasy/en/articles/9598022-b2b-handling-collect-vat-id-and-send-it-to-fakturownia), [ksefshop](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)); (2) agencje publikują gotowe instrukcje ([sdconcept](https://sdconcept.pl/blog/nip-w-checkoutcie-shopify)); (3) zwykłe pole tekstowe w koszyku to fragment kodu, który darmowy ChatGPT napisze w kilka minut - **łamie regułę substytucji**, chyba że produkt robi coś twardego (pobranie danych firmy z rejestru, zapis w zamówieniu w formacie czytanym przez aplikacje fakturowe); (4) Shopify w lutym 2026 dodał własne pole VAT i może je rozszerzyć o krajowy NIP ([sdconcept](https://sdconcept.pl/blog/nip-w-checkoutcie-shopify)).
- Sufit (szacunek): 30-150 płacących sklepów x ok. 5 USD = 150-750 USD/mies. Nie mam żadnej liczby, która by to potwierdzała.

**Trop B - pakiet Ceneo dla Shopify (Zaufane Opinie + feed)**
- Kto płaci: polski sklep na Shopify obecny na Ceneo.
- Jak często: stale (feed odświeżany codziennie, ankieta po każdym zamówieniu).
- Cena rynkowa: 4,99-15,99 USD/mies. u Brand Active ([listing](https://apps.shopify.com/ceneo-feed-xml)), 0-19,99 USD u Feedyio ([katalog](https://shoplist.co/apps/feedyio-product-xml-feeds)).
- Co się psuje: synchronizacja stanów (to właśnie zarzut wobec Brand Active - [opinie](https://apps.shopify.com/ceneo-feed-xml/reviews)), zmiany formatu po stronie Ceneo.
- Dlaczego to cienkie: feed jest obsadzony przez Feedyio (5,0 ze 105-150 opinii, Ceneo w darmowym planie - [opinie](https://apps.shopify.com/reviews/1525949), [strona Ceneo u Feedyio](https://feedyio.com/product-feed/ceneo)). Zaufane Opinie da się podłączyć darmowym pikselem w ok. 5 minut ([Feedyio](https://feedyio.com/post/ceneo-zaufane-opinie-shopify)) - **łamie regułę substytucji**. Sam słaby konkurent ma 3-4 opinie, czyli popyt jest mały.
- Sufit (szacunek): poniżej 300 USD/mies.

**Trop C - "raport dla księgowej" z Shopify (rejestr sprzedaży VAT, OSS, rozbicie wypłat na przychód i prowizje)**
- Kto płaci: polski sklep na Shopify albo jego biuro rachunkowe.
- Jak często: co miesiąc - abonament pasuje (R2).
- Cena rynkowa: ogólnoeuropejski Bizyness od 16 USD/mies. ([listing](https://apps.shopify.com/bizyness)).
- Co się psuje: zwroty, korekty, waluty, zmiany w raportach Shopify; każdy błąd to potencjalny problem podatkowy klienta.
- Dlaczego to cienkie: (1) **zero dowodu popytu** - znalazłem tylko blogi biur rachunkowych ([amavat](https://amavat.pl/czy-ksiegowy-musi-znac-shopify/)), czyli wyniki informacyjne, dokładnie jak w disclosekit; (2) większość sklepów rozwiązuje to inaczej: aplikacja fakturowa wystawia dokument do każdego zamówienia, a rejestr i JPK powstają w programie do faktur (moje rozumowanie, niezweryfikowane); (3) ociera się o Twoją regułę "żadnego regulowanego doradztwa"; (4) biura rachunkowe robią to jako usługę ([MIA Consult](https://miaconsultgroup.pl/en/e-commerce/)).
- Sufit: nie umiem oszacować.

### 6. Werdykt o lukach

**Żadna luka nie jest potwierdzona dowodami.** Kryterium z pierwszego sweepu brzmiało: luka jest prawdziwa tylko wtedy, gdy jednocześnie (a) są najwyżej 2 aplikacje albo istniejące mają ocenę poniżej 4,0 oraz (b) sprzedawcy sami o to pytają. Wyniki:

| Miejsce | Trop | (a) słaba lub pusta półka | (b) sprzedawcy pytają | Reguła substytucji | Ocena |
|---|---|---|---|---|---|
| 1 | NIP i dane firmy w koszyku (Shopify bez Plus) | częściowo: brak dedykowanej aplikacji w wynikach, ale funkcję mają aplikacje fakturowe i ogólne aplikacje do pól | **tak**: 2 wątki na forum Shopify | **nie przechodzi** w wersji prostej | Jedyny trop z dowodem po stronie popytu. Za cienki na produkt, dobry najwyżej jako funkcja większej aplikacji |
| 2 | Pakiet Ceneo (Zaufane Opinie + feed) | częściowo: jeden gracz z oceną 1,3-1,7, drugi z 5,0 | słabo: 3-4 opinie | **nie przechodzi** (darmowy piksel) | Odrzucić |
| 3 | Raport dla księgowej / JPK | tak: nie znalazłem polskiej aplikacji | **nie**: tylko blogi biur rachunkowych | przechodzi (automat co miesiąc) | Odrzucić do czasu dowodu popytu; ryzyko podatkowe |

Poza tym: Shoper App Store, IdoSell, PrestaShop, WooCommerce - **zero zidentyfikowanych luk**.

## Konkurencja

| Nazwa | Cena | Trakcja (liczba opinii) | Słabość | Link |
|---|---|---|---|---|
| InPost by Progus | nie ustaliłem | 112 opinii, 110 na 5/5 (inne źródło: 5,0 ze 109) | nie widać | [listing](https://apps.shopify.com/inpost-4/reviews), [porównanie](https://rankbase.io/compare-shopify-apps/inpost-4-vs-paczkomaty-inpost) |
| InPost - Tale Commerce | 19 USD/mies. | 4,9 (48) wg pierwszego sweepu | wymaga wyższego planu Shopify | [listing](https://apps.shopify.com/paczkomaty-inpost) |
| InPost Paczkomaty Orlen Paczka (Codie) | od 9 USD/mies. (pierwszy sweep) | 4,7 (53) | wybór w checkoucie tylko w planie PRO | [dokumentacja](https://inpostpaczkomatyorlenpaczka.pl/docs/), [kolekcja](https://apps.shopify.com/collections/thank-you-order-status-pickup-points) |
| Pointly - Punkty Odbioru | 4,99 USD/mies. lub 49,99 USD/rok | nie ustaliłem | nowy gracz, cena na dnie | [listing](https://apps.shopify.com/pointly-punkty-odbioru) |
| Atlas Pickup Points | 29 USD/mies. lub 300 USD/rok (wg artykułu) | 4,9 (83) | wybór w checkoucie tylko na Plus | [listing](https://apps.shopify.com/atlas-pickup-points) |
| Fakturownia Integration | nie ustaliłem | 19 opinii, wszystkie 5/5 | pojedynczy błąd stawki VAT | [opinie](https://apps.shopify.com/fakturownia-integration/reviews) |
| WP Desk - wFirma | 9,99 USD/mies. | 1 opinia (5,0); wcześniej widziane 3,0 z 2 | brak trakcji | [opinie](https://apps.shopify.com/wfirma-invoices/reviews) |
| WP Desk - iFirma | nie ustaliłem | 0 opinii | brak trakcji | [listing](https://apps.shopify.com/ifirma) |
| WP Desk - Allegro | 9,99 USD/mies., 7 dni próbnych | 0 opinii od 19.05.2026 | brak trakcji; rynek wybiera BaseLinker/Apilo | [listing](https://apps.shopify.com/allegro-od-wp-desk) |
| Apilo (integrator) | 35-179 zł netto/mies. | nie dotyczy | osobny system, nie aplikacja "jednej funkcji" | [strona](https://apilo.com/pl/integracje/allegro/shopify/) |
| Ceneo Feed XML (Brand Active) | 4,99 / 9,99 / 15,99 USD/mies. | 1,3 z 3 lub 1,7 z 4 | synchronizacja stanów | [opinie](https://apps.shopify.com/ceneo-feed-xml/reviews) |
| Feedyio | darmowy plan, 9,99 i 19,99 USD/mies. | 5,0 ze 105-150 | nie widać | [opinie](https://apps.shopify.com/reviews/1525949), [Ceneo](https://feedyio.com/product-feed/ceneo) |
| Complimus (Omnibus + GPSR) | darmowo do 100 produktów; 14,99-29,99 USD | 4,9 (69) | nie widać | [listing](https://apps.shopify.com/omnibus-price) |
| GPSReady i ok. 18 innych aplikacji GPSR | od 7,99 USD, darmowe progi | 0 opinii | brak kupujących | [listing](https://apps.shopify.com/gpsready) |
| Ok. 10 aplikacji "przycisk odstąpienia" | często darmowy plan | 6-7 opinii u ocenionych | brak kupujących | [przykład](https://apps.shopify.com/widerrufs-button-eu) |
| Custom Checkout Fields / FieldPilot (pola w koszyku) | nie ustaliłem | nie ustaliłem | ogólne, bez polskiej walidacji NIP | [listing](https://apps.shopify.com/custom-checkout-fields), [FieldPilot](https://kuberstar.com/products/fieldpilot) |
| Agencje wydające aplikacje Shoper (np. Scharmach) | 4 aplikacje łącznie 209 zł/mies. | nieznana | nieznana | [wpis](https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting) |

## Najlepszy wariant produktu

**Uczciwa odpowiedź: żaden wariant nie jest gotowy do budowy.**

Gdybyś mimo to chciał sprawdzić najmniej zły trop, to brzmi on tak:

- **Co:** "NIP PL" - pole "Kupuję na firmę" w koszyku sklepu Shopify, które działa na każdym planie (bez Plus), sprawdza poprawność NIP, pobiera nazwę i adres firmy z oficjalnego rejestru i zapisuje je w zamówieniu tak, żeby aplikacje fakturowe (Fakturownia, wFirma, inFakt, iFirma) wystawiły fakturę zamiast paragonu.
- **Dla kogo:** polskie sklepy Shopify na planach Basic/Grow sprzedające też firmom.
- **Cena:** 4,99-6,99 USD/mies. (szacunek, na podstawie cen Pointly i Ceneo Feed XML), 7 dni próbnych, bez darmowego planu (R3).
- **Kanał:** wyszukiwarka Shopify App Store na frazy "NIP", "faktura", "VAT", "Polska" oraz odpowiedzi w istniejących wątkach forum Shopify.
- **Dlaczego i tak nie polecam:** sufit rzędu 150-750 USD/mies. (szacunek), wysoka zastępowalność, ryzyko, że Shopify doda krajowy NIP do własnego pola, i nowa zasada "10 płatnych instalacji przed kolejną aplikacją".

Rozsądniejsze użycie tej wiedzy: jeśli wygra kandydat "PLAR Orders w Shopify App Store", to wiesz już, jak wygląda kanał, ile kosztuje i jakie ma nowe ograniczenia.

## Ekonomia (z zaznaczeniem szacunkow)

- **Wielkość rynku:** 19 199 aktywnych sklepów Shopify w Polsce, +44% rok do roku ([StoreLeads](https://storeleads.app/reports/shopify/PL/top-stores), pierwszy sweep **[DO POTWIERDZENIA]**); 15 448 sklepów Shoper, lekki spadek ([StoreLeads](https://storeleads.app/reports/shoper)).
- **Opłaty platform:** Shopify - 0% od pierwszego 1 mln USD przychodu, potem 15%, plus 2,9% za przetwarzanie płatności (blog zewnętrzny, pierwszy sweep: [weekonelabs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026)) **[DO POTWIERDZENIA w Partner Dashboard]**. Shoper - 30% (wydawca dostaje 70%: [regulamin](https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf)).
- **Ceny akceptowane przez polskich sprzedawców na Shopify:** 4,99 USD (proste dodatki), 9,99 USD (integracje WP Desk), 19 USD (InPost Tale) - linki w tabeli konkurencji. Na Shoperze: 20-200 zł/mies. ([growcommerce](https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/)).
- **Wolumen (szacunek):** największa polska aplikacja ma 112 opinii ([Progus](https://apps.shopify.com/inpost-4/reviews)). Shopify nie publikuje liczby instalacji, a przelicznika "opinie na instalacje" nie mam ze źródła. Dla spóźnionego gracza w cienkiej niszy przyjmuję 30-150 płacących sklepów po 12-24 miesiącach - **szacunek bez pokrycia w danych**.
- **Przychód (szacunek):** 30-150 sklepów x 5-10 USD = 150-1500 USD/mies. w dobrym scenariuszu; najbardziej prawdopodobny wynik pierwszego roku to 0-300 USD/mies. To zgodne ze stawkami bazowymi z pierwszego sweepu (mediana solo-projektu ok. 445 USD/mies.: [onemilliongoal](https://www.onemilliongoal.com/p/what-986-solo-startups-actually-look)).
- **Koszt pozyskania:** w samym App Store 0 zł, ale nowa aplikacja bez opinii jest na dole wyników (moje rozumowanie). Koszt kliknięcia w Google Ads dla fraz typu "shopify nip" - **nieznany**, do sprawdzenia w Planerze.
- **Koszty stałe:** hosting 0-20 EUR/mies. na Twoim stosie Cloudflare (szacunek).
- **Próg zasady Shopify:** 10 instalacji w aktywnych płatnych sklepach, zanim zgłosisz drugą aplikację; aplikacja z zerem instalacji po 6 miesiącach jest usuwana ([Shopifreaks](https://www.shopifreaks.com/shopify-tightens-its-app-store-rules-with-identity-checks-install-minimums-for-new-listings-and-removal-of-apps-with-no-installs/)).

## Zakres budowy i pasywnosc

**Zakres v1 dla tropu A (szacunek: 2-3 tygodnie pracy z agentem kodującym + recenzja Shopify o nieznanej długości):**
- logowanie sklepu przez Shopify (OAuth), rozliczenia przez system Shopify (nie Twój Stripe), obowiązkowe webhooki ochrony danych (z pamięci modelu, niezweryfikowane w tej sesji);
- blok do koszyka instalowany w motywie sklepu, bez grzebania w kodzie;
- sprawdzanie NIP i pobieranie danych firmy; zapis w zamówieniu;
- od listopada 2026: weryfikacja tożsamości konta partnera ([Shopifreaks](https://www.shopifreaks.com/shopify-tightens-its-app-store-rules-with-identity-checks-install-minimums-for-new-listings-and-removal-of-apps-with-no-installs/)) i nowy wymóg listy dozwolonych adresów IP dla aplikacji publicznych (źródło wtórne: [dev.to](https://dev.to/raxxostudios/shopifys-new-ip-allowlist-rule-hits-its-first-deadline-today-36a7)) **[DO POTWIERDZENIA - może kolidować z Cloudflare Workers]**.

**Czas recenzji:** Shopify nie podaje liczby dni ([Luseri](https://luseri.com/shopify-app-review-process)); pierwszy sweep notował relacje deweloperów o 2-4 tygodniach i więcej. To wydłuża pętlę nauki - a długa pętla zabiła disclosekit.

**Pasywność (szacunek):** 1-3 h/tydz. przy kilkudziesięciu sklepach. Źródła pracy: "pole nie pokazuje się w moim motywie", zmiany w motywach i w Shopify, przerwy rejestrów rządowych. Aplikacje fakturowe, przewoźników i Allegro byłyby dużo gorsze (2-5+ h/tydz., pilne zgłoszenia) - i tam nie ma luki.

**Shoper:** osobna integracja (inne API, inna recenzja, rozliczenia przez Shoper). Nie ma tam "polskiej luki", więc nie rozpisuję zakresu.

## Ryzyka

Od największego:

1. **Brak potwierdzonej luki.** Wszystko, co "wolne", jest wolne, bo nikt tego nie kupuje. Budowa bez dowodu to powtórka disclosekit.
2. **Zalew klonów.** GPSR (ok. 19 aplikacji), przycisk odstąpienia (ok. 10), Omnibus (6+). Każda nisza widoczna z poradników dostaje kilkanaście aplikacji w kilka miesięcy, część za darmo.
3. **Nowe zasady Shopify z 10.11.2026.** Jedna aplikacja w recenzji, próg 10 płatnych instalacji, usuwanie aplikacji bez instalacji. Koniec taniego portfela małych aplikacji.
4. **Platforma wbuduje funkcję.** Shopify dodał pole VAT w lutym 2026 ([sdconcept](https://sdconcept.pl/blog/nip-w-checkoutcie-shopify)); Shoper ma polskie funkcje wbudowane.
5. **Niski sufit.** 19 tys. sklepów, ceny 5-19 USD. Nawet udana aplikacja to kilkaset USD miesięcznie (szacunek).
6. **Shoper: 30% prowizji, stojąca baza, agencje wydające aplikacje seryjnie, brak publicznych danych o instalacjach.**
7. **Wsparcie.** Wszystko, co dotyka koszyka, generuje pilne zgłoszenia "sklep nie sprzedaje".
8. **Jakość moich danych.** Liczby pochodzą ze streszczeń wyników, a liczniki opinii różnią się między źródłami (np. wFirma: 3,0 z 2 kontra 5,0 z 1; Ceneo Feed XML: 1,3 z 3 kontra 1,7 z 4). Facebookowych grup sprzedawców nie widziałem.

## Najtanszy test checi zaplaty (R1) z progami

Trzy kroki. Zatrzymaj się na pierwszym, który nie przejdzie.

**Krok 0 - ręczny przegląd App Store (0 zł, ok. 2 godziny, bez kodu).**
Wejdź na apps.shopify.com i wpisz po kolei: NIP, faktura, VAT Poland, Ceneo, Zaufane Opinie, Opineo, Skąpiec, JPK, księgowość, pobranie, Allegro One. Dla każdej frazy zapisz: ile aplikacji, liczba opinii, ocena, data ostatniej opinii. Potem przeszukaj grupę "Shopify Polska" na Facebooku pod te same słowa.
- **Przechodzi**, jeśli dla co najmniej jednej frazy: najwyżej 2 aplikacje albo najlepsza ma ocenę poniżej 4,0 **oraz** znajdziesz co najmniej 3 niezależne prośby sprzedawców z ostatnich 12 miesięcy.
- **Zabij**, jeśli żadna fraza nie spełnia obu warunków.

**Krok 1 - Planer słów kluczowych (0 zł, 30 minut).**
Sprawdź frazy z listy poniżej dla Polski.
- **Przechodzi**, jeśli spełniona jest Twoja reguła R4: fraza zakupowa co najmniej 1000/mies. albo co najmniej 3 warianty po 100/mies.
- **Zabij**, jeśli wszystkie warianty są poniżej 100/mies.

**Krok 2 - przedsprzedaż (do 150 EUR, 14 dni, przed kodem funkcji).**
Jedna strona opisująca aplikację + przycisk Stripe "plan założycielski: 99 zł za 6 miesięcy, zwrot pieniędzy, jeśli aplikacja nie powstanie do [data]" + Google Ads tylko na frazy, które przeszły krok 1.
- **Przechodzi:** co najmniej 3 płatności w 14 dni przy wydatku do 150 EUR.
- **Zabij:** 0-1 płatności po co najmniej 300 kliknięciach albo po wydaniu 150 EUR.
- Wynik pośredni (2 płatności): nie buduj; najpierw porozmawiaj z tymi dwoma kupującymi.

Uwaga: wpis w App Store wymaga działającej aplikacji, więc sam sklep nie nadaje się na test przed kodem. To stała słabość tego kandydata względem R1.

## Frazy do sprawdzenia w Planerze slow kluczowych

Geografia: Polska. Język: polski. Dopasowanie ścisłe.

Trop A (NIP):
- shopify nip
- nip shopify
- pole nip shopify
- shopify nip checkout
- shopify faktura vat
- shopify faktura na firmę
- shopify dane do faktury

Trop B (Ceneo):
- shopify ceneo
- ceneo shopify integracja
- zaufane opinie ceneo shopify
- shopify skąpiec
- shopify opineo

Trop C (księgowość):
- shopify księgowość
- shopify jpk
- shopify raport sprzedaży
- shopify rejestr vat
- shopify oss raport

Frazy kontrolne (żeby zobaczyć skalę tam, gdzie popyt na pewno jest):
- shopify inpost
- shopify paczkomaty
- shopify fakturownia
- shopify ksef
- shopify allegro
- shopify wfirma
- shopify ifirma
- shopify infakt
- shopify omnibus
- aplikacje shopify

Shoper:
- aplikacje shoper
- shoper app store
- shoper aplikacja
- shoper integracja
- shoper dodatki

## Otwarte pytania

1. Czy regulamin Shoper App Store dla wydawców w wersji od 01.09.2026 nadal daje 70%? Jaki jest termin wypłat i czas weryfikacji aplikacji?
2. Czy w Shopify App Store istnieje dedykowana aplikacja do pola NIP (wyszukiwanie w samym sklepie - nie mogłem tego zrobić)?
3. Ile instalacji mają polskie aplikacje Shopify i Shoper? Nikt tego nie publikuje.
4. Czy jakikolwiek twórca aplikacji Shoper opublikował przychody? (wyszukiwanie odrzucone przez limit)
5. Opineo, Trusted Shops, Skąpiec, Allegro One, BLIK/Przelewy24/PayU na Shopify - niesprawdzone (limit).
6. Polskie moduły w PrestaShop Addons - niesprawdzone merytorycznie.
7. Prowizja i proces publikacji w IdoSell Apps - nie podane publicznie.
8. Dokładne brzmienie nowych zasad Shopify z 10.11.2026 i wymogu listy adresów IP - znam tylko ze źródeł wtórnych; sprawdź w dokumentacji dla partnerów, czy Cloudflare Workers spełnia ten wymóg.
9. Aktualny podział przychodów Shopify (0% do 1 mln USD) - tylko z bloga zewnętrznego.
10. Rozbieżne liczniki opinii (wFirma, Ceneo Feed XML, Feedyio, Tale Commerce) - do potwierdzenia na listingach.
11. Jeden z poradników wspomina o darmowej wtyczce "InPost PL" od iLabs z liczbą "ponad 10 tys." (prawdopodobnie [shipdock](https://shipdockapp.pl/blog/shopify-wysylka-polska), przypisanie niepewne) - nie wiem, czego dotyczy ta liczba.

## Zrodla

Wszystkie adresy pochodzą z wyników wyszukiwania tej sesji (streszczenia, nie pełne strony) albo z dossier pierwszego sweepu (oznaczone "pierwszy sweep").

Shoper:
- https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf
- https://www.shoper.pl/regulaminy/regulaminy-integracji-i-rozszerzen
- https://www.shoper.pl/regulamin/regulamin-appstore-wydawcy
- https://www.shoper.pl/learn/artykul/jak-w-shoperze-utworzyc-warianty-aplikacji
- https://www.shoper.pl/learn/artykul/jak-w-shoperze-dodac-lub-zaktualizowac-aplikacje (pierwszy sweep)
- https://www.shoper.pl/program-partnerski/tworca-aplikacji (pierwszy sweep)
- https://yournextstore.com/pl/blog/shoper-ukryte-koszty
- https://matuszczak.pro/ranking-aplikacji-shoper
- https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/
- https://www.shopgadget.pl/shoper/appstore-aplikacje
- https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting (pierwszy sweep)
- https://storeleads.app/reports/shoper (pierwszy sweep)
- https://sprzedajewnecie.pl/shoper-opinie-recenzja/
- https://24hshop.pl/shoper-opinie-funkcje-i-cennik-czy-to-sie-oplaca

Shopify - zasady i ekonomia:
- https://www.shopifreaks.com/shopify-tightens-its-app-store-rules-with-identity-checks-install-minimums-for-new-listings-and-removal-of-apps-with-no-installs/
- https://community.shopify.dev/t/shopify-s-new-rules-clean-up-app-store-spam-finally-addressing-the-store-s-biggest-problem/39693
- https://luseri.com/shopify-app-review-process
- https://daily.dev/posts/shopify-app-store-submission-requirements-build-grow-then-expand-azqvzj2fa
- https://dev.to/raxxostudios/shopifys-new-ip-allowlist-rule-hits-its-first-deadline-today-36a7
- https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026 (pierwszy sweep)
- https://storeleads.app/reports/shopify/PL/top-stores (pierwszy sweep)
- https://www.onemilliongoal.com/p/what-986-solo-startups-actually-look (pierwszy sweep)

Shopify - faktury, NIP, księgowość:
- https://apps.shopify.com/fakturownia-integration/reviews
- https://apps.shopify.com/reviews/1788613
- https://apps.shopify.com/wfirma-invoices/reviews
- https://apps.shopify.com/wfirma-invoices
- https://apps.shopify.com/ifirma
- https://www.wpdesk.pl/docs/ifirma-dla-shopify/
- https://www.wpdesk.pl/docs/wfirma-dla-shopify/
- https://pomoc.ifirma.pl/pomoc-artykul/e-sklepy-najczesciej-spotykane-pytania/
- https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/
- https://kkdigital.pl/fakturowanie-w-shopify-ksef/
- https://community.shopify.com/t/legal-requirement-in-poland-need-vat-nip-field-in-checkout/556266
- https://community.shopify.com/c/technical-q-a/adding-a-dedicated-nip-field-for-vat-invoices-in-checkout/m-p/3027446
- https://sdconcept.pl/blog/nip-w-checkoutcie-shopify
- https://intercom.help/makeiteasy/en/articles/9598022-b2b-handling-collect-vat-id-and-send-it-to-fakturownia
- https://apps.shopify.com/custom-checkout-fields
- https://kuberstar.com/products/fieldpilot
- https://apps.shopify.com/exemptify
- https://amavat.pl/czy-ksiegowy-musi-znac-shopify/
- https://amavat.pl/czy-shopify-obsluguje-ksef/
- https://base.com/pl-PL/blog/shopify-w-polsce/
- https://apps.shopify.com/bizyness
- https://apps.shopify.com/simplevat
- https://apps.shopify.com/vat-guard
- https://miaconsultgroup.pl/en/e-commerce/
- https://base.com/pl-PL/integracje/shopify/subiekt/
- https://base.com/pl-PL/integracje/shopify/optima/
- https://base.com/pl-PL/integracje/shopify/wfirma/
- https://panel.sellintegro.pl/pl/54-shopify
- https://www.web-systems.pl/integracja-woocommerce-subiekt-optima/

Shopify - przewoźnicy:
- https://apps.shopify.com/inpost-4/reviews
- https://rankbase.io/compare-shopify-apps/inpost-4-vs-paczkomaty-inpost
- https://apps.shopify.com/paczkomaty-inpost
- https://inpostpaczkomatyorlenpaczka.pl/docs/
- https://apps.shopify.com/collections/thank-you-order-status-pickup-points
- https://apps.shopify.com/pointly-punkty-odbioru
- https://apps.shopify.com/atlas-pickup-points
- https://apps.shopify.com/packeta?locale=pl
- https://www.asttero.com/en/blog/post/top-6-courier-apps-on-shopify
- https://www.apaczka.pl/integracje/shopify-2/mapa-punktow-shopify/
- https://shipdockapp.pl/blog/shopify-wysylka-polska

Shopify - Ceneo, Allegro:
- https://apps.shopify.com/ceneo-feed-xml/reviews
- https://apps.shopify.com/ceneo-feed-xml
- https://apps.shopify.com/reviews/1525949
- https://shoplist.co/apps/feedyio-product-xml-feeds
- https://feedyio.com/product-feed/ceneo
- https://feedyio.com/post/ceneo-zaufane-opinie-shopify
- https://apps.shopify.com/allegro-od-wp-desk
- https://apilo.com/pl/integracje/allegro/shopify/

Shopify - Omnibus, GPSR, przycisk odstąpienia:
- https://apps.shopify.com/omnibus-price
- https://apps.shopify.com/omnibusready
- https://apps.shopify.com/omnibus-price-compliance
- https://apps.shopify.com/omnibus-by-netkodo
- https://apps.shopify.com/eu-omnibus-price-tracker
- https://apps.shopify.com/omnibus-compliant-price?locale=cs
- https://netkodo.com/pl/blog/top-shopify-omnibus-plugins-in-2026-comparison-features--compliance-guide
- https://apps.shopify.com/gpsready
- https://apps.shopify.com/gpsr-ready
- https://apps.shopify.com/gpsr-dpp-compliance
- https://apps.shopify.com/widerrufs-button-eu
- https://apps.shopify.com/withdrawly
- https://apps.shopify.com/eu-withdrawal-button-5
- https://apps.shopify.com/tc-eu-withdrawal-button
- https://apps.shopify.com/eu-withdrawal-ai
- https://apps.shopify.com/withdrawbutton
- https://apps.shopify.com/widerruf-button
- https://apps.shopify.com/eu-widerruf-pro
- https://apps.shopify.com/eu-withdrawal-button-pro
- https://apps.shopify.com/eu-widerrufsbutton

Braki Shopify w Polsce (blogi agencji i konkurentów):
- https://www.idosell.com/pl/blog/idosell-vs-shopify-pelne-koszty-prowadzenia-sklepu-w-polsce
- https://www.spaceads.pl/blog/czy-warto-zalozyc-sklep-na-shopify
- https://thenewlook.pl/shopify-w-polsce/
- https://jflowlabs.pl/wiedza/shopify-czy-woocommerce/

IdoSell, PrestaShop, WooCommerce:
- https://www.idosell.com/pl/idosell-apps
- https://www.idosell.com/pl/dla-developerow/
- https://addons.prestashop.com/en/content/1-faq
- https://addons.prestashop.com/en/content/25-how-to-sell-on-prestashop-addons (pierwszy sweep)
- https://wordpress.org/plugins/ksef-for-flexible-invoices/
- https://www.wpdesk.pl/kategoria-docs/wtyczki/changelog/page/3/
- https://en-ca.wordpress.org/plugins/?p=270569
