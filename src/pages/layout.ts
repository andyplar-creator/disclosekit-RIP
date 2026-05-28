// Shared HTML shell. Inline CSS keeps LCP fast and avoids external dependencies.
// All pages are server-rendered from the Worker, cached at the edge for SEO.

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  schemaJsonLd?: object;
  noindex?: boolean;
}

const CSS = `
:root {
  --bg: #fafaf9;
  --fg: #1c1917;
  --muted: #57534e;
  --border: #e7e5e4;
  --card: #ffffff;
  --accent: #1d4ed8;
  --accent-hover: #1e40af;
  --success: #15803d;
  --warn: #b45309;
  --danger: #b91c1c;
  --radius: 6px;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--fg);
  background: var(--bg);
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
header { border-bottom: 1px solid var(--border); background: #fff; }
header .wrap { max-width: 1100px; margin: 0 auto; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; }
header a.brand { font-weight: 700; color: var(--fg); font-size: 17px; }
header nav a { margin-left: 18px; font-size: 14px; color: var(--muted); }
header nav a:hover { color: var(--fg); text-decoration: none; }
main { max-width: 1100px; margin: 0 auto; padding: 32px 20px 80px; }
h1 { font-size: 32px; margin: 0 0 12px; line-height: 1.2; }
h2 { font-size: 22px; margin: 32px 0 12px; }
h3 { font-size: 17px; margin: 18px 0 6px; }
.lede { font-size: 17px; color: var(--muted); max-width: 720px; margin: 0 0 24px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 820px) { .grid-2 { grid-template-columns: 1fr; } }
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}
.btn {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  padding: 10px 16px;
  border-radius: var(--radius);
  border: 0;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}
.btn:hover { background: var(--accent-hover); text-decoration: none; }
.btn.secondary { background: #fff; color: var(--fg); border: 1px solid var(--border); }
.btn.secondary:hover { background: #f5f5f4; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
label { display: block; font-weight: 600; font-size: 14px; margin: 14px 0 4px; }
select, input[type=text], input[type=email], textarea {
  width: 100%;
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font: inherit;
  background: #fff;
}
textarea { min-height: 72px; resize: vertical; }
.small { font-size: 13px; color: var(--muted); }
.badge {
  display: inline-block; background: #fef3c7; color: #78350f; font-size: 12px;
  padding: 2px 8px; border-radius: 10px; margin-left: 6px; font-weight: 600;
}
pre, code {
  font-family: var(--mono); font-size: 13px;
}
pre {
  background: #f5f5f4; border: 1px solid var(--border); border-radius: var(--radius);
  padding: 12px; overflow-x: auto; white-space: pre-wrap; word-break: break-word;
}
.copy-row { display: flex; gap: 8px; align-items: center; margin: 6px 0 14px; }
.copy-row button { padding: 6px 10px; font-size: 13px; }
.result h3 { margin-top: 0; }
.result-preview {
  padding: 14px; border: 1px dashed var(--border); border-radius: var(--radius);
  background: #fff; margin-bottom: 12px;
}
ul.clauses { padding-left: 20px; }
ul.clauses li { margin-bottom: 4px; }
.caveats { background: #fef9c3; border-left: 3px solid #ca8a04; padding: 10px 12px; border-radius: 4px; margin: 10px 0; }
.caveats ul { margin: 6px 0 0 20px; padding: 0; }
.err { color: var(--danger); background: #fef2f2; border: 1px solid #fecaca; padding: 10px; border-radius: var(--radius); }
.ok { color: var(--success); background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: var(--radius); }
.loader { display: inline-block; width: 14px; height: 14px; border: 2px solid #ccc; border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; vertical-align: middle; margin-right: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }
footer { border-top: 1px solid var(--border); background: #fff; color: var(--muted); font-size: 13px; margin-top: 60px; }
footer .wrap { max-width: 1100px; margin: 0 auto; padding: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--muted); margin-left: 14px; }
.pricing { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin: 20px 0; }
@media (max-width: 820px) { .pricing { grid-template-columns: 1fr; } }
.price-card { border: 1px solid var(--border); background: #fff; padding: 20px; border-radius: var(--radius); }
.price-card.featured { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(29,78,216,.08); }
.price-card .amt { font-size: 28px; font-weight: 700; margin: 8px 0; }
.price-card ul { padding-left: 18px; margin: 12px 0; }
.price-card li { margin-bottom: 4px; font-size: 14px; }
.deadline-banner {
  background: #fef2f2; border: 1px solid #fecaca; color: #7f1d1d;
  padding: 10px 14px; border-radius: var(--radius); font-size: 14px; margin-bottom: 20px;
}
`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderPage(meta: PageMeta, bodyHtml: string): string {
  const ogTitle = meta.ogTitle ?? meta.title;
  const ogDesc = meta.ogDescription ?? meta.description;
  const jsonLdTag = meta.schemaJsonLd
    ? `<script type="application/ld+json">${JSON.stringify(meta.schemaJsonLd)}</script>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<link rel="canonical" href="${escapeHtml(meta.canonical)}">
${meta.noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index,follow">'}
<meta property="og:title" content="${escapeHtml(ogTitle)}">
<meta property="og:description" content="${escapeHtml(ogDesc)}">
<meta property="og:url" content="${escapeHtml(meta.canonical)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%231d4ed8'/%3E%3Ctext x='32' y='42' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='white'%3EAI%3C/text%3E%3C/svg%3E">
<style>${CSS}</style>
${jsonLdTag}
</head>
<body>
<header><div class="wrap">
  <a class="brand" href="/">AI Disclosure Kit</a>
  <nav>
    <a href="/templates">Templates</a>
    <a href="/pricing">Pricing</a>
    <a href="/article-50">Article 50</a>
    <a href="/api">API</a>
  </nav>
</div></header>
<main>${bodyHtml}</main>
<footer><div class="wrap">
  <div>© AI Disclosure Kit · Not legal advice.</div>
  <div>
    <a href="/article-50">About Article 50</a>
    <a href="/pricing">Pricing</a>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
  </div>
</div></footer>
<!-- Cloudflare Web Analytics (cookie-free, GDPR-compliant RUM) -->
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "555a825c31134c8daeeb0278a405b763"}'></script>
</body></html>`;
}

export { escapeHtml };
