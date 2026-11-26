// Panel wlasciciela: lejek, werdykt i surowe wiersze.
// Zasada z LESSONS.md (Miss #14): pewnosc AI to zero dowodow, pokazuj dane zrodlowe, nie streszczenie.
// Dlatego werdykt stoi zawsze obok surowych wierszy, a ocene zgloszen i platnosci nadaje czlowiek.

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
  const body = `<div class="wrap wide"><header class="top"><a class="brand" href="/admin">Sonda<span>.</span></a><span class="note">panel właściciela</span></header>${nav}</div>
<main><section class="hero"><div class="wrap wide">${content}</div></section></main>`;
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
</form>
<p class="note">Sesja trwa 7 dni. „Wyloguj” czyści ją w tej przeglądarce; żeby unieważnić wszystkie sesje naraz, zmień ADMIN_TOKEN.</p>`,
    false,
  );
}

function pill(verdict: Verdict): string {
  const cls = verdict.state === 'GO' ? 'go' : verdict.state === 'NO_GO' ? 'nogo' : verdict.state === 'NO_DATA' ? 'off' : 'wait';
  return `<span class="pill ${cls}">${e(verdict.headline)}</span>`;
}

function statusPill(status: ExperimentStatus): string {
  return status === 'live' ? '<span class="pill go">publiczny</span>' : '<span class="pill wait">niepubliczny</span>';
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
<dt>Wejścia z reklam</dt><dd>${verdict.effectiveAdClicks} / ${experiment.thresholds.maxAdClicks}</dd>
<dt>Zgłoszenia do oceny</dt><dd>${stats.adLeadsNew + stats.otherLeadsNew}</dd>
<dt>Prawdziwe firmy (z reklam)</dt><dd>${stats.adLeadsQualified}</dd>
<dt>Opłacone pilotaże (z reklam)</dt><dd>${stats.paidOrders}</dd>
</dl>
<p class="note"><a href="/${e(experiment.slug)}" target="_blank" rel="noopener">Otwórz landing</a></p>
</div>`,
    )
    .join('');
  return shell(
    nonce,
    'Eksperymenty',
    `<h1>Eksperymenty</h1>
<p class="lede">Werdykt liczy się wyłącznie z płatnego ruchu, z płatności od firm z reklam i ze zgłoszeń, które sam ocenisz jako prawdziwe firmy. Sam adres e-mail nigdy nie daje GO.</p>
<div class="grid c2">${cards}</div>`,
    true,
  );
}

function stat(label: string, value: string | number): string {
  return `<div class="stat"><small>${e(label)}</small><div class="big">${e(String(value))}</div></div>`;
}

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'do oceny',
  qualified: 'prawdziwa firma',
  data_received: 'przysłała dane / rozmowa',
  paid: 'zapłaciła (przelew / pro forma)',
  disqualified: 'odrzucone',
};

const ORDER_STATUS_LABEL: Record<string, string> = { started: 'rozpoczęta, NIEOPŁACONA', paid: 'OPŁACONA', expired: 'wygasła' };

function leadControls(slug: string, lead: RawLead): string {
  const options = (Object.keys(LEAD_STATUS_LABEL) as LeadStatus[])
    .map((status) => `<option value="${status}"${status === lead.status ? ' selected' : ''}>${LEAD_STATUS_LABEL[status]}</option>`)
    .join('');
  const base = `/admin/x/${e(slug)}`;
  return `<form method="post" action="${base}/lead-status" class="rowform"><input type="hidden" name="id" value="${lead.id}"><select name="status" aria-label="Ocena zgłoszenia ${lead.id}">${options}</select><button class="btn small" type="submit">Zapisz</button></form>
<form method="post" action="${base}/lead-source" class="rowform"><input type="hidden" name="id" value="${lead.id}"><input type="hidden" name="ad" value="${lead.is_ad ? '0' : '1'}"><button class="btn small ghost" type="submit">Źródło → ${lead.is_ad ? 'inne' : 'reklama'}</button></form>
<form method="post" action="${base}/lead-delete" class="rowform"><input type="hidden" name="id" value="${lead.id}"><label class="mini"><input type="checkbox" name="confirm" value="1" required> na pewno</label><button class="btn small ghost" type="submit">Usuń</button></form>`;
}

function orderControls(slug: string, order: RawOrder): string {
  const base = `/admin/x/${e(slug)}`;
  return `<form method="post" action="${base}/order-exclude" class="rowform"><input type="hidden" name="id" value="${order.id}"><input type="hidden" name="excluded" value="${order.excluded ? '0' : '1'}"><button class="btn small ghost" type="submit">${order.excluded ? 'Licz tę płatność' : 'Nie licz (moja / zwrócona)'}</button></form>
<form method="post" action="${base}/order-source" class="rowform"><input type="hidden" name="id" value="${order.id}"><input type="hidden" name="ad" value="${order.is_ad ? '0' : '1'}"><button class="btn small ghost" type="submit">Źródło → ${order.is_ad ? 'inne' : 'reklama'}</button></form>`;
}

export interface DetailData {
  experiment: Experiment;
  status: ExperimentStatus;
  stats: FunnelStats;
  verdict: Verdict;
  terms: TermRow[];
  events: RawEvent[];
  leads: RawLead[];
  /** Liczba wszystkich zgloszen w bazie (lista moze byc obcieta). */
  leadRowsTotal: number;
  orders: RawOrder[];
  adReports: AdReport[];
  problems: string[];
  /** Domyslna data wpisu z Google Ads: wczoraj w strefie Europe/Warsaw. */
  defaultDay: string;
  /** Od kiedy liczony jest lejek (0 = od poczatku). */
  since: number;
  message: string | null;
  messageDay: string | null;
  paymentsEnabled: boolean;
}

function panelMessage(d: DetailData): string {
  const day = d.messageDay && /^\d{4}-\d{2}-\d{2}$/.test(d.messageDay) ? d.messageDay : '';
  switch (d.message) {
    case 'zapisano':
      return `<div class="msg ok" role="status">Zapisano dane z Google Ads za dzień ${e(day)}.</div>`;
    case 'zastapiono':
      return `<div class="msg warn" role="status">Dla dnia ${e(day)} był już wpis. Został ZASTĄPIONY nowymi liczbami (nie dodany). Jeśli chciałeś wpisać inny dzień, popraw datę i zapisz jeszcze raz.</div>`;
    case 'bledne':
      return '<div class="msg err" role="alert">Nie zapisano: sprawdź datę, liczbę kliknięć i koszt.</div>';
    case 'usunieto':
      return '<div class="msg ok" role="status">Zgłoszenie zostało trwale usunięte. Usuń też wcześniej pobrane pliki CSV, jeśli je zawierają.</div>';
    case 'potwierdz':
      return '<div class="msg err" role="alert">Nie usunięto: zaznacz pole „na pewno” obok przycisku Usuń.</div>';
    case 'licznik':
      return '<div class="msg ok" role="status">Zmieniono początek liczenia lejka.</div>';
    default:
      return '';
  }
}

export function renderDetail(nonce: string, d: DetailData): string {
  const x = d.experiment;
  const t = x.thresholds;
  const s = d.stats;
  const base = `/admin/x/${e(x.slug)}`;
  const reasons = d.verdict.reasons.map((reason) => `<li>${e(reason)}</li>`).join('');
  const problems = d.problems.length ? `<div class="msg err"><strong>Błędy konfiguracji:</strong> ${e(d.problems.join('; '))}</div>` : '';
  const notLive =
    d.status === 'live'
      ? ''
      : '<div class="msg warn">Ten eksperyment nie jest publiczny (jeszcze nie ruszył albo został zatrzymany): odwiedzający widzą stronę 404. Uruchamiasz go, dopisując slug do <code>LIVE_EXPERIMENTS</code> w pliku <code>wrangler.jsonc</code> i wdrażając ponownie.</div>';

  const reportedClicks = d.adReports.reduce((sum, report) => sum + report.clicks, 0);
  const reportedCost = d.adReports.reduce((sum, report) => sum + report.cost_minor, 0);
  const currency = d.adReports[0]?.currency ?? 'pln';
  const costPerQualified = s.adLeadsQualified > 0 && reportedCost > 0 ? formatMoney(Math.round(reportedCost / s.adLeadsQualified), currency) : '—';
  const cpc = reportedClicks > 0 ? formatMoney(Math.round(reportedCost / reportedClicks), currency) : '—';
  const gap =
    d.adReports.length > 0
      ? `<p class="note">Google raportuje ${reportedClicks} kliknięć, Sonda widzi ${s.adClicks} unikalnych wejść z reklam. Sonda zwykle widzi do ok. 20% MNIEJ (przerwane ładowanie, podwójne kliknięcia). Jeśli widzi wyraźnie WIĘCEJ niż Google, nadwyżka to sztuczne wejścia; do progów werdyktu liczy się mniejsza z dwóch liczb.</p>`
      : '<p class="note">Wpisuj tu codziennie kliknięcia i koszt z Google Ads. Bez tych liczb panel nie ogłosi NO-GO, bo nie ma jak potwierdzić własnego licznika wejść.</p>';

  const sinceLine =
    d.since > 0
      ? `Lejek liczony od: <strong>${formatTime(d.since)}</strong>. Wszystko wcześniejsze (Twoje własne próby) jest pominięte.`
      : 'Lejek liczony <strong>od początku</strong>. Zanim uruchomisz reklamy, kliknij „Zacznij liczyć od teraz”, żeby odciąć własne próby.';

  const termRows = d.terms.length
    ? d.terms.map((row) => `<tr><td>${e(row.utm_campaign ?? '—')}</td><td>${e(row.utm_term ?? '—')}</td><td class="n">${row.visitors}</td></tr>`).join('')
    : '<tr><td colspan="3">Brak wejść z reklam.</td></tr>';

  const leadRows = d.leads.length
    ? d.leads
        .map((lead) => {
          const marks = [
            lead.is_test ? '<span class="pill off">testowe</span>' : '',
            lead.flag ? `<span class="pill nogo">podejrzane: ${lead.flag === 'honeypot' ? 'ukryte pole' : 'robot'}</span>` : '',
          ]
            .filter(Boolean)
            .join(' ');
          const again = lead.resubmitted_at ? `<br><span class="note">uzupełnione ${formatTime(lead.resubmitted_at)}</span>` : '';
          return `<tr><td>${formatTime(lead.created_at)}${again}${marks ? `<br>${marks}` : ''}</td><td>${e(lead.company ?? '—')}${lead.nip ? `<br><span class="note">NIP ${e(lead.nip)}</span>` : ''}</td><td>${e(lead.email)}${lead.phone ? `<br><span class="note">${e(lead.phone)}</span>` : ''}</td><td>${e(lead.erp ?? '—')}<br><span class="note">${e(lead.volume ?? '—')} / tydz.</span></td><td>${lead.note ? e(lead.note) : '—'}</td><td>${lead.wants_invoice ? '<strong>TAK</strong>' : 'nie'}</td><td>${lead.is_ad ? 'reklama' : 'inne'}${lead.utm_term ? `<br><span class="note">${e(lead.utm_term)}</span>` : ''}</td><td class="actions">${leadControls(x.slug, lead)}</td></tr>`;
        })
        .join('')
    : '<tr><td colspan="8">Brak zgłoszeń.</td></tr>';
  const truncated =
    d.leadRowsTotal > d.leads.length
      ? `<div class="msg warn">W bazie jest ${d.leadRowsTotal} zgłoszeń, tabela pokazuje ${d.leads.length} (najpierw nieocenione). Pełną listę daje plik CSV.</div>`
      : '';

  const orderRows = d.orders.length
    ? d.orders
        .map((order) => {
          const paid = order.status === 'paid';
          const statusCell = `<span class="pill ${paid ? 'go' : order.status === 'started' ? 'wait' : 'off'}">${ORDER_STATUS_LABEL[order.status] ?? e(order.status)}</span>`;
          return `<tr><td>${formatTime(order.created_at)}</td><td>${statusCell}</td><td class="n">${e(formatMoney(order.amount_minor, order.currency))}</td><td>${e(order.company ?? '—')}${order.nip ? `<br><span class="note">NIP ${e(order.nip)}</span>` : ''}<br><span class="note">${e(order.email ?? '—')}</span></td><td>${order.livemode ? 'prawdziwe pieniądze' : 'TESTOWA (na niby)'}</td><td>${order.is_ad ? 'reklama' : 'inne'}</td><td>${order.excluded ? '<span class="pill off">nie liczona</span>' : 'liczona'}</td><td class="actions">${orderControls(x.slug, order)}</td></tr>`;
        })
        .join('')
    : '<tr><td colspan="8">Brak płatności.</td></tr>';

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

  const payHint =
    x.offer.pilot && !d.paymentsEnabled
      ? '<p class="note">Stripe nie jest skonfigurowany, więc na stronie nie ma przycisku płatności. Firma może zamówić płatny pilotaż polem „faktura pro forma”: wystaw jej fakturę, a gdy zapłaci, nadaj zgłoszeniu ocenę „zapłaciła (przelew / pro forma)”.</p>'
      : '';

  return shell(
    nonce,
    x.internalName,
    `<p>${statusPill(d.status)} ${pill(d.verdict)}</p>
<h1>${e(x.internalName)}</h1>
${notLive}
<p class="lede">${e(x.hypothesis)}</p>
<div class="msg warn"><strong>Zastrzeżenie z researchu:</strong> ${e(x.researchWarning)}</div>
${problems}
${panelMessage(d)}

<h2>Werdykt</h2>
<div class="card">
<p class="big">${e(d.verdict.headline)}</p>
<progress value="${Math.round(d.verdict.progress * 100)}" max="100">${Math.round(d.verdict.progress * 100)}%</progress>
<ul>${reasons}</ul>
<p class="note">Progi: poniżej ${t.minAdClicks} wejść z reklam nic nie mówimy; koniec testu przy ${t.maxAdClicks}. GO od ${t.goQualifiedLeads} zgłoszeń z reklam ocenionych jako prawdziwe firmy (co najmniej jedno z danymi lub po rozmowie)${t.goPaidOrders > 0 ? ` albo od ${t.goPaidOrders} opłaconego pilotażu od firmy z reklamy` : ''}. NO-GO dopiero na końcu testu, przy najwyżej ${t.noGoMaxQualifiedLeads} prawdziwej firmie, i nigdy, gdy coś czeka na Twoją ocenę. Werdykt to podpowiedź: przeczytaj surowe wiersze poniżej i raport wyszukiwanych haseł w Google Ads.</p>
</div>

<h2>Początek liczenia</h2>
<div class="card">
<p>${sinceLine}</p>
<div class="row">
<form method="post" action="${base}/start-counting"><input type="hidden" name="mode" value="now"><button class="btn" type="submit">Zacznij liczyć od teraz</button></form>
<form method="post" action="${base}/start-counting"><input type="hidden" name="mode" value="all"><button class="btn ghost" type="submit">Licz od początku</button></form>
</div>
<p class="note">Wejścia i zgłoszenia zalogowanego właściciela nigdy nie trafiają do lejka. Ten przycisk jest na próby robione w oknie incognito i z telefonu (bramka 1).</p>
</div>

<h2>Lejek</h2>
<div class="stats">
${stat('Unikalni odwiedzający', s.humanVisitors)}
${stat('Wejścia z reklam (Sonda)', s.adClicks)}
${stat('Wejścia z reklam (do progów)', d.verdict.effectiveAdClicks)}
${stat('Zgłoszenia (wszystkie)', s.allLeads)}
${stat('Zgłoszenia z reklam', s.adLeads)}
${stat('Do oceny (z reklam)', s.adLeadsNew)}
${stat('Do oceny (inne źródła)', s.otherLeadsNew)}
${stat('Prawdziwe firmy (z reklam)', s.adLeadsQualified)}
${stat('Prawdziwe firmy (inne źródła)', s.otherLeadsQualified)}
${stat('Z danymi, po rozmowie lub wpłacie', s.adLeadsWithData)}
${stat('Prośby o fakturę pro forma', s.invoiceRequests)}
${stat('Podejrzane do przejrzenia', s.flaggedLeads)}
${stat('Opłacone pilotaże (z reklam)', s.paidOrders)}
${stat('Płatności z innych źródeł', s.paidOther)}
${stat('Płatności nie liczone', s.paidExcluded)}
${stat('Płatności testowe (na niby)', s.paidOrdersTest)}
${stat('Rozpoczęte płatności', s.checkoutsStarted)}
${stat('Kliknięcia w przyciski', s.ctaClicks)}
${stat('Wejścia robotów', s.botViews)}
</div>
<p class="note">Przychód z prawdziwych, liczonych płatności Stripe: ${e(formatMoney(s.paidRevenueMinor, x.offer.pilot?.currency ?? 'pln'))}. Każdą wpłatę musisz obsłużyć albo zwrócić.</p>

<h2 id="zgloszenia">Zgłoszenia</h2>
<p class="note">Oceń każde zgłoszenie sam. „Prawdziwa firma” = istniejąca firma handlowa (da się ją znaleźć po nazwie lub NIP), która podała program i liczbę zamówień. „Przysłała dane / rozmowa” = dostałeś od niej przykładowe zamówienia albo odbyliście rozmowę. „Zapłaciła” = wpłata za pilotaż przelewem. Tylko te trzy oceny liczą się do werdyktu. Jeśli firma weszła z reklamy, a ma źródło „inne” (wróciła innego dnia albo z innego urządzenia), zmień jej źródło. Zgłoszenia „podejrzane” nie są kasowane: jeśli filtr się pomylił, nadaj im ocenę. <a href="${base}/leads.csv">Pobierz CSV</a></p>
${payHint}
${truncated}
<div class="tablewrap"><table><thead><tr><th>Kiedy</th><th>Firma</th><th>Kontakt</th><th>Program</th><th>Jak przyjmują zamówienia</th><th>Pro forma</th><th>Źródło</th><th>Twoja ocena</th></tr></thead><tbody>${leadRows}</tbody></table></div>

<h2 id="platnosci">Płatności Stripe</h2>
<p class="note">Do werdyktu liczy się tylko płatność: OPŁACONA, za prawdziwe pieniądze, ze źródłem „reklama” i oznaczona jako „liczona”. Własną próbną płatność (także zwróconą) oznacz „Nie licz”. Płatność zalogowanego właściciela jest tak oznaczana automatycznie.</p>
<div class="tablewrap"><table><thead><tr><th>Kiedy</th><th>Status</th><th class="n">Kwota</th><th>Dane do faktury</th><th>Tryb</th><th>Źródło</th><th>Werdykt</th><th>Akcje</th></tr></thead><tbody>${orderRows}</tbody></table></div>

<h2 id="reklamy">Koszt reklam</h2>
<div class="stats">
${stat('Kliknięcia wg Google', reportedClicks)}
${stat('Koszt łącznie', reportedCost > 0 ? formatMoney(reportedCost, currency) : '—')}
${stat('Średni koszt kliknięcia', cpc)}
${stat('Koszt jednej prawdziwej firmy', costPerQualified)}
</div>
${gap}
<form method="post" action="${base}/ad-report" class="card">
<h3>Dopisz dzień z Google Ads</h3>
<div class="inline">
<div><label for="day">Dzień (domyślnie wczoraj)</label><input id="day" type="date" name="day" value="${e(d.defaultDay)}" required></div>
<div><label for="clicks">Kliknięcia</label><input id="clicks" type="number" name="clicks" min="0" step="1" required></div>
<div><label for="cost">Koszt (zł)</label><input id="cost" type="number" name="cost" min="0" step="0.01" required></div>
<div><button class="btn" type="submit">Zapisz</button></div>
</div>
<p class="note">Jeden wpis na dzień. Drugi zapis dla tego samego dnia zastępuje pierwszy.</p>
</form>
<div class="tablewrap"><table><thead><tr><th>Dzień</th><th class="n">Kliknięcia</th><th class="n">Koszt</th></tr></thead><tbody>${reportRows}</tbody></table></div>

<h2>Wejścia z reklam według frazy</h2>
<div class="tablewrap"><table><thead><tr><th>Kampania</th><th>Fraza (utm_term)</th><th class="n">Unikalne wejścia</th></tr></thead><tbody>${termRows}</tbody></table></div>

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
      ? '<div class="msg ok">Brak błędów blokujących. Zanim puścisz reklamy, przejdź jeszcze ręcznie całą ścieżkę w oknie incognito (docs/01-BRAMKI.md, bramka 1).</div>'
      : `<div class="msg err">Błędy blokujące: ${fails}. Nie uruchamiaj reklam, dopóki ta liczba nie spadnie do zera.</div>`;
  return shell(
    nonce,
    'Autotest',
    `<h1>Autotest konfiguracji</h1>
<p class="lede">Sprawdza, czy to, co strona obiecuje i co panel mierzy, naprawdę istnieje. Automat sprawdza kształt; sens sprawdzasz Ty.</p>
${summary}
<p class="note">BŁĄD = popraw przed startem. UWAGA = przeczytaj; często to poprawny stan (np. brak Stripe na pierwszy test). OK = w porządku.</p>
<div class="tablewrap"><table><thead><tr><th>Wynik</th><th>Co sprawdzam</th><th>Szczegóły</th></tr></thead><tbody>${rows}</tbody></table></div>`,
    true,
  );
}
