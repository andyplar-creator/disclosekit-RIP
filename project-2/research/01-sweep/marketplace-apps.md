# Soczewka: marketplace-apps (małe płatne aplikacje i wtyczki sprzedawane przez marketplace'y)

Data badania: 2026-11-26.

**Uczciwie o stanie badania (przeczytaj najpierw):**

- Wykonałem 23 udane wyszukiwania. Potem wyczerpał się wspólny limit wyszukiwań dla całego przebiegu (200 na turę, dzielony z innymi badaczami). Planowałem ok. 30-35, więc część soczewki jest **niedokończona**.
- Nie mogłem otwierać stron bezpośrednio (sieć kontenera to blokuje). Wszystkie liczby poniżej pochodzą z podsumowań wyników wyszukiwania dla podanych adresów. Przed decyzją kliknij i potwierdź 5-6 kluczowych liczb (oznaczyłem je **[DO POTWIERDZENIA]**).
- Nie mam narzędzia do wolumenów słów kluczowych. **Żaden kandydat nie przechodzi bramki R4 "na liczbach"** (>=1000 wyszukiwań/mies.), bo tej liczby nie da się tu uczciwie podać. Mam tylko wskaźniki pośrednie: płatni konkurenci z publicznym cennikiem, liczba opinii aplikacji, liczba sklepów na platformie.
- Nie zbadałem w ogóle: IdoSell, Figma, Notion, Airtable, Slack, monday.com, Wix, Zendesk/HubSpot. Zbadałem tylko powierzchownie: Atlassian, Chrome Web Store, Allegro, BaseLinker, PrestaShop, Shoper (brak stawki prowizji).

Oznaczenia: **[liczba]** = liczba ze źródłem, **[fakt]** = zaobserwowany fakt ze źródłem, **[wniosek]** = moje rozumowanie bez źródła, **szacunek** = moje zgadywanie.

---

## Werdykt

**Kanał jest dobry, ale luki są cienkie.** Marketplace'y z własnym ruchem kupujących to jedyny typ dystrybucji, który realnie rozwiązuje Twój problem "brak publiczności, zero outboundu". To potwierdza się na poziomie platform. Natomiast przy konkretnych pomysłach większość umiera: prawie każda polska potrzeba e-commerce (InPost, faktury, KSeF, Ceneo, NIP w koszyku) ma już 2-5 tanich aplikacji, często od WP Desk albo od agencji, które dają narzędzia za darmo jako przynętę.

**Przeżyły 2 pomysły, oba warunkowo:**

1. **PLAR Orders jako aplikacja w Shopify App Store ("PO/e-mail -> szkic zamówienia")** - jedyny pomysł, w którym masz realną przewagę (działający silnik + referencja produkcyjna), są płatni konkurenci z cennikami i kanał sam przyprowadza kupujących. Słabość: nisza jest mała i ma już 2 graczy. Pewność: średnia-niska.
2. **Aplikacja "polska nisza" dla Shopify (np. faktury wFirma + KSeF)** - rynek zweryfikowany i szybko rośnie, ale **nie zweryfikowałem konkretnej luki**. Pewność: niska. To raczej "sprawdź sam w 2 godziny" niż gotowy kandydat.

**Czego NIE robić z tej soczewki:** wtyczki KSeF do WooCommerce (tłok, ceny od 0 zł), narzędzia dla sprzedawców Allegro w Chrome (agencje rozdają za darmo), "przycisk odstąpienia od umowy" (to powtórka disclosekit: termin prawny + poradniki zamiast stron sprzedażowych).

**Rada mentorska [wniosek]:** najtańszy eksperyment w tej soczewce to nie nowy produkt, tylko wystawienie silnika, który już masz (PLAR Orders), tam, gdzie kupujący sami szukają. Twój obecny produkt ma dowód działania, ale nie ma dystrybucji. Marketplace to dystrybucja bez outboundu.

### Opłaty i tarcie platform (co udało się ustalić)

| Platforma | Prowizja / opłaty | Tarcie przy publikacji | Źródło |
|---|---|---|---|
| Shopify App Store | **[liczba]** 0% od pierwszego 1 000 000 USD przychodu (liczone od 1.01.2025, bez corocznego resetu), potem 15%; do tego 2,9% opłaty za przetwarzanie płatności | **[fakt]** Shopify nie podaje gwarantowanego czasu. Deweloperzy raportują w 2026 r. 2-4 tygodnie, czasem ponad miesiąc; w marcu 2026 pracownik Shopify mówił o ok. 30 dniach kolejki | [weekonelabs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026), [shopthemedetector](https://shopthemedetector.com/blog/shopify-app-store-statistics/), [luseri](https://luseri.com/shopify-app-review-process), [topcode](https://www.topcode.app/blog/shopify-app-review-process-explained), [forum Shopify](https://community.shopify.com/t/shopify-app-review-timeline-inquiry/582164) |
| Shopify - nowe limity | **[fakt, jedno źródło, NIEPOTWIERDZONE]** od początku listopada 2026 podobno: tylko 1 nowa aplikacja w recenzji naraz i wymóg >=10 płatnych instalacji każdej opublikowanej aplikacji przed zgłoszeniem następnej | Sprawdź w Partner Dashboard przed planowaniem | jeden z poradników o recenzji z listy wyżej (prawdopodobnie [luseri](https://luseri.com/shopify-app-review-process)) **[DO POTWIERDZENIA]** |
| Shoper App Store | **Nie ustaliłem stawki prowizji.** Istnieje "Regulamin App Store dla Wydawców" (od 28.06.2025) - tam będzie odpowiedź | **[fakt]** rejestracja w Programie Partnerskim -> sklep testowy -> weryfikacja przez administratora Shoper -> publikacja. Typowe powody odrzuceń: nadmiarowe uprawnienia, brak instrukcji, brak konta testowego | [regulamin PDF](https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf), [jak publikować](https://www.shoper.pl/learn/artykul/jak-w-shoperze-dodac-lub-zaktualizowac-aplikacje), [twórca aplikacji](https://www.shoper.pl/program-partnerski/tworca-aplikacji) |
| PrestaShop Addons | **[liczba]** sprzedawca dostaje 60-83% ceny netto (czyli prowizja ok. 17-40%, malejąca z obrotem); status "premium seller" kosztuje 3000 EUR netto rocznie | Walidacja modułu przez PrestaShop | [how to sell](https://addons.prestashop.com/en/content/25-how-to-sell-on-prestashop-addons), [warunki premium](https://addons.prestashop.com/displayLegalTerms.php?type=tc_seller_premium_en) |
| Atlassian Marketplace (Forge) | **[liczba]** od 1.01.2026 partner zatrzymuje 100% przychodu z aplikacji Forge do 1 000 000 USD przychodu łącznie; potem stawka standardowa | Aplikacja musi być w całości na Forge | [developer.atlassian.com](https://developer.atlassian.com/platform/marketplace/pricing-payment-and-billing/), [blog Atlassian](https://www.atlassian.com/blog/development/runs-on-atlassian-apps-can-now-take-home-100-of-marketplace-revenue) |
| Google Workspace Marketplace | **[wniosek, z pamięci]** marketplace nie obsługuje płatności - płatność robisz sam (Stripe) | **[fakt]** jest proces recenzji aplikacji | [Google - proces sprawdzania](https://developers.google.com/workspace/marketplace/about-app-review?hl=pl) |
| Chrome Web Store | **[wniosek, z pamięci]** brak wbudowanych płatności; trzeba własnego Stripe. **[fakt]** pośrednik ExtensionPay bierze 5% (wg bloga konkurenta - słabe źródło) | Recenzja rozszerzenia | [crxpay blog](https://crxpay.io/blog/chrome-extension-monetization-models-2026) **[DO POTWIERDZENIA]** |
| BaseLinker (Base.com) | **Nie znalazłem otwartego sklepu z aplikacjami z rozliczeniem.** **[fakt]** integracje partnerskie (głównie ERP) robią zewnętrzne firmy; **[liczba]** kosztują ok. 1380-1980 zł netto/rok albo 1000-6900 zł jednorazowo | Wejście przez program partnerski, nie przez "app store" | [blog Base](https://base.com/pl-PL/blog/zestawienie-integratorow-erp/), [syntropicsignal](https://syntropicsignal.ai/pl/blog/wdrozenie-baselinker-erp-koszt/) |

### Zarobki solo-deweloperów w marketplace'ach (tylko to, co opublikowane)

Wszystko poniżej to **deklaracje samych twórców, nieaudytowane**, i to zwycięzcy - nie średnia.

| Kto / co | Liczba | Uwagi | Źródło |
|---|---|---|---|
| Zigpoll (Shopify, solo) | **[liczba]** ok. 125 tys. USD MRR w połowie 2026; Shopify App Store to ok. 1/3 nowych rejestracji | Skrajny wyjątek, lata pracy, to nie jego pierwsza aplikacja | [Indie Hackers](https://www.indiehackers.com/post/tech/hitting-125k-mrr-as-a-solo-founder-by-doubling-down-on-the-right-segment-c4o2Tfs6mjdpip5yZhaO) |
| Notion2Sheets / Sync2Sheets (Google Workspace, solo) | **[liczba]** ponad 5 tys. USD MRR, ponad 66 tys. instalacji | Źródło ma ok. 2 lata - stare | [founderclub](https://www.founderclub.com/notion2sheets/) |
| Dodatek Notion -> Sheets (Google Workspace) | **[liczba]** 8400 USD MRR, ponad 400 płacących, prawie 40 tys. instalacji | Stare (2022-2024); twórca sam pisał o spowolnieniu | [Medium](https://medium.com/indie-hustle/his-notion-micro-saas-business-makes-8-400-mrr-1e2869633ad9) |
| BudgetSheet (Google Sheets, solo) | **[liczba]** 1,6 tys. USD MRR | Stare | [Indie Hackers](https://www.indiehackers.com/post/how-i-built-a-google-sheets-extension-making-1-6k-mrr-b42d845e6a) |
| Rozszerzenie Chrome za 29 USD jednorazowo | **[liczba]** ok. 20 tys. USD w 5 miesięcy, 822 sprzedaże | Relacja z drugiej ręki (post z r/SaaS) | [buildmvpfast](https://www.buildmvpfast.com/blog/chrome-extension-20k-solo-founder-lessons-2026) |
| "Średni dochód dewelopera Shopify" | **[liczba, niewiarygodna]** ok. 93 tys. USD/rok | Nie ufaj: średnią zawyżają giganci, źródła pierwotnego nie zweryfikowałem | [shopthemedetector](https://shopthemedetector.com/blog/shopify-app-store-statistics/) |

**Czego NIE znalazłem:** ani jednego opublikowanego wyniku solo-dewelopera z Shoper App Store, PrestaShop Addons, BaseLinkera, polskich wtyczek WooCommerce ani z Atlassian Marketplace. Brak danych to nie dowód, że się nie da - ale też nie dowód, że się da.

---

## Kandydaci

### 1. PLAR Orders w Shopify App Store: "e-mail/PDF z zamówieniem -> szkic zamówienia w Shopify"

**Dla kogo:** hurtownie i marki sprzedające B2B na Shopify, które dostają zamówienia mailem (PDF, Excel, treść maila) i przepisują je ręcznie do Shopify. Płaci właściciel sklepu albo kierownik obsługi zamówień. Rynek globalny, po angielsku.

**Problem:** **[fakt]** Shopify nie zamienia natywnie maila z zamówieniem na szkic zamówienia - oficjalna ścieżka to ręczne tworzenie szkicu ([Ripplestep](https://ripplestep.com/email-purchase-order-to-shopify/)). To dokładnie ta praca, którą PLAR Orders już wykonuje u dystrybutora kawy, tylko z zapisem do Shopify zamiast do Google Sheets.

**Jak często:** codziennie / co tydzień (stała potrzeba) -> abonament z limitem liczby dokumentów. Zgodne z R2.

**Cena (propozycja, szacunek):** darmowe 5 szkiców na całe życie konta (to demo, nie pokrywa pracy - R3), potem 39 USD/mies. za 50 szkiców, 99 USD/mies. za 200, 249 USD/mies. za 750. Celowo między dwoma konkurentami (niżej).

**Kanał dystrybucji:** wyszukiwarka Shopify App Store (hasła typu "purchase order", "draft order", "wholesale", "B2B order entry") plus długi ogon Google, gdzie już dziś stoją strony sprzedażowe konkurentów. Nie wymaga publiczności ani outboundu. **[fakt]** nawet u bardzo dużego solo-twórcy App Store dostarcza ok. 1/3 nowych rejestracji ([Indie Hackers](https://www.indiehackers.com/post/tech/hitting-125k-mrr-as-a-solo-founder-by-doubling-down-on-the-right-segment-c4o2Tfs6mjdpip5yZhaO)).

**Konkurencja i ceny:**

| Konkurent | Cena | Co wiem | Słabość |
|---|---|---|---|
| PDF to Order (LevelOps) - [listing](https://apps.shopify.com/levelops-email-to-order) | **[liczba, wg konkurenta]** darmowo ok. 5 zamówień, potem ok. 100-250 USD/mies. plus opłata za użycie ([Ripplestep](https://ripplestep.com/levelops-alternatives/)) **[DO POTWIERDZENIA na listingu]** | **[liczba]** ocena 5,0 z 21 opinii; odznaka "Built for Shopify"; czyta PDF/Excel/CSV/maile, dopasowuje po SKU, stosuje cenniki B2B także poza planem Plus | **[fakt]** limit 50 pozycji na zamówienie; drogi próg wejścia |
| POinbox (Ripplestep) - [strona](https://ripplestep.com/products/poinbox/) | **[liczba]** darmowo 5 szkiców na zawsze; 29 USD/mies. za 40 szkiców; 79 USD/mies. za 120; Enterprise indywidualnie | Flaguje różnice cen i niepewne pozycje; prowadzi mocną kampanię treści SEO (naliczyłem co najmniej 9 artykułów na ten temat w jednym wyniku wyszukiwania) | **[fakt]** brak odznaki "Built for Shopify"; nie znalazłem niezależnych opinii |

**Dowody popytu:**

- **[fakt]** Dwie płatne aplikacje z publicznym cennikiem robią dokładnie to, w oficjalnym sklepie Shopify - czyli ktoś za to płaci ([LevelOps](https://apps.shopify.com/levelops-email-to-order), [POinbox](https://ripplestep.com/products/poinbox/)).
- **[liczba]** Lider ma tylko 21 opinii ([listing](https://apps.shopify.com/levelops-email-to-order)). To jednocześnie dowód, że kategoria istnieje, i ostrzeżenie, że jest mała.
- **[fakt]** Konkurent inwestuje w całą serię artykułów pod frazy typu "purchase order to Shopify draft order" ([przykład](https://ripplestep.com/email-purchase-order-to-shopify/)) - czyli sam uznał, że te frazy są warte walki. Wolumenu nie znam.
- **[wniosek]** Wyniki dla tych fraz są transakcyjne (listingi aplikacji, strony z cennikiem), a nie tylko poradniki. To odwrotność sytuacji z disclosekit.

**Dlaczego nie ChatGPT:** ChatGPT wyciągnie pozycje z jednego PDF-a w 10 minut, ale nie zrobi reszty: nie odbierze poczty sam, nie dopasuje pozycji do katalogu sklepu, nie zastosuje cennika B2B klienta, nie utworzy szkicu zamówienia w Shopify i nie zrobi tego 30 razy dziennie bez człowieka. Tu wartością jest integracja i praca bez nadzoru - twardy powód z reguły substytucji. **[wniosek]**

**Zakres v1 (szacunek 2-3 tygodnie z agentem + czas recenzji Shopify):** silnik ekstrakcji już masz. Do zrobienia: logowanie przez Shopify, dopasowanie pozycji do katalogu sklepu, utworzenie szkicu zamówienia, ekran zatwierdzania w panelu Shopify, rozliczenia przez system Shopify, adres e-mail do przekazywania zamówień na Cloudflare. **[wniosek, z pamięci - do potwierdzenia]:** aplikacje w App Store muszą rozliczać się przez billing Shopify (nie przez Twój Stripe) i potrzebują zgody na dostęp do danych klientów.

**Pasywność (szacunek):** 2-4 h/tydz. przy kilkunastu-kilkudziesięciu klientach. Źródło pracy: błędnie odczytane dokumenty i pytania przy wdrożeniu. Wzorzec "człowiek zatwierdza szkic" ogranicza skutki błędów. Wsparcie po angielsku.

**Ryzyko (od największego):**

1. **Mała nisza.** 21 opinii lidera sugeruje, że w całej kategorii jest najwyżej kilkaset płacących sklepów (szacunek). Realny sufit dla trzeciego gracza to raczej kilkaset do ok. 2 tys. USD MRR (szacunek), nie "drugi Zigpoll".
2. **Wchodzisz jako trzeci**, bez odznaki "Built for Shopify" i bez opinii, a ranking w App Store nagradza opinie.
3. **Shopify może to wbudować** w swojego asystenta AI (Sidekick). Nie zweryfikowałem, czy już to robi. **[wniosek]**
4. **Czas recenzji 2-4+ tygodnie** wydłuża pętlę nauki - a właśnie długa pętla zabiła disclosekit.
5. Jeśli potwierdzi się limit "10 płatnych instalacji przed kolejną aplikacją", pierwsza aplikacja musi być trafiona.

**Jak tanio sprawdzić chęć zapłaty PRZED kodem (R1):**

1. (0 zł, 30 min) Wpisz w wyszukiwarkę App Store "purchase order", "draft order", "PO", "wholesale order" i zobacz podpowiedzi oraz ile aplikacji robi to samo. Sprawdź daty pierwszych opinii LevelOps - jeśli 21 opinii zebrali w 2+ lata, popyt jest słaby.
2. (ok. 100 EUR) Strona "Prześlij maila z zamówieniem -> dostań szkic w Shopify" z przyciskiem Stripe "pilot za 29 USD" + Google Ads na frazy dokładne ("purchase order to shopify", "pdf to shopify order", "levelops alternative", "poinbox"). **Kryterium zabicia (propozycja):** mniej niż 2 płatne zapisy lub mniej niż 5 sensownych zgłoszeń ze 100 EUR -> nie budujemy.
3. Dopiero potem łącznik do Shopify. Pierwszych testerów można obsłużyć instalacją bezpośrednią, zanim aplikacja przejdzie recenzję (z pamięci - do potwierdzenia).

**Ocena R4:** **warunkowo.** Zweryfikowane: ludzie już za to płacą (2 płatne aplikacje z cennikami), wyniki są transakcyjne. Niezweryfikowane: wolumen wyszukiwań - prawdopodobnie poniżej progu 1000/mies. (szacunek). Bramkę R4 w ścisłym brzmieniu ten pomysł **raczej nie przechodzi**; przechodzi jej "ducha" (istniejący, płacący popyt w marketplace). Pewność ogólna: **średnia-niska**.

---

### 2. Aplikacja "polska nisza" w Shopify App Store (hipoteza: faktury wFirma + KSeF dla Shopify)

**Dla kogo:** polskie sklepy na Shopify. **[liczba]** 19 199 aktywnych sklepów Shopify w Polsce (stan na 20.11.2026), wzrost 44% rok do roku w III kw. 2026, w tym 851 Shopify Plus ([StoreLeads](https://storeleads.app/reports/shopify/PL/top-stores)) **[DO POTWIERDZENIA]**. Dla porównania **[liczba]** Shoper: 15 448 aktywnych sklepów, spadek 1% r/r ([StoreLeads](https://storeleads.app/reports/shoper)).

**Problem:** Shopify to platforma globalna i nie ma polskich funkcji. **[fakt]** nie obsługuje natywnie KSeF ([amavat](https://amavat.pl/czy-shopify-obsluguje-ksef/)), nie ma pola NIP w standardowym koszyku ([sdconcept](https://sdconcept.pl/blog/nip-w-checkoutcie-shopify)), nie ma Paczkomatów. Każdą z tych rzeczy sklep dokupuje jako aplikację.

**Jak często:** przy każdym zamówieniu (codziennie) -> abonament miesięczny. Zgodne z R2.

**Cena:** 10-19 USD/mies. - tyle bierze rynek (niżej).

**Kanał dystrybucji:** Shopify App Store, wyszukiwania po nazwie polskiej usługi ("InPost", "Fakturownia", "wFirma", "KSeF", "Ceneo"). Polski sprzedawca szuka dokładnie tej nazwy.

**Konkurencja i ceny - czyli dowód, że Polacy płacą za takie aplikacje:**

| Potrzeba | Aplikacja | Cena | Opinie | Źródło |
|---|---|---|---|---|
| Paczkomaty | InPost - Tale Commerce | **[liczba]** 19 USD/mies. | **[liczba]** 4,9 (48) | [listing](https://apps.shopify.com/paczkomaty-inpost) |
| Paczkomaty + Orlen Paczka | Codie | nie ustaliłem | **[liczba]** 4,7 (42) | [pickyourapp](https://pickyourapp.com/products/inpost-paczkomaty-1) |
| Faktury wFirma | WP Desk | **[liczba]** 9,99 USD/mies. | **[liczba]** 3,0 z 2 ocen | [listing](https://apps.shopify.com/wfirma-invoices) |
| Faktury inFakt | WP Desk | **[liczba]** 9,99 USD/mies. | nie ustaliłem | [listing](https://apps.shopify.com/infakt) |
| Faktury inFakt | Make It Easy! | **[liczba]** 17,99 USD/mies. | nie ustaliłem | [kkdigital](https://kkdigital.pl/fakturowanie-w-shopify-ksef/) |
| Faktury Fakturownia (z KSeF) | Fakturownia Integration | nie ustaliłem | nie ustaliłem | [listing](https://apps.shopify.com/fakturownia-integration) |
| Faktury ogólne | Sufio | **[liczba]** od 7 USD (15 faktur) | nie ustaliłem | [kkdigital](https://kkdigital.pl/fakturowanie-w-shopify-ksef/) |
| Feed Ceneo | Ceneo Feed XML (Brand Active) | **[liczba]** 4,99 / 9,99 / 15,99 USD/mies. | nie ustaliłem | [listing](https://apps.shopify.com/ceneo-feed-xml?locale=cs) |

**Gdzie może być luka (hipoteza, NIE zweryfikowana):** jedyny słaby gracz, jakiego znalazłem, to aplikacja wFirma od WP Desk - ocena 3,0 przy 2 opiniach. Lepsza aplikacja "wFirma + KSeF + NIP w koszyku + korekty przy zwrotach" mogłaby zabrać tę jedną niszę.

**Dowody popytu:**

- **[liczba]** Rynek rośnie 44% r/r ([StoreLeads](https://storeleads.app/reports/shopify/PL/top-stores)).
- **[liczba]** Dwie aplikacje Paczkomatów mają razem ok. 90 opinii przy cenie 19 USD/mies. ([listing](https://apps.shopify.com/paczkomaty-inpost), [pickyourapp](https://pickyourapp.com/products/inpost-paczkomaty-1)) - to realni płacący.
- **[fakt]** Od 1.01.2027 kończy się wyjątek KSeF dla najmniejszych sprzedawców (do 10 000 zł faktur miesięcznie), więc w grudniu-styczniu wejdzie nowa fala małych sklepów, które muszą wystawiać faktury B2B w KSeF (wg podsumowania wyników dla artykułów o KSeF w WooCommerce, m.in. [bytewave](https://bytewave.pl/blog/top-wtyczki-ksef-woocommerce-2026/), [studiokalmus](https://studiokalmus.com/ksef-woocommerce)) **[DO POTWIERDZENIA]**. Pamiętaj lekcję z disclosekit: sam termin to nie popyt.

**Dlaczego nie ChatGPT:** faktura musi powstać automatycznie przy każdym zamówieniu, trafić do programu księgowego i KSeF, a numer KSeF wrócić do zamówienia. To integracja działająca bez człowieka - ChatGPT tego nie zastąpi. **[wniosek]**

**Ryzyko (od największego):**

1. **Luka nie jest potwierdzona.** 2 opinie przy aplikacji wFirma mogą znaczyć "słaby konkurent" albo "nikt tego nie potrzebuje". Nie umiem tego rozstrzygnąć bez wejścia na listing.
2. **Łatwy substytut:** sprzedawca może po prostu wybrać program do faktur, który ma dobrą aplikację (Fakturownia), zamiast czekać na lepszą integrację z wFirmą.
3. **Mały sufit:** ok. 19 tys. sklepów, z czego tylko część używa danego programu księgowego. Realnie kilkaset USD MRR dla późnego gracza (szacunek).
4. **Faktury i KSeF to obszar wrażliwy:** błąd integracji = problem podatkowy klienta = nerwowe zgłoszenia. To nie jest doradztwo podatkowe, ale psuje pasywność.
5. WP Desk i agencje shopifyowe znają ten rynek i mają klientów; Ty nie.

**Jak tanio sprawdzić (0 zł, 2 godziny, zrób sam w przeglądarce):** wejdź na apps.shopify.com, wyszukaj kolejno: InPost, Fakturownia, wFirma, inFakt, iFirma, KSeF, Ceneo, Omnibus, GPSR, Allegro, NIP, Przelewy24, pobranie. Dla każdej frazy zapisz: ile aplikacji, liczba opinii, treść opinii 1-3 gwiazdki. Luka = dużo opinii + powtarzające się skargi, albo fraza bez żadnej aplikacji. Bez tego kroku nie buduj.

**Ocena R4:** **popyt na kategorię: tak** (płatne aplikacje z opiniami, wyniki transakcyjne). **Popyt na konkretny produkt: niezweryfikowany.** Wolumenów fraz nie znam. Pewność ogólna: **niska**.

---

## Odrzucone pomysly i dlaczego

**Odrzucone merytorycznie:**

- **Wtyczka KSeF do WooCommerce.** Tłok i dno cenowe. **[liczba]** ByteWave od 69 zł netto/rok z wersją darmową ([ksef-woocommerce.pl](https://ksef-woocommerce.pl/)); FakturFlow darmowa bez limitów ([wordpress.org](https://en-au.wordpress.org/plugins/fakturflow-ksef/)); Ksefshop z darmowym planem 5 faktur/mies. i płatnymi 29/59/99 zł/mies. ([wordpress.org](https://wordpress.org/plugins/ksefshop-invoices/)); do tego dodatek WP Desk do Flexible Invoices ([wordpress.org](https://en-ca.wordpress.org/plugins/ksef-for-flexible-invoices/)). Co najmniej 5 graczy, część za darmo. Spóźniłeś się o rok.
- **"Przycisk odstąpienia od umowy" (dyrektywa UE 2023/2673, od 19.06.2026).** Powtórka disclosekit. **[fakt]** w wynikach dla tej frazy widziałem wyłącznie kancelarie, blogi agencji i poradniki ([Lexology](https://www.lexology.com/library/detail.aspx?g=a2e80c28-95b0-45a5-85ef-c8464dceb184), [emedia](https://emedia.pl/baza-wiedzy/przycisk-odstapienia-dyrektywa-2023-2673-zwroty)) - zero stron z cennikiem. To potrzeba jednorazowa, a platformy (Shoper, Shopify, wtyczki prawne) prawdopodobnie wbudują ją same **[wniosek]**. Zastrzeżenie: nie zdążyłem sprawdzić rynku niemieckiego ("Widerrufsbutton"), gdzie sklepy tradycyjnie płacą za wtyczki prawne.
- **Narzędzia dla sprzedawców Allegro jako rozszerzenie Chrome.** **[fakt]** agencja rozdaje taki pakiet za darmo jako przynętę na klientów ([Processly w Chrome Web Store](https://chromewebstore.google.com/detail/processly-agency-stack/ecglijoheokfjnpkchdhpongkjoggbfa)); są też AleMenedżer ([Chrome Web Store](https://chromewebstore.google.com/detail/alemened%C5%BCer-allegro-ads/hoaobknblobdcolklibenpnalhpocola?hl=pl)) i Statystyki Helper (freemium, [socket.dev](https://socket.dev/chrome/package/aljdcoldpeoijkoaolkbcifemnjaggbf)); samo Allegro sprzedaje oficjalną analitykę **[liczba]** za 49 / 199 / 3000 zł za 30 dni ([raiseyoursales](https://raiseyoursales.pl/blog/allegro/allegro-analytics-twoje-narzedzie-do-budowania-przewagi-rynkowej/), źródło sprzed ok. 8 miesięcy). Konkurujesz z "za darmo" i z właścicielem platformy. Do tego rozszerzenie psuje się przy każdej zmianie strony Allegro - to nie jest pasywne **[wniosek]**.
- **Kolejna aplikacja Paczkomatów dla Shopify.** Dwóch graczy z ocenami 4,7-4,9 ([Tale Commerce](https://apps.shopify.com/paczkomaty-inpost), [Codie](https://pickyourapp.com/products/inpost-paczkomaty-1)). Brak słabości do wykorzystania, a API przewoźników wymaga stałej opieki.
- **Feed Ceneo dla Shopify.** Zajęte i tanie: **[liczba]** od 4,99 USD/mies. ([listing](https://apps.shopify.com/ceneo-feed-xml?locale=cs)). Przy takiej cenie i tak małym rynku nie ma na czym zarobić.
- **Moduł w PrestaShop Addons.** **[liczba]** platforma zabiera 17-40% ([how to sell](https://addons.prestashop.com/en/content/25-how-to-sell-on-prestashop-addons)), sprzedaż głównie jednorazowa, nie znalazłem żadnej konkretnej luki ani opublikowanych zarobków. Brak przewagi.
- **Integracja w katalogu BaseLinkera.** **[fakt]** to nie jest sklep z aplikacjami, tylko katalog integracji robionych przez firmy partnerskie, głównie łączniki ERP sprzedawane z wdrożeniem ([blog Base](https://base.com/pl-PL/blog/zestawienie-integratorow-erp/)). Wymaga relacji partnerskiej i wdrożeń - to usługa, nie pasywny produkt. Nie potwierdziłem, czy istnieje ścieżka samoobsługowa.
- **Rozszerzenia-boty dla Vinted/OLX.** Nie badałem (brak budżetu), odrzucam z zasady: automatyzacja wbrew regulaminom platform, ryzyko blokad kont klientów i ciągłe naprawianie po zmianach strony **[wniosek]**.

**Nie odrzucone, tylko NIEZWERYFIKOWANE - zabrakło budżetu wyszukiwań. Warte jednego dodatkowego sprawdzenia:**

- **Shoper App Store.** Znane fakty są zachęcające: **[liczba]** ok. 15,4 tys. sklepów ([StoreLeads](https://storeleads.app/reports/shoper)), ponad 250 dodatków ([matuszczak.pro](https://matuszczak.pro/ranking-aplikacji-shoper)), typowy abonament 20-200 zł/mies. ([growcommerce](https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/)), najczęściej instalowana aplikacja to "Shoper Regulaminy" za ok. 49 zł/mies. ([matuszczak.pro](https://matuszczak.pro/ranking-aplikacji-shoper)), a jedna agencja wypuściła 4 nowe aplikacje w samym październiku 2026 ([Scharmach](https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting)). Rynek tylko polski, więc Twój język jest przewagą. **Brakuje:** stawki prowizji i konkretnej luki. Platforma nie rośnie. Sprawdź regulamin wydawców i przejrzyj kategorie sklepu ręcznie.
- **Dodatek "polska usługa -> Arkusze Google" w Google Workspace Marketplace** (np. BaseLinker, Allegro albo KSeF do arkusza). Wzorzec jest udokumentowany: solo-twórcy łączników "X -> Sheets" raportowali 1,6-8,4 tys. USD MRR (tabela wyżej, dane stare), a PLAR Orders już zapisuje do Sheets. **Brakuje:** jakiegokolwiek dowodu, że ktoś szuka "BaseLinker" albo "KSeF" w tym marketplace, oraz przeglądu konkurencji (Make, Zapier, wbudowane eksporty).
- **Atlassian Marketplace (Forge).** Warunki finansowe świetne (100% przychodu do 1 mln USD - tabela wyżej), ale nie znalazłem zarobków solo-twórców i nie znasz Jiry od strony użytkownika. Słabe dopasowanie do Ciebie.
- **Wariant kandydata nr 1 dla WooCommerce B2B, Shoper albo Odoo.** Nie sprawdzałem.
- **IdoSell, Figma, Notion, Airtable, Slack, monday.com, Wix.** W ogóle nie zbadane.

---

## Zrodla

Shopify - ekonomia i recenzja aplikacji:
- https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026
- https://shopthemedetector.com/blog/shopify-app-store-statistics/
- https://www.indiehackers.com/post/tech/hitting-125k-mrr-as-a-solo-founder-by-doubling-down-on-the-right-segment-c4o2Tfs6mjdpip5yZhaO
- https://luseri.com/shopify-app-review-process
- https://www.topcode.app/blog/shopify-app-review-process-explained
- https://community.shopify.com/t/shopify-app-review-timeline-inquiry/582164

Shopify - zamówienia z maila/PDF (kandydat 1):
- https://apps.shopify.com/levelops-email-to-order
- https://ripplestep.com/products/poinbox/
- https://ripplestep.com/levelops-alternatives/
- https://ripplestep.com/email-purchase-order-to-shopify/
- https://www.pdf-to-order.com/en

Shopify w Polsce (kandydat 2):
- https://storeleads.app/reports/shopify/PL/top-stores
- https://fusionmarketing.pl/blog/najpopularniejsze-platformy-e-commerce-w-polsce-ranking-2026/
- https://apps.shopify.com/paczkomaty-inpost
- https://pickyourapp.com/products/inpost-paczkomaty-1
- https://apps.shopify.com/wfirma-invoices
- https://apps.shopify.com/infakt
- https://apps.shopify.com/fakturownia-integration
- https://apps.shopify.com/ceneo-feed-xml?locale=cs
- https://kkdigital.pl/fakturowanie-w-shopify-ksef/
- https://amavat.pl/czy-shopify-obsluguje-ksef/
- https://sdconcept.pl/blog/nip-w-checkoutcie-shopify
- https://feedyio.com/post/ceneo-zaufane-opinie-shopify
- https://www.ifirma.pl/ecommerce/integracje/shopify/

Shoper:
- https://storeleads.app/reports/shoper
- https://www.shoper.pl/program-partnerski/tworca-aplikacji
- https://www.shoper.pl/program-partnerski
- https://www.shoper.pl/static/regulaminy/integracje-i-rozszerzenia/regulamin-app-store-dla-wydawcow-od-2025-06-28.pdf
- https://www.shoper.pl/learn/artykul/jak-w-shoperze-dodac-lub-zaktualizowac-aplikacje
- https://matuszczak.pro/ranking-aplikacji-shoper
- https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/
- https://yournextstore.com/pl/blog/shoper-ukryte-koszty
- https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting

WooCommerce / KSeF:
- https://ksef-woocommerce.pl/
- https://bytewave.pl/blog/top-wtyczki-ksef-woocommerce-2026/
- https://studiokalmus.com/ksef-woocommerce
- https://wordpress.org/plugins/ksefshop-invoices/
- https://en-au.wordpress.org/plugins/fakturflow-ksef/
- https://en-ca.wordpress.org/plugins/ksef-for-flexible-invoices/

BaseLinker, PrestaShop, Allegro:
- https://base.com/pl-PL/blog/zestawienie-integratorow-erp/
- https://syntropicsignal.ai/pl/blog/wdrozenie-baselinker-erp-koszt/
- https://thenewlook.pl/baselinker-co-to-jest/
- https://addons.prestashop.com/en/content/25-how-to-sell-on-prestashop-addons
- https://addons.prestashop.com/displayLegalTerms.php?type=tc_seller_premium_en
- https://addons.prestashop.com/es/content/39-faq-contributors
- https://raiseyoursales.pl/blog/allegro/allegro-analytics-twoje-narzedzie-do-budowania-przewagi-rynkowej/
- https://chromewebstore.google.com/detail/processly-agency-stack/ecglijoheokfjnpkchdhpongkjoggbfa
- https://chromewebstore.google.com/detail/alemened%C5%BCer-allegro-ads/hoaobknblobdcolklibenpnalhpocola?hl=pl
- https://socket.dev/chrome/package/aljdcoldpeoijkoaolkbcifemnjaggbf

Google Workspace, Atlassian, Chrome - zarobki i warunki:
- https://www.founderclub.com/notion2sheets/
- https://medium.com/indie-hustle/his-notion-micro-saas-business-makes-8-400-mrr-1e2869633ad9
- https://www.indiehackers.com/post/how-i-built-a-google-sheets-extension-making-1-6k-mrr-b42d845e6a
- https://developers.google.com/workspace/marketplace/about-app-review?hl=pl
- https://developer.atlassian.com/platform/marketplace/pricing-payment-and-billing/
- https://www.atlassian.com/blog/development/runs-on-atlassian-apps-can-now-take-home-100-of-marketplace-revenue
- https://www.buildmvpfast.com/blog/chrome-extension-20k-solo-founder-lessons-2026
- https://crxpay.io/blog/chrome-extension-monetization-models-2026

Przycisk odstąpienia od umowy:
- https://www.lexology.com/library/detail.aspx?g=a2e80c28-95b0-45a5-85ef-c8464dceb184
- https://emedia.pl/baza-wiedzy/przycisk-odstapienia-dyrektywa-2023-2673-zwroty
