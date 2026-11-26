// Autotest konfiguracji. Odpowiada na pytanie: "czy to, co mierzymy i obiecujemy, naprawde istnieje?"
//
// Lekcje z disclosekit, ktore ten plik zamienia w automatyczne kontrole:
// - Miss #9:  cel "100 zapisow" ustawiono, choc formularz zapisu nie istnial przez 25 dni
//             -> test zapisu i odczytu leada na zywej bazie.
// - Miss #9:  sekundy pomylone z milisekundami -> kontrola jednostek czasu.
// - Miss #11: na stronie podano adres e-mail, ktory nie mial skrzynki -> kontrola rekordow MX.

import { EXPERIMENTS, statusOf, validateExperiment } from '../experiments';
import type { Env } from '../types';
import { countTestLeads, deleteTestLeads, insertLead, tableExists, timestampRange } from './db';
import { DEFAULT_DEMO_MODEL, demoIsConfigured } from './demo-config';
import { looksLikeUnixSeconds } from './pure';
import { adminIsConfigured } from './session';
import { isLiveKey } from './stripe';

export type CheckLevel = 'ok' | 'warn' | 'fail';

export interface Check {
  name: string;
  level: CheckLevel;
  detail: string;
}

const TABLES = ['events', 'leads', 'orders', 'ad_reports', 'rate_limits'];

async function mxCheck(email: string): Promise<Check> {
  const name = 'Adres kontaktowy ma skrzynkę (rekordy MX)';
  const at = email.lastIndexOf('@');
  if (at < 1) return { name, level: 'fail', detail: `CONTACT_EMAIL „${email}” nie jest adresem e-mail.` };
  const domain = email.slice(at + 1);
  if (domain === 'example.com' || domain.endsWith('.example')) {
    return { name, level: 'fail', detail: `CONTACT_EMAIL wskazuje na domenę przykładową (${domain}). Ustaw prawdziwy adres w wrangler.jsonc.` };
  }
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: { Accept: 'application/dns-json' },
    });
    if (!res.ok) return { name, level: 'warn', detail: `Nie udało się sprawdzić DNS (HTTP ${res.status}). Sprawdź ręcznie: wyślij maila na ${email}.` };
    const data = (await res.json()) as { Answer?: { type: number; data: string }[] };
    const records = (data.Answer ?? []).filter((answer) => answer.type === 15);
    if (records.length === 0) {
      return { name, level: 'fail', detail: `Domena ${domain} nie ma rekordów MX, więc ${email} nie odbiera poczty. Odpowiedzi klientów by przepadły.` };
    }
    return {
      name,
      level: 'ok',
      detail: `Domena ${domain} ma ${records.length} rekord(y) MX. To nie dowodzi, że ktoś czyta skrzynkę: wyślij testowego maila z zewnętrznego konta.`,
    };
  } catch {
    return { name, level: 'warn', detail: `Sprawdzenie DNS nie powiodło się. Sprawdź ręcznie: wyślij maila na ${email}.` };
  }
}

export async function runAudit(env: Env, requestUrl: URL, now: number): Promise<Check[]> {
  const checks: Check[] = [];

  // 1. Baza i tabele
  const missing: string[] = [];
  for (const table of TABLES) {
    try {
      if (!(await tableExists(env.DB, table))) missing.push(table);
    } catch {
      missing.push(table);
    }
  }
  checks.push(
    missing.length === 0
      ? { name: 'Baza danych i tabele', level: 'ok', detail: `Wszystkie tabele istnieją: ${TABLES.join(', ')}.` }
      : { name: 'Baza danych i tabele', level: 'fail', detail: `Brakuje tabel: ${missing.join(', ')}. Uruchom migracje (npm run db:migrate:remote).` },
  );

  // 2. Zapis i odczyt leada na zywej bazie
  if (missing.length === 0) {
    const experiment = EXPERIMENTS[0];
    if (experiment) {
      const probe = `autotest+${now}@sonda.invalid`;
      try {
        await insertLead(env.DB, {
          experiment: experiment.slug,
          email: probe,
          company: null,
          nip: null,
          erp: null,
          volume: null,
          phone: null,
          wantsInvoice: false,
          flag: null,
          visitor: 'autotest',
          isAd: false,
          utmCampaign: null,
          utmTerm: null,
          isTest: true,
          now,
        });
        const found = await countTestLeads(env.DB, experiment.slug, probe);
        await deleteTestLeads(env.DB, experiment.slug);
        checks.push(
          found === 1
            ? { name: 'Zapis leada działa od końca do końca', level: 'ok', detail: 'Testowy wpis został zapisany, odczytany i usunięty.' }
            : { name: 'Zapis leada działa od końca do końca', level: 'fail', detail: 'Testowy wpis nie pojawił się w bazie po zapisie.' },
        );
      } catch {
        checks.push({ name: 'Zapis leada działa od końca do końca', level: 'fail', detail: 'Zapis testowego leada zakończył się błędem bazy.' });
      }
    }

    // 3. Jednostki czasu
    const bad: string[] = [];
    for (const table of ['events', 'leads', 'orders'] as const) {
      const range = await timestampRange(env.DB, table);
      for (const value of [range.min, range.max]) {
        if (value !== null && !looksLikeUnixSeconds(value)) bad.push(`${table}: ${value}`);
      }
    }
    checks.push(
      bad.length === 0
        ? { name: 'Czas zapisany w sekundach', level: 'ok', detail: 'Wszystkie znaczniki czasu mają 10 cyfr (sekundy uniksowe).' }
        : { name: 'Czas zapisany w sekundach', level: 'fail', detail: `Podejrzane znaczniki czasu: ${bad.join('; ')}.` },
    );
  }

  // 4. Sekrety
  checks.push(
    adminIsConfigured(env)
      ? { name: 'Hasło do panelu (ADMIN_TOKEN)', level: 'ok', detail: 'Ustawione i wystarczająco długie.' }
      : { name: 'Hasło do panelu (ADMIN_TOKEN)', level: 'fail', detail: 'Brak albo krótsze niż 24 znaki.' },
  );
  checks.push(
    env.VISITOR_SALT && env.VISITOR_SALT.length >= 16
      ? { name: 'Sól do liczenia odwiedzin (VISITOR_SALT)', level: 'ok', detail: 'Ustawiona.' }
      : {
          name: 'Sól do liczenia odwiedzin (VISITOR_SALT)',
          level: 'fail',
          detail: 'Brak albo krótsza niż 16 znaków. Bez niej dzienne identyfikatory dałoby się odtworzyć z adresu IP.',
        },
  );

  // 5. Stripe
  const anyPreorder = EXPERIMENTS.some((experiment) => statusOf(experiment, env) === 'live' && experiment.offer.pilot);
  if (!env.STRIPE_SECRET_KEY) {
    checks.push({
      name: 'Płatności Stripe',
      level: anyPreorder ? 'warn' : 'ok',
      detail: 'Brak STRIPE_SECRET_KEY: przycisk płatnego pilotażu jest ukryty, działa formularz zgłoszenia (z opcją faktury pro forma). To poprawny tryb testu.',
    });
  } else if (!env.STRIPE_WEBHOOK_SECRET) {
    checks.push({
      name: 'Płatności Stripe',
      level: 'fail',
      detail: 'Jest STRIPE_SECRET_KEY, ale brak STRIPE_WEBHOOK_SECRET. Płatności by przechodziły, a panel by ich nie widział.',
    });
  } else {
    checks.push({
      name: 'Płatności Stripe',
      level: isLiveKey(env.STRIPE_SECRET_KEY) ? 'ok' : 'warn',
      detail: isLiveKey(env.STRIPE_SECRET_KEY)
        ? 'Klucz produkcyjny: przycisk pobiera prawdziwe pieniądze. Do werdyktu liczą się tylko takie płatności.'
        : 'Klucz testowy: płatności są na niby i NIE liczą się do werdyktu. Dobre do próby, złe do prawdziwego testu.',
    });
  }

  // 6. Demo
  checks.push(
    demoIsConfigured(env)
      ? {
          name: 'Demo na żywo (ANTHROPIC_API_KEY)',
          level: 'ok',
          detail: `Klucz ustawiony. Model: ${env.DEMO_MODEL || DEFAULT_DEMO_MODEL}. Limit dobowy: ${env.DEMO_DAILY_CAP || '300'} uruchomień. Pole „wklej własną wiadomość” pojawia się tylko w eksperymentach wymienionych w LIVE_PASTE_EXPERIMENTS: ${env.LIVE_PASTE_EXPERIMENTS || 'żaden'}.`,
        }
      : { name: 'Demo na żywo (ANTHROPIC_API_KEY)', level: 'ok', detail: 'Brak klucza: strona pokazuje gotowe przykłady. To zalecany tryb na pierwszy test.' },
  );

  // 7. Adres strony
  const expectedHost = (() => {
    try {
      return new URL(env.SITE_URL).host;
    } catch {
      return null;
    }
  })();
  checks.push(
    expectedHost === requestUrl.host
      ? { name: 'Adres strony (SITE_URL)', level: 'ok', detail: `Zgadza się z adresem, pod którym działa panel: ${requestUrl.host}.` }
      : {
          name: 'Adres strony (SITE_URL)',
          level: 'fail',
          detail: `SITE_URL to „${env.SITE_URL}”, a panel działa pod ${requestUrl.host}. Stripe odsyłałby klientów pod zły adres.`,
        },
  );

  // 8. Kontakt
  checks.push(await mxCheck(env.CONTACT_EMAIL));

  // 9. Eksperymenty
  const live = EXPERIMENTS.filter((experiment) => statusOf(experiment, env) === 'live');
  checks.push(
    live.length > 0
      ? { name: 'Aktywne eksperymenty', level: 'ok', detail: `Status „live”: ${live.map((experiment) => experiment.slug).join(', ')}.` }
      : { name: 'Aktywne eksperymenty', level: 'warn', detail: 'Żaden eksperyment nie jest publiczny (LIVE_EXPERIMENTS jest puste). Odwiedzający zobaczą stronę 404.' },
  );
  for (const experiment of EXPERIMENTS) {
    const problems = validateExperiment(experiment);
    if (problems.length > 0) {
      checks.push({ name: `Konfiguracja: ${experiment.slug}`, level: 'fail', detail: problems.join('; ') });
    }
  }
  const defaultExists = EXPERIMENTS.some((experiment) => experiment.slug === env.DEFAULT_EXPERIMENT);
  if (!defaultExists) {
    checks.push({ name: 'Eksperyment domyślny (DEFAULT_EXPERIMENT)', level: 'fail', detail: `Nie ma eksperymentu o slugu „${env.DEFAULT_EXPERIMENT}”.` });
  }

  return checks;
}
