# Deep-dive: Zwiad luk - polskie ekosystemy platform, do których nie dotarł pierwszy przegląd

Data badania: 2026-11-26. Slug: `unresearched-polish-ecosystems-gap-scout`.

**Uczciwie o stanie badania (przeczytaj najpierw):**

- Wykonałem 27 wywołań wyszukiwarki z limitu 28. 26 zwróciło wyniki, ostatnie zostało odrzucone, bo wyczerpał się wspólny limit całego przebiegu. Nie obchodziłem limitu.
- Nie mogłem otwierać stron (sieć kontenera to blokuje). Wszystkie liczby pochodzą z podsumowań wyników wyszukiwania dla podanych adresów. Kluczowe liczby oznaczyłem **[DO POTWIERDZENIA]** - kliknij i sprawdź przed decyzją.
- To był zwiad po 8 ekosystemach, czyli średnio 3 wyszukiwania na ekosystem. "Nie znalazłem" znaczy tu "nie znalazłem w 1-3 wyszukiwaniach", a nie "nie istnieje".
- Nie mam narzędzia do wolumenów fraz. Żadnej liczby wyszukiwań tu nie podaję. Reguły R4 "na liczbach" nie da się w tym dokumencie zaliczyć żadnemu pomysłowi.

Statusy: **zweryfikowane** = fakt lub liczba z linkiem; **częściowo** = dowód pośredni; **niezweryfikowane** = moje rozumowanie albo brak danych. Słowo **szacunek** = moje zgadywanie.

---

## Werdykt

**Słaby.** Nie znalazłem ani jednej luki produktowej potwierdzonej dowodem popytu. Siedem z ośmiu ekosystemów odpada dla Ciebie z konkretnych powodów (brak sklepu z ruchem kupujących, tłok tanich klonów, darmowe narzędzia albo technologia spoza Twojego zestawu). Zostaje jeden trop wart sprawdzenia za 0 zł.

**Jedyne nowe, realne znalezisko: IdoSell Apps.** To prawdziwy sklep z aplikacjami firm trzecich, w którym IdoSell sam rozlicza abonamenty, a twórca ustala cenę ([IdoSell Apps](https://www.idosell.com/pl/idosell-apps)). Pierwszy przegląd w ogóle go nie zbadał. Ale:

- prowizji i warunków wejścia nie ma publicznie (szukałem trzy razy) - trzeba napisać do IdoSell,
- nie znalazłem żadnych liczb instalacji ani zarobków którejkolwiek aplikacji,
- baza jest mała: ok. 6-8 tys. sklepów ([StoreLeads](https://storeleads.app/reports/idosell), [blog IdoSell](https://www.idosell.com/pl/blog/idosell-vs-shoper-porownanie-platform-e-commerce-dla-sklepow-gotowych-na-wzrost)),
- nie mam żadnego dowodu, że sklepy IdoSell szukają konkretnej aplikacji, którą mógłbyś zbudować.

**Co to znaczy dla Ciebie:** ten zwiad nie daje osobnego projektu. Daje jeden dodatkowy kanał do sprawdzenia dla pomysłu "PLAR Orders jako aplikacja w sklepie platformy" (pierwszy przegląd proponował Shopify). Traktuj IdoSell Apps jako wariant tamtego kandydata, nie jako nowy pomysł. Sprawdzenie kosztuje jeden e-mail i godzinę przeglądania katalogu. Jeśli IdoSell nie odpowie albo warunki będą złe, temat zamykasz bez straty.

**Czego na pewno nie robić po tym zwiadzie:** rozszerzeń Chrome do OLX/Otodom/Vinted i KSeF, kolejnego modułu PrestaShop, dodatku do Subiekta, niczego opartego o Booksy/Fresha, narzędzi na API Allegro.

---

## Odpowiedzi na pytania zabojcze

### 1. Czy w każdym ekosystemie jest otwarty katalog lub sklep, który kieruje kupujących do płatnych dodatków firm trzecich, i na jakich warunkach?

| # | Ekosystem | Jest sklep/katalog z ruchem kupujących? | Warunki handlowe | Status |
|---|---|---|---|---|
| 1 | Allegro (narzędzia dla sprzedawców) | **Nie znalazłem** katalogu aplikacji dla sprzedawców. Jest tylko katalog certyfikowanych agencji Allegro Ads ([Allegro](https://allegro.pl/advertising/agencje-partnerskie)) - to usługi, nie aplikacje. | Aplikacja korzystająca z API musi przejść weryfikację: do 14 dni roboczych, a kolejny wniosek jest blokowany do decyzji ([GitHub Allegro, zgłoszenie z 11.2026](https://github.com/allegro/allegro-api/issues/14338)). Od końca czerwca 2026 wymagany własny identyfikator aplikacji ([GitHub Allegro](https://github.com/allegro/allegro-api/issues/13126)). Deweloperzy proszą o weryfikację, żeby dostać dostęp do listy ofert ([przykład](https://github.com/allegro/allegro-api/issues/13949), [przykład](https://github.com/allegro/allegro-api/issues/14083)). | częściowo |
| 2 | BaseLinker / Base.com | **Nie znalazłem** sklepu z aplikacjami z rozliczeniem (dwa wyszukiwania, zero śladów). Narzędzia firm trzecich podłącza się kluczem API i sprzedaje na własnej stronie ([Dashbord](https://dashbord.pl/integracje/baselinker/), [Profigro](https://www.profigro.com/)). | Dostęp do API jest częścią konta, bez dopłaty ([codecollab](https://codecollab.pl/en/blog/baselinker-api-automation/) - źródło nieoficjalne). Ruch kupujących musisz zdobyć sam. | częściowo (potwierdza wniosek pierwszego przeglądu: to świat partnerów, nie sklep z aplikacjami) |
| 3 | IdoSell | **Tak: IdoSell Apps.** Aplikacje firm trzecich, sklep płaci osobno za każdą aplikację w abonamencie miesięcznym, cenę ustala twórca, a rozliczeniem abonamentów zajmuje się IdoSell ([IdoSell Apps](https://www.idosell.com/pl/idosell-apps), [blog IdoSell](https://www.idosell.com/pl/blog/idosell-apps-innowacyjna-platforma-z-aplikacjami-dla-sklepu-internetowego-1235328307)). Platforma ruszyła ok. listopada 2024 ([isbtech, źródło sprzed 2 lat](https://www.isbtech.pl/2024/11/idosell-apps-aplikacje-do-rozwoju-sklepu-internetowego-w-jednym-miejscu/)). | Korzystanie z platformy dla twórców jest darmowe, IdoSell pisze o "korzystnych warunkach komercyjnych", ale **stawki prowizji nie ma publicznie**. Wejście przez kontakt: developers@idosell.com ([IdoSell Apps](https://www.idosell.com/pl/idosell-apps), [dla deweloperów](https://www.idosell.com/pl/dla-developerow/)). | zweryfikowane (istnienie i model), niezweryfikowane (prowizja, proces, ruch) |
| 4 | Wtyczki WooCommerce / moduły PrestaShop (polskie) | Brak polskiego sklepu z ruchem. Każdy producent sprzedaje na własnej stronie przez SEO. PrestaShop Addons istnieje, ale zabiera 17-40% (ustalenie pierwszego przeglądu). | Sprzedaż głównie jednorazowa: moduły PrestaShop zwykle 150-800 zł za sztukę ([ibif](https://www.ibif.pl/blog/sklepy-internetowe/ile-kosztuje-sklep-internetowy-prestashop-sprawdz-co-wplywa-na-jego-cene)). | częściowo |
| 5 | Rozszerzenia Chrome do polskich portali | Chrome Web Store jest otwarty, ale nie ma własnych płatności (ustalenie pierwszego przeglądu, z pamięci). Kupujący trafiają głównie z Google na strony narzędzi. | Własny Stripe. Abonamenty 20-99 zł/mies. (szczegóły w tabeli konkurencji). | częściowo |
| 6 | Dodatki do Excela / Arkuszy Google | Tak, dwa sklepy: Microsoft AppSource i Google Workspace Marketplace. Polski płatny dodatek jest w sklepie Microsoft ([AppSource: NIP24](https://appsource.microsoft.com/en-us/product/office/wa200004723?tab=overview)). | Płatność i tak przez własną stronę dostawcy (abonament NIP24 od 129 zł/mies. wg listingu). Warunków prowizyjnych sklepu Microsoft nie sprawdzałem. | częściowo |
| 7 | Booksy / ZnanyLekarz / Fresha | **Nie.** Booksy: brak publicznego sklepu z aplikacjami, API w fazie alfa, dostępne po kontakcie partnerskim ([supergood.ai](https://supergood.ai/api-report-card/booksy) - źródło zewnętrzne, nie Booksy). Fresha: brak publicznego API dla salonów albo API tylko po wniosku partnerskim ([supergood.ai](https://supergood.ai/api-report-card/fresha)). ZnanyLekarz/Docplanner: jest API integracyjne dla systemów gabinetowych, wersja 1.18.0 ([Docplanner](https://integrations.docplanner.com/docs/)), ale nie sklep z dodatkami. | Brak. | częściowo (źródła zewnętrzne) |
| 8 | Dodatki do programów księgowych | **InsERT: tak, jest oficjalny katalog "Rozwiązania partnerskie"** dla Subiekta GT i nexo, z cenami ([InsERT](https://www.insert.com.pl/dla_uzytkownikow/subiekt_gt/dodatki_rozszerzenia/rozwiazania_partnerskie.html)). Comarch Optima: **nie znalazłem** katalogu dodatków firm trzecich (jedno wyszukiwanie). Fakturownia/wFirma/inFakt: publiczne API i katalog gotowych integracji, opisywany przez partnera jako zamknięty ([Kasima](https://agencja.kasima.pl/partnerzy/fakturownia)); sklepu z płatnymi dodatkami nie znalazłem. | InsERT: zakup bezpośrednio u partnera. Czy trzeba być partnerem InsERT, żeby trafić do katalogu - nie ustaliłem (nazwa katalogu sugeruje, że tak). | częściowo |

**Wniosek [niezweryfikowane, moje rozumowanie]:** tylko IdoSell Apps spełnia Twoją regułę dystrybucji w pełnym brzmieniu (sklep platformy + rozliczenie przez platformę). InsERT ma katalog, ale to nie Twoja technologia (niżej). Reszta wymaga własnego ruchu z Google.

### 2. Gdzie widać płatną kategorię dodatków z realną trakcją, ale ze słabym lub porzuconym liderem?

**Nigdzie nie udało się tego potwierdzić.** Status: **częściowo** (ceny potwierdzone, trakcja nie).

Najbliższe przypadki i dlaczego to nie jest luka:

- **Dodatek do Excela "biała lista VAT / NIP / REGON".** Lider NIP24 (firma NETCAT) ma plany od 129 zł/mies. ([AppSource](https://appsource.microsoft.com/en-us/product/office/wa200004723?tab=overview)), ostatnia wersja 1.4.1 z października 2025 ([NIP24](https://nip24.pl/en/download/dodatek-add-in-do-excel/)). To droga cena, więc jest miejsce na tańszego gracza. Ale tani gracz już jest: VAT Validator za 29 zł/mies. do 50 sprawdzeń, w trakcie weryfikacji w sklepie Microsoft ([nip-excel.pl](https://nip-excel.pl/)). Liczby ocen ani instalacji nie znalazłem. Lider nie jest porzucony, a klon już wszedł.
- **Analityka zysku dla BaseLinkera.** BaseLinker sam nie liczy marży na zamówieniu ani na produkcie ([Dashbord](https://dashbord.pl/integracje/baselinker/), [matuszczak.pro](https://matuszczak.pro/jak-laczyc-dane-allegro-z-google-analytics-i-baselinker)), więc istnieje płatna kategoria narzędzi podłączanych kluczem API bez wdrożenia: Dashbord (ceny nie znalazłem), Profigro (na stronie widnieje plan "Baselinker Pro" za 299 zł, opis niejednoznaczny - [Profigro](https://www.profigro.com/)), do tego agencje robiące to na zamówienie ([Yasecure](https://yasecure.pl/liczenie-zysku-ze-sprzedazy-na-allegro-w-oparciu-o-baselinkera/)). Gracze są aktywni, a kanału "sklep platformy" nie ma. Trakcji żadnego z nich nie znam.
- **IdoSell Apps.** Katalog jest młody i rośnie (nowe aplikacje w 2026: Berryboo.ai, DocsImporter, Replee, integrator Comarch ERP XL, Alerty Magazynowe, Kopiowanie Opisów Produktów, integrator Pigu - [blog IdoSell](https://www.idosell.com/pl/blog/kategoria/zmiany-produktowe/narzedzia-i-aplikacje), [blog IdoSell](https://www.idosell.com/pl/blog/kategoria/zmiany-produktowe)). Nie znalazłem jednak żadnej liczby instalacji, ocen ani zarobków. Nie umiem wskazać słabego lidera, bo nie widzę liderów.
- **Katalog InsERT.** Ceny są publiczne i wyższe niż w e-commerce (importer dokumentów 149 zł/mies., 299 zł/rok, 590 zł dożywotnio; synchronizacja z Allegro 799-899 zł; integracja z WooCommerce od 952 zł rocznie - wg podsumowania wyników dla [katalogu InsERT](https://www.insert.com.pl/dla_uzytkownikow/subiekt_gt/dodatki_rozszerzenia/rozwiazania_partnerskie.html) i [Artoit](https://www.artoit.pl/dodatki_insert.html) **[DO POTWIERDZENIA]**). Trakcji nie znam. Technologia (program na Windows, mechanizm Sfera, baza MS SQL u klienta) nie pasuje do Twojego zestawu Cloudflare.

### 3. Gdzie użytkownicy publicznie proszą o dodatek, który nie istnieje?

**Nie znalazłem ani jednego takiego miejsca.** Status: **niezweryfikowane**.

- Żadne z 26 wyszukiwań nie zwróciło wątku na forum, grupy ani tablicy pomysłów, gdzie sprzedawcy proszą o brakujący dodatek. Grupy na Facebooku (gdzie takie prośby najczęściej padają) nie są widoczne dla wyszukiwarki.
- Jedyne publiczne "prośby", jakie widziałem, to deweloperzy proszący Allegro o weryfikację aplikacji do analizy cen ([GitHub Allegro](https://github.com/allegro/allegro-api/issues/13949), [GitHub Allegro](https://github.com/allegro/allegro-api/issues/14126)). To prośby twórców, nie kupujących, i świadczą raczej o tym, że Allegro przykręca dostęp.
- Zdanie "BaseLinker nie liczy marży" pochodzi od sprzedawców narzędzi, którzy na tym zarabiają, a nie od użytkowników.

To jest istotny brak. Pamiętaj lekcję z disclosekit: brak publicznych próśb to nie dowód braku popytu, ale na pewno nie jest dowodem popytu.

### 4. Który ekosystem wygląda najlepiej dla solo-założyciela bez umiejętności programowania, z agentem AI?

**IdoSell Apps - z dużym zastrzeżeniem.** Status: **częściowo**.

Za:

- Jedyny w tej grupie sklep, w którym platforma sama pobiera abonament od sklepu ([IdoSell Apps](https://www.idosell.com/pl/idosell-apps)). Nie gonisz płatności, nie budujesz własnego cennika w Stripe.
- Połączenie przez internetowe API (REST), czyli pasuje do Cloudflare Workers. Nie trzeba niczego instalować u klienta (inaczej niż dodatki do Subiekta).
- Sklepy IdoSell są większe niż przeciętne. IdoSell podaje blisko 8 000 aktywnych sklepów i ponad 16,5 mld zł obrotu rocznie ([blog IdoSell](https://www.idosell.com/pl/blog/idosell-vs-shoper-porownanie-platform-e-commerce-dla-sklepow-gotowych-na-wzrost) - liczby marketingowe firmy **[DO POTWIERDZENIA]**). Z mojego dzielenia wychodzi średnio ok. 2 mln zł obrotu na sklep rocznie (szacunek na liczbach marketingowych). Niezależne źródło widzi 6 145 działających sklepów i wzrost 25% rok do roku w II kw. 2026 ([StoreLeads](https://storeleads.app/reports/idosell)); inne liczy 4 686 ([Shoprank](https://shoprank.com/ecommerce-platforms/idosell-shop)).
- Katalog ma 2 lata, więc w większości nisz nie ma jeszcze 3-9 klonów (wniosek, nie widziałem pełnej listy).
- IdoSell sam ogłasza nowe aplikacje firm trzecich na swoim blogu, np. wpis o DocsImporter z 5 maja 2026 ([blog IdoSell](https://www.idosell.com/pl/blog/docsimporter-w-idosell-apps-automatyzacja-obiegu-faktur-miedzy-erp-a-twoim-sklepem-1235328692)). To darmowa dystrybucja bez Twojej publiczności.
- Ceny w katalogu nie są "dnem": od 49 zł brutto/mies. (DropUI, Share Basket - [IdoSell Apps](https://www.idosell.com/pl/idosell-apps)) do 99-849 zł/mies. zależnie od liczby zamówień (integrator Temu, aplikacja samego IdoSell - [blog IdoSell](https://www.idosell.com/pl/blog/integrator-idosell-temu-od-idosell-apps-jak-zautomatyzowac-sprzedaz-na-temu)).

Przeciw:

- Wejście nie jest samoobsługowe: trzeba się skontaktować z IdoSell. Prowizja, czas weryfikacji i wymagania są nieznane.
- Nie wiem, czy sklepy naprawdę przeglądają ten katalog, czy aplikacje poleca im opiekun.
- Baza to najwyżej 6-8 tys. sklepów. To 3 razy mniej niż polski Shopify (19 199 sklepów wg pierwszego przeglądu).
- IdoSell sam buduje aplikacje do własnego katalogu (integrator Temu, Bridge - [blog IdoSell](https://www.idosell.com/pl/blog/zmiany-bridge-dostepny-w-idosell-apps-z-licencjonowaniem-dla-wybranego-systemu-erp-1235328454)). Platforma jest Twoim konkurentem, jeśli nisza okaże się dobra.

Drugi w kolejności byłby sklep dodatków do Excela (Microsoft AppSource), ale tam produkt "biała lista VAT" ma już dwóch graczy i darmowe oficjalne źródło danych (niżej).

### 5. Najwyżej 2 konkretne luki z dowodami i przybliżonym sufitem

**Żadna luka nie jest potwierdzona dowodem popytu.** Status: **częściowo** (kanał potwierdzony, popyt nie). Mam jedną hipotezę wartą taniego testu i jedną, którą opisuję tylko po to, żebyś jej nie badał drugi raz.

**Hipoteza A (warunkowa): "Zamówienia z e-maila" jako aplikacja w IdoSell Apps.** Twój silnik z PLAR Orders, tylko z zapisem do panelu IdoSell zamiast do Arkuszy Google.

- Dowód kanału: zweryfikowany (pytanie 1).
- Dowód braku konkurenta: częściowy. Jedno wyszukiwanie nie znalazło żadnego narzędzia, które czyta zamówienia z e-maili/PDF/Excela i wprowadza je do IdoSell. Znalazłem tylko asystentów AI do odpowiadania klientom ([Sensbot](https://sensbot.ai/pl/idosell-email/), [TodayReply](https://todayreply.pl/integracje/idosell)) i aplikację do dokumentów księgowych ([DocsImporter](https://www.idosell.com/pl/blog/docsimporter-w-idosell-apps-automatyzacja-obiegu-faktur-miedzy-erp-a-twoim-sklepem-1235328692)). Pełnego katalogu nie widziałem.
- Dowód wykonalności: częściowy. Biblioteki firm trzecich wymieniają operację tworzenia zamówień w API administracyjnym IdoSell ([Packagist](https://root.packagist.org/packages/beziworld/laravel-idosell), [GitHub](https://github.com/ltung7/idosell)). Oficjalnej dokumentacji nie widziałem.
- Dowód popytu: **brak.** Nie wiem, ile sklepów IdoSell sprzedaje hurtowo i dostaje zamówienia mailem. Nie znalazłem ani jednej prośby o taką funkcję.
- Sufit (szacunek, wszystkie liczby poza bazą sklepów to moje zgadywanie): baza 6-8 tys. sklepów; jeśli 5-10% ma hurt z zamówieniami mailowymi, to 300-800 sklepów; jeśli 1-3% z nich kupi od nowego, nieznanego dostawcy, to 3-24 klientów; przy 199-399 zł/mies. daje to ok. 600-9 600 zł/mies. przed prowizją. Realnie w pierwszym roku: 0-5 klientów, czyli 0-1 500 zł/mies. To mieści się w bazowych stawkach z pierwszego przeglądu (0-500 USD/mies.), nie powyżej.

**Hipoteza B (słaba, nie polecam): dodatek "biała lista VAT / NIP / REGON" do Arkuszy Google.**

- Za: w Excelu to płatna kategoria z publicznymi cenami 29-129 zł/mies. ([nip-excel.pl](https://nip-excel.pl/), [AppSource](https://appsource.microsoft.com/en-us/product/office/wa200004723?tab=overview)); w jednym wyszukiwaniu nie znalazłem odpowiednika dla Arkuszy Google.
- Przeciw: dane są darmowe z oficjalnego wykazu Ministerstwa Finansów ([biznes.gov.pl](https://www.biznes.gov.pl/pl/portal/00226)); są darmowe wyszukiwarki ([jpk.info.pl](https://jpk.info.pl/biala-lista-vat/)); są usługi hurtowej weryfikacji ([nip.waw.pl](https://nip.waw.pl/outsourcing-bialej-listy/), [OutreachPilot](https://outreachpilot.pl/blog/biala-lista-vat-jak-sprawdzic-kontrahenta)); w Excelu właśnie wszedł klon za 29 zł. ChatGPT napisze skrypt do arkusza, który pyta oficjalny wykaz, w kilkanaście minut (moje rozumowanie) - to ociera się o Twoją regułę substytucji. Polskie dodatki do Arkuszy, które znalazłem, są darmowe: kursy NBP ([Google Workspace Marketplace](https://workspace.google.com/marketplace/app/nbp_exchange_rates/59261946885)) i KSeF do arkusza ([KSeF InvoSync](https://chromewebstore.google.com/detail/ksef-invosync/pakgkhgeiciagjoiejpglippflmfeopp?hl=pl)).
- Sufit: nie umiem oszacować, bo nie mam żadnej liczby użytkowników. Sądzę, że niski (szacunek).

---

## Konkurencja

Tabela obejmuje hipotezę A oraz graczy, którzy zamykają pozostałe ekosystemy.

| Nazwa | Cena | Trakcja | Słabość | Link |
|---|---|---|---|---|
| **IdoSell Apps - sąsiedzi hipotezy A** | | | | |
| DocsImporter (dokumenty z ERP do zamówień) | nie ustaliłem | nieznana; ogłoszony na blogu IdoSell 5.05.2026 | dotyczy faktur, nie tworzy zamówień | [blog IdoSell](https://www.idosell.com/pl/blog/docsimporter-w-idosell-apps-automatyzacja-obiegu-faktur-miedzy-erp-a-twoim-sklepem-1235328692) |
| Integrator Temu (aplikacja IdoSell) | 99 / 249 / 449 / 849 zł/mies. wg liczby zamówień | nieznana | pokazuje, że platforma sama buduje aplikacje | [blog IdoSell](https://www.idosell.com/pl/blog/integrator-idosell-temu-od-idosell-apps-jak-zautomatyzowac-sprzedaz-na-temu) |
| DropUI, Share Basket | od 49 zł brutto/mies. | nieznana | inne zastosowanie; pokazują dolny poziom cen | [IdoSell Apps](https://www.idosell.com/pl/idosell-apps) |
| Sensbot Email Assistant | nie ustaliłem | nieznana | odpowiada na maile klientów, nie tworzy zamówień | [Sensbot](https://sensbot.ai/pl/idosell-email/) |
| TodayReply | nie ustaliłem | nieznana | helpdesk i czat, nie zamówienia | [TodayReply](https://todayreply.pl/integracje/idosell) |
| **BaseLinker - analityka zysku** | | | | |
| Dashbord | nie znalazłem | nieznana | sprzedaż przez własną stronę | [Dashbord](https://dashbord.pl/integracje/baselinker/) |
| Profigro | plan "Baselinker Pro" 299 zł (opis niejednoznaczny) | nieznana | jak wyżej | [Profigro](https://www.profigro.com/) |
| **Excel - biała lista VAT** | | | | |
| NIP24 (NETCAT) | od 129 zł/mies. | w sklepie Microsoft; liczby ocen nie znalazłem; wersja 1.4.1 z 10.2025 | drogi | [AppSource](https://appsource.microsoft.com/en-us/product/office/wa200004723?tab=overview) |
| VAT Validator | 29 zł/mies. do 50 sprawdzeń; -20% przy płatności rocznej | nowy, w trakcie weryfikacji w sklepie Microsoft | brak historii | [nip-excel.pl](https://nip-excel.pl/) |
| **Chrome - monitoring ogłoszeń OLX/Otodom/Vinted** | | | | |
| Xoler | 20 zł/mies. lub 200 zł/rok | nieznana | zależny od stron portali | [Xoler](https://xoler.app/) |
| Webmon | plan Super 29 zł/mies. | nieznana | jak wyżej | [Webmon](https://www.webmon.pl/) |
| Huntbot | 49 / 99 zł/mies., 14 dni za darmo | nieznana | jak wyżej | [Huntbot](https://huntbot.pl/) |
| Ofertello | od 99 zł, 14 dni za darmo | nieznana | jak wyżej | [Ofertello](https://ofertello.pl/) |
| Redrip (Vinted) | darmowy plan, płatne od 7 EUR/mies. | nieznana | jak wyżej | [Redrip](https://www.redrip.app/en/blog/extension-chrome-vinted-guide-2026/) |
| **Chrome - KSeF** | | | | |
| LepszyKSeF.pl | darmowa wtyczka + płatne plany z chmurą | nieznana | tylko Chrome na komputerze | [LepszyKSeF](https://lepszyksef.pl/) |
| KSeF InvoSync | darmowy, otwarty kod | nieznana | - | [Chrome Web Store](https://chromewebstore.google.com/detail/ksef-invosync/pakgkhgeiciagjoiejpglippflmfeopp?hl=pl) |
| KSeF Monitor, KSeF Invoice Prefill, Pomocnik KSeF | nie ustaliłem | nieznana | - | [Monitor](https://chromewebstore.google.com/detail/ksef-monitor/adfieckbhbajegaomloplmkiimcgamgk), [Prefill](https://chromewebstore.google.com/detail/ksef-invoice-prefill/icidgmjiojifjipeijbdlikbannpancd?hl=pl), [Pomocnik](https://chromeboard.com/extension/pomocnik-ksef-fkcfpooackcnnhahkaoehgoeinedpfii) |
| **WooCommerce - integracja z Allegro (poza WP Desk)** | | | | |
| WP Desk | nie ustaliłem | dominujący producent | - | [WP Desk](https://www.wpdesk.pl/sklep/allegro-woocommerce/) |
| WP Hocus | 399 zł jednorazowo, 365 dni aktualizacji; darmowa wersja do 100 ofert | nieznana | - | [WP Hocus](https://wphocus.com/produkt/woocommerce-allegro-pro-integracja/) |
| Kierownik Sprzedaży | od 790 zł netto jednorazowo | nieznana | - | [Kierownik Sprzedaży](https://kierowniksprzedazy.pl/) |
| **PrestaShop - polscy producenci modułów** | | | | |
| X13, prestahelp, PrestaSoft, presta.design, WePresta, Presta-Mod, modules4presta | zwykle 129-400 zł jednorazowo; WePresta od 1,99 EUR/mies. | nieznana | co najmniej 7 producentów, sprzedaż jednorazowa | [X13](https://x13.pl/moduly-prestashop), [prestahelp](https://prestahelp.com/), [PrestaSoft](https://prestasoft.pl/wszystkie-moduly), [presta.design](https://presta.design/?lang=en), [WePresta](https://wepresta.shop/pl/3-moduly-prestashop), [Presta-Mod](https://presta-mod.pl/pl/23-moduly-prestashop), [modules4presta](https://modules4presta.io/) |

**Dlaczego pozostałe ekosystemy odpadają (krótko):**

- **Allegro:** brak sklepu z aplikacjami, właściciel platformy zaostrza weryfikację aplikacji, a agencje rozdają narzędzia za darmo (pierwszy przegląd). Jedno repozytorium twierdzi, że od sierpnia 2026 weryfikacja nowych aplikacji jest wstrzymana ([GitHub](https://github.com/Kubamastivo/Price-Allegro)) - to jedno nieoficjalne źródło, nie potwierdziłem.
- **BaseLinker:** brak sklepu, więc każdy klient musi przyjść z Twojego Google'a. Łamie Twoją regułę dystrybucji.
- **WooCommerce/PrestaShop:** tłok producentów, sprzedaż jednorazowa (kłóci się z R2 przy stałej potrzebie), brak sklepu z ruchem poza PrestaShop Addons z prowizją 17-40%.
- **Chrome do portali ogłoszeniowych:** co najmniej 6 graczy po 20-99 zł/mies. Narzędzie psuje się przy każdej zmianie strony portalu i działa na granicy regulaminów. Nie jest pasywne.
- **Chrome do KSeF:** co najmniej 5 rozszerzeń, w tym darmowe z otwartym kodem. Paneli bankowych i mObywatela nie badałem i odradzam z zasady: to dane wrażliwe, a odpowiedzialność za błąd jest Twoja (moje rozumowanie).
- **Booksy/Fresha/ZnanyLekarz:** nie ma do czego się podłączyć bez umowy partnerskiej.
- **Dodatki do Subiekta:** katalog jest, ceny są dobre, ale dodatek działa na komputerze klienta z Windows i wymaga płatnego mechanizmu Sfera (ok. 1 045 zł netto za pierwsze stanowisko dla Subiekta GT wg podsumowania wyników dla [malinski.ai](https://malinski.ai/czy-subiekt-ma-api/) i [compusoft](https://www.compusoft.pl/cennik) **[DO POTWIERDZENIA]**; w nexo tylko w wersji PRO). To instalacje u klienta, zdalna pomoc i inna technologia niż Twoja. Nie zmieścisz v1 w 2-3 tygodniach (szacunek).

---

## Najlepszy wariant produktu

Jeśli cokolwiek z tego zwiadu ma przeżyć, to tylko w tej postaci:

- **Dla kogo:** sklepy na IdoSell sprzedające także hurtowo (B2B), które dostają zamówienia e-mailem (treść maila, PDF, Excel) i przepisują je ręcznie do panelu.
- **Co:** aplikacja w IdoSell Apps. Sklep przekazuje maila z zamówieniem na dedykowany adres. Aplikacja odczytuje pozycje, dopasowuje je do katalogu sklepu i tworzy w IdoSell zamówienie do zatwierdzenia przez człowieka. To jest Twój działający silnik z innym miejscem zapisu.
- **Cena (propozycja, szacunek):** demo 5 dokumentów na całe życie konta (R3), potem 149 / 299 / 499 zł netto/mies. zależnie od liczby dokumentów. Mieści się w widełkach katalogu (49-849 zł/mies., linki wyżej). Abonament pasuje do częstotliwości (zamówienia przychodzą co dzień lub co tydzień - R2).
- **Kanał:** wyszukiwarka i kategorie IdoSell Apps, wpis IdoSell o nowej aplikacji na blogu, opiekunowie sklepów IdoSell. Bez Twojej publiczności i bez outboundu.
- **Dlaczego nie ChatGPT:** ChatGPT odczyta jeden PDF, ale nie odbierze poczty sam, nie zna katalogu i cen klienta i nie utworzy zamówienia w IdoSell kilkadziesiąt razy dziennie. Wartością jest integracja i praca bez nadzoru (moje rozumowanie, to samo co w pierwszym przeglądzie dla Shopify).

**Ważne:** to nie jest osobny projekt. To drugi możliwy sklep dla kandydata "PLAR Orders w sklepie platformy". Decyzję Shopify czy IdoSell podejmij po odpowiedzi IdoSell na pytania o warunki.

---

## Ekonomia (z zaznaczeniem szacunkow)

| Pozycja | Wartość | Skąd |
|---|---|---|
| Liczba sklepów IdoSell | 6 145 (pomiar zewnętrzny) do ok. 8 000 (deklaracja firmy) | [StoreLeads](https://storeleads.app/reports/idosell), [blog IdoSell](https://www.idosell.com/pl/blog/idosell-vs-shoper-porownanie-platform-e-commerce-dla-sklepow-gotowych-na-wzrost) |
| Wzrost liczby sklepów | 25% rok do roku w II kw. 2026 | [StoreLeads](https://storeleads.app/reports/idosell) |
| Ceny aplikacji w katalogu | 49 zł brutto/mies. do 849 zł/mies. | [IdoSell Apps](https://www.idosell.com/pl/idosell-apps), [blog IdoSell](https://www.idosell.com/pl/blog/integrator-idosell-temu-od-idosell-apps-jak-zautomatyzowac-sprzedaz-na-temu) |
| Prowizja IdoSell | nieznana; do rachunku przyjmuję 20-30% | **szacunek**, do potwierdzenia mailem |
| Twoja cena | 149 / 299 / 499 zł/mies. | **szacunek** |
| Odsetek sklepów z hurtem i zamówieniami mailem | 5-10% | **szacunek**, bez żadnego źródła |
| Klienci w pierwszym roku | 0-5 | **szacunek** |
| Przychód w pierwszym roku | 0-1 500 zł/mies. przed prowizją | **szacunek** |
| Sufit przy pełnym sukcesie w tej niszy | 3-24 klientów, ok. 600-9 600 zł/mies. przed prowizją | **szacunek** |
| Koszt pozyskania klienta | 0 zł, jeśli katalog i blog IdoSell faktycznie przyprowadzają sklepy; nie wiem, czy tak jest | niezweryfikowane |
| Koszt modelu AI na dokument | grosze do kilkudziesięciu groszy | **szacunek**; znasz to lepiej z produkcji u dystrybutora kawy |
| Hosting | ok. 0 EUR/mies. na Twoim zestawie | Twoje dane |

Wniosek: to jest mały biznes nawet w dobrym scenariuszu. Jedynym powodem, żeby go rozważać, jest to, że silnik już masz, więc koszt wejścia jest niski.

---

## Zakres budowy i pasywnosc

**Zakres v1 (szacunek 2-3 tygodnie z agentem, plus nieznany czas weryfikacji przez IdoSell):**

1. Połączenie z API administracyjnym IdoSell: pobranie katalogu produktów i klientów, utworzenie zamówienia. Tworzenie zamówień przez API potwierdzają tylko biblioteki firm trzecich ([Packagist](https://root.packagist.org/packages/beziworld/laravel-idosell)) - sprawdź w oficjalnej dokumentacji, zanim cokolwiek zaplanujesz.
2. Adres e-mail do przekazywania zamówień (Cloudflare).
3. Dopasowanie pozycji z dokumentu do produktów sklepu i ekran "zatwierdź / popraw".
4. Wpięcie w mechanizm instalacji i rozliczeń IdoSell Apps. Jak to działa technicznie - nie wiem, dokumentacji publicznej nie znalazłem.
5. Instrukcja instalacji po polsku (inni twórcy publikują takie przewodniki, np. [EasyProtect](https://easyprotect.pl/wp-content/uploads/2025/02/IdoSellApps-przewodnik.pdf)).

**Czego nie budować w v1:** cenników indywidualnych klienta, obsługi wielu magazynów, integracji z ERP.

**Pasywność (szacunek):** 2-4 h/tydz. przy kilkunastu klientach. Praca pochodzi z błędnie odczytanych dokumentów, pytań przy instalacji i zmian w API IdoSell. Ekran zatwierdzania ogranicza skutki błędów. Wsparcie po polsku, w godzinach pracy. Nie ma tu doradztwa regulowanego ani dyżurów całodobowych.

---

## Ryzyka

Od największego:

1. **Brak dowodu popytu.** To dokładnie ten błąd, który zabił disclosekit: produkt bez sprawdzonej chęci zapłaty. Nie mam ani jednej prośby użytkownika, ani jednej liczby wyszukiwań, ani jednego płatnego konkurenta w IdoSell.
2. **Zamówienia hurtowe mogą w ogóle nie trafiać do panelu sklepu.** Hurtownie często wprowadzają zamówienia mailowe do programu magazynowego (Subiekt, Optima), nie do sklepu. Jeśli tak jest u większości sklepów IdoSell, aplikacja celuje w złe miejsce (moje rozumowanie, niezweryfikowane).
3. **Nieznane warunki wejścia.** Prowizja, wymagania, czas weryfikacji, a nawet to, czy IdoSell przyjmie jednoosobową spółkę - wszystko do ustalenia. IdoSell może po prostu nie odpisać.
4. **Mała baza.** 6-8 tys. sklepów to twardy sufit. Nawet świetna aplikacja to kilkanaście-kilkadziesiąt klientów (szacunek).
5. **Nieznany ruch w katalogu.** Nie wiem, czy sklepy same przeglądają IdoSell Apps. Jeśli aplikacje sprzedają się głównie przez opiekunów i agencje wdrożeniowe, to bez relacji z nimi nikt Cię nie znajdzie.
6. **Platforma jako konkurent.** IdoSell buduje własne aplikacje do katalogu i dodaje funkcje AI. Dobrą niszę może zająć sam.
7. **Wsparcie.** Sklepy IdoSell są większe i bardziej wymagające. Błąd w zamówieniu hurtowym to realne pieniądze klienta.

---

## Najtanszy test checi zaplaty (R1) z progami

**Etap 1 - 0 zł, ok. 3 godziny pracy, czekanie do 10 dni roboczych.**

1. Napisz na developers@idosell.com (adres z [IdoSell Apps](https://www.idosell.com/pl/idosell-apps)) sześć pytań: jaka jest prowizja; jak wygląda weryfikacja i ile trwa; czy przyjmują jednoosobową spółkę bez statusu partnera wdrożeniowego; czy twórca widzi liczbę instalacji; ile sklepów miesięcznie instaluje typową płatną aplikację; czy sklepy zgłaszały potrzebę wprowadzania zamówień z e-maili/PDF.
2. Przejrzyj katalog IdoSell Apps ręcznie (1 godzina). Zapisz: ile jest aplikacji, czy widać oceny albo liczbę instalacji, czy cokolwiek dotyczy zamówień z maila, PDF, importu zamówień, B2B.
3. Otwórz oficjalną dokumentację API IdoSell i sprawdź, czy da się utworzyć zamówienie z przypisaniem do klienta hurtowego.

**Próg przejścia etapu 1:** odpowiedź w 10 dni roboczych ORAZ prowizja najwyżej 30% ORAZ brak obowiązkowego płatnego programu partnerskiego ORAZ brak bezpośredniego konkurenta w katalogu ORAZ tworzenie zamówień przez API potwierdzone.
**Zabij, jeśli:** brak odpowiedzi, prowizja powyżej 30%, wymóg certyfikacji lub wdrożeń, albo w katalogu jest już taka aplikacja.

**Etap 2 - do 150 EUR, 2-3 tygodnie. Tylko po zaliczeniu etapu 1.**

1. Najpierw Planer słów kluczowych (lista niżej). Jeśli frazy związane z IdoSell i zamówieniami z maila dają łącznie poniżej ok. 100 wyszukiwań miesięcznie, test reklamowy nie ma sensu - wtedy jedynym dowodem popytu pozostaje odpowiedź IdoSell na pytanie, czy sklepy o to proszą. Bez takiego potwierdzenia **nie buduj** (R4 niespełnione).
2. Jeśli wolumen jest: strona po polsku "Zamówienia z e-maila i PDF trafiają same do IdoSell" z przyciskiem Stripe "Pilot: 199 zł za pierwszy miesiąc, zwrot, jeśli nie uruchomimy w 30 dni" i Google Ads na frazy w dopasowaniu ścisłym.

**Próg przejścia etapu 2:** co najmniej 3 opłacone pilotaże od sklepów na IdoSell.
**Zabij, jeśli:** mniej niż 2 opłacone pilotaże po wydaniu 150 EUR albo po 200 kliknięciach (co nastąpi pierwsze).
**Strefa pośrednia (dokładnie 2 opłacone):** jedno przedłużenie o 50 EUR, potem decyzja.

Kod łącznika do IdoSell piszesz dopiero po etapie 2.

---

## Frazy do sprawdzenia w Planerze slow kluczowych

Ustaw: Polska, język polski, dopasowanie ścisłe. Nie znam wolumenu żadnej z tych fraz.

Hipoteza A (IdoSell + zamówienia z maila):

- idosell apps
- aplikacje idosell
- idosell integracje
- idosell b2b
- idosell hurt
- import zamówień idosell
- idosell api zamówienia
- zamówienia z maila automatycznie
- automatyczne wprowadzanie zamówień
- zamówienia z pdf do systemu
- ocr zamówień
- program do zamówień hurtowych
- przepisywanie zamówień z maila

Kontrolnie, dla odrzuconych tropów (żeby potwierdzić albo podważyć moje odrzucenie):

- biała lista vat excel
- sprawdzanie nip excel
- hurtowe sprawdzanie nip
- dodatek do excela biała lista
- biała lista vat arkusze google
- baselinker marża
- baselinker raport zysku
- zysk na allegro kalkulator
- dodatki do subiekta gt
- import zamówień do subiekta

Przypomnienie reguły R4: fraza zakupowa co najmniej 1 000/mies. albo co najmniej 3 warianty po 100/mies., i co najmniej 3 strony sprzedażowe w pierwszej dziesiątce wyników.

---

## Otwarte pytania

1. Jaka jest prowizja IdoSell Apps, jak wygląda weryfikacja i czy przyjmują jednoosobową spółkę? (Do ustalenia mailem.)
2. Czy katalog IdoSell Apps pokazuje liczbę instalacji lub oceny i czy sklepy faktycznie go przeglądają? Ostatnie wyszukiwanie w tej sprawie zostało odrzucone przez limit.
3. Ile sklepów IdoSell prowadzi sprzedaż hurtową i dostaje zamówienia mailem? Nie znalazłem żadnej liczby.
4. Czy zamówienia hurtowe trafiają do panelu IdoSell, czy do programu magazynowego?
5. Czy API IdoSell pozwala tworzyć zamówienia z cennikiem hurtowym? (Tylko źródła firm trzecich.)
6. Czy Allegro rzeczywiście wstrzymało weryfikację nowych aplikacji od sierpnia 2026? (Jedno nieoficjalne źródło.)
7. Czy Comarch ma katalog dodatków firm trzecich do Optimy? (Jedno wyszukiwanie, bez wyniku.)
8. Ile ocen ma dodatek NIP24 w sklepie Microsoft? (Nie było w wynikach.)
9. Nadal otwarte z pierwszego przeglądu i poza moim zakresem: prowizja Shoper App Store.
10. Nie zbadane w ogóle z braku budżetu: rozszerzenia do paneli bankowych, mObywatela i e-Urzędu Skarbowego (odradzam z zasady), dodatki do wFirma/inFakt poza jednym ogólnym wyszukiwaniem.

---

## Zrodla

IdoSell:

- https://www.idosell.com/pl/idosell-apps
- https://www.idosell.com/pl/dla-developerow/
- https://www.idosell.com/pl/blog/idosell-apps-innowacyjna-platforma-z-aplikacjami-dla-sklepu-internetowego-1235328307
- https://www.idosell.com/pl/blog/odkryj-idosell-apps-innowacyjna-platforme-z-aplikacjami-dla-sklepu-internetowego-i-dla-deweloperow-webinar-1235328313
- https://www.isbtech.pl/2024/11/idosell-apps-aplikacje-do-rozwoju-sklepu-internetowego-w-jednym-miejscu/ (źródło z 2024 r.)
- https://www.idosell.com/pl/blog/integrator-idosell-temu-od-idosell-apps-jak-zautomatyzowac-sprzedaz-na-temu
- https://www.idosell.com/pl/blog/kategoria/zmiany-produktowe/narzedzia-i-aplikacje
- https://www.idosell.com/pl/blog/kategoria/zmiany-produktowe
- https://www.idosell.com/pl/blog/docsimporter-w-idosell-apps-automatyzacja-obiegu-faktur-miedzy-erp-a-twoim-sklepem-1235328692
- https://www.idosell.com/pl/blog/zmiany-bridge-dostepny-w-idosell-apps-z-licencjonowaniem-dla-wybranego-systemu-erp-1235328454
- https://www.idosell.com/pl/blog/idosell-vs-shoper-porownanie-platform-e-commerce-dla-sklepow-gotowych-na-wzrost
- https://easyprotect.pl/wp-content/uploads/2025/02/IdoSellApps-przewodnik.pdf
- https://traffictrends.pl/blog/panel-idosell-kompletny-przewodnik-po-panelu-administracyjnym-idosell-cz3
- https://storeleads.app/reports/idosell
- https://shoprank.com/ecommerce-platforms/idosell-shop
- https://root.packagist.org/packages/beziworld/laravel-idosell
- https://github.com/ltung7/idosell
- https://sensbot.ai/pl/idosell-email/
- https://todayreply.pl/integracje/idosell
- https://redai.pl/wiedza/integracja-ai-z-idosell-zamowienia-wielokanalowe-zwroty-i-stany-magazynowe-w-jednym-asystencie

Allegro:

- https://allegro.pl/advertising/agencje-partnerskie
- https://github.com/allegro/allegro-api/issues/14338
- https://github.com/allegro/allegro-api/issues/13126
- https://github.com/allegro/allegro-api/issues/13949
- https://github.com/allegro/allegro-api/issues/14083
- https://github.com/allegro/allegro-api/issues/14126
- https://github.com/Kubamastivo/Price-Allegro
- https://www.shopgold.pl/wymogi-allegro-rest-api-dotyczacych-identyfikacji-aplikacji-n-407.html
- https://artursmolicki.com/ranking-narzedzi-dla-sprzedawcow-allegro/

BaseLinker / Base.com:

- https://dashbord.pl/integracje/baselinker/
- https://www.profigro.com/
- https://yasecure.pl/liczenie-zysku-ze-sprzedazy-na-allegro-w-oparciu-o-baselinkera/
- https://matuszczak.pro/jak-laczyc-dane-allegro-z-google-analytics-i-baselinker
- https://matuszczak.pro/ile-kosztuje-baselinker-cennik-plany
- https://openlinker.io/pl/blog/baselinker-cennik-2026/
- https://codecollab.pl/en/blog/baselinker-api-automation/

WooCommerce / PrestaShop:

- https://www.wpdesk.pl/sklep/allegro-woocommerce/
- https://wphocus.com/produkt/woocommerce-allegro-pro-integracja/
- https://kierowniksprzedazy.pl/
- https://x13.pl/moduly-prestashop
- https://prestahelp.com/
- https://prestasoft.pl/wszystkie-moduly
- https://presta.design/?lang=en
- https://wepresta.shop/pl/3-moduly-prestashop
- https://presta-mod.pl/pl/23-moduly-prestashop
- https://modules4presta.io/
- https://www.ibif.pl/blog/sklepy-internetowe/ile-kosztuje-sklep-internetowy-prestashop-sprawdz-co-wplywa-na-jego-cene

Rozszerzenia Chrome:

- https://xoler.app/
- https://www.webmon.pl/
- https://huntbot.pl/
- https://ofertello.pl/
- https://notifi.click/
- https://wykop.pl/link/7782619/auctionmate-rozszerzenie-ktore-ogarnia-chaos-na-olx-allegro-itp
- https://www.redrip.app/en/blog/extension-chrome-vinted-guide-2026/
- https://lepszyksef.pl/
- https://chromewebstore.google.com/detail/ksef-monitor/adfieckbhbajegaomloplmkiimcgamgk
- https://chromewebstore.google.com/detail/ksef-invosync/pakgkhgeiciagjoiejpglippflmfeopp?hl=pl
- https://chromewebstore.google.com/detail/ksef-invoice-prefill/icidgmjiojifjipeijbdlikbannpancd?hl=pl
- https://chromeboard.com/extension/pomocnik-ksef-fkcfpooackcnnhahkaoehgoeinedpfii
- https://github.com/PrezmoZnafca/ksef

Excel / Arkusze Google:

- https://appsource.microsoft.com/en-us/product/office/wa200004723?tab=overview
- https://nip24.pl/en/download/dodatek-add-in-do-excel/
- https://nip-excel.pl/
- https://apps.jordan.pl/kursy-walut-excel/
- https://workspace.google.com/marketplace/app/nbp_exchange_rates/59261946885
- https://www.biznes.gov.pl/pl/portal/00226
- https://jpk.info.pl/biala-lista-vat/
- https://nip.waw.pl/outsourcing-bialej-listy/
- https://outreachpilot.pl/blog/biala-lista-vat-jak-sprawdzic-kontrahenta

Booksy / Fresha / ZnanyLekarz:

- https://supergood.ai/api-report-card/booksy
- https://supergood.ai/docs/booksy-api
- https://supergood.ai/api-report-card/fresha
- https://integrations.docplanner.com/docs/

Programy księgowe:

- https://www.insert.com.pl/dla_uzytkownikow/subiekt_gt/dodatki_rozszerzenia/rozwiazania_partnerskie.html
- https://www.insert.com.pl/dla_uzytkownikow/rozwiazania_partnerskie.html?query=indywidualne+ceny
- https://www.artoit.pl/dodatki_insert.html
- https://malinski.ai/czy-subiekt-ma-api/
- https://www.compusoft.pl/cennik
- https://devesol.pl/integracja-subiekt-gt-i-nexo-z-innymi-systemami/
- https://agencja.kasima.pl/partnerzy/fakturownia
- https://navyflame.com/baza-wiedzy/porownanie-systemow-fakturowych
- https://sklep-optima.pl/pl/cms/cennik-comarch-erp-optima-2026-cena-chmura-i-subskrypcja-32

Kontekst z pierwszego przeglądu: `/home/user/disclosekit-RIP/project-2/research/01-sweep/marketplace-apps.md`
