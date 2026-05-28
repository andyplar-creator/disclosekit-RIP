import { renderPage } from './layout';

export function renderPrivacy(siteUrl: string): string {
  const body = `
<h1>Privacy policy</h1>
<p class="small">Last updated: April 2026</p>

<h2>What we collect</h2>
<ul>
  <li><strong>Email</strong> — when you subscribe, for billing, receipts, and product updates.</li>
  <li><strong>Generation inputs</strong> — system type, industry, product name, context text. We log these for quality monitoring and AI-spend tracking.</li>
  <li><strong>Generation counts</strong> — for free-tier rate limiting, stored as SHA-256(IP + date) for up to 48 hours.</li>
  <li><strong>Subscription data</strong> — Stripe customer ID, subscription status.</li>
</ul>

<h2>What we don't do</h2>
<ul>
  <li>We don't sell data.</li>
  <li>We don't use your inputs to train models.</li>
  <li>We don't store raw IP addresses.</li>
</ul>

<h2>Processors</h2>
<ul>
  <li>Cloudflare (hosting, DDoS protection)</li>
  <li>Anthropic (LLM for disclosure generation)</li>
  <li>Stripe (billing)</li>
  <li>Resend or similar (transactional email)</li>
</ul>

<h2>Your rights (GDPR)</h2>
<p>You can request access, correction, or deletion of your data by emailing us. Subscription data is retained while your subscription is active plus 7 years for tax records.</p>

<h2>Contact</h2>
<p>Email: <a href="mailto:your-business@example.com">your-business@example.com</a></p>
`;
  return renderPage(
    { title: 'Privacy — AI Disclosure Kit', description: 'Privacy policy.', canonical: siteUrl + '/privacy' },
    body
  );
}

export function renderTerms(siteUrl: string): string {
  const body = `
<h1>Terms of service</h1>
<p class="small">Last updated: April 2026</p>

<h2>What this service is</h2>
<p>AI Disclosure Kit generates compliance starting-templates for EU AI Act Article 50. Output is AI-generated and is <strong>not legal advice</strong>. Use at your own discretion; have qualified counsel review before production.</p>

<h2>Acceptable use</h2>
<p>Don't use the service for illegal purposes, to evade regulatory obligations, or to scrape/abuse at scale beyond your plan's quota.</p>

<h2>Subscriptions & refunds</h2>
<p>Monthly subscriptions billed via Stripe. Stripe emails a secure self-service portal link after every invoice; use it to change plan or cancel any time. Refunds at our discretion for billing errors.</p>

<h2>Liability</h2>
<p>Service provided as-is, no warranty. Our maximum liability is capped at fees paid in the prior 12 months. We are not liable for regulatory fines resulting from reliance on generated output — the user remains the legally responsible party.</p>

<h2>Contact</h2>
<p>Email: <a href="mailto:your-business@example.com">your-business@example.com</a></p>
`;
  return renderPage(
    { title: 'Terms — AI Disclosure Kit', description: 'Terms of service.', canonical: siteUrl + '/terms' },
    body
  );
}
