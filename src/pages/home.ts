import { renderPage } from './layout';

// Home page = landing + embedded tool. One page, one job.
// Tool state is all client-side; the form POSTs JSON to /api/generate.

function deadlineDaysLeft(): number {
  // Must compute per-request, not at module level. On Cloudflare Workers
  // the module's top-level `Date.now()` is evaluated during isolate cold-
  // init and can return 0 (epoch), producing a ~20,000-days "countdown".
  // Recomputing inside the render function pegs it to request time.
  const deadline = new Date('2026-08-02T00:00:00Z').getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)));
}

export function renderHome(siteUrl: string, freeDailyLimit: number): string {
  const daysLeft = deadlineDaysLeft();
  const body = `
<div class="deadline-banner">
  <strong>EU AI Act Article 50 is enforceable from 2 August 2026</strong> —
  ${daysLeft} days left. Fines up to €7.5M or 1.5% of global turnover.
</div>

<h1>AI Act compliance checker — generate Article 50 disclosures in seconds</h1>
<p class="lede">
  Article 50 enforcement starts Aug 2, 2026. Find out if your chatbot, deepfake
  tool, or AI system needs a disclosure — and get the exact text in seconds.
  Pick your AI system type, industry, and language. Get a compliant user-facing
  disclosure, a copy-paste HTML banner, and a compliance-file note — grounded in
  the exact Article 50 clauses. Free to try, no signup needed.
</p>

<div class="grid-2">
  <form id="gen-form" class="card">
    <h2 style="margin-top:0">AI Disclosure Generator</h2>

    <label for="f-system">AI system type *</label>
    <select id="f-system" name="systemType" required>
      <option value="chatbot">Chatbot / AI assistant (Art. 50(1))</option>
      <option value="text_generator">Text generator (Art. 50(2)/(4))</option>
      <option value="image_generator">Image generator (Art. 50(2))</option>
      <option value="video_generator">Video generator (Art. 50(2))</option>
      <option value="audio_generator">Audio generator (Art. 50(2))</option>
      <option value="deepfake">Deepfake (Art. 50(2)/(4))</option>
      <option value="emotion_recognition">Emotion recognition (Art. 50(3))</option>
      <option value="biometric_categorisation">Biometric categorisation (Art. 50(3))</option>
    </select>

    <label for="f-industry">Industry</label>
    <select id="f-industry" name="industry">
      <option value="general">General / SaaS</option>
      <option value="ecommerce">E-commerce / Retail</option>
      <option value="fintech">Fintech / Banking</option>
      <option value="healthcare">Healthcare</option>
      <option value="education">Education</option>
      <option value="hr_recruitment">HR / Recruitment</option>
      <option value="media">Media / Publishing</option>
      <option value="legal">Legal</option>
      <option value="travel">Travel / Hospitality</option>
      <option value="gov_public">Government / Public sector</option>
    </select>

    <label for="f-lang">Language</label>
    <select id="f-lang" name="language">
      <option value="en">English</option>
      <option value="pl">Polish</option>
      <option value="de">German</option>
      <option value="fr">French</option>
      <option value="es">Spanish</option>
      <option value="it">Italian</option>
      <option value="nl">Dutch</option>
      <option value="cs">Czech</option>
      <option value="sv">Swedish</option>
      <option value="pt">Portuguese</option>
    </select>

    <label for="f-product">Product name <span class="small">(optional)</span></label>
    <input id="f-product" name="productName" type="text" maxlength="80" placeholder="e.g., ShopBot Assistant">

    <label for="f-context">Deployment context <span class="small">(optional)</span></label>
    <textarea id="f-context" name="deploymentContext" maxlength="400" placeholder="e.g., customer support widget in the bottom-right corner of our website"></textarea>

    <div style="margin-top:16px">
      <button type="submit" class="btn" id="f-submit">Generate disclosure</button>
      <span id="f-status" class="small" style="margin-left:12px"></span>
    </div>

    <p class="small" style="margin-top:14px">
      Free: ${freeDailyLimit} generations per day. <a href="/pricing">Unlimited from €29/mo</a>.
    </p>
  </form>

  <div class="card result" id="result">
    <h3>How it works</h3>
    <ol>
      <li>Pick your AI system and language.</li>
      <li>We call an LLM with Article 50's exact text as context.</li>
      <li>You get ready-to-paste HTML + a compliance-file note.</li>
    </ol>
    <p class="small">
      Article 50 applies to chatbots, synthetic content generators, emotion/biometric
      systems, and deepfakes. Disclosure alone is not sufficient for synthetic content —
      you also need machine-readable marking (C2PA or watermarking). We flag this in the output.
    </p>
    <p class="small">
      <strong>This is not legal advice.</strong> Use this as a starting template; have
      counsel review before production deployment.
    </p>
  </div>
</div>

<h2>Why this tool exists</h2>
<div class="grid-2">
  <div class="card">
    <h3>Grounded in Article 50 text</h3>
    <p class="small">Every generation includes the exact Regulation (EU) 2024/1689 clauses that apply to your system type. No vague generic copy.</p>
  </div>
  <div class="card">
    <h3>10 EU languages, one click</h3>
    <p class="small">Generate disclosures in all major EU languages — essential for multi-market SaaS rollouts.</p>
  </div>
  <div class="card">
    <h3>Developer-first API (Pro)</h3>
    <p class="small">Integrate disclosure generation into your CI/CD, deploy pipelines, or customer onboarding flows. Curl-ready.</p>
  </div>
  <div class="card">
    <h3>Industry-specific context</h3>
    <p class="small">One-size-fits-all templates fail audits. Every generation adapts to your industry (e-commerce, healthcare, fintech, HR, legal, etc.) with the right tone, audience framing, and regulatory nuance — plus an audit-file note you can drop into your compliance binder.</p>
  </div>
</div>

<h2>Who needs Article 50 compliance?</h2>
<p class="small">
  Any company with EU users running a chatbot, AI-generated content feature, deepfake/synthetic media tool,
  or emotion/biometric recognition system. A Center for Data Innovation survey (late 2025) found
  <strong>fewer than 30% of European SMEs have taken steps toward compliance</strong>. The deadline is 2 August 2026.
</p>

<script>
(() => {
  const form = document.getElementById('gen-form');
  const submit = document.getElementById('f-submit');
  const status = document.getElementById('f-status');
  const result = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submit.disabled = true;
    status.innerHTML = '<span class="loader"></span>Generating (5-10s)…';

    const fd = new FormData(form);
    const payload = {
      systemType: fd.get('systemType'),
      industry: fd.get('industry'),
      language: fd.get('language'),
      productName: fd.get('productName') || undefined,
      deploymentContext: fd.get('deploymentContext') || undefined,
    };

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        renderError(data.error || 'Generation failed', data.upsell);
        return;
      }
      renderResult(data);
    } catch (err) {
      renderError('Network error: ' + (err.message || err));
    } finally {
      submit.disabled = false;
      status.textContent = '';
    }
  });

  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }

  function renderError(msg, upsell) {
    result.innerHTML = '<div class="err">' + esc(msg) + '</div>'
      + (upsell ? '<p style="margin-top:14px"><a class="btn" href="/pricing">Upgrade for unlimited generations →</a></p>' : '');
  }

  function renderResult(r) {
    const preview = '<div class="result-preview">' + r.htmlSnippet + '</div>';
    const captureBlock =
      '<div class="capture-card" id="capture-card" style="margin-top:18px;padding:16px;border-top:1px solid #e7e5e4">' +
        '<h4 style="margin:0 0 6px">Want 5 more disclosure templates + a PDF compliance file?</h4>' +
        '<p class="small" style="margin:0 0 12px">We&#39;ll email them. No spam, unsubscribe anytime.</p>' +
        '<form id="capture-form" novalidate>' +
          '<input type="email" id="capture-email" name="email" required placeholder="you@company.com" autocomplete="email" maxlength="254" style="width:100%;max-width:360px">' +
          '<label style="display:block;margin-top:10px">' +
            '<input type="checkbox" id="capture-consent" required> ' +
            '<span class="small">I consent to PLAR Sp. z o.o. processing my email to send the templates and occasional AI Act updates. See <a href="/privacy">privacy policy</a>.</span>' +
          '</label>' +
          '<div style="margin-top:12px">' +
            '<button type="submit" class="btn" id="capture-submit" disabled style="opacity:0.6;cursor:not-allowed">Send me the templates</button>' +
            '<span id="capture-status" class="small" style="margin-left:12px"></span>' +
          '</div>' +
          '<div id="capture-error" class="err" style="display:none;margin-top:10px"></div>' +
        '</form>' +
      '</div>';
    const html =
      '<h3>Your Article 50 disclosure</h3>' +
      '<h4 style="margin:10px 0 4px">User-facing text</h4>' +
      '<p>' + esc(r.userFacingText) + '</p>' +

      '<h4 style="margin:14px 0 4px">Short label</h4>' +
      '<p class="small">' + esc(r.shortLabel) + '</p>' +

      '<h4 style="margin:14px 0 4px">Suggested placement</h4>' +
      '<p class="small">' + esc(r.placement) + '</p>' +

      '<h4 style="margin:14px 0 4px">Copy-paste HTML banner</h4>' +
      preview +
      '<div class="copy-row">' +
        '<button class="btn secondary" data-copy="html">Copy HTML</button>' +
        '<span class="small" id="copy-ok-html"></span>' +
      '</div>' +
      '<pre id="html-src">' + esc(r.htmlSnippet) + '</pre>' +

      '<h4 style="margin:14px 0 4px">Applicable clauses</h4>' +
      '<ul class="clauses">' + r.applicableClauses.map(c => '<li>Article ' + esc(c) + '</li>').join('') + '</ul>' +

      '<h4 style="margin:14px 0 4px">Compliance-file note</h4>' +
      '<p class="small">' + esc(r.docNote) + '</p>' +

      (r.caveats && r.caveats.length
        ? '<div class="caveats"><strong>Caveats</strong><ul>' +
          r.caveats.map(c => '<li>' + esc(c) + '</li>').join('') +
          '</ul></div>'
        : '') +

      captureBlock +

      '<p class="small" style="margin-top:16px;color:#57534e">Generated with ' + esc(r.meta.model) +
      ' in ' + r.meta.latencyMs + 'ms · ' + (r.remaining != null ? r.remaining + ' free generations left today' : '') + '</p>';

    result.innerHTML = html;

    result.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const src = document.getElementById('html-src');
        if (!src) return;
        try {
          await navigator.clipboard.writeText(src.textContent);
          document.getElementById('copy-ok-html').textContent = 'Copied ✓';
          setTimeout(() => { document.getElementById('copy-ok-html').textContent = ''; }, 2000);
        } catch { /* noop */ }
      });
    });

    bindCapture();
  }

  function bindCapture() {
    const cf = document.getElementById('capture-form');
    if (!cf) return;
    const cs = document.getElementById('capture-submit');
    const cc = document.getElementById('capture-consent');
    const ce = document.getElementById('capture-email');
    const stat = document.getElementById('capture-status');
    const errBox = document.getElementById('capture-error');

    function updateDisabled() {
      const disabled = !cc.checked;
      cs.disabled = disabled;
      cs.style.opacity = disabled ? '0.6' : '1';
      cs.style.cursor = disabled ? 'not-allowed' : 'pointer';
    }
    cc.addEventListener('change', updateDisabled);

    cf.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!cc.checked) return;
      errBox.style.display = 'none';
      cs.disabled = true;
      stat.innerHTML = '<span class="loader"></span>Sending…';

      const payload = { email: ce.value.trim(), consent: cc.checked, source: 'home_post_gen' };

      let timedOut = false;
      const ctrl = new AbortController();
      const t = setTimeout(() => { timedOut = true; ctrl.abort(); }, 10000);

      try {
        const res = await fetch('/api/capture-email', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });
        clearTimeout(t);
        const data = await res.json().catch(() => ({}));

        if (res.status === 429) {
          showErr('Too many attempts. Please wait a few minutes.');
          setTimeout(() => { cs.disabled = false; updateDisabled(); }, 60000);
          return;
        }
        if (res.status === 400) {
          showErr("That doesn't look like a valid email. Double-check?");
          cs.disabled = false; updateDisabled();
          return;
        }
        if (res.status >= 500) {
          showErr("Something broke on our end. We're notified — try again in a moment.");
          cs.disabled = false; updateDisabled();
          return;
        }
        if (!res.ok || !data.ok) {
          showErr("Couldn't send right now. Check your connection and try again.");
          cs.disabled = false; updateDisabled();
          return;
        }
        showSuccess(ce.value);
      } catch (err) {
        showErr(timedOut
          ? "Took too long. Check your connection and try again."
          : "Couldn't send right now. Check your connection and try again.");
        cs.disabled = false; updateDisabled();
      } finally {
        stat.textContent = '';
      }
    });

    function showErr(msg) { errBox.textContent = msg; errBox.style.display = 'block'; }
    function showSuccess(email) {
      const at = email.indexOf('@');
      const masked = at >= 2 ? email.slice(0, 2) + '***' + email.slice(at) : '***' + email.slice(at);
      document.getElementById('capture-card').innerHTML =
        '<h4 style="margin:0 0 6px">Got it ✓</h4>' +
        '<p class="small">You&#39;re on the list — we&#39;ll send templates to ' + esc(masked) + ' manually this week. Expect an email from your-business@example.com within 2-3 days.</p>' +
        '<p class="small" style="color:#57534e;margin-top:6px">(We&#39;re a 2-person team launching this, thanks for your patience.)</p>';
    }
  }
})();
</script>
`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Disclosure Kit',
    applicationCategory: 'BusinessApplication',
    description:
      'Check EU AI Act Article 50 compliance and generate compliant disclosures for chatbots, generative AI content, deepfakes, and biometric systems. Free to try.',
    url: siteUrl,
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'EUR',
      description: 'Pro plan: unlimited disclosure generations, API access, multi-language, PDF compliance file export.',
    },
    keywords: 'EU AI Act, Article 50, AI disclosure, chatbot disclosure, AI transparency, compliance',
  };

  return renderPage(
    {
      title: 'AI Act Compliance Checker — Article 50 Disclosures in Seconds',
      description:
        'Check your EU AI Act Article 50 compliance and generate disclosures in seconds. Free trial, no signup. 10 EU languages. Deadline 2 August 2026.',
      canonical: siteUrl + '/',
      schemaJsonLd: schema,
    },
    body
  );
}
