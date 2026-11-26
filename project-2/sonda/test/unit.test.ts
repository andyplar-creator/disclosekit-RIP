// Testy czystych funkcji: werdykt, walidacja, atrybucja, podpis Stripe.

import { describe, expect, it } from 'vitest';
import {
  constantTimeEqual,
  csvCell,
  dayKey,
  dayStart,
  escapeHtml,
  hmacSha256Hex,
  isBotUserAgent,
  isValidEmail,
  looksLikeUnixSeconds,
  parseAttribution,
  verifyStripeSignature,
  visitorHash,
} from '../src/lib/pure';
import { computeVerdict, type FunnelCounts } from '../src/lib/verdict';

const T = { minAdClicks: 60, maxAdClicks: 200, goPaidOrders: 1, goQualifiedLeads: 3 };
const counts = (partial: Partial<FunnelCounts>): FunnelCounts => ({
  adClicks: 0,
  humanVisitors: 0,
  adLeadsNew: 0,
  adLeadsQualified: 0,
  adLeadsWithData: 0,
  allLeads: 0,
  paidOrders: 0,
  ...partial,
});

describe('werdykt testu', () => {
  it('bez wejść z reklam nie wydaje werdyktu, nawet gdy są zgłoszenia od znajomych', () => {
    const v = computeVerdict(counts({ humanVisitors: 40, allLeads: 12 }), T);
    expect(v.state).toBe('NO_DATA');
  });

  it('poniżej minimalnej próby tylko zbiera dane', () => {
    const v = computeVerdict(counts({ adClicks: 30, adLeadsQualified: 1 }), T);
    expect(v.state).toBe('COLLECTING');
    expect(v.progress).toBeCloseTo(0.5);
  });

  it('same nieocenione zgłoszenia nigdy nie dają GO', () => {
    const v = computeVerdict(counts({ adClicks: 100, adLeadsNew: 25, allLeads: 25 }), T);
    expect(v.state).not.toBe('GO');
  });

  it('nie ogłasza NO-GO, dopóki są nieocenione zgłoszenia', () => {
    const v = computeVerdict(counts({ adClicks: 100, adLeadsNew: 4 }), T);
    expect(v.state).toBe('REVIEW');
    expect(v.reasons.join(' ')).toContain('Nieocenione zgłoszenia z reklam: 4');
  });

  it('NO-GO: po minimalnej próbie nie zgłosiła się żadna prawdziwa firma', () => {
    const v = computeVerdict(counts({ adClicks: 60 }), T);
    expect(v.state).toBe('NO_GO');
    expect(v.reasons.join(' ')).toContain('Nie jest to werdykt o samym produkcie');
  });

  it('GO: trzy prawdziwe firmy, z których jedna przysłała dane', () => {
    expect(computeVerdict(counts({ adClicks: 80, adLeadsQualified: 3, adLeadsWithData: 1 }), T).state).toBe('GO');
  });

  it('trzy firmy bez żadnych danych ani rozmowy to jeszcze nie GO', () => {
    expect(computeVerdict(counts({ adClicks: 80, adLeadsQualified: 3, adLeadsWithData: 0 }), T).state).toBe('INCONCLUSIVE');
  });

  it('GO od razu po jednej prawdziwej płatności, także przy małej próbie', () => {
    expect(computeVerdict(counts({ adClicks: 12, paidOrders: 1 }), T).state).toBe('GO');
  });

  it('próg płatności równy 0 wyłącza tę regułę', () => {
    expect(computeVerdict(counts({ adClicks: 10, paidOrders: 5 }), { ...T, goPaidOrders: 0 }).state).toBe('COLLECTING');
  });

  it('jedna firma przed końcem testu: nierozstrzygnięte, kontynuuj', () => {
    const v = computeVerdict(counts({ adClicks: 90, adLeadsQualified: 1 }), T);
    expect(v.state).toBe('INCONCLUSIVE');
    expect(v.reasons.join(' ')).toContain('Kontynuuj do 200');
  });

  it('jedna firma na końcu testu: NO-GO dla kanału', () => {
    expect(computeVerdict(counts({ adClicks: 200, adLeadsQualified: 1 }), T).state).toBe('NO_GO');
  });

  it('dwie firmy na końcu testu: szara strefa, obsłuż ręcznie i nic nie buduj', () => {
    const v = computeVerdict(counts({ adClicks: 200, adLeadsQualified: 2, adLeadsWithData: 1 }), T);
    expect(v.state).toBe('INCONCLUSIVE');
    expect(v.reasons.join(' ')).toContain('szara strefa');
  });
});

describe('walidacja i bezpieczeństwo tekstu', () => {
  it('przyjmuje zwykłe adresy e-mail', () => {
    for (const email of ['jan@firma.pl', 'biuro.hurt+zam@sklep-abc.com.pl', 'a_b@x.io']) expect(isValidEmail(email)).toBe(true);
  });

  it('odrzuca śmieci', () => {
    for (const email of ['', 'jan', 'jan@', '@firma.pl', 'jan@firma', 'jan @firma.pl', 'jan@@firma.pl', 'jan@firma..pl', 'jan@-firma.pl', 'jan@firma.p', '<script>@x.pl']) {
      expect(isValidEmail(email)).toBe(false);
    }
  });

  it('escapuje HTML', () => {
    expect(escapeHtml(`<img src=x onerror="a('b')">&`)).toBe('&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;');
  });

  it('zabezpiecza komórki CSV przed formułami', () => {
    expect(csvCell('=HYPERLINK("http://x")')).toBe(`"'=HYPERLINK(""http://x"")"`);
    expect(csvCell('+48123')).toBe(`"'+48123"`);
    expect(csvCell('zwykły tekst')).toBe('"zwykły tekst"');
    expect(csvCell(null)).toBe('');
  });

  it('porównuje w stałym czasie poprawnie', () => {
    expect(constantTimeEqual('abc', 'abc')).toBe(true);
    expect(constantTimeEqual('abc', 'abd')).toBe(false);
    expect(constantTimeEqual('abc', 'abcd')).toBe(false);
  });
});

describe('atrybucja wejść', () => {
  const parse = (query: string) => parseAttribution(new URLSearchParams(query));

  it('rozpoznaje kliknięcie reklamy po gclid', () => {
    expect(parse('gclid=abc123').isAd).toBe(true);
  });

  it('rozpoznaje płatny ruch po utm_medium=cpc i zachowuje frazę', () => {
    const a = parse('utm_source=google&utm_medium=cpc&utm_campaign=orders&utm_term=zam%C3%B3wienia%20z%20maila');
    expect(a.isAd).toBe(true);
    expect(a.utmTerm).toBe('zamówienia z maila');
    expect(a.utmCampaign).toBe('orders');
  });

  it('ruch z LinkedIna nie jest reklamą', () => {
    const a = parse('utm_source=linkedin&utm_medium=social');
    expect(a.isAd).toBe(false);
    expect(a.utmSource).toBe('linkedin');
  });

  it('wejście bez parametrów nie jest reklamą', () => {
    expect(parse('').isAd).toBe(false);
  });

  it('przycina zbyt długie parametry', () => {
    expect(parse(`utm_term=${'x'.repeat(500)}`).utmTerm?.length).toBe(120);
  });
});

describe('roboty', () => {
  it('rozpoznaje roboty i puste nagłówki', () => {
    for (const ua of [null, '', 'curl/8.5.0', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'facebookexternalhit/1.1', 'AdsBot-Google (+http://www.google.com/adsbot.html)']) {
      expect(isBotUserAgent(ua)).toBe(true);
    }
  });

  it('przepuszcza zwykłe przeglądarki', () => {
    expect(isBotUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1')).toBe(false);
    expect(isBotUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36')).toBe(false);
  });
});

describe('czas', () => {
  it('odróżnia sekundy od milisekund (lekcja Miss #9)', () => {
    expect(looksLikeUnixSeconds(1795730000)).toBe(true);
    expect(looksLikeUnixSeconds(1795730000000)).toBe(false);
    expect(looksLikeUnixSeconds(0)).toBe(false);
  });

  it('liczy dzień i początek doby w UTC', () => {
    expect(dayKey(1795730000)).toBe('2026-11-26');
    expect(dayStart(1795730000) % 86400).toBe(0);
    expect(dayStart(1795730000)).toBeLessThanOrEqual(1795730000);
  });
});

describe('identyfikator odwiedzającego', () => {
  it('jest stały w ciągu doby i zmienia się następnego dnia', async () => {
    const a = await visitorHash('sol', '203.0.113.7', 'UA', 1795730000);
    const b = await visitorHash('sol', '203.0.113.7', 'UA', 1795730000 + 60);
    const nextDay = await visitorHash('sol', '203.0.113.7', 'UA', 1795730000 + 86400);
    expect(a).toBe(b);
    expect(a).not.toBe(nextDay);
    expect(a).toHaveLength(24);
  });

  it('zależy od soli, więc nie da się go odtworzyć z samego IP', async () => {
    const a = await visitorHash('sol-1', '203.0.113.7', 'UA', 1795730000);
    const b = await visitorHash('sol-2', '203.0.113.7', 'UA', 1795730000);
    expect(a).not.toBe(b);
    expect(a).not.toContain('203');
  });
});

describe('podpis webhooka Stripe', () => {
  const secret = 'whsec_unit_test';
  const body = '{"id":"evt_1","type":"checkout.session.completed"}';
  const now = 1795730000;

  it('przyjmuje poprawny podpis', async () => {
    const signature = await hmacSha256Hex(secret, `${now}.${body}`);
    expect(await verifyStripeSignature(body, `t=${now},v1=${signature}`, secret, now)).toBe(true);
  });

  it('odrzuca zmienioną treść', async () => {
    const signature = await hmacSha256Hex(secret, `${now}.${body}`);
    expect(await verifyStripeSignature(body.replace('evt_1', 'evt_2'), `t=${now},v1=${signature}`, secret, now)).toBe(false);
  });

  it('odrzuca zły sekret, brak nagłówka i stary znacznik czasu', async () => {
    const signature = await hmacSha256Hex('inny-sekret', `${now}.${body}`);
    expect(await verifyStripeSignature(body, `t=${now},v1=${signature}`, secret, now)).toBe(false);
    expect(await verifyStripeSignature(body, null, secret, now)).toBe(false);
    const good = await hmacSha256Hex(secret, `${now}.${body}`);
    expect(await verifyStripeSignature(body, `t=${now},v1=${good}`, secret, now + 3600)).toBe(false);
  });

  it('przyjmuje nagłówek z kilkoma podpisami (rotacja sekretu)', async () => {
    const good = await hmacSha256Hex(secret, `${now}.${body}`);
    expect(await verifyStripeSignature(body, `t=${now},v1=${'0'.repeat(64)},v1=${good}`, secret, now)).toBe(true);
  });
});
