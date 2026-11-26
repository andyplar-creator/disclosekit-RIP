// Landing eksperymentu, w calosci generowany z konfiguracji.

import type { Attribution, Env, Experiment, OrderExtraction } from '../types';
import { e, page, siteFooter, siteHeader } from '../lib/html';
import { formatMoney } from '../lib/pure';

export type Flash =
  | 'lead_ok'
  | 'lead_updated'
  | 'lead_invalid'
  | 'lead_missing'
  | 'lead_consent'
  | 'lead_error'
  | 'rate'
  | 'pay_unavailable'
  | 'pay_terms'
  | 'pay_cancelled'
  | null;

/** To, co odwiedzajacy wpisal w formularz: przy bledzie oddajemy strone z tymi samymi danymi. */
export interface FormValues {
  email: string;
  company: string;
  erp: string;
  volume: string;
  nip: string;
  phone: string;
  note: string;
  wantsInvoice: boolean;
  consent: boolean;
}

export interface LandingState {
  nonce: string;
  attribution: Attribution;
  /** Komunikat po wyslaniu formularza. */
  flash: Flash;
  /** Wartosci do ponownego wypelnienia formularza po bledzie; null = pusty formularz. */
  form: FormValues | null;
  paymentsEnabled: boolean;
  /** Pole "wklej wlasna wiadomosc" dziala tylko, gdy eksperyment je wlacza i jest klucz API. */
  livePaste: boolean;
  isPreview: boolean;
}

const T = {
  pl: {
    email: 'Firmowy adres e-mail',
    consent: 'Zgadzam się na kontakt w sprawie pilotażu. Administratorem danych jest',
    privacy: 'polityka prywatności',
    hpLabel: 'Zostaw to pole puste',
    lead_updated: 'Mam już zgłoszenie z tego adresu, więc uzupełniłem je o nowe dane. Nie trzeba wysyłać go ponownie.',
    lead_error: 'Nie udało się zapisać zgłoszenia. To błąd po mojej stronie. Spróbuj za chwilę albo napisz bezpośrednio na adres ze stopki.',
    lead_invalid: 'Ten adres e-mail wygląda na niepoprawny. Sprawdź go i spróbuj ponownie. Reszta formularza została zachowana.',
    lead_missing: 'Uzupełnij nazwę firmy, program magazynowy i liczbę zamówień. Bez tego nie przygotuję sensownej odpowiedzi.',
    lead_consent: 'Zaznacz zgodę na kontakt, inaczej nie mogę przyjąć zgłoszenia.',
    rate: 'Za dużo prób z tego urządzenia. Spróbuj ponownie jutro albo napisz na adres ze stopki.',
    pay_unavailable: 'Płatność jest chwilowo niedostępna. Wyślij zgłoszenie, odezwę się osobiście.',
    pay_terms: 'Zaznacz pole pod przyciskiem, żeby przejść do płatności.',
    pay_cancelled: 'Płatność przerwana. Nic nie zostało pobrane.',
    preview: 'PODGLĄD: ten eksperyment nie jest publiczny i widzisz go tylko Ty. Zgłoszenia wysłane stąd są oznaczane jako testowe.',
    message: 'Wiadomość od klienta',
    result: 'Co widzi operator',
    illustrative: 'Przykłady poglądowe: wiadomości są wymyślone, a wyniki przygotowane ręcznie.',
    payNeutral: 'Tę stronę widzisz po zakończeniu płatności.',
    customer: 'Klient',
    date: 'Termin',
    address: 'Adres dostawy',
    product: 'Towar',
    qty: 'Ilość',
    unit: 'Jedn.',
    note: 'Uwagi',
    clarify: 'Do uściślenia przed zatwierdzeniem',
    notOrder: 'To nie wygląda na zamówienie.',
    pasteTitle: 'Sprawdź na własnej wiadomości',
    working: 'Czytam…',
    demoErr: 'Nie udało się przetworzyć tekstu. Spróbuj ponownie za chwilę.',
    demoLong: 'Tekst jest za długi na demo (limit 6000 znaków). Wklej jedno zamówienie.',
    demoLimit: 'Limit demo na dziś został wyczerpany. Wyślij zgłoszenie, pokażę to na Twoich zamówieniach.',
    demoEmpty: 'Wklej treść zamówienia.',
    scopeTitle: 'Bez magii. Konkretna lista.',
    fitTitle: 'Dla kogo',
    faq: 'Częste pytania',
    how: 'Jak to działa',
    next: 'Co się stanie po wysłaniu',
    brutto: 'brutto',
    terms: 'regulamin płatnego pilotażu',
    empty: '—',
  },
  en: {
    email: 'Work e-mail address',
    consent: 'I agree to be contacted about the pilot. The data controller is',
    privacy: 'privacy policy',
    hpLabel: 'Leave this field empty',
    lead_updated: 'I already had a request from this address, so I added the new details to it.',
    lead_error: 'The request could not be saved. This is an error on my side. Please try again in a moment or write to the address in the footer.',
    lead_invalid: 'This e-mail address looks wrong. Please check it and try again. The rest of the form has been kept.',
    lead_missing: 'Please fill in the company name, your warehouse system and the number of orders.',
    lead_consent: 'Please tick the consent box so I can accept your request.',
    rate: 'Too many attempts from this device. Please try again tomorrow.',
    pay_unavailable: 'Payment is temporarily unavailable. Send the request and I will get back to you.',
    pay_terms: 'Please tick the box under the button to continue to payment.',
    pay_cancelled: 'Payment cancelled. Nothing was charged.',
    preview: 'PREVIEW: this experiment is not public and only you can see it. Requests sent from here are marked as tests.',
    message: 'Customer message',
    result: 'What the operator sees',
    illustrative: 'Illustrative examples: the messages are invented and the results were prepared by hand.',
    payNeutral: 'You see this page after finishing a payment.',
    customer: 'Customer',
    date: 'Date',
    address: 'Delivery address',
    product: 'Product',
    qty: 'Qty',
    unit: 'Unit',
    note: 'Notes',
    clarify: 'To clarify before approval',
    notOrder: 'This does not look like an order.',
    pasteTitle: 'Try it on your own message',
    working: 'Reading…',
    demoErr: 'Could not process the text. Please try again in a moment.',
    demoLong: 'The text is too long for the demo (6000 characters). Paste a single order.',
    demoLimit: 'The demo limit for today is used up. Send the request and I will show it on your own orders.',
    demoEmpty: 'Paste an order.',
    scopeTitle: 'No magic. A concrete list.',
    fitTitle: 'Who it is for',
    faq: 'Frequently asked questions',
    how: 'How it works',
    next: 'What happens after you send it',
    brutto: 'incl. VAT',
    terms: 'paid pilot terms',
    empty: '—',
  },
} as const;

function hiddenAttribution(a: Attribution): string {
  const field = (name: string, value: string | null) => (value ? `<input type="hidden" name="${name}" value="${e(value)}">` : '');
  return `${a.isAd ? '<input type="hidden" name="ad" value="1">' : ''}${field('utm_source', a.utmSource)}${field('utm_medium', a.utmMedium)}${field('utm_campaign', a.utmCampaign)}${field('utm_term', a.utmTerm)}`;
}

export function renderOrderTable(order: OrderExtraction, locale: 'pl' | 'en'): string {
  const t = T[locale];
  const dash = t.empty;
  if (!order.is_order && order.items.length === 0) {
    const why = order.to_clarify.map((q) => `<li>${e(q)}</li>`).join('');
    return `<div class="msg warn">${t.notOrder}</div>${why ? `<ul>${why}</ul>` : ''}`;
  }
  const rows = order.items
    .map(
      (item) =>
        `<tr><td>${e(item.product)}</td><td class="n">${item.quantity === null ? dash : e(String(item.quantity))}</td><td>${item.unit ? e(item.unit) : dash}</td><td>${item.note ? e(item.note) : dash}</td></tr>`,
    )
    .join('');
  const clarify = order.to_clarify.length ? `<h3>${t.clarify}</h3><ul>${order.to_clarify.map((q) => `<li>${e(q)}</li>`).join('')}</ul>` : '';
  return `<dl class="kv">
<dt>${t.customer}</dt><dd>${order.customer ? e(order.customer) : dash}</dd>
<dt>${t.date}</dt><dd>${order.delivery_date ? e(order.delivery_date) : dash}</dd>
<dt>${t.address}</dt><dd>${order.delivery_address ? e(order.delivery_address) : dash}</dd>
</dl>
<div class="tablewrap"><table><thead><tr><th>${t.product}</th><th class="n">${t.qty}</th><th>${t.unit}</th><th>${t.note}</th></tr></thead><tbody>${rows}</tbody></table></div>
${clarify}`;
}

function demoSection(x: Experiment, state: LandingState): string {
  const demo = x.demo;
  if (!demo) return '';
  const t = T[x.locale];
  // Gotowe przyklady: pierwszy widoczny od razu, pozostale przelacza skrypt. Bez skryptu widac pierwszy.
  const chips =
    demo.examples.length > 1
      ? `<div class="chips" role="tablist">${demo.examples
          .map((example, index) => `<button type="button" class="chip${index === 0 ? ' on' : ''}" role="tab" aria-selected="${index === 0}" data-example="${index}">${e(example.label)}</button>`)
          .join('')}</div>`
      : '';
  const panels = demo.examples
    .map(
      (example, index) => `<div class="grid c2" data-example-panel="${index}"${index === 0 ? '' : ' hidden'}>
<div class="card"><h3>${t.message}</h3><pre class="msgtext">${e(example.input)}</pre></div>
<div class="card"><h3>${t.result}</h3>${renderOrderTable(example.output, x.locale)}</div>
</div>`,
    )
    .join('');
  const video = demo.videoUrl
    ? `<p><a href="${e(demo.videoUrl)}" target="_blank" rel="noopener" data-cta="demo_video">${e(demo.videoLabel ?? demo.videoUrl)}</a></p>`
    : '';
  const paste = state.livePaste
    ? `<h3>${t.pasteTitle}</h3>
<div class="grid c2">
<div class="card">
<label for="demo-text">${t.message}</label>
<textarea id="demo-text" maxlength="6000" placeholder="${e(demo.placeholder)}"></textarea>
<div class="row"><button type="button" class="btn" id="demo-run">${e(demo.button)}</button></div>
<p class="note">${e(demo.privacyNote)}</p>
</div>
<div class="card"><h3>${t.result}</h3><div id="demo-out" aria-live="polite"><p class="note">${t.empty}</p></div></div>
</div>`
    : '';
  return `<section id="demo"><div class="wrap">
<h2>${e(demo.title)}</h2>
<p class="lede">${e(demo.intro)}</p>
${chips}
${panels}
<p class="note">${t.illustrative}</p>
${video}
${paste}
</div></section>`;
}

function flashMessage(x: Experiment, state: LandingState): string {
  if (!state.flash) return '';
  const t = T[x.locale];
  if (state.flash === 'lead_ok') return `<div class="msg ok" role="status">${e(x.offer.request.success)}</div>`;
  if (state.flash === 'lead_updated') return `<div class="msg ok" role="status">${t.lead_updated}</div>`;
  const kind = state.flash === 'pay_cancelled' ? 'warn' : 'err';
  return `<div class="msg ${kind}" role="alert">${t[state.flash]}</div>`;
}

function offerSection(x: Experiment, env: Env, state: LandingState): string {
  const t = T[x.locale];
  const r = x.offer.request;
  const hidden = hiddenAttribution(state.attribution);
  const pilot = x.offer.pilot;
  const showPay = Boolean(pilot && state.paymentsEnabled);
  const v = state.form;
  const val = (text: string | undefined) => (text ? ` value="${e(text)}"` : '');
  const priceLines = x.offer.priceLines.map((line) => `<li>${e(line)}</li>`).join('');
  const nextSteps = r.nextSteps.map((step) => `<li>${e(step)}</li>`).join('');
  const invoice = r.invoiceCheckbox
    ? `<label class="check"><input type="checkbox" name="wants_invoice" value="1"${v?.wantsInvoice ? ' checked' : ''}><span>${e(r.invoiceCheckbox)}${
        pilot ? ` (${e(formatMoney(pilot.amountGrossMinor, pilot.currency, x.locale))} ${t.brutto})` : ''
      }</span></label>`
    : '';
  const payCard =
    pilot && showPay
      ? `<div class="card">
<h3>${e(pilot.title)}</h3>
<p>${e(pilot.body)}</p>
<p class="price">${e(formatMoney(pilot.amountGrossMinor, pilot.currency, x.locale))} <span class="note">${t.brutto}</span></p>
<p class="note">${e(pilot.guarantee)}</p>
<form method="post" action="/api/${e(x.slug)}/checkout">
${hidden}
<label class="check"><input type="checkbox" name="terms" value="1" required><span>${e(pilot.termsCheckbox)} (<a href="/regulamin?lang=${x.locale}" target="_blank" rel="noopener">${t.terms}</a>)</span></label>
<button class="btn" type="submit">${e(pilot.button)} — ${e(formatMoney(pilot.amountGrossMinor, pilot.currency, x.locale))} ${t.brutto}</button>
</form>
</div>`
      : '';
  return `<section id="zapis"><div class="wrap">
<div class="eyebrow">${e(x.offer.title)}</div>
<ul class="pricelist">${priceLines}</ul>
<p>${e(x.offer.priceNote)}</p>
${flashMessage(x, state)}
<div class="grid ${payCard ? 'c2' : ''}">
<div class="card">
<h3>${e(r.title)}</h3>
<p>${e(r.body)}</p>
<form method="post" action="/api/${e(x.slug)}/lead">
${hidden}
<label for="lead-email">${t.email}</label>
<input id="lead-email" type="email" name="email" required maxlength="254" autocomplete="email" inputmode="email"${val(v?.email)}>
<label for="lead-company">${e(r.companyLabel)}</label>
<input id="lead-company" type="text" name="company" required maxlength="120" autocomplete="organization"${val(v?.company)}>
<label for="lead-erp">${e(r.erpLabel)}</label>
<input id="lead-erp" type="text" name="erp" required maxlength="120"${val(v?.erp)}>
<label for="lead-volume">${e(r.volumeLabel)}</label>
<input id="lead-volume" type="text" name="volume" required maxlength="80"${val(v?.volume)}>
<label for="lead-note">${e(r.noteLabel)}</label>
<textarea id="lead-note" class="plain" name="note" maxlength="600">${v?.note ? e(v.note) : ''}</textarea>
<label for="lead-nip">${e(r.nipLabel)}</label>
<input id="lead-nip" type="text" name="nip" maxlength="20" inputmode="numeric"${val(v?.nip)}>
<label for="lead-phone">${e(r.phoneLabel)}</label>
<input id="lead-phone" type="text" name="phone" maxlength="30" autocomplete="tel" inputmode="tel"${val(v?.phone)}>
<div class="hp" aria-hidden="true"><label for="lead-website">${t.hpLabel}</label><input id="lead-website" type="text" name="website" tabindex="-1" autocomplete="off"></div>
${invoice}
<label class="check"><input type="checkbox" name="consent" value="1" required${v?.consent ? ' checked' : ''}><span>${t.consent} ${e(env.COMPANY_NAME)} (<a href="/polityka-prywatnosci?lang=${x.locale}" target="_blank" rel="noopener">${t.privacy}</a>).</span></label>
<button class="btn" type="submit">${e(r.button)}</button>
</form>
<h3 class="gap">${t.next}</h3>
<ol>${nextSteps}</ol>
</div>
${payCard}
</div></div></section>`;
}

/** Skrypt strony: przelaczanie przykladow, licznik klikniec i (opcjonalnie) demo na zywo. Bez ciasteczek. */
function landingScript(x: Experiment, state: LandingState): string {
  const t = T[x.locale];
  const config = {
    slug: x.slug,
    live: state.livePaste,
    ad: state.attribution.isAd,
    text: { working: t.working, err: t.demoErr, long: t.demoLong, limit: t.demoLimit, empty: t.demoEmpty },
  };
  // JSON wstawiony do skryptu: znak "<" zamieniamy, zeby nie dalo sie zamknac znacznika script.
  const json = JSON.stringify(config).replace(/</g, '\\u003c');
  return `(function(){
var C=${json};
function beacon(target){try{var b=new Blob([JSON.stringify({target:target,ad:C.ad})],{type:'application/json'});navigator.sendBeacon('/api/'+C.slug+'/event',b);}catch(_){}}
document.querySelectorAll('[data-cta]').forEach(function(el){el.addEventListener('click',function(){beacon(el.getAttribute('data-cta'));});});
var chips=document.querySelectorAll('[data-example]'),panels=document.querySelectorAll('[data-example-panel]');
chips.forEach(function(chip){chip.addEventListener('click',function(){
var id=chip.getAttribute('data-example');
panels.forEach(function(p){p.hidden=p.getAttribute('data-example-panel')!==id;});
chips.forEach(function(c){var on=c===chip;c.classList.toggle('on',on);c.setAttribute('aria-selected',on?'true':'false');});
beacon('example_'+id);
});});
if(!C.live)return;
var input=document.getElementById('demo-text'),out=document.getElementById('demo-out'),run=document.getElementById('demo-run');
if(!input||!out||!run)return;
function note(cls,text){out.innerHTML='';var d=document.createElement('div');d.className='msg '+cls;d.textContent=text;out.appendChild(d);}
run.addEventListener('click',function(){
var text=input.value.trim();
if(!text){note('warn',C.text.empty);return;}
run.disabled=true;note('warn',C.text.working);
fetch('/api/'+C.slug+'/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:text,ad:C.ad})})
.then(function(r){return r.json().then(function(j){return {status:r.status,body:j};});})
.then(function(r){
if(r.status===200&&r.body&&typeof r.body.html==='string'){out.innerHTML=r.body.html;}
else if(r.status===413){note('err',C.text.long);}
else if(r.status===429){note('warn',C.text.limit);}
else{note('err',C.text.err);}
})
.catch(function(){note('err',C.text.err);})
.then(function(){run.disabled=false;});
});
})();`;
}

export function renderLanding(x: Experiment, env: Env, state: LandingState): string {
  const t = T[x.locale];
  const steps = x.steps.map((step, index) => `<div class="card"><div class="num">0${index + 1}</div><h3>${e(step.title)}</h3><p>${e(step.body)}</p></div>`).join('');
  const stepCols = x.steps.length === 4 ? 'c4' : 'c3';
  const list = (lines: string[]) => lines.map((line) => `<li>${e(line)}</li>`).join('');
  const faq = x.faq.map((item) => `<details><summary>${e(item.q)}</summary><p>${e(item.a)}</p></details>`).join('');
  const proof = x.proof
    ? `<p class="note">${e(x.proof.text)} <a href="${e(x.proof.linkUrl)}" target="_blank" rel="noopener" data-cta="proof_link">${e(x.proof.linkLabel)}</a></p>`
    : '';
  const secondary = x.hero.secondaryCta && x.demo ? `<a class="btn ghost" href="#demo" data-cta="hero_demo">${e(x.hero.secondaryCta)}</a>` : '';
  const preview = state.isPreview ? `<div class="wrap"><div class="msg warn">${t.preview}</div></div>` : '';
  const reference = x.reference
    ? `<section><div class="wrap"><blockquote class="quote"><p>„${e(x.reference.quote)}”</p><footer>${e(x.reference.author)}<br><span class="note">${e(x.reference.source)}</span></footer></blockquote></div></section>`
    : '';
  const fit = x.fit
    ? `<section><div class="wrap"><h2>${t.fitTitle}</h2><div class="grid c2">
<div class="card"><h3>${e(x.fit.forTitle)}</h3><ul class="plain">${list(x.fit.for)}</ul></div>
<div class="card"><h3>${e(x.fit.notForTitle)}</h3><ul class="plain no">${list(x.fit.notFor)}</ul></div>
</div></div></section>`
    : '';

  const body = `${siteHeader(env)}
${preview}
<main>
<section class="hero"><div class="wrap">
<div class="eyebrow">${e(x.hero.eyebrow)}</div>
<h1>${e(x.hero.headline)}</h1>
<p class="lede">${e(x.hero.sub)}</p>
<div class="row"><a class="btn" href="#zapis" data-cta="hero_primary">${e(x.hero.primaryCta)}</a>${secondary}</div>
${proof}
</div></section>
${demoSection(x, state)}
<section><div class="wrap"><h2>${t.how}</h2><div class="grid ${stepCols}">${steps}</div></div></section>
${reference}
<section><div class="wrap"><h2>${t.scopeTitle}</h2><div class="grid c2">
<div class="card"><h3>${e(x.scope.doesTitle)}</h3><ul class="plain">${list(x.scope.does)}</ul></div>
<div class="card"><h3>${e(x.scope.doesNotTitle)}</h3><ul class="plain no">${list(x.scope.doesNot)}</ul></div>
</div></div></section>
${fit}
${offerSection(x, env, state)}
<section><div class="wrap"><h2>${t.faq}</h2>${faq}</div></section>
</main>
${siteFooter(env, x.locale)}`;

  return page({
    title: x.meta.title,
    description: x.meta.description,
    locale: x.locale,
    body,
    script: landingScript(x, state),
    nonce: state.nonce,
    noindex: true,
  });
}

export function renderThanks(x: Experiment, env: Env, nonce: string, knownSession: boolean): string {
  const pl = x.locale === 'pl';
  const t = T[x.locale];
  const mail = `<a href="mailto:${e(env.CONTACT_EMAIL)}">${e(env.CONTACT_EMAIL)}</a>`;
  // Potwierdzenie tylko dla sesji platnosci, ktora naprawde u nas powstala. Kazdy inny widzi tekst neutralny.
  const main = knownSession
    ? `<h1>${pl ? 'Dziękuję. Płatność przyjęta do realizacji.' : 'Thank you. Your payment is being processed.'}</h1>
<p class="lede">${
        pl
          ? `Odezwę się osobiście w ciągu 2 dni roboczych, żeby ustalić start. Fakturę wystawię na nazwę firmy, NIP i adres podane przy płatności. W razie pytań: `
          : `I will contact you personally within 2 working days to agree the start. The invoice will be issued to the company name, tax ID and address given at payment. Questions: `
      }${mail}.</p>
${x.offer.pilot ? `<p class="note">${e(x.offer.pilot.guarantee)}</p>` : ''}`
    : `<h1>${pl ? 'Nie widzę tu płatności' : 'No payment found here'}</h1>
<p class="lede">${t.payNeutral} ${pl ? 'Jeśli właśnie zapłaciłeś i widzisz ten komunikat, napisz na ' : 'If you have just paid and see this message, write to '}${mail}.</p>`;
  const body = `${siteHeader(env)}
<main><section class="hero"><div class="wrap">
<div class="eyebrow">${e(x.offer.title)}</div>
${main}
<div class="row"><a class="btn ghost" href="/${e(x.slug)}">${pl ? 'Wróć na stronę' : 'Back to the page'}</a></div>
</div></section></main>
${siteFooter(env, x.locale)}`;
  return page({ title: pl ? 'Dziękuję — PLAR' : 'Thank you — PLAR', locale: x.locale, body, nonce, noindex: true });
}
