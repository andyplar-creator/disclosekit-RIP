# Soczewka: agent-economy (produkty dla "gospodarki agentów AI")

Stan na: 2026-11-26. Zakres: płatne serwery MCP, API/dane za paywallem x402, pluginy i skille do Claude Code, narzędzia dla agentów (kontrola kosztów, akceptacje, audyt).

**Jak czytać oznaczenia**

- **[liczba]** - twarda liczba, zawsze z linkiem do miejsca, gdzie ją widziałem.
- **[obserwacja]** - fakt jakościowy z linkiem.
- **[wniosek]** - moje rozumowanie, bez źródła.
- **szacunek** - moja ocena liczbowa, NIE dana ze źródła.

**Ważne zastrzeżenia do całego dokumentu**

1. Pracowałem wyłącznie na wynikach wyszukiwarki (streszczenie + link). Otwieranie stron było zablokowane, więc liczby pochodzą ze streszczeń wyników, a nie z samodzielnie przeczytanych stron. Przed decyzją za pieniądze otwórz 3-4 kluczowe źródła samodzielnie (wskazuję które).
2. Wspólny limit wyszukiwań skończył się po 20 zapytaniach (planowałem 25-30). Cztery ostatnie zapytania się nie wykonały. Lista rzeczy niesprawdzonych jest w sekcji "Czego nie udało się sprawdzić".
3. Wiele źródeł o x402 to blogi niskiej jakości, część pisana przez AI. Źródła pierwotne, którym ufam najbardziej: TRM Labs, Chainalysis, strony Apify, TrustMRR, relacje pierwszoosobowe na dev.to.

---

## Werdykt

**Nie polecam tej soczewki jako głównego projektu na najbliższe 3-6 miesięcy.** Przeżył jeden kandydat, warunkowo i z niską pewnością (sklep Apify). Wszystko, co wprost wykorzystuje x402 albo "płatne serwery MCP", odpada na bramce R4: pieniędzy od agentów jest tam dziś za mało, żeby solo founder bez publiczności cokolwiek zarobił.

Trzy zdania, które streszczają cały research:

1. **Agenci prawie nie płacą sami.** Po odfiltrowaniu testów i sztucznego ruchu realne wydatki agentów w x402 to według TRM Labs ok. 5 000-11 000 USD miesięcznie na CAŁY ekosystem [liczba, [TRM Labs](https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain)].
2. **Prawdziwe pieniądze "od agentów" płyną starą drogą**: klucz API + karta/Stripe, do znanych dostawców danych. Szef Apify powiedział to wprost w październiku 2026: Apify, Exa, Perplexity i podobni zarabiają razem "znacznie ponad 1 mln USD miesięcznie" na agentach, ale przez klucze API, a nie przez to, że agent sam znajduje i opłaca usługę [obserwacja, [IAM Insights](https://insights.bostonidentity.com/research/ai-engineer-worlds-fair-2026-10-18-ai-agents-still-won), [BigGo](https://finance.biggo.com/news/63f41820354173bb)].
3. **Jedyny rynek w tej soczewce z udokumentowanymi wypłatami dla małych twórców to Apify Store**, ale rozkład jest skrajnie nierówny i nisze (także polskie) są już zalane klonami pisanymi przez AI.

Twoje know-how z x402 i Agent Spend Governance jest dziś warte więcej jako **wiarygodność w consultingu i materiał na treści** niż jako produkt. To nie jest porażka tej wiedzy - po prostu rynek, który miałaby obsługiwać, jeszcze nie istnieje w skali pozwalającej zarabiać. [wniosek]

### Gdzie dziś są prawdziwe pieniądze (dowody)

**x402 - skala po odfiltrowaniu szumu**

- Dashboard x402.org pokazywał ok. 24,24 mln USD w 30 dni; Artemis po odfiltrowaniu wash tradingu: ok. 1,6 mln USD [liczba, [StartupHub](https://www.startuphub.ai/ai-news/startup-news/2026/x402-payments-the-real-numbers), [Startup Fortune](https://startupfortune.com/ai-agents-have-moved-over-200-million-payments-on-x402-but-half-may-be-fake/)].
- TRM Labs: 52,7 mln USD w 198,9 mln transakcji od maja 2025; po filtrach "prawdziwy handel" ok. 25,6 mln USD, z czego na agentów przypada 0,6%-7,5%, czyli ok. 5-11 tys. USD miesięcznie [liczba, [TRM Labs](https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain), omówienie: [Spoted Crypto](https://www.spotedcrypto.com/trm-labs-x402-ai-agent-payments-report-2026/)].
- Analiza Visa + Artemis (dane do 21.04.2026): z ok. 135,7 mln USD surowego wolumenu zostaje ok. 15,0 mln USD; 89% wartości i 39% transakcji uznane za wash/test/przelewy wewnętrzne [liczba z opracowań wtórnych: [minia2a.uk](https://minia2a.uk/blog/x402-real-volume-wash-trading-august-2026), [CURB](https://curb.numetal.xyz/dispatch/x402-economy-july-2026) - nie potwierdziłem w raporcie pierwotnym].
- Chainalysis: ponad 100 mln transakcji na Base, ale duża część wzrostu to farmienie memecoinów [obserwacja, [Chainalysis](https://www.chainalysis.com/blog/x402-agentic-payments-adoption/)].
- Listopad 2026 (Hedwig AI): cały x402 to 1,77 mln USD w 30 dni przy 4,72 mln płatności. 44 sprzedawców mających co najmniej 10 kupujących zebrało razem 0,84 mln USD. Dla porównania 81 startupów z top-100 TrustMRR zebrało przez Stripe ok. 12,89 mln USD w 30 dni, czyli ok. 7 razy więcej niż cały x402 [liczba, [Hedwig AI](https://www.hedwigai.com/blog/stripe-and-x402-revenue)].
- Po wyłączeniu jednego portfela (ok. 719 tys. USD) tylko 15 usług wzięło co najmniej 1 000 USD w 30 dni [liczba, [Hedwig AI](https://www.hedwigai.com/blog/stripe-and-x402-revenue)]. Katalog SwarmBazaar liczył 1 054 aktywnych sprzedawców (zrzut z 31.08.2026) [liczba, [SwarmBazaar](https://swarmbazaar.com/sellers.html)]. Czyli ok. 1-2% sprzedawców zarabia 1 000 USD/mies. lub więcej (szacunek - łączę dwa źródła z różnych dat).
- Za co agenci płacą: na szczycie rankingów jest inferencja LLM (kategoria ok. 60 tys. USD/30 dni) oraz infrastruktura typu Meridian (ok. 56 tys.), ax1.vc i Console (po ok. 35 tys.), dTelecom (ok. 23 tys.) [liczba, [402radar](https://402radar.io/stats)]. dTelecom: 36 672 USD od 29 kupujących [liczba, [Hedwig AI](https://www.hedwigai.com/blog/stripe-and-x402-revenue)]. To firmy infrastrukturalne, nie jednoosobowe "opakowania danych".
- Solo deweloperzy w x402, relacje własne: łącznie 0,330 USD z 46 rozliczeń od 1 kupującego [liczba, [GitHub manteclaw](https://github.com/manteclaw/x402-earnings-digest)]; "pierwszy zewnętrzny płatnik: 0,058 USD" [liczba, [dev.to](https://dev.to/coachhype/how-i-got-my-first-outside-x402-payer-0058-in-usdc-on-base-3hjf)].
- Stripe MPP (konkurencyjna szyna płatności agentów): ok. 1 500 USD wolumenu w 30 dni wobec ok. 1 mln USD w x402 - liczby podane przez Jana Curna (Apify) na AI Engineer World's Fair, październik 2026 [liczba, [BigGo](https://finance.biggo.com/news/63f41820354173bb), [ai.engineer](https://ai.engineer/talks/h6mi88VrPtQ-x402-isnt-good-yet)].

**Płatne serwery MCP i marketplace'y MCP**

- MCPize obiecuje twórcom 80% przychodu i podaje własne case study: 45 subskrybentów = ok. 324 USD/mies., 120 subskrybentów = ok. 1 824 USD/mies. [liczba, ale to materiał sprzedawcy: [MCPize blog](https://mcpize.com/blog/monetize-mcp-server)]. Nie znalazłem żadnej niezależnie potwierdzonej liczby płacących użytkowników; recenzent zwraca uwagę na znikomą obecność projektu (36 obserwujących na GitHubie) [obserwacja, [ScoutForge](https://scoutforge.net/apps/mcpize)].
- Historie typu "10 000 USD MRR w 6 tygodni" (21st.dev Magic MCP) to niezweryfikowane deklaracje założycieli powtarzane w poradnikach [obserwacja, [dev.to](https://dev.to/whoffagents/pricing-an-mcp-server-in-2026-why-we-charge-19mo-when-the-market-average-is-0-nig), [a8gent](https://a8gent.com/blog/sell-mcp-servers-monetize-guide)].
- Najpewniejsze pieniądze w MCP to budowa na zamówienie: 8 000-50 000+ USD za projekt [liczba z poradnika agencyjnego, [Godberry Studios](https://godberrystudios.com/posts/how-to-monetize-mcp-servers-2026/)]. To praca usługowa, czyli Twoja praca dzienna, a nie dochód pasywny.

**Marketplace'y Anthropic i OpenAI**

- Claude Marketplace wystartował 23.09.2026 z ponad 2 000 konektorów i pluginów; portal zgłoszeń otwarto 25.09.2026 dla kont płatnych. W ogłoszeniu, regulaminie i dokumentacji nie ma cen, podziału przychodu ani wypłat dla twórców [obserwacja, [dsebastien.net](https://www.dsebastien.net/2026-10-04-claude-marketplace-anthropic-is-building-the-distribution-layer/), [max.nardit.com](https://max.nardit.com/articles/claude-plugin-directory-explained), [Neomanex](https://neomanex.com/news/claude-marketplace-live-plugin-submission-portal-mcp-2)]. Uwaga: to blogi wtórne, nie komunikat Anthropic.
- Marketplace pluginów Claude Code to technicznie plik JSON w repozytorium Git; nie ma w nim żadnego mechanizmu ceny [obserwacja, [PromptReceipts](https://www.promptreceipts.com/blog/claude-code-plugin-marketplace-no-price-2026)].
- ChatGPT apps: OpenAI nie opublikował działającego modelu zarabiania dla twórców; Instant Checkout został w marcu 2026 ograniczony (sprzedawcy wracają do własnych checkoutów) i nie znalazłem dowodu, że działa w Europie [obserwacja, [checkout.com](https://www.checkout.com/blog/openai-agentic-commerce-shift), [The Hack Academy](https://www.thehackacademy.com/agentic-commerce-protocol-partner-checkout.htm)].

**Zestawy/skille do Claude Code sprzedawane bezpośrednio**

- ClaudeKit (zestaw agentów i skilli do Claude Code, Wietnam): 83 281 USD przychodu łącznie, ale tylko 1 852 USD w ostatnich 30 dniach i 28 USD MRR, stan na 13.11.2026 [liczba, [TrustMRR](https://trustmrr.com/startup/claudekit)]. Inna strona podaje dla tej samej nazwy 16 tys. USD miesięcznie - źródła się nie zgadzają [obserwacja, [Surgent](https://surgent.dev/inspirations/claudekit)]. Wniosek: da się na tym zarobić jednorazową falę sprzedaży, ale sprzedaż opada i wymaga własnej publiczności. [wniosek]

**Apify Store - jedyne miejsce z udokumentowanymi wypłatami**

- Wypłaty dla niezależnych twórców: 563 000 USD we wrześniu 2025 [liczba, [komunikat Apify](https://natlawreview.com/press-releases/apify-bets-1m-independent-developers-building-ais-missing-tools)], 760 000 USD w styczniu 2026 [liczba, [Prague Daily Reporter](https://praguedailyreporter.com/article/893752914-apify-store-pays-out-760-000-to-developers-in-january-as-g2-ranks-it-a-top-10-software-product)], 1,7 mln USD w październiku 2026 [liczba, [aiagents.org.uk](https://aiagents.org.uk/apify-store-review/) powołujące się na stronę Apify].
- Strona partnerska Apify (bez daty): 2 mln USD miesięcznie, 7 500 twórców, 133 512 narzędzi [liczba, [Apify](https://apify.com/partners/actor-developers)]. 1,7 mln / 7 500 = ok. 227 USD średnio na twórcę miesięcznie (szacunek - dzielę liczby z różnych dat; średnia, nie mediana).
- Inne wyliczenie średniej: ok. 470 USD na twórcę miesięcznie (1,4 mln USD / ok. 3 000 twórców) [liczba, [AgentByline](https://agentbyline.com/articles/apify-actor-passive-income-what-really-earns-in-2026-67lcfr)].
- Najuczciwsza relacja, jaką znalazłem: deweloper z ok. 22 narzędziami zarobił 622 USD zysku w ok. 12 tygodni (19.08-13.11.2026). 12 narzędzi zarobiło dokładnie 0,00 USD; tylko 4 z 22 kiedykolwiek przekroczyły 10 USD w miesiącu; w listopadzie jedno narzędzie (scraper Google Ads) dało 97% zysku; płacących użytkowników miał 5-7 [liczba, [dev.to fade97](https://dev.to/fade97/three-months-of-selling-scrapers-on-the-apify-store-with-the-real-numbers-5fd0)]. To ok. 200-225 USD miesięcznie (szacunek z jego liczb).
- Inne relacje: 13 koreańskich scraperów - ok. 80-90 USD przychodu z 6 658 uruchomień i 75 użytkowników po 9 dniach [liczba, [Indie Hackers](https://www.indiehackers.com/post/from-0-to-80-in-9-days-what-i-learned-building-korean-data-apis-on-apify-b21e776df9)]; 11 scraperów chińskich platform w 8 dni - pierwsze 4 USD [liczba, [dev.to silkline](https://dev.to/silkline/11-scrapers-for-chinese-platforms-in-8-days-and-my-first-4-28bk)]; "4 scrapery w jeden dzień z Claude, dzień 3: zero użytkowników" [obserwacja, [Indie Hackers](https://www.indiehackers.com/post/i-built-4-apify-scrapers-in-a-day-with-claude-day-3-no-real-users-yet-heres-what-i-m-doing-about-it-3af12de827)].
- Apify deklaruje, że najlepsi twórcy zarabiają ponad 10 000 USD miesięcznie, a "wielu" ponad 1 000 USD - bez nazwisk i liczb [obserwacja, [Apify Help](https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store)].
- Zalew: 114 249 publicznych narzędzi 11.11.2026 [liczba, [DroidCrunch](https://droidcrunch.com/apify-review/)].

### Co mogłoby zmienić ten werdykt (sygnały do obserwowania raz na kwartał)

- Anthropic lub OpenAI ogłaszają płatności albo podział przychodu dla twórców w swoich marketplace'ach. Dziś tego nie ma.
- W rankingach x402 (x402scan, 402radar) pojawiają się jednoosobowe usługi danych z co najmniej 1 000 USD/mies. od co najmniej 10 różnych kupujących.
- Kolejny raport typu TRM pokazuje realne wydatki agentów co najmniej 100 razy wyższe niż dzisiejsze 5-11 tys. USD/mies.

---

## Kandydaci

### 1. (warunkowo, niska pewność) Mini-portfel narzędzi w Apify Store oparty o oficjalne API i dane publiczne, wystawiony także jako MCP

Nie jest to pomysł, który polecam jako projekt główny. To jedyny pomysł z tej soczewki, który formalnie przechodzi Twoje reguły, więc opisuję go uczciwie razem ze słabą ekonomią.

- **Dla kogo:** deweloperzy, agencje lead-gen i marketingowe, analitycy danych oraz ich agenci AI, którzy już mają konto i środki w Apify. Kupujący są globalni, nie polscy.
- **Problem:** potrzebują gotowego, działającego źródła ustrukturyzowanych danych (JSON) z konkretnego serwisu lub rejestru, bez pisania i utrzymywania własnego kodu.
- **Jak często:** zrywami (bursty) - jednorazowe pobrania albo cykliczne zadania co dzień/tydzień.
- **Cena:** pay-per-event, czyli opłata za wynik. Punkt odniesienia z rynku: 0,90-3,00 USD za 1 000 wyników (patrz konkurencja). Apify zatrzymuje 20%, twórca dostaje resztę minus koszty uruchomień [obserwacja, [aiagents.org.uk](https://aiagents.org.uk/apify-store-review/)]. Model wynajmu (abonament) został wygaszony 1.10.2026 [obserwacja, [AgentByline](https://agentbyline.com/articles/apify-actor-passive-income-what-really-earns-in-2026-67lcfr)]. To jest zgodne z R2: użycie zrywami = opłata za użycie.
- **Kanał dystrybucji:** wyszukiwarka sklepu Apify plus strony, które Apify generuje automatycznie dla każdego narzędzia (osobne podstrony API, Python, JavaScript, MCP) i które pojawiają się w Google - widziałem je w wynikach wyszukiwania, np. [przykład podstrony MCP](https://apify.com/samdhitosaja/krs-ceidg-pl-poland-company-registry-scraper/api/mcp) [obserwacja]. Nie wymaga Twojej publiczności ani outboundu.
- **Konkurencja i ceny (to są zarazem dowody zalania rynku):**
  - Allegro: co najmniej 4 narzędzia ([studio-amba](https://apify.com/studio-amba/allegro-scraper), [piotrv1001](https://apify.com/piotrv1001/allegro-listings-scraper), [automation-lab](https://apify.com/automation-lab/allegro-scraper) i inne) [obserwacja].
  - OLX: 0,90 USD/1 000 wyników ([123webdata](https://apify.com/123webdata/olx-scraper)); inny za 2 USD/1 000 [liczba ze streszczenia wyników].
  - Otodom: około tuzina narzędzi; ceny 0,95-2,00 USD/1 000, np. 1,50 USD/1 000 ([yugenox](https://apify.com/yugenox/otodom-scraper)) [liczba].
  - KRS/REGON/CEIDG: co najmniej 8 narzędzi; np. 3,00 USD za 1 000 firm ([samdhitosaja](https://apify.com/samdhitosaja/krs-ceidg-pl-poland-company-registry-scraper/api)), a także [trev0n CEIDG](https://apify.com/trev0n/ceidg-scraper), [trev0n REGON](https://apify.com/trev0n/regon-scraper), [regdata](https://apify.com/regdata/polish-regon-scraper/api), [aurenic](https://apify.com/aurenic/poland-krs-scraper/api), [eudatalab](https://apify.com/eudatalab/krs-pl-scraper/api), [snappytools](https://apify.com/snappytools/krs-poland-company-scraper/api) [obserwacja].
  - Nawet tak wąska nisza jak dane z TrustMRR ma co najmniej 6 klonów [obserwacja, np. [memo23](https://apify.com/memo23/trustmrr-scraper/api/mcp), [yugenox](https://apify.com/yugenox/trustmrr-scraper/api/mcp), [hipersoft](https://apify.com/hipersoft/trustmrr-scraper/api/mcp)].
  - Wniosek: **"polska przewaga językowa" w Apify już nie istnieje** - oczywiste polskie źródła są obsadzone. [wniosek]
- **Dowody popytu z linkami:** wypłaty platformy 1,7 mln USD w październiku 2026 ([źródło](https://aiagents.org.uk/apify-store-review/)); relacja twórcy z 622 USD zysku w 12 tygodni ([źródło](https://dev.to/fade97/three-months-of-selling-scrapers-on-the-apify-store-with-the-real-numbers-5fd0)); 75 użytkowników w 9 dni na nowych koreańskich scraperach ([źródło](https://www.indiehackers.com/post/from-0-to-80-in-9-days-what-i-learned-building-korean-data-apis-on-apify-b21e776df9)). Popyt na poziomie platformy jest prawdziwy. Popyt w konkretnej niszy trzeba sprawdzić przed budową (patrz ocena R4).
- **Dlaczego nie ChatGPT:** ChatGPT/Claude nie pobierze hurtowo, cyklicznie i w stałym formacie tysięcy rekordów z serwisu ani nie wystawi tego jako API dla innego programu. Kupujący płaci za automat działający bez nadzoru i za integrację, nie za jednorazową odpowiedź. Ta odpowiedź NIE działa dla prostych przekształceń tekstu (np. "wyciągnij zamówienie z maila") - tam LLM wystarcza. [wniosek]
- **Ryzyko:**
  1. Ekonomia. Przy cenach 1-3 USD za 1 000 wyników, żeby zarobić 100 USD "na rękę", trzeba sprzedać ok. 42 000-125 000 wyników miesięcznie (szacunek: 100 USD / 0,8 = 125 USD przychodu, przed kosztami uruchomień). Realistyczny wynik po 3 miesiącach: 50-300 USD/mies. przy 5-8 narzędziach, z małą szansą na jedno narzędzie-hit (szacunek oparty na relacji fade97).
  2. Klony. Każda nisza, która zaczyna zarabiać, w ciągu tygodni dostaje tańsze kopie. [wniosek z obserwacji powyżej]
  3. Pasywność. Scrapery stron psują się przy każdej zmianie serwisu; zgłoszenia użytkowników są publiczne. Dlatego warunek: tylko źródła z oficjalnym API lub otwartymi danymi. [wniosek]
  4. Prawo. Zbieranie danych osobowych przez polską spółkę to ryzyko RODO. Z pamięci: UODO ukarał w 2019 r. firmę Bisnode za przetwarzanie danych pobranych z publicznych rejestrów bez informowania osób - NIE zweryfikowałem tego w tym przebiegu, sprawdź przed decyzją. Warunek: zero danych osobowych, żadnych serwisów zakazujących scrapingu w regulaminie.
  5. Zależność od jednej platformy i jej prowizji.
- **Ocena R4:** przechodzi tylko częściowo. Potwierdzone: marketplace ma płacących kupujących (twarde wypłaty). Niepotwierdzone: popyt w jakiejkolwiek konkretnej niszie, w której miałbyś szansę. Nie miałem dostępu do liczników użytkowników na stronach narzędzi.
  - **Darmowy test przed napisaniem linijki kodu (30-60 minut, robisz sam w przeglądarce):** otwórz w Apify Store 3 najbliższe istniejące narzędzia dla każdej rozważanej niszy i spisz liczbę użytkowników miesięcznie, ocenę, datę ostatniej aktualizacji i otwarte zgłoszenia (z mojej wiedzy strony narzędzi pokazują te liczniki - niezweryfikowane w tym przebiegu). Buduj tylko tam, gdzie istniejące narzędzie ma realnych aktywnych użytkowników ORAZ widoczne słabości. Próg: co najmniej ok. 50 aktywnych użytkowników miesięcznie u lidera niszy (szacunek progu).
  - **Kryterium zabicia:** po 6 tygodniach od publikacji mniej niż 10 płacących użytkowników łącznie albo mniej niż 30 USD zysku miesięcznie = koniec (szacunek progów).
- **Zakres v1:** 3 narzędzia w pierwszym tygodniu jako test (każde to 1-2 dni pracy z agentem kodującym), potem ewentualnie do 5-8. Koszt gotówkowy: ok. 0 EUR. Uwaga: Apify to inne środowisko niż Twój stos Cloudflare, ale szablony są proste.
- **Dopasowanie do Ciebie:** średnie. Umiesz budować z agentem i znasz MCP, ale nie masz tu przewagi, której nie mają tysiące innych osób z Claude Code - i właśnie dlatego rynek jest zalany.

**Moja ocena jako sceptycznego inwestora:** oczekiwana wartość jest niska (rząd 50-300 USD/mies.), a praca nie jest w pełni pasywna. Jeśli inna soczewka da kandydata z potwierdzonym popytem w wyszukiwarce i ceną kilkudziesięciu-kilkuset złotych za klienta, wybierz tamten. Apify traktuj najwyżej jako tani eksperyment poboczny.

---

## Odrzucone pomysly i dlaczego

1. **API lub dane za paywallem x402 (wpis w x402 Bazaar) jako główny produkt.** Realne wydatki agentów to ok. 5-11 tys. USD/mies. na cały ekosystem ([TRM Labs](https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain)); solo deweloperzy raportują centy ([0,330 USD](https://github.com/manteclaw/x402-earnings-digest), [0,058 USD](https://dev.to/coachhype/how-i-got-my-first-outside-x402-payer-0058-in-usdc-on-base-3hjf)); zarabiają firmy infrastrukturalne, nie opakowania danych ([402radar](https://402radar.io/stats)). Nie przechodzi R4. Dopuszczalne wyłącznie jako darmowy dodatek do czegoś, co zarabia inną drogą - oczekiwany przychód ok. 0 (szacunek).

2. **Płatny serwer MCP w abonamencie przez MCPize lub podobny marketplace.** Jedyne liczby pochodzą od samych marketplace'ów ([MCPize](https://mcpize.com/blog/monetize-mcp-server)); brak niezależnie potwierdzonych płacących użytkowników i brak dowodu, że te serwisy mają ruch kupujących ([ScoutForge](https://scoutforge.net/apps/mcpize)). To wzorzec disclosekit: nowa technologia, zero udowodnionej intencji zakupu.

3. **Płatny plugin lub paczka skilli do Claude Code.** Marketplace pluginów nie ma mechanizmu płatności ([PromptReceipts](https://www.promptreceipts.com/blog/claude-code-plugin-marketplace-no-price-2026)), Claude Marketplace nie ma cen ani wypłat ([dsebastien.net](https://www.dsebastien.net/2026-10-04-claude-marketplace-anthropic-is-building-the-distribution-layer/)). Sprzedaż bezpośrednia działa tylko z publicznością i szybko opada (ClaudeKit: 83 281 USD łącznie, ale 1 852 USD w ostatnich 30 dniach - [TrustMRR](https://trustmrr.com/startup/claudekit)). Łamie regułę dystrybucji.

4. **Agent Spend Governance jako SaaS (limity, akceptacje, audyt wydatków agentów).** Skoro agenci realnie wydają 5-11 tys. USD/mies. w całym x402 ([TRM Labs](https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain)), to nie ma jeszcze czego nadzorować. Kupującym byłby dział finansów lub bezpieczeństwa większej firmy, czyli sprzedaż enterprise i outbound - oba zakazane w Twoich regułach. Krajobrazu konkurencji nie zdążyłem zweryfikować (limit wyszukiwań); z mojej wiedzy grają tu duże, finansowane firmy płatnicze - to wnioskowanie, nie dowód.

5. **Płatny konektor MCP do polskich systemów (Allegro, InPost, Shoper, IdoSell, Apilo).** Jeden polski blog podaje (stan na 4.11.2026), że Base/BaseLinker ma już oficjalny serwer MCP, Fakturownia obsługuje MCP, a Allegro, InPost, Apilo, Shoper i IdoSell nie mają ([Syntropic Signal](https://syntropicsignal.ai/pl/blog/mcp-dla-ecommerce/)). Luka istnieje, ale: (a) nie mam żadnego dowodu, że polscy sprzedawcy tego szukają lub za to płacą - R4 niespełnione; (b) poważni sprzedawcy Allegro zwykle mają zamówienia w BaseLinkerze, który ma już oficjalne MCP - to gotowy darmowy substytut; (c) wyniki wyszukiwania na ten temat to poradnik, nie strona z cennikiem. Może mieć sens jako darmowy magnes na klientów consultingu PLAR, nie jako dochód pasywny.

6. **Scrapery polskich serwisów i rejestrów w Apify (Allegro, OLX, Otodom, KRS, CEIDG, REGON).** Nisza już obsadzona: 4+ narzędzia Allegro, ok. 12 Otodom, 8+ rejestrów firm, ceny zbite do 0,90-3 USD za 1 000 wyników (linki w sekcji kandydata). Do tego ryzyko RODO przy danych osób fizycznych (JDG w CEIDG, sprzedawcy OLX).

7. **Wtyczki "agentic commerce" dla sklepów (feed produktowy do ChatGPT, ACP, Instant Checkout).** Instant Checkout został ograniczony w marcu 2026 i nie znalazłem dowodu dostępności w Europie ([checkout.com](https://www.checkout.com/blog/openai-agentic-commerce-shift), [The Hack Academy](https://www.thehackacademy.com/agentic-commerce-protocol-partner-checkout.htm)). Sama zapowiedź zmiany to nie popyt - dokładnie lekcja z disclosekit.

8. **Endpointy na Stripe MPP / Stripe agentic commerce.** Ok. 1 500 USD wolumenu w 30 dni na cały protokół ([BigGo](https://finance.biggo.com/news/63f41820354173bb)). Brak rynku.

9. **Budowa serwerów MCP na zamówienie.** Tu są realne pieniądze (8-50 tys. USD za projekt wg [Godberry Studios](https://godberrystudios.com/posts/how-to-monetize-mcp-servers-2026/)), ale to usługa, nie produkt pasywny. Wniosek praktyczny: dopisz to do oferty consultingu PLAR, nie rób z tego "projektu nr 2".

10. **Narzędzia dla sprzedawców x402 (analityka, katalog, facilitator).** Klientów jest ok. tysiąca ([SwarmBazaar](https://swarmbazaar.com/sellers.html)), większość nic nie zarabia, a darmowych trackerów jest już kilka ([x402scan](https://www.x402scan.com/), [402radar](https://402radar.io/stats), [Valoria](https://x402.valoria.net/category/commerce), [Onyx](https://onyx-actions.onrender.com/bazaar)).

11. **Technologia PLAR Orders jako płatne API dla agentów ("mail/PDF z zamówieniem -> JSON").** Reguła substytucji: agent z dowolnym dużym modelem zrobi to sam w jednym wywołaniu. Popytu nie weryfikowałem. Wartość PLAR Orders leży w wdrożeniu, panelu akceptacji i integracji u klienta, a nie w samym wyciąganiu danych. [wniosek]

12. **Własne GPT-y w GPT Store / aplikacje ChatGPT.** Brak opublikowanego modelu zarabiania dla twórców ([iMasters](https://imasters.com/tecnologia/openai-apps-sdk-chatgpt-apps-monetization-undefined)). GPT Store nie zdążyłem sprawdzić osobno (limit wyszukiwań).

---

## Czego nie udało się sprawdzić

Limit wyszukiwań wyczerpał się, zanim wykonały się te zapytania. Jeśli któryś z punktów ma wpłynąć na decyzję, trzeba go dosprawdzić:

- Czy wpis w katalogu konektorów Claude realnie przynosi instalacje lub rejestracje małym twórcom (brak jakichkolwiek danych).
- Czy istnieją niezależne płatne serwery MCP ze zweryfikowanym przychodem (np. na TrustMRR) - nie znalazłem ani jednego potwierdzonego przykładu poza deklaracjami.
- Czy istnieją darmowe, otwarte serwery MCP do Allegro (gotowy substytut dla pomysłu nr 5).
- Krajobraz i ceny konkurencji w nadzorze wydatków agentów (pomysł nr 4).
- Liczniki użytkowników konkretnych narzędzi w Apify Store (klucz do oceny R4 kandydata nr 1).
- Sprawa UODO/Bisnode i aktualne ryzyko RODO przy scrapingu (przytoczona z pamięci).
- Wewnętrzny podział "za co płacą agenci" w raporcie TRM (streszczenia tego nie podały).

---

## Zrodla

x402 i płatności agentów
- https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain
- https://www.spotedcrypto.com/trm-labs-x402-ai-agent-payments-report-2026/
- https://www.chainalysis.com/blog/x402-agentic-payments-adoption/
- https://www.startuphub.ai/ai-news/startup-news/2026/x402-payments-the-real-numbers
- https://startupfortune.com/ai-agents-have-moved-over-200-million-payments-on-x402-but-half-may-be-fake/
- https://minia2a.uk/blog/x402-real-volume-wash-trading-august-2026
- https://curb.numetal.xyz/dispatch/x402-economy-july-2026
- https://www.hedwigai.com/blog/stripe-and-x402-revenue
- https://402radar.io/stats
- https://swarmbazaar.com/sellers.html
- https://www.x402scan.com/
- https://x402.valoria.net/category/commerce
- https://onyx-actions.onrender.com/bazaar
- https://finance.biggo.com/news/63f41820354173bb
- https://insights.bostonidentity.com/research/ai-engineer-worlds-fair-2026-10-18-ai-agents-still-won
- https://ai.engineer/talks/h6mi88VrPtQ-x402-isnt-good-yet
- https://github.com/manteclaw/x402-earnings-digest
- https://dev.to/coachhype/how-i-got-my-first-outside-x402-payer-0058-in-usdc-on-base-3hjf

MCP, Claude, ChatGPT
- https://mcpize.com/blog/monetize-mcp-server
- https://mcpize.com/developers/monetize-mcp-servers
- https://scoutforge.net/apps/mcpize
- https://godberrystudios.com/posts/how-to-monetize-mcp-servers-2026/
- https://dev.to/whoffagents/pricing-an-mcp-server-in-2026-why-we-charge-19mo-when-the-market-average-is-0-nig
- https://a8gent.com/blog/sell-mcp-servers-monetize-guide
- https://www.dsebastien.net/2026-10-04-claude-marketplace-anthropic-is-building-the-distribution-layer/
- https://max.nardit.com/articles/claude-plugin-directory-explained
- https://neomanex.com/news/claude-marketplace-live-plugin-submission-portal-mcp-2
- https://www.promptreceipts.com/blog/claude-code-plugin-marketplace-no-price-2026
- https://trustmrr.com/startup/claudekit
- https://surgent.dev/inspirations/claudekit
- https://www.checkout.com/blog/openai-agentic-commerce-shift
- https://www.thehackacademy.com/agentic-commerce-protocol-partner-checkout.htm
- https://imasters.com/tecnologia/openai-apps-sdk-chatgpt-apps-monetization-undefined
- https://syntropicsignal.ai/pl/blog/mcp-dla-ecommerce/

Apify
- https://apify.com/partners/actor-developers
- https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store
- https://natlawreview.com/press-releases/apify-bets-1m-independent-developers-building-ais-missing-tools
- https://praguedailyreporter.com/article/893752914-apify-store-pays-out-760-000-to-developers-in-january-as-g2-ranks-it-a-top-10-software-product
- https://aiagents.org.uk/apify-store-review/
- https://droidcrunch.com/apify-review/
- https://agentbyline.com/articles/apify-actor-passive-income-what-really-earns-in-2026-67lcfr
- https://dev.to/fade97/three-months-of-selling-scrapers-on-the-apify-store-with-the-real-numbers-5fd0
- https://www.indiehackers.com/post/from-0-to-80-in-9-days-what-i-learned-building-korean-data-apis-on-apify-b21e776df9
- https://dev.to/silkline/11-scrapers-for-chinese-platforms-in-8-days-and-my-first-4-28bk
- https://www.indiehackers.com/post/i-built-4-apify-scrapers-in-a-day-with-claude-day-3-no-real-users-yet-heres-what-i-m-doing-about-it-3af12de827
- https://apify.com/studio-amba/allegro-scraper
- https://apify.com/piotrv1001/allegro-listings-scraper
- https://apify.com/automation-lab/allegro-scraper
- https://apify.com/123webdata/olx-scraper
- https://apify.com/yugenox/otodom-scraper
- https://apify.com/samdhitosaja/krs-ceidg-pl-poland-company-registry-scraper/api
- https://apify.com/samdhitosaja/krs-ceidg-pl-poland-company-registry-scraper/api/mcp
- https://apify.com/trev0n/ceidg-scraper
- https://apify.com/trev0n/regon-scraper
- https://apify.com/regdata/polish-regon-scraper/api
- https://apify.com/aurenic/poland-krs-scraper/api
- https://apify.com/eudatalab/krs-pl-scraper/api
- https://apify.com/snappytools/krs-poland-company-scraper/api
- https://apify.com/memo23/trustmrr-scraper/api/mcp
- https://apify.com/yugenox/trustmrr-scraper/api/mcp
- https://apify.com/hipersoft/trustmrr-scraper/api/mcp
