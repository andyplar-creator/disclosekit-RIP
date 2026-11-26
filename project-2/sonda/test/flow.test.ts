// Testy integracyjne: prawdziwy Worker + lokalna baza D1 + atrapy Stripe i Claude.
// Kazdy test uzywa innego adresu IP, wiec ma wlasnego "odwiedzajacego" i wlasne limity.

import { createHmac } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { ADMIN_TOKEN, WEBHOOK_SECRET } from './global-setup';

const SLUG = 'zamowienia-z-maila';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
let base = '';
let ipCounter = 10;

function newVisitor(): Record<string, string> {
  ipCounter += 1;
  return { 'User-Agent': UA, 'CF-Connecting-IP': `198.51.100.${ipCounter}` };
}

function get(path: string, headers: Record<string, string>): Promise<Response> {
  return fetch(base + path, { headers, redirect: 'manual' });
}

function postForm(path: string, fields: Record<string, string>, headers: Record<string, string>): Promise<Response> {
  return fetch(base + path, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
    redirect: 'manual',
  });
}

function postJson(path: string, data: unknown, headers: Record<string, string>): Promise<Response> {
  return fetch(base + path, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(data), redirect: 'manual' });
}

async function adminCookie(): Promise<string> {
  const res = await postForm('/admin/login', { token: ADMIN_TOKEN }, newVisitor());
  expect(res.status).toBe(303);
  const cookie = res.headers.get('set-cookie');
  expect(cookie).toContain('sonda_admin=');
  expect(cookie).toContain('HttpOnly');
  return (cookie as string).split(';')[0] as string;
}

async function adminPage(path: string): Promise<string> {
  const res = await fetch(base + path, { headers: { Cookie: await adminCookie(), 'User-Agent': UA } });
  expect(res.status).toBe(200);
  return res.text();
}

/** Odczytuje liczbe z kafelka statystyki w panelu po jego etykiecie. */
function statValue(html: string, label: string): string {
  const pattern = new RegExp(`<small>${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</small><div class="big">([^<]*)</div>`);
  const match = pattern.exec(html);
  if (!match) throw new Error(`Nie znaleziono kafelka „${label}” w panelu`);
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

/** Id zgloszenia odczytane z panelu po adresie e-mail. */
function leadIdFor(html: string, email: string): string {
  const row = html.split('<tr>').find((part) => part.includes(email));
  if (!row) throw new Error(`Brak zgloszenia ${email} w panelu`);
  const match = /name="id" value="(\d+)"/.exec(row);
  if (!match) throw new Error(`Brak id zgloszenia ${email}`);
  return match[1] as string;
}

async function rateLead(cookie: string, id: string, status: string): Promise<number> {
  const res = await fetch(`${base}/admin/x/${SLUG}/lead-status`, {
    method: 'POST',
    headers: { Cookie: cookie, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
    body: new URLSearchParams({ id, status }).toString(),
    redirect: 'manual',
  });
  return res.status;
}

beforeAll(() => {
  base = process.env.SONDA_BASE as string;
  expect(base).toMatch(/^http:\/\/127\.0\.0\.1:\d+$/);
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
    expect(html).toContain('Tak wygląda zamówienie po odczytaniu');
    expect(html).toContain('4 900 zł');
    expect(html).not.toContain('199 zł');
    expect(html).toContain(`action="/api/${SLUG}/lead"`);
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

  it('strony prawne dzialaja po polsku i po angielsku', async () => {
    const pl = await (await get('/polityka-prywatnosci', newVisitor())).text();
    expect(pl).toContain('Administrator');
    expect(pl).toContain('nie zapisuje odwiedzającym żadnych ciasteczek');
    const en = await (await get('/regulamin?lang=en', newVisitor())).text();
    expect(en).toContain('Pre-order terms');
  });
});

describe('zgloszenie firmy', () => {
  it('zapisuje zgloszenie z reklamy ze wszystkimi polami i pokazuje potwierdzenie', async () => {
    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=xyz&utm_campaign=orders&utm_term=hurtownia`, visitor);
    const res = await postForm(
      `/api/${SLUG}/lead`,
      lead('Anna.Kowalska@Hurtownia-Test.pl', { nip: '5222940634', phone: '600 100 200', wants_invoice: '1', ad: '1', utm_campaign: 'orders', utm_term: 'hurtownia' }),
      visitor,
    );
    expect(res.status).toBe(303);
    expect(res.headers.get('location')).toBe(`/${SLUG}?zapis=ok#zapis`);
    const confirmation = await (await get(`/${SLUG}?zapis=ok`, visitor)).text();
    expect(confirmation).toContain('Zgłoszenie przyjęte.');

    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(panel).toContain('anna.kowalska@hurtownia-test.pl');
    expect(panel).toContain('Hurtownia Test Sp. z o.o.');
    expect(panel).toContain('Subiekt GT');
    expect(panel).toContain('NIP 5222940634');
    expect(panel).toContain('600 100 200');
    expect(Number(statValue(panel, 'Prośby o fakturę pro forma'))).toBeGreaterThanOrEqual(1);
  });

  it('ten sam adres drugi raz nie tworzy duplikatu', async () => {
    const fields = lead('duplikat@firma-test.pl');
    expect((await postForm(`/api/${SLUG}/lead`, fields, newVisitor())).headers.get('location')).toContain('zapis=ok');
    expect((await postForm(`/api/${SLUG}/lead`, fields, newVisitor())).headers.get('location')).toContain('zapis=duplikat');
  });

  it('odrzuca zly e-mail, brak zgody i brak danych firmy', async () => {
    expect((await postForm(`/api/${SLUG}/lead`, lead('to-nie-email'), newVisitor())).headers.get('location')).toContain('zapis=blad');
    const noConsent = lead('bez-zgody@firma-test.pl');
    delete noConsent.consent;
    expect((await postForm(`/api/${SLUG}/lead`, noConsent, newVisitor())).headers.get('location')).toContain('zapis=zgoda');
    // Sam adres e-mail to nie zgloszenie firmy: bez programu i liczby zamowien nie przyjmujemy.
    expect((await postForm(`/api/${SLUG}/lead`, { email: 'sam-mail@firma-test.pl', consent: '1' }, newVisitor())).headers.get('location')).toContain('zapis=brak');
    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(panel).not.toContain('bez-zgody@firma-test.pl');
    expect(panel).not.toContain('sam-mail@firma-test.pl');
  });

  it('pulapka na roboty: podejrzane zgloszenie nie ginie, ale nie liczy sie do lejka', async () => {
    const before = Number(statValue(await adminPage(`/admin/x/${SLUG}`), 'Zgłoszenia (wszystkie)'));
    const res = await postForm(`/api/${SLUG}/lead`, lead('robot@spam-test.pl', { website: 'http://spam.example', ad: '1' }), newVisitor());
    expect(res.headers.get('location')).toContain('zapis=ok');
    // Zgloszenie z przegladarki przedstawiajacej sie jak robot tez zostaje zapisane i oznaczone.
    await postForm(`/api/${SLUG}/lead`, lead('headless@firma-test.pl'), { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/131.0.0.0 Safari/537.36', 'CF-Connecting-IP': '198.51.100.251' });
    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(panel).toContain('robot@spam-test.pl');
    expect(panel).toContain('podejrzane: ukryte pole');
    expect(panel).toContain('headless@firma-test.pl');
    expect(panel).toContain('podejrzane: robot');
    expect(Number(statValue(panel, 'Zgłoszenia (wszystkie)'))).toBe(before);
    expect(Number(statValue(panel, 'Podejrzane (robot)'))).toBeGreaterThanOrEqual(2);
  });

  it('limit prob na jednego odwiedzajacego', async () => {
    const visitor = newVisitor();
    let last = '';
    for (let i = 0; i < 11; i++) {
      const res = await postForm(`/api/${SLUG}/lead`, lead(`limit${i}@firma-test.pl`), visitor);
      last = res.headers.get('location') ?? '';
    }
    expect(last).toContain('zapis=limit');
  });

  it('wstrzykniety HTML w polach zgloszenia nie wykonuje sie w panelu', async () => {
    await postForm(`/api/${SLUG}/lead`, lead('xss@firma-test.pl', { company: '<img src=x onerror=alert(1)>', erp: '"><script>alert(2)</script>' }), newVisitor());
    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(panel).not.toContain('<img src=x onerror=alert(1)>');
    expect(panel).not.toContain('<script>alert(2)</script>');
    expect(panel).toContain('&lt;img src=x onerror=alert(1)&gt;');
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

  it('limit uruchomien na odwiedzajacego', async () => {
    const visitor = newVisitor();
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await postJson(`/api/${SLUG}/demo`, { text: `zamówienie ${i}: 2 kg kawy` }, visitor)).status);
    expect(statuses.slice(0, 6)).toEqual([200, 200, 200, 200, 200, 200]);
    expect(statuses[6]).toBe(429);
  });
});

describe('platnosc', () => {
  it('bez zaznaczonego regulaminu nie tworzy sesji', async () => {
    const res = await postForm(`/api/${SLUG}/checkout`, {}, newVisitor());
    expect(res.headers.get('location')).toContain('platnosc=regulamin');
  });

  it('pelna sciezka: sesja Stripe -> webhook -> zamowienie oplacone dokladnie raz', async () => {
    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=pay1&utm_term=platnosc`, visitor);
    const checkout = await postForm(`/api/${SLUG}/checkout`, { terms: '1', ad: '1', utm_term: 'platnosc' }, visitor);
    expect(checkout.status).toBe(303);
    const payUrl = checkout.headers.get('location') ?? '';
    expect(payUrl).toContain('/pay/cs_test_mock_');
    const sessionId = payUrl.slice(payUrl.lastIndexOf('/') + 1);

    const before = await adminPage(`/admin/x/${SLUG}`);
    expect(before).toContain('started');
    const paidTestBefore = Number(statValue(before, 'Opłacone (testowe)'));

    const event = JSON.stringify({
      id: 'evt_test_1',
      type: 'checkout.session.completed',
      livemode: false,
      data: { object: { id: sessionId, payment_status: 'paid', customer_details: { email: 'Kupujacy@Hurtownia-Test.pl' } } },
    });

    // Zly podpis przy aktualnym znaczniku czasu: odrzucony wylacznie z powodu podpisu.
    const forgedHeader = `t=${Math.floor(Date.now() / 1000)},v1=${'0'.repeat(64)}`;
    const forged = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': forgedHeader }, body: event });
    expect(forged.status).toBe(400);
    // Brak naglowka i stary znacznik czasu (atak powtorzeniowy) tez sa odrzucane.
    expect((await fetch(`${base}/stripe/webhook`, { method: 'POST', body: event })).status).toBe(400);
    const stale = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event, Math.floor(Date.now() / 1000) - 3600) }, body: event });
    expect(stale.status).toBe(400);
    expect(statValue(await adminPage(`/admin/x/${SLUG}`), 'Opłacone (testowe)')).toBe(String(paidTestBefore));

    // Dobry podpis, dwa razy (Stripe ponawia webhooki): zamowienie oplacone raz.
    for (let i = 0; i < 2; i++) {
      const res = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event) }, body: event });
      expect(res.status).toBe(200);
    }

    const after = await adminPage(`/admin/x/${SLUG}`);
    expect(after).toContain('kupujacy@hurtownia-test.pl');
    expect(Number(statValue(after, 'Opłacone (testowe)'))).toBe(paidTestBefore + 1);
    // Platnosc testowa NIE liczy sie do werdyktu.
    expect(statValue(after, 'Opłacone (prawdziwe)')).toBe('0');
    expect(after).toContain('TESTOWA');
  });

  it('webhook dla nieznanej sesji jest przyjmowany, ale niczego nie tworzy', async () => {
    const event = JSON.stringify({ id: 'evt_x', type: 'checkout.session.completed', livemode: false, data: { object: { id: 'cs_test_nieznana', payment_status: 'paid' } } });
    const res = await fetch(`${base}/stripe/webhook`, { method: 'POST', headers: { 'Stripe-Signature': stripeSignature(event) }, body: event });
    expect(res.status).toBe(200);
    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(panel).not.toContain('cs_test_nieznana');
  });

  it('strona podziekowania dziala', async () => {
    const html = await (await get(`/${SLUG}/dziekuje?session_id=cs_test_abc`, newVisitor())).text();
    expect(html).toContain('Dziękuję');
  });
});

describe('pomiar lejka i werdykt', () => {
  it('liczy unikalne wejscia z reklam, pomija roboty i wejscia wlasciciela w podgladzie', async () => {
    const before = await adminPage(`/admin/x/${SLUG}`);
    const adBefore = Number(statValue(before, 'Wejścia z reklam'));
    const botsBefore = Number(statValue(before, 'Wejścia robotów'));

    const visitor = newVisitor();
    await get(`/${SLUG}?gclid=a1&utm_term=fraza+testowa`, visitor);
    await get(`/${SLUG}?gclid=a1&utm_term=fraza+testowa`, visitor); // odswiezenie: ten sam odwiedzajacy
    await get(`/${SLUG}?gclid=bot`, { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'CF-Connecting-IP': '198.51.100.250' });
    await get(`/${SLUG}`, newVisitor()); // wejscie bez reklamy
    await fetch(`${base}/${SLUG}?gclid=head`, { method: 'HEAD', headers: newVisitor() }); // HEAD nie jest wejsciem

    const after = await adminPage(`/admin/x/${SLUG}`);
    expect(Number(statValue(after, 'Wejścia z reklam'))).toBe(adBefore + 1);
    expect(Number(statValue(after, 'Wejścia robotów'))).toBe(botsBefore + 1);
    expect(after).toContain('fraza testowa');
  });

  it('klikniecia w przyciski sa zliczane, a smieciowe nazwy odrzucane', async () => {
    const before = Number(statValue(await adminPage(`/admin/x/${SLUG}`), 'Kliknięcia w przyciski'));
    const visitor = newVisitor();
    expect((await postJson(`/api/${SLUG}/event`, { target: 'hero_primary', ad: true }, visitor)).status).toBe(204);
    expect((await postJson(`/api/${SLUG}/event`, { target: '<script>' }, visitor)).status).toBe(204);
    const after = Number(statValue(await adminPage(`/admin/x/${SLUG}`), 'Kliknięcia w przyciski'));
    expect(after).toBe(before + 1);
  });

  it('werdykt: najpierw kaze ocenic zgloszenia, po ocenie przechodzi w GO', async () => {
    // 60 wejsc z reklam, 3 zgloszenia firm z reklam.
    const emails = ['firma1@seria-test.pl', 'firma2@seria-test.pl', 'firma3@seria-test.pl'];
    for (let i = 0; i < 60; i++) {
      const visitor = newVisitor();
      await get(`/${SLUG}?gclid=go${i}&utm_term=seria`, visitor);
      const email = emails[i];
      if (email) await postForm(`/api/${SLUG}/lead`, lead(email, { ad: '1', utm_term: 'seria' }), visitor);
    }
    const before = await adminPage(`/admin/x/${SLUG}`);
    expect(Number(statValue(before, 'Wejścia z reklam'))).toBeGreaterThanOrEqual(60);
    // Sa zgloszenia, ale zadnego nie oceniono: panel nie oglasza ani GO, ani NO-GO.
    expect(before).toContain('Najpierw oceń zgłoszenia');
    expect(before).not.toContain('GO: reklamy przyprowadzają firmy');

    const cookie = await adminCookie();
    expect(await rateLead(cookie, leadIdFor(before, emails[0] as string), 'qualified')).toBe(303);
    expect(await rateLead(cookie, leadIdFor(before, emails[1] as string), 'qualified')).toBe(303);
    const mid = await adminPage(`/admin/x/${SLUG}`);
    expect(statValue(mid, 'Ocenione jako firmy')).toBe('2');
    expect(mid).not.toContain('GO: reklamy przyprowadzają firmy');

    expect(await rateLead(cookie, leadIdFor(before, emails[2] as string), 'data_received')).toBe(303);
    const after = await adminPage(`/admin/x/${SLUG}`);
    expect(statValue(after, 'Ocenione jako firmy')).toBe('3');
    expect(statValue(after, 'Z danymi lub po rozmowie')).toBe('1');
    expect(after).toContain('GO: reklamy przyprowadzają firmy');
  });

  it('ocena zgloszenia wymaga logowania i poprawnej wartosci', async () => {
    const unauth = await fetch(`${base}/admin/x/${SLUG}/lead-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
      body: new URLSearchParams({ id: '1', status: 'qualified' }).toString(),
      redirect: 'manual',
    });
    expect(unauth.status).toBe(401);
    const cookie = await adminCookie();
    const panel = await adminPage(`/admin/x/${SLUG}`);
    const id = leadIdFor(panel, 'firma1@seria-test.pl');
    await rateLead(cookie, id, 'cokolwiek-innego');
    const after = await adminPage(`/admin/x/${SLUG}`);
    expect(statValue(after, 'Ocenione jako firmy')).toBe('3');
  });

  it('dane z Google Ads daja koszt klikniecia i koszt jednej prawdziwej firmy', async () => {
    const cookie = await adminCookie();
    const res = await fetch(`${base}/admin/x/${SLUG}/ad-report`, {
      method: 'POST',
      headers: { Cookie: cookie, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
      body: new URLSearchParams({ day: '2026-11-26', clicks: '60', cost: '180,00' }).toString(),
      redirect: 'manual',
    });
    expect(res.status).toBe(303);
    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(statValue(panel, 'Kliknięcia wg Google')).toBe('60');
    expect(statValue(panel, 'Średni koszt kliknięcia')).toBe('3,00 zł');
    expect(statValue(panel, 'Koszt jednej prawdziwej firmy')).toBe('60,00 zł');
  });
});

describe('panel wlasciciela', () => {
  it('bez logowania nie pokazuje danych', async () => {
    const res = await get('/admin', newVisitor());
    expect(res.status).toBe(401);
    expect(await res.text()).not.toContain('Eksperymenty');
    expect((await get(`/admin/x/${SLUG}`, newVisitor())).status).toBe(401);
    expect((await get(`/admin/x/${SLUG}/leads.csv`, newVisitor())).status).toBe(401);
    expect((await get('/admin/selftest', newVisitor())).status).toBe(401);
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
  });

  it('eksport CSV zawiera leady i jest bezpieczny dla arkusza', async () => {
    await postForm(`/api/${SLUG}/lead`, lead('csv@firma-test.pl', { company: '=CMD()' }), newVisitor());
    const res = await fetch(`${base}/admin/x/${SLUG}/leads.csv`, { headers: { Cookie: await adminCookie(), 'User-Agent': UA } });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/csv');
    const csv = await res.text();
    expect(csv).toContain('"csv@firma-test.pl"');
    expect(csv).toContain(`"'=CMD()"`);
    expect(csv).toContain('"program"');
    expect(csv).toContain('"Subiekt GT"');
  });

  it('autotest wykrywa prawdziwe problemy konfiguracji i potwierdza dzialajacy zapis', async () => {
    const html = await adminPage('/admin/selftest');
    expect(html).toContain('Zapis leada działa od końca do końca');
    expect(html).toContain('Testowy wpis został zapisany, odczytany i usunięty.');
    expect(html).toContain('Wszystkie znaczniki czasu mają 10 cyfr');
    // W testach uzywamy klucza testowego Stripe: autotest ma to wyraznie powiedziec.
    expect(html).toContain('Klucz testowy');
    // Testowy lead z autotestu nie zostaje w bazie.
    const panel = await adminPage(`/admin/x/${SLUG}`);
    expect(panel).not.toContain('autotest+');
  });
});
