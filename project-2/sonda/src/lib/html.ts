// Wspolny szkielet HTML i style. Kolory i krój zgodne z plar.ai (ciemne tlo, cyjanowy akcent).
// Bez zewnetrznych fontow, skryptow i obrazkow: strona laduje sie z jednego zapytania.

import type { Env, Locale } from '../types';
import { escapeHtml } from './pure';

export const e = escapeHtml;

const CSS = `
:root{--bg:#050609;--panel:#0d1117;--panel2:#121821;--line:#1f2733;--text:#ffffff;--muted:#a1a1aa;--accent:#00ebe6;--accent-ink:#031314;--warn:#ffb454;--bad:#ff6b6b;--good:#3ddc97}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:400 17px/1.6 "IBM Plex Sans",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--accent)}
h1,h2,h3{font-family:"Space Grotesk",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:700;line-height:1.15;margin:0 0 .5em;letter-spacing:-.01em}
h1{font-size:clamp(34px,6vw,56px)}
h2{font-size:clamp(26px,4vw,34px)}
h3{font-size:19px}
p{margin:0 0 1em;color:var(--muted)}
.wrap{max-width:1040px;margin:0 auto;padding:0 20px}
.wrap.wide{max-width:1360px}
header.top{display:flex;justify-content:space-between;align-items:center;padding:18px 0}
.brand{font:700 20px/1 "Space Grotesk",ui-sans-serif,system-ui,sans-serif;color:var(--text);text-decoration:none;letter-spacing:.02em}
.brand span{color:var(--accent)}
section{padding:56px 0;border-top:1px solid var(--line)}
section.hero{border-top:0;padding:48px 0 56px}
.eyebrow{font:600 13px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--accent);letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px}
.lede{font-size:19px;max-width:720px}
.btn{display:inline-block;background:var(--accent);color:var(--accent-ink);font:700 16px/1 "IBM Plex Sans",ui-sans-serif,system-ui,sans-serif;padding:15px 22px;border-radius:8px;border:0;cursor:pointer;text-decoration:none}
.btn:hover{filter:brightness(1.08)}
.btn.ghost{background:transparent;color:var(--text);border:1px solid var(--line)}
.btn[disabled]{opacity:.6;cursor:wait}
.row{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0 18px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:22px}
.grid{display:grid;gap:16px}
@media(min-width:760px){.grid.c3{grid-template-columns:repeat(3,1fr)}.grid.c2{grid-template-columns:repeat(2,1fr)}.grid.c4{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1000px){.grid.c4{grid-template-columns:repeat(4,1fr)}}
[hidden]{display:none!important}
.num{font:700 14px/1 ui-monospace,Menlo,Consolas,monospace;color:var(--accent);margin-bottom:10px}
ul.plain{list-style:none;margin:0;padding:0}
ul.plain li{padding:8px 0 8px 26px;position:relative;color:var(--muted)}
ul.plain li::before{content:"✓";position:absolute;left:0;color:var(--good);font-weight:700}
ul.plain.no li::before{content:"×";color:var(--bad)}
label{display:block;font-size:14px;color:var(--muted);margin:14px 0 6px}
input[type=text],input[type=email],input[type=password],input[type=number],input[type=date],textarea{width:100%;background:var(--panel2);border:1px solid var(--line);border-radius:8px;color:var(--text);font:400 16px/1.4 inherit;padding:12px 13px}
textarea{min-height:170px;resize:vertical;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px}
textarea.plain{min-height:84px;font:400 16px/1.4 inherit}
input:focus,textarea:focus,button:focus-visible,a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.check{display:flex;gap:10px;align-items:flex-start;margin:16px 0;font-size:14px;color:var(--muted)}
.check input{margin-top:4px;width:18px;height:18px;flex:none}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.note{font-size:14px;color:var(--muted)}
.price{font:700 30px/1.1 "Space Grotesk",ui-sans-serif,system-ui,sans-serif;color:var(--text);margin:6px 0 8px}
.msg{border-radius:8px;padding:13px 15px;margin:0 0 16px;font-size:15px}
.msg.ok{background:#0c2a20;border:1px solid #1c5a45;color:#bff3dc}
.msg.err{background:#2c1214;border:1px solid #6a2a2e;color:#ffd0d0}
.msg.warn{background:#2b2110;border:1px solid #6b5120;color:#ffe2b0}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
.chip{background:var(--panel2);border:1px solid var(--line);color:var(--text);border-radius:999px;padding:7px 13px;font-size:14px;cursor:pointer}
.chip.on{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:700}
pre.msgtext{margin:0;white-space:pre-wrap;word-break:break-word;font:400 14px/1.55 ui-monospace,Menlo,Consolas,monospace;color:var(--text);background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:13px}
ul.pricelist{list-style:none;margin:0 0 10px;padding:0}
ul.pricelist li{font:700 24px/1.3 "Space Grotesk",ui-sans-serif,system-ui,sans-serif;color:var(--text)}
blockquote.quote{margin:0;border-left:3px solid var(--accent);padding:4px 0 4px 20px}
blockquote.quote p{font:500 22px/1.4 "Space Grotesk",ui-sans-serif,system-ui,sans-serif;color:var(--text);margin:0 0 12px}
blockquote.quote footer{border:0;padding:0;font-size:15px;color:var(--text)}
h3.gap{margin-top:26px}
ol{color:var(--muted);padding-left:20px;margin:0}
ol li{padding:3px 0}
select{background:var(--panel2);border:1px solid var(--line);border-radius:8px;color:var(--text);font:400 14px/1.3 inherit;padding:7px 9px}
.btn.small{padding:8px 12px;font-size:14px}
form.rowform{display:flex;gap:8px;align-items:center;flex-wrap:wrap;min-width:200px}
form.rowform select{width:100%;max-width:230px}
td.actions{min-width:230px}
form.rowform+form.rowform{margin-top:6px}
label.mini{display:inline-flex;gap:6px;align-items:center;margin:0;font-size:13px;color:var(--muted);font-weight:400}
label.mini input{width:16px;height:16px;margin:0}
main h2{margin-top:38px}
main .wrap>h2:first-child,main .wrap>h1+h2{margin-top:0}
.tablewrap{margin-bottom:6px}
.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;padding:9px 11px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--muted);font-weight:600;white-space:nowrap;background:var(--panel2)}
tr:last-child td{border-bottom:0}
td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}
.kv{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;font-size:15px;margin:0 0 14px}
.kv dt{color:var(--muted)}.kv dd{margin:0}
details{border-bottom:1px solid var(--line);padding:14px 0}
details summary{cursor:pointer;font-weight:600;color:var(--text)}
details p{margin:10px 0 0}
footer{border-top:1px solid var(--line);padding:28px 0 44px;font-size:14px;color:var(--muted)}
footer a{color:var(--muted)}
.pill{display:inline-block;border-radius:999px;padding:3px 10px;font:600 12px/1.5 ui-monospace,Menlo,Consolas,monospace;border:1px solid var(--line)}
.pill.go{background:#0c2a20;border-color:#1c5a45;color:#bff3dc}
.pill.nogo{background:#2c1214;border-color:#6a2a2e;color:#ffd0d0}
.pill.wait{background:#2b2110;border-color:#6b5120;color:#ffe2b0}
.pill.off{color:var(--muted)}
progress{width:100%;height:10px;margin:8px 0 14px;accent-color:var(--accent)}
.big{font:700 26px/1.1 "Space Grotesk",ui-sans-serif,system-ui,sans-serif}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px}
.stat small{display:block;color:var(--muted);font-size:13px;margin-bottom:6px}
.stats{display:grid;gap:10px;grid-template-columns:repeat(2,1fr)}
@media(min-width:760px){.stats{grid-template-columns:repeat(5,1fr)}}
.inline{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}
.inline>div{flex:1 1 130px}
code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.92em;background:var(--panel2);padding:1px 5px;border-radius:4px}
`;

export interface PageOptions {
  title: string;
  description?: string;
  locale: Locale;
  body: string;
  /** Skrypt wstawiany na koncu strony (z nonce). */
  script?: string;
  nonce: string;
  noindex?: boolean;
  canonical?: string;
}

export function page(options: PageOptions): string {
  const robots = options.noindex === false ? '' : '<meta name="robots" content="noindex,nofollow">';
  const description = options.description ? `<meta name="description" content="${e(options.description)}">` : '';
  const canonical = options.canonical ? `<link rel="canonical" href="${e(options.canonical)}">` : '';
  const script = options.script ? `<script nonce="${e(options.nonce)}">${options.script}</script>` : '';
  return `<!doctype html>
<html lang="${options.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#050609">
<title>${e(options.title)}</title>
${description}
${robots}
${canonical}
<style nonce="${e(options.nonce)}">${CSS}</style>
</head>
<body>
${options.body}
${script}
</body>
</html>`;
}

export function newNonce(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

/** Naglowki bezpieczenstwa dla stron HTML. Skrypty i style tylko z nonce, formularze tylko do nas i do Stripe. */
export function htmlHeaders(nonce: string, extra: Record<string, string> = {}): Headers {
  const headers = new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': [
      "default-src 'none'",
      `script-src 'nonce-${nonce}'`,
      `style-src 'nonce-${nonce}'`,
      "img-src 'self' data:",
      "connect-src 'self'",
      "form-action 'self' https://checkout.stripe.com",
      "base-uri 'none'",
      "frame-ancestors 'none'",
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store',
  });
  for (const [key, value] of Object.entries(extra)) headers.set(key, value);
  return headers;
}

export function siteHeader(env: Env): string {
  return `<div class="wrap"><header class="top"><a class="brand" href="/">PLAR<span>.</span></a><span class="note">${e(env.COMPANY_NAME)}</span></header></div>`;
}

export function siteFooter(env: Env, locale: Locale): string {
  const privacy = locale === 'pl' ? 'Polityka prywatności' : 'Privacy policy';
  const terms = locale === 'pl' ? 'Regulamin płatnego pilotażu' : 'Paid pilot terms';
  const nip = locale === 'pl' ? 'NIP' : 'Tax ID';
  return `<footer><div class="wrap">
<p>${e(env.COMPANY_NAME)} · ${nip}: ${e(env.COMPANY_NIP)} · ${e(env.COMPANY_CITY)} · <a href="mailto:${e(env.CONTACT_EMAIL)}">${e(env.CONTACT_EMAIL)}</a></p>
<p><a href="/polityka-prywatnosci?lang=${locale}">${privacy}</a> · <a href="/regulamin?lang=${locale}">${terms}</a></p>
</div></footer>`;
}

/** Data i godzina w UTC dla czasu uniksowego w sekundach (panel). */
export function formatTime(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}
