# Wdrożenie krok po kroku

Dla osoby nietechnicznej. Zarezerwuj 60–90 minut na pierwsze przejście (Miss #7: pierwsza konfiguracja zawsze
trwa 3–4 razy dłużej, niż się wydaje). Wszystkie polecenia wpisujesz w terminalu, w katalogu `project-2/sonda`.

**Zanim zaczniesz:** przenieś `project-2/` do prywatnego repozytorium. To repozytorium jest publiczne.

## Co będzie potrzebne

- Konto Cloudflare (to samo, na którym stoi disclosekit). Koszt: 0 zł na darmowym planie.
- Node.js 22 lub nowszy.
- Opcjonalnie: klucz Stripe (płatny pilotaż) i klucz Anthropic (demo na żywo). Na pierwszy test nie są potrzebne.

## 1. Instalacja i sprawdzenie, że wszystko działa lokalnie

```bash
npm install
npm run check
```

`npm run check` sprawdza typy, uruchamia 62 testy na prawdziwym serwerze lokalnym i robi próbne wdrożenie
„na sucho". Musi skończyć się bez błędów. Jeśli nie kończy, nie idź dalej.

Podgląd lokalny:

```bash
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

Strona: `http://localhost:8787/zamowienia-z-maila` (szkic zobaczysz po zalogowaniu w `/admin`
hasłem z pliku `.dev.vars`).

## 2. Baza danych

```bash
npx wrangler login
npx wrangler d1 create sonda_db
```

Polecenie wypisze `database_id`. Wklej go do `wrangler.jsonc` w miejsce `REPLACE_WITH_YOUR_D1_DB_ID`. Potem:

```bash
npm run db:migrate:remote
```

## 3. Ustawienia jawne (`wrangler.jsonc`, sekcja `vars`)

| Zmienna | Co wpisać |
|---|---|
| `SITE_URL` | Adres, pod którym strona będzie działać, bez ukośnika na końcu. Na start: adres `*.workers.dev`, który wypisze pierwsze wdrożenie. |
| `CONTACT_EMAIL` | Prawdziwy, czytany adres. Autotest sprawdzi, czy domena ma skrzynkę. |
| `LIVE_EXPERIMENTS` | Zostaw puste, dopóki nie przejdziesz bramki 1. |
| `LIVE_PASTE_EXPERIMENTS` | Zostaw puste. To pole włącza „wklej własną wiadomość". |

## 4. Sekrety

Każde polecenie zapyta o wartość. Nie wpisuj sekretów do żadnego pliku.

```bash
npx wrangler secret put ADMIN_TOKEN      # hasło do panelu, co najmniej 24 znaki
npx wrangler secret put VISITOR_SALT     # dowolny losowy ciąg, co najmniej 16 znaków
```

Losowy ciąg wygenerujesz poleceniem `openssl rand -base64 32`.

## 5. Pierwsze wdrożenie

```bash
npm run deploy
```

Wrangler wypisze adres. Wpisz go do `SITE_URL` i wdróż ponownie (`npm run deploy`).

Otwórz `adres/admin`, zaloguj się i wejdź w **Autotest**. Popraw wszystko, co ma oznaczenie BŁĄD.

## 6. Przeczytaj i popraw treść

Plik `src/experiments/zamowienia-z-maila.ts`. Miejsca wymagające decyzji mają słowo `DECYZJA`:

- cytat z referencji (zgoda klienta),
- cena płatnego pilotażu albo usunięcie bloku `pilot`,
- pole wyboru „faktura pro forma",
- link do nagrania panelu, gdy je zrobisz.

Przeczytaj też `src/pages/legal.ts` (polityka prywatności i regulamin). To szkice opisujące, co system
faktycznie robi, a nie porada prawna.

Po zmianach: `npm run check`, potem `npm run deploy`.

## 7. Własna domena (opcjonalnie, zalecane przed reklamami)

Panel Cloudflare → Workers & Pages → sonda → Settings → Domains & Routes → Add → Custom domain,
np. `zamowienia.plar.ai`. Domena musi być w tym samym koncie Cloudflare. Potem zmień `SITE_URL` i wdróż ponownie.

## 8. Płatny pilotaż przez Stripe (opcjonalnie)

1. Panel Stripe → Developers → API keys → skopiuj Secret key.
2. Panel Stripe → Developers → Webhooks → Add endpoint. Adres: `SITE_URL/stripe/webhook`.
   Zdarzenia: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`.
   Skopiuj Signing secret.
3. Ustaw oba sekrety. Zawsze oba naraz, inaczej przycisk płatności się nie pokaże:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

Najpierw klucz testowy (`sk_test_…`) i karta testowa `4242 4242 4242 4242`. Płatności testowe panel pokazuje
osobno i nie liczy ich do werdyktu. Dopiero potem klucz produkcyjny i jedna prawdziwa płatność ze zwrotem.

**Faktury.** Każda wpłata od firmy wymaga faktury, od 2026 r. przez KSeF. Sonda faktur nie wystawia.
Research znalazł gotowe mosty Stripe → KSeF za ok. 19–50 zł miesięcznie; przy kilku wpłatach wystarczy
wystawić fakturę ręcznie w Twoim programie.

## 9. Demo na żywo (opcjonalnie, nie na pierwszy test)

Domyślnie strona pokazuje trzy gotowe przykłady. Pole „wklej własną wiadomość" włączysz tak:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

oraz wpis sluga do `LIVE_PASTE_EXPERIMENTS` w `wrangler.jsonc`.

Zanim włączysz, weź pod uwagę trzy rzeczy, na które zwrócili uwagę sędziowie: demo pokazuje tę część pracy,
którą umie też darmowy czat; ludzie będą wklejać dane swoich klientów; każde uruchomienie kosztuje.
Model ustawia zmienna `DEMO_MODEL` (domyślnie `claude-opus-5-5`; tańszy to `claude-haiku-5-5`), a dobowy
limit uruchomień `DEMO_DAILY_CAP`. Dla modeli, które to obsługują, włączony jest serwerowy fallback na wypadek
odmowy klasyfikatora bezpieczeństwa.

## 10. Start testu

Dopiero po bramkach z `01-BRAMKI.md`:

1. W `wrangler.jsonc` ustaw `"LIVE_EXPERIMENTS": "zamowienia-z-maila"` i wdróż.
2. Przejdź bramkę 1 (audyt lejka).
3. Uruchom kampanię według `03-REKLAMY.md`.

## Zatrzymanie testu

Usuń slug z `LIVE_EXPERIMENTS` i wdróż. Strona znika dla odwiedzających, dane zostają w panelu.
Jeśli były prawdziwe wpłaty, obsłuż je albo zwróć.

## Codzienna obsługa w trakcie testu (5 minut)

1. Panel → eksperyment. Oceń nowe zgłoszenia (prawdziwa firma / przysłała dane / odrzucone).
2. Odpisz na zgłoszenia w ciągu 2 dni roboczych: tyle obiecuje strona.
3. Raz dziennie dopisz kliknięcia i koszt z Google Ads.
4. Drugiego dnia przeczytaj w Google Ads raport wyszukiwanych haseł (nie same słowa kluczowe, Miss #14).

## Co Sonda zapisuje o odwiedzających

Żadnych ciasteczek. Do liczenia wejść służy jednodniowy identyfikator wyliczony z adresu IP i przeglądarki;
sam adres IP nie jest zapisywany. Zgłoszenia zawierają to, co ktoś wpisał w formularz.
