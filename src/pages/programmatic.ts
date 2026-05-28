import { renderPage, escapeHtml } from './layout';
import type { SystemType } from '../types';

// Programmatic SEO pages: /templates/[system-type]-[industry]
// Each page targets a specific long-tail query like "AI disclosure for chatbot in ecommerce".
// Static HTML, pre-filled tool form, Article 50 clause text.

export const SYSTEMS: Array<{ slug: string; type: SystemType; name: string; clauses: string[] }> = [
  { slug: 'chatbot', type: 'chatbot', name: 'Chatbot / AI assistant', clauses: ['50(1)'] },
  { slug: 'text-generator', type: 'text_generator', name: 'AI text generator', clauses: ['50(2)', '50(4)'] },
  { slug: 'image-generator', type: 'image_generator', name: 'AI image generator', clauses: ['50(2)'] },
  { slug: 'video-generator', type: 'video_generator', name: 'AI video generator', clauses: ['50(2)'] },
  { slug: 'audio-generator', type: 'audio_generator', name: 'AI audio generator', clauses: ['50(2)'] },
  { slug: 'deepfake', type: 'deepfake', name: 'Deepfake content', clauses: ['50(2)', '50(4)'] },
  { slug: 'emotion-recognition', type: 'emotion_recognition', name: 'Emotion recognition', clauses: ['50(3)'] },
  { slug: 'biometric-categorisation', type: 'biometric_categorisation', name: 'Biometric categorisation', clauses: ['50(3)'] },
];

export const INDUSTRIES: Array<{ slug: string; name: string; value: string }> = [
  { slug: 'ecommerce', value: 'ecommerce', name: 'E-commerce' },
  { slug: 'fintech', value: 'fintech', name: 'Fintech' },
  { slug: 'healthcare', value: 'healthcare', name: 'Healthcare' },
  { slug: 'education', value: 'education', name: 'Education' },
  { slug: 'hr-recruitment', value: 'hr_recruitment', name: 'HR & Recruitment' },
  { slug: 'media', value: 'media', name: 'Media & Publishing' },
  { slug: 'saas', value: 'general', name: 'SaaS' },
];

const CLAUSE_TEXT: Record<string, string> = {
  '50(1)': 'Providers of AI systems intended to interact directly with natural persons shall ensure the systems are designed so that natural persons are informed that they are interacting with an AI system, unless this is obvious from context.',
  '50(2)': 'Providers of AI systems generating synthetic audio, image, video, or text content shall ensure outputs are marked in a machine-readable format and detectable as artificially generated or manipulated.',
  '50(3)': 'Deployers of emotion recognition or biometric categorisation systems shall inform the natural persons exposed and process data under applicable data protection law.',
  '50(4)': 'Deployers of deepfake systems or AI systems generating text for matters of public interest shall disclose the artificial origin of the content.',
};

// List of all (system, industry) combinations we generate.
// Primary strategy: all systems × key industries = 8 × 7 = 56 pages. We ship top 20 in launch.
export function allTemplateSlugs(): string[] {
  const priority: string[] = [];
  // High-intent: chatbot × all industries (most common disclosure search)
  for (const ind of INDUSTRIES) priority.push(`chatbot-${ind.slug}`);
  // Generators × top industries
  for (const sys of ['text-generator', 'image-generator', 'deepfake']) {
    for (const ind of ['ecommerce', 'media', 'saas', 'fintech']) priority.push(`${sys}-${ind}`);
  }
  // Specialty
  priority.push('emotion-recognition-hr-recruitment');
  priority.push('biometric-categorisation-fintech');
  priority.push('audio-generator-media');
  priority.push('video-generator-media');
  return Array.from(new Set(priority));
}

export function findCombo(slug: string): { system: typeof SYSTEMS[number]; industry: typeof INDUSTRIES[number] } | null {
  // Parse slug "chatbot-ecommerce" by matching longest system slug prefix.
  for (const sys of SYSTEMS) {
    if (slug === sys.slug || slug.startsWith(sys.slug + '-')) {
      const rest = slug.slice(sys.slug.length).replace(/^-/, '');
      if (!rest) return null;
      const ind = INDUSTRIES.find(i => i.slug === rest);
      if (ind) return { system: sys, industry: ind };
    }
  }
  return null;
}

export function renderTemplatePage(slug: string, siteUrl: string): string | null {
  const combo = findCombo(slug);
  if (!combo) return null;
  const { system, industry } = combo;

  const title = `${system.name} disclosure for ${industry.name} — EU AI Act Article 50`;
  const description = `Generate a compliant EU AI Act Article 50 disclosure for a ${system.name.toLowerCase()} in ${industry.name.toLowerCase()}. Free tool. Deadline 2 August 2026.`;

  const clauseBlock = system.clauses
    .map(c => `<li><strong>Article ${c}:</strong> ${escapeHtml(CLAUSE_TEXT[c] ?? '')}</li>`)
    .join('');

  const body = `
<p class="small"><a href="/templates">← All templates</a></p>
<h1>${escapeHtml(system.name)} disclosure for ${escapeHtml(industry.name)}</h1>
<p class="lede">
  Generate an EU AI Act Article 50 compliant disclosure for a <strong>${escapeHtml(system.name.toLowerCase())}</strong>
  deployed in <strong>${escapeHtml(industry.name.toLowerCase())}</strong>. The form below is pre-filled — just
  pick a language and generate.
</p>

<div class="grid-2">
  <form id="gen-form" class="card">
    <h2 style="margin-top:0">Generate disclosure</h2>
    <input type="hidden" name="systemType" value="${escapeHtml(system.type)}">
    <input type="hidden" name="industry" value="${escapeHtml(industry.value)}">
    <p class="small">Pre-filled: <strong>${escapeHtml(system.name)}</strong> in <strong>${escapeHtml(industry.name)}</strong>.</p>

    <label for="f-lang">Language</label>
    <select id="f-lang" name="language">
      <option value="en">English</option>
      <option value="pl">Polish</option>
      <option value="de">German</option>
      <option value="fr">French</option>
      <option value="es">Spanish</option>
      <option value="it">Italian</option>
      <option value="nl">Dutch</option>
    </select>

    <label for="f-product">Product name (optional)</label>
    <input id="f-product" name="productName" type="text" maxlength="80">

    <label for="f-context">Deployment context (optional)</label>
    <textarea id="f-context" name="deploymentContext" maxlength="400"></textarea>

    <div style="margin-top:16px">
      <button type="submit" class="btn" id="f-submit">Generate disclosure</button>
      <span id="f-status" class="small" style="margin-left:12px"></span>
    </div>
  </form>

  <div class="card result" id="result">
    <h3>Applicable Article 50 clauses</h3>
    <ul class="clauses">${clauseBlock}</ul>
    <p class="small">
      Click <strong>Generate disclosure</strong> to produce the user-facing text, HTML banner,
      and a compliance-file note — tailored to ${escapeHtml(industry.name.toLowerCase())}.
    </p>
  </div>
</div>

<h2>Why ${escapeHtml(industry.name.toLowerCase())} companies need this</h2>
<p class="small">
  Article 50 applies to every EU-facing AI deployment. For ${escapeHtml(system.name.toLowerCase())} systems,
  the core requirement is that users know they are interacting with (or viewing output of) an AI system.
  Fines reach €7.5M or 1.5% of global turnover. Fewer than 30% of European SMEs have started compliance work
  (Center for Data Innovation survey, late 2025).
</p>

<h2>Related templates</h2>
<p class="small">
${INDUSTRIES.filter(i => i.slug !== industry.slug).slice(0, 4).map(i =>
  `<a href="/templates/${system.slug}-${i.slug}">${escapeHtml(system.name)} for ${escapeHtml(i.name)}</a>`
).join(' · ')}
</p>
<p class="small" style="margin-top:8px">
${SYSTEMS.filter(s => s.slug !== system.slug).slice(0, 4).map(s =>
  `<a href="/templates/${s.slug}-${industry.slug}">${escapeHtml(s.name)} for ${escapeHtml(industry.name)}</a>`
).join(' · ')}
</p>

<script>
(() => {
  const form = document.getElementById('gen-form');
  const submit = document.getElementById('f-submit');
  const status = document.getElementById('f-status');
  const result = document.getElementById('result');
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submit.disabled = true;
    status.innerHTML = '<span class="loader"></span>Generating…';
    const fd = new FormData(form);
    const payload = {
      systemType: fd.get('systemType'),
      industry: fd.get('industry'),
      language: fd.get('language'),
      productName: fd.get('productName') || undefined,
      deploymentContext: fd.get('deploymentContext') || undefined,
    };
    try {
      const res = await fetch('/api/generate', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(payload)});
      const data = await res.json();
      if (!res.ok) {
        result.innerHTML = '<div class="err">' + esc(data.error || 'Error') + '</div>' +
          (data.upsell ? '<p style="margin-top:14px"><a class="btn" href="/pricing">Upgrade →</a></p>' : '');
        return;
      }
      result.innerHTML =
        '<h3>Disclosure (' + esc(data.language) + ')</h3>' +
        '<p>' + esc(data.userFacingText) + '</p>' +
        '<h4>Copy-paste HTML</h4>' +
        '<div class="result-preview">' + data.htmlSnippet + '</div>' +
        '<pre>' + esc(data.htmlSnippet) + '</pre>' +
        (data.caveats && data.caveats.length ? '<div class="caveats"><strong>Caveats</strong><ul>' + data.caveats.map(c => '<li>' + esc(c) + '</li>').join('') + '</ul></div>' : '') +
        '<p class="small" style="margin-top:12px">Generated in ' + data.meta.latencyMs + 'ms · ' + (data.remaining != null ? data.remaining + ' free left today' : '') + '</p>';
    } catch (err) {
      result.innerHTML = '<div class="err">Network error</div>';
    } finally {
      submit.disabled = false;
      status.textContent = '';
    }
  });
})();
</script>
`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: [
      { '@type': 'HowToStep', name: 'Pick your language', text: 'Choose the EU language for your user base.' },
      { '@type': 'HowToStep', name: 'Generate', text: 'Click Generate — we call an LLM with Article 50 clauses as context.' },
      { '@type': 'HowToStep', name: 'Paste into your app', text: 'Copy the HTML banner or user-facing text into your deployment.' },
    ],
  };

  return renderPage(
    { title, description, canonical: `${siteUrl}/templates/${slug}`, schemaJsonLd: schema },
    body
  );
}

export function renderTemplatesIndex(siteUrl: string): string {
  const links = allTemplateSlugs().map(slug => {
    const combo = findCombo(slug);
    if (!combo) return '';
    return `<li><a href="/templates/${slug}">${escapeHtml(combo.system.name)} for ${escapeHtml(combo.industry.name)}</a></li>`;
  }).join('');

  const body = `
<h1>Article 50 disclosure templates</h1>
<p class="lede">Pre-built templates for common AI deployments. Pick the one matching your system + industry, then generate.</p>
<div class="card">
  <ul style="column-count:2;column-gap:30px;padding-left:18px">${links}</ul>
</div>
<p class="small" style="margin-top:20px">Need a combination not listed? Use the <a href="/">full generator</a>.</p>
`;
  return renderPage(
    {
      title: 'Article 50 disclosure templates — AI Disclosure Kit',
      description: 'Pre-built EU AI Act Article 50 disclosure templates for common AI system + industry combinations. Free to generate.',
      canonical: siteUrl + '/templates',
    },
    body
  );
}

export function renderSitemap(siteUrl: string): string {
  const urls = [
    '/',
    '/pricing',
    '/templates',
    '/article-50',
    '/api',
    ...allTemplateSlugs().map(s => `/templates/${s}`),
  ];
  const now = new Date().toISOString();
  const items = urls.map(u => `<url><loc>${siteUrl}${u}</loc><lastmod>${now}</lastmod></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
}

export function renderRobots(siteUrl: string): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /success
Disallow: /cancel
Sitemap: ${siteUrl}/sitemap.xml
`;
}
