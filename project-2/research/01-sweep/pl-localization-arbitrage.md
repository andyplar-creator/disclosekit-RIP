# Soczewka: Arbitraż lokalizacyjny PL (pl-localization-arbitrage)

Data badania: 2026-11-26. Autor: agent badawczy (jedna z kilkunastu soczewek sweepu).

## Jak czytać ten dokument (ważne zastrzeżenia)

- **Badanie jest niepełne.** Zaplanowałem 15-30 wyszukiwań, wykonałem 12. Potem skończył się wspólny limit wyszukiwań dla całego przebiegu (200 na wszystkich agentów naraz). Drugiej rundy (sprawdzenie konkretnych luk) nie dało się zrobić. Jeśli chcesz ją dokończyć: wyślij kolejną wiadomość albo podnieś limit `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`.
- **Nie otwierałem stron bezpośrednio** (sieć w kontenerze to blokuje). Wszystkie ceny i liczby pochodzą z wyników wyszukiwarki, czyli z fragmentów stron. Przed decyzją trzeba je potwierdzić ręcznie na stronie źródłowej.
- Każda liczba ma link do źródła. Moje własne oceny są oznaczone słowem **szacunek** albo **wniosek**. Tam, gdzie piszę z pamięci (wiedza ogólna, nie potwierdzona w tej sesji), jest to oznaczone jako **niezweryfikowane**.
- Nie mam narzędzia do wolumenów wyszukiwań. Nigdzie nie podaję liczby wyszukiwań miesięcznie. Zamiast tego pokazuję zastępcze sygnały popytu (ilu płatnych konkurentów, ile opinii w sklepie z aplikacjami).

## Werdykt

**Soczewka jest słaba do umiarkowanej dla tego założyciela. Nie znalazłem tu gotowego, zweryfikowanego projektu.** Znalazłem jeden kierunek wart godziny dalszego sprawdzania.

Trzy rzeczy, które wyszły z danych:

1. **Klasyczny arbitraż lokalizacyjny dla małych firm jest w Polsce już zamknięty.** W każdej z czterech kategorii, które zdążyłem sprawdzić, działa już kilku polskich płatnych graczy: zbieranie opinii Google (5+ narzędzi, 79-1290 zł/mies.), wyceny dla fachowców (7+ aplikacji, 19,99-599 zł/mies.), alerty o ogłoszeniach OLX/Otodom (8+ botów i serwisów), przypomnienia o płatnościach (wbudowane w Fakturownię i wFirmę). Wniosek: w 2026 roku tanie kodowanie z AI sprawiło, że oczywiste polskie klony już powstały. Sam fakt, że "za granicą to działa", nie jest już przewagą.
2. **Nawet gdyby luka istniała, kanał nie pasuje.** Właściciel salonu, warsztatu czy ekipy remontowej rzadko sam szuka takiego narzędzia. Te produkty sprzedaje się telefonem, handlowcem, agencją albo reklamą. Ty tego nie chcesz robić (zakaz outboundu). To jest ten sam błąd co w disclosekit, tylko w innym przebraniu: produkt bez kanału.
3. **Jedyny fragment tej soczewki, który spełnia Twoją regułę dystrybucji, to sklepy z aplikacjami dla e-commerce.** Tam polska specyfika (InPost, KSeF, Fakturownia, NIP) jest realną barierą dla globalnych graczy, a sprzedawca sam wpisuje potrzebę w wyszukiwarkę sklepu z aplikacjami. Shopify w Polsce to 19 199 aktywnych sklepów i wzrost 44% rok do roku ([Store Leads, aktualizacja 20.11.2026](https://storeleads.app/reports/shopify/PL/top-stores)). Polskie aplikacje płatne tam istnieją i mają publiczne cenniki. Ale dwie kategorie, które sprawdziłem (InPost i KSeF), są już obsadzone przez 3-5 aplikacji każda. **Konkretnej wolnej luki nie zdążyłem potwierdzić.**

Uczciwie: obaj "kandydaci" poniżej to **kierunki z potwierdzonym kanałem, a nie potwierdzone produkty**. Bramka R4 jest zaliczona na poziomie kanału, nie na poziomie konkretnej aplikacji. Jeżeli inna soczewka ma kandydata z twardszym dowodem popytu, powinna wygrać z tą.

## Kandydaci

### 1. Polska mikro-aplikacja w Shopify App Store (kierunek, konkretna luka do potwierdzenia)

**Dla kogo:** polscy sprzedawcy na Shopify. 19 199 aktywnych sklepów, +20% kwartał do kwartału i +44% rok do roku w III kw. 2026, w tym 851 sklepów Shopify Plus ([Store Leads](https://storeleads.app/reports/shopify/PL/top-stores)). Inne źródło podaje 17 139 sklepów miesiąc wcześniej ([Fusion Marketing, dane Store Leads z 16.10.2026](https://fusionmarketing.pl/blog/najpopularniejsze-platformy-e-commerce-w-polsce-ranking-2026/)). Dla porównania: lipiec 2024 to "ponad 7 000" wg BuiltWith (cytowane w wynikach wyszukiwania, bez bezpośredniego linku do BuiltWith).

**Problem:** Shopify jest platformą globalną i nie obsługuje polskich realiów. Sprzedawca musi doinstalować aplikacje do rzeczy typu: wybór Paczkomatu w koszyku, faktury do KSeF, połączenie z polskim programem do faktur. Jeden z poradników podaje, że dojrzały sklep wydaje na aplikacje zwykle 50-200 USD miesięcznie ([jflowlabs.pl](https://jflowlabs.pl/wiedza/sklep-shopify-w-polsce/), [kkdigital.pl](https://kkdigital.pl/fakturowanie-w-shopify-ksef/)).

**Jak często:** codziennie, przy każdym zamówieniu. Aplikacja działa tak długo, jak działa sklep. Abonament pasuje do częstotliwości (R2 spełnione).

**Cena:** abonament 9-19 USD/mies. z progami zależnymi od liczby zamówień. To dokładnie widełki, w których sprzedają obecne polskie aplikacje (patrz niżej). Darmowy plan tylko jako demo, np. limit 3 dokumentów miesięcznie, tak jak robią to Fakturownia Integrator i Faktly. Prawdziwy sklep w trzech dokumentach się nie zmieści (R3 spełnione).

**Kanał dystrybucji:** wyszukiwarka w Shopify App Store. Sprzedawca wpisuje "InPost", "KSeF", "Fakturownia" i widzi listę aplikacji. Nie potrzeba własnej publiczności ani outboundu. Dodatkowo polskie agencje Shopify piszą poradniki porównujące aplikacje ([kkdigital.pl](https://kkdigital.pl/fakturowanie-w-shopify-ksef/), [ksefshop.pl](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)), czyli nowa aplikacja trafia do takich zestawień bez Twojego udziału (wniosek).

**Konkurencja i ceny (to, co faktycznie widziałem):**

Kategoria InPost:
- InPost - Tale Commerce: 19 USD/mies., 10 dni próbnych, znaczek "Built for Shopify". Wymaga funkcji Shopify niedostępnej w najtańszym planie. Liczba opinii w wynikach jest niejednoznaczna (16 albo 476, zależnie od strony), do ręcznego sprawdzenia ([apps.shopify.com/paczkomaty-inpost](https://apps.shopify.com/paczkomaty-inpost)).
- InPost Paczkomaty Orlen Paczka (Codie): od 9 USD/mies., ocena 4,9 z 24 opinii, działa na planie Basic ([apps.shopify.com/inpost-paczkomaty-1](https://apps.shopify.com/inpost-paczkomaty-1)).
- InPost by Progus: 112 opinii, ceny nie znalazłem ([apps.shopify.com/inpost-4/reviews](https://apps.shopify.com/inpost-4/reviews)).

Kategoria KSeF i faktury (ceny z porównania napisanego przez jednego z konkurentów, więc ostrożnie: [ksefshop.pl](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)):
- Fakturownia Integrator: darmowo do 3 dokumentów miesięcznie, KSeF w cenie ([apps.shopify.com/fakturownia-1](https://apps.shopify.com/fakturownia-1)); strona Fakturowni podaje 14,99 USD/mies., ale wygląda na starą ([fakturownia.pl/apps/shopify](https://fakturownia.pl/apps/shopify)).
- Faktly: darmowo do 3 faktur, potem od 19,90 USD (100 faktur).
- Sufio (gracz globalny): od 7 USD (15 faktur).
- POP: darmowy plan bez KSeF, od 9 USD z KSeF.
- KSeF Faktury (ksefshop.pl): 12 / 24 / 49 USD, jeszcze nie w App Store, start planowany na grudzień 2026.

Słabość konkurencji: to małe zespoły i pojedynczy deweloperzy, liczby opinii są niskie jak na standardy Shopify (24-112 w potwierdzonych przypadkach). Ale w tych dwóch kategoriach już są i wciąż wchodzą nowi. Wejście jako szósta aplikacja KSeF albo czwarta InPost byłoby spóźnione.

**Dowody popytu z linkami:**
- Twarda liczba: 19 199 sklepów, +44% r/r ([Store Leads](https://storeleads.app/reports/shopify/PL/top-stores)).
- Twarda liczba: co najmniej 3 płatne aplikacje InPost (9-19 USD/mies.) i 5 płatnych aplikacji fakturowych z KSeF (7-49 USD/mies.) z publicznymi cennikami (linki wyżej). Ludzie za to płacą już dziś.
- Obserwacja: nowy gracz wchodzi w grudniu 2026 ([ksefshop.pl](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)). To znak, że niezależni deweloperzy widzą tu pieniądze, i jednocześnie znak rosnącego tłoku.
- Brak dowodu: nie znam liczby instalacji żadnej z tych aplikacji ani przychodów ich twórców. Shopify tego nie publikuje. Liczba opinii to tylko przybliżenie.

**Hipotezy luk do sprawdzenia (niezweryfikowane, to są moje domysły, nie wyniki):** pole NIP i dane do faktury w koszyku; integracje z wFirma, inFakt, iFirma; feed do Ceneo i Skąpca oraz Zaufane Opinie Ceneo; najniższa cena z 30 dni (Omnibus); punkty odbioru innych przewoźników (DPD Pickup, DHL, Orlen Paczka, Pocztex); pola GPSR. Dla każdej z nich nie wiem, czy aplikacja już istnieje. Wyszukiwania w tej sprawie nie wykonały się z powodu limitu.

**Dlaczego nie ChatGPT:** to integracja działająca bez nadzoru wewnątrz sklepu, przy każdym zamówieniu. ChatGPT nie wyświetli mapy Paczkomatów w koszyku i nie wyśle faktury do KSeF. Twardy powód, reguła zastępowalności spełniona.

**Ryzyko (od największego):**
1. **Nie ma jeszcze produktu.** Bez potwierdzonej luki to tylko kierunek. Może się okazać, że wszystkie sensowne polskie potrzeby są już obsadzone.
2. **Mały sufit.** Szacunek: gdyby 1% z 19 199 sklepów płaciło 12 USD, to ok. 190 klientów i ok. 2 300 USD miesięcznie. Ten 1% to moje założenie, nie zmierzony wskaźnik.
3. **Wsparcie kontra pasywność.** Gdy sklepowi przestaje działać koszyk albo faktura, właściciel chce pomocy tego samego dnia. Przy aplikacjach "dotykających" faktur dochodzi ryzyko błędów w dokumentach podatkowych. Szacunek: 2-5 godz. tygodniowo przy kilkudziesięciu klientach, więcej przy awarii API.
4. **Tarcie budowy.** Aplikacja Shopify to więcej niż strona plus Stripe: logowanie OAuth, rozliczenia przez Shopify (nie przez Twój Stripe), obowiązkowe webhooki RODO, recenzja przed publikacją. Reguła budowy mówi "unikać piekła recenzji". Recenzja Shopify jest lżejsza niż Apple, ale istnieje (niezweryfikowane w tej sesji: czas recenzji i aktualny podział przychodów Shopify).
5. **Zależność od platformy.** InPost albo Fakturownia mogą wydać własną oficjalną aplikację i wyzerować niszę. Fakturownia już to zrobiła.

**Ocena R4:** zaliczone częściowo. Na poziomie kanału: tak (wielu płatnych konkurentów z cennikami, szybko rosnąca baza sklepów, transakcyjne strony w wynikach). Na poziomie konkretnego produktu: **nie zweryfikowane**. Wolumenu fraz nie mierzyłem. Pewność: niska.

**Test R1 przed kodem:** godzina ręcznego przeglądu App Store (lista kroków na końcu dokumentu). Dopiero gdy znajdzie się luka z dowodem (sprzedawcy pytają o to na grupach, istniejąca aplikacja ma słabe oceny), budować najcieńszą wersję. Tutaj sam wpis w App Store jest testem gotowości do zapłaty.

### 2. Aplikacja w App Store Shoper (kierunek, słabszy niż nr 1)

**Dla kogo:** sklepy na polskiej platformie Shoper. Shoper podaje "ponad 20 tys. sklepów" ([Shoper Trends, wrzesień 2026](https://www.shoper.pl/learn/artykul/shoper-trends-wrzesien-2026)). Niezależny pomiar pokazuje 15 448 żywych sklepów w III kw. 2026 ([Store Leads](https://storeleads.app/reports/shoper)). Sprzedaż w tych sklepach rośnie: 3,1 mld zł GMV w I kw. 2026, +13% r/r ([Shoper, wyniki Q1 2026](https://investors.shoper.pl/en/press-office/wyniki-q1-2026)).

**Problem:** pomysł to przeniesienie kategorii aplikacji sprawdzonej w Shopify App Store (gdzie konkurencja jest globalna) do sklepu Shopera, gdzie globalni deweloperzy nie wchodzą, bo platforma jest tylko polska. To jest czysty arbitraż lokalizacyjny: język, polski panel, polskie rozliczenia.

**Jak często:** stale, aplikacja pracuje przy każdym zamówieniu lub wizycie. Abonament pasuje (R2).

**Cena:** 39-99 zł/mies. Mieści się w typowych widełkach 20-200 zł za aplikację miesięcznie ([growcommerce.pl](https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/), to blog firmy trzeciej, nie oficjalny cennik).

**Kanał dystrybucji:** App Store Shoper, dostępny z panelu każdego sklepu. Dodatkowo Shoper sam promuje aplikacje partnerów na swoim blogu w zestawieniach typu "15 aplikacji dla branży X" ([przykład 1](https://www.shoper.pl/learn/artykul/top-10-aplikacji-z-branzy-wyposazenia-wnetrz), [przykład 2](https://www.shoper.pl/learn/artykul/nowe-funkcjonalne-aplikacje-app-store-shoper)).

**Konkurencja i ceny:** agencje partnerskie, które produkują aplikacje seryjnie. Scharmach Consulting wypuścił 4 nowe aplikacje w samym październiku 2026, łącznie za 209 zł/mies. ([scharmach.pl](https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting)). Słabość: nie znam. Nie zdążyłem przejrzeć katalogu.

**Dowody popytu z linkami:**
- Partnerzy nadal wydają nowe płatne aplikacje ([scharmach.pl](https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting)). To pośredni sygnał, że się to opłaca.
- Sygnał negatywny: liczba sklepów Shopera stoi w miejscu albo lekko spada (15 667 w II kw. 2026, 15 448 w III kw. 2026, [Store Leads](https://storeleads.app/reports/shoper)), podczas gdy Shopify w Polsce rośnie 44% r/r. Spółka przestała podawać liczbę sklepów po 2021 r., kiedy było ich 25,7 tys. ([raport Millennium BM](https://www.millenniumbm.pl/delegate/managedfiles/14005/latest)).
- Brak dowodu: liczby instalacji, opinie przy aplikacjach, przychody deweloperów.

**Dlaczego nie ChatGPT:** jak w nr 1, integracja wewnątrz sklepu działająca bez nadzoru.

**Ryzyko:**
1. **Nie znam warunków dla deweloperów.** Prowizja Shopera, umowa partnerska, proces weryfikacji: nie znalazłem w wynikach. To pierwsza rzecz do sprawdzenia, bo może przekreślić pomysł.
2. Baza sklepów nie rośnie.
3. Agencja, która wydaje 4 aplikacje miesięcznie, skopiuje udany pomysł w kilka tygodni.
4. Wsparcie jak w nr 1.

**Ocena R4:** nie zaliczone na dziś. Kanał istnieje i ma wbudowany ruch, ale nie mam żadnego dowodu popytu na konkretną aplikację. Pewność: niska.

**Uwaga praktyczna (wniosek):** jeżeli luka z nr 1 okaże się realna, ta sama logika aplikacji może obsłużyć oba sklepy. Shoper byłby wtedy drugim krokiem, nie pierwszym.

## Odrzucone pomysły i dlaczego

Odrzucone na podstawie danych z tej sesji:

| Pomysł | Dlaczego odpada |
|---|---|
| Zbieranie opinii Google przez SMS (polski NiceJob/Podium) | Już zlokalizowane. Repu.pl 79 i 149 zł/mies. ([cennik](https://repu.pl/cennik/)), Waszaopinia.pl 99 zł/mies. ([link](https://waszaopinia.pl/)), Oceniam.app 248-1290 zł/mies. ([link](https://www.oceniam.app/)), ZobaczOpinie od 249 zł netto ([link](https://zobaczopinie.pl/znanylekarz-cennik)), Repto ([link](https://repto.pl/cennik)), do tego agencje. Sprzedaż idzie przez handlowców i reklamy, czyli kanał, którego nie chcesz. |
| Wyceny i oferty dla fachowców (polski Jobber/Tradify) | Tłok. Wycenka 29 zł/mies. ([link](https://wycenka.eu/)), RenovixPRO 49 zł netto ([link](https://renovixpro.pl/)), Wycena Pro 19,99 zł/mies. lub 79,99 zł jednorazowo ([link](https://wycena-pro.pl/)), Kalkulator Remontowy od 29 zł ([link](https://zeldnet.com/kalkulator-remontowy/)), Majster.expert 149-599 zł ([link](https://majster.expert/)), Costor ([link](https://costor.eu/)), aplikacja na iPada 129,99 zł/mies. ([link](https://apps.apple.com/pl/app/kosztorys-i-wycena-remontu/id6758105341?l=pl)). Większość ma darmowy plan na 3 wyceny miesięcznie. Ceny już są na dnie. |
| Alerty o nowych ogłoszeniach OLX/Otodom (polski Rentbird/Stekkies) | Co najmniej 8 graczy, część z darmowym planem, jeden otwarty kod: [ofertello.pl](https://ofertello.pl/), [huntbot.pl](https://huntbot.pl/), [fonbot.pl](https://fonbot.pl/), [scrape.pl](https://scrape.pl/monitorowanie-ogloszen/otodom), [xoler.app](https://xoler.app/zastosowanie/nieruchomosci/), [monitor-ofert.pl](https://monitor-ofert.pl/en/), [OlxSniper](https://github.com/piotrwawrzyn/OlxSniper). Do tego całość stoi na pobieraniu danych z cudzych portali wbrew ich woli: ryzyko blokady i sporu (wniosek). |
| Miękka windykacja, przypomnienia o fakturach (polski Chaser) | Funkcja jest wbudowana w programy do faktur. Fakturownia ma automatyczne przypomnienia e-mail, płatny dodatek SMS, wezwania do zapłaty i noty odsetkowe ([pomoc Fakturowni](https://pomoc.fakturownia.pl/785999-automatyczne-przypomnienie-o-koniecznosci-oplacenia-faktury-po-terminie-platnosci), [SMS](https://fakturownia.pl/powiadomienia-sms)); wFirma ma przypomnienia e-mail wg porównania ([sprytnafirma.pl](https://sprytnafirma.pl/podatki-i-ksiegowosc/integracja-programow-do-faktur-z-bankami)). Krok dalej to już prawdziwa windykacja, czyli obszar prawny. |
| Przypomnienia SMS o wizycie z Kalendarza Google (polski GReminders/Apptoto) | Już zlokalizowane: Etisia ma polskie strony i 60 darmowych SMS-ów ([link](https://www.etisia.com/pl/przypomnienie-o-wizycie-sms)), Kalama daje 25 darmowych SMS-ów ([Google Workspace Marketplace](https://workspace.google.com/marketplace/app/sms_reminder_for_google_calendar_free_bo/33150033653)), jest też NotifyApp ([link](https://workspace.google.com/marketplace/app/notifyapp/256932740718)). Funkcję ma też każdy system rezerwacji (niezweryfikowane w tej sesji, wiedza ogólna). Marża na SMS-ie jest cienka (wniosek). Wolumenu popytu nie potwierdziłem. |
| Aplikacja KSeF dla Shopify | Popyt jest, ale to 5 aplikacji z cennikami plus szósta w grudniu 2026 ([porównanie](https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/)). Wejście spóźnione, a błędy w fakturach oznaczają pilne wsparcie. Łamie regułę pasywności. |
| Aplikacja InPost dla Shopify | 3 aplikacje za 9-19 USD/mies., jedna ze znaczkiem "Built for Shopify" (linki w kandydacie nr 1). Spóźnione. |
| Vouchery i karty podarunkowe z BLIK ("polski Gift Up!") | R4 nie zaliczone. Jedno wyszukiwanie nie pokazało ani jednego polskiego systemu tego typu, ale pokazało za to szablony PDF za 19,90 zł ([labpicture.pl](https://labpicture.pl/voucher-wzor-do-druku-pdf/)), drukarnie, wtyczkę WooCommerce za 123 zł ([wphocus.com](https://wphocus.com/produkt/woocommerce-bony-produktowe/)) i pasaż z voucherami ([multivoucher.pl](https://multivoucher.pl/)). To sugeruje, że ludzie szukają wzoru i druku, a nie oprogramowania. Dodatkowy problem (wniosek): przyjmowanie pieniędzy w imieniu salonu i wypłacanie ich dalej to pośrednictwo płatnicze, czyli obszar regulowany; obejście przez Stripe Connect wymaga, by każdy salon założył konto Stripe. Zagranicznego dowodu (Gift Up!) nie zdążyłem potwierdzić źródłem. Do ewentualnego ponownego sprawdzenia, nie do budowy. |
| Zamówienia online i menu QR dla restauracji | Rynek nasycony, wyszło to przy okazji innego wyszukiwania: [Superboss](https://superboss.pl/cennik-restauracje/), [GastroLite "0% prowizji"](https://gastrolite.pl/zamowienia-online), [Menu.pl](https://menu.pl/pricing), [zamow.online](https://zamow.online/), ChoiceQR i inni. Wymaga wdrożeń i sprzedaży bezpośredniej. |

Nie zbadane z powodu limitu wyszukiwań (nie traktuj tego jako odrzucenia na podstawie danych):

- Narzędzia dla sprzedawców Allegro i dodatki do BaseLinkera.
- Wtyczki WooCommerce i PrestaShop pod polskie realia (niezweryfikowane, wiedza ogólna: ten rynek od lat obsługuje WP Desk).
- Systemy rezerwacji, zadatki, listy oczekujących (niezweryfikowane, wiedza ogólna: Booksy, Bookero, Calendesk, Zencal, Znany Lekarz).
- Narzędzia do wizytówki Google (niezweryfikowane, wiedza ogólna: polski Localo).
- Proste CRM-y dla jednej branży, narzędzia dla twórców, narzędzia konsumenckie.
- Pomysł poboczny: automatyczne faktury KSeF dla firm, które sprzedają przez Stripe. Pasuje do Twojego stosu, ale nie sprawdziłem ani konkurencji, ani popytu.

## Jak dokończyć weryfikację (ok. 1 godziny, bez kodu)

1. Wejdź na apps.shopify.com i wpisz po kolei: NIP, Ceneo, Allegro, Omnibus, wFirma, inFakt, iFirma, DPD Pickup, Orlen Paczka, Pocztex, GPSR, Zaufane Opinie. Dla każdej frazy zapisz: ile jest aplikacji, ile mają opinii, jaka ocena, kiedy ostatnia opinia, na co narzekają w opiniach 1-2 gwiazdki.
2. Luka jest prawdziwa tylko wtedy, gdy jednocześnie: (a) są najwyżej 2 aplikacje albo istniejące mają ocenę poniżej 4,0, (b) sprzedawcy pytają o to sami, np. w grupie "Shopify Polska" na Facebooku lub na forum Shopify. Jedno bez drugiego nie wystarcza.
3. Sprawdź w dokumentacji Shopify dla partnerów aktualny podział przychodów i wymagania recenzji.
4. Dla Shopera: znajdź w dokumentacji dla deweloperów prowizję i warunki partnerstwa. Bez tej informacji kandydat nr 2 nie ma sensu.
5. Jeśli po tej godzinie nie ma luki spełniającej punkt 2, zamknij tę soczewkę bez żalu.

## Źródła

Liczba sklepów i platformy:
- https://storeleads.app/reports/shopify/PL/top-stores
- https://storeleads.app/reports/shoper
- https://fusionmarketing.pl/blog/najpopularniejsze-platformy-e-commerce-w-polsce-ranking-2026/
- https://www.attomy.io/post/polski-e-commerce-dojrzewa-a-shopify-wyrasta-na-lidera-piec-trendow-ktore-zdefiniuja-2026-rok
- https://www.shoper.pl/learn/artykul/shoper-trends-wrzesien-2026
- https://investors.shoper.pl/en/press-office/wyniki-q1-2026
- https://www.millenniumbm.pl/delegate/managedfiles/14005/latest

Aplikacje Shopify i Shoper:
- https://apps.shopify.com/paczkomaty-inpost
- https://apps.shopify.com/inpost-paczkomaty-1
- https://apps.shopify.com/inpost-4/reviews
- https://apps.shopify.com/fakturownia-1
- https://fakturownia.pl/apps/shopify
- https://ksefshop.pl/en/guides/ksef-shopify-apps-compared/
- https://kkdigital.pl/fakturowanie-w-shopify-ksef/
- https://jflowlabs.pl/wiedza/sklep-shopify-w-polsce/
- https://growcommerce.pl/wiedza/najlepsze-aplikacje-shoper/
- https://scharmach.pl/4-nowe-aplikacje-dla-shopera-mocny-pazdziernik-2026-w-scharmach-consulting
- https://www.shoper.pl/learn/artykul/top-10-aplikacji-z-branzy-wyposazenia-wnetrz
- https://www.shoper.pl/learn/artykul/nowe-funkcjonalne-aplikacje-app-store-shoper

Opinie Google:
- https://repu.pl/cennik/
- https://waszaopinia.pl/
- https://www.oceniam.app/
- https://zobaczopinie.pl/znanylekarz-cennik
- https://repto.pl/cennik
- https://rankbooster.pl/poradnik/ile-kosztuje-pozyskiwanie-opinii-google/

Wyceny dla fachowców:
- https://wycenka.eu/
- https://renovixpro.pl/
- https://wycena-pro.pl/
- https://zeldnet.com/kalkulator-remontowy/
- https://majster.expert/
- https://costor.eu/
- https://apps.apple.com/pl/app/kosztorys-i-wycena-remontu/id6758105341?l=pl

Alerty ogłoszeń:
- https://ofertello.pl/
- https://huntbot.pl/
- https://fonbot.pl/
- https://scrape.pl/monitorowanie-ogloszen/otodom
- https://xoler.app/zastosowanie/nieruchomosci/
- https://monitor-ofert.pl/en/
- https://github.com/piotrwawrzyn/OlxSniper

Przypomnienia o płatnościach i SMS:
- https://pomoc.fakturownia.pl/785999-automatyczne-przypomnienie-o-koniecznosci-oplacenia-faktury-po-terminie-platnosci
- https://fakturownia.pl/powiadomienia-sms
- https://sprytnafirma.pl/podatki-i-ksiegowosc/integracja-programow-do-faktur-z-bankami
- https://www.etisia.com/pl/przypomnienie-o-wizycie-sms
- https://workspace.google.com/marketplace/app/sms_reminder_for_google_calendar_free_bo/33150033653
- https://workspace.google.com/marketplace/app/notifyapp/256932740718

Vouchery i gastronomia:
- https://labpicture.pl/voucher-wzor-do-druku-pdf/
- https://wphocus.com/produkt/woocommerce-bony-produktowe/
- https://multivoucher.pl/
- https://superboss.pl/cennik-restauracje/
- https://gastrolite.pl/zamowienia-online
- https://menu.pl/pricing
- https://zamow.online/
