# Deep-dive: Most do KSeF dla niedoobsłużonej platformy sprzedaży (hipoteza wiodąca: Stripe -> KSeF)

Data badania: 2026-11-26. Autor: analityk due-diligence (agent AI). Slug: `stripe-to-ksef-bridge`.

## Jak czytać ten dokument (ograniczenia)

1. **Wyszukiwania:** wykonałem 28 wywołań wyszukiwarki (cały mój limit). 26 zwróciło wyniki. 1 zakończyło się błędem (wyszukiwarka nie ma dostępu do reddit.com). 1 zostało odrzucone, bo wspólny limit tury dla wszystkich agentów się wyczerpał. Nie obchodziłem limitu.
2. **Stron nie dało się otworzyć** (blokada sieci). Wszystko, co tu jest, pochodzi ze streszczeń wyników wyszukiwania dla podanych adresów. Każdą cenę i każdy fakt trzeba przed decyzją potwierdzić, klikając w link.
3. **Statusy:** `zweryfikowane` = liczba lub fakt + adres, pod którym to zobaczyłem w wynikach. `częściowo` = dowód pośredni albo źródła sobie przeczą. `niezweryfikowane` = moje rozumowanie lub brak danych. Moje własne oceny liczbowe mają słowo **szacunek**.
4. **Nie mam narzędzia do wolumenów fraz.** Nie podaję żadnego wolumenu. Lista fraz do sprawdzenia w Planerze jest na końcu.
5. Większość znalezionych stron to strony sprzedawców integracji. Ich opisy to marketing, nie niezależny test.

## Werdykt

**MARTWY** (hipoteza wiodąca Stripe -> KSeF: martwa z mocnymi dowodami; skan pozostałych platform: nie znalazłem ani jednej luki, która uzasadnia płatny test przedsprzedaży).

Dlaczego:

- **Luki Stripe -> KSeF nie ma. Jest tłok.** W jeden dzień wyszukiwania znalazłem co najmniej 11 gotowych lub zapowiedzianych rozwiązań: Stripto, Striptu, Striplo, S2K, FakturaFlow, KSeF Kit, KSeF Canvas, KSeFSync, Billio, Invopop, Billit (KSeF jeszcze niegotowy) i KSeFGPT (w budowie). Co najmniej 4 z nich są wymienione w sklepie aplikacji Stripe (S2K, FakturaFlow, Invopop, KSeF Canvas). [zweryfikowane, linki w tabeli konkurencji]
- **Dolna półka cenowa jest zajęta:** Stripto od 19-29 zł/mies., S2K od 8 EUR/mies., KSeF Kit z darmowym planem (6 faktur/mies.) i płatnym 49 zł/mies. [zweryfikowane]. Pierwszy sweep ustalił własne kryterium śmierci: "2 lub więcej działających rozwiązań poniżej 50 zł/mies.". To kryterium jest spełnione z nawiązką.
- **Jedyny kanał, który miał dać dystrybucję (sklep aplikacji Stripe + frazy "stripe ksef"), jest już obsadzony.** Stripto ma co najmniej 12 osobnych stron pod frazy o Stripe i KSeF, które wracały w moich wynikach. To dokładnie ten sam pomysł na pozyskanie ruchu, który miałby założyciel, tylko zrobiony wcześniej. [zweryfikowane: adresy stripto.pl w źródłach]
- **Stripe sam idzie w tym kierunku.** Dokumentacja Stripe opisuje e-fakturowanie przez aplikacje ze sklepu albo własny webhook, a ogłoszenie o pracę Stripe (Product Manager, e-invoicing) wymienia Polskę wśród krajów z obowiązkiem. [częściowo: brak daty premiery]
- **Skan innych platform nie dał luki z wolumenem.** Etsy, Amazon, Publigo, EasyCart, bramki płatności: obsłużone przez programy do faktur lub integratorów. Jedyny ślad wolnego miejsca to **Wix** (Wix sam pisze, że nie ma integracji z krajowymi systemami e-faktur), ale to około 2,7 tys. polskich sklepów, głównie małych i sprzedających konsumentom, a tego, czy w sklepie aplikacji Wix nie ma już aplikacji KSeF, nie dało się sprawdzić. To za mało, żeby utrzymać pomysł przy życiu.

**Praktyczny wniosek dla założyciela jako "użytkownika zero":** jeśli sam potrzebuje faktur ze Stripe w KSeF, taniej jest kupić gotowe narzędzie za ok. 19-50 zł/mies. niż budować własne.

## Odpowiedzi na pytania zabojcze

### 1. Czy Fakturownia, inFakt, wFirma, iFirma, Saldeo itp. mają już integrację Stripe z automatycznym wystawianiem faktur i wysyłką do KSeF? Ceny?

**Odpowiedź:** Tak, potrzeba jest obsłużona, choć głównie przez małe "mosty" postawione na API tych programów, a nie przez same programy.

- **inFakt, wFirma:** w wynikach nie ma natywnej integracji ze Stripe. Łączy je most zewnętrzny (Stripto, Striptu, Striplo, Billio). Jedna recenzja pisze wprost, że wFirma nie ma natywnej integracji i łączy się przez API + most. [częściowo: https://sprytnafirma.pl/podatki-i-ksiegowosc/stripe-faktura-ksef-2026-jak-wystawic, https://stripto.pl/stripe-infakt, https://stripto.pl/stripe-wfirma]
- **iFirma:** źródła sobie przeczą. Jedna recenzja mówi o połączeniu przez dane bankowe (GoCardless/PONTO), co nie jest wystawianiem faktur z płatności. Striptu wymienia iFirmę jako pośrednika. [częściowo: https://sprytnafirma.pl/podatki-i-ksiegowosc/infakt-vs-ifirma, https://striptu.com/en/integrations]
- **Fakturownia:** źródła sobie przeczą. Recenzja z 2026 pisze o natywnej integracji przez API Stripe z webhookiem. Forum sugestii Fakturowni (odpowiedź z 2021, stara) mówi, że integracja nie była w planach, a potem udostępniono import płatności ze Stripe. Streszczenie pierwszego wyszukiwania opisuje to jako import z pliku lub aplikacji, czyli nie w czasie rzeczywistym. [częściowo: https://sprytnafirma.pl/podatki-i-ksiegowosc/stripe-faktura-ksef-2026-jak-wystawic, https://sugester.fakturownia.pl/115802371-Integracja-z-Stripe]
- **Ceny samych programów:** Fakturownia netto za miesiąc: Micro 0 zł, Start 9,99 zł, Standard 22,77 zł, Pro 39,99 zł, Pro Plus 66,77 zł; integracja z KSeF bezpłatna w każdym planie, także Micro. [zweryfikowane: https://fakturownia.pl/cennik, https://pomoc.fakturownia.pl/faq-integracja-z-ksef-w-fakturowni-odpowiedzi-na-najczestsze-pytania-klientow]
- **Ceny mostów:** Stripto od 19 zł/mies. (inne podstrony: 29 zł/mies.; roczne 190 / 390 / 790 zł, ceny niespójne między podstronami); S2K 8 / 20 / 50 EUR/mies.; KSeF Kit 0 zł (6 faktur/mies.) lub 49 zł/mies. (250 faktur/mies.). [zweryfikowane: https://stripto.pl/, https://stripto.pl/stripe-integracja-ksef, https://s2ksef.com/, https://ksef.startupkit.app/]
- **Saldeo:** nie sprawdzałem. [niezweryfikowane]

**Status: zweryfikowane** co do tego, że rozwiązania istnieją i ile kosztują; **częściowo** co do tego, który program ma integrację natywną.

### 2. Czy w sklepie aplikacji Stripe jest aplikacja KSeF? Czy Stripe ogłosił wsparcie KSeF?

**Odpowiedź:** Aplikacje są, i to kilka. Stripe natywnie KSeF nie obsługuje, ale wygląda na to, że nad e-fakturowaniem pracuje.

- **S2K - Seamless KSeF Integration** jest w sklepie aplikacji Stripe; wysyła faktury wystawione w Stripe do KSeF, działa z poziomu panelu Stripe. [zweryfikowane: https://marketplace.stripe.com/apps/s2k---seamless-ksef-integration, https://s2ksef.com/en]
- **FakturaFlow KSeF for Poland** jest w sklepie aplikacji Stripe. [zweryfikowane: https://marketplace.stripe.com/apps/fakturaflow-ksef-for-poland]
- **Invopop** jest w sklepie aplikacji Stripe; według opisu obsługuje polski format FA_VAT/KSeF i po sfinalizowaniu faktury lub noty kredytowej w Stripe sam wysyła ją do urzędu. [zweryfikowane: https://marketplace.stripe.com/apps/invopop, https://docs.invopop.com/apps/poland]
- **KSeF Canvas** ("Polish KSeF e-invoices for your Stripe sales") pojawił się w wynikach ze sklepu aplikacji Stripe; streszczenie nie podało dokładnego adresu karty aplikacji. [częściowo: https://marketplace.stripe.com/?category=accounting&page=2]
- **Billit** (aplikacja e-fakturowania dla Stripe): w tabeli możliwości KSeF dla Polski oznaczony jako "Ready in app: No"; aplikacja darmowa do 1 stycznia 2027. [zweryfikowane: https://stripe-einvoicing.billit.eu/]
- **Stripe natywnie:** dokumentacja e-fakturowania Stripe wskazuje dwie drogi: aplikacja ze sklepu albo własna integracja przez webhook. Strona pomocy wymienia jako przykłady Francję, Włochy i Niemcy, nie Polskę. [zweryfikowane: https://docs.stripe.com/invoicing/e-invoicing, https://support.stripe.com/questions/what-is-e-invoicing-and-how-to-do-it]
- **Plany Stripe:** ogłoszenie o pracę "Product Manager, e-invoicing" pisze, że obowiązki e-fakturowania są aktywne lub bliskie m.in. w Polsce, i opisuje planowany produkt. Daty premiery nie ma. [częściowo: https://stripe.com/careers/listing/product-manager-e-invoicing/8041655]

**Status: zweryfikowane** (aplikacje istnieją); **częściowo** (plany Stripe).

### 3. Jak polscy sprzedawcy SaaS / kursów / usług na Stripe radzą sobie z KSeF dziś? Czy ktoś prosi o most?

**Odpowiedź:** Niezależnych wątków z forów nie znalazłem. Wyniki są zdominowane przez sprzedawców mostów, co samo w sobie jest informacją: podaż jest głośniejsza niż widoczny popyt.

- Dwa wyszukiwania pod pytania użytkowników zwróciły prawie wyłącznie strony producentów (Stripto, Billio, Striplo, KSeFSync, ksef.io, JFlow Labs). Trzecie, zawężone do forów, nie wykonało się (brak dostępu do reddit.com). Grup na Facebooku nie da się przeszukać. [zweryfikowane jako "brak wyników", nie jako "brak dyskusji"]
- Jedyny niezależny ślad próśb: wątek "Integracja z Stripe" na forum sugestii Fakturowni (odpowiedź zespołu z 2021, stara). [zweryfikowane: https://sugester.fakturownia.pl/115802371-Integracja-z-Stripe]
- Drogi opisywane w poradnikach: most do programu do faktur, most bezpośrednio do KSeF, aplikacja ze sklepu Stripe (działa z fakturami Stripe Invoicing), ręczne przepisywanie, automatyzacja n8n/Zapier/Make na zlecenie. [zweryfikowane: https://stripto.pl/stripe-integracja-ksef, https://www.nocodework.io/post/stripe-automatyzacje-sprzedaz-cyfrowa, https://sklep.systembox.pl/product-category/ksef-faktury/]
- Wdrożenie na zamówienie kosztuje u jednego usługodawcy 2000-9000 zł netto. [zweryfikowane: https://jflowlabs.pl/en/services/payments-and-integrations/]

**Status: częściowo.** Popyt istnieje (inaczej nie byłoby 11 dostawców), ale nie mam żadnej liczby pytających ani kupujących.

### 4. Skan innych platform: gdzie naprawdę brakuje mostu do KSeF i jest dość polskich sprzedawców B2B?

| Platforma | Co znalazłem | Luka? | Status |
|---|---|---|---|
| Publigo (kursy) | Publigo pisze, że platforma jest dostosowana do KSeF z Fakturownią i innymi operatorami faktur (wpis sprzed ok. 225 dni) https://publigo.pl/blog/ksef-sprzedaz-kursow-online/ | Nie | zweryfikowane |
| EasyCart (koszyk dla produktów cyfrowych) | Łączy się z Fakturownią, iFirmą, inFaktem, wFirmą; KSeF "przez system do faktur" (źródło wtórne, blog) https://weblymate.com/ksef-i-woocommerce-jak-wysylac-faktury-do-krajowego-systemu-e-faktur-ze-sklepu-internetowego/ | Nie | częściowo |
| WebToLearn, Naffy | Brak wyników | Nie wiem | niezweryfikowane |
| PayU, Przelewy24, Tpay, Autopay | Programy do faktur (Fakturownia, K24) same łączą się z bramkami; bramki działają zwykle wewnątrz sklepu, który ma własne fakturowanie https://fakturownia.pl/platnosci-online, https://ksiegowosc24.pl/integracje/ | Nie widać | częściowo |
| PayPal | Nie znalazłem osobnego mostu PayPal -> KSeF (1 wyszukiwanie). Programy do faktur deklarują integrację z PayPal https://faktura.pl/, https://ksiegowosc24.pl/integracje/ | Możliwa, ale bez kanału (PayPal nie ma sklepu aplikacji, w którym kupujący szukają) | niezweryfikowane |
| Etsy | iFirma: integracja z Etsy z automatyczną wysyłką do KSeF. Sellasist: nadal "WKRÓTCE". Faktury dla konsumentów nie podlegają obowiązkowemu KSeF https://www.ifirma.pl/ecommerce/integracje/etsy/, https://sellasist.pl/integracja/ksef/etsy, https://poradnikprzedsiebiorcy.pl/-jakich-faktur-nie-dotyczy-ksef-czyli-krajowy-system-efaktur | Nie (iFirma to robi, a sprzedaż jest głównie konsumencka) | zweryfikowane |
| Amazon | Amazon sam wystawia faktury przez KSeF w imieniu sprzedawcy po nadaniu uprawnień; do tego Sellasist, Base, Serini https://base.com/pl-PL/blog/amazon-vcs-a-ksef-zmiany/, https://sellasist.pl/integracja/ksef/amazon, https://www.serini-cloud.com/integracja-amazon-z-ksef/ | Nie | zweryfikowane |
| eBay, Vinted Pro, OLX | Nie sprawdzałem osobno. Sprzedaż głównie konsumencka (mój wniosek) | Nie wiem | niezweryfikowane |
| Booksy, Calendly | Nie sprawdzałem. Klienci to głównie konsumenci (mój wniosek) | Nie wiem | niezweryfikowane |
| Paddle, Lemon Squeezy | To "merchant of record": wobec klienta końcowego sprzedawcą jest Paddle i to Paddle wystawia faktury; polska firma ma jednego odbiorcę (Paddle), czyli kilka faktur rocznie. O KSeF nic nie znalazłem https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf | Nie ma czego automatyzować (mój wniosek) | częściowo |
| Wix | Wix pisze, że Wix Invoices nie ma bezpośredniej integracji z PEPPOL ani z krajowymi systemami e-faktur; radzi eksport CSV/PDF. W sklepie aplikacji Wix jest aplikacja firmy trzeciej dla PEPPOL (Sendpol). Użytkownik na forum sugestii Fakturowni (ok. marzec 2026) pisze, że żaden polski program do faktur nie integruje się z Wix. Aplikacji KSeF dla Wix nie znalazłem w 3 wyszukiwaniach https://support.wix.com/en/article/wix-invoices-handling-eu-e-invoicing-and-peppol, https://sugester.fakturownia.pl/177021103-integracja-z-serwisem-wix-com | **Prawdopodobna, ale niepotwierdzona** (sklepu aplikacji Wix nie dało się otworzyć) | częściowo |

**Odpowiedź:** Jedyna platforma, gdzie widać ślad prawdziwej luki, to **Wix**. Ale liczba polskich sprzedawców jest mała (pytanie 5), a większość z nich sprzedaje konsumentom, którym faktura w KSeF nie jest potrzebna. Nie znalazłem platformy, która jednocześnie ma lukę, dużo polskich sprzedawców B2B i własny kanał dotarcia.

**Status: częściowo.**

### 5. Wielkość: ile polskich firm używa Stripe (lub platformy z luką) i jaka część sprzedaży to B2B?

- **Stripe w Polsce:** BuiltWith pokazuje 6 862 obecnych klientów Stripe w Polsce (liczba wykrytych stron; data pomiaru nieznana). [zweryfikowane: https://trends.builtwith.com/payment/Stripe/Poland]
- **Udział:** WMTips podaje dla Stripe 9,5% wśród usług płatności wykrytych na polskich stronach, w analizie 66 263 stron. [zweryfikowane: https://www.wmtips.com/technologies/payments/country/pl/] Moje przeliczenie: 9,5% z 66 263 to ok. 6,3 tys. stron, czyli zgodnie z BuiltWith (**szacunek**, bo metody obu serwisów są różne).
- **Wix w Polsce:** StoreLeads podaje ok. 2 735 działających sklepów Wix w Polsce i spadek 0,5% kwartał do kwartału w III kw. 2026 (datowanie strony niespójne). FisherLeads: 96 nowych polskich sklepów Wix w migawce z października 2026. Starsze dane AfterShip: 2,05 tys. sklepów, 1,43% udziału (strona sprzed ok. 3 lat). [zweryfikowane: https://storeleads.app/reports/wix/PL/top-stores, https://fisherleads.com/new/wix, https://www.aftership.com/ecommerce/statistics/regions/pl]
- **Udział B2B:** nie znalazłem żadnego źródła ani dla Stripe, ani dla Wix. [niezweryfikowane]
- **Kontekst kalendarza:** od 1 stycznia 2027 KSeF obejmuje także firmy ze sprzedażą fakturową do 10 000 zł brutto miesięcznie; MF nie planuje odroczenia obowiązku. Kary: MF zapowiedziało 16 września 2026 odroczenie do 31 grudnia 2027, ustawa była w listopadzie 2026 w Sejmie; nie mam potwierdzenia, że została uchwalona. [częściowo: https://finwire.pl/artykuly/ksef-od-1-stycznia-2027-firmy-do-10-tys-zl-kasy-numer-ksef-w-przelewie, https://skarbiec.biz/finansowanie/faktoring/najmniejsi-przedsiebiorcy-jednak-trafia-do-ksef-ministerstwo-nie-da-im-kolejnego-roku, https://www.infakt.pl/blog/ksef-najmniejsze-firmy-maja-czas-do-2027-roku-jak-dziala-odroczenie/]

**Status: częściowo.** Mam liczbę stron ze Stripe i liczbę sklepów Wix. Nie mam udziału B2B, a to on decyduje o rynku.

### 6. Odpowiedzialność: co się psuje w moście krytycznym podatkowo i co oznacza trzymanie tokenów KSeF klientów?

- **Podwójne faktury:** Stripe potrafi wysłać ten sam webhook więcej niż raz; bez zabezpieczenia powstają duplikaty faktur w państwowym systemie. [zweryfikowane: https://tinylaunchpad.com/blog/stripto-pl-review-stripe-ksef-integration-for-polish-biz]
- **Zwroty i korekty:** według zewnętrznej recenzji Stripto w chwili recenzji nie automatyzowało korekt po zwrocie; trzeba je było robić ręcznie w programie do faktur. Czyli nawet istniejący gracze mają z tym kłopot. [zweryfikowane, stan mógł się zmienić: ten sam adres]
- **Odrzucenie przez urząd:** dokumentacja Stripe ostrzega, że sfinalizowanej faktury nie da się edytować, więc gdy urząd odrzuci wysyłkę, nie poprawisz jej wprost w Stripe. [zweryfikowane: https://docs.stripe.com/invoicing/e-invoicing]
- **Brak danych nabywcy:** Stripe domyślnie nie zbiera NIP; zbieranie identyfikatorów podatkowych w Checkout trzeba włączyć. [zweryfikowane: https://dev.to/rostislav_havryliuk/polands-e-invoicing-api-will-break-your-store-here-is-where-4kfo]
- **Zmiany schematu:** strony sprzedawców mówią raz o FA(2), raz o FA(3). Sama ta niespójność pokazuje, że schemat się zmienia i trzeba za nim nadążać w terminach państwa. [częściowo: https://stripto.pl/stripe-integracja-ksef]
- **Awarie i tryb offline:** faktura wystawiona podczas awarii wymaga kodu QR, do którego potrzebny jest certyfikat KSeF typu 2; sam token nie wystarcza. Po przerwie faktury trzeba dosłać najpóźniej następnego dnia. [zweryfikowane, streszczenie nie przypisało zdania do jednej strony: https://mk.rp.pl/blog/token-czy-certyfikat-ksef-2027/, https://www.faktzero.pl/blog/token-certyfikat-ksef-co-wybrac]
- **Tokeny mogą zniknąć:** źródła sobie przeczą. Jedno: token formalnie działa do 31 grudnia 2026, ale MF zapowiedziało, że zostanie bezterminowo. Drugie: po 2026 tylko certyfikaty. Fakturownia opiera integrację wyłącznie na certyfikatach. [częściowo: https://biuromat.pl/certyfikat-ksef/, https://elpro.com.pl/ksef.html, https://fakturownia.pl/ksef-faq]
- **Trzymanie cudzych tokenów lub certyfikatów:** utrata kontroli nad tokenem może dać nieuprawniony dostęp i skutki prawne oraz finansowe dla firmy klienta. [zweryfikowane: https://elpro.com.pl/ksef.html] Dla jednoosobowego założyciela, który nie jest programistą, oznacza to: wyciek jednego sekretu = ktoś może wystawiać faktury w imieniu klientów. [niezweryfikowane, mój wniosek]
- **Kto odpowiada wobec urzędu:** za formę faktury odpowiada podatnik, nie platforma. [zweryfikowane dla przypadku Amazon: https://www.nex.katowice.pl/post/wdt-przez-amazon-a-ksef] Odpowiedzialności cywilnej dostawcy mostu wobec klienta (regulamin, ubezpieczenie) nie znalazłem w wynikach. [niezweryfikowane]
- **Jak to obchodzą konkurenci:** część mostów nie wysyła nic do KSeF sama. Tworzy fakturę w Fakturowni lub inFakcie, a wysyłkę i odpowiedzialność techniczną bierze program. Zewnętrzna recenzja pisze, że Stripto nie jest certyfikowanym nadawcą KSeF i przekazuje to Fakturowni i inFaktowi. [zweryfikowane: https://tinylaunchpad.com/blog/stripto-pl-review-stripe-ksef-integration-for-polish-biz]

**Status: częściowo.** Ryzyka techniczne są udokumentowane; skala odpowiedzialności prawnej dostawcy nie.

### 7. Czy jest JEDNA konkretna luka warta płatnego testu przedsprzedaży?

**Odpowiedź: nie.**

- Stripe -> KSeF: zajęte przez ok. 11 graczy, ceny od 0 do 50 zł/mies., miejsca w sklepie aplikacji Stripe obsadzone, a Stripe buduje własny produkt. **Martwe.** [zweryfikowane]
- Wix -> KSeF: jedyny ślad luki, ale (a) nie potwierdziłem, że sklep aplikacji Wix jest pusty, (b) baza to ok. 2,7 tys. sklepów, głównie konsumenckich, (c) przy kilku fakturach B2B miesięcznie wystarcza darmowa Fakturownia Micro lub darmowa aplikacja MF i 3 minuty ręcznej pracy na fakturę. To nie jest dziś kandydat do płatnego testu. Wymaga najpierw 30 minut darmowego sprawdzenia (sekcja R1). [częściowo]
- Pozostałe platformy: brak luki albo brak danych.

**Status: zweryfikowane** dla Stripe; **częściowo** dla reszty.

## Konkurencja

Kolumna "trakcja": nie znalazłem liczby klientów ani przychodów u żadnego z graczy. Tam, gdzie piszę "brak danych", naprawdę ich nie mam.

| Nazwa | Cena | Trakcja | Słabość | Link |
|---|---|---|---|---|
| Stripto | od 19 zł/mies. (strona główna: 29 zł/mies.); Mini 25 faktur/mies., Starter 100 faktur/mies.; rocznie 190 / 390 / 790 zł; ceny niespójne między podstronami | Brak danych. Co najmniej 12 osobnych stron pod frazy "Stripe + KSeF" w moich wynikach; wpisy w katalogach nowych produktów (SaaSBison, TinyLaunchpad) | Według recenzji nie wysyła sam do KSeF (robi to Fakturownia/inFakt); korekty po zwrotach były ręczne | https://stripto.pl/ |
| S2K (BizAutomat) | Starter 8 EUR/mies. do 25 faktur; Pro 20 EUR do 200; Scale-up 50 EUR do 1000; 14 dni za darmo | Brak danych. Jest w sklepie aplikacji Stripe i ma profil na G2 (treści opinii nie widziałem) | Według konkurenta działa tylko z fakturami Stripe Invoicing, za które Stripe bierze 0,4% od faktury (maks. 2 USD); S2K tego nie potwierdza | https://s2ksef.com/ oraz https://marketplace.stripe.com/apps/s2k---seamless-ksef-integration |
| KSeF Kit | 0 zł do 6 faktur/mies. bez karty; 49 zł/mies. do 250 faktur; wersja na własnym serwerze 2500 zł netto jednorazowo | Brak danych | Mały, nowy produkt (subdomena startupkit.app); brak informacji o korektach | https://ksef.startupkit.app/ |
| FakturaFlow KSeF for Poland | Połączenie ze Stripe w planie "Integracja" 899 zł/mies.; 14 dni próbne | Brak danych. Jest w sklepie aplikacji Stripe | Cena dla większych firm, nie dla mikrofirmy | https://fakturaflow.pl/integracje-ksef/stripe oraz https://marketplace.stripe.com/apps/fakturaflow-ksef-for-poland |
| Striptu | Nie znalazłem | Brak danych. Referencja projektu "Dom na skraju lasu" na własnej stronie | Brak publicznej ceny w wynikach | http://striptu.com/pl/integracje/integracja-stripe-ksef |
| Striplo | Nie znalazłem | Brak danych | Brak danych | https://striplo.pl/integracje/stripe-ksef/ |
| KSeFSync | Nie znalazłem | Brak danych | Brak danych | https://ksefsync.pl/ |
| Billio | Nie znalazłem | Brak danych | Do KSeF tylko przez inFakt lub Fakturownię | https://billio.pl/blog/faktury-cykliczne-stripe |
| Invopop | Nie znalazłem | Brak danych. Jest w sklepie aplikacji Stripe; produkt międzynarodowy | Nie jest robiony pod polskiego mikroprzedsiębiorcę (mój wniosek) | https://marketplace.stripe.com/apps/invopop |
| KSeF Canvas | Nie znalazłem | Brak danych. Widoczny w sklepie aplikacji Stripe | Brak danych | https://marketplace.stripe.com/?category=accounting&page=2 |
| Billit | Darmowy do 1 stycznia 2027 | Brak danych | KSeF oznaczony "Ready in app: No" | https://stripe-einvoicing.billit.eu/ |
| KSeFGPT | Nie znalazłem | Brak danych | Integracja ze Stripe dopiero w budowie | https://ksefgpt.pl/pl/moduly/integracje/stripe |
| Fakturownia (program do faktur) | 0 / 9,99 / 22,77 / 39,99 / 66,77 zł netto/mies.; KSeF za darmo w każdym planie | Znana marka; liczby klientów nie mam | Integracja ze Stripe: źródła sprzeczne (natywna z webhookiem albo tylko import) | https://fakturownia.pl/cennik |
| Wdrożenia na zlecenie (JFlow Labs, systembox) | 2000-9000 zł netto za integrację (JFlow Labs) | Brak danych | Usługa, nie produkt | https://jflowlabs.pl/en/services/payments-and-integrations/ |
| ksef.io (API do KSeF dla programistów) | Nie znalazłem | Brak danych | To klocek dla programistów, ale obniża próg wejścia kolejnym klonom | https://ksef.io/ |
| Stripe (własny produkt e-fakturowania) | Nieznana | Ogłoszenie o pracę wymienia Polskę | Brak daty premiery | https://stripe.com/careers/listing/product-manager-e-invoicing/8041655 |

## Najlepszy wariant produktu

**Dla Stripe: żaden.** Nie widzę wersji, która wygrywa z 11 graczami bez własnej publiczności i bez sprzedaży bezpośredniej. Jedyne realne słabości konkurencji (automatyczne korekty po zwrotach, tryb offline) to akurat najtrudniejsza i najbardziej ryzykowna część do zbudowania, a nie przewaga, którą da się szybko dowieźć.

**Jedyny wariant resztkowy (słaby, niepotwierdzony): "KSeF dla Wix".**

- Dla kogo: polskie sklepy i firmy usługowe na Wix, które wystawiają faktury firmom.
- Co: aplikacja w sklepie aplikacji Wix. Zamówienie z NIP w Wix -> faktura w Fakturowni lub inFakcie klienta (przez ich API) -> program wysyła do KSeF -> numer KSeF wraca do zamówienia. Bez trzymania tokenów ani certyfikatów KSeF klienta, tylko klucz API programu do faktur.
- Cena: **szacunek** 39 zł/mies. do 50 faktur, 79 zł/mies. do 300 faktur; plan darmowy tylko jako demo (3 faktury łącznie).
- Kanał: wyszukiwarka w sklepie aplikacji Wix + frazy "wix ksef", "wix faktury".
- Dlaczego tylko "resztkowy": mała baza (ok. 2,7 tys. sklepów), głównie sprzedaż konsumencka, nie wiem, czy miejsce jest naprawdę wolne, a Fakturownia lub inFakt mogą dodać Wix w każdej chwili, tak jak dodały Shopify.

## Ekonomia (z zaznaczeniem szacunkow)

**Stripe -> KSeF (pokazuję, dlaczego to się nie spina):**

- Cena jest narzucona przez rynek: 19-49 zł/mies. przy darmowych planach konkurencji. [zweryfikowane, linki w tabeli]
- Baza: ok. 6,9 tys. polskich stron ze Stripe. [zweryfikowane: https://trends.builtwith.com/payment/Stripe/Poland]
- Udział tych, którzy fakturują firmy i nie mają jeszcze rozwiązania: **szacunek** 10-30%, czyli ok. 700-2000 firm. Źródła brak.
- Udział, który zdobędzie dwunasty gracz bez publiczności: **szacunek** 0,5-1,5%, czyli ok. 5-30 klientów.
- Przychód: **szacunek** 5-30 klientów x 29 zł = ok. 150-870 zł/mies. To mieści się w bazowych stawkach z pierwszego sweepu (realnie 0-500 USD/mies. w pierwszym roku).
- Koszt pozyskania: nieznany. Nie mam ceny kliknięcia dla "stripe ksef". Przy przychodzie ok. 350 zł rocznie z klienta (**szacunek**: 29 zł x 12) opłaca się wydać na pozyskanie najwyżej ok. 100 zł, a o te same frazy licytuje się kilku dostawców. [niezweryfikowane]

**Wix -> KSeF (wariant resztkowy):**

- Baza: ok. 2 735 sklepów Wix w Polsce. [zweryfikowane: https://storeleads.app/reports/wix/PL/top-stores] Stron Wix bez sklepu (rezerwacje, usługi) nie policzyłem.
- Udział regularnie fakturujących firmy: **szacunek** 20%, czyli ok. 550. Źródła brak.
- Udział, który kupi: **szacunek** 5-10%, czyli ok. 27-55 klientów.
- Przychód: **szacunek** ok. 1 000-2 100 zł/mies. przy 39 zł, przed prowizją Wix (wysokości prowizji nie sprawdziłem) i dopiero po wielu miesiącach.
- Koszt pozyskania: w teorii bliski zeru (ruch ze sklepu aplikacji), ale tylko jeśli ktokolwiek w tym sklepie wpisuje "KSeF". Tego nie wiem.

## Zakres budowy i pasywnosc

**Stripe -> KSeF:** nie budować. Dla porządku: pierwszy sweep szacował 12-18 dni pracy z agentem AI. Uważam, że to zaniżone o korekty, tryb offline i obsługę odrzuceń, czyli dokładnie te elementy, na których potykają się obecni gracze. (**szacunek**)

**Wix (gdyby darmowy test wyszedł pozytywnie):**

- v1: aplikacja Wix (logowanie, odbiór zdarzenia "zamówienie opłacone"), mapowanie na fakturę w Fakturowni/inFakcie przez API, zapis numeru KSeF w zamówieniu, e-mail o błędach, rozliczenie przez Stripe lub system płatności Wix. **Szacunek** 10-15 dni pracy z agentem AI + czas recenzji w sklepie aplikacji Wix (nie znam go).
- Poza v1: korekty po zwrotach, waluty, sprzedaż zagraniczna, bezpośrednia wysyłka do KSeF.
- Koszt stały: ok. 0 EUR (Cloudflare) do chwili przychodu. (**szacunek**)
- Pasywność: narzędzie stoi między sklepem a urzędem, więc każdy błąd to pilne zgłoszenie. **Szacunek** 2-4 h/tydz. w spokojnym okresie, z przekroczeniami przy zmianach schematu, zmianach API Wix lub API programu do faktur. Reguła "bez wsparcia 24/7" jest tu zagrożona: faktury mają terminy.
- Doradztwo regulowane: aplikacja nie może podpowiadać stawek VAT ani oceniać, czy faktura jest poprawna podatkowo. Stawkę ustawia klient albo jego księgowa.

## Ryzyka

1. **Luki nie ma (potwierdzone dla Stripe).** Wejście jako dwunasty gracz bez publiczności to powtórka z porażki disclosekit, tylko z inną przyczyną: tam nie było popytu, tu jest podaż ponad popyt.
2. **Stripe zbuduje to sam.** Ogłoszenie o pracę wymienia Polskę. Gdy Stripe doda e-fakturowanie, wszystkie mosty tracą rację bytu.
3. **Dno cenowe.** Darmowe plany (KSeF Kit, Fakturownia Micro) i 19-29 zł/mies. Nie ma marży na płatne reklamy.
4. **Odpowiedzialność.** Podwójne faktury, korekty, odrzucenia, awarie KSeF. Przy trzymaniu tokenów lub certyfikatów klientów wyciek oznacza możliwość wystawiania faktur w cudzym imieniu.
5. **Zmiany narzucane z zewnątrz.** Schemat faktury, sposób logowania (tokeny czy tylko certyfikaty po 2026: źródła sprzeczne), API platformy. Każda zmiana to praca w cudzym terminie.
6. **Wix: za mały rynek i łatwy zamiennik.** Przy kilku fakturach B2B miesięcznie ręczne wpisanie do darmowego programu wystarcza.
7. **Wix: duży gracz dopisze integrację.** Fakturownia i inFakt mają już aplikacje w Shopify; prośba o Wix leży na forum sugestii Fakturowni.
8. **Słabsza presja czasu.** Jeśli ustawa odraczająca kary do końca 2027 przejdzie, najmniejsze firmy będą odkładać zakup.
9. **Moje własne braki.** Nie otworzyłem żadnej strony, nie znam wolumenów fraz, nie przeszukałem grup na Facebooku ani Reddita.

## Najtanszy test checi zaplaty (R1) z progami

**Dla Stripe -> KSeF: nie testować.** Test z pierwszego sweepu (krok 1: "sprawdzić sklep aplikacji Stripe i wyniki dla Stripe KSeF; kryterium śmierci: 2 lub więcej rozwiązań poniżej 50 zł/mies.") został właśnie wykonany i dał wynik "śmierć". Wydawanie 100 EUR na reklamy byłoby dopłacaniem do potwierdzonego wyniku.

**Dla wariantu Wix (tylko jeśli założyciel chce zamknąć temat na pewno):**

- **Krok 0: 0 EUR, 30 minut, ręcznie.** Otworzyć sklep aplikacji Wix i wpisać: "KSeF", "faktura", "Fakturownia", "inFakt", "invoice Poland". Zapisać liczbę instalacji i opinii aplikacji Sendpol (PEPPOL) jako punkt odniesienia. Sprawdzić w Planerze słów kluczowych frazy z listy poniżej.
  - **Śmierć:** istnieje działająca aplikacja KSeF lub polskiego fakturowania dla Wix; ALBO frazy z "wix" + "ksef/faktury" mają łącznie poniżej 100 wyszukiwań miesięcznie w Polsce; ALBO aplikacja Sendpol ma śladową liczbę instalacji i opinii.
  - **Dalej:** sklep pusty I frazy łącznie co najmniej 100/mies.
- **Krok 1: do 100 EUR, 14 dni.** Strona "Faktury KSeF prosto ze sklepu Wix" + płatna przedsprzedaż przez Stripe (np. 99 zł za pierwsze 3 miesiące, zwrot, jeśli produkt nie powstanie) + Google Ads tylko na frazy w dopasowaniu ścisłym.
  - **Zaliczone (szacunek progów):** co najmniej 3 płatne przedpłaty w 14 dni i koszt jednej przedpłaty nie wyższy niż 150 zł.
  - **Śmierć:** 0-1 przedpłat; ALBO mniej niż 50 kliknięć w 14 dni mimo budżetu (to znaczy, że nikt tego nie szuka).

Uczciwie: moja ocena szansy, że wariant Wix przejdzie oba kroki, jest niska (**szacunek**, bez danych).

## Frazy do sprawdzenia w Planerze slow kluczowych

Geografia: Polska, język polski. Nie znam wolumenu żadnej z nich.

Stripe (żeby zobaczyć, o jaki ruch bije się 11 graczy):
- stripe ksef
- integracja stripe ksef
- stripe faktury
- stripe faktura vat
- faktury ze stripe
- stripe fakturownia
- stripe infakt
- stripe wfirma
- automatyczne faktury stripe

Wix (wariant resztkowy):
- wix ksef
- wix faktury
- wix faktura vat
- wix fakturownia
- sklep wix faktury

Punkty odniesienia (platformy już obsłużone):
- shopify ksef
- woocommerce ksef
- integracja ksef sklep internetowy

Inne z listy skanu:
- paypal ksef
- paypal faktury automatycznie
- etsy ksef
- easycart ksef

## Otwarte pytania

1. Czy w sklepie aplikacji Wix jest dziś aplikacja KSeF lub polskiego fakturowania? (Nie dało się otworzyć; 30 minut ręcznie.)
2. Ile instalacji i opinii ma aplikacja Sendpol (PEPPOL) w sklepie Wix? (Wyszukiwanie odrzucone przez limit.)
3. Jakie są wolumeny fraz z listy powyżej i ceny kliknięć?
4. Ilu klientów mają Stripto, S2K, Striptu? Nie znalazłem żadnej liczby.
5. Czy Fakturownia ma dziś natywną integrację ze Stripe w czasie rzeczywistym, czy tylko import? Źródła sprzeczne.
6. Kiedy Stripe wypuści własne e-fakturowanie dla Polski?
7. Czy ustawa odraczająca kary KSeF do końca 2027 została uchwalona?
8. Czy tokeny KSeF działają po 31 grudnia 2026, czy zostają tylko certyfikaty? Źródła sprzeczne.
9. Jaki jest udział sprzedaży B2B wśród polskich użytkowników Stripe i Wix? Brak źródeł.
10. Niesprawdzone platformy: WebToLearn, Naffy, eBay, Vinted Pro, OLX, Booksy, Calendly, Saldeo.
11. Czy aplikacje ze sklepu Stripe (S2K) naprawdę wymagają płatnego Stripe Invoicing (0,4% od faktury, maks. 2 USD)? To twierdzenie konkurenta.
12. Jaka jest prowizja Wix od aplikacji i ile trwa recenzja?

## Zrodla

Wszystkie adresy pojawiły się w wynikach wyszukiwania tego badania (2026-11-26). Treść znam ze streszczeń wyników, nie z otwartych stron.

Stripe i KSeF, dostawcy:
- https://stripto.pl/
- https://stripto.pl/stripe-integracja-ksef
- https://stripto.pl/automatyczne-faktury-stripe
- https://stripto.pl/stripe-fakturownia
- https://stripto.pl/stripe-infakt
- https://stripto.pl/stripe-wfirma
- https://stripto.pl/ksef-dla-programistow
- https://stripto.pl/jak-polaczyc-stripe-z-ksef
- https://stripto.pl/jak-wystawiac-faktury-ze-stripe
- https://stripto.pl/faktury-za-subskrypcje-stripe
- https://stripto.pl/platnosci-cykliczne-stripe-faktury
- https://stripto.pl/pomoc/automatyczne-faktury
- https://tinylaunchpad.com/blog/stripto-pl-review-stripe-ksef-integration-for-polish-biz
- https://saasbison.com/item/stripto-striptopl
- https://web-review.com/item/stripto
- http://striptu.com/pl/integracje/integracja-stripe-ksef
- https://striptu.com/en/integrations
- https://striplo.pl/
- https://striplo.pl/integracje/stripe-ksef/
- https://ksefsync.pl/
- https://s2ksef.com/
- https://s2ksef.com/en
- https://s2ksef.com/blog/jak-polaczyc-stripe-z-ksef-poradnik
- https://www.g2.com/products/bizautomat-p-s-a-s2k/pricing
- https://fakturaflow.pl/integracje-ksef/stripe
- https://ksef.startupkit.app/
- https://billio.pl/blog/faktury-cykliczne-stripe
- https://ksefgpt.pl/pl/moduly/integracje/stripe
- https://stripe-einvoicing.billit.eu/
- https://docs.invopop.com/apps/poland
- https://ksef.io/
- https://jflowlabs.pl/en/services/payments-and-integrations/
- https://jflowlabs.pl/portfolio/orbita/
- https://sklep.systembox.pl/product-category/ksef-faktury/
- https://oneclick-workflow.pl/stripe-a-ksef-faktury-z-platnosci-online/
- https://www.besidesfinance.com/en/blog/ksef-i-stripe
- https://howtopoland.com/stripe-ksef
- https://sprytnafirma.pl/podatki-i-ksiegowosc/stripe-faktura-ksef-2026-jak-wystawic
- https://sprytnafirma.pl/podatki-i-ksiegowosc/infakt-vs-ifirma
- https://www.nocodework.io/post/stripe-automatyzacje-sprzedaz-cyfrowa
- https://www.nocodework.io/post/platnosci-w-automatyzacjach
- https://dev.to/rostislav_havryliuk/polands-e-invoicing-api-will-break-your-store-here-is-where-4kfo

Stripe (strony własne):
- https://marketplace.stripe.com/apps/s2k---seamless-ksef-integration
- https://marketplace.stripe.com/apps/fakturaflow-ksef-for-poland
- https://marketplace.stripe.com/apps/invopop
- https://marketplace.stripe.com/?category=accounting&page=2
- https://docs.stripe.com/invoicing/e-invoicing
- https://support.stripe.com/questions/what-is-e-invoicing-and-how-to-do-it
- https://stripe.com/careers/listing/product-manager-e-invoicing/8041655

Programy do faktur:
- https://fakturownia.pl/cennik
- https://fakturownia.pl/ksef-faq
- https://fakturownia.pl/platnosci-online
- https://pomoc.fakturownia.pl/faq-integracja-z-ksef-w-fakturowni-odpowiedzi-na-najczestsze-pytania-klientow
- https://sugester.fakturownia.pl/115802371-Integracja-z-Stripe
- https://sugester.fakturownia.pl/177021103-integracja-z-serwisem-wix-com
- https://ksiegowosc24.pl/integracje/
- https://faktura.pl/
- https://pomoc.wfirma.pl/-ksef-czyli-krajowy-system-e-faktur

Inne platformy:
- https://publigo.pl/blog/ksef-sprzedaz-kursow-online/
- https://weblymate.com/ksef-i-woocommerce-jak-wysylac-faktury-do-krajowego-systemu-e-faktur-ze-sklepu-internetowego/
- https://www.ifirma.pl/ecommerce/integracje/etsy/
- https://sellasist.pl/integracja/ksef/etsy
- https://sellasist.pl/integracja/ksef/amazon
- https://base.com/pl-PL/blog/amazon-vcs-a-ksef-zmiany/
- https://www.serini-cloud.com/integracja-amazon-z-ksef/
- https://www.nex.katowice.pl/post/wdt-przez-amazon-a-ksef
- https://eurosell.pl/blog/ksef-na-amazonie
- https://poradnikprzedsiebiorcy.pl/-jakich-faktur-nie-dotyczy-ksef-czyli-krajowy-system-efaktur
- https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf
- https://support.wix.com/en/article/wix-invoices-handling-eu-e-invoicing-and-peppol

Wielkość rynku:
- https://trends.builtwith.com/payment/Stripe/Poland
- https://www.wmtips.com/technologies/payments/country/pl/
- https://storeleads.app/reports/wix/PL/top-stores
- https://fisherleads.com/new/wix
- https://www.aftership.com/ecommerce/statistics/regions/pl

Kalendarz, kary, tokeny i certyfikaty:
- https://finwire.pl/artykuly/ksef-od-1-stycznia-2027-firmy-do-10-tys-zl-kasy-numer-ksef-w-przelewie
- https://skarbiec.biz/finansowanie/faktoring/najmniejsi-przedsiebiorcy-jednak-trafia-do-ksef-ministerstwo-nie-da-im-kolejnego-roku
- https://www.infakt.pl/blog/ksef-najmniejsze-firmy-maja-czas-do-2027-roku-jak-dziala-odroczenie/
- https://www.saldeosmart.pl/blog/wszystko-o-ksef/ksef-dla-mikroprzedsiebiorcow-od-2027-roku-co-trzeba-wiedziec/
- https://mk.rp.pl/blog/token-czy-certyfikat-ksef-2027/
- https://www.faktzero.pl/blog/token-certyfikat-ksef-co-wybrac
- https://biuromat.pl/certyfikat-ksef/
- https://elpro.com.pl/ksef.html
- https://pietruczyk.pl/blog/tokeny-ksef-do-kiedy
