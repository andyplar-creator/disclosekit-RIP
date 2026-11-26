// Panel wlasciciela: lejek, werdykt i surowe wiersze.
// Zasada z LESSONS.md (Miss #14): pewnosc AI to zero dowodow, pokazuj dane zrodlowe, nie streszczenie.
// Dlatego werdykt stoi zawsze obok surowych wierszy, a ocene zgloszen nadaje czlowiek.

import type { Check } from '../lib/audit';
import type { AdReport, FunnelStats, RawEvent, RawLead, RawOrder, TermRow } from '../lib/db';
import { e, formatTime, page } from '../lib/html';
import { formatMoney } from '../lib/pure';
import type { Verdict } from '../lib/verdict';
import type { Experiment, ExperimentStatus, LeadStatus } from '../types';

function shell(nonce: string, title: string, content: string, loggedIn: boolean): string {
  const nav = loggedIn
    ? `<div class="row"><a class="btn ghost" href="/admin">Eksperymenty</a><a class="btn ghost" href="/admin/selftest">Autotest</a><form method="post" action="/admin/logout"><button class="btn ghost" type="submit">Wyloguj</button></form></div>`
    : '';
  const body = `<div class="wrap"><header class="top"><a class="brand" href="/admin">Sonda<span>.</span></a><span class="note">panel właściciela</span></header>${nav}</div>
<main><section class="hero"><div class="wrap">${content}</div></section></main>`;
  return page({ title: `${title} — Sonda`, locale: 'pl', body, nonce, noindex: true });
}

export function renderLogin(nonce: string, state: 'ok' | 'wrong' | 'rate' | 'unconfigured'): string {
  if (state === 'unconfigured') {
    return shell(
      nonce,
      'Panel wyłączony',
      `<h1>Panel jest wyłączony</h1><div class="msg warn">Nie ustawiono sekretu <code>ADMIN_TOKEN</code> (co najmniej 24 znaki). Ustaw go poleceniem <code>npx wrangler secret put ADMIN_TOKEN</code> i wdróż ponownie.</div>`,
      false,
    );
  }
  const message =
    state === 'wrong'
      ? '<div class="msg err" role="alert">Niepoprawne hasło.</div>'
      : state === 'rate'
        ? '<div class="msg err" role="alert">Za dużo prób. Spróbuj ponownie za godzinę.</div>'
        : '';
  return shell(
    nonce,
    'Logowanie',
    `<h1>Panel Sondy</h1>${message}
<form method="post" action="/admin/login" class="card">
<label for="token">Hasło (ADMIN_TOKEN)</label>
<input id="token" type="password" name="token" required autocomplete="current-password">
<div class="row"><button class="btn" type="submit">Zaloguj</button></div>
</form>`,
    false,
  );
}

function pill(verdict: Verdict): string {
  const cls =
    verdict.state === 'GO' ? 'go' : verdict.state === 'NO_GO' ? 'nogo' : verdict.state === 'NO_DATA' ? 'off' : 'wait';
  return `<span class="pill ${cls}">${e(verdict.headline)}</span>`;
}

function statusPill(status: ExperimentStatus): string {
  const cls = status === 'live' ? 'go' : status === 'draft' ? 'wait' : 'off';
  const label = status === 'live' ? 'publiczny' : status === 'draft' ? 'szkic' : 'zatrzymany';
  return `<span class="pill ${cls}">${label}</span>`;
}

export interface OverviewRow {
  experiment: Experiment;
  status: ExperimentStatus;
  stats: FunnelStats;
  verdict: Verdict;
}

export function renderOverview(nonce: string, rows: OverviewRow[]): string {
  const cards = rows
    .map(
      ({ experiment, status, stats, verdict }) => `<div class="card">
<p>${statusPill(status)} ${pill(verdict)}</p>
<h3><a href="/admin/x/${e(experiment.slug)}">${e(experiment.internalName)}</a></h3>
<p class="note">${e(experiment.hypothesis)}</p>
<dl class="kv">
<dt>Wejścia z reklam</dt><dd>${stats.adClicks} / ${experiment.thresholds.minAdClicks}</dd>
<dt>Zgłoszenia z reklam</dt><dd>${stats.adLeads} (do oceny: ${stats.adLeadsNew})</dd>
<dt>Ocenione jako firmy</dt><dd>${stats.adLeadsQualified}</dd>
<dt>Opłacone (prawdziwe)</dt><dd>${stats.paidOrders}</dd>
</dl>
<p class="note"><a href="/${e(experiment.slug)}" target="_blank" rel="noopener">Otwórz landing</a></p>
</div>`,
    )
    .join('');
  return shell(
    nonce,
    'Eksperymenty',
    `<h1>Eksperymenty</h1>
<p class="lede">Werdykt liczy się wyłącznie z płatnego ruchu, z prawdziwych płatności i ze zgłoszeń, które sam ocenisz jako prawdziwe firmy. Sam adres e-mail nigdy nie daje GO.</p>
<div class="grid c2">${cards}</div>`,
    true,
  );
}

function stat(label: string, value: string | number): string {
  return `<div class="stat"><small>${e(label)}</small><div class="big">${e(String(value))}</div></div>`;
}

const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'do oceny',
  qualified: 'prawdziwa firma',
  data_received: 'przysłała dane / rozmowa',
  disqualified: 'odrzucone',
};

function leadStatusForm(slug: string, lead: RawLead): string {
  const options = (Object.keys(LEAD_STATUS_LABEL) as LeadStatus[])
    .map((status) => `<option value="${status}"${status === lead.status ? ' selected' : ''}>${LEAD_STATUS_LABEL[status]}</option>`)
    .join('');
  return `<form method="post" action="/admin/x/${e(slug)}/lead-status" class="rowform"><input type="hidden" name="id" value="${lead.id}"><select name="status" aria-label="Ocena zgłoszenia ${lead.id}">${options}</select><button class="btn small" type="submit">Zapisz</button></form>`;
}

export interface DetailData {
  experiment: Experiment;
  status: ExperimentStatus;
  stats: FunnelStats;
  verdict: Verdict;
  terms: TermRow[];
  events: RawEvent[];
  leads: RawLead[];
  orders: RawOrder[];
  adReports: AdReport[];
  problems: string[];
  today: string;
  saved: boolean;
}

export function renderDetail(nonce: string, d: DetailData): string {
  const x = d.experiment;
  const t = x.thresholds;
  const reasons = d.verdict.reasons.map((reason) => `<li>${e(reason)}</li>`).join('');
  const problems = d.problems.length ? `<div class="msg err"><strong>Błędy konfiguracji:</strong> ${e(d.problems.join('; '))}</div>` : '';
  const notLive =
    d.status === 'live'
      ? ''
      : '<div class="msg warn">Ten eksperyment nie jest publiczny. Żeby go uruchomić, dopisz jego slug do <code>LIVE_EXPERIMENTS</code> w pliku <code>wrangler.jsonc</code> i wdróż ponownie.</div>';

  const reportedClicks = d.adReports.reduce((sum, report) => sum + report.clicks, 0);
  const reportedCost = d.adReports.reduce((sum, report) => sum + report.cost_minor, 0);
  const currency = d.adReports[0]?.currency ?? 'pln';
  const costPerQualified = d.stats.adLeadsQualified > 0 && reportedCost > 0 ? formatMoney(Math.round(reportedCost / d.stats.adLeadsQualified), currency) : '—';
  const cpc = reportedClicks > 0 ? formatMoney(Math.round(reportedCost / reportedClicks), currency) : '—';
  const gap =
    reportedClicks > 0
      ? `<p class="note">Google raportuje ${reportedClicks} kliknięć, Sonda widzi ${d.stats.adClicks} unikalnych wejść z reklam. Różnica do ok. 20% jest normalna (podwójne kliknięcia, przerwane ładowanie, roboty). Większa oznacza problem z adresem docelowym albo z parametrami śledzenia.</p>`
      : '<p class="note">Wpisz poniżej kliknięcia i koszt z Google Ads, żeby porównać je z tym, co widzi Sonda.</p>';

  const termRows = d.terms.length
    ? d.terms.map((row) => `<tr><td>${e(row.utm_campaign ?? '—')}</td><td>${e(row.utm_term ?? '—')}</td><td class="n">${row.visitors}</td></tr>`).join('')
    : '<tr><td colspan="3">Brak wejść z reklam.</td></tr>';

  const leadRows = d.leads.length
    ? d.leads
        .map(
          (lead) =>
            `<tr><td>${formatTime(lead.created_at)}</td><td>${e(lead.company ?? '—')}${lead.nip ? `<br><span class="note">NIP ${e(lead.nip)}</span>` : ''}</td><td>${e(lead.email)}${lead.phone ? `<br><span class="note">${e(lead.phone)}</span>` : ''}</td><td>${e(lead.erp ?? '—')}</td><td>${e(lead.volume ?? '—')}</td><td>${lead.wants_invoice ? 'TAK' : 'nie'}</td><td>${lead.is_ad ? 'reklama' : 'inne'}${lead.utm_term ? `<br><span class="note">${e(lead.utm_term)}</span>` : ''}${lead.is_test ? '<br><span class="note">testowe</span>' : ''}${lead.flag ? `<br><span class="pill nogo">podejrzane: ${lead.flag === 'honeypot' ? 'ukryte pole' : 'robot'}</span>` : ''}</td><td>${leadStatusForm(x.slug, lead)}</td></tr>`,
        )
        .join('')
    : '<tr><td colspan="8">Brak zgłoszeń.</td></tr>';

  const orderRows = d.orders.length
    ? d.orders
        .map(
          (order) =>
            `<tr><td>${formatTime(order.created_at)}</td><td>${e(order.status)}</td><td class="n">${e(formatMoney(order.amount_minor, order.currency))}</td><td>${e(order.email ?? '—')}</td><td>${order.livemode ? 'prawdziwa' : 'TESTOWA'}</td><td>${order.is_ad ? 'reklama' : 'inne'}</td></tr>`,
        )
        .join('')
    : '<tr><td colspan="6">Brak płatności.</td></tr>';

  const eventRows = d.events.length
    ? d.events
        .map(
          (event) =>
            `<tr><td>${event.id}</td><td>${formatTime(event.created_at)}</td><td>${e(event.type)}</td><td><code>${e(event.visitor.slice(0, 8))}</code></td><td>${event.is_ad ? 'tak' : 'nie'}</td><td>${event.is_bot ? 'tak' : 'nie'}</td><td>${e(event.utm_term ?? '—')}</td><td>${e(event.ref_host ?? '—')}</td><td>${e(event.detail ?? '—')}</td></tr>`,
        )
        .join('')
    : '<tr><td colspan="9">Brak zdarzeń.</td></tr>';

  const reportRows = d.adReports.length
    ? d.adReports.map((report) => `<tr><td>${e(report.day)}</td><td class="n">${report.clicks}</td><td class="n">${e(formatMoney(report.cost_minor, report.currency))}</td></tr>`).join('')
    : '<tr><td colspan="3">Brak wpisów.</td></tr>';

  const keywordGroups = x.keywordGroups
    .map((group) => `<h3>${e(group.name)}</h3><p class="note">${e(group.note)}</p><ul>${group.phrases.map((phrase) => `<li><code>${e(phrase)}</code></li>`).join('')}</ul>`)
    .join('');

  return shell(
    nonce,
    x.internalName,
    `<p>${statusPill(d.status)} ${pill(d.verdict)}</p>
<h1>${e(x.internalName)}</h1>
${notLive}
<p class="lede">${e(x.hypothesis)}</p>
<div class="msg warn"><strong>Zastrzeżenie z researchu:</strong> ${e(x.researchWarning)}</div>
${problems}
${d.saved ? '<div class="msg ok" role="status">Zapisano dane z Google Ads.</div>' : ''}

<h2>Werdykt</h2>
<div class="card">
<p class="big">${e(d.verdict.headline)}</p>
<progress value="${Math.round(d.verdict.progress * 100)}" max="100">${Math.round(d.verdict.progress * 100)}%</progress>
<ul>${reasons}</ul>
<p class="note">Progi tego eksperymentu: minimum ${t.minAdClicks} wejść z reklam do werdyktu; GO od ${t.goQualifiedLeads} zgłoszeń ocenionych jako prawdziwe firmy (co najmniej jedna z danymi lub po rozmowie)${t.goPaidOrders > 0 ? ` albo od ${t.goPaidOrders} opłaconego pilotażu` : ''}; koniec testu przy ${t.maxAdClicks} wejściach. Werdykt to podpowiedź: przeczytaj surowe wiersze poniżej i raport wyszukiwanych haseł w Google Ads.</p>
</div>

<h2>Lejek (od początku testu)</h2>
<div class="stats">
${stat('Unikalni odwiedzający', d.stats.humanVisitors)}
${stat('Wejścia z reklam', d.stats.adClicks)}
${stat('Zgłoszenia (wszystkie)', d.stats.allLeads)}
${stat('Zgłoszenia z reklam', d.stats.adLeads)}
${stat('Do oceny', d.stats.adLeadsNew)}
${stat('Ocenione jako firmy', d.stats.adLeadsQualified)}
${stat('Z danymi lub po rozmowie', d.stats.adLeadsWithData)}
${stat('Prośby o fakturę pro forma', d.stats.invoiceRequests)}
${stat('Podejrzane (robot)', d.stats.flaggedLeads)}
${stat('Rozpoczęte płatności', d.stats.checkoutsStarted)}
${stat('Opłacone (prawdziwe)', d.stats.paidOrders)}
${stat('Opłacone (testowe)', d.stats.paidOrdersTest)}
${stat('Kliknięcia w przyciski', d.stats.ctaClicks)}
${stat('Uruchomienia demo', d.stats.demoRuns)}
${stat('Wejścia robotów', d.stats.botViews)}
</div>
<p class="note">Przychód z prawdziwych płatności: ${e(formatMoney(d.stats.paidRevenueMinor, x.offer.pilot?.currency ?? 'pln'))}. Każdą wpłatę musisz obsłużyć albo zwrócić.</p>

<h2 id="zgloszenia">Zgłoszenia</h2>
<p class="note">Oceń każde zgłoszenie sam: „prawdziwa firma” = istniejąca firma handlowa (da się ją znaleźć po nazwie lub NIP), która podała program i liczbę zamówień. „Przysłała dane / rozmowa” = dostałeś od niej przykładowe zamówienia albo odbyliście rozmowę. Tylko te dwie oceny liczą się do werdyktu. Zgłoszenia oznaczone jako podejrzane (robot albo wypełnione ukryte pole) startują z oceną „odrzucone” i nie liczą się nigdzie, ale nie są kasowane: jeśli filtr się pomylił, zmień ocenę. <a href="/admin/x/${e(x.slug)}/leads.csv">Pobierz CSV</a></p>
<div class="tablewrap"><table><thead><tr><th>Kiedy</th><th>Firma</th><th>Kontakt</th><th>Program</th><th>Zamówień / tydz.</th><th>Pro forma</th><th>Źródło</th><th>Twoja ocena</th></tr></thead><tbody>${leadRows}</tbody></table></div>

<h2>Koszt reklam</h2>
<div class="stats">
${stat('Kliknięcia wg Google', reportedClicks)}
${stat('Koszt łącznie', reportedCost > 0 ? formatMoney(reportedCost, currency) : '—')}
${stat('Średni koszt kliknięcia', cpc)}
${stat('Koszt jednej prawdziwej firmy', costPerQualified)}
</div>
${gap}
<form method="post" action="/admin/x/${e(x.slug)}/ad-report" class="card">
<h3>Dopisz dzień z Google Ads</h3>
<div class="inline">
<div><label for="day">Dzień</label><input id="day" type="date" name="day" value="${e(d.today)}" required></div>
<div><label for="clicks">Kliknięcia</label><input id="clicks" type="number" name="clicks" min="0" step="1" required></div>
<div><label for="cost">Koszt (zł)</label><input id="cost" type="number" name="cost" min="0" step="0.01" required></div>
<div><button class="btn" type="submit">Zapisz</button></div>
</div>
</form>
<div class="tablewrap"><table><thead><tr><th>Dzień</th><th class="n">Kliknięcia</th><th class="n">Koszt</th></tr></thead><tbody>${reportRows}</tbody></table></div>

<h2>Wejścia z reklam według frazy</h2>
<div class="tablewrap"><table><thead><tr><th>Kampania</th><th>Fraza (utm_term)</th><th class="n">Unikalne wejścia</th></tr></thead><tbody>${termRows}</tbody></table></div>

<h2>Płatności</h2>
<div class="tablewrap"><table><thead><tr><th>Kiedy</th><th>Status</th><th class="n">Kwota</th><th>E-mail</th><th>Płatność</th><th>Źródło</th></tr></thead><tbody>${orderRows}</tbody></table></div>

<h2>Ostatnie zdarzenia (surowe wiersze)</h2>
<div class="tablewrap"><table><thead><tr><th>Id</th><th>Kiedy</th><th>Typ</th><th>Odwiedzający</th><th>Reklama</th><th>Robot</th><th>Fraza</th><th>Skąd</th><th>Szczegół</th></tr></thead><tbody>${eventRows}</tbody></table></div>

<h2>Frazy do sprawdzenia w Planerze słów kluczowych (R4)</h2>
${keywordGroups}`,
    true,
  );
}

export function renderSelftest(nonce: string, checks: Check[]): string {
  const order = { fail: 0, warn: 1, ok: 2 } as const;
  const sorted = [...checks].sort((a, b) => order[a.level] - order[b.level]);
  const rows = sorted
    .map((check) => {
      const cls = check.level === 'ok' ? 'go' : check.level === 'warn' ? 'wait' : 'nogo';
      const label = check.level === 'ok' ? 'OK' : check.level === 'warn' ? 'UWAGA' : 'BŁĄD';
      return `<tr><td><span class="pill ${cls}">${label}</span></td><td>${e(check.name)}</td><td>${e(check.detail)}</td></tr>`;
    })
    .join('');
  const fails = checks.filter((check) => check.level === 'fail').length;
  const summary =
    fails === 0
      ? '<div class="msg ok">Brak błędów blokujących. Zanim puścisz reklamy, przejdź jeszcze ręcznie całą ścieżkę w oknie incognito (patrz docs/02-WDROZENIE.md).</div>'
      : `<div class="msg err">Błędy blokujące: ${fails}. Nie uruchamiaj reklam, dopóki ta liczba nie spadnie do zera.</div>`;
  return shell(
    nonce,
    'Autotest',
    `<h1>Autotest konfiguracji</h1>
<p class="lede">Sprawdza, czy to, co strona obiecuje i co panel mierzy, naprawdę istnieje. Automat sprawdza kształt; sens sprawdzasz Ty.</p>
${summary}
<div class="tablewrap"><table><thead><tr><th>Wynik</th><th>Co sprawdzam</th><th>Szczegóły</th></tr></thead><tbody>${rows}</tbody></table></div>`,
    true,
  );
}
