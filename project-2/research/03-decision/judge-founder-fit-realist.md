# Opinia sedziego: founder-fit-realist

Stan: 2026-11-26. Oceniam roboczą decyzję pod jednym kątem: co Ty, przy 5-8 godzinach tygodniowo, bez programowania i bez zimnej sprzedaży, jesteś w stanie utrzymać. Opinii pozostałych sędziów nie czytałem. Liczba bez linku ma etykietę "szacunek" albo pochodzi z plików w tym repozytorium.

## Werdykt

Zgadzam się z roboczą decyzją częściowo.

Zgadzam się z jej końcówką: Twoim najlepszym "względnie pasywnym" dochodem jest abonament PLAR Orders, a blokuje go brak kanału dotarcia, nie brak produktu. Nie zgadzam się z kolejnością. Decyzja robi główny rezultat z zestawu do testów i z testu "PLAR Orders Lite za 199 zł", a kanał partnerski zostawia jako jedno zdanie do przemyślenia. Powinno być odwrotnie.

Opcja A w obecnym kształcie nie jest nowym pasywnym projektem. To drugi, czterokrotnie niższy cennik tej samej pracy, bez opłaty wdrożeniowej. Sam drugi cennik nie jest błędem. Błędem jest kierunek. Narzędzie, przez które przechodzą czyjeś zamówienia, obciąża Cię liczbą klientów, a nie przychodem. 15 klientów Lite to 2 985 zł miesięcznie i 15 firm, które piszą tego samego dnia, gdy coś nie zadziała. 4 klientów pełnej wersji to 3 200 zł miesięcznie i 19 600 zł za wdrożenia. Przy Twoim limicie czasu potrzebujesz niewielu klientów, którzy płacą dużo.

Opcja E jest warta więcej niż każdy nowy projekt z tego researchu. Jeden dodatkowy klient PLAR Orders to 14 500 zł w pierwszym roku (4 900 zł + 12 x 800 zł). Mediana zweryfikowanych solo-projektów to 136-169 USD miesięcznie (skrót dowodów, sekcja 3). Dwóch lub trzech klientów w rok daje więcej niż optymistyczny wynik nowego mikro-produktu i nie dokłada nowego kodu do utrzymania.

## Ranking opcji

1. **E - kanał dla PLAR Orders: polecenia i 1-3 firmy wdrażające ERP.** Najwyższa wartość oczekiwana. Produkt jest sprawdzony, a partner przejmuje pracę po stronie programu magazynowego, co obniża Twoje godziny wsparcia.
2. **G (dodaję) - zmierz, ile godzin tygodniowo kosztuje Cię obecny klient.** Tej liczby nie ma w całym researchu, a wyznacza sufit: limit 2-4 h podzielony przez godziny na klienta to liczba klientów, których udźwigniesz. Jeśli wychodzi ponad 1,5 h tygodniowo, najpierw odchudź obsługę, potem szukaj klientów.
3. **A - ale jako test napływu zapytań dla PLAR Orders, nie jako produkt Lite.** Strona i nagranie przydadzą się też partnerom. Tylko po przejściu bramki 0 (niżej).
4. **D - e-mail do IdoSell.** 10 minut, wyślij i zapomnij. Dołóż drugi, ważniejszy dla Ciebie: do działu sprzedaży InsERT z pytaniem o warunki wpisu do katalogu "Rozwiązania partnerskie".
5. **B - zestaw PUP.** Teraz nic nie przygotowywać. Wpis w kalendarzu na połowę stycznia 2027: sprawdzić budżet Funduszu Pracy na 2027 i wtedy zdecydować. W tej niszy nie masz ani marki, ani referencji.
6. **F - coś nowego.** Bez trzeciej rundy szukania przez 90 dni. 130 pomysłów i 8 pogłębień dało jeden wynik; kolejna runda byłaby odwlekaniem.
7. **C - Shopify.** Skreślić. 12-15 klonów, zero Twojej przewagi językowej i branżowej, reguła 10 instalacji.

## Najmocniejszy zarzut wobec roboczej decyzji

**Test flagowy sprawdza produkt, którego nie masz i którego nie powinieneś chcieć.**

Żeby oferta była samoobsługowa, wycięto z niej wszystko, co broni PLAR Orders przed darmowym czatem AI: dopasowanie do kartoteki towarów, pracę na skrzynce i plik dla Subiekta. W konfiguracji eksperymentu (`project-2/sonda/src/experiments/zamowienia-z-maila.ts`) zostało: tekst wiadomości, tabela, CSV albo Arkusze Google, "nie czyta zdjęć ani skanów", "sam przekazujesz wiadomości i sam pobierasz plik". To samo zrobi ChatGPT po wklejeniu maila. Demo na żywo pokazuje właśnie tę część.

Skutki:
- NO-GO nic nie powie o PLAR Orders, bo testowana była inna, słabsza oferta.
- GO (2 wpłaty kartą albo 5 adresów na 50 kliknięć) zobowiąże Cię do uruchomienia kont w 14 dni, przy 5-8 h tygodniowo i bez kodu PLAR Orders w tym repozytorium. W praktyce obsłużysz te firmy ręcznie, czyli sprzedasz obecną usługę za 199 zł zamiast za 800 zł i 4 900 zł wdrożenia.
- 199 zł to mniej niż najtańszy konkurent z dossier, który daje całą platformę (Ordify od 279 zł plus instalacja od 600 zł; tej ceny nie udało mi się potwierdzić ponownie). Publiczna cena 199 zł obniża też punkt odniesienia dla obecnego klienta i dla przyszłych partnerów.

Drugi zarzut: zestaw "Sonda" ma już ok. 1 900 linii kodu (policzone w `project-2/sonda`). Reguła R1 mówi o jednym wieczorze: strona, przycisk, 100 EUR reklam. To powtórka Miss #4: powstaje to, co da się zbudować w repozytorium, a nie to, czego brakuje, czyli rozmowa z klientem i z partnerem. Każdą z tych linii musisz sprawdzić sam (Miss #9, #11, #14).

## Co zmienic w planie i w tescie

1. Odwróć kolejność: E jest planem, A jest testem pomocniczym dla tego samego produktu.
2. Zamroź "Sondę" w obecnym zakresie. Bez nowych typów eksperymentów, bez szkiców B i C.
3. Zmień ofertę testu na stronę PLAR Orders z dwiema akcjami. Główna: "Prześlij 5 prawdziwych zamówień, w 48 godzin odeślę, jak wyglądałyby u Ciebie", z obowiązkowymi polami: firma, program magazynowy, liczba zamówień tygodniowo. Druga: płatny pilotaż 30 dni prowadzony przez Ciebie, np. 490 zł netto zaliczane na poczet wdrożenia (szacunek ceny), płatny kartą albo z faktury pro forma. Hurtownia kupuje na fakturę, rzadko kartą na nieznanej stronie.
4. Jeśli mimo to chcesz testować Lite: 349-399 zł zamiast 199 zł (szacunek), najwyżej 3 miejsca, obsługa ręczna przez 30 dni z mierzeniem czasu.
5. Demo: zostaw trzy gotowe przykłady z gotowym wynikiem, a pole do wklejania własnego tekstu wyłącz na pierwszy przebieg. Publiczny punkt wywołujący model to koszt, nadużycia i cudze dane osobowe bez umowy powierzenia. Dodaj 90-sekundowe nagranie prawdziwego panelu (za zgodą klienta), bo ono pokazuje dopasowanie do kartoteki, a demo nie.
6. Frazy podziel na dwie grupy i licz osobno: "problem" (przepisywanie zamówień z maila, zamówienia z maila do Subiekta) oraz "kategoria" (system zamówień B2B dla hurtowni, program do przyjmowania zamówień). Druga grupa ma zapewne większy wolumen, ale ci ludzie szukają platformy B2B, a nie odczytu maili (wniosek własny).
7. Budżet: 100 EUR to ok. 425 zł (szacunek kursu). Przy cenie kliknięcia z disclosekit (13,48 zł) to ok. 32 kliknięcia, czyli mniej niż własne minimum testu (50). Ustal limit 250 EUR albo z góry przyjmij, że test może nie dać werdyktu.
8. Nie puszczaj reklam między 15 grudnia a 10 stycznia. Hurtownie mają wtedy szczyt sezonu, święta i inwentaryzację (wniosek własny). Cisza w tym okresie nie byłaby dowodem.
9. Przenieś `project-2` do prywatnego repozytorium, zanim zapiszesz w nim stawki dla partnerów i progi cenowe. README sam o tym ostrzega.

### Jak działa kanał przez firmy wdrażające ERP

- **Kto.** Małe firmy informatyczne (zwykle 1-10 osób, szacunek), które sprzedają i serwisują Subiekta, Optimę, WF-Mag lub Symfonię u lokalnych hurtowni. InsERT ma sieć partnerów z poziomami (Autoryzowani Partnerzy, Partnerzy, punkty serwisowe) i publikuje ich listy według województw. Comarch sprzedaje Optimę przez autoryzowanych partnerów. Zacznij od firmy, która serwisuje program Twojego obecnego klienta.
- **Czego chcą.** Zarobku na własnych godzinach wdrożenia, stałej prowizji, pewności, że nie pójdziesz do ich klienta bokiem z niższą ceną, prostego opisu z referencją i szybkiej odpowiedzi przy awarii, bo to do nich zadzwoni klient.
- **Co proponować (szacunek, do negocjacji).** Partner fakturuje własne godziny i dostaje stały udział w opłacie wdrożeniowej oraz w abonamencie, dopóki klient płaci. [Konkretne stawki proponowane przez sędziego usunięto z publicznego repozytorium, bo to pozycja negocjacyjna; są w prywatnym raporcie dla właściciela.] Punkt odniesienia: Fakturownia płaci polecającym 30% każdej opłaty abonamentowej, Shoper płaci wdrożeniowcom dożywotnią prowizję od abonamentów. Stawek dla dodatków do ERP nikt nie publikuje.
- **Co oddajesz.** Część przychodu z klienta, część relacji z klientem, swobodę cenową (publiczne 199 zł kłóci się z tym kanałem) i czas na obsługę partnera. Dochodzi ryzyko, że partner z własnym programistą zrobi podobne narzędzie sam, więc wybieraj serwisantów, nie software house'y.
- **Uczciwie.** Pozyskanie partnerów to też sprzedaż wychodząca. Różnica: 10 osobistych maili do firm, którym dajesz zarobić, zamiast setek telefonów do hurtowni. Większość partnerów, którzy powiedzą "tak", nikogo nie przyprowadzi; pierwszy klient z tego kanału to realnie 3-6 miesięcy (szacunek). Firmy od ERP mają teraz szczyt pracy przy KSeF (od 1 stycznia 2027 wchodzą najmniejsi, wg dossier), więc rozmowy ruszą raczej w lutym (wniosek własny).

### Obciążenie wsparciem przy Lite (szacunki)

Wdrożenie jednej firmy: 1-2 h w pierwszym miesiącu, nawet przy "prześlij maila i pobierz plik". Potem ok. 15 minut tygodniowo na firmę, z oczekiwaniem odpowiedzi tego samego dnia. 15 firm to ok. 3,75 h tygodniowo plus awarie i umowa powierzenia danych z każdą firmą. To zjada cały limit 2-4 h za 2 985 zł miesięcznie.

## Progi GO / NO-GO

**Bramka 0 - Planer słów kluczowych (30 minut, 0 zł), przed wydaniem złotówki.**
- Poniżej 300 wyszukiwań miesięcznie łącznie dla całej listy: bez testu reklamowego, zostaje E.
- 300-2 000: za mało na werdykt w 3-4 tygodnie. Strona zostaje jako stały punkt napływu z budżetem 5-10 zł dziennie, ocena po 90 dniach.
- Powyżej 2 000: test ma sens. Rachunek: 60 kliknięć w 3 tygodnie przy klikalności reklamy 4-6% (szacunek) wymaga 1 000-1 500 wyświetleń, czyli ok. 2 000 lub więcej wyszukiwań miesięcznie.

**Bramka 1 - test reklamowy.** Minimum 60 kliknięć z fraz w dopasowaniu ścisłym lub do wyrażenia, najwyżej 28 dni, limit 250 EUR.
- Kwalifikowane zapytanie: istniejąca firma handlująca B2B (da się ją znaleźć po nazwie lub NIP), z podanym programem magazynowym i liczbą zamówień tygodniowo.
- GO dla kanału napływu PLAR Orders: co najmniej 3 kwalifikowane zapytania i co najmniej 1 rozmowa albo 1 komplet przesłanych zamówień. Rachunek: ok. 350 zł za zapytanie; nawet przy 1 kliencie na 5 zapytań koszt pozyskania (ok. 1 750 zł) mieści się w opłacie wdrożeniowej 4 900 zł.
- GO dla kodu samoobsługowego Lite: dopiero po dwóch krokach. Krok 1: 3 wpłaty od różnych, sprawdzalnych firm. Krok 2: 30 dni ręcznej obsługi; co najmniej 2 z 3 firm płacą za drugi miesiąc i każda kosztuje Cię najwyżej 20 minut tygodniowo po drugim tygodniu.
- Same adresy e-mail nigdy nie dają GO. Dają listę firm, do których oddzwaniasz; zgłosiły się same, więc to nie jest zimna sprzedaż. Obecna reguła w `verdict.ts` (5 zapisów na 50 kliknięć albo 2 wpłaty) pasuje do taniego produktu samoobsługowego, nie do hurtowni.
- NO-GO: 60 kliknięć, mniej niż 2 kwalifikowane zapytania i 0 wpłat. Dozwolona jedna poprawka (frazy albo nagłówek), jeśli raport wyszukiwanych haseł pokazuje złą intencję. Potem koniec reklam dla tej oferty.
- NO-GO z braku ruchu: nie da się zebrać 60 kliknięć w 28 dni. To w praktyce niezaliczone R4.

**Bramka 2 - kanał partnerski (90 dni, 1-2 h tygodniowo).**
- Dzień 30: rozmowa z obecnym klientem odbyta, 8-10 osobistych maili do firm wdrażających wysłanych, co najmniej 3 odpowiedzi.
- Dzień 90, GO: 1 podpisany płatny pilotaż lub klient z polecenia albo od partnera, albo 2 partnerów, z których każdy pokazał ofertę co najmniej 2 swoim klientom.
- NO-GO: 10 firm, mniej niż 2 rozmowy i 0 poleceń. Wtedy PLAR Orders zostaje aktywem z jednym klientem, a w styczniu wracasz do opcji B.
- Sufit: nie bierz kolejnego klienta, jeśli łączne wsparcie przekracza 4 h tygodniowo.

## Czego nie robic przez 30 dni

- Nie pisz kodu Lite (rejestracja, wgrywanie kartoteki, abonament w Stripe), niezależnie od liczby zapisów.
- Nie rozbudowuj "Sondy" i nie przygotowuj eksperymentów B ani C.
- Nie publikuj ceny 199 zł na plar.ai ani tam, gdzie zobaczy ją obecny klient lub partner.
- Nie obiecuj "konta w 14 dni" więcej niż 3 firmom.
- Nie puszczaj reklam przed Planerem słów kluczowych ani w okresie świątecznym.
- Nie dzwoń na zimno i nie wysyłaj masowych maili do hurtowni. Ta reguła zostaje.
- Nie podpisuj wyłączności ani umów dystrybucyjnych z partnerami; na start wystarczy mail z prowizją.
- Nie eksperymentuj na produkcyjnej instalacji obecnego klienta. Jedna referencja to cały Twój kapitał.
- Nie zaczynaj niczego w Shopify, IdoSell ani PUP i nie zamawiaj trzeciej rundy researchu.
- Nie dokładaj trzeciego frontu: pilotaż Agent Spend Governance z plar.ai odłóż. Skrót dowodów mówi, że agenci AI jeszcze realnie nie płacą.

## Najtansze dzialanie o najwiekszej wartosci informacyjnej

Jedna rozmowa z obecnym klientem (30-45 minut, 0 zł), cztery pytania:
1. Kto serwisuje Wasz program magazynowy i czy mnie tej firmie przedstawicie?
2. Które 2-3 znane Wam firmy przepisują zamówienia tak, jak Wy kiedyś?
3. Gdybyście szukali tego sami, co wpisalibyście w Google i kogo zapytalibyście o radę?
4. Czy wersja bez wdrożenia, za 199-399 zł, z samym plikiem CSV, by Wam wystarczyła?

Przed rozmową policz z kalendarza i poczty, ile godzin kosztował Cię ten klient w ostatnich 8 tygodniach. Te dwie rzeczy rozstrzygają więcej niż 100 EUR reklam: czy masz ciepłe wejście do partnera, czego kupujący naprawdę szuka, czy Lite ma sens i ilu klientów udźwigniesz. Zaraz potem 30 minut w Planerze słów kluczowych, które jest już w planie.

## Sprawdzone twierdzenia

Wykonałem 6 wyszukiwań; stron nie dało się otwierać, więc wyniki pochodzą ze streszczeń wyszukiwarki.

| Twierdzenie | Wynik | Źródło |
|---|---|---|
| InsERT sprzedaje przez sieć partnerów z poziomami i przyjmuje zgłoszenia przez formularz | Potwierdzone: Autoryzowani Partnerzy, Partnerzy, punkty serwisowe; rabaty rosną z zakupami; listy partnerów według województw | https://partnerzy.insert.com.pl/start/zostan_partnerem.html , https://www.insert.com.pl/siec_sprzedazy/lista_partnerow/slaskie.html |
| Ilu partnerów ma InsERT | Nieustalone. Jedyna liczba to "kilkuset" z 2015 r. | https://www.chip.pl/2015/10/insert-partnerem-roku-microsoft |
| Katalog "Rozwiązania partnerskie" InsERT jako miejsce na dodatek | Katalog istnieje; większość dodatków do Subiekta GT wymaga Sfery; dodatki importujące kosztują od 149 zł miesięcznie do 1 189 zł za licencję dożywotnią. Warunków wpisu dla firmy trzeciej nie znalazłem | https://www.insert.com.pl/dla_uzytkownikow/subiekt_gt/dodatki_rozszerzenia/rozwiazania_partnerskie.html |
| Comarch sprzedaje Optimę przez autoryzowanych partnerów z marżą | Częściowo: potwierdza to źródło wtórne; wysokości marży Comarch nie publikuje | https://kluczesoft.pl/wiedza/aplikacje/program-comarch-optima-cena |
| Poziom prowizji w polskich programach partnerskich | Fakturownia: 30% każdej opłaty abonamentowej; Shoper: dożywotnia prowizja dla wdrożeniowców, bez podanego procentu. Stawka dla partnera ERP zaproponowana przez sędziego to szacunek (liczbę usunięto z publicznego repozytorium) | https://fakturownia.pl/program-partnerski , https://www.shoper.pl/program-partnerski |
| Subiekt GT przyjmie zamówienie od klienta z pliku bez płatnej Sfery | Niepotwierdzone. Obietnica "plik dla Subiekta" w wersji chmurowej nadal nie ma pokrycia | brak źródła |
| Ordify: odczyt zamówień z maila od 279 zł miesięcznie | Niepotwierdzone ponownie (wyszukiwarka nie zwróciła strony Ordify). Zostaje liczbą z dossier | https://ordify.pl/ (wg dossier) |
| Zestaw "Sonda" i progi testu | Sprawdzone w repozytorium: ok. 1 900 linii; progi 50 kliknięć, 5 zapisów na 50, 2 wpłaty, limit 120 kliknięć | `project-2/sonda/src` |
