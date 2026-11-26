# Deep-dive: PLAR Orders dla Shopify (zamówienie z maila/PDF -> szkic zamówienia, listing w App Store)

Data badania: 2026-11-26. Slug: `shopify-po-to-draft-order`.

**Uczciwie o metodzie (przeczytaj najpierw):**

- Wykonałem 22 wywołania wyszukiwarki, czyli cały przydział. 21 zwróciło wyniki, 1 zostało odrzucone (wyszukiwarka nie ma dostępu do Reddita), więc **wątków z Reddita nie sprawdziłem w ogóle**.
- Nie mogłem otwierać stron bezpośrednio. Wszystkie liczby pochodzą ze streszczeń wyników wyszukiwania dla podanych adresów. Zanim podejmiesz decyzję, kliknij i potwierdź 5-6 kluczowych liczb (lista w sekcji "Otwarte pytania").
- Nie mam narzędzia do wolumenów słów kluczowych. W tym dokumencie nie ma ani jednej liczby "ile osób tego szuka". Reguły R4 w wersji liczbowej nie da się tu rozstrzygnąć.
- Statusy: **zweryfikowane** = liczba lub fakt + link; **częściowo** = dowód pośredni albo źródło stronnicze (np. strona konkurenta); **niezweryfikowane** = moje rozumowanie. Słowo **szacunek** oznacza moją liczbę z głowy, nie dowód.
- Z pamięci użytkownika nie wziąłem żadnych faktów (indeks notatek był pusty).

---

## Werdykt

**Słaby.** Bliżej "martwego" niż "warunkowego". Nie polecam tego jako projektu nr 2, chyba że tani test z sekcji R1 da wyraźny sygnał, zanim powstanie jakikolwiek kod pod Shopify.

**Rozstrzygnięcie sporu dwóch soczewek:** co do faktów rację miała soczewka "productize-plar-orders". W Shopify nie ma dwóch takich aplikacji, tylko kilkanaście. W tym badaniu niezależnie potwierdziłem co najmniej 9 odrębnych produktów, a 5-6 kolejnych nazw z pierwszego przeglądu nie udało mi się ponownie zobaczyć (nie znaczy to, że nie istnieją). Soczewka "marketplace-apps" miała rację w dwóch rzeczach: kanał jest prawdziwy i ktoś za to płaci. Pomyliła się w liczbie graczy, bo widziała tylko dwóch.

Pięć powodów werdyktu, od najważniejszego:

1. **Wchodziłbyś jako mniej więcej trzynasty, a późni gracze nie mają widocznej trakcji.** Lider (LevelOps) ma 21 opinii. Dwa klony, dla których znam daty startu, mają 0 opinii: POMate po ok. 6,5 miesiąca (start 7.05.2026) i POClerk po ok. 3,5 miesiąca (start 13.08.2026). To jest najlepszy dostępny pomiar tego, co dostaje trzeci-dziesiąty gracz w tej niszy: nic, co widać z zewnątrz. Linki w pytaniu 1.
2. **Dno cenowe już jest.** DraftGenius: 14,99 USD/mies. bez limitu. POMate: do 29,90 USD/mies. bez limitu. Twoja przewaga "mam działający silnik" nie jest przewagą, bo każdy z tych kilkunastu graczy też ma działający silnik.
3. **Ryzyko wchłonięcia przez platformę jest realne i bliskie.** Asystent Shopify (Sidekick) już dziś tworzy i edytuje szkice zamówień. Nie znalazłem dowodu, że czyta załączony PDF, ale to jeden krok. Konkurencyjna platforma BigCommerce już wypuściła własnego agenta "PDF/zdjęcie zamówienia -> koszyk", w fazie alfa za darmo.
4. **Nowa zasada Shopify z 10.11.2026 podnosi koszt pomyłki.** Po publikacji aplikacja musi zebrać 10 płatnych instalacji, zanim wolno zgłosić następną nową aplikację. Jeśli pierwsza aplikacja utknie na 3 instalacjach, kanał Shopify jest dla Ciebie zablokowany. Pierwszy strzał powinien iść w niszę, gdzie 10 instalacji jest prawdopodobne. Tu nie jest.
5. **Pętla nauki jest długa, a obsługa nie jest pasywna.** Pierwsza aplikacja Shopify to dla Ciebie nowa platforma (logowanie, panel osadzony, rozliczenia Shopify, wymagane webhooki, recenzja). Przy 5-8 h tygodniowo to 6-12 tygodni budowy (szacunek) plus 2-4+ tygodnie recenzji. Lider wygrywa szybkim wsparciem i sprzedaje aplikację razem z usługami. To są dokładnie warunki, w których umarł poprzedni projekt: długo budujesz, zanim rynek cokolwiek powie.

Co przemawia za pomysłem (żeby obraz był uczciwy): popyt istnieje i jest płatny (lider bierze 100-250 USD/mies. i ma same pięciogwiazdkowe opinie), B2B na Shopify rośnie o 74% rok do roku, koszt odczytu jednego zamówienia to grosze, a prowizja Shopify wynosi 0% do pierwszego miliona USD. To za mało, żeby zrównoważyć pięć punktów wyżej.

**Realny wynik w pierwszym roku (szacunek):** 0-300 USD miesięcznie, z dużym prawdopodobieństwem zera.

---

## Odpowiedzi na pytania zabojcze

### 1. Ile aplikacji w Shopify App Store zamienia zamówienie z maila / PDF / Excela na szkic zamówienia? 2 czy 12?

**Odpowiedź: około 12-15, nie 2.** Status: **zweryfikowane** dla 9 produktów poniżej (każdy z linkiem), **częściowo** dla reszty.

Potwierdzone w tym badaniu:

| # | Aplikacja | Opinie | Start | Cena | Link |
|---|---|---|---|---|---|
| 1 | PDF to Order (LevelOps) | 5,0 z 21 opinii | nie ustaliłem; istniała najpóźniej pod koniec października 2025 | 5 zamówień za darmo; 50 USD jednorazowo za 15 zamówień; 100 USD/mies. za 33; 250 USD/mies. do 100 | [listing](https://apps.shopify.com/levelops-email-to-order), [opinie](https://apps.shopify.com/levelops-email-to-order/reviews) |
| 2 | POinbox (Ripplestep) | nie ustaliłem | nie ustaliłem | 5 udanych szkiców za darmo; 29 USD/mies. za 40 szkiców | [strona produktu](https://ripplestep.com/products/poinbox/), [porównanie](https://ripplestep.com/levelops-alternatives/) |
| 3 | POMate: PO to Draft Order | 0 | 7.05.2026 | 10 szkiców za darmo (łącznie); płatne plany do 29,90 USD/mies. bez limitu | [listing](https://apps.shopify.com/po-to-draft-order) |
| 4 | POClerk: PO to Draft Order (MB Croppick) | 0 | 13.08.2026 | 10 zamówień za darmo; 79 USD/mies. za 150; 149 USD/mies. za 500 | [listing](https://apps.shopify.com/poclerk) |
| 5 | DraftGenius: Email to Order | nie ustaliłem | nie ustaliłem | Pro 14,99 USD/mies., bez limitu (wklejany tekst z maila/SMS, nie załączniki) | [listing](https://apps.shopify.com/draftgenius) |
| 6 | Portalink AnyOrder | nie ustaliłem | nie ustaliłem | instalacja darmowa; 6,00 USD za każdą transakcję (mail, faks, EDI) | [listing](https://apps.shopify.com/portalink-anyorder) |
| 7 | Quote Desk: AI B2B Quotes | nie ustaliłem | nie ustaliłem | darmowo do 5 wycen na 30 dni (wyceny + PDF-y zamówień -> szkic) | [listing](https://apps.shopify.com/quote-desk) |
| 8 | AutoApprove | nie ustaliłem | nie ustaliłem | nie ustaliłem w tym badaniu | [strona](https://autoapprove.app/) |
| 9 | OrderSpot: PDF to Draft Order | nie ustaliłem | nie ustaliłem | pierwsze 10 zamówień za darmo | [strona](https://www.orderspot.in/) |
| 10 | AutoPO (także zdjęcia odręcznych zamówień) | nie ustaliłem | nie ustaliłem | nie ustaliłem; nie wiem, czy jest w App Store | [strona](https://www.autopo.dev/) |

Nazwy z pierwszego przeglądu, których w tym badaniu **nie udało mi się ponownie potwierdzić** (adresy z dossier pierwszego przeglądu): Pomelo ([po-to-order](https://apps.shopify.com/po-to-order)), POdraft ([podraft](https://apps.shopify.com/podraft)), Orderseam ([orderseam](https://apps.shopify.com/orderseam)), PasteOrder ([pasteorder-1](https://apps.shopify.com/pasteorder-1)), DraftFlow, PO Engine.

Korekta pierwszego przeglądu: "PO Desk" to najpewniej **inna kategoria**. PODesk tworzy zamówienia do dostawców i pilnuje stanów magazynowych, nie czyta zamówień od klientów ([listing](https://apps.shopify.com/podesk-purchase-orders)). Czyli lista "12" zawierała co najmniej jeden fałszywy alarm, ale ja z kolei znalazłem nowe nazwy (DraftGenius, Portalink AnyOrder, Quote Desk, OrderSpot, AutoPO). Rząd wielkości się zgadza.

Wniosek (niezweryfikowane, moje rozumowanie): opinie ma tylko jeden gracz. Reszta wygląda jak fala klonów zbudowanych w 2026 r.

### 2. Jakie są dowody popytu po stronie sprzedawców?

**Odpowiedź: popyt istnieje, ale jest mały, a dowody pochodzą głównie od sprzedających aplikacje, nie od kupujących.** Status: **częściowo**.

- **Wzrost B2B na Shopify (zweryfikowane):** wartość sprzedaży B2B wzrosła o 74% rok do roku w III kw. 2026 (wyniki ogłoszone 3.11.2026) i o 76% w II kw. 2026 ([transkrypt Q3](https://www.fool.com/earnings/call-transcripts/2026/11/03/shopify-shop-q3-2026-earnings-call-transcript/), [omówienie Q3](https://finance.yahoo.com/markets/stocks/articles/shopify-inc-shop-q3-2026-210823609.html), [omówienie Q2](https://finance.yahoo.com/markets/stocks/articles/shopify-inc-shop-q2-2026-210423114.html)). Całkowita sprzedaż na platformie w III kw. 2026: 119 145 mln USD ([raport do SEC](https://www.sec.gov/Archives/edgar/data/0001594805/000159480526000067/exhibit991pressreleaseq320.htm)). **Nie znalazłem** kwoty B2B ani liczby sklepów korzystających z B2B.
- **Tempo opinii lidera (zweryfikowane punkty, moje wyliczenie):** wątek na forum Shopify, w którym przedstawiciel LevelOps odpisuje "nasza aplikacja już to robi", ma ok. 393 dni ([wątek](https://community.shopify.com/t/app-idea-pdf-to-order/573073)). Czyli aplikacja działa co najmniej 13 miesięcy i ma 21 opinii ([strona partnera](https://apps.shopify.com/partners/levelops)). To daje **najwyżej ok. 19 opinii rocznie**; jeśli aplikacja jest starsza, to mniej. Strona producenta pokazywała w starszych wersjach 5, a potem 17 opinii ([levelops.co](https://www.levelops.co/pdf-to-order-shopify-app)), więc opinie przyrastają, ale powoli. Daty pierwszej opinii nie ustaliłem.
- **Fora (częściowo):** jedyne dwa wątki, które wyszły, to **programiści** pytający "czy warto zbudować taką aplikację" ([App Idea - PDF To Order](https://community.shopify.com/t/app-idea-pdf-to-order/573073), [Validate Shopify App Idea](https://community.shopify.com/t/validate-shopify-app-idea/615180)). Nie znalazłem ani jednego wątku, w którym **sprzedawca** prosi o takie narzędzie. Zapytanie o prośby sprzedawców zwróciło wyłącznie strony sprzedażowe dostawców. Reddita nie dało się sprawdzić.
- **Treść opinii lidera (zweryfikowane):** sprzedawca pisze, że zamówienie na ponad 100 pozycji trwa poniżej 4 minut po sześciu latach ręcznego wpisywania; inny, że czas skrócił się o połowę ([listing](https://apps.shopify.com/levelops-email-to-order)). Ból jest prawdziwy u tych, którzy go mają.
- **Dostawcy inwestują w treści (zweryfikowane jako obserwacja):** LevelOps ma osobne strony pod branże (suplementy, kosmetyki), Ripplestep całą serię poradników ([przykład](https://ripplestep.com/pdf-purchase-order-to-shopify-draft-order/)). To dowód, że podaż widzi tu pieniądze. Nie jest to dowód wolumenu wyszukiwań.

Uczciwy obraz: wyniki wyszukiwania są transakcyjne (strony aplikacji i cenniki), co formalnie pasuje do jakościowej części R4. Ale to nisza, w której podaż rośnie szybciej niż widoczny popyt.

### 3. Czy Shopify ma lub zapowiedział natywną funkcję "mail/PDF z zamówieniem -> szkic"?

**Odpowiedź: nie znalazłem takiej funkcji, ale Shopify jest o jeden krok od niej.** Status: **częściowo** (brak dowodu to nie dowód braku; nie znalazłem oficjalnego zdania Shopify o załącznikach w Sidekicku).

- **Zweryfikowane:** Sidekick potrafi utworzyć szkic zamówienia i edytować zapisany; otwiera stronę szkicu z propozycją, a zapis następuje dopiero po Twoim kliknięciu "Zapisz". Dla szkicu B2B umie dodać numer zamówienia klienta ([pomoc Shopify](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/help-and-guidance)). Niezależny analityk B2B potwierdza, że w wydaniu Fall '26 Sidekick "tworzy lub edytuje szkice zamówień", i zauważa, że na 222 nowości tylko dwie dotyczą B2B ([Substack](https://jasongreenwoodb2becomm.substack.com/p/shopify-fall-26-editions-222-updates)).
- **Częściowo:** żadne źródło nie mówi, że Sidekick czyta wgrany PDF albo załącznik maila i robi z niego szkic. Konkurent pisze wprost, że Shopify natywnie tego nie umie ([Ripplestep](https://ripplestep.com/pdf-purchase-order-to-shopify-draft-order/)), ale to strona sprzedażowa sprzed ok. 2 miesięcy.
- **Precedens (zweryfikowane):** BigCommerce wypuścił własnego "Purchase Order Agent" w B2B Edition. Kupujący wgrywa PDF, arkusz albo zdjęcie odręcznej kartki, agent dopasowuje pozycje do katalogu, stosuje cennik klienta i buduje koszyk. W fazie alfa za darmo ([ogłoszenie B2B Edition](https://b2bedition.noticeable.news/publications/automate-purchase-order-entry-on-your-store-today)). Podobne funkcje mają już we własnym zakresie SAP ([pomoc SAP](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/565f8b8bd23944f1b04836a1b424c647.html)) i Oracle ([nota wydania](https://docs.oracle.com/en/cloud/saas/readiness/scm/25d/order25d/25D-order-mgmt-wn-f42608.htm)).
- **Niezweryfikowane, ale ważne:** skoro Sidekick tworzy szkic z polecenia tekstowego, to sprzedawca z kilkoma zamówieniami tygodniowo może już dziś wkleić treść maila do Sidekicka i poprosić o szkic. Nie sprawdziłem, czy to działa dobrze. To jest test na 15 minut w darmowym sklepie deweloperskim i **powinien być pierwszą rzeczą, którą zrobisz** (sekcja R1). Jeśli działa, pomysł pada na regule substytucji dla małych sklepów, a zostają tylko sklepy z dużym wolumenem, o które bije się kilkunastu graczy.

### 4. Aktualne zasady recenzji i wymagania Shopify

Status: **zweryfikowane** dla limitów zgłoszeń (oficjalna dokumentacja), **częściowo** dla reszty (poradniki firm trzecich, nie strony Shopify).

- **Limity zgłoszeń (zweryfikowane):** oficjalna dokumentacja potwierdza obie zasady. Tylko jedna nowa aplikacja w recenzji naraz. Po publikacji aplikacja potrzebuje 10 lub więcej płatnych instalacji, zanim zgłosisz następną nową aplikację. Zablokowane zgłoszenie ma status "Submission limited". Liczniki odświeżają się raz dziennie ([shopify.dev](https://shopify.dev/docs/apps/launch/app-store-review/submit-app-for-review)). Fora datują zmianę na 10.11.2026 i twierdzą, że limit liczy się na całe konto partnera ([wątek 1](https://community.shopify.dev/t/submission-limited-potential-issue-when-developing-more-than-one-app/39841), [wątek 2](https://community.shopify.dev/t/shopify-s-new-rules-clean-up-app-store-spam-finally-addressing-the-store-s-biggest-problem/39693)). Sklepy deweloperskie i okresy próbne podobno się nie liczą ([luseri](https://luseri.com/shopify-app-review-process)).
  - Niejasność: dokumentacja mówi "płatne instalacje", a jeden wpis na forum "instalacje w płatnych, aktywnych sklepach". To dwie różne rzeczy (sklep płacący Shopify kontra sklep płacący Tobie). Nie rozstrzygnąłem.
  - Bez odpowiedzi pozostaje pytanie, czy wycofanie słabej aplikacji odblokowuje zgłoszenia ([wątek](https://community.shopify.dev/t/does-unpublishing-apps-with-fewer-than-10-installs-restore-eligibility-to-submit-new-apps/39650)).
  - Co to znaczy dla Ciebie: to byłaby Twoja pierwsza aplikacja, więc limit nie blokuje startu. Blokuje **drugą próbę**, jeśli pierwsza nie zbierze 10 instalacji.
- **Czas recenzji (częściowo, z pierwszego przeglądu, nie sprawdzałem ponownie):** Shopify nie gwarantuje terminu; deweloperzy raportowali w 2026 r. 2-4 tygodnie, czasem ponad miesiąc ([luseri](https://luseri.com/shopify-app-review-process)). Nie wiem, jak nowe limity wpłynęły na kolejkę.
- **Prowizja (częściowo, źródła wtórne):** 0% od pierwszego 1 000 000 USD przychodu liczonego od 1.01.2025, potem 15%, plus 2,9% opłaty za przetwarzanie płatności ([weekonelabs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026), [shopthemedetector](https://shopthemedetector.com/blog/shopify-app-store-statistics/)). Jedno źródło pisze o progu "rocznym", inne o "łącznym". Dla Ciebie bez różnicy.
- **Rozliczenia (częściowo):** aplikacja w App Store musi pobierać opłaty przez system Shopify; płatności poza platformą są niedozwolone ([codersy](https://www.codersy.com/blog/shopify-api-development-best-practices/shopify-app-store-guidelines-key-requirements)). **Twoje konto Stripe tu się nie przyda.**
- **Obowiązkowe webhooki prywatności (częściowo):** trzeba je obsłużyć i odrzucać żądania z błędnym podpisem, nawet jeśli aplikacja nie przechowuje danych ([lista kontrolna](https://persephonepunch.github.io/crm-sync-setup/shopify-app-checklist.html), źródło słabe: prywatna strona).
- **Aplikacja osadzona (częściowo):** ma działać w panelu Shopify bez ciasteczek stron trzecich, także w trybie incognito; nowe aplikacje publiczne muszą używać nowszego interfejsu GraphQL (źródła podają różne daty: kwiecień 2025 albo kwiecień 2026) ([codersy](https://www.codersy.com/blog/shopify-api-development-best-practices/shopify-app-store-guidelines-key-requirements), [thewebtier](https://thewebtier.com/publish-shopify-app-to-app-store)).
- **Materiały do listingu (częściowo):** ikona 1200 x 1200 px, 3-6 zrzutów ekranu 1600 x 900 px, bez statystyk, opinii i cen na obrazkach ([postyourbuildideas](https://postyourbuildideas.com/checklists/shopify-app-listing-requirements)).
- **Odznaka "Built for Shopify" (częściowo):** co najmniej 50 instalacji netto w płatnych sklepach, 5 opinii i minimalna ocena z ostatniego okresu (ze streszczenia wyników dla poradników wyżej; dokładnego źródła nie umiem wskazać). Lider ma tę odznakę według strony konkurenta ([Ripplestep](https://ripplestep.com/levelops-alternatives/)). Ty zaczynałbyś bez niej.
- **Dostęp do danych klientów (niezweryfikowane, z mojej wiedzy):** aplikacja czytająca klientów i zamówienia musi osobno wystąpić o dostęp do chronionych danych. Listing lidera pokazuje prośbę o dostęp do szkiców i historii zamówień z 60 dni ([listing](https://apps.shopify.com/levelops-email-to-order)).

### 5. Ile realnie zarabiają nowe aplikacje Shopify w latach 2025-2026?

**Odpowiedź: większość nic. Twardych danych o przychodach nowych aplikacji nie ma; są dane o opiniach.** Status: **częściowo** (zewnętrzne zestawienia, nie dane Shopify).

- 51% z 22 546 aktywnych aplikacji ma zero opinii, a 81% mniej niż 10 (stan na czerwiec 2026) ([RevenueHunt](https://revenuehunt.com/state-of-the-shopify-app-economy/)).
- 55,4% z 21 749 aplikacji (12 049) ma zero opinii, 75,1% mniej niż pięć; aplikacja "środkowa" ma 0 opinii ([MetricHQ](https://metrichq.app/blog/shopify-app-store-statistics-2026)).
- W losowej próbie 400 listingów 80% aplikacji wypuszczonych w 2026 r. nie ma żadnej opinii ([Taylor Sicard](https://taylorsicard.com/blog/shopify-app-store-statistics-2026)).
- Według modelu RevenueHunt górny 1% (225 aplikacji) zbiera ok. 72% przychodów, a pierwsza dziesiątka prawie 30%. Autorzy sami zaznaczają, że to model kierunkowy, nie dane rozliczeniowe ([RevenueHunt](https://revenuehunt.com/state-of-the-shopify-app-economy/)).
- Sklep puchnie: raport z października 2026 liczy 31 075 aktywnych aplikacji ([AppstorePulse](https://www.appstorepulse.com/reports/state-of-shopify-app-store-october-2026)). Źródła różnią się metodą, więc traktuj to jako rząd wielkości.
- "Średni dochód dewelopera ok. 93 tys. USD rocznie" krąży po blogach bez źródła pierwotnego. Nie ufaj.
- **Czas do pierwszego płacącego sprzedawcy: nie znalazłem żadnych danych.** Niezweryfikowane.
- **Najtrafniejsza stopa bazowa to ta z samej niszy (zweryfikowane):** POMate po ok. 6,5 miesiąca i POClerk po ok. 3,5 miesiąca mają 0 opinii ([POMate](https://apps.shopify.com/po-to-draft-order), [POClerk](https://apps.shopify.com/poclerk)). Zero opinii nie znaczy zero klientów, ale znaczy brak widocznej trakcji i brak paliwa do rankingu.

### 6. Czy jest inny sklep z aplikacjami, gdzie ten sam silnik ma płacących użytkowników i słabszą konkurencję?

**Odpowiedź: nie znalazłem żadnego. Wszędzie, gdzie patrzyłem, jest albo tłok, albo funkcja natywna, albo brak dowodów popytu.** Status: **częściowo** (po jednym wyszukiwaniu na grupę platform).

| Platforma | Co znalazłem | Ocena |
|---|---|---|
| WooCommerce | Co najmniej 3 wtyczki w katalogu WordPress. OrderScribe czyta maile i PDF-y przez AI na kluczu klienta; koszt odczytu to ok. 2-3 centy USD za zamówienie płacone bezpośrednio dostawcy modelu ([OrderScribe](https://wordpress.org/plugins/orderscribe/)). Do tego PotoSales ([link](https://wordpress.org/plugins/potosales-order-entry/)) i Deltify bez AI ([link](https://wordpress.org/plugins/deltify-po-importer/)). Jest też poradnik "wtyczka, którą zbudujesz dziś" ([steem.dev](https://steem.dev/blog/woocommerce-pdf-purchase-order-import)). | Zajęte, a model "przynieś własny klucz" spycha cenę do zera. Odpada. |
| BigCommerce | Platforma ma własnego agenta, w fazie alfa za darmo ([ogłoszenie](https://b2bedition.noticeable.news/publications/automate-purchase-order-entry-on-your-store-today)). | Odpada: konkurujesz z właścicielem platformy. |
| Odoo | Z pierwszego przeglądu: co najmniej 4 moduły, jeden darmowy. Nie sprawdzałem ponownie. | Odpada. |
| QuickBooks / Xero | Dużo samodzielnych dostawców: Logistify ([link](https://logistify.ai/agents/sales-order/)), Grabb.AI ([link](https://grabb.ai/guides/pdf-to-quickbooks-order-automation/)), SYSLUME ([link](https://www.syslumelab.com/order-intake)), FlowGo ([link](https://flowgoai.com/)), Parsli ([link](https://parsli.co/document-types/purchase-orders)). Xero nie ma w interfejsie obiektu "zamówienie sprzedaży", więc narzędzia zostawiają wycenę albo szkic faktury ([SYSLUME](https://www.syslumelab.com/order-intake)). Nie znalazłem listingów w sklepach Intuit/Xero, cen ani opinii. | Nie wiem, czy w samych sklepach jest luka. Rynek poza sklepami jest ciasny: jedno zestawienie porównuje 19 dostawców ([Y Meadows](https://ymeadows.com/en/insights/blog/ai-order-entry-vendors/)). |
| Zoho | Tylko gotowy szablon automatyzacji u pośrednika ([appse.ai](https://appse.ai/templates/add-sales-order-in-zoho-books-from-purchase-order-pdf)), brak aplikacji w marketplace w wynikach. | Brak dowodu popytu i brak dowodu konkurencji. Nierozstrzygnięte. |
| Shopware, Lightspeed, Square, Faire | Nic w wynikach. | Brak danych. Nie traktuj tego jako "wolna nisza". |
| NetSuite | Istnieje dodatek "Email to Order" ([opis](https://suiteworkstech.com/email-to-order-in-netsuite-ai-automation/)). | Świat wdrożeń i partnerów, nie dla Ciebie. |

Najlepsza alternatywa: **żadna z dowodami.** Jedyny kierunek wart jednego ręcznego sprawdzenia to sklepy aplikacji Xero i QuickBooks Online (wpisz tam "purchase order", "sales order", "order entry" i policz wyniki). Zastrzeżenie: wejście do tych sklepów ma własne wymagania partnerskie, których nie badałem.

### 7. Wsparcie i utrzymanie dla jednoosobowego nie-programisty

**Odpowiedź: nie znalazłem twardych danych o liczbie zgłoszeń. Dowody pośrednie mówią, że ta nisza wymaga ręcznej opieki nad klientem.** Status: **niezweryfikowane** (liczby), **częściowo** (sygnały).

- **Sygnał 1 (zweryfikowane):** opinie lidera chwalą głównie wsparcie: "bardzo pomocni wobec naszych potrzeb jako małej firmy", "szybkie i responsywne" ([opinie](https://apps.shopify.com/levelops-email-to-order/reviews), [agregator](https://levelops-pdf-to-order.tenereteam.com/)). Czyli lider wygrywa obsługą, a nie samym kodem. Kupujący w tej niszy tego oczekują.
- **Sygnał 2 (zweryfikowane):** LevelOps przedstawia się jako partner Shopify Plus dla hurtu B2B w modelu "aplikacja + usługi" ([levelops.co](https://www.levelops.co/shopify)). To biznes z elementem wdrożeniowym, nie pasywny produkt.
- **Sygnał 3 (zweryfikowane):** wtyczka PotoSales sama ostrzega, że AI potrafi pominąć lub źle odczytać wartości, zwłaszcza na słabych skanach ([listing](https://wordpress.org/plugins/potosales-order-entry/)). Lider ma limit 50 pozycji na zamówienie ([listing](https://apps.shopify.com/levelops-email-to-order)).
- **Co się psuje (niezweryfikowane, moje rozumowanie + to, co znasz z produkcji u dystrybutora kawy):** własne kody towarów klienta zamiast Twoich SKU; jednostki (karton kontra sztuka); cena na zamówieniu inna niż w cenniku B2B; dopasowanie firmy i adresu dostawy; duplikaty tego samego maila; skany i zdjęcia; tabele na kilku stronach; przekierowania poczty. Do tego prace wymuszone przez platformę: Shopify wycofuje stare wersje interfejsu i zmienia wymagania dla aplikacji, a dostawcy modeli wycofują stare modele. To jest stały, nieodraczalny obowiązek.
- **Czy "człowiek zatwierdza szkic" ogranicza szkody? Tak, ale tylko częściowo (niezweryfikowane):** szkic nie obciąża klienta i niczego nie wysyła, dopóki sprzedawca go nie zatwierdzi. Sam Shopify stosuje ten sam wzorzec w Sidekicku ([pomoc Shopify](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/help-and-guidance)). Błąd, który prześlizgnie się przez zatwierdzenie (zły wariant, zła ilość), kończy się złą dostawą dużego zamówienia hurtowego i nerwowym zgłoszeniem do Ciebie. Odpowiedzialność ograniczysz regulaminem, zgłoszeń nie.
- **Strefa czasowa (niezweryfikowane):** klienci to głównie USA, Kanada, Wielka Brytania, Australia. Hurtownik, któremu rano stanęły zamówienia, pisze o 15:00-23:00 czasu warszawskiego.
- **Mój szacunek obciążenia:** 2-5 h tygodniowo przy 10-20 sklepach, z czego większość to wdrożenie nowego sklepu (mapowanie kodów, pierwsze nieudane dokumenty). To górna granica Twojego limitu albo ponad nią.

---

## Konkurencja

| Nazwa | Cena | Trakcja | Słabość | Link |
|---|---|---|---|---|
| PDF to Order (LevelOps) | 5 zamówień za darmo; 50 USD jednorazowo za 15; 100 USD/mies. za 33; 250 USD/mies. do 100 | 5,0 z 21 opinii; odznaka "Built for Shopify" (wg konkurenta); działa co najmniej 13 miesięcy | Drogo za zamówienie (ok. 2,5-3,3 USD, moje wyliczenie z cennika); limit 50 pozycji; interfejs tylko po angielsku i francusku (wg agregatora) | [listing](https://apps.shopify.com/levelops-email-to-order) |
| POinbox (Ripplestep) | 5 szkiców za darmo; 29 USD/mies. za 40 | Opinii nie ustaliłem; mocna seria poradników SEO | Brak odznaki (wg pierwszego przeglądu); brak niezależnych opinii | [strona](https://ripplestep.com/products/poinbox/) |
| POMate | 10 szkiców za darmo; do 29,90 USD/mies. bez limitu | 0 opinii po ok. 6,5 mies. (start 7.05.2026) | Brak trakcji; cena bliska zera | [listing](https://apps.shopify.com/po-to-draft-order) |
| POClerk (MB Croppick) | 10 zamówień za darmo; 79 USD/mies. za 150; 149 USD/mies. za 500 | 0 opinii po ok. 3,5 mies. (start 13.08.2026) | Brak trakcji | [listing](https://apps.shopify.com/poclerk) |
| DraftGenius | 14,99 USD/mies. bez limitu | nie ustaliłem | Tylko wklejany tekst, nie załączniki | [listing](https://apps.shopify.com/draftgenius) |
| Portalink AnyOrder | 6,00 USD za transakcję | nie ustaliłem | Najdroższy za sztukę; celuje też w faks i EDI | [listing](https://apps.shopify.com/portalink-anyorder) |
| Quote Desk | darmowo do 5 wycen / 30 dni | nie ustaliłem | Głównie wyceny, zamówienia przy okazji | [listing](https://apps.shopify.com/quote-desk) |
| AutoApprove | od 39 USD (wg pierwszego przeglądu) | nie ustaliłem | nie ustaliłem | [strona](https://autoapprove.app/) |
| OrderSpot | 10 zamówień za darmo | nie ustaliłem | nie ustaliłem | [strona](https://www.orderspot.in/) |
| AutoPO | nie ustaliłem | nie ustaliłem | nie ustaliłem | [strona](https://www.autopo.dev/) |
| Pomelo, POdraft, Orderseam, PasteOrder, DraftFlow, PO Engine | nie ustaliłem | nie potwierdzone w tym badaniu | nie ustaliłem | [po-to-order](https://apps.shopify.com/po-to-order), [podraft](https://apps.shopify.com/podraft), [orderseam](https://apps.shopify.com/orderseam), [pasteorder-1](https://apps.shopify.com/pasteorder-1) |
| Sidekick (wbudowany asystent Shopify) | w cenie Shopify | tworzy i edytuje szkice z polecenia | Brak dowodu, że czyta PDF lub załącznik | [pomoc Shopify](https://help.shopify.com/en/manual/ai-powered-tools/sidekick/help-and-guidance) |

Rozpiętość cen na rynku: od 14,99 USD bez limitu do 6 USD za jedno zamówienie. Środek, w który celował pierwszy przegląd (39-99 USD/mies.), jest już obsadzony przez POinbox, AutoApprove i POClerk.

---

## Najlepszy wariant produktu

**Uczciwie: nie znalazłem wariantu, który przechodzi Twoje reguły.** Poniżej wariant "najmniej zły", gdybyś mimo to chciał testować. Nie rekomenduję go ponad innych kandydatów z krótkiej listy.

- **Dla kogo:** hurtowy sklep na Shopify (także bez planu Plus), który dostaje 30-300 zamówień mailem miesięcznie od stałych odbiorców i przepisuje je ręcznie.
- **Co:** adres do przekazywania maili -> szkic zamówienia do zatwierdzenia obok oryginału. Jedyna rzecz, którą możesz realnie wnieść z produkcji: **pamięć poprawek per odbiorca** (jak ten klient nazywa towar, w jakich jednostkach zamawia). Nie zweryfikowałem, czy konkurenci tego nie mają; POinbox deklaruje mapowanie kodów klienta ([strona](https://ripplestep.com/products/poinbox/)).
- **Cena (szacunek):** 5 szkiców za darmo na całe życie konta (demo, zgodnie z R3); 39 USD/mies. za 60 szkiców; 99 USD/mies. za 250. Abonament pasuje do częstotliwości (R2).
- **Kanał:** wyszukiwarka Shopify App Store. Nie masz innego bez outboundu.
- **Czego ten wariant nie rozwiązuje:** nadal jesteś trzynasty, bez opinii i bez odznaki, przeciw graczom po 15-30 USD bez limitu.

Warianty, które rozważyłem i odrzuciłem (niezweryfikowane, moje rozumowanie): "zamówienia z SMS i zdjęć odręcznych kartek" (robią to już DraftGenius i AutoPO); "wersja dla sklepów nieanglojęzycznych" (model językowy i tak czyta inne języki, więc klony też to mają; polskich sklepów B2B na Shopify jest garstka); przeniesienie na WooCommerce, BigCommerce lub Odoo (patrz pytanie 6).

---

## Ekonomia (z zaznaczeniem szacunkow)

- **Cena rynkowa (zweryfikowane):** od 14,99 USD/mies. bez limitu ([DraftGenius](https://apps.shopify.com/draftgenius)) przez 29 USD za 40 szkiców ([POinbox](https://ripplestep.com/products/poinbox/)) do 100-250 USD/mies. ([LevelOps](https://apps.shopify.com/levelops-email-to-order)).
- **Koszt odczytu jednego zamówienia (częściowo):** ok. 2-3 centy USD według listingu wtyczki, która rozlicza model bezpośrednio ([OrderScribe](https://wordpress.org/plugins/orderscribe/)). Marża na sztuce jest bardzo wysoka; to nie koszty są tu problemem.
- **Prowizja Shopify (częściowo):** 0% do 1 mln USD + 2,9% za przetwarzanie ([weekonelabs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026)).
- **Hosting:** ok. 0-20 EUR/mies. na Twoim stosie (szacunek).
- **Wolumen (szacunek, nie dowód):** 0-5 płacących sklepów po 6 miesiącach od publikacji. Przy średnio 39 USD to 0-195 USD miesięcznie. Podstawa: dwa klony z 0 opinii po 3,5-6,5 miesiąca i fakt, że połowa wszystkich aplikacji w sklepie nie ma ani jednej opinii (pytanie 5).
- **Sufit (szacunek):** kilkaset USD miesięcznie dla późnego gracza. Lider z 21 opiniami ma moim zdaniem kilkadziesiąt do niskich setek płacących sklepów, ale to zgadywanie: nie znalazłem liczby instalacji.
- **Koszt pozyskania klienta: niezweryfikowany.** Ruch z wyszukiwarki App Store jest darmowy, ale ranking nagradza opinie, których nie masz. Stawek reklam w App Store ani kosztu kliknięcia w Google dla tych fraz nie znam. To musi wyjść z testu R1.
- **Próg sensu (moje wyliczenie):** żeby dojść do 500 USD miesięcznie przy 39 USD, potrzebujesz ok. 13 płacących sklepów. To więcej niż widoczna trakcja któregokolwiek klona.

---

## Zakres budowy i pasywnosc

**Zakres v1 (wszystko poniżej to wymagania, nie dodatki):**

1. Logowanie sklepu przez Shopify i panel osadzony w administracji Shopify.
2. Adres do przekazywania maili + wgrywanie plików (PDF, Excel, CSV, zdjęcie).
3. Odczyt dokumentu (masz) + dopasowanie do katalogu sklepu, klienta, firmy B2B i adresu dostawy (częściowo masz, ale pod Arkusze Google, nie pod Shopify).
4. Ekran zatwierdzania obok oryginału + utworzenie szkicu zamówienia.
5. Rozliczenia przez system Shopify z limitem szkiców (nie Stripe).
6. Obowiązkowe webhooki prywatności, wniosek o dostęp do danych klientów, polityka prywatności.
7. Listing: ikona, 3-6 zrzutów, opis, sklep demonstracyjny i instrukcja dla recenzenta.

**Czas (szacunek):** 40-80 godzin pracy z agentem. Przy 5-8 h tygodniowo to 6-12 tygodni kalendarzowych, plus recenzja 2-4+ tygodnie. Pierwszy sygnał z rynku po ok. 3-4 miesiącach. **To nie mieści się w Twojej regule "sprzedawalne v1 w 2-3 tygodnie"**, chyba że na kilka tygodni odłożysz inne zajęcia.

**Pasywność (szacunek):** 2-5 h tygodniowo przy 10-20 sklepach, wsparcie po angielsku w godzinach amerykańskich, plus przymusowe prace po zmianach Shopify. Brak doradztwa regulowanego i brak obsługi 24/7, więc formalnie reguła jest spełniona, ale na styk.

**Czego z dotychczasowych zasobów nie wykorzystasz:** Stripe (zakazany w App Store), polski język, fakturę VAT, generator stron SEO (kanałem jest sklep z aplikacjami). List referencyjny pochodzi od firmy, która nie używa Shopify.

---

## Ryzyka

1. **Tłok bez trakcji.** 12-15 prawie identycznych aplikacji; klony z 0 opinii po 3,5-6,5 miesiąca. Najbardziej prawdopodobny wynik to dołączenie do nich.
2. **Wchłonięcie przez platformę.** Sidekick już tworzy szkice; BigCommerce już ma własnego agenta. Nie znam planów Shopify na kolejne wydanie.
3. **Mała nisza.** Lider zbiera najwyżej ok. 19 opinii rocznie.
4. **Blokada kanału po porażce.** Zasada 10 płatnych instalacji przed następną aplikacją (od 10.11.2026).
5. **Długa pętla.** 3-4 miesiące do pierwszego sygnału z rynku, czyli powtórka głównego błędu z poprzedniego projektu.
6. **Wsparcie.** Lider konkuruje obsługą i usługami; Ty chcesz 2-4 h tygodniowo i jesteś 6-9 godzin przed klientami.
7. **Brak przewagi specyficznej dla Shopify.** Nie znasz platformy od strony sprzedawcy, nie masz klienta na Shopify, nie masz odznaki ani opinii.
8. **R4 nie do potwierdzenia.** Wolumenu fraz nie znam; podejrzewam (niezweryfikowane), że żadna fraza zakupowa nie ma 1000 wyszukiwań miesięcznie.
9. **Ryzyko mojego badania.** Wszystko pochodzi ze streszczeń wyników. Liczby opinii i ceny mogły się zmienić albo zostać źle streszczone.

---

## Najtanszy test checi zaplaty (R1) z progami

Progi to moja propozycja. Każdy krok ma warunek "zabij"; nie przechodź dalej, jeśli się spełni.

**Krok 0. Trzy bramki za 0 EUR, łącznie ok. 2-3 godziny, bez kodu.**

- **0a. Test Sidekicka (15 min).** W darmowym sklepie deweloperskim wklej do Sidekicka treść prawdziwego zamówienia na 15 pozycji i poproś o szkic. Spróbuj też załączyć PDF. **Zabij**, jeśli powstaje poprawny szkic w mniej niż 10 minut: to darmowy substytut wbudowany w platformę.
- **0b. Ręczny przegląd App Store (45 min).** Wpisz: "purchase order", "PO to draft order", "PDF to order", "email to order", "order entry". Dla każdej aplikacji z pytania 1 zapisz liczbę opinii, datę startu i datę pierwszej opinii. **Zabij**, jeśli poza LevelOps żadna aplikacja starsza niż 3 miesiące nie ma 5 lub więcej opinii. Uprzedzam: dla dwóch klonów już to widzę.
- **0c. Planer słów kluczowych (30 min).** Frazy z sekcji niżej, kraje: USA, Wielka Brytania, Kanada, Australia. **Przejście:** jedna fraza zakupowa z co najmniej 1000 wyszukiwań miesięcznie albo trzy warianty po co najmniej 100. **Zabij** w przeciwnym razie (to Twoja własna reguła R4).

**Krok 1. Płatny test, do 150 EUR, 14 dni, nadal bez kodu pod Shopify.** Tylko jeśli 0a-0c przeszły.

- Strona: "Przekaż maila z zamówieniem, dostań gotowy szkic w Shopify. 39 USD miesięcznie za 60 szkiców." Przycisk Stripe: przedpłata 39 USD za pierwszy miesiąc pilota, z pełnym zwrotem. Pilot obsługujesz istniejącym silnikiem i ręcznie. Z mojej wiedzy, do potwierdzenia: zakaz płatności poza Shopify dotyczy aplikacji w App Store, nie pilota przed publikacją.
- Google Ads, dopasowanie ścisłe i do wyrażenia, te same kraje.
- **Przejście:** co najmniej 2 przedpłaty od różnych sklepów Shopify **oraz** co najmniej 5 prawdziwych dokumentów zamówień przesłanych przez różne sklepy. Mocny sygnał: 3 lub więcej przedpłat.
- **Zabij:** 0-1 przedpłat; albo mniej niż 40 kliknięć do zdobycia w 14 dni (brak ruchu); albo średni koszt kliknięcia powyżej 4 EUR.

**Ograniczenie tego testu (uczciwie):** mierzy popyt z Google, a docelowym kanałem byłaby wyszukiwarka App Store, której nie da się przetestować bez opublikowanej aplikacji. Dlatego krok 0b (trakcja klonów w samym sklepie) jest ważniejszym sygnałem niż reklamy.

**Dopiero po przejściu kroku 1:** budowa łącznika do Shopify.

---

## Frazy do sprawdzenia w Planerze slow kluczowych

Język angielski; kraje: USA, Wielka Brytania, Kanada, Australia.

Frazy zakupowe wąskie:
- purchase order to shopify draft order
- pdf to shopify order
- pdf to draft order shopify
- shopify draft order from pdf
- email to order shopify
- import purchase order into shopify
- shopify purchase order automation
- shopify b2b order entry automation
- shopify wholesale order entry app
- create draft order from email shopify
- shopify order import pdf

Frazy zakupowe szersze (kategoria, nie tylko Shopify):
- purchase order automation software
- sales order automation software
- order entry automation
- ai order entry
- convert purchase order to sales order
- email order processing software

Frazy z nazwami konkurentów:
- levelops pdf to order
- levelops alternative
- poinbox

Osobno, w wyszukiwarce App Store (Planer tego nie pokaże): "purchase order", "draft order", "PDF order", "order entry", "wholesale".

---

## Otwarte pytania

1. **Data startu i data pierwszej opinii LevelOps.** Otwórz [stronę opinii](https://apps.shopify.com/levelops-email-to-order/reviews) i posortuj od najstarszych. To zamienia moje "najwyżej ok. 19 opinii rocznie" w twardą liczbę.
2. **Czy Sidekick przyjmuje załączniki (PDF, zdjęcie) i czy zrobi szkic z wklejonego tekstu.** Test 0a.
3. **Aktualny cennik LevelOps.** Pierwszy przegląd podawał 50-750 USD/mies., to badanie 50 jednorazowo / 100 / 250. Potwierdź na listingu.
4. **Czy POinbox ma opinie w App Store** i czy 5-6 niepotwierdzonych nazw nadal istnieje.
5. **Wolumeny i koszt kliknięcia** dla fraz z listy.
6. **Co dokładnie znaczy "10 płatnych instalacji"** i czy wycofanie aplikacji odblokowuje kolejne zgłoszenie. Sprawdź w [oficjalnej dokumentacji](https://shopify.dev/docs/apps/launch/app-store-review/submit-app-for-review) i w panelu partnera.
7. **Aktualny czas recenzji** po zmianach z 10.11.2026.
8. **Ile sklepów faktycznie płaci liderowi.** Nie znalazłem liczby instalacji.
9. **Czy szablon aplikacji Shopify da się bezboleśnie postawić na Cloudflare Workers** przy pracy z agentem (zakładałem hosting ok. 0 EUR; nie sprawdzałem).
10. **Sklepy aplikacji Xero i QuickBooks Online:** czy są tam aplikacje tego typu i z jaką trakcją.
11. **Reddit:** nie zbadany w ogóle.

---

## Zrodla

Wszystkie adresy pochodzą z wyników wyszukiwania z 2026-11-26. Stron nie otwierałem.

Aplikacje w niszy (Shopify):
- https://apps.shopify.com/levelops-email-to-order
- https://apps.shopify.com/levelops-email-to-order/reviews
- https://apps.shopify.com/partners/levelops
- https://www.levelops.co/pdf-to-order-shopify-app
- https://www.levelops.co/shopify
- https://levelops-pdf-to-order.tenereteam.com/
- https://ripplestep.com/products/poinbox/
- https://ripplestep.com/levelops-alternatives/
- https://ripplestep.com/pdf-purchase-order-to-shopify-draft-order/
- https://ripplestep.com/shopify-draft-orders-b2b-purchase-orders/
- https://apps.shopify.com/po-to-draft-order
- https://apps.shopify.com/poclerk
- https://apps.shopify.com/draftgenius
- https://apps.shopify.com/portalink-anyorder
- https://apps.shopify.com/quote-desk
- https://apps.shopify.com/podesk-purchase-orders
- https://autoapprove.app/
- https://www.orderspot.in/
- https://www.autopo.dev/
- https://www.pdf-to-order.com/en
- https://ecomsellertool.com/automations/b2b-order-entry-from-email
- Z pierwszego przeglądu, niepotwierdzone tutaj: https://apps.shopify.com/po-to-order, https://apps.shopify.com/podraft, https://apps.shopify.com/orderseam, https://apps.shopify.com/pasteorder-1, https://apps.shopify.com/poinbox-purchase-order-entry

Popyt:
- https://www.fool.com/earnings/call-transcripts/2026/11/03/shopify-shop-q3-2026-earnings-call-transcript/
- https://finance.yahoo.com/markets/stocks/articles/shopify-inc-shop-q3-2026-210823609.html
- https://www.fool.com/earnings/call-transcripts/2026/08/12/shopify-shop-q2-2026-earnings-call-transcript/
- https://finance.yahoo.com/markets/stocks/articles/shopify-inc-shop-q2-2026-210423114.html
- https://www.sec.gov/Archives/edgar/data/0001594805/000159480526000067/exhibit991pressreleaseq320.htm
- https://community.shopify.com/t/app-idea-pdf-to-order/573073
- https://community.shopify.com/t/validate-shopify-app-idea/615180

Funkcje natywne platform:
- https://help.shopify.com/en/manual/ai-powered-tools/sidekick/help-and-guidance
- https://jasongreenwoodb2becomm.substack.com/p/shopify-fall-26-editions-222-updates
- https://www.mlabsgrowth.com/blog/shopify-sidekick-2026-guide
- https://www.forthcast.io/blog/shopify-sidekick-inventory-what-it-can-and-cant-do
- https://b2bedition.noticeable.news/publications/automate-purchase-order-entry-on-your-store-today
- https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/565f8b8bd23944f1b04836a1b424c647.html
- https://docs.oracle.com/en/cloud/saas/readiness/scm/25d/order25d/25D-order-mgmt-wn-f42608.htm

Zasady Shopify App Store:
- https://shopify.dev/docs/apps/launch/app-store-review/submit-app-for-review
- https://community.shopify.dev/t/submission-limited-potential-issue-when-developing-more-than-one-app/39841
- https://community.shopify.dev/t/shopify-s-new-rules-clean-up-app-store-spam-finally-addressing-the-store-s-biggest-problem/39693
- https://community.shopify.dev/t/does-unpublishing-apps-with-fewer-than-10-installs-restore-eligibility-to-submit-new-apps/39650
- https://community.shopify.dev/t/shopify-app-submission-blocked-by-submission-limited-error/39511
- https://luseri.com/shopify-app-review-process
- https://www.codersy.com/blog/shopify-api-development-best-practices/shopify-app-store-guidelines-key-requirements
- https://persephonepunch.github.io/crm-sync-setup/shopify-app-checklist.html
- https://thewebtier.com/publish-shopify-app-to-app-store
- https://postyourbuildideas.com/checklists/shopify-app-listing-requirements
- https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026
- https://shopthemedetector.com/blog/shopify-app-store-statistics/

Stopy bazowe:
- https://revenuehunt.com/state-of-the-shopify-app-economy/
- https://metrichq.app/blog/shopify-app-store-statistics-2026
- https://taylorsicard.com/blog/shopify-app-store-statistics-2026
- https://www.appstorepulse.com/reports/state-of-shopify-app-store-october-2026
- https://www.gapquery.com/blog/how-much-do-shopify-apps-make
- https://adsx.com/blog/how-much-shopify-app-developers-make
- https://uxify.com/blog/ai-agents-shopify-apps/
- https://flagship.inc/en/columns/shopify-app-shift-2-ai-slop

Inne platformy:
- https://wordpress.org/plugins/orderscribe/
- https://wordpress.org/plugins/potosales-order-entry/
- https://wordpress.org/plugins/deltify-po-importer/
- https://steem.dev/blog/woocommerce-pdf-purchase-order-import
- https://logistify.ai/agents/sales-order/
- https://grabb.ai/guides/pdf-to-quickbooks-order-automation/
- https://www.syslumelab.com/order-intake
- https://flowgoai.com/
- https://parsli.co/document-types/purchase-orders
- https://ordersync.io/purchase-order-automation
- https://ymeadows.com/en/insights/blog/ai-order-entry-vendors/
- https://appse.ai/templates/add-sales-order-in-zoho-books-from-purchase-order-pdf
- https://suiteworkstech.com/email-to-order-in-netsuite-ai-automation/

Dossier pierwszego przeglądu (kontekst):
- /home/user/disclosekit-RIP/project-2/research/01-sweep/marketplace-apps.md
- /home/user/disclosekit-RIP/project-2/research/01-sweep/productize-plar-orders.md
