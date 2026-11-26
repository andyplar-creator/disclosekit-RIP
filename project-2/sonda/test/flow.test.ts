// Testy integracyjne: prawdziwy Worker + lokalna baza D1 + atrapy Stripe i Claude.
// Kazdy test uzywa innego adresu IP, wiec ma wlasnego "odwiedzajacego" i wlasne limity.
// Scenariusze werdyktu zaczynaja sie od "Zacznij liczyc od teraz", wiec nie zaleza od wczesniejszych testow.

import { createHmac } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { ADMIN_TOKEN, WEBHOOK_SECRET } from './global-setup';

const SLUG = 'zamowienia-z-maila';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
let base = '';
let bare = '';
let mock = '';
let cookie = '';
let ipCounter = 0;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function newVisitor(): Record<string, string> {
  ipCounter += 1;
  return { 'User-Agent': UA, 'CF-Connecting-IP': `10.${Math.floor(ipCounter / 250)}.${ipCounter % 250}.7` };
}

function get(path: string, headers: Record<string, string>): Promise<Response> {
  return fetch(base + path, { headers, redirect: 'manual' });
}

function postForm(path: string, fields: Record<string, string>, headers: Record<string, string>, origin = base): Promise<Response> {
  return fetch(origin + path, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
    redirect: 'manual',
  });
}

function postJson(path: string, data: unknown, headers: Record<string, string>): Promise<Response> {
  return fetch(base + path, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(data), redirect: 'manual' });
}

async function login(origin = base): Promise<string> {
  const res = await postForm('/admin/login', { token: ADMIN_TOKEN }, newVisitor(), origin);
  expect(res.status).toBe(303);
  const header = res.headers.get('set-cookie');
  expect(header).toContain('sonda_admin=');
  expect(header).toContain('HttpOnly');
  return (header as string).split(';')[0] as string;
}

async function adminPage(path: string): Promise<string> {
  const res = await fetch(base + path, { headers: { Cookie: cookie, 'User-Agent': UA } });
  expect(res.status).toBe(200);
  return res.text();
}

const panel = () => adminPage(`/admin/x/${SLUG}`);

/** Akcja wlasciciela w panelu (formularz POST). Zwraca odpowiedz bez podazania za przekierowaniem. */
function adminPost(action: string, fields: Record<string, string>, withCookie = true): Promise<Response> {
  const headers: Record<string, string> = { 'User-Agent': UA };
  if (withCookie) headers.Cookie = cookie;
  return postForm(`/admin/x/${SLUG}/${action}`, fields, headers);
}

/** Odczytuje liczbe z kafelka statystyki w panelu po jego etykiecie. */
function statValue(html: string, label: string): string {
  const pattern = new RegExp(`<small>${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</small><div class="big">([^<]*)</div>`);
  const match = pattern.exec(html);
  if (!match) throw new Error(`Nie znaleziono kafelka „${label}” w panelu`);
  return match[1] as string;
}

const stat = (html: string, label: string) => Number(statValue(html, label));

/** Naglowek werdyktu z panelu eksperymentu. */
function headline(html: string): string {
  const match = /<p class="big">([^<]*)<\/p>/.exec(html);
  if (!match) throw new Error('Brak werdyktu w panelu');
  return match[1] as string;
}

function stripeSignature(body: string, timestamp = Math.floor(Date.now() / 1000)): string {
  const signature = createHmac('sha256', WEBHOOK_SECRET).update(`${timestamp}.${body}`).digest('hex');
  return `t=${timestamp},v1=${signature}`;
}

/** Komplet pol poprawnego zgloszenia firmy. */
function lead(email: string, extra: Record<string, string> = {}): Record<string, string> {
  return { email, company: 'Hurtownia Test Sp. z o.o.', erp: 'Subiekt GT', volume: 'ok. 40', consent: '1', ...extra };
}

/** Wiersz tabeli zgloszen dla danego adresu e-mail. */
function leadRow(html: string, email: string): string {
  const row = html.split('<tr>').find((part) => part.includes(email));
  if (!row) throw new Error(`Brak zgloszenia ${email} w panelu`);
  return row;
}

function leadIdFor(html: string, email: string): string {
  const match = /name="id" value="(\d+)"/.exec(leadRow(html, email));
  if (!match) throw new Error(`Brak id zgloszenia ${email}`);
  return match[1] as string;
}

/** Id najnowszej platnosci (tabela platnosci jest posortowana od najnowszej). */
function latestOrderId(html: string): string {
  const section = html.slice(html.indexOf('id="platnosci"'));
  const match = /order-exclude" class="rowform"><input type="hidden" name="id" value="(\d+)"/.exec(section);
  if (!match) throw new Error('Brak platnosci w panelu');
  return match[1] as string;
}

async function rateLead(id: string, status: string): Promise<number> {
  return (await adminPost('lead-status', { id, status })).status;
}

/** "Zacznij liczyc od teraz": odcina wszystko, co bylo wczesniej. Sekunda przerwy, bo czas w bazie ma dokladnosc 1 s. */
async function resetCounting(): Promise<void> {
  await sleep(1100);
  const res = await adminPost('start-counting', { mode: 'now' });
  expect(res.status).toBe(303);
  expect(res.headers.get('location')).toContain('msg=licznik');
}

/** Wejscia z reklam od `count` roznych odwiedzajacych, po 20 naraz. */
async function adVisits(count: number, tag: string): Promise<void> {
  for (let done = 0; done < count; done += 20) {
    const batch = Array.from({ length: Math.min(20, count - done) }, (_, i) => get(`/${SLUG}?gclid=${tag}${done + i}&utm_term=${tag}`, newVisitor()));
    for (const res of await Promise.all(batch)) expect(res.status).toBe(200);
  }
}

/** Sciezka platnosci: wejscie, sesja Stripe i (opcjonalnie) webhook "oplacono". Zwraca identyfikator sesji. */
async function pay(options: { headers: Record<string, string>; ad: boolean; livemode: boolean; complete: boolean; email?: string }): Promise<string> {
  const fields: Record<string, string> = { terms: '1' };
  if (options.ad) fields.ad = '1';
  const checkout = await postForm(`/api/${SLUG}/checkout`, fields, options.headers);
  expect(checkout.status).toBe(303);
  const payUrl = checkout.headers.get('location') ?? '';
  expect(payUrl).toContain(`/pay/cs_${options.livemode ? 'live' : 'test'}_mock_`);
  const sessionId = payUrl.slice(payUrl.lastIndexOf('/') + 1);
  if (options.complete) {
    const event = JSON.stringify({
      id: `evt_${sessionId}`,
      type: 'checkout.session.completed',
      livemode: options.livemode,
      data: {
        object: {
          id: sessionId,
          payment_status: 'paid',
          customer_details: { email: options.email ?? 'Kupujacy@Hurtownia-Test.pl' },
          custom_fields: [
            { key: 'company', text: { value: 'Hurtownia Płatna Sp. z o.o.' } },
            { key: 'nip', text: { value: '5222940634' } },
          ],
        },
      },
    });
    const res = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event) }, body: event });
    expect(res.status).toBe(200);
  }
  return sessionId;
}

async function stripeLive(on: boolean): Promise<void> {
  await fetch(`${mock}/__control/livemode/${on ? 'on' : 'off'}`, { method: 'POST' });
}

beforeAll(async () => {
  base = process.env.SONDA_BASE as string;
  bare = process.env.SONDA_BARE as string;
  mock = process.env.SONDA_MOCK as string;
  expect(base).toMatch(/^http:\/\/127\.0\.0\.1:\d+$/);
  cookie = await login();
});

describe('strony publiczne', () => {
  it('strona glowna przekierowuje na eksperyment domyslny i zachowuje parametry reklamy', async () => {
    const res = await get('/?gclid=abc&utm_term=test', newVisitor());
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe(`/${SLUG}?gclid=abc&utm_term=test`);
  });

  it('landing ma naglowki bezpieczenstwa, noindex i nie ustawia ciasteczek', async () => {
    const res = await get(`/${SLUG}`, newVisitor());
    expect(res.status).toBe(200);
    expect(res.headers.get('set-cookie')).toBeNull();
    const csp = res.headers.get('content-security-policy') ?? '';
    expect(csp).toContain("default-src 'none'");
    expect(csp).not.toContain('unsafe-inline');
    expect(res.headers.get('x-frame-options')).toBe('DENY');
    const html = await res.text();
    expect(html).toContain('noindex');
    expect(html).toContain('Zamówienia z maili i SMS-ów. Bez przepisywania.');
    expect(html).toContain('4 900 zł');
    expect(html).not.toContain('199 zł');
    expect(html).toContain(`action="/api/${SLUG}/lead"`);
    // Przyklady w demo sa przygotowane recznie i strona mowi to wprost.
    expect(html).toContain('Przykłady poglądowe');
    // Kwota pilotazu jest w jednym miejscu konfiguracji i trafia na przycisk oraz do pola pro forma.
    expect(html).toContain('Opłacam pilotaż — 602,70 zł brutto');
    expect(html.split('602,70 zł').length - 1).toBeGreaterThanOrEqual(3);
  });

  it('adres z podwojnym ukosnikiem i z ukosnikiem na koncu tez dziala', async () => {
    expect((await get(`//${SLUG}`, newVisitor())).status).toBe(200);
    expect((await get(`/${SLUG}/`, newVisitor())).status).toBe(200);
  });

  it('parametry reklamy trafiaja do ukrytych pol formularza', async () => {
    const res = await get(`/${SLUG}?utm_source=google&utm_medium=cpc&utm_campaign=orders&utm_term=zamowienia+z+maila`, newVisitor());
    const html = await res.text();
    expect(html).toContain('name="ad" value="1"');
    expect(html).toContain('name="utm_term" value="zamowienia z maila"');
  });

  it('wstrzykniety HTML w parametrach jest escapowany', async () => {
    const res = await get(`/${SLUG}?utm_medium=cpc&utm_term=${encodeURIComponent('"><script>alert(1)</script>')}`, newVisitor());
    const html = await res.text();
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('nieznany adres i nieznany eksperyment daja 404', async () => {
    expect((await get('/nie-ma-takiego', newVisitor())).status).toBe(404);
    expect((await get('/a/b/c', newVisitor())).status).toBe(404);
  });

  it('strony prawne dzialaja po polsku i po angielsku i mowia to samo o zwrocie co strona', async () => {
    const privacy = await (await get('/polityka-prywatnosci', newVisitor())).text();
    expect(privacy).toContain('Administrator');
    expect(privacy).toContain('ciasteczek');
    expect(privacy).toContain('usun');
    const terms = await (await get('/regulamin', newVisitor())).text();
    expect(terms).toContain('Regulamin płatnego pilotażu');
    expect(terms).toContain('7 dni');
    const en = await (await get('/regulamin?lang=en', newVisitor())).text();
    expect(en).toContain('Paid pilot terms');
  });
});

describe('zgloszenie firmy', () => {
  it('zapisuje zgloszenie z reklamy ze wszystkimi polami i pokazuje potwierdzenie', async () => {
    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=xyz&utm_campaign=orders&utm_term=hurtownia`, visitor);
    const res = await postForm(
      `/api/${SLUG}/lead`,
      lead('Anna.Kowalska@Hurtownia-Test.pl', {
        nip: '5222940634',
        phone: '600 100 200',
        note: 'Zamówienia przychodzą mailem i SMS-em od ok. 30 sklepów',
        wants_invoice: '1',
        ad: '1',
        utm_campaign: 'orders',
        utm_term: 'hurtownia',
      }),
      visitor,
    );
    expect(res.status).toBe(303);
    expect(res.headers.get('location')).toBe(`/${SLUG}?zapis=ok#zapis`);
    const confirmation = await (await get(`/${SLUG}?zapis=ok`, visitor)).text();
    expect(confirmation).toContain('Zgłoszenie przyjęte.');

    const html = await panel();
    const row = leadRow(html, 'anna.kowalska@hurtownia-test.pl');
    expect(row).toContain('Hurtownia Test Sp. z o.o.');
    expect(row).toContain('Subiekt GT');
    expect(row).toContain('NIP 5222940634');
    expect(row).toContain('600 100 200');
    expect(row).toContain('Zamówienia przychodzą mailem i SMS-em');
    expect(row).toContain('<strong>TAK</strong>');
    expect(row).toContain('<td>reklama');
    expect(stat(html, 'Prośby o fakturę pro forma')).toBeGreaterThanOrEqual(1);
  });

  it('ponowne wyslanie z tego samego adresu uzupelnia zgloszenie i NIE gubi prosby o fakture pro forma', async () => {
    const email = 'ponownie@firma-test.pl';
    const first = await postForm(`/api/${SLUG}/lead`, lead(email), newVisitor());
    expect(first.headers.get('location')).toContain('zapis=ok');
    expect(leadRow(await panel(), email)).toContain('<td>nie</td>');

    // Ta sama firma wraca i tym razem zaznacza "chce fakture pro forma" oraz podaje telefon.
    const second = await postForm(`/api/${SLUG}/lead`, lead(email, { wants_invoice: '1', phone: '501 502 503' }), newVisitor());
    expect(second.status).toBe(303);
    expect(second.headers.get('location')).toBe(`/${SLUG}?zapis=zaktualizowane#zapis`);
    expect(await (await get(`/${SLUG}?zapis=zaktualizowane`, newVisitor())).text()).toContain('Mam już zgłoszenie z tego adresu');

    const html = await panel();
    expect(html.split(email).length - 1).toBe(1);
    const row = leadRow(html, email);
    expect(row).toContain('<strong>TAK</strong>');
    expect(row).toContain('501 502 503');
    expect(row).toContain('uzupełnione');
  });

  it('blad w formularzu nie kasuje wpisanych danych ani zrodla wejscia', async () => {
    const res = await postForm(
      `/api/${SLUG}/lead`,
      lead('to-nie-email', { company: 'Hurtownia Zachowana', ad: '1', utm_term: 'fraza zachowana', note: 'notatka zachowana' }),
      newVisitor(),
    );
    expect(res.status).toBe(422);
    const html = await res.text();
    expect(html).toContain('Ten adres e-mail wygląda na niepoprawny');
    expect(html).toContain('value="Hurtownia Zachowana"');
    expect(html).toContain('notatka zachowana');
    expect(html).toContain('name="ad" value="1"');
    expect(html).toContain('name="utm_term" value="fraza zachowana"');

    const noConsent = lead('bez-zgody@firma-test.pl');
    delete noConsent.consent;
    const consentRes = await postForm(`/api/${SLUG}/lead`, noConsent, newVisitor());
    expect(consentRes.status).toBe(422);
    expect(await consentRes.text()).toContain('Zaznacz zgodę na kontakt');

    // Sam adres e-mail to nie zgloszenie firmy: bez programu i liczby zamowien nie przyjmujemy.
    const missing = await postForm(`/api/${SLUG}/lead`, { email: 'sam-mail@firma-test.pl', consent: '1' }, newVisitor());
    expect(missing.status).toBe(422);
    expect(await missing.text()).toContain('Uzupełnij nazwę firmy');

    const html2 = await panel();
    expect(html2).not.toContain('bez-zgody@firma-test.pl');
    expect(html2).not.toContain('sam-mail@firma-test.pl');
  });

  it('firma, ktora weszla z reklamy, a formularz wyslala bez parametrow, nadal ma zrodlo "reklama"', async () => {
    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=powrot&utm_term=fraza+z+wejscia`, visitor);
    await postForm(`/api/${SLUG}/lead`, lead('powrot@firma-test.pl'), visitor);
    const row = leadRow(await panel(), 'powrot@firma-test.pl');
    expect(row).toContain('<td>reklama');
    expect(row).toContain('fraza z wejscia');
  });

  it('pulapka na roboty: podejrzane zgloszenie nie ginie, nie liczy sie do lejka i da sie je przywrocic', async () => {
    const before = stat(await panel(), 'Zgłoszenia (wszystkie)');
    const res = await postForm(`/api/${SLUG}/lead`, lead('robot@spam-test.pl', { website: 'http://spam.example', ad: '1' }), newVisitor());
    expect(res.headers.get('location')).toContain('zapis=ok');
    // Zgloszenie z przegladarki przedstawiajacej sie jak robot tez zostaje zapisane i oznaczone.
    await postForm(`/api/${SLUG}/lead`, lead('headless@firma-test.pl'), {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/131.0.0.0 Safari/537.36',
      'CF-Connecting-IP': '203.0.113.251',
    });
    const html = await panel();
    expect(leadRow(html, 'robot@spam-test.pl')).toContain('podejrzane: ukryte pole');
    expect(leadRow(html, 'headless@firma-test.pl')).toContain('podejrzane: robot');
    expect(stat(html, 'Zgłoszenia (wszystkie)')).toBe(before);
    const flagged = stat(html, 'Podejrzane do przejrzenia');
    expect(flagged).toBeGreaterThanOrEqual(2);

    // Filtr sie pomylil: wlasciciel nadaje ocene i zgloszenie wraca do lejka.
    expect(await rateLead(leadIdFor(html, 'headless@firma-test.pl'), 'qualified')).toBe(303);
    const after = await panel();
    expect(stat(after, 'Zgłoszenia (wszystkie)')).toBe(before + 1);
    expect(stat(after, 'Podejrzane do przejrzenia')).toBe(flagged - 1);
    expect(leadRow(after, 'headless@firma-test.pl')).not.toContain('podejrzane');
  });

  it('limit prob liczy sie na adres IP i nie da sie go obejsc zmiana przegladarki', async () => {
    const ip = '203.0.113.40';
    let last: Response | undefined;
    for (let i = 0; i < 31; i++) {
      last = await postForm(`/api/${SLUG}/lead`, lead(`limit${i}@firma-test.pl`), { 'User-Agent': `${UA} Wariant/${i}`, 'CF-Connecting-IP': ip });
      if (i < 30) expect(last.status).toBe(303);
    }
    expect(last?.status).toBe(429);
    expect(await last?.text()).toContain('Za dużo prób');
  });

  it('wstrzykniety HTML w polach zgloszenia nie wykonuje sie w panelu', async () => {
    await postForm(
      `/api/${SLUG}/lead`,
      lead('xss@firma-test.pl', { company: '<img src=x onerror=alert(1)>', erp: '"><script>alert(2)</script>', note: '</textarea><script>alert(3)</script>' }),
      newVisitor(),
    );
    const html = await panel();
    expect(html).not.toContain('<img src=x onerror=alert(1)>');
    expect(html).not.toContain('<script>alert(2)</script>');
    expect(html).not.toContain('<script>alert(3)</script>');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
  });
});

describe('demo', () => {
  it('zwraca tabele z wynikiem i escapuje to, co przyszlo z modelu', async () => {
    const res = await postJson(`/api/${SLUG}/demo`, { text: '10x espresso blend 1kg, filtry V60 02 - 2 opakowania, na jutro' }, newVisitor());
    expect(res.status).toBe(200);
    const body = (await res.json()) as { html: string };
    expect(body.html).toContain('espresso blend 1kg');
    expect(body.html).toContain('Na którą godzinę ma być dostawa?');
    expect(body.html).not.toContain('<script>alert(1)</script>');
    expect(body.html).toContain('&lt;script&gt;');
  });

  it('odrzuca pusty i za dlugi tekst bez wolania modelu', async () => {
    expect((await postJson(`/api/${SLUG}/demo`, { text: '   ' }, newVisitor())).status).toBe(400);
    expect((await postJson(`/api/${SLUG}/demo`, { text: 'x'.repeat(6001) }, newVisitor())).status).toBe(413);
  });

  it('odmowa modelu konczy sie czytelnym bledem, nie pusta tabela', async () => {
    const res = await postJson(`/api/${SLUG}/demo`, { text: 'WYMUS_ODMOWE' }, newVisitor());
    expect(res.status).toBe(502);
    expect(((await res.json()) as { error: string }).error).toBe('refused');
  });

  it('limit uruchomien liczy sie na adres IP, nie na przegladarke', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      statuses.push((await postJson(`/api/${SLUG}/demo`, { text: `zamówienie ${i}: 2 kg kawy` }, { 'User-Agent': `${UA} Wariant/${i}`, 'CF-Connecting-IP': '203.0.113.41' })).status);
    }
    expect(statuses.slice(0, 6)).toEqual([200, 200, 200, 200, 200, 200]);
    expect(statuses[6]).toBe(429);
  });
});

describe('platnosc', () => {
  it('bez zaznaczonego regulaminu nie tworzy sesji', async () => {
    const res = await postForm(`/api/${SLUG}/checkout`, {}, newVisitor());
    expect(res.headers.get('location')).toContain('platnosc=regulamin');
  });

  it('Stripe dostaje wlasciwa kwote, adres powrotu bez podwojnego ukosnika i wymog danych do faktury', async () => {
    await pay({ headers: newVisitor(), ad: false, livemode: false, complete: false });
    const sent = (await (await fetch(`${mock}/__control/last-checkout`)).json()) as Record<string, string>;
    expect(sent['line_items[0][price_data][unit_amount]']).toBe('60270');
    expect(sent['line_items[0][price_data][currency]']).toBe('pln');
    // SITE_URL w testach ma ukosnik na koncu (czesta pomylka): adres powrotu mimo to jest poprawny.
    expect(sent.success_url).toBe(`${base}/${SLUG}/dziekuje?session_id={CHECKOUT_SESSION_ID}`);
    expect(sent.cancel_url).toBe(`${base}/${SLUG}?platnosc=anulowana#zapis`);
    expect(sent.billing_address_collection).toBe('required');
    expect(sent['custom_fields[0][key]']).toBe('company');
    expect(sent['custom_fields[1][key]']).toBe('nip');
    expect(sent['custom_fields[1][optional]']).toBe('false');
  });

  it('platnosc testowa: webhook oznacza ja jako oplacona dokladnie raz i NIE liczy do werdyktu', async () => {
    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=pay1&utm_term=platnosc`, visitor);
    const sessionId = await pay({ headers: visitor, ad: true, livemode: false, complete: false });

    const before = await panel();
    expect(before).toContain('rozpoczęta, NIEOPŁACONA');
    const paidTestBefore = stat(before, 'Płatności testowe (na niby)');
    const paidRealBefore = stat(before, 'Opłacone pilotaże (z reklam)');

    const event = JSON.stringify({
      id: 'evt_test_1',
      type: 'checkout.session.completed',
      livemode: false,
      data: {
        object: {
          id: sessionId,
          payment_status: 'paid',
          customer_details: { email: 'Testowy.Kupujacy@Hurtownia-Test.pl' },
          custom_fields: [
            { key: 'company', text: { value: 'Hurtownia Testowa Płatność' } },
            { key: 'nip', text: { value: '1132191233' } },
          ],
        },
      },
    });

    // Zly podpis przy aktualnym znaczniku czasu: odrzucony wylacznie z powodu podpisu.
    const forgedHeader = `t=${Math.floor(Date.now() / 1000)},v1=${'0'.repeat(64)}`;
    const forged = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': forgedHeader }, body: event });
    expect(forged.status).toBe(400);
    // Brak naglowka i stary znacznik czasu (atak powtorzeniowy) tez sa odrzucane.
    expect((await fetch(`${base}/stripe/webhook`, { method: 'POST', body: event })).status).toBe(400);
    const stale = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event, Math.floor(Date.now() / 1000) - 3600) }, body: event });
    expect(stale.status).toBe(400);
    expect(stat(await panel(), 'Płatności testowe (na niby)')).toBe(paidTestBefore);

    // Dobry podpis, dwa razy (Stripe ponawia webhooki): zamowienie oplacone raz.
    for (let i = 0; i < 2; i++) {
      const res = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event) }, body: event });
      expect(res.status).toBe(200);
    }

    const after = await panel();
    expect(after).toContain('testowy.kupujacy@hurtownia-test.pl');
    expect(after).toContain('Hurtownia Testowa Płatność');
    expect(after).toContain('NIP 1132191233');
    expect(after).toContain('OPŁACONA');
    expect(after).toContain('TESTOWA (na niby)');
    expect(stat(after, 'Płatności testowe (na niby)')).toBe(paidTestBefore + 1);
    expect(stat(after, 'Opłacone pilotaże (z reklam)')).toBe(paidRealBefore);
  });

  it('webhook dla nieznanej sesji jest przyjmowany, ale niczego nie tworzy', async () => {
    const event = JSON.stringify({ id: 'evt_x', type: 'checkout.session.completed', livemode: false, data: { object: { id: 'cs_test_nieznana', payment_status: 'paid' } } });
    const res = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event) }, body: event });
    expect(res.status).toBe(200);
    expect(await panel()).not.toContain('cs_test_nieznana');
  });

  it('strona podziekowania potwierdza tylko platnosc, ktora naprawde u nas powstala', async () => {
    const sessionId = await pay({ headers: newVisitor(), ad: false, livemode: false, complete: false });
    const known = await (await get(`/${SLUG}/dziekuje?session_id=${sessionId}`, newVisitor())).text();
    expect(known).toContain('Płatność przyjęta do realizacji');
    const unknown = await (await get(`/${SLUG}/dziekuje?session_id=cs_test_wymyslona`, newVisitor())).text();
    expect(unknown).toContain('Nie widzę tu płatności');
    expect(unknown).not.toContain('Płatność przyjęta do realizacji');
    expect(await (await get(`/${SLUG}/dziekuje`, newVisitor())).text()).toContain('Nie widzę tu płatności');
  });

  it('prawdziwa platnosc od firmy z reklamy daje GO; wlasciciel moze ja wykluczyc i zmienic jej zrodlo', async () => {
    await resetCounting();
    await stripeLive(true);
    try {
      const visitor = newVisitor();
      await get(`/${SLUG}?gclid=live1&utm_term=platny+pilotaz`, visitor);
      await pay({ headers: visitor, ad: true, livemode: true, complete: true, email: 'Prawdziwy@Hurtownia-Test.pl' });
    } finally {
      await stripeLive(false);
    }

    const paid = await panel();
    expect(stat(paid, 'Opłacone pilotaże (z reklam)')).toBe(1);
    expect(headline(paid)).toBe('GO: firma z reklamy zapłaciła za pilotaż');
    expect(paid).toContain('prawdziwe pieniądze');
    expect(paid).toContain('prawdziwy@hurtownia-test.pl');
    expect(paid).toContain('Hurtownia Płatna Sp. z o.o.');
    expect(paid).toContain('Przychód z prawdziwych, liczonych płatności Stripe: 602,70 zł');
    const orderId = latestOrderId(paid);

    // "Nie licz": np. to byla wlasna proba albo platnosc zostala zwrocona.
    expect((await adminPost('order-exclude', { id: orderId, excluded: '1' })).status).toBe(303);
    const excluded = await panel();
    expect(stat(excluded, 'Opłacone pilotaże (z reklam)')).toBe(0);
    expect(stat(excluded, 'Płatności nie liczone')).toBe(1);
    expect(headline(excluded)).not.toContain('GO');
    expect(excluded).toContain('Przychód z prawdziwych, liczonych płatności Stripe: 0,00 zł');

    // Przywrocenie i zmiana zrodla na "inne": platnosc jest prawdziwa, ale nie dowodzi, ze dzialaja reklamy.
    await adminPost('order-exclude', { id: orderId, excluded: '0' });
    expect(headline(await panel())).toBe('GO: firma z reklamy zapłaciła za pilotaż');
    await adminPost('order-source', { id: orderId, ad: '0' });
    const other = await panel();
    expect(stat(other, 'Opłacone pilotaże (z reklam)')).toBe(0);
    expect(stat(other, 'Płatności z innych źródeł')).toBe(1);
    expect(headline(other)).not.toContain('GO');
  });

  it('wlasna platnosc zalogowanego wlasciciela jest od razu wykluczona i nie daje falszywego GO', async () => {
    await resetCounting();
    await stripeLive(true);
    try {
      // Bramka 1 z instrukcji: wlasciciel sam przechodzi sciezke prawdziwa karta, bedac zalogowanym do panelu.
      await pay({ headers: { 'User-Agent': UA, 'CF-Connecting-IP': '203.0.113.60', Cookie: cookie }, ad: true, livemode: true, complete: true, email: 'wlasciciel@plar-test.pl' });
    } finally {
      await stripeLive(false);
    }
    const html = await panel();
    expect(html).toContain('wlasciciel@plar-test.pl');
    expect(stat(html, 'Opłacone pilotaże (z reklam)')).toBe(0);
    expect(stat(html, 'Płatności nie liczone')).toBe(1);
    expect(stat(html, 'Rozpoczęte płatności')).toBe(0);
    expect(headline(html)).not.toContain('GO');
    expect(html).toContain('<span class="pill off">nie liczona</span>');
  });
});

describe('pomiar lejka i werdykt', () => {
  it('liczy unikalne wejscia z reklam, pomija roboty i wejscia zalogowanego wlasciciela', async () => {
    const before = await panel();
    const adBefore = stat(before, 'Wejścia z reklam (Sonda)');
    const botsBefore = stat(before, 'Wejścia robotów');
    const visitorsBefore = stat(before, 'Unikalni odwiedzający');

    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=a1&utm_term=fraza+testowa`, visitor);
    await get(`/${SLUG}?gclid=a1&utm_term=fraza+testowa`, visitor); // odswiezenie: ten sam odwiedzajacy
    await get(`/${SLUG}?gclid=bot`, { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'CF-Connecting-IP': '203.0.113.250' });
    await get(`/${SLUG}`, newVisitor()); // wejscie bez reklamy
    await fetch(`${base}/${SLUG}?gclid=head`, { method: 'HEAD', headers: newVisitor() }); // HEAD nie jest wejsciem
    // Wlasciciel oglada wlasna strone z linku reklamy, bedac zalogowanym: to nie jest klikniecie klienta.
    await get(`/${SLUG}?gclid=owner&utm_term=fraza+wlasciciela`, { 'User-Agent': UA, 'CF-Connecting-IP': '203.0.113.61', Cookie: cookie });

    const after = await panel();
    expect(stat(after, 'Wejścia z reklam (Sonda)')).toBe(adBefore + 1);
    expect(stat(after, 'Unikalni odwiedzający')).toBe(visitorsBefore + 2);
    expect(stat(after, 'Wejścia robotów')).toBe(botsBefore + 1);
    expect(after).toContain('fraza testowa');
    expect(after).not.toContain('fraza wlasciciela');
  });

  it('klikniecia w przyciski sa zliczane, a smieciowe nazwy odrzucane', async () => {
    const before = stat(await panel(), 'Kliknięcia w przyciski');
    const visitor = newVisitor();
    expect((await postJson(`/api/${SLUG}/event`, { target: 'hero_primary', ad: true }, visitor)).status).toBe(204);
    expect((await postJson(`/api/${SLUG}/event`, { target: '<script>' }, visitor)).status).toBe(204);
    expect(stat(await panel(), 'Kliknięcia w przyciski')).toBe(before + 1);
  });

  it('scenariusz GO: licznik od zera, 60 wejsc, trzy firmy; dopiero ocena wlasciciela daje GO', { timeout: 90_000 }, async () => {
    await resetCounting();
    const zero = await panel();
    expect(headline(zero)).toBe('Brak danych');
    expect(stat(zero, 'Wejścia z reklam (Sonda)')).toBe(0);
    expect(stat(zero, 'Zgłoszenia (wszystkie)')).toBe(0);
    expect(zero).toContain('Lejek liczony od:');

    const emails = ['firma1@seria-test.pl', 'firma2@seria-test.pl', 'firma3@seria-test.pl'];
    for (const email of emails) {
      const visitor = newVisitor();
      await get(`/${SLUG}?gclid=go-${email}&utm_term=seria`, visitor);
      await postForm(`/api/${SLUG}/lead`, lead(email, { ad: '1', utm_term: 'seria' }), visitor);
    }
    await adVisits(57, 'seria');

    const before = await panel();
    expect(stat(before, 'Wejścia z reklam (Sonda)')).toBe(60);
    expect(stat(before, 'Do oceny (z reklam)')).toBe(3);
    // Sa zgloszenia, ale zadnego nie oceniono: ani GO, ani NO-GO.
    expect(headline(before)).toBe('Nierozstrzygnięte: za mała próba na NO-GO');
    expect(before).toContain('Nieocenione zgłoszenia z reklam: 3');

    expect(await rateLead(leadIdFor(before, emails[0] as string), 'qualified')).toBe(303);
    expect(await rateLead(leadIdFor(before, emails[1] as string), 'qualified')).toBe(303);
    const mid = await panel();
    expect(stat(mid, 'Prawdziwe firmy (z reklam)')).toBe(2);
    expect(headline(mid)).toBe('Nierozstrzygnięte: sygnał częściowy');

    expect(await rateLead(leadIdFor(before, emails[2] as string), 'data_received')).toBe(303);
    const after = await panel();
    expect(stat(after, 'Prawdziwe firmy (z reklam)')).toBe(3);
    expect(stat(after, 'Z danymi, po rozmowie lub wpłacie')).toBe(1);
    expect(headline(after)).toBe('GO: reklamy przyprowadzają firmy');
  });

  it('ocena zgloszenia wymaga logowania i poprawnej wartosci', async () => {
    const html = await panel();
    const id = leadIdFor(html, 'firma1@seria-test.pl');
    expect((await adminPost('lead-status', { id, status: 'disqualified' }, false)).status).toBe(401);
    await rateLead(id, 'cokolwiek-innego');
    expect(stat(await panel(), 'Prawdziwe firmy (z reklam)')).toBe(3);
  });

  it('scenariusz NO-GO: dopiero 200 wejsc potwierdzonych w Google Ads, i nigdy gdy cos czeka na czlowieka', { timeout: 120_000 }, async () => {
    await resetCounting();
    await adVisits(200, 'nogo');
    const today = new Date().toISOString().slice(0, 10);

    // 1. Koniec testu wg wlasnego licznika, ale bez liczb z Google: panel nie ufa sam sobie.
    const unconfirmed = await panel();
    expect(stat(unconfirmed, 'Wejścia z reklam (Sonda)')).toBe(200);
    expect(headline(unconfirmed)).toBe('Najpierw sprawdź i oceń');
    expect(unconfirmed).toContain('nie wpisałeś kliknięć z Google Ads');

    // 2. Google widzi tylko 100 klikniec: nadwyzka to sztuczne wejscia, do progow liczy sie 100.
    const first = await adminPost('ad-report', { day: today, clicks: '100', cost: '300' });
    expect(first.headers.get('location')).toContain(`msg=zapisano&dzien=${today}`);
    const inflated = await panel();
    expect(stat(inflated, 'Wejścia z reklam (do progów)')).toBe(100);
    expect(headline(inflated)).toBe('Nierozstrzygnięte: za mała próba na NO-GO');
    expect(inflated).toContain('UWAGA: Sonda widzi 200 wejść z reklam, a Google raportuje 100');

    // 3. Poprawka wpisu dla tego samego dnia: panel mowi wprost, ze zastapil, a nie dodal.
    const second = await adminPost('ad-report', { day: today, clicks: '210', cost: '630,00' });
    expect(second.headers.get('location')).toContain(`msg=zastapiono&dzien=${today}`);
    expect(await adminPage(`/admin/x/${SLUG}?msg=zastapiono&dzien=${today}`)).toContain('ZASTĄPIONY');
    const nogo = await panel();
    expect(stat(nogo, 'Kliknięcia wg Google')).toBe(210);
    expect(headline(nogo)).toBe('NO-GO: reklamy nie przyprowadzają firm');
    expect(nogo).toContain('Nie jest to werdykt o samym produkcie');

    // 4. Zgloszenie bez sladu reklamy (firma wrocila innego dnia): NO-GO znika, dopoki go nie ocenisz.
    await postForm(`/api/${SLUG}/lead`, lead('powrot-po-tygodniu@firma-test.pl', { wants_invoice: '1' }), newVisitor());
    const waiting = await panel();
    expect(headline(waiting)).toBe('Najpierw sprawdź i oceń');
    expect(waiting).toContain('są nieocenione zgłoszenia');
    const id = leadIdFor(waiting, 'powrot-po-tygodniu@firma-test.pl');

    // 5. Prawdziwa firma ze zrodlem "inne" nadal blokuje NO-GO.
    await rateLead(id, 'qualified');
    const other = await panel();
    expect(stat(other, 'Prawdziwe firmy (inne źródła)')).toBe(1);
    expect(headline(other)).toBe('Najpierw sprawdź i oceń');
    expect(other).toContain('są prawdziwe firmy ze źródłem „inne”');

    // 6. Wlasciciel poprawia zrodlo na "reklama": jedna firma na 200 wejsc to nadal NO-GO dla kanalu.
    expect((await adminPost('lead-source', { id, ad: '1' })).status).toBe(303);
    const one = await panel();
    expect(stat(one, 'Prawdziwe firmy (z reklam)')).toBe(1);
    expect(stat(one, 'Prawdziwe firmy (inne źródła)')).toBe(0);
    expect(headline(one)).toBe('NO-GO: reklamy nie przyprowadzają firm');

    // 7. Ta firma placi przelewem za fakture pro forma: wlasciciel zapisuje to ocena "zaplacila" i jest GO.
    await rateLead(id, 'paid');
    const paid = await panel();
    expect(stat(paid, 'Opłacone pilotaże (z reklam)')).toBe(1);
    expect(stat(paid, 'Z danymi, po rozmowie lub wpłacie')).toBe(1);
    expect(headline(paid)).toBe('GO: firma z reklamy zapłaciła za pilotaż');
  });

  it('dane z Google Ads daja koszt klikniecia i koszt jednej prawdziwej firmy', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const res = await adminPost('ad-report', { day: today, clicks: '60', cost: '180,00' });
    expect(res.status).toBe(303);
    const html = await panel();
    expect(statValue(html, 'Kliknięcia wg Google')).toBe('60');
    expect(statValue(html, 'Średni koszt kliknięcia')).toBe('3,00 zł');
    expect(statValue(html, 'Koszt jednej prawdziwej firmy')).toBe('180,00 zł');

    const bad = await adminPost('ad-report', { day: 'wczoraj', clicks: '-5', cost: 'duzo' });
    expect(bad.headers.get('location')).toContain('msg=bledne');
    expect(statValue(await panel(), 'Kliknięcia wg Google')).toBe('60');
  });

  it('"Licz od poczatku" przywraca caly lejek', async () => {
    const narrow = stat(await panel(), 'Zgłoszenia (wszystkie)');
    const res = await adminPost('start-counting', { mode: 'all' });
    expect(res.status).toBe(303);
    const wide = await panel();
    expect(stat(wide, 'Zgłoszenia (wszystkie)')).toBeGreaterThan(narrow);
    expect(wide).toContain('Lejek liczony <strong>od początku</strong>');
  });
});

describe('panel wlasciciela', () => {
  it('bez logowania nie pokazuje danych i nie wykonuje zadnej akcji', async () => {
    const res = await get('/admin', newVisitor());
    expect(res.status).toBe(401);
    expect(await res.text()).not.toContain('Eksperymenty');
    expect((await get(`/admin/x/${SLUG}`, newVisitor())).status).toBe(401);
    expect((await get(`/admin/x/${SLUG}/leads.csv`, newVisitor())).status).toBe(401);
    expect((await get('/admin/selftest', newVisitor())).status).toBe(401);
    for (const action of ['lead-status', 'lead-source', 'lead-delete', 'order-exclude', 'order-source', 'start-counting', 'ad-report']) {
      expect((await adminPost(action, { id: '1', confirm: '1', mode: 'now' }, false)).status).toBe(401);
    }
  });

  it('zle haslo nie loguje, podrobione ciasteczko nie dziala', async () => {
    const res = await postForm('/admin/login', { token: 'zle-haslo' }, newVisitor());
    expect(res.status).toBe(401);
    expect(res.headers.get('set-cookie')).toBeNull();
    const forged = await fetch(`${base}/admin`, { headers: { Cookie: `sonda_admin=${Math.floor(Date.now() / 1000) + 9999}.${'a'.repeat(64)}`, 'User-Agent': UA } });
    expect(forged.status).toBe(401);
  });

  it('zadanie POST z obcej domeny jest odrzucane', async () => {
    const res = await fetch(`${base}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: 'https://zla-strona.example', 'User-Agent': UA },
      body: new URLSearchParams({ token: ADMIN_TOKEN }).toString(),
      redirect: 'manual',
    });
    expect(res.status).toBe(403);
    const action = await fetch(`${base}/admin/x/${SLUG}/lead-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: 'https://zla-strona.example', 'User-Agent': UA, Cookie: cookie },
      body: new URLSearchParams({ id: '1', confirm: '1' }).toString(),
      redirect: 'manual',
    });
    expect(action.status).toBe(403);
  });

  it('usuniecie zgloszenia (prosba o usuniecie danych) wymaga potwierdzenia i jest trwale', async () => {
    const email = 'do-usuniecia@firma-test.pl';
    await postForm(`/api/${SLUG}/lead`, lead(email), newVisitor());
    const id = leadIdFor(await panel(), email);

    const unconfirmed = await adminPost('lead-delete', { id });
    expect(unconfirmed.headers.get('location')).toContain('msg=potwierdz');
    expect(await panel()).toContain(email);

    const confirmed = await adminPost('lead-delete', { id, confirm: '1' });
    expect(confirmed.headers.get('location')).toContain('msg=usunieto');
    expect(await panel()).not.toContain(email);
    const csv = await (await fetch(`${base}/admin/x/${SLUG}/leads.csv`, { headers: { Cookie: cookie, 'User-Agent': UA } })).text();
    expect(csv).not.toContain(email);
  });

  it('eksport CSV otwiera sie w polskim Excelu i jest bezpieczny dla arkusza', async () => {
    await postForm(`/api/${SLUG}/lead`, lead('csv@firma-test.pl', { company: '=CMD()' }), newVisitor());
    const res = await fetch(`${base}/admin/x/${SLUG}/leads.csv`, { headers: { Cookie: cookie, 'User-Agent': UA } });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/csv');
    const bytes = new Uint8Array(await res.arrayBuffer());
    // Znacznik BOM: bez niego Excel psuje polskie litery.
    expect([...bytes.slice(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
    const csv = new TextDecoder().decode(bytes);
    const headerLine = csv.split('\r\n')[0] ?? '';
    expect(headerLine).toContain('"email";"firma";"nip";"program"');
    expect(csv).toContain('"csv@firma-test.pl"');
    expect(csv).toContain(`"'=CMD()"`);
    expect(csv).toContain('"Subiekt GT"');
    expect(csv).toContain('"do oceny"');
  });

  it('autotest wykrywa prawdziwe problemy konfiguracji i potwierdza dzialajacy zapis', async () => {
    const html = await adminPage('/admin/selftest');
    expect(html).toContain('Zapis zgłoszenia do bazy działa');
    expect(html).toContain('Wpis próbny został zapisany, odczytany i usunięty.');
    expect(html).toContain('Wszystkie znaczniki czasu mają 10 cyfr');
    // W testach uzywamy klucza testowego Stripe: autotest ma to wyraznie powiedziec.
    expect(html).toContain('Klucz testowy');
    // SITE_URL ma w testach ukosnik na koncu: autotest to zauwaza i podaje poprawna wartosc.
    expect(html).toContain('SITE_URL ma zbędny ukośnik');
    expect(html).toContain(`wpisz dokładnie: ${base}`);
    // Wpis probny z autotestu nie zostaje w bazie.
    expect(await panel()).not.toContain('autotest+');
  });

  it('wylogowanie czysci ciasteczko sesji', async () => {
    const fresh = await login();
    const res = await fetch(`${base}/admin/logout`, { method: 'POST', headers: { Cookie: fresh, 'User-Agent': UA }, redirect: 'manual' });
    expect(res.status).toBe(303);
    expect(res.headers.get('set-cookie')).toMatch(/sonda_admin=;.*Max-Age=0/);
  });
});

describe('swieze wdrozenie: bez migracji, bez Stripe, eksperyment jeszcze niepubliczny', () => {
  let bareCookie = '';

  it('odwiedzajacy widza 404, a formularz nie przyjmuje zgloszen', async () => {
    expect((await fetch(`${bare}/${SLUG}`, { headers: newVisitor() })).status).toBe(404);
    expect((await postForm(`/api/${SLUG}/lead`, lead('za-wczesnie@firma-test.pl'), newVisitor(), bare)).status).toBe(404);
  });

  it('logowanie dziala, mimo ze w bazie nie ma jeszcze zadnej tabeli', async () => {
    bareCookie = await login(bare);
    expect(bareCookie).toContain('sonda_admin=');
  });

  it('panel zamiast bledu 500 bez tresci mowi, co zrobic, a autotest wskazuje brakujace tabele', async () => {
    const res = await fetch(`${bare}/admin`, { headers: { Cookie: bareCookie, 'User-Agent': UA } });
    expect(res.status).toBe(500);
    const html = await res.text();
    expect(html).toContain('Baza danych nie odpowiada');
    expect(html).toContain('npm run db:migrate:remote');

    const selftest = await fetch(`${bare}/admin/selftest`, { headers: { Cookie: bareCookie, 'User-Agent': UA } });
    expect(selftest.status).toBe(200);
    const report = await selftest.text();
    expect(report).toContain('Brakuje tabel: events, leads, orders');
    expect(report).toContain('Żaden eksperyment nie jest publiczny');
    expect(report).toContain('Brak STRIPE_SECRET_KEY');
    expect(report).toContain('Błędy blokujące');
  });

  it('wlasciciel widzi podglad strony; bez Stripe nie ma przycisku platnosci, jest faktura pro forma', async () => {
    const res = await fetch(`${bare}/${SLUG}`, { headers: { Cookie: bareCookie, 'User-Agent': UA } });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('PODGLĄD: ten eksperyment nie jest publiczny');
    expect(html).not.toContain(`/api/${SLUG}/checkout`);
    expect(html).toContain('name="wants_invoice"');
    expect(html).toContain('602,70 zł');
  });
});
