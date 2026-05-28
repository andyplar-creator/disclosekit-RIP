import { renderPage } from './layout';

export function renderPricing(siteUrl: string): string {
  const body = `
<h1>Pricing</h1>
<p class="lede">Start free. Upgrade when you need unlimited generations, the API, or a signed compliance file.</p>

<div class="pricing">
  <div class="price-card">
    <h3>Free</h3>
    <div class="amt">€0</div>
    <p class="small">Per month</p>
    <ul>
      <li>3 generations per day</li>
      <li>8 system types</li>
      <li>10 EU languages</li>
      <li>HTML snippet + disclosure text</li>
      <li>Article 50 clause citations</li>
    </ul>
    <a class="btn secondary" href="/">Try it now →</a>
  </div>

  <div class="price-card featured">
    <h3>Pro <span class="badge">Most popular</span></h3>
    <div class="amt">€29<span style="font-size:16px;color:#57534e">/mo</span></div>
    <p class="small">For teams shipping AI features to EU users</p>
    <ul>
      <li><strong>Unlimited generations</strong></li>
      <li>REST API with 1,000 calls/mo included</li>
      <li>Signed compliance-file PDF export</li>
      <li>C2PA + SynthID watermarking guide</li>
      <li>Code of Practice update notifications</li>
      <li>Email support (48h SLA)</li>
    </ul>
    <form method="POST" action="/checkout">
      <input type="hidden" name="plan" value="pro">
      <label for="email-pro" style="margin-top:4px">Email for receipt</label>
      <input type="email" id="email-pro" name="email" required placeholder="you@company.com">
      <button type="submit" class="btn" style="margin-top:12px;width:100%">Start Pro →</button>
    </form>
    <p class="small" style="margin-top:10px">Cancel anytime. Secure checkout by Stripe.</p>
  </div>

  <div class="price-card">
    <h3>Team</h3>
    <div class="amt">€99<span style="font-size:16px;color:#57534e">/mo</span></div>
    <p class="small">For agencies & multi-product SaaS</p>
    <ul>
      <li>Everything in Pro</li>
      <li>10,000 API calls/mo</li>
      <li>5 seats</li>
      <li>Webhook notifications (AI Act updates)</li>
      <li>Bulk CSV disclosure generator</li>
      <li>Priority support (24h SLA)</li>
    </ul>
    <form method="POST" action="/checkout">
      <input type="hidden" name="plan" value="team">
      <label for="email-team" style="margin-top:4px">Email for receipt</label>
      <input type="email" id="email-team" name="email" required placeholder="you@company.com">
      <button type="submit" class="btn" style="margin-top:12px;width:100%">Start Team →</button>
    </form>
  </div>
</div>

<h2>FAQ</h2>

<h3>Is this legal advice?</h3>
<p class="small">No. AI Disclosure Kit generates compliance <em>starting templates</em> grounded in the exact Article 50 text. Have qualified counsel review before production deployment.</p>

<h3>What about machine-readable marking (C2PA, watermarking)?</h3>
<p class="small">For synthetic content (Art. 50(2)/(4)), Article 50 <em>also</em> requires machine-readable marking in addition to user-facing disclosure. We flag this in every relevant generation and link to implementation guides for C2PA and SynthID. We do not embed watermarks for you — that's a separate technical integration in your media pipeline.</p>

<h3>Can I cancel anytime?</h3>
<p class="small">Yes. Stripe Customer Portal (self-serve) handles cancellation, plan changes, and invoices. No retention calls, no exit surveys.</p>

<h3>What AI model do you use?</h3>
<p class="small">A fast, low-cost modern LLM — currently OpenAI's <code>gpt-4o-mini</code>. We may rotate providers for cost or quality reasons; the Article 50 clauses are injected into every prompt so output stays grounded in the exact Regulation text regardless of which model is active.</p>

<h3>GDPR?</h3>
<p class="small">We store your email (for billing) and generation counts (for rate limiting). We do not sell data. Free-tier usage is tracked by hashed IP+date for 48h max. See <a href="/privacy">privacy policy</a>.</p>
`;

  return renderPage(
    {
      title: 'Pricing — AI Disclosure Kit',
      description: 'Free plan with 3 generations/day. Pro at €29/mo for unlimited + API. Team at €99/mo for agencies. Cancel anytime.',
      canonical: siteUrl + '/pricing',
    },
    body
  );
}

export function renderCheckoutSuccess(siteUrl: string): string {
  const body = `
<h1>You're in 🎉</h1>
<p class="lede">Thanks for subscribing. Your receipt is on its way. Within the next minute you'll receive your API key by email.</p>
<div class="card">
  <h3>Next steps</h3>
  <ol>
    <li>Check your inbox for the welcome email with your API key.</li>
    <li><a href="/">Generate unlimited disclosures</a> — your daily cap is lifted.</li>
    <li><a href="/api">Read the API docs</a> if you want to integrate into your deploy pipeline.</li>
  </ol>
</div>
<p class="small" style="margin-top:14px">Need to change plan or cancel? Stripe emails you a secure management link after every invoice — open it to access your subscription portal. Lost it? Reply to any Stripe email to request a new one.</p>
`;
  return renderPage(
    {
      title: 'Welcome — AI Disclosure Kit',
      description: 'Your AI Disclosure Kit subscription is active.',
      canonical: siteUrl + '/success',
      noindex: true,
    },
    body
  );
}

export function renderCheckoutCancel(siteUrl: string): string {
  const body = `
<h1>Checkout cancelled</h1>
<p class="lede">No charge was made. You can still use the free tier (3 generations per day) or <a href="/pricing">come back when you're ready</a>.</p>
<p><a class="btn" href="/">← Back to the generator</a></p>
`;
  return renderPage(
    {
      title: 'Checkout cancelled — AI Disclosure Kit',
      description: 'Checkout was cancelled.',
      canonical: siteUrl + '/cancel',
      noindex: true,
    },
    body
  );
}

export function renderApiDocs(siteUrl: string): string {
  const body = `
<h1>REST API <span class="badge">Pro & Team</span></h1>
<p class="lede">Generate Article 50 disclosures programmatically — integrate into CI/CD, onboarding flows, or customer-facing dashboards.</p>

<h2>Authentication</h2>
<p>All requests require a bearer token in the <code>Authorization</code> header. You'll receive your API key by email after subscribing.</p>
<pre>Authorization: Bearer adk_...</pre>

<h2>POST /api/v1/disclosure</h2>
<p>Generate a disclosure for a given AI system.</p>
<h3>Request</h3>
<pre>curl -X POST ${siteUrl}/api/v1/disclosure \\
  -H "Authorization: Bearer adk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "systemType": "chatbot",
    "industry": "ecommerce",
    "language": "de",
    "productName": "ShopBot Assistant",
    "deploymentContext": "support widget, bottom-right corner"
  }'</pre>

<h3>Response</h3>
<pre>{
  "systemType": "chatbot",
  "language": "de",
  "userFacingText": "Sie chatten mit einem KI-Assistenten…",
  "shortLabel": "KI-Assistent",
  "placement": "Persistent im Chat-Header.",
  "applicableClauses": ["50(1)"],
  "htmlSnippet": "<div role='status' …>…</div>",
  "docNote": "…",
  "caveats": ["…"],
  "meta": {
    "model": "claude-haiku-4-5-20250929",
    "tokensIn": 412, "tokensOut": 287,
    "latencyMs": 1840
  }
}</pre>

<h2>Rate limits</h2>
<ul>
  <li><strong>Pro:</strong> 1,000 calls/mo, 60 rpm</li>
  <li><strong>Team:</strong> 10,000 calls/mo, 120 rpm</li>
</ul>

<h2>Error codes</h2>
<ul>
  <li><code>401</code> — Invalid or missing API key</li>
  <li><code>402</code> — Subscription past due</li>
  <li><code>429</code> — Rate limit exceeded</li>
  <li><code>400</code> — Invalid request body</li>
  <li><code>500</code> — Model error (retry with backoff)</li>
</ul>
`;
  return renderPage(
    {
      title: 'API Docs — AI Disclosure Kit',
      description: 'REST API for generating EU AI Act Article 50 disclosures programmatically. Bearer auth, JSON in/out.',
      canonical: siteUrl + '/api',
    },
    body
  );
}

export function renderArticle50Page(siteUrl: string): string {
  const body = `
<h1>EU AI Act Article 50 — what you actually need to do</h1>
<p class="lede">Article 50 of Regulation (EU) 2024/1689 imposes transparency obligations on four categories of AI systems. It's enforceable from 2 August 2026. Here's the practical summary for builders.</p>

<h2>The four categories</h2>

<h3>50(1) — Chatbots and AI assistants interacting with humans</h3>
<p class="small">If your system talks to people (chatbot, voice assistant, AI agent), users must be told they're interacting with an AI — unless it's obvious. "Obvious" is a narrow exception; default to disclosure.</p>

<h3>50(2) — Synthetic content generators</h3>
<p class="small">If your AI produces synthetic audio, image, video, or text, outputs must be marked in a <strong>machine-readable format</strong> (e.g., C2PA metadata, SynthID watermark). A visible disclosure alone is not sufficient — watermarking is required.</p>

<h3>50(3) — Emotion recognition & biometric categorisation</h3>
<p class="small">If you deploy systems that recognise emotions or categorise people biometrically, affected individuals must be informed AND you must have a valid GDPR processing ground. This is often more legally complex than the disclosure itself.</p>

<h3>50(4) — Deepfakes & AI-generated public-interest text</h3>
<p class="small">Deepfake content must be disclosed as artificially generated. AI-generated text published "to inform the public on matters of public interest" must also be disclosed (narrow scope — journalism, public health, government).</p>

<h2>Penalties</h2>
<p class="small">Article 50 violations: up to <strong>€7.5 million or 1.5% of global annual turnover</strong> (whichever is higher). SMEs get the lower of the two. Enforcement begins 2 August 2026.</p>

<h2>Common misconceptions</h2>
<ul class="clauses">
  <li>"A terms-of-service mention is enough." No — disclosure must be clear, conspicuous, timely, accessible. Burying it in ToS fails the bar.</li>
  <li>"Watermarking isn't required if we show a label." Wrong for synthetic content under 50(2) and 50(4) — machine-readable marking is mandatory.</li>
  <li>"We're a US company, this doesn't apply." It applies to anyone whose AI output reaches EU users.</li>
  <li>"We don't need compliance until 2026." Preparation time is now. Over 70% of EU SMEs have done nothing (Center for Data Innovation, late 2025).</li>
</ul>

<h2>Tools & next steps</h2>
<p><a class="btn" href="/">Generate a disclosure →</a> &nbsp; <a class="btn secondary" href="/pricing">See pricing</a></p>

<p class="small" style="margin-top:30px">Sources: Regulation (EU) 2024/1689 Article 50; European Commission Code of Practice on Transparency (draft, November 2025 → final June 2026); Center for Data Innovation SME compliance survey (late 2025).</p>
`;
  return renderPage(
    {
      title: 'EU AI Act Article 50 explained — AI Disclosure Kit',
      description: 'Practical summary of EU AI Act Article 50 transparency obligations for chatbots, synthetic content, deepfakes, and biometric systems. Enforceable 2 August 2026.',
      canonical: siteUrl + '/article-50',
    },
    body
  );
}
