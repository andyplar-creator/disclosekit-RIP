# Opinia sedziego: contrarian-builder

Data: 2026-11-26. Oznaczenia: **[D]** = z dossier w tym repo, **[S]** = z mojego wyszukiwania dziś (streszczenia wyników, stron nie otwierałem), **[W]** = moje wnioskowanie, **szacunek** = moja liczba, nie dowód.

## Werdykt

Zgadzam się z roboczą decyzją częściowo: kierunek tak, konstrukcja testu nie.

- **Próbowałem obronić budowę produktu i nie umiem.** Żadnego z 8 finalistów ani "PLAR Orders Lite" jako samoobsługowego produktu nie da się dziś budować bez złamania R4 (zero zweryfikowanych wolumenów) i R1 (nikt nie zapłacił za wersję samoobsługową). To jest wynik, nie unik.
- **Jedna rzecz zasługuje na prawdziwą budowę teraz: publiczne demo PLAR Orders plus lejek "pilot na Twoich danych".** 2-3 dni pracy z agentem (szacunek). To narzędzie sprzedaży produktu, który R1 zdał prawdziwymi pieniędzmi: klient płaci od maja 2026 [D]. Przyda się przy każdym wyniku testu.
- **Uczciwie o R1:** w ścisłym brzmieniu demo to kod funkcji. Jeśli chcesz trzymać regułę co do litery, pierwsza wersja to trzy gotowe przykłady z wynikiem policzonym z góry (zero kodu funkcji), a "wklej własnego maila" dochodzi dopiero po bramce 0.
- **Test flagowy w obecnym kształcie odrzucam.** Mierzy złą rzecz (nowy, tani produkt za 199 zł) złym przyrządem (przedpłata kartą i goły e-mail) na zbyt małej próbie. Najbardziej prawdopodobny wynik to zero płatności, którego nie da się zinterpretować.
- **Zestaw testowy: tak, ale chudy.** Jedna strona, jeden formularz, jedna płatność, jedna tabela surowych wierszy. Limit 2 dni. Szkiców B i C nie przygotowywać.

## Ranking opcji

1. **E+ (mój wariant: E z demem).** Bez nowego projektu. Demo + płatny pilot istniejącego PLAR Orders w realnej cenie + jeden ciepły krok w stronę partnerów. Jedyny wariant, w którym każda godzina pracuje na przychód, który już istnieje.
2. **A (jak w roboczej decyzji).** Kierunek dobry, konstrukcja zła: cena, sygnały, progi. Po poprawkach z sekcji niżej A staje się E+.
3. **D, rozszerzone o D2.** Jeden e-mail do IdoSell i jeden do InsERT o warunki wpisu do katalogu "Rozwiązania partnerskie" [D]. 0 zł, 20 minut. Niczego po nich nie oczekuj.
4. **B.** Wpis w kalendarzu na ostatni tydzień stycznia 2027 i nic więcej. Rynek skurczony, konkurent stoi w tej samej cenie [D]. Przygotowywanie eksperymentu dziś to zajmowanie rąk.
5. **F.** Koniec szukania pomysłów na 30 dni. Wyjątek: 30 minut na sprawdzenie, czy firmy same ogłaszają taką potrzebę. W wynikach wyszło jedno zlecenie na Useme na "system agentów AI do automatyzacji zamówień B2B" (widziałem tylko tytuł) [S]. Odpowiedź na czyjeś ogłoszenie to nie zimny outbound.
6. **C.** Skreślić. Nisza z 12-15 aplikacjami, klony z 0 opinii po 3,5 i 6,5 miesiąca [D]. Nawet "udany" landing kazałby budować coś, czego budować nie powinieneś.

## Najmocniejszy zarzut wobec roboczej decyzji

Robocza decyzja sama mówi, że wąskim gardłem jest kanał dotarcia, a potem projektuje test, który zmienia produkt i cenę.

- **Cena 199 zł rozwiązuje problem, na który nie ma dowodu.** Ordify sprzedaje "zamówienia z maila i AI" dopiero od planu Pro za 949 zł netto/mies., konektor do Subiekta i Optimy od planu Expert (1 259 zł), plus instalacja od 600 zł [S]. Skrót dowodów podaje "279-949 zł", ale 279 zł to plan bez tej funkcji. Twoje 800 zł/mies. już jest poniżej najbliższego konkurenta. Nic nie wskazuje, że hurtownie nie kupują, bo jest za drogo. Nie kupują, bo o Tobie nie wiedzą.
- **Arytmetyka pasywności działa przeciw Lite.** 15-20 klientów po 199 zł to ok. 3 000-4 000 zł/mies. przy 3-6 h wsparcia tygodniowo (szacunek z dossier) [D]. 5 klientów po 800 zł to 4 000 zł/mies. przy 3-4 razy mniejszej liczbie wdrożeń. Niższa cena oznacza więcej klientów, czyli więcej obsługi.
- **Próba jest za mała na sygnał płatności.** 100 EUR to ok. 430 zł (szacunek kursu). Przy 5-13,5 zł za kliknięcie wychodzi 32-86 kliknięć (górna stawka to Twój CPC z disclosekit [D]; polskiego benchmarku B2B nie znalazłem [S]). Zero płatności przy takiej próbie jest zgodne z prawdziwą konwersją sięgającą 3,5% (86 kliknięć) albo 9% (32 kliknięcia) - to arytmetyka "reguły trzech": 3 podzielone przez liczbę prób. Czyli "0 przedpłat" nie znaczy nic, a panel policzy z tego NO-GO.
- **Kupujący nie płaci tak, jak zakłada test [W].** Właściciel hurtowni nie wpisuje karty na stronie nieznanej firmy, żeby wpuścić ją do swoich zamówień. Kupuje po rozmowie, na fakturę. W dossier zagraniczni gracze sprzedają przez wycenę, a polscy przez wdrożenie albo cennik z opłatą instalacyjną [D].
- **Strona może obiecać coś, czego nie ma.** Hasło "do Subiekta" wymaga pliku, który Subiekt wczyta. Dwa moje wyszukiwania nie potwierdziły, że Subiekt GT przyjmie zamówienie od klienta z pliku bez płatnej Sfery [S]. To byłaby powtórka Miss #11.
- **Reużywalny zestaw z konfiguracją, panelem i szkicami B/C to Miss #4:** inżynieria, bo da się ją kontrolować. R1 wycenia ten test na "jeden wieczór + 100 EUR".
- **Brakuje rozmów.** Miss #13 każe zacząć od rozmów z kupującymi. W planie nie ma ani jednej, a masz płacącego klienta pod telefonem.

## Co zmienic w planie i w tescie

1. **Oferta: nie nowy tani produkt, tylko tańsze WEJŚCIE do tego samego.** "Pilot 30 dni na Twoich zamówieniach", opłata jednorazowa rzędu 300-500 zł netto (szacunek; decyzja Twoja), zwrot, jeśli nie skróci przepisywania; potem obecny cennik. Lider kategorii w Shopify też sprzedaje płatny pakiet startowy (50 USD za 15 zamówień) obok abonamentu [D]. Bez publicznej ceny 199 zł.
2. **Demo ma pokazywać to, czego czat nie zrobi.** Trzy gotowe, zanonimizowane maile + przykładowa kartoteka -> dopasowanie do indeksów, przeliczenie jednostek, oznaczone wątpliwości, przycisk "zatwierdź". "Wklej własnego maila" tylko jako dodatek, bo sam odczyt bez kartoteki to dokładnie to, co robi darmowy czat. Limit użyć w D1 (nie w KV, patrz Miss #10) i dzienny limit kosztu.
3. **Sygnały.** Główny: kwalifikowane zgłoszenie pilota (firma, NIP albo firmowy e-mail, program magazynowy, ile zamówień mailem tygodniowo). Mocny: przesłane prawdziwe dane (przykładowe zamówienia + cennik) albo zapłata. Zapłata: karta lub BLIK oraz przycisk "poproszę fakturę pro forma". Goły e-mail zbieraj, ale nie licz do werdyktu.
4. **Strona obiecuje tylko to, co działa dziś u klienta.** Z dossier wynika, że to zapis do Arkuszy Google [D] - potwierdź sam. Subiekt i Optima jako pytanie w formularzu, nie jako obietnica.
5. **Najpierw bramki za 0 zł, potem reklamy.** W Planerze słów kluczowych sprawdź też frazy kategorii sąsiedniej: "platforma B2B dla hurtowni", "system zamówień B2B", "program do przyjmowania zamówień" [W: ból ten sam, a tego ludzie mogą szukać naprawdę]. Jeśli R4 nie przejdzie, reklam nie uruchamiaj.
6. **Zestaw: 2 dni, jeden eksperyment.** Werdykt trójstanowy (GO / nierozstrzygnięte / NO-GO), zawsze z surowymi wierszami obok. Przed wydaniem złotówki: test od formularza do wiersza w D1, test płatności, sprawdzenie skrzynki kontaktowej, Twoje przejście w oknie incognito (Miss #9, #11, #14).
7. **Kanał partnerski zrób testowalny, nie tylko "do decyzji".** Trzy kroki bez zimnych telefonów: zapytaj klienta, kto mu serwisuje program magazynowy, i poproś o przedstawienie; dodaj na stronie sekcję "Wdrażasz Subiekta lub Optimę?" ze stałą prowizją; wyślij e-mail do InsERT (D2).
8. **Termin [W].** Jeśli strona nie ruszy do ok. 3 grudnia, reklamy od 7 stycznia. Okno 14 dni nie powinno wejść w okres 19 grudnia - 6 stycznia.

## Progi GO / NO-GO

Zapisz je przed startem. Pierwszy pełny klient to co najmniej 4 900 + 12 x 800 = 14 500 zł w pierwszym roku [D], więc jeden prawdziwy lead na 100 EUR to już dobry kanał. Próg z disclosekit (5 e-maili na 50 kliknięć) był dla taniego narzędzia i tu nie pasuje.

- **Bramka 0 (0 zł, R4):** co najmniej 1 fraza zakupowa z 1 000+ wyszukiwań/mies. albo 3 frazy po 100+. Nie przeszło -> bez reklam. Wniosek brzmi wtedy "Google nie jest kanałem", nie "nie ma popytu"; idziesz ścieżką partnerów i poleceń.
- **Bramka 1 (0 zł):** lejek sprawdzony przez Ciebie od końca do końca.
- **Bramka 2 (ok. 100 EUR, min. 14 dni, tylko dopasowanie ścisłe i do wyrażenia, min. 40 kliknięć z trafnych haseł według raportu wyszukiwanych haseł):**
  - **GO:** co najmniej 1 opłacony pilot od firmy, której nie znasz, ALBO co najmniej 2 kwalifikowane zgłoszenia, z których 1 przysłało prawdziwe dane w 7 dni. Działanie: reklamy zostają, wdrażasz ręcznie.
  - **PRZEDŁUŻ:** dokładnie 1 kwalifikowane zgłoszenie. Drugie 100 EUR bez zmian i rozmowa z tą firmą (to ruch przychodzący).
  - **NIEROZSTRZYGNIĘTE:** mniej niż 40 trafnych kliknięć albo ponad połowa kliknięć z haseł nietrafionych. Nie licz, popraw kierowanie.
  - **NO-GO dla Google Ads (nie dla PLAR Orders):** 60+ trafnych kliknięć, sprawny lejek, 0 kwalifikowanych zgłoszeń i mniej niż 15% wchodzących uruchamia demo (próg to szacunek).
- **Bramka 3 (kod samoobsługowy):** dopiero po 3 płacących pilotach wdrożonych ręcznie, gdy wdrożenie zajmuje Ci najwyżej ok. 2 h na firmę (szacunek) i znasz już drogę zamówienia do programu klienta.
- **Bramka pasywności:** policz, ile godzin tygodniowo kosztuje Cię obecny klient. Jeśli ponad 1 h, w limicie 4 h mieszczą się 4 firmy i lekarstwem jest wyższa cena, nie niższa.

## Czego nie robic przez 30 dni

- Nie pisać kodu Lite: rejestracji, abonamentów w Stripe, kreatora kartoteki, eksportu do Subiekta.
- Nie budować niczego z listy finalistów (Shopify, IdoSell, PUP, MT940, KSeF -> Arkusze).
- Nie ogłaszać ceny 199 zł.
- Nie uruchamiać reklam bez przejścia bramek 0 i 1; bez dopasowania przybliżonego i bez sieci partnerów wyszukiwania.
- Nie liczyć gołych e-maili jako sygnału i nie brać werdyktu z panelu bez obejrzenia wierszy i raportu haseł.
- Nie zamawiać trzeciej rundy researchu ani nowych list pomysłów.
- Nie przygotowywać eksperymentów B i C.
- Nie wkładać prawdziwych maili klienta do publicznego demo bez anonimizacji i jego zgody.

## Najtansze dzialanie o najwiekszej wartosci informacyjnej

Jedna godzina, 0 zł, przed jakimkolwiek kodem:

1. **30 minut w Planerze słów kluczowych** (10 fraz: nazwa funkcji + kategoria sąsiednia). Rozstrzyga, czy test reklamowy w ogóle ma sens.
2. **20 minut rozmowy z obecnym klientem.** Cztery pytania: co prawie powstrzymało go przed zakupem; czy kupiłby sam ze strony, bez rozmowy; kto mu serwisuje program magazynowy; kogo zna, kto też przepisuje zamówienia. Do tego Twoja własna liczba: ile godzin tygodniowo ten klient Cię kosztuje.

## Sprawdzone twierdzenia

| Twierdzenie | Wynik | Źródło |
|---|---|---|
| Ordify ma funkcję AI od 279 zł/mies. | Nie. Starter 279 zł jest bez tej funkcji. "Zamówienia z maila i AI" od planu Pro 949 zł netto/mies., konektor ERP w planie Expert 1 259 zł, instalacja od 600 zł; ceny opisane jako promocja startowa [S] | https://ordify.pl/ , https://ordify.pl/porownania/xsale , https://ordify.pl/porownania/sellrocket |
| Subiekt GT wczyta zamówienie od klienta z pliku bez Sfery | Niepotwierdzone po 2 wyszukiwaniach. Sprawdź w wersji próbnej Subiekta albo u klienta (15 minut) | brak źródła; najbliższy wynik dotyczy faktur: https://www.fakturowo.pl/forum/import-faktur-sprzedazy-do-programu-subiektgt |
| Istnieje gotowy polski dodatek "zamówienia z maila do Subiekta przez AI" | Nie znalazłem (1 wyszukiwanie, słaby dowód). Wyszło zlecenie na budowę takiego systemu na zamówienie (tylko tytuł) | https://useme.com/pl/jobs/system-agentow-ai-do-automatyzacji-zamowien-b2b-manufacturing,131019/ |
| Koszt kliknięcia w polskim B2B | Polskiego benchmarku nie znalazłem. Globalnie średnio 1,63-5,26 USD zależnie od branży; analiza 14 reklamodawców B2B: kliknięcia droższe o ok. 21% | https://landingi.com/pl/reklama-cyfrowa/koszty-reklamy/ , https://ppc.land/nothing-changed-but-the-price-b2b-google-clicks-cost-21-more/ |
| CPC 13,48 zł w disclosekit; pakiet startowy lidera Shopify 50 USD; klony z 0 opinii; zapis do Arkuszy Google | Wzięte z dossier, nie sprawdzałem ponownie | `01-sweep/productize-plar-orders.md`, `02-deep-dive/shopify-po-to-draft-order.md`, `02-deep-dive/unresearched-polish-ecosystems-gap-scout.md` |

Wykorzystałem 6 z 6 wyszukiwań. Wolumenów fraz nadal nikt nie zna - to wciąż największa dziura w całym materiale.
