# Soczewka: pl-recurring-compliance (polskie i unijne obowiązki, które wracają co miesiąc / kwartał)

Data badania: 2026-11-26. Autor: researcher-agent (jedna soczewka z kilkunastu).

## WAŻNE: jak czytać ten dokument (ograniczenia badania)

1. **Badanie jest niepełne.** Plan zakładał 15-30 wyszukiwań. Wykonało się 7. Kolejne 4 zostały odrzucone przez system z komunikatem, że wspólny limit wyszukiwań dla całej tury (200, dzielony przez wszystkich agentów) jest wyczerpany. Nie obchodziłem tego limitu.
2. **Liczby pochodzą ze streszczeń wyników wyszukiwania** dla podanych stron. Samych stron nie dało się otworzyć (blokada sieci w tym środowisku). Każdą cenę trzeba przed decyzją potwierdzić, klikając w link.
3. Każde twierdzenie ma jedną z trzech etykiet:
   - **[liczba]** = liczba + link, pod którym ją widziałem,
   - **[fakt]** = zaobserwowany fakt + link,
   - **[wniosek]** = moje rozumowanie, bez źródła. Moje własne oceny liczbowe oznaczam słowem **szacunek**.
4. Nie miałem narzędzia do wolumenów wyszukiwań. **Żadnego wolumenu fraz nie podaję.** Brama R4 (>= 1000 wyszukiwań/mies.) nie jest więc potwierdzona dla żadnego pomysłu. Potwierdzona jest tylko druga połowa R4 (czy w wynikach są strony sprzedażowe z cennikami).

## Werdykt

**Soczewka jest prawdziwa, ale dla tego założyciela w większości jest pułapką. Dwóch kandydatów przechodzi warunkowo, obaj z niską pewnością. Żaden nie jest gotowy do budowy bez dodatkowej weryfikacji.**

Co widać w danych:

- **Ludzie płacą już dziś** — w każdym z siedmiu sprawdzonych obszarów (KSeF, BDO, HACCP, system kaucyjny, GPSR, WCAG) znalazłem po 3-6 polskich dostawców z publicznymi cennikami. To zupełnie inna sytuacja niż disclosekit, gdzie transakcyjnych stron nie było wcale. [fakt, linki niżej]
- **Ale dolna półka cenowa jest już zajęta i bardzo tania.** Przykłady: generator księgi HACCP za 19 zł jednorazowo [liczba: https://karty-haccp.pl/], darmowa wtyczka KSeF do WooCommerce bez limitu faktur [fakt: https://fakturflow.com/pl/blog/integracja-ksef-z-woocommerce/], aplikacja BDO za 35 zł + VAT miesięcznie [liczba: https://bdomobile.com/], pakiet dla systemu kaucyjnego za 19,90 zł [liczba: https://kaucyjni.pl/cennik/].
- **Część tych narzędzi wygląda jak dokładnie to, co on sam by zbudował** (mały generator, jedna nisza, jedna domena — np. gpsrready.pl, karty-haccp.pl, ksef-woocommerce.pl). [wniosek] To znaczy, że "mały, skupiony tool obok dużych" nie jest już wolnym miejscem — inni już tam stoją.
- **W compliance kupuje się zaufanie i znajomość branży, nie kod.** Wygrywają marki prawników (Legal Geek, Kantorowski), doradców odpadowych (Ekohoryzont, rozliczeniabdo.pl) i dealerów kas fiskalnych (infokas.pl). Założyciel nie ma ani marki w tych branżach, ani kanału. [wniosek]
- **Najlepiej opłacana praca to usługa ręczna** (obsługa BDO 50-250 zł/mies., audyt WCAG 3000-7399 zł), a to łamie regułę pasywności. [liczby: https://rozliczeniabdo.pl/cennik-bdo/, https://wcag-audyt.pl/cennik/]

Dwa kierunki, które warto doweryfikować (kolejność = moja ocena):

1. **Most do KSeF dla platformy sprzedaży, która nie ma jeszcze dobrej integracji** (hipoteza wiodąca: Stripe). Popyt na integracje KSeF jest potwierdzony cennikami, ale to, czy istnieje wolna platforma, jest **niezweryfikowane**.
2. **Samoobsługowe BDO dla mikrofirm** (salony, warsztaty). Najlepiej udokumentowane "płacą dziś, co miesiąc", ale najsłabsze dopasowanie do założyciela.

Jeżeli inne soczewki dały kandydatów z potwierdzonym wolumenem i kanałem, to powinny wygrać z tą soczewką.

## Kandydaci

### 1. Most do KSeF dla niedoobsłużonej platformy sprzedaży (hipoteza wiodąca: Stripe -> KSeF)

Pewność: **niska** (popyt na kategorię potwierdzony; istnienie luki niepotwierdzone).

- **Dla kogo:** polskie firmy (JDG i sp. z o.o., czynni podatnicy VAT), które sprzedają innym firmom przez platformę bez wbudowanego KSeF. Hipoteza wiodąca: firmy pobierające płatności i subskrypcje przez Stripe (SaaS, kursy, usługi online). [wniosek]
- **Problem:** każda sprzedaż B2B musi skończyć się fakturą ustrukturyzowaną w KSeF. Platforma tego nie robi, więc ktoś przepisuje dane ręcznie albo skleja to kilkoma narzędziami. [wniosek]
- **Jak często:** przy każdej sprzedaży, czyli co tydzień lub codziennie. To potrzeba stała, nie jednorazowa. [wniosek]
- **Cena (R2: potrzeba stała -> abonament z progami liczby faktur):** szacunek 49 zł/mies. do 50 faktur, 99 zł/mies. do 300 faktur. Kotwice cenowe z rynku: aplikacje KSeF w Shopify od 7 USD (Sufio, 15 faktur) do 19,90 USD (Faktly, 100 faktur) oraz 17,99 USD (Fakturownia, inFakt) [liczby: https://kkdigital.pl/fakturowanie-w-shopify-ksef/]; Apilo Allegro-KSeF 35 zł netto/mies. do 100 zamówień [liczba: https://apilo.com/pl/integracje/allegro/ksef/]. Wersja darmowa wyłącznie jako demo na środowisku testowym KSeF albo 3 faktury łącznie (R3).
- **Kanał dystrybucji:** sklep z aplikacjami danej platformy (tam kupujący przychodzą sami) + wyszukiwania typu "[platforma] KSeF". Dowód, że taki kanał niesie ten popyt: w Shopify App Store są już co najmniej 4 aplikacje fakturujące z KSeF [fakt: https://kkdigital.pl/fakturowanie-w-shopify-ksef/, https://apps.shopify.com/fakturownia-1]. **Niezweryfikowane:** czy w sklepie aplikacji Stripe jest już aplikacja KSeF i ilu polskich sprzedawców B2B w ogóle używa Stripe.
- **Konkurencja i ceny:**
  - Shopify: Fakturownia Integrator (plan darmowy z automatyczną wysyłką do KSeF) [fakt: https://apps.shopify.com/fakturownia-1]; Fakturownia i inFakt 17,99 USD; Faktly darmowy do 3 faktur/mies., potem od 19,90 USD; Sufio od 7 USD [liczby: https://kkdigital.pl/fakturowanie-w-shopify-ksef/]. **Shopify jest już zajęty.**
  - WooCommerce: ByteWave (darmowa w WordPress.org, Pro od 69 zł netto/rok) [liczba: https://ksef-woocommerce.pl/ oraz https://bytewave.pl/blog/top-wtyczki-ksef-woocommerce-2026/]; FakturFlow (darmowa, bez limitu) [fakt: https://fakturflow.com/pl/blog/integracja-ksef-z-woocommerce/]; WP Desk Flexible Invoices ok. 199-229 PLN/rok [liczba: zestawienia z wyników, m.in. https://bytewave.pl/blog/top-wtyczki-ksef-woocommerce-2026/ i https://www.wpdesk.pl/blog/integracja-ksef-automatyczna-wysylka-faktur-bez-systemu-ksiegowego/ — streszczenie nie przypisało kwoty do jednej strony]. **WooCommerce jest zajęty i częściowo darmowy.**
  - Allegro: Apilo 35 zł netto/mies. [liczba: https://apilo.com/pl/integracje/allegro/ksef/]. **Zajęte.**
  - Etsy: Sellasist oznacza integrację KSeF-Etsy jako "WKRÓTCE" [fakt: https://sellasist.pl/integracja/ksef/etsy]; iFirma deklaruje obsługę zamówień z Etsy z fakturowaniem KSeF [fakt: https://www.ifirma.pl/ecommerce/]. To jedyna **potwierdzona** luka, ale moim zdaniem mała (patrz odrzucone).
  - Stripe: **nie udało się sprawdzić** (wyszukiwanie odrzucone przez limit).
  - Słabość dużych graczy (Fakturownia ok. 1188 PLN wg jednego zestawienia, wFirma 30 zł/mies.) [liczby: zestawienia z wyników, m.in. https://kcmobile.pl/baza-wiedzy/ecommerce/ile-kosztuje-faktury-dla-sklepu-online/ — do potwierdzenia]: to pełne programy do faktur; ktoś, kto chce tylko "sprzedaż z platformy X ląduje w KSeF", musi wdrożyć cały program. [wniosek]
- **Dowody popytu z linkami:**
  - Istnieje ranking "TOP 5 wtyczek KSeF dla WooCommerce 2026" i osobna domena produktowa ksef-woocommerce.pl — czyli wyniki wyszukiwania są sprzedażowe, nie tylko poradnikowe [fakt: https://bytewave.pl/blog/top-wtyczki-ksef-woocommerce-2026/, https://ksef-woocommerce.pl/].
  - Płatne aplikacje KSeF w Shopify App Store w cenach 7-19,90 USD/mies. [liczby: https://kkdigital.pl/fakturowanie-w-shopify-ksef/].
  - Wdrożenia na zlecenie: konfiguracja w sklepie od 1000 zł netto, integracja z ERP 5-30 tys. zł [liczby: https://dawidweb.com/blog/cennik-integracji-wdrozen-sklep-internetowy/ i inne zestawienia z wyników — do potwierdzenia].
  - Kalendarz: wg stron z wyników KSeF obowiązuje dużych podatników od 1 lutego 2026, pozostałych od 1 kwietnia 2026, a wyjątek dla sprzedawców z fakturami do 10 000 zł brutto miesięcznie kończy się z końcem 2026 — od 1 stycznia 2027 wchodzi ostatnia fala [fakt: streszczenie wyników dla zapytania o KSeF i WooCommerce, m.in. https://bytewave.pl/blog/ksef-dla-woocommerce-przewodnik/ — streszczenie nie wskazało dokładnej strony; daty do potwierdzenia]. Uwaga: to jest termin, a termin sam w sobie NIE jest popytem. Tu popyt potwierdzają cenniki, nie termin.
- **Dlaczego nie ChatGPT:** ChatGPT nie wyśle faktury do państwowego systemu, nie odbierze numeru KSeF ani potwierdzenia, nie zrobi tego automatycznie przy każdej płatności. To integracja działająca bez nadzoru, czyli twardy powód z reguły substytucji. [wniosek]
- **Ryzyko:**
  - **Największe: luki może nie być.** Jeśli Fakturownia / inFakt / wFirma już dobrze łączą Stripe z KSeF, pomysł jest martwy. Niesprawdzone.
  - To narzędzie krytyczne podatkowo: błędna stawka VAT, zwroty (faktury korygujące), waluty, awarie KSeF. Każdy błąd = zgłoszenie od klienta. To grozi przekroczeniem 2-4 h/tydz. [wniosek]
  - Przechowywanie tokenów KSeF klientów (dają prawo wystawiania faktur w ich imieniu) = poważna odpowiedzialność za bezpieczeństwo. [wniosek]
  - Zmiany schematu faktury lub API KSeF wymuszają prace w terminach narzuconych przez państwo. [wniosek]
  - Mały rynek: Stripe w Polsce to nisza w porównaniu z Przelewy24/PayU. Liczby nie znam. [wniosek]
  - Do 1 stycznia 2027 (5 tygodni) nie da się zbudować i przejść recenzji sklepu z aplikacjami. Fala styczniowa przepadnie; zostaje popyt stały.
- **Dopasowanie do założyciela:** wysokie. Ma działający Stripe, webhooki Stripe, Cloudflare Workers; sam jest spółką z o.o. fakturującą B2B, więc może być pierwszym użytkownikiem. To ten sam typ pracy co PLAR Orders (dane z jednego systemu -> walidacja -> zapis w drugim). [wniosek]
- **Zakres v1 (szacunek 12-18 dni pracy z agentem AI):** webhook Stripe (opłacona faktura / płatność) -> mapowanie na fakturę ustrukturyzowaną -> wysyłka do KSeF -> zapis numeru KSeF z powrotem w Stripe + e-mail z PDF. Korekty przy zwrotach w v1.1. Plus jednorazowy przegląd mapowania przez księgową.
- **Ocena R4:** **przechodzi warunkowo.** Potwierdzone: transakcyjne wyniki i płacący klienci dla kategorii "integracja KSeF z platformą" (cenniki wyżej). Niepotwierdzone: wolumen fraz, a przede wszystkim istnienie wolnej platformy. 
- **Tani test, zanim powstanie kod (R1):**
  1. Jedno popołudnie: sprawdzić sklep aplikacji Stripe pod hasłem "KSeF" oraz wyniki Google dla "Stripe KSeF". **Kryterium śmierci:** 2 lub więcej działających rozwiązań poniżej 50 zł/mies. albo funkcja wbudowana w Fakturownię/inFakt.
  2. Jeśli żyje: landing "Faktury ze Stripe prosto do KSeF" + płatna przedsprzedaż przez Stripe + ok. 100 EUR w Google Ads na frazy z "stripe ksef". Próg (szacunek): 3 płatne przedpłaty w 14 dni. Zero przedpłat = koniec.

### 2. BDO na autopilocie dla mikrofirm (salony, barberzy, warsztaty, gabinety)

Pewność: **niska** (popyt i płacenie potwierdzone najlepiej z całej soczewki; słabe dopasowanie, niska półka cenowa już zajęta).

- **Dla kogo:** mikrofirmy wytwarzające odpady, które muszą prowadzić ewidencję w BDO: salony kosmetyczne, barberzy, tatuaż, warsztaty samochodowe, gabinety. Dowód, że ta grupa jest adresowana: osobna strona "BDO dla barbera" u usługodawcy [fakt: https://rozliczeniabdo.pl/bdo-dla-barbera-obowiazek-nie-wybor-obsluga-bdo/].
- **Problem:** właściciel nie rozumie systemu BDO, boi się kary, a ma w nim do zrobienia kilka powtarzalnych rzeczy: karty przekazania odpadów (KPO), karty ewidencji (KEO), sprawozdanie roczne. Dziś albo płaci firmie zewnętrznej, albo tego nie robi. [wniosek + cenniki niżej]
- **Jak często:** mniej więcej raz w miesiącu (pakiet "Mikro" jednego z usługodawców jest liczony jako 12 KPO w roku [liczba: https://rozliczeniabdo.pl/cennik-bdo/]) + raz w roku sprawozdanie.
- **Cena (R2: potrzeba miesięczna, ale mała -> abonament roczny):** szacunek 199-249 zł/rok (bez planu darmowego; demo na przykładowych danych). Kotwice: BDO mobile 35 zł + VAT/mies. za 20 kart albo 180 zł + VAT/rok za 120 kart [liczby: https://bdomobile.com/]; usługa ręczna od 50 zł/mies. [liczba: https://rozliczeniabdo.pl/cennik-bdo/].
- **Kanał dystrybucji:** wyszukiwania "BDO dla [zawód]", "obsługa BDO cena", "sprawozdanie BDO" (SEO na długim ogonie + test w Google Ads). **Słabość:** nowa domena w SEO rusza miesiącami (disclosekit: 1 wizyta organiczna w 30 dni), a w Ads licytują firmy usługowe, które zarabiają na kliencie 150-250 zł/mies., czyli stać je na droższe kliknięcie niż narzędzie za ok. 20 zł/mies. [wniosek] Wolumenów nie znam.
- **Konkurencja i ceny:**
  - Programy: RLGSOFT 29 zł/mies. (25 kart), 79 zł (200 kart), 194 zł (1000 kart) [liczby: https://rlgsoft.pl/] — inne źródło podaje od 199 zł/mies., więc cennik do potwierdzenia [fakt: https://www.zeme.com.pl/artykuly/narzedzia-do-obslugi-bdo]; BDO manager 25-35 zł/mies. [liczba: https://www.zeme.com.pl/artykuly/narzedzia-do-obslugi-bdo]; BDO mobile 35 zł + VAT/mies. lub 180 zł + VAT/rok [liczby: https://bdomobile.com/]; ZEME 360 darmowy w wersji bazowej [fakt: https://www.zeme.com.pl/artykuly/narzedzia-do-obslugi-bdo]; EBDO i BDO KPO Exporter od ok. 180 zł za moduł rocznie, wymagają instalacji na komputerze [liczba: https://www.zeme.com.pl/artykuly/narzedzia-do-obslugi-bdo].
  - Usługi ręczne: rozliczeniabdo.pl 50 / 150 / 250 zł/mies. [liczby: https://rozliczeniabdo.pl/cennik-bdo/]; Ekohoryzont od 250 zł netto/mies., rejestracja 400 zł netto, sprawozdanie roczne od 400 zł [liczby: https://www.ekohoryzont.com/blog/ile-kosztuje-obsluga-bdo.html]; BDOPro360 od 150 zł netto/mies. [liczba: https://bdopro360.pl/uslugi/obsluga-bdo/]; PW Chełm 200 zł netto/mies. [liczba: https://pwchelm.pl/bdo/].
  - Gdzie są słabi: programy wyglądają na robione dla firm z dużą liczbą kart (progi 200-1000 kart), a nie dla salonu z 12 kartami rocznie; usługi są drogie w stosunku do ilości pracy. **To mój wniosek z cenników — opinii użytkowników nie udało się sprawdzić.**
- **Dowody popytu z linkami:** co najmniej 5 programów i 4 usługodawców z publicznymi cennikami (linki wyżej) — wyniki wyszukiwania dla "program do BDO cennik" były w całości sprzedażowe [fakt]. Ludzie płacą 600-3000 zł rocznie za obsługę ręczną [liczby przeliczone z cenników miesięcznych wyżej: 50 zł x 12 = 600 zł; 250 zł x 12 = 3000 zł].
- **Dlaczego nie ChatGPT:** ChatGPT wytłumaczy, czym jest BDO, ale nie zaloguje się do systemu, nie potwierdzi karty, nie poprowadzi ewidencji i nie przypomni o terminie. Warunek: narzędzie musi być podłączone do BDO przez oficjalne API. **Zakres tego API jest niezweryfikowany w tym badaniu** (wiem o nim z wiedzy ogólnej, nie ze źródła). Jeśli narzędzie byłoby tylko "poradnikiem krok po kroku", to ChatGPT + film na YouTube wystarczą i pomysł umiera. [wniosek]
- **Ryzyko:**
  - **Największe: brak wiedzy branżowej i brak dojścia do kupujących.** Fryzjer i mechanik nie szukają narzędzi SaaS; kupują od kogoś, komu ufają, albo wcale. [wniosek]
  - Pytania klientów "jaki kod odpadu?" to w praktyce doradztwo — nie jest to zawód regulowany jak doradca podatkowy [wniosek], ale błędy grożą karami dla klienta i pretensjami do dostawcy.
  - Dolna półka cenowa (25-35 zł/mies.) już zajęta przez działające aplikacje.
  - Szczyt obsługi klienta styczeń-marzec (sprawozdania) — sezonowe przekroczenie 2-4 h/tydz. [wniosek]
- **Dopasowanie do założyciela:** niskie. Stos techniczny pasuje, ale nie zna branży odpadowej i nie ma kanału do mikrofirm usługowych.
- **Zakres v1 (szacunek 10-15 dni):** podłączenie konta BDO klienta przez klucze API, lista kart do potwierdzenia jednym kliknięciem, automatyczna ewidencja, przypomnienia e-mail, szkic liczb do sprawozdania rocznego. Plus płatna konsultacja z praktykiem BDO.
- **Ocena R4:** **przechodzi w połowie.** Potwierdzone: strony sprzedażowe i płacący klienci (9+ cenników). Niepotwierdzone: wolumen fraz i koszt kliknięcia.
- **Tani test, zanim powstanie kod (R1):** sezon sprawozdań BDO zaczyna się w styczniu (sprawozdanie roczne jest płatną usługą "od 400 zł" [liczba: https://www.ekohoryzont.com/blog/ile-kosztuje-obsluga-bdo.html]). Landing "Sprawozdanie BDO dla salonu/warsztatu — kreator za 99 zł" + Stripe + ok. 100 EUR Google Ads w styczniu-lutym 2027. Próg (szacunek): 5 płatności. Jeśli koszt pozyskania jednej płatności przekracza roczny przychód z klienta — koniec. Ten test sprawdza jednocześnie cenę kliknięcia i chęć płacenia za samoobsługę zamiast usługi.

## Odrzucone pomysly i dlaczego

Z dowodami z tego badania:

1. **Kolejna wtyczka KSeF do WooCommerce.** Są darmowe (FakturFlow bez limitu faktur [fakt: https://fakturflow.com/pl/blog/integracja-ksef-z-woocommerce/]; ByteWave darmowa, Pro od 69 zł netto/rok [liczba: https://ksef-woocommerce.pl/]). Dolna cena to zero. Nie ma czym wygrać.
2. **Aplikacja KSeF do Shopify.** Kanał dobry (sklep z aplikacjami), ale stoją tam już 4 aplikacje, w tym darmowy plan znanej marki Fakturownia [fakt: https://apps.shopify.com/fakturownia-1, https://kkdigital.pl/fakturowanie-w-shopify-ksef/].
3. **KSeF dla sprzedawców Etsy.** Luka potwierdzona (Sellasist: "WKRÓTCE" [fakt: https://sellasist.pl/integracja/ksef/etsy]), ale sprzedawcy Etsy sprzedają głównie konsumentom za granicą, a obowiązek KSeF dotyczy faktur dla firm — więc faktur B2B jest tam mało [wniosek, niezweryfikowany]. Etsy nie ma też sklepu z aplikacjami, który sam przyprowadzi kupujących. iFirma już deklaruje obsługę [fakt: https://www.ifirma.pl/ecommerce/].
4. **Generator dokumentacji HACCP / elektroniczny dziennik HACCP.** Dokumentacja to potrzeba jednorazowa i jest sprzedawana za 19 zł [liczba: https://karty-haccp.pl/] lub od 199 zł [liczba: https://www.gastrotarcza.pl/]. Aplikacje abonamentowe już są: Atesto od 19,99 zł/mies. [liczba: https://atesto24.pl/blog/haccp-w-gastronomii/], Gastro Menadżer moduł HACCP 39 zł netto/mies. [liczba: https://gastromenadzer.pl/haccp-w-gastronomii]. Codzienne zapisy temperatur konkurują z kartką papieru (darmową). Restauratorów nie da się pozyskać bez sprzedaży bezpośredniej. [wniosek]
5. **Narzędzie do systemu kaucyjnego dla małych sklepów.** Istnieje (kaucyjni.pl: 19,90 zł i 59,90 zł z umową na 12 miesięcy [liczby: https://kaucyjni.pl/cennik/ — okres rozliczeniowy do potwierdzenia]). Prawdziwa wartość wymaga integracji z kasą (450 zł netto za stanowisko lub 200 zł netto za moduł [liczby: https://kaucyjni.pl/cennik/]) i instalacji u klienta (200 zł netto + dojazd [liczba: https://www.infokas.pl/kauc.html]). To kanał dealerów kas, nie internetowy. Łamie regułę budowy i dystrybucji.
6. **Generator dokumentów GPSR.** To dokładnie wzorzec disclosekit: potrzeba w zasadzie jednorazowa, dokument-szablon, silne marki prawników (Legal Geek 119 zł oraz pakiety 399 i 799 zł netto/rok [liczby: https://kreator.legalgeek.pl/cennik/]; Kantorowski 29-49 zł/mies. [liczby: https://generator.kantorowskiglab.pl/]) i gotowy klon mikro-narzędzia (GPSRReady 390 zł jednorazowo [liczba: https://gpsrready.pl/en]). Szablony są nawet na Allegro [fakt: https://allegro.pl/oferta/gpsr-informacje-o-bezpieczenstwie-produktu-wzory-dla-elektroniki-17265495093].
7. **Widget dostępności WCAG / EAA.** Tłok: Grafiduo 199-899 zł netto/rok [liczby: https://grafiduo.pl/pl/produkty/widget-dostepnosci-wcag-dla-wordpress/], WCAG Widget 699-1299 zł/rok z planem darmowym [liczby: https://wcagwidget.pl/], accessMate 990-1290 zł netto jednorazowo [liczby: https://ks.pl/accessmate], DockWCAG darmowy do 5000 odsłon/mies. [liczba: https://wcag.dock.codes/pl/narzedzia/widzet-dostepnosci/]. Sami sprzedawcy przyznają, że widget nie zastępuje audytu [fakt: https://grafiduo.pl/pl/produkty/widget-dostepnosci-wcag-dla-wordpress/]. Prawdziwe pieniądze są w audytach (499-7399 zł netto [liczby: https://wcag-audyt.pl/cennik/]), a audyt to praca ręczna. Mikrofirmy usługowe są wg mojej wiedzy w dużej części zwolnione z EAA [wniosek, niezweryfikowany w tym badaniu].
8. **Obsługa BDO jako usługa ("zrobimy to za Ciebie").** Najlepiej płatne (50-250 zł/mies. [liczby: https://rozliczeniabdo.pl/cennik-bdo/]), ale to ręczna praca i odpowiedzialność za cudze sprawozdania. Łamie regułę pasywności.

Odrzucone z samych reguł, **bez sprawdzenia w sieci** (limit wyszukiwań; traktować jako wstępne):

9. **Platforma dla sygnalistów.** Obowiązek dotyczy większych pracodawców, nie mikrofirm; sprzedaż idzie przez kancelarie i kontakt bezpośredni. [wniosek]
10. **CBAM, DAC7, JPK_CIT, ceny transferowe.** Większe firmy, ciężkie doradztwo, blisko regulowanego doradztwa podatkowego. [wniosek]
11. **Szkolenia BHP / RODO online.** Wymagają uprawnionego organizatora i specjalisty podpisującego zaświadczenia; rynek kursów zatłoczony. [wniosek]
12. **Kasa fiskalna / kasa wirtualna / e-paragony.** Certyfikacja urzędowa i kanał dealerski. [wniosek]
13. **Tachografy, pakiet mobilności, SENT.** Ciężkie oprogramowanie branżowe, duzi gracze, dużo wsparcia. [wniosek]
14. **PPK, ZUS/PUE.** Robią to programy kadrowo-płacowe i biura rachunkowe; mikrofirma nie kupuje osobnego narzędzia. [wniosek]
15. **Rejestry RODO, CRBR, założenie e-Doręczeń.** Potrzeby jednorazowe; darmowe narzędzia urzędowe. Ten sam błąd co disclosekit. [wniosek]

## Hipotezy niezweryfikowane (nie odrzucone — do sprawdzenia, gdy wróci limit wyszukiwań)

Tych pomysłów nie zdążyłem sprawdzić. Nie mam dla nich żadnego dowodu z tego badania. Zapisuję je, żeby nie zginęły:

- **Stripe -> KSeF** — kluczowe dla kandydata nr 1. Do sprawdzenia: sklep aplikacji Stripe, wyniki dla "Stripe KSeF", integracje Stripe w Fakturowni / inFakt / wFirma.
- **KSeF dla PrestaShop / Shoper / innych platform z własnym sklepem aplikacji** — czy są luki i jakie są ceny modułów.
- **VAT-9M dla gospodarzy Booking/Airbnb** (co miesiąc, import usług). Uwaga: przygotowywanie deklaracji za kogoś jest blisko regulowanego doradztwa podatkowego.
- **Raport OSS (kwartalny) dla małych sklepów sprzedających do UE** z eksportów Shopify/WooCommerce/Etsy.
- **Sprawozdanie o opakowaniach / opłata produktowa dla sklepów internetowych** (BDO, raz w roku).
- **Opłaty za korzystanie ze środowiska / sprawozdania roczne dla firm z autami** (raz w roku).
- **Kaucja jako pozycja w koszyku WooCommerce** dla sklepów spożywczych online.
- **Wąskie narzędzie do BDO w przeglądarce** (eksport kart do Excela, zbiorcze potwierdzanie) — przesłanka: płatny BDO KPO Exporter wymaga instalacji na komputerze [fakt: https://www.zeme.com.pl/artykuly/narzedzia-do-obslugi-bdo].
- **E-fakturowanie w innych krajach UE** (Niemcy, Belgia) — poza polską soczewką, ale ten sam mechanizm co KSeF.

## Wniosek dla mentora (jedno zdanie)

W polskim compliance popyt jest prawdziwy i płatny, ale prawie każdą oczywistą niszę ktoś już obsadził tanim narzędziem; jedyna przewaga, jaką ten założyciel tu ma, to **integracje między systemami** (Stripe, KSeF, Arkusze Google), a nie generatory dokumentów — dlatego kandydat nr 1 jest wart jednego popołudnia weryfikacji, a reszta soczewki nie.

## Zrodla

Wszystkie poniższe adresy pojawiły się w wynikach wyszukiwania tego badania (2026-11-26). Treść znam ze streszczeń wyników, nie z otwartych stron.

KSeF i e-commerce:
- https://www.wpdesk.pl/blog/integracja-ksef-automatyczna-wysylka-faktur-bez-systemu-ksiegowego/
- https://studiokalmus.com/ksef-woocommerce
- https://bytewave.pl/blog/top-wtyczki-ksef-woocommerce-2026/
- https://bytewave.pl/blog/ksef-dla-woocommerce-przewodnik/
- https://ksef-woocommerce.pl/
- https://fakturflow.com/pl/blog/integracja-ksef-z-woocommerce/
- https://dawidweb.com/blog/cennik-integracji-wdrozen-sklep-internetowy/
- https://kcmobile.pl/baza-wiedzy/ecommerce/ile-kosztuje-faktury-dla-sklepu-online/
- https://weblymate.com/ksef-i-woocommerce-jak-wysylac-faktury-do-krajowego-systemu-e-faktur-ze-sklepu-internetowego/
- https://kkdigital.pl/fakturowanie-w-shopify-ksef/
- https://apps.shopify.com/fakturownia-1
- https://apilo.com/pl/integracje/allegro/ksef/
- https://sellasist.pl/integracja/ksef/etsy
- https://www.ifirma.pl/ecommerce/
- https://kluczesoft.pl/ksef-a-sklep-internetowy-allegro-shopify-prestashop-integracja-2026.htm
- https://ksef-dla.pl/sklepy/
- https://2cw.pl/development/integracje-z-ksef/

BDO:
- https://rozliczeniabdo.pl/cennik-bdo/
- https://rozliczeniabdo.pl/bdo-obsluga-dla-firm/
- https://rozliczeniabdo.pl/bdo-dla-barbera-obowiazek-nie-wybor-obsluga-bdo/
- https://www.ekohoryzont.com/ewidencja-bdo/
- https://www.ekohoryzont.com/blog/ile-kosztuje-obsluga-bdo.html
- https://rlgsoft.pl/
- https://bdopro360.pl/uslugi/obsluga-bdo/
- https://www.zeme.com.pl/artykuly/narzedzia-do-obslugi-bdo
- https://bdomobile.com/
- https://pwchelm.pl/bdo/

HACCP:
- https://atesto24.pl/blog/haccp-w-gastronomii/
- https://karty-haccp.pl/
- https://www.gastrotarcza.pl/
- https://gastromenadzer.pl/haccp-w-gastronomii
- https://gastromenadzer.pl/program-dla-gastronomii
- https://ksiegahaccp.pl/cennik/

System kaucyjny:
- https://kaucyjni.pl/dla-sklepu/
- https://kaucyjni.pl/cennik/
- https://www.infokas.pl/kauc.html
- https://www.maasloop.com/baza-wiedzy/system-kaucyjny/system-kaucyjny-w-malym-sklepie-finanse-rozliczenia-i-oplacalnosc
- https://www.maasloop.com/system-kaucyjny-w-malym-sklepie-kluczowe-zasady-i-pierwsze-kroki
- https://doradca.lublin.pl/publikacje/prawo-cywilne-i-gospodarcze/system-kaucyjny-2025-obowiazki-sklepow-detal-hurt

GPSR:
- https://kreator.legalgeek.pl/cennik/
- https://kreator.legalgeek.pl/
- https://generator.kantorowskiglab.pl/
- https://gpsrready.pl/en
- https://marszalstudio.pl/gpsr-rozporzadzenie-zdjecia-produktowe-2026/
- https://allegro.pl/oferta/gpsr-informacje-o-bezpieczenstwie-produktu-wzory-dla-elektroniki-17265495093

WCAG / EAA:
- https://ks.pl/accessmate
- https://grafiduo.pl/pl/produkty/widget-dostepnosci-wcag-dla-wordpress/
- https://wcagwidget.pl/
- https://wcag.dock.codes/pl/narzedzia/widzet-dostepnosci/
- https://wcag-audyt.pl/cennik/
- https://studio72.net/blog/strony-internetowe-dla-niewidomych-i-niedowidzacych-standard-wcag-2-1/
- https://cenauslug.pl/technologia-i-elektronika/audyt-dostepnosci-cyfrowej-wcag
