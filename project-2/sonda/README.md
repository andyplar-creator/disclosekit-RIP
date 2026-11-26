# Sonda

Zestaw do taniego testu chęci zapłaty (reguła R1 z `LESSONS.md`): strona z ofertą, formularz zgłoszenia firmy,
opcjonalna płatność, pomiar lejka i panel, który liczy werdykt z surowych wierszy.

Działa na Cloudflare Workers + D1. Koszt utrzymania: 0 zł na darmowym planie.

**Najpierw przeczytaj `../DECYZJA.md`.** Sonda jest narzędziem do jednego z trzech torów planu, i to nie głównego.

## Kolejność czytania

| Plik | Po co |
|---|---|
| `docs/01-BRAMKI.md` | Dwie darmowe bramki przed jakimkolwiek wdrożeniem i audyt przed reklamami. |
| `docs/02-WDROZENIE.md` | Wdrożenie krok po kroku dla osoby nietechnicznej. |
| `docs/03-REKLAMY.md` | Ustawienia kampanii Google Ads i zasady przerwania testu. |
| `docs/04-KANAL-PARTNERSKI.md` | Główny tor: polecenia i partnerzy wdrożeniowi, ze szkicami wiadomości. |

## Co jest w środku

- **Landing z konfiguracji** (`src/experiments/zamowienia-z-maila.ts`): treść, cennik, przykłady, progi.
  Miejsca wymagające Twojej decyzji mają słowo `DECYZJA`.
- **Formularz zgłoszenia firmy**: e-mail, firma, program magazynowy, liczba zamówień; opcjonalnie opis, NIP,
  telefon i prośba o fakturę pro forma. Sam adres e-mail nie jest przyjmowany. Ponowne wysłanie z tego samego
  adresu uzupełnia zgłoszenie; błąd w formularzu nie kasuje wpisanych danych.
- **Płatny pilotaż** dwiema drogami: faktura pro forma (działa zawsze) albo karta przez Stripe (opcjonalnie;
  bez kluczy Stripe przycisk się nie pokazuje). Stripe zbiera nazwę firmy, NIP i adres do faktury.
- **Trzy gotowe przykłady** odczytanych zamówień. Pole „wklej własną wiadomość" (Claude przez API Anthropic)
  jest wyłączone, dopóki sam go nie włączysz.
- **Pomiar bez ciasteczek**: wejścia, wejścia z reklam (po `gclid` lub `utm_medium=cpc`), frazy, roboty.
- **Panel `/admin`**: lejek, ocena zgłoszeń, poprawianie źródła, wykluczanie własnych płatności, usuwanie
  zgłoszeń, przycisk „Zacznij liczyć od teraz", koszt z Google Ads, werdykt, surowe wiersze, eksport CSV.
- **Autotest `/admin/selftest`**: sprawdza bazę, zapis i odczyt zgłoszenia, jednostki czasu, sekrety, Stripe,
  adres strony i to, czy adres kontaktowy ma skrzynkę.

## Jak liczony jest werdykt

Plik `src/lib/verdict.ts`, czysta funkcja z testami.

| Stan | Kiedy |
|---|---|
| Brak danych / Zbieram dane | Poniżej 60 wejść z reklam panel nie mówi nic. |
| **GO** | 1 opłacony pilotaż od firmy z reklamy (karta albo ocena „zapłaciła") **lub** 3 zgłoszenia z reklam ocenione jako prawdziwe firmy, z których co najmniej jedno przysłało dane albo odbyło rozmowę. |
| Nierozstrzygnięte | Między 60 a 200 wejściami bez GO. Zero zgłoszeń przy takiej próbie niczego nie dowodzi. |
| Najpierw sprawdź i oceń | Liczby wskazują na NO-GO, ale coś czeka na człowieka: nieocenione zgłoszenie, firma albo płatność ze źródłem „inne", brak kliknięć wpisanych z Google Ads. |
| **NO-GO** | Dopiero po 200 wejściach potwierdzonych w Google Ads i przy najwyżej 1 prawdziwej firmie. |

- Liczy się tylko płatny ruch, płatności od firm z reklam i zgłoszenia, które **sam ocenisz** w panelu.
  Sam adres e-mail nigdy nie daje GO.
- Do progów panel bierze mniejszą z dwóch liczb: własnego licznika wejść i kliknięć wpisanych z Google Ads.
  Własny licznik da się sztucznie napompować, liczb z Google nie.
- Wejścia, zgłoszenia i płatności zalogowanego właściciela nie wchodzą do lejka.
- NO-GO dotyczy reklam jako kanału, nie produktu.
- Werdykt to podpowiedź stojąca obok surowych wierszy, nie wyrok.

## Polecenia

| Polecenie | Co robi |
|---|---|
| `npm install` | Instaluje zależności. |
| `npm run check` | Typy + 89 testów + próbne wdrożenie na sucho. |
| `npm run dev` | Serwer lokalny na porcie 8787. |
| `npm run db:migrate:local` | Schemat w lokalnej bazie. |
| `npm run db:migrate:remote` | Schemat w bazie produkcyjnej. |
| `npm run deploy` | Wdrożenie. |

Testy integracyjne uruchamiają dwa prawdziwe Workery (jeden w pełni skonfigurowany, drugi „goły": bez migracji,
bez Stripe i z niepubliczną stroną) oraz atrapy Stripe i API Anthropic, więc przechodzą bez żadnych kluczy.

## Jak uruchomić, zatrzymać i dodać eksperyment

- Uruchomienie: dopisz slug do `LIVE_EXPERIMENTS` w `wrangler.jsonc` i wdróż (krok 10 w `docs/02-WDROZENIE.md`).
- Zatrzymanie: najpierw wstrzymaj reklamy, potem usuń slug i wdróż. Dane zostają.
- Nowy eksperyment: skopiuj plik z `src/experiments/`, zmień treść i dopisz go w `src/experiments/index.ts`.
  Zanim to zrobisz, przeprowadź pomysł przez bramkę słów kluczowych. Zakres zestawu jest celowo zamrożony:
  sędziowie uznali, że i tak urósł ponad „jeden wieczór" z reguły R1.

## Czego Sonda nie robi

- Nie wystawia faktur (także KSeF). Wpłaty fakturujesz sam.
- Nie wysyła e-maili. Na zgłoszenia odpowiadasz ze swojej skrzynki.
- Nie odpowiada na pytanie o wolumen wyszukiwań. To robi Planer słów kluczowych.
- Nie zawiera kodu PLAR Orders. Strona sprzedaje istniejącą usługę, którą dostarczasz tak jak dotąd.

## Ograniczenia, o których warto wiedzieć

- Identyfikator odwiedzającego zmienia się co dobę i zależy od adresu IP, więc ta sama osoba wracająca
  następnego dnia albo z innej sieci liczy się drugi raz.
- Z tego samego powodu firma, która kliknęła reklamę w poniedziałek, a formularz wysłała w środę albo z innego
  urządzenia, dostanie źródło „inne". Sonda nie używa ciasteczek, więc tego nie naprawi. Dlatego źródło poprawiasz
  ręcznie w panelu, a panel nie ogłasza NO-GO, dopóki istnieją prawdziwe firmy ze źródłem „inne".
- Powiadomienia o zgłoszeniach (`NOTIFY_WEBHOOK_URL`) nie były sprawdzane z prawdziwym odbiorcą.
- Wejście z reklamy rozpoznajemy po parametrach adresu. Jeśli szablon śledzenia w Google Ads jest źle ustawiony,
  panel pokaże zero wejść z reklam. Dlatego panel porównuje własne liczby z kliknięciami wpisanymi z Google.
- Strony prawne to szkice opisujące faktyczne działanie, nie porada prawna.
- Kod nie był wdrażany na Twoje konto Cloudflare ani łączony z prawdziwym Stripe: przeszedł testy lokalne
  i próbne wdrożenie na sucho.
