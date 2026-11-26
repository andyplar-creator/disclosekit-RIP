# Opinia sedziego: sceptical-investor

Data: 2026-11-26. Rola: sceptyczny inwestor w mikro-biznesy. Założyłem, że robocza decyzja jest błędna, i próbowałem ją obalić.
Oznaczenia: **[plik]** = fakt z Twoich plików; **[sieć]** = sprawdzone dziś wyszukiwaniem (linki w ostatniej sekcji); **[rachunek]** = arytmetyka na podanych liczbach; **szacunek** = moja liczba, nie dowód.

## Werdykt

Zgadzam się częściowo. Diagnoza jest trafna, recepta jest źle ułożona.

- **Trafne:** żaden kandydat nie zasłużył na budowę. Jedyne, co zarabia, to PLAR Orders. Wąskim gardłem jest kanał sprzedaży, nie produkt. Decyzja o poluzowaniu "zero outboundu" należy do Ciebie.
- **Błędne:** głównym rezultatem ma być narzędzie (zestaw do testów z panelem i automatycznym werdyktem). To ta sama ucieczka w inżynierię, którą sam opisałeś jako Miss #4. Taki test już raz zrobiłeś w maju: strona, Stripe, D1 i 100 EUR reklam. W repozytorium leży po nim 2406 linii działającego kodu [plik]. Wtedy nie zabrakło narzędzia, tylko popytu.
- **Zła kolejność:** zestaw i eksperyment A powstają przed 30-minutowym sprawdzeniem wolumenów, które reguła R4 stawia na samym początku ("jeśli R4 nie przechodzi: STOP").
- **Test A za ok. 100 EUR prawie na pewno da wynik NO-GO**, niezależnie od tego, czy pomysł jest dobry. Uzasadnienie w sekcji o zarzucie.

Jak sam ułożyłbym 300 EUR i 20 godzin: 0 EUR do przejścia bramki R4; 12-14 godzin na opcję E w wersji "na ciepło"; 1 godzina na D; reszta czasu i pieniądze na A dopiero po bramce. B i C: zero. Jeśli bramka nie przejdzie, właściwa kwota to 0 EUR.

Jedno zdanie, którego robocza decyzja nie mówi wprost: przy czterech ograniczeniach naraz (pasywnie, bez outboundu, bez publiczności, 100-300 EUR) research w Twoich plikach daje realnie 0-500 USD miesięcznie w pierwszym roku [plik]. Coś z tej czwórki trzeba poluzować albo przyjąć ten wynik.

## Ranking opcji

1. **E, ale zaczęte bez zimnych kontaktów.** [rachunek] Jeden nowy klient pełnego PLAR Orders to 4 900 + 12 x 800 = 14 500 zł w pierwszym roku. Jeden klient Lite za 199 zł to 2 388 zł. Potrzeba 6 klientów Lite, żeby zrównać się z jednym pełnym. Mediana zweryfikowanych solo-projektów to 136-169 USD miesięcznie [plik]. Żaden pomysł z researchu nie ma wyższej wartości oczekiwanej niż drugi klient PLAR Orders. Uczciwie: to nie jest dochód pasywny i wymaga rozmów.
2. **A, przerobione i dopiero po bramce R4.** Ma sens jako test "czy reklamy przyprowadzają hurtownie do tego, co już sprzedaję", z Lite jako drugim poziomem cennika. Jako osobny produkt pasywny: nie (3-6 h wsparcia tygodniowo według Twojego dossier, szacunek).
3. **D.** 15 minut, 0 zł, mała szansa. Dopisz drugi taki sam e-mail do InsERT o warunki katalogu "Rozwiązania partnerskie": tam są użytkownicy Subiekta, czyli Twój segment.
4. **B.** Pula pieniędzy spadła o ok. 41% (3,65 -> 2,14 mld zł) [plik], kupujący to osoba bezrobotna, zero związku z marką PLAR. Dziś tylko darmowe sprawdzenie fraz. Żadnego szkicu eksperymentu teraz.
5. **F (trzecia runda researchu).** Nie. Około 130 pomysłów dało spójny wniosek: przewagą nie jest budowanie, tylko kanał. Kolejna runda to odwlekanie.
6. **C.** Martwe według własnej bramki z dossier: "zabij, jeśli poza liderem żadna aplikacja starsza niż 3 miesiące nie ma 5 opinii". Dwa klony mają 0 opinii po 3,5 i 6,5 miesiąca [plik]. Nie przygotowywać nawet szkicu.

## Najmocniejszy zarzut wobec roboczej decyzji

**Budżet testu A nie kupi werdyktu, a panel policzy z niego "GO / NO-GO" z dokładnością, której te dane nie mają.**

- 100 EUR to ok. 425 zł (szacunek kursu). Przy Twoim koszcie kliknięcia z maja, 13,48 zł [plik], to 32 kliknięcia. Przy 5 zł: 85 kliknięć.
- [rachunek] Załóżmy, że naprawdę 1 na 100 klikających opłaciłby pilota (dla B2B to dobry wynik). Przy 32 kliknięciach zobaczysz zero wpłat w 73% prób, przy 85 kliknięciach w 43%. Zero wpłat nie odróżnia więc dobrego pomysłu od złego.
- Próg z R1 (5 e-maili na 50 kliknięć, czyli 10%) nie pasuje do tego kupującego. Mediana stron SaaS to ok. 3,8% [sieć, źródło wtórne]. [rachunek] Strona na poziomie tej mediany przechodzi próg "5 z 50" w 4% prób. Nawet strona, która naprawdę ma 10%, przechodzi tylko w 57%.
- Skutek: wydajesz 100 EUR, dostajesz "NO-GO", a panel pokazuje to jako twardy wynik. To powtórka Miss #9: cel mierzony czymś, co nie mogło go zmierzyć.

Drugi zarzut: "działające demo - wklej maila" to kod produktu przed testem, czyli R1 złamane bocznymi drzwiami (kodu PLAR Orders nie ma w repozytorium; R1 pozwala tylko na stronę, przycisk Stripe i reklamy). Demo bez kartoteki towarów pokaże tę część, którą darmowy czat robi sam, a nie Twoją przewagę (dopasowanie do indeksów klienta, plik dla Subiekta). Cudze maile z danymi osobowymi wklejane w publiczny formularz to też obowiązki RODO (moje rozumowanie, nie porada prawna).

Trzeci zarzut: cena 199 zł pokazana publicznie przy kliencie, który płaci od 800 zł, może zaszkodzić jedynemu przychodowi. Robocza decyzja tego ryzyka nie wymienia.

## Co zmienic w planie i w tescie

1. **Odwróć kolejność.** Najpierw Planer słów kluczowych (0 zł). Dopiero po bramce wolno wdrożyć stronę i wydać pieniądze.
2. **Przytnij zestaw do jednego wieczoru Twojego czasu.** Jedna strona, jeden link płatności Stripe, jedna tabela w D1, jedno zapytanie pokazujące surowe wiersze. Bez obsługi wielu eksperymentów i bez automatycznego werdyktu; werdykt liczysz ręcznie z progów poniżej. Skoro agenci i tak to piszą, niech piszą wersję minimalną. Twój koszt to sprawdzanie, nie pisanie (Miss #14).
3. **Demo bez pola do wklejania.** Trzy gotowe przykłady (mail -> zamówienie z dopasowanymi indeksami) albo 90-sekundowe nagranie ekranu prawdziwego systemu. Do tego zdanie: "prześlij jedno swoje zamówienie na adres X, odeślemy wynik w 24 h", obsługiwane ręcznie. Przesłane prawdziwe zamówienie to mocniejszy sygnał niż e-mail na liście.
4. **Testuj prawdziwą ofertę, nie samo Lite.** Strona na plar.ai z podpisaną referencją (Twój jedyny atut zaufania). Dwa poziomy: Lite 199 zł z twardymi ograniczeniami (limit zamówień, eksport do pliku, bez wdrożenia) i pełna usługa. Wtedy wynik mówi też, czy reklamy mogą zasilać to, co już zarabia.
5. **Zwiększ próbę albo nie zaczynaj.** Minimum 200 kliknięć z fraz zakupowych. Jeśli 200 kliknięć kosztuje więcej niż 300 EUR, testu reklamowego nie robisz wcale.
6. **Usuń C. B zostaw jako notatkę z datą** (koniec stycznia 2027: frazy z rozbiciem na miesiące).
7. **Dodaj do E krok, który nie jest outboundem:** rozmowa z obecnym klientem (pytania w przedostatniej sekcji).
8. **Przenieś projekt do prywatnego repozytorium przed wdrożeniem.** To repozytorium jest publiczne [plik]. Cennik eksperymentu i progi zobaczy każdy, także klient i konkurencja.
9. **Kontrola przed reklamami (Miss #9 i #11):** prawdziwa płatność i zwrot, wiersz widoczny w D1, działająca skrzynka, w drugim dniu przegląd raportu wyszukiwanych haseł.
10. **Termin:** start reklam najpóźniej 3 grudnia albo dopiero po 11 stycznia (moje rozumowanie: przed świętami hurtownie mają szczyt, potem przerwę; wynik z tych tygodni byłby zaszumiony).

## Progi GO / NO-GO

**Bramka 0 (R4), 0 zł, przed wszystkim.** Planer, Polska, język polski. Frazy na start (propozycje, wolumenów nie znam): zamówienia z maila do Subiekta; zamówienia z maila do Optimy; import zamówień z PDF do Subiekta; zamówienia z Excela do Subiekta; automatyczne wprowadzanie zamówień; automatyzacja zamówień hurtownia; automatyzacja zamówień B2B; program do przyjmowania zamówień od klientów; OCR zamówień; przepisywanie zamówień z maila.

- PRZECHODZI: jedna fraza zakupowa w przedziale co najmniej 1 tys. miesięcznie ALBO trzy frazy zakupowe po co najmniej 100 (Twoje R4); ORAZ stawka za górę strony pozwala kupić 200 kliknięć w budżecie: do ok. 6 zł przy 300 EUR, do ok. 2 zł przy 100 EUR (szacunek kursu 4,25 zł).
- Frazy ogólne ("program dla hurtowni", "platforma B2B") nie liczą się: licytują na nie pełne platformy z handlowcami.
- NIE PRZECHODZI: nie ma reklam i nie ma testu strony, 300 EUR zostaje w kieszeni. Zostają E i D.

**Test A (tylko po bramce): 200 kliknięć z fraz zakupowych albo 14 dni, twardy limit 300 EUR.**

- GO dla budowy Lite: co najmniej 2 opłacone pilotaże (199 zł, ze zwrotem) od 2 różnych firm. Pierwszych klientów i tak wdrażasz ręcznie.
- GO dla kanału "reklamy -> pełne PLAR Orders", bez nowego produktu: co najmniej 4 zidentyfikowane firmy (nazwa, telefon, jaki program, ile zamówień tygodniowo) albo prawdziwe zamówienia przesłane przez 4 firmy.
- NO-GO: 0 wpłat i najwyżej 1 zidentyfikowana firma po 200 kliknięciach. Bez powtórki; najwyżej jedna zmiana tekstu w trakcie.
- Strefa szara (1 wpłata albo 2-3 firmy): nie budujesz. Obsługujesz te firmy ręcznie na istniejącym systemie.
- Przerwij wcześniej: po 7 dniach Google nie wydaje dziennego budżetu i masz mniej niż 100 kliknięć (brak wolumenu, jak w disclosekit) albo po pierwszych 50 kliknięciach średni koszt przekracza 6,5 zł.
- Same adresy e-mail: notujesz, w werdykcie ważą zero.

Skąd te liczby [rachunek]: przy 200 kliknięciach i prawdziwej konwersji na wpłatę 2% zero wpłat zdarza się w 2% prób, a co najmniej 2 wpłaty w 91%. Przy 1%: zero w 13%, co najmniej 2 w 60%. Przy 0,5% test nadal jest ślepy (zero w 37%). Tego poziomu za 300 EUR nie zmierzysz i trzeba to wiedzieć z góry. Próg 4 firm: strona na poziomie mediany SaaS (3,8%) osiąga go w 95% prób, strona na poziomie 1,1% w 18%.

**E, 30 dni.** Żyje, jeśli obecny klient da co najmniej 1 polecenie albo kontakt do firmy, która wdraża u niego program magazynowy, i co najmniej 1 z 5 rozmów z takimi firmami kończy się zgodą na pokazanie systemu jednemu klientowi. Przy 0 z 5 odkładasz kanał partnerski i mówisz sobie wprost: PLAR Orders zostaje usługą z jednym klientem.

## Czego nie robic przez 30 dni

- Nie wdrażać strony i nie włączać reklam przed bramką 0.
- Nie budować panelu z automatycznym werdyktem ani zestawu "wielokrotnego użytku". Do uruchomienia jest jeden eksperyment, nie pięć.
- Nie pisać publicznego demo z polem do wklejania maili.
- Nie dotykać Shopify (C) ani wniosków PUP (B) poza darmowym sprawdzeniem fraz.
- Nie zakładać kont na nowych platformach (Shopify Partners, sklep dodatków Google, IdoSell). Sam e-mail z pytaniem wystarczy.
- Nie zamawiać trzeciej rundy researchu.
- Nie pokazywać ceny 199 zł bez twardych ograniczeń planu.
- Nie liczyć e-maili jako dowodu popytu.

## Najtansze dzialanie o najwiekszej wartosci informacyjnej

**30-45 minut w Planerze słów kluczowych Twojego konta Google Ads, zanim cokolwiek zostanie wdrożone.** Wklej trzy listy fraz: A (lista wyżej), B (z dossier, z rozbiciem na miesiące), C (z dossier, tylko po to, żeby zamknąć temat własną regułą). Zapisz przedziały wolumenu i stawki, zrób zrzuty ekranu. Potem w oknie incognito wpisz trzy najlepsze frazy z A i policz reklamy oraz strony z cennikiem.

Dlaczego właśnie to: skrót dowodów i każde dossier, które czytałem (5 z 20), mówią "wolumen niezweryfikowany", a agenci nie mają do tego narzędzia. Ten krok rozstrzyga, czy plan "zestaw + reklamy" ma w ogóle co mierzyć. Jeśli wąskie frazy dostaną status "mała liczba wyszukiwań", reklamy się nie wyświetlą, dokładnie jak w maju. Konto bez bieżących wydatków pokaże przedziały, nie dokładne liczby [sieć]; do progów R4 przedziały wystarczą.

Zaraz potem, drugie 30 minut i też 0 zł: rozmowa z obecnym klientem. Cztery pytania: co wpisałby w Google, szukając takiej usługi; kto wdraża u niego program magazynowy i czy Cię przedstawi; czy zna dwie firmy z tym samym kłopotem; czy zgodzi się na nagranie ekranu na stronę.

## Sprawdzone twierdzenia

Sześć wyszukiwań (limit). Stron nie otwierałem; wyniki pochodzą ze streszczeń wyszukiwarki, która nie jest polskim Google.

| Twierdzenie | Wynik | Źródło |
|---|---|---|
| Nie ma polskiego gotowca "zamówienia z maila -> Subiekt przez AI" | Częściowo potwierdzone, słaby dowód. Jedno wyszukiwanie nie pokazało łącznika do Subiekta. Są polskie strony graczy zagranicznych i zlecenie na Useme na budowę takiego systemu. Brak konkurenta może oznaczać lukę albo brak popytu. | https://virtualworkforce.ai/pl/konwertuj-e-maile-zamowien-klientow-na-zamowienia-sprzedazy/ , https://parseur.com/pl/przypadek-uzycia/automatyzacja-zamowien-sprzedazy , https://useme.com/pl/jobs/system-agentow-ai-do-automatyzacji-zamowien-b2b-manufacturing,131019/ |
| Planer pokazuje przedziały zamiast liczb, gdy konto nie ma wydatków | Potwierdzone jakościowo. Jeden poradnik podaje nieoficjalny próg ok. 100 USD wydatków miesięcznie. Dokładnych granic przedziałów nie potwierdziłem. | https://searchengineland.com/google-officially-throttling-keyword-planner-data-low-spending-adwords-accounts-255795 , https://dynomapper.com/blog/search-engine-optimization/how-to-use-googles-keyword-planner-like-a-pro/ |
| Mediana konwersji stron SaaS 3,8% (wszystkie branże 6,6%); B2B SaaS odwiedzający -> lead 1,1% | Źródła wtórne cytujące raport Unbounce 2026 i FirstPageSage. Przypisanie liczb do konkretnej strony niepewne; samego raportu nie widziałem. | https://unbounce.com/conversion-benchmark-report/saas-conversion-rate/ , https://www.saashero.net/strategy/b2b-saas-conversion-rate-benchmarks/ |
| Koszt kliknięcia dla polskich fraz B2B | Nie znalazłem wiarygodnej liczby. Jedyna twarda to Twoje 13,48 zł z maja [plik]. Jedna analiza podaje, że to samo słowo kluczowe B2B kosztowało ok. 21% więcej rok do roku. | https://ppc.land/nothing-changed-but-the-price-b2b-google-clicks-cost-21-more/ |
| Sieć partnerów InsERT jest duża (podstawa opcji E) | Niezweryfikowane. Jedyna liczba to "kilkuset partnerów" z 2015 r. | https://www.chip.pl/2015/10/insert-partnerem-roku-microsoft |
| plar.ai / PLAR Orders widać w wyszukiwarce | Zapytanie z nazwą produktu i obiema cenami nie zwróciło plar.ai. Słaby dowód. Sprawdź sam w incognito: 2 minuty. | brak (wynik negatywny) |
| Kod testu z maja już istnieje | 2406 linii TypeScript: strona, cennik, Stripe, D1. | plik: `src/` w tym repozytorium |
| C pada na własnej bramce | Werdykt pkt 1 i krok 0b w dossier. | plik: `02-deep-dive/shopify-po-to-draft-order.md` |
