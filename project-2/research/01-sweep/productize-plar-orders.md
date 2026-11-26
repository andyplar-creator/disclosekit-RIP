# Soczewka: productize-plar-orders (samoobsługowe pochodne technologii PLAR Orders)

Data badania: 2026-11-26. Zakres: produkty typu "bałagan (e-mail / SMS / WhatsApp / PDF) -> uporządkowane dane -> człowiek zatwierdza -> arkusz / ERP", sprzedawane samoobsługowo.

Jak czytać oznaczenia przy twierdzeniach:
- **[T]** twarda liczba - liczba + link, pod którym ją widziałem.
- **[O]** obserwacja - fakt zaobserwowany w wynikach wyszukiwania + link.
- **[W]** wnioskowanie - moje rozumowanie, bez źródła. Traktuj jak hipotezę.
- **szacunek** - moja liczba z głowy. Nie jest dowodem.

**Ważne zastrzeżenie o jakości tego dokumentu.** Wykonałem 19 wyszukiwań z planowanych około 30. Potem wyczerpał się wspólny limit wyszukiwań tej sesji (200 na całą turę, dzielony przez wszystkich badaczy). Pięć ostatnich zapytań - wszystkie o rynek polski - nie zostało wykonanych. Lista tego, czego przez to NIE sprawdziłem, jest na końcu sekcji "Werdykt". Nie miałem też narzędzia do wolumenów wyszukiwań, więc w całym dokumencie nie ma ani jednej liczby "ile osób tego szuka". Wszędzie, gdzie reguła R4 wymaga wolumenu, piszę wprost: niezweryfikowane.

## Werdykt

**Ta soczewka jest słaba jako źródło PASYWNEGO dochodu. Jest sensowna tylko jako tani test drugiego, tańszego wariantu tego, co już sprzedajesz.** Przeżyło dwóch kandydatów, obaj warunkowo i obaj z niską pewnością. Żaden nie przechodzi R4 w pełni, bo wolumenu nie dało się zmierzyć.

Trzy rzeczy, które wyszły z danych i które warto zapamiętać niezależnie od wyboru projektu:

1. **Sama technologia przestała być przewagą. W 2026 każdy marketplace został zalany klonami zbudowanymi przez AI.**
   - Shopify, kategoria "zamówienie PDF/e-mail od klienta -> draft order": w jednym wyszukiwaniu wyszło co najmniej 12 aplikacji o prawie identycznej nazwie i funkcji (LevelOps PDF to Order, POMate, Pomelo, DraftFlow, POdraft, PO Desk, Orderseam, POClerk, POinbox, PO Engine, AutoApprove, PasteOrder) [O] (https://apps.shopify.com/po-to-draft-order, https://apps.shopify.com/po-to-order, https://apps.shopify.com/podraft, https://apps.shopify.com/poclerk, https://apps.shopify.com/orderseam, https://apps.shopify.com/autoapprove, https://apps.shopify.com/pasteorder-1, https://apps.shopify.com/poinbox-purchase-order-entry). Nie otwierałem każdej z osobna - to lista z wyników.
   - Lider tej kategorii, LevelOps, ma **21 opinii** przy cenach od 50 do 750 USD miesięcznie [T] (https://apps.shopify.com/partners/levelops, https://www.levelops.co/pdf-to-order-shopify-app). Klon POMate wystartował 7 maja 2026, ma **0 opinii** i ceny 9,90 oraz 19,90 USD miesięcznie [T] (https://apps.shopify.com/po-to-draft-order).
   - Ten sam obraz w Odoo (co najmniej 4 moduły "AI: PDF zamówienia -> sale order", w tym jeden opisany jako darmowy) [O] (https://apps.odoo.com/apps/modules/19.0/jjro_ai_sales_capture, https://apps.odoo.com/apps/modules/19.0/ai_sale_order_automation_vts, https://www.techultrasolutions.com/odoo-apps/ocr-ai-sale-orders) i w Shopify "faktura dostawcy -> stany magazynowe" (Smart Restock: 12 ocen; Importo: 1 ocena) [T] (https://apps.shopify.com/smartrestock/reviews, https://apps.shopify.com/importo).
   - Wniosek [W]: to, co umiesz zbudować z Claude Code w 2 tygodnie, umie też zbudować każdy inny. Twoja realna przewaga to nie kod, tylko rzeczy lokalne: polski język, polskie programy (Subiekt, Optima), spółka z fakturą VAT i jeden prawdziwy klient z listem referencyjnym.

2. **Tam, gdzie w tej branży są pieniądze (hurtownie), sprzedaż jest wdrożeniowa, a nie samoobsługowa.**
   - Polskie firmy wyceniają etap "mail/PDF/Excel -> ERP" na 8-22 tys. zł [T] (https://devstock.pl/blog/ai-iot-automatyzacje/automatyzacja-zamowien-hurtownia-b2b/), inna podaje 12-28 tys. EUR dla firmy 20-200 osób [T] (https://www.algorcomp.pl/ai/handel-hurtowy). To są liczby z materiałów sprzedażowych dostawców, nie z niezależnych badań.
   - Zagraniczni gracze (Choco, Workist, Turian, Hoshii) nie publikują cenników - "zapytaj o wycenę" [O] (https://choco.com/us/stories/suppliers, https://www.turian.ai/wholesale-and-distribution). Workist ma według Dealroom 10-50 mln USD finansowania [T] (https://dealroom.co/companies/workist/). Brak cennika = sprzedaż przez handlowca. To jest dokładnie ten model, którego nie chcesz.
   - W Polsce funkcję "zamówienia z maila odczytywane przez AI" ma już w pakiecie platforma B2B Ordify, plany od 279 zł netto miesięcznie [T] (https://ordify.pl/, https://ordify.pl/porownania/sellrocket). Czyli Twoja główna funkcja staje się dodatkiem do większego produktu konkurenta.

3. **Uniwersalny "parser skrzynki do arkusza" jest zajęty i właśnie dostał darmowy zamiennik.**
   - Parseur: siedmiocyfrowy roczny przychód, blisko 1000 płacących klientów, 6 osób, bez inwestorów [T] (https://saasclub.io/podcast/bootstrapped-saas-sylvestre-dupont-parseur/). Budują to od lat; pierwszych 50 klientów przyszło z Quory i wczesnego SEO.
   - Google Workspace Studio (agenci Gemini bez kodu) jest ogólnie dostępne i wliczone w plany Business i Enterprise [O] (https://workspace.google.com/blog/product-announcements/introducing-google-workspace-studio-agents-for-everyday-work?hl=en, https://spiritt.ai/resources/guides/google-workspace-ai). To bezpośredni zamiennik dla prostego "przyszedł mail -> dopisz wiersz w arkuszu".

**Moja rekomendacja jako sceptycznego inwestora:** nie wybierałbym projektu nr 2 z tej soczewki, chyba że inne soczewki wypadną gorzej. Jeśli już, to w tej kolejności: (1) konwerter wyciągów bankowych PDF -> MT940 dla biur rachunkowych, bo to jedyny naprawdę samoobsługowy kawałek tej technologii; (2) samoobsługowy "PLAR Orders Lite", ale traktowany uczciwie jako tańszy wariant istniejącej usługi, a nie jako pasywny dochód.

### Czego NIE udało się zweryfikować (limit wyszukiwań)

- Wolumeny wyszukiwań dla jakiegokolwiek słowa kluczowego (brak narzędzia).
- Cenniki polskich konwerterów wyciągów online (panodit.pl, ClearVault, mt940.pl). Znam tylko jedną cenę: Multicomp.
- Czy istnieje już polski dodatek "zamówienia z maila/PDF do Subiekta przez AI" - zapytanie nie zostało wykonane. Jedno wcześniejsze wyszukiwanie takiego dodatku nie pokazało, ale to słaby dowód.
- Warunki wpisu do katalogu "Rozwiązania partnerskie" InsERT (czy trzeba być partnerem, ile to kosztuje).
- Czy Subiekt GT/nexo przyjmuje zamówienie od klienta (ZK) z pliku EPP bez Sfery - to moja wiedza ogólna, nie sprawdzona w tej sesji.
- Zamawianie przez WhatsApp w polskim B2B - zapytanie nie zostało wykonane.
- Cenniki SaldeoSMART, Skanuj.to, BaseAI; prowizja i liczba sklepów w Shoper App Store; katalogi integracji Fakturowni, wFirmy, iFirmy; wymagania Zapier/Make/n8n dla publicznej integracji; wtyczki WooCommerce; aplikacje QuickBooks/Xero.

Jeśli chcesz, żeby te luki zostały domknięte, trzeba puścić kolejną turę z nowym limitem wyszukiwań. Kilka z nich sprawdzisz sam w 15 minut: wejdź na panodit.pl, clearvaultapp.com i mt940.pl i zobacz, czy i ile biorą.

## Kandydaci

### 1. Konwerter wyciągów bankowych PDF -> MT940 / CSV / Excel dla polskich biur rachunkowych

Pewność: **niska**. To najbardziej samoobsługowy kawałek Twojej technologii (PDF -> dane -> plik do programu księgowego), ale nie korzysta z Twojej referencji w hurcie.

- **Dla kogo:** biura rachunkowe i samodzielni księgowi, którzy dostają od klientów wyciągi w PDF i muszą je wczytać do Optimy, Symfonii, Rewizora, RAKS-a. Płaci właściciel biura.
- **Problem:** program księgowy wczytuje MT940, a klient przysyła PDF. Bez narzędzia operacje przepisuje się ręcznie.
- **Jak często:** co miesiąc, dla każdego klienta biura. Potrzeba powtarzalna.
- **Cena (R2):** abonament z limitem plus paczki dla użytkowników okazjonalnych. Propozycja: 49 zł/mies. za 30 wyciągów, 149 zł/mies. za 150, paczka 10 wyciągów za 29 zł - to wszystko **szacunek**. Kotwice z rynku: Multicomp sprzedaje konwerter na komputer za **410 zł netto, licencja wieczysta, jedno stanowisko** [T] (https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html); zagraniczny lider ma plany **15-99 USD miesięcznie** [T] (https://www.solounicorn.club/blog/day-76-bankstatementconverter). Darmowy poziom (R3): jedna strona wyciągu jako demo, nigdy cały plik.
- **Kanał dystrybucji:** istniejące wyszukiwania w Google + Twój generator stron programmatic SEO (strona na każdą parę "bank x program księgowy", np. "wyciąg mBank PDF do Optimy"). Konkurent ClearVault już robi dokładnie to po polsku [O] (https://clearvaultapp.com/pl/mbank-pdf-wyciag-bankowy-do-excel). Do tego mały test Google Ads. Kanał nie zależy od Twojej publiczności.
- **Konkurencja i ceny:**
  - Pan od IT - konwerter online PDF -> MT940/STA, sprawdza saldo początkowe i końcowe; ceny nie znam [O] (https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940).
  - ClearVault - PDF/CSV/Excel/MT940 na wejściu, MT940/CAMT.053/CSV/Excel na wyjściu, wymienia Optimę, Symfonię, nexo; ceny nie znam [O] (https://clearvaultapp.com/).
  - Multicomp - program na Windows, 410 zł netto jednorazowo [T] (link wyżej).
  - panodinformatyki.com - rozpoznawanie banków (mBank, PKO BP, Santander, Pekao), kodowanie CP1250; ceny nie znam [O] (https://panodinformatyki.com/konwersja-wyciagu-bankowego-pdf-na-csv-mt940-i-import-do-programu-ksiegowego/).
  - mt940.pl i Mobevo - usługi konwersji; strony Mobevo są stare [O] (https://mt940.pl/jak-dziala-mt940/, https://pomoc.mobevo.pl/wiedza/wyciagi-bankowe/).
  - Słabości, które widzę [W]: brak publicznych cenników w wynikach, jedno rozwiązanie wymaga instalacji na Windows. Nie wiem, jak dobrze działają - nie testowałem żadnego.
- **Dowody popytu:**
  - Na polskie zapytanie o konwerter wyciągów wyszukiwarka zwróciła co najmniej 6 stron narzędzi i sklepów, a nie poradniki [O] (linki wyżej). To spełnia jakościową część R4 (wyniki transakcyjne).
  - Ktoś w Polsce sprzedaje to za 410 zł netto [T] (Multicomp, link wyżej) - dowód, że księgowi za to płacą. Nie wiem, ile sztuk sprzedaje.
  - Za granicą jednoosobowy bankstatementconverter.com (od marca 2021) był opisywany jako 9,7 tys. -> 16 tys. -> 38-40 tys. USD przychodu miesięcznie [T] (https://startupsemail.substack.com/p/a-super-boring-saas-with-9747-in, https://founderreports.com/interview/bank-statement-converter/, https://superframeworks.com/blog/bankconverter, https://www.solounicorn.club/blog/day-76-bankstatementconverter). Uwaga: to artykuły osób trzecich, nie zweryfikowane finanse.
  - **Dowód przeciwny, równie ważny:** klony o podobnej nazwie na TrustMRR pokazują zweryfikowany przychód **69 USD i 57 USD za ostatnie 30 dni** [T] (https://trustmrr.com/startup/bank-statement-converter, https://trustmrr.com/startup/bank-statement-converter-pro). Czyli pierwszy gracz zarabia, a naśladowcy prawie nic.
- **Dlaczego nie ChatGPT:** (a) MT940 to sztywny format z odmianami dla różnych programów i polskim kodowaniem znaków - czat nie odda poprawnego pliku przy wyciągu na kilkanaście stron [W]; (b) narzędzie sprawdza, czy saldo początkowe + operacje = saldo końcowe, czat tego nie gwarantuje [W]; (c) wklejanie wyciągów klientów do publicznego czatu to kłopot z RODO dla biura [W]. Odpowiedź jest średnio mocna, nie żelazna.
- **Ryzyko:**
  - Największe: wchodzisz jako piąty-szósty gracz w grze o pozycje w Google, w której - sądząc po klonach za granicą - wygrywa pierwszy. Jeśli któryś polski konwerter online jest darmowy i działa dobrze, gotowość do zapłaty spada do zera. Tego nie sprawdziłem.
  - Wolumen wyszukiwań w Polsce: niezweryfikowany.
  - Dane finansowe klientów biura: potrzebna umowa powierzenia, polityka usuwania plików, zaufanie do nieznanej marki.
  - Każdy bank ma inny układ PDF. Założyciel zagranicznego lidera mówi, że zaczął od ogólnego algorytmu, a potem dopisywał poprawki dla każdego banku [O] (https://www.starterstory.com/stories/bankstatementconverter). To stała praca, nie jednorazowa.
  - Banki coraz częściej dają eksport MT940/CSV, a programy księgowe łączą się z bankami bezpośrednio - potrzeba może maleć [W].
- **Ocena R4:** część jakościowa (wyniki transakcyjne, płatni konkurenci) - **zaliczona** na podstawie obserwacji. Część ilościowa (1000 wyszukiwań miesięcznie albo 3 warianty po 100) - **niezweryfikowana**. Bez tego nie ma zgody na budowę.
- **Najtańszy test (R1), zanim powstanie kod:** (1) sprawdź ręcznie cenniki trzech konkurentów; (2) wpisz 5-10 fraz do Planera słów kluczowych w swoim koncie Google Ads (masz zweryfikowane konto - to jest brakujące narzędzie do R4); (3) jeśli wolumen jest, postaw landing ze Stripe i wydaj około 100 EUR na reklamy. Budowa dopiero po płatnościach lub wyraźnych próbach zapłaty.
- **Zakres v1 i czas:** wgranie PDF, odczyt operacji, kontrola sald, podgląd do poprawek, eksport MT940/CSV/XLSX, kredyty przez Stripe, strony SEO. Około 8-12 dni pracy z agentem (**szacunek**) plus ciągłe dostrajanie pod kolejne banki.
- **Pasywność:** 2-4 godziny tygodniowo wydaje się realne (**szacunek**), głównie nieudane konwersje i nowe układy wyciągów.

### 2. PLAR Orders Lite - samoobsługowe "zamówienia z maila i PDF -> plik do Subiekta / Optimy / arkusza"

Pewność: **niska**. Najmocniejsze fundamenty (masz kod, klienta i referencję), ale najsłabsza pasywność. To raczej drugi cennik Twojej obecnej usługi niż nowy pasywny projekt.

- **Dla kogo:** mała hurtownia lub dystrybutor (3-30 osób), która dostaje zamówienia mailem lub w PDF i przepisuje je ręcznie do Subiekta albo Optimy. Płaci właściciel.
- **Problem:** przepisywanie zamówień. Najtrudniejsza część to dopasowanie "jak klient nazwał towar" do własnego indeksu - to już umiesz.
- **Jak często:** codziennie.
- **Cena (R2):** abonament. Propozycja 199-399 zł netto miesięcznie zależnie od liczby zamówień, bez opłaty wdrożeniowej (**szacunek**). Kotwice: Ordify od 279 zł do 949 zł netto miesięcznie plus instalacja od 600 zł [T] (https://ordify.pl/); Twoja obecna oferta 4900 zł + od 800 zł miesięcznie; agencje 8-22 tys. zł za wdrożenie [T] (https://devstock.pl/blog/ai-iot-automatyzacje/automatyzacja-zamowien-hurtownia-b2b/). Darmowy poziom (R3): 20 zamówień na próbę, potem płatność.
- **Kanał dystrybucji:** Google Ads i SEO na polskie frazy typu "zamówienia z maila do Subiekta", "automatyzacja zamówień hurtownia". Możliwy drugi kanał: katalog "Rozwiązania partnerskie" na stronie InsERT, w którym użytkownicy Subiekta szukają dodatków [O] (https://www.insert.com.pl/dla_uzytkownikow/rozwiazania_partnerskie.html?query=zam%C3%B3wienia&offset=4). Warunków wpisu nie sprawdziłem. Uczciwie: to kanał **słaby do średniego**. Nie ma tu sklepu z aplikacjami, który sam przyprowadza kupujących.
- **Konkurencja i ceny:**
  - Ordify - platforma B2B z funkcją zamówień z maila przez AI, integracje z Subiektem nexo PRO, Optimą, Wapro; od 279 zł netto miesięcznie [T] (https://ordify.pl/, https://ordify.pl/porownania/sellrocket). Słabość [W]: trzeba kupić całą platformę, żeby dostać jedną funkcję.
  - CStore AI - automatyzacja ofert i zamówień z poprawką operatora przed wysłaniem do ERP [O] (https://www.cstore.pl/cstore-ai/); platforma od 450-990 zł miesięcznie, strony podają różne kwoty [T] (https://www.cstore.pl/cennik/, https://www.cstore.pl/cennik-b2b/).
  - Agencje wdrożeniowe (jflowlabs, devstock, algorcomp, codescriptum) - projekty na zamówienie, tysiące do dziesiątek tysięcy złotych [O] (https://jflowlabs.pl/wiedza/zamowienia-z-maila-do-systemu/, https://codescriptum.pl/automatyzacja-zamowien-warszawa/).
  - Dodatki do Subiekta importujące zamówienia z Excela/CSV/XML (Artoit, Importer) - wymagają Sfery, nie czytają PDF ani treści maila [O] (https://www.artoit.pl/moduly/gt/import_zamowien.html, https://www.insert.com.pl/dla_uzytkownikow/subiekt_gt/dodatki_rozszerzenia/rozwiazania_partnerskie/2388.html).
  - Parsemint - polski odczyt PDF przez AI, głównie faktury; darmowo 3 analizy miesięcznie, 49 zł i 199 zł miesięcznie [T] (https://www.parsemint.pl/, https://parsemint.pl/blog/import-faktur-do-subiekt-gt-nexo-jak-zautomatyzowac-klepanie-kosztow).
  - W jednym wyszukiwaniu nie znalazłem dodatku, który wczytuje zamówienia klientów z PDF prosto do Subiekta [O] (https://www.artoit.pl/dodatki_insert.html). To może być luka, a może po prostu brak popytu - nie wiem.
- **Dowody popytu:**
  - Co najmniej 6 polskich firm ma stronę ofertową dokładnie o tym [O] (linki wyżej). To dowód, że dostawcy widzą pieniądze. Nie jest to dowód, że hurtownik kupi sam, bez rozmowy.
  - Twój własny klient płaci za to od maja 2026 (fakt z Twojego profilu, nie z wyszukiwania).
  - Za granicą startup Hoshii raportował 160 tys. USD rocznego przychodu w sześć tygodni od pierwszej sprzedaży - liczba podana przez założyciela, nie zweryfikowana [T] (https://www.venturelab.swiss/Hoshii-The-Venture-Leader-Technology-automating-communication-for-wholesalers).
  - Wolumen wyszukiwań fraz zakupowych w Polsce: **niezweryfikowany**. Moje przypuszczenie [W]: dla wąskiej frazy "zamówienia z maila do Subiekta" jest mały.
- **Dlaczego nie ChatGPT:** czat nie zna kartoteki towarów i indeksów klienta, nie siedzi na skrzynce bez nadzoru, nie pamięta poprawek z wczoraj i nie odda pliku, który wczyta Subiekt. To mocna odpowiedź.
- **Ryzyko:**
  - Największe: **to nie będzie pasywne.** Właściciel hurtowni to nie jest kupujący "zarejestruj się i działaj". Wgranie kartoteki, przekierowanie poczty, import pliku do Subiekta - każdy krok to telefon albo mail do Ciebie. Przy 15-20 klientach liczę 3-6 godzin tygodniowo wsparcia (**szacunek**), czyli powyżej Twojego limitu.
  - Subiekt działa na komputerze klienta. Wersja w pełni chmurowa może tylko oddać plik do ręcznego importu (EPP lub CSV). Nie sprawdziłem, czy Subiekt przyjmie tak zamówienie bez płatnej Sfery.
  - Ordify i CStore mają tę funkcję w pakiecie i mają handlowców.
  - Brak sklepu z aplikacjami = brak wbudowanego ruchu. Zostają reklamy, a koszt kliknięcia w B2B bywa wysoki (w disclosekit było 13,48 zł za kliknięcie).
- **Ocena R4:** część jakościowa (strony ofertowe i cenniki konkurentów w wynikach) - **zaliczona**. Część ilościowa - **niezweryfikowana i prawdopodobnie niezaliczona** dla wąskich fraz. Warunkowo.
- **Najtańszy test (R1):** landing "Zamówienia z maila do Subiekta bez przepisywania - 199 zł miesięcznie, bez wdrożenia" + Stripe + około 100 EUR Google Ads na Polskę. Zanim wydasz pieniądze: Planer słów kluczowych dla 10 fraz. Kod już w większości masz, więc test dotyczy wyłącznie tego, czy hurtownik kupi sam.
- **Zakres v1 i czas:** samodzielna rejestracja, wgranie listy towarów z CSV, adres do przekierowania poczty, istniejący panel zatwierdzania, eksport CSV/EPP i Arkusze Google, abonament w Stripe. Około 5-10 dni (**szacunek**), bo rdzeń istnieje.
- **Pasywność:** 3-6 godzin tygodniowo przy kilkunastu klientach (**szacunek**). Przekracza limit 2-4 godzin.

## Odrzucone pomysly i dlaczego

| Pomysł | Dlaczego odpada |
|---|---|
| Aplikacja Shopify "zamówienie PDF/e-mail -> draft order" | Kanał jest prawdziwy (sklep z aplikacjami), ale nisza mała i zalana. Lider LevelOps: 21 opinii przy 50-750 USD/mies. [T] (https://apps.shopify.com/partners/levelops, https://www.levelops.co/pdf-to-order-shopify-app). Co najmniej 11 naśladowców, w tym POMate od 7 maja 2026 z 0 opinii i ceną 9,90 USD [T] (https://apps.shopify.com/po-to-draft-order), AutoApprove od 39 USD [T] (https://autoapprove.app/). Wejście jako trzynasty, bez przewagi językowej i bez doświadczenia z Shopify. |
| Aplikacja Shopify "faktura dostawcy PDF -> produkty i stany" | To samo: Smart Restock 12 ocen, Importo 1 ocena, do tego Salor Invoice, Uploader, ScanReady [T/O] (https://apps.shopify.com/smartrestock/reviews, https://apps.shopify.com/importo, https://apps.shopify.com/salor-invoice, https://apps.shopify.com/shopstock-scanready). Dużo podaży, mało dowodów popytu. |
| Moduł Odoo "AI: PDF zamówienia -> sale order" | Co najmniej 4 gotowe moduły i usługa PO2SO, jeden moduł opisany jako darmowy [O] (https://www.techultrasolutions.com/odoo-apps/ocr-ai-sale-orders, https://po2so.com/). Nie konkuruje się z darmowym. |
| Uniwersalny parser "skrzynka -> arkusz" albo dodatek do Gmaila | Parseur ma około 1000 płacących klientów i lata przewagi [T] (https://saasclub.io/podcast/bootstrapped-saas-sylvestre-dupont-parseur/); dodatek Xtractor kosztuje 5-40 USD/mies. [T] (https://xtractor.app/how-to-import-data-from-email-to-google-sheets-7-simple-steps/); Google Workspace Studio jest w cenie planów Business [O] (https://workspace.google.com/blog/product-announcements/introducing-google-workspace-studio-agents-for-everyday-work?hl=en). Reguła zamiennika: przegrana. |
| Pełne PLAR Orders dla hurtowni jako "pasywny" produkt (wdrożenie + integracja z ERP) | Konkurenci sprzedają przez handlowców i wyceny, wdrożenia trwają tygodnie [O] (https://www.algorcomp.pl/ai/handel-hurtowy, https://choco.com/us/stories/suppliers). Łamie regułę pasywności i regułę "bez sprzedaży bezpośredniej". To Twoja praca dzienna, nie projekt nr 2. |
| Odczyt faktur kosztowych PDF do Subiekta / Optimy / wFirmy / Fakturowni | KSeF: od 1 lutego 2026 duże firmy, od 1 kwietnia 2026 pozostali, od 1 stycznia 2027 najmniejsi [T] (https://kik.edu.pl/aktualnosci/ksef-2026-dla-kogo-bedzie-to-obowiazek/, https://ksef.startupkit.app/guides/ksef-obowiazkowy-2026). Faktury krajowe przychodzą jako gotowe dane, więc odczyt z PDF traci sens [W - źródła tego wprost nie potwierdziły]. Do tego zajęte przez Parsemint (49-199 zł/mies.), BaseAI, SaldeoSMART [O] (https://www.parsemint.pl/, https://baseai.pl/baseai-nexo-ocr). Rynek malejący i ciasny. |
| Wersja pionowa dla jednej branży (HoReCa, piekarnie, kwiaciarnie, składy budowlane, części) | Nie znalazłem żadnego kanału z wbudowanym popytem dla którejkolwiek z tych branż. Choco celuje w dystrybutorów żywności i sprzedaje przez wyceny [O] (https://choco.com/us/comparison). Bez publiczności i bez sprzedaży bezpośredniej nie ma jak dotrzeć. Polskiego rynku tych branż nie zbadałem (limit). |
| Bot do zamówień przez WhatsApp | Nie zbadane - zapytanie o polski rynek nie zostało wykonane. Odrzucam na podstawie wnioskowania [W]: wymaga pośrednika WhatsApp Business API, klienci oczekują działania całą dobę (łamie pasywność), a Choco już to ma w pakiecie [O] (https://www.zenml.io/llmops-database/scaling-order-processing-automation-using-modular-llm-architecture). |
| Integracja "zamówienia z maila -> BaseLinker" | Base ma API, ale w wynikach nie znalazłem otwartego sklepu z aplikacjami firm trzecich ani śladu takiej potrzeby [O] (https://brand.ceo/blog/baselinker-api-i-integracje/, https://baselinker.freshdesk.com/support/solutions/articles/43000650546-dost%C4%99pne-integracje). Bez kanału. Jedno wyszukiwanie - słaby dowód. |
| Aplikacja w Shoper App Store (np. faktura dostawcy -> stany) | Sklep z aplikacjami istnieje, wydawca ustala cenę, Shoper zatwierdza aplikacje [O] (https://www.shoper.pl/program-partnerski/tworca-aplikacji, https://www.shoper.pl/learn/artykul/jak-w-shoperze-utworzyc-warianty-aplikacji). Ale nie mam żadnego dowodu popytu na konkretną aplikację z tej soczewki, prowizji ani liczby sklepów. Nie odrzucam kanału - odrzucam brak dowodów. Warto, żeby zbadała to soczewka o marketplace'ach. |
| Lista w Zapier / Make / n8n jako kanał | Dla Parseur zadziałało, bo użytkownicy Zapiera z natury chcą wysyłać dane dalej [O] (https://saasclub.io/podcast/bootstrapped-saas-sylvestre-dupont-parseur/). Ale to kanał dla uniwersalnego parsera, który odrzuciłem wyżej. Wymagań publikacji nie sprawdziłem (limit). |
| "Faktura z KSeF -> przyjęcie towaru w sklepie internetowym" | Tylko hipoteza, która przyszła mi do głowy w trakcie. Zero badań (limit). Wymaga dostępu do KSeF klienta, czyli zaufania i odpowiedzialności. Nie traktuj jako kandydata. |

## Zrodla

Wszystkie poniższe adresy pochodzą z wyników wyszukiwania z 2026-11-26. Stron nie otwierałem bezpośrednio (sieć w tym środowisku na to nie pozwala), więc liczby pochodzą ze streszczeń wyników. Przed decyzją sprawdź kluczowe ceny ręcznie.

Parsery i konkurenci międzynarodowi:
- https://capterra.com/p/158536/Parseur/pricing/
- https://parseur.com/pricing.html
- https://parseur.com/compare-to/parsio-alternative
- https://saasclub.io/podcast/bootstrapped-saas-sylvestre-dupont-parseur/
- https://bootstrapped.fm/episodes/106-sylvestre-dupont-co-founder-of-parseur
- https://choco.com/us/stories/suppliers
- https://choco.com/us/comparison
- https://www.zenml.io/llmops-database/scaling-order-processing-automation-using-modular-llm-architecture
- https://restaurantinventorymanagementsoftware.com/solutions/choco
- https://dealroom.co/companies/workist/
- https://www.venturelab.swiss/Hoshii-The-Venture-Leader-Technology-automating-communication-for-wholesalers
- https://www.turian.ai/wholesale-and-distribution
- https://xtractor.app/how-to-import-data-from-email-to-google-sheets-7-simple-steps/
- https://workspace.google.com/blog/product-announcements/introducing-google-workspace-studio-agents-for-everyday-work?hl=en
- https://spiritt.ai/resources/guides/google-workspace-ai

Polski rynek zamówień i Subiekt:
- https://www.cstore.pl/cstore-ai/
- https://www.cstore.pl/cennik/
- https://www.cstore.pl/cennik-b2b/
- https://ordify.pl/
- https://ordify.pl/porownania/sellrocket
- https://devstock.pl/blog/ai-iot-automatyzacje/automatyzacja-zamowien-hurtownia-b2b/
- https://www.algorcomp.pl/ai/handel-hurtowy
- https://jflowlabs.pl/wiedza/zamowienia-z-maila-do-systemu/
- https://ignashev.ai/pl/blog/automatyzacja-zamowien-hurtownia/
- https://codescriptum.pl/automatyzacja-zamowien-warszawa/
- https://integrafy.pl/produkt/zamowienia-do-dostawcow/
- https://www.artoit.pl/dodatki_insert.html
- https://www.artoit.pl/moduly/gt/import_zamowien.html
- https://www.insert.com.pl/dla_uzytkownikow/subiekt_gt/dodatki_rozszerzenia/rozwiazania_partnerskie/2388.html
- https://www.insert.com.pl/dla_uzytkownikow/rozwiazania_partnerskie.html?query=zam%C3%B3wienia&offset=4
- https://www.parsemint.pl/
- https://parsemint.pl/blog/import-faktur-do-subiekt-gt-nexo-jak-zautomatyzowac-klepanie-kosztow
- https://baseai.pl/baseai-nexo-ocr

KSeF:
- https://kik.edu.pl/aktualnosci/ksef-2026-dla-kogo-bedzie-to-obowiazek/
- https://ksef.startupkit.app/guides/ksef-obowiazkowy-2026
- https://bizky.ai/blog/ksef-od-kiedy-obowiazkowy-harmonogram/

Wyciągi bankowe:
- https://panodit.pl/narzedzia/wyciag-bankowy-do-mt940
- https://sklep.multicomp.pl/konwerter-wyciagow-bankowych-do-formatu-mt940-li-p-493.html
- https://clearvaultapp.com/
- https://clearvaultapp.com/pl/mbank-pdf-wyciag-bankowy-do-excel
- https://panodinformatyki.com/konwersja-wyciagu-bankowego-pdf-na-csv-mt940-i-import-do-programu-ksiegowego/
- https://mt940.pl/jak-dziala-mt940/
- https://pomoc.mobevo.pl/wiedza/wyciagi-bankowe/
- https://founderreports.com/interview/bank-statement-converter/
- https://superframeworks.com/blog/bankconverter
- https://www.solounicorn.club/blog/day-76-bankstatementconverter
- https://www.starterstory.com/stories/bankstatementconverter
- https://startupsemail.substack.com/p/a-super-boring-saas-with-9747-in
- https://trustmrr.com/startup/bank-statement-converter
- https://trustmrr.com/startup/bank-statement-converter-pro

Marketplace'y (Shopify, Odoo, Base, Shoper):
- https://apps.shopify.com/levelops-email-to-order/reviews
- https://apps.shopify.com/partners/levelops
- https://www.levelops.co/pdf-to-order-shopify-app
- https://ripplestep.com/levelops-alternatives/
- https://www.capterra.com/p/10014165/LevelOps/
- https://apps.shopify.com/po-to-draft-order
- https://apps.shopify.com/po-to-order
- https://apps.shopify.com/podraft
- https://apps.shopify.com/poclerk
- https://apps.shopify.com/orderseam
- https://apps.shopify.com/autoapprove
- https://autoapprove.app/
- https://apps.shopify.com/pasteorder-1
- https://apps.shopify.com/poinbox-purchase-order-entry
- https://podraft.pages.dev/
- https://www.orderspot.in/
- https://apps.shopify.com/smartrestock/reviews
- https://apps.shopify.com/salor-invoice
- https://apps.shopify.com/importo
- https://apps.shopify.com/shopstock-scanready
- https://uploader.mvidev.com/
- https://apps.odoo.com/apps/modules/19.0/jjro_ai_sales_capture
- https://apps.odoo.com/apps/modules/19.0/ai_sale_order_automation_vts
- https://www.techultrasolutions.com/odoo-apps/ocr-ai-sale-orders
- https://po2so.com/
- https://brand.ceo/blog/baselinker-api-i-integracje/
- https://baselinker.freshdesk.com/support/solutions/articles/43000650546-dost%C4%99pne-integracje
- https://www.shoper.pl/program-partnerski/tworca-aplikacji
- https://www.shoper.pl/learn/artykul/jak-w-shoperze-utworzyc-warianty-aplikacji
