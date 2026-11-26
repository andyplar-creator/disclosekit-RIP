# Wdrożenie krok po kroku

Dla osoby nietechnicznej. Zarezerwuj 60–90 minut na pierwsze przejście (Miss #7: pierwsza konfiguracja zawsze
trwa 3–4 razy dłużej, niż się wydaje). Polecenia wpisujesz w terminalu, w katalogu `sonda`.

Kolejność ma znaczenie: strona staje się publiczna dopiero w kroku 10. Do tego czasu widzisz ją tylko Ty.

## 0. Najpierw prywatne repozytorium

To repozytorium (`disclosekit-RIP`) jest publiczne. Po uzupełnieniu plik `wrangler.jsonc` będzie zawierał
identyfikatory Twojego konta, a pliki decyzji opisują Twoją strategię. Przenieś projekt do repozytorium prywatnego:

1. GitHub → New repository → nazwa np. `plar-projekt-2` → **Private** → Create repository (bez README).
2. W terminalu, w katalogu, w którym leży folder `disclosekit-RIP`:

```bash
mkdir plar-projekt-2
cp -R disclosekit-RIP/project-2/. plar-projekt-2/
cp disclosekit-RIP/LESSONS.md plar-projekt-2/LESSONS-disclosekit.md
cd plar-projekt-2
git init -b main
git add .
git commit -m "Projekt 2: start"
git remote add origin https://github.com/TWOJ-LOGIN/plar-projekt-2.git
git push -u origin main
cd sonda
```

W miejsce `TWOJ-LOGIN` wpisz swoją nazwę użytkownika GitHub. Dalsze kroki wykonujesz już w nowym katalogu.
Plik `LESSONS-disclosekit.md` zabierasz ze sobą, bo instrukcje odwołują się do jego lekcji (Miss #7, #9, #11, #14).

## Co będzie potrzebne

- Konto Cloudflare (to samo, na którym stoi disclosekit). Koszt: 0 zł na darmowym planie.
- Node.js 22 lub nowszy. Sprawdzisz poleceniem `node -v`.
- Opcjonalnie: klucz Stripe (płatność kartą) i klucz Anthropic (demo na żywo). Na pierwszy test nie są potrzebne.

## 1. Instalacja i sprawdzenie, że wszystko działa lokalnie

```bash
npm install
npm run check
```

`npm run check` sprawdza typy, uruchamia 89 testów na prawdziwym serwerze lokalnym i robi próbne wdrożenie
„na sucho". Musi skończyć się bez błędów. Jeśli nie kończy, nie idź dalej.

Podgląd lokalny:

```bash
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

Otwórz `http://localhost:8787/admin`, zaloguj się hasłem z pliku `.dev.vars`, a potem wejdź na
`http://localhost:8787/zamowienia-z-maila`. Bez logowania zobaczysz 404, bo strona nie jest jeszcze publiczna.

Serwer lokalny zatrzymujesz klawiszami **Ctrl+C**. Zatrzymaj go, zanim pójdziesz dalej.
Po każdej zmianie w pliku `.dev.vars` trzeba go zatrzymać i uruchomić ponownie.

## 2. Baza danych

```bash
npx wrangler login
```

```bash
npx wrangler d1 create sonda_db --jurisdiction eu
```

Dopisek `--jurisdiction eu` trzyma dane w Unii Europejskiej. Jeśli polecenie zapyta, czy samo dopisać bazę
do pliku konfiguracji, odpowiedz **n** (nie). Skopiuj wypisany `database_id` i wklej go do `wrangler.jsonc`
w miejsce `REPLACE_WITH_YOUR_D1_DB_ID`. Potem:

```bash
npm run db:migrate:remote
```

Na pytanie, czy zastosować migrację, odpowiedz **y** (tak).

## 3. Ustawienia jawne (`wrangler.jsonc`, sekcja `vars`)

| Zmienna | Co wpisać |
|---|---|
| `SITE_URL` | Na razie zostaw. Uzupełnisz w kroku 5, gdy poznasz adres. |
| `CONTACT_EMAIL` | Prawdziwy, czytany adres. Autotest sprawdzi, czy domena przyjmuje pocztę. |
| `LIVE_EXPERIMENTS` | **Zostaw puste aż do kroku 10.** |
| `LIVE_PASTE_EXPERIMENTS` | Zostaw puste. To pole włącza „wklej własną wiadomość" (krok 9). |

## 4. Sekrety

Sekretów nie wpisujesz do żadnego pliku. Każde polecenie poniżej zapyta o wartość; wklej ją i naciśnij Enter.
Przy pierwszym sekrecie Wrangler zapyta, czy utworzyć Workera o nazwie `sonda`: odpowiedz **y**.

Hasło do panelu, co najmniej 24 znaki:

```bash
npx wrangler secret put ADMIN_TOKEN
```

Losowy ciąg do liczenia odwiedzin, co najmniej 16 znaków:

```bash
npx wrangler secret put VISITOR_SALT
```

Losowy ciąg wygenerujesz poleceniem `openssl rand -base64 32`. Hasło do panelu zapisz w menedżerze haseł.

Opcjonalnie: powiadomienie o nowym zgłoszeniu. Strona obiecuje odpowiedź w 2 dni robocze, więc musisz się
o zgłoszeniu dowiedzieć. Jeśli masz adres webhooka, który przyjmuje JSON z polem `text` (np. Slack Incoming
Webhook), ustaw go tak:

```bash
npx wrangler secret put NOTIFY_WEBHOOK_URL
```

Powiadomienie nie zawiera danych osobowych, tylko informację „jest nowe zgłoszenie" i link do panelu.
Nie testowałem go z prawdziwym Slackiem, więc sprawdź w bramce 1, czy dochodzi. Bez powiadomień po prostu
zaglądaj do panelu raz dziennie.

## 5. Pierwsze wdrożenie

```bash
npm run deploy
```

Wrangler wypisze adres w rodzaju `https://sonda.twoja-nazwa.workers.dev`. Wpisz go do `SITE_URL`
w `wrangler.jsonc` dokładnie w tej postaci, bez ukośnika na końcu, i wdróż ponownie (`npm run deploy`).

Otwórz `adres/admin`, zaloguj się i wejdź w **Autotest**. Popraw wszystko, co ma oznaczenie BŁĄD.
Wiersze z oznaczeniem UWAGA przeczytaj: często opisują poprawny stan (np. „żaden eksperyment nie jest publiczny").

## 6. Przeczytaj i popraw treść

Plik `src/experiments/zamowienia-z-maila.ts`. Na jego początku jest lista: co przeniosłem z plar.ai/orders,
a co jest **nową obietnicą**, której na Twojej stronie nie ma. Każde takie miejsce ma słowo `DECYZJA`:

- cytat z referencji (zgoda klienta na użycie w tym miejscu),
- odpowiedzi w sekcji pytań (złożyłem je z innych zdań Twojej strony; wpisz własne),
- lista „co się stanie po wysłaniu", w tym darmowe przerobienie 5 przykładowych zamówień,
- termin odpowiedzi 2 dni robocze (plar.ai/orders mówi: 1 dzień roboczy),
- płatny pilotaż 30 dni, jego cena (pole `amountGrossMinor`, kwota brutto w groszach) i warunki zwrotu;
  jeśli nie chcesz pilotażu, usuń cały blok `pilot` oraz pole `invoiceCheckbox`,
- trzy przykłady w sekcji demo (wymyślone wiadomości, wyniki przygotowane ręcznie),
- link do nagrania panelu, gdy je zrobisz.

Przeczytaj też `src/pages/legal.ts` (polityka prywatności i regulamin płatnego pilotażu). To szkice opisujące,
co system faktycznie robi, a nie porada prawna. Zasady zwrotu w regulaminie i na stronie muszą być takie same.

Po zmianach: `npm run check`, potem `npm run deploy`.

## 7. Własna domena (opcjonalnie, zalecane przed reklamami)

Panel Cloudflare → Workers & Pages → sonda → Settings → Domains & Routes → Add → Custom domain,
np. `zamowienia.plar.ai`. Domena musi być w tym samym koncie Cloudflare. Potem zmień `SITE_URL` i wdróż ponownie.
Jeśli masz już webhook Stripe, zmień także jego adres.

## 8. Płatność kartą przez Stripe (opcjonalnie)

Bez Stripe strona też przyjmuje zamówienia pilotażu: formularz ma pole „faktura pro forma". Wystawiasz fakturę,
a gdy firma zapłaci przelewem, nadajesz zgłoszeniu ocenę „zapłaciła (przelew / pro forma)". Panel liczy to tak
samo jak wpłatę kartą. Na pierwszy test to wystarczy.

Jeśli chcesz płatność kartą:

1. Panel Stripe, **tryb testowy** → Developers → API keys → skopiuj Secret key (`sk_test_…`).
2. Developers → Webhooks → dodaj endpoint. Adres: Twój `SITE_URL` z dopiskiem `/stripe/webhook`.
   Zdarzenia: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`.
   Skopiuj Signing secret (`whsec_…`).
3. Ustaw oba sekrety. Zawsze oba naraz, inaczej przycisk płatności się nie pokaże:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
```

```bash
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

4. Zapłać kartą testową `4242 4242 4242 4242`. W panelu Sondy wiersz ma zmienić status na „OPŁACONA"
   z dopiskiem „TESTOWA (na niby)". Takie płatności nie liczą się do werdyktu.

**Przejście na prawdziwe pieniądze.** Tryb produkcyjny Stripe ma osobny klucz **i osobny webhook z osobnym
sekretem**. Sam nowy klucz nie wystarczy: płatności by przechodziły, a panel by ich nie widział.

1. Przełącz panel Stripe na tryb produkcyjny. Skopiuj klucz `sk_live_…`.
2. W trybie produkcyjnym dodaj webhook od nowa (ten sam adres, te same trzy zdarzenia). Skopiuj **nowy** sekret.
3. Ustaw ponownie oba sekrety (`STRIPE_SECRET_KEY` i `STRIPE_WEBHOOK_SECRET`).
4. Zrób jedną prawdziwą płatność (bramka 1, punkt 6). Do tego momentu Autotest pokazuje UWAGĘ, że nie odebrał
   jeszcze żadnego webhooka z trybu produkcyjnego; po udanej płatności zmieni ją na OK. Jeśli sekret jest zły,
   płatność zostanie w panelu jako „rozpoczęta, NIEOPŁACONA", a Autotest po godzinie zgłosi BŁĄD.

Sonda wymaga przy płatności nazwy firmy, NIP-u i adresu, bo strona obiecuje fakturę na te dane.
Panel pokazuje je w tabeli płatności.

**Potwierdzenie dla klienta.** Sonda nie wysyła e-maili. Włącz w Stripe wysyłkę potwierdzeń płatności
(Settings → Customer emails → Successful payments), inaczej klient po zapłaceniu zobaczy tylko stronę z podziękowaniem.

**Faktury.** Każda wpłata od firmy wymaga faktury, w 2026 r. co do zasady przez KSeF. Sprawdź z księgową,
czy dotyczy Cię jeszcze wyjątek dla najmniejszych podatników. Sonda faktur nie wystawia. Research znalazł gotowe
mosty Stripe → KSeF za ok. 19–50 zł miesięcznie; przy kilku wpłatach wystarczy faktura wystawiona ręcznie.

## 9. Demo na żywo (opcjonalnie, nie na pierwszy test)

Domyślnie strona pokazuje trzy gotowe przykłady z dopiskiem, że są poglądowe. Pole „wklej własną wiadomość"
włączysz tak:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

oraz wpis sluga `zamowienia-z-maila` do `LIVE_PASTE_EXPERIMENTS` w `wrangler.jsonc` i ponowne wdrożenie.

Zanim włączysz, weź pod uwagę trzy rzeczy, na które zwrócili uwagę sędziowie: demo pokazuje tę część pracy,
którą umie też darmowy czat; ludzie będą wklejać dane swoich klientów; każde uruchomienie kosztuje.
Model ustawia zmienna `DEMO_MODEL` (domyślnie `claude-opus-5-5`; tańszy to `claude-haiku-5-5`), a dobowy
limit uruchomień `DEMO_DAILY_CAP`. Dla modeli, które to obsługują, włączony jest serwerowy fallback na wypadek
odmowy klasyfikatora bezpieczeństwa.

## 10. Start testu

Dopiero po bramkach 0a i 0b z `01-BRAMKI.md`:

1. **Upublicznij stronę.** W `wrangler.jsonc` ustaw `"LIVE_EXPERIMENTS": "zamowienia-z-maila"` i wdróż
   (`npm run deploy`). Od teraz stronę widzi każdy, kto zna adres.
2. **Przejdź bramkę 1** (audyt lejka w oknie incognito). Jej ostatni punkt to przycisk
   „Zacznij liczyć od teraz" w panelu: odcina Twoje własne próby.
3. **Uruchom kampanię** według `03-REKLAMY.md`.

## Zatrzymanie testu

1. Najpierw wstrzymaj kampanię w Google Ads. Inaczej płacisz za kliknięcia prowadzące na stronę 404.
2. Usuń slug z `LIVE_EXPERIMENTS` i wdróż. Strona znika dla odwiedzających, dane zostają w panelu.
3. Odpowiedz wszystkim firmom, które się zgłosiły. Jeśli były wpłaty, obsłuż je albo zwróć.

## Codzienna obsługa w trakcie testu (5 minut)

1. Panel → eksperyment. Oceń nowe zgłoszenia: prawdziwa firma / przysłała dane lub rozmowa / zapłaciła / odrzucone.
   Dopóki coś czeka na ocenę, panel nie ogłosi NO-GO.
2. Odpisz na zgłoszenia w ciągu 2 dni roboczych: tyle obiecuje strona.
3. Raz dziennie dopisz kliknięcia i koszt z Google Ads za poprzedni dzień. Bez tych liczb panel nie ogłosi NO-GO,
   a do progów bierze mniejszą z dwóch liczb: własnego licznika i Google.
4. Jeśli firma weszła z reklamy, a w tabeli ma źródło „inne" (wróciła innego dnia albo z innego urządzenia),
   zmień jej źródło przyciskiem. Zapytaj ją po prostu, skąd o Tobie wie.
5. Drugiego dnia przeczytaj w Google Ads raport wyszukiwanych haseł (nie same słowa kluczowe, Miss #14).

## Ktoś prosi o usunięcie danych

Panel → Zgłoszenia → zaznacz „na pewno" przy tej firmie → „Usuń". Usunięcie jest trwałe. Usuń też pobrane
wcześniej pliki CSV, w których ta firma występuje. Danych z tabeli płatności nie usuwasz: są podstawą faktury.

## Hasło do panelu

Sesja w przeglądarce trwa 7 dni. Zmiana `ADMIN_TOKEN` (to samo polecenie co w kroku 4) wylogowuje wszystkie
urządzenia naraz. Zrób to, jeśli hasło mogło wyciec.

## Co Sonda zapisuje o odwiedzających

Żadnych ciasteczek dla odwiedzających. Do liczenia wejść służy jednodniowy identyfikator wyliczony z adresu IP
i przeglądarki; sam adres IP nie jest zapisywany. Zgłoszenia zawierają to, co ktoś wpisał w formularz.
Ciasteczko dostaje tylko właściciel po zalogowaniu do panelu.
