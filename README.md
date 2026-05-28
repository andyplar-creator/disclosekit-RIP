# disclosekit — RIP (April 17 – May 15, 2026)

A bootstrap SaaS that died 28 days after it was built. Here's the autopsy.

## TL;DR

| | |
|---|---|
| Money in | €110 (€10 domain + €100 Google Ads) |
| Money out | €0 |
| Paying customers | 0 |
| Email captures | 0 |
| Stripe checkout sessions started | 0 |
| Organic visits over 30 days | 1 (one) |
| Tool generations (mostly the founder testing) | 17 |
| Lessons learned the expensive way | 14 misses + 4 rules |

A €29/mo SaaS for EU AI Act Article 50 compliance. Free tier "3 generations per day". Turns out
that's wrong on multiple fronts — subscription pricing for a one-time use case, free tier sized
to cover the entire lifetime job-to-be-done, niche selected without checking whether buyers
actually search for tools like this. The data made the verdict unambiguous.

This repo is the post-mortem. Code, decisions log, lessons. If you're about to build an AI
compliance SaaS for a regulated niche with an upcoming deadline — read this first. Save yourself
30 days and €110.

📺 YouTube walkthrough: *(coming soon — link here once recorded)*

## What this is

A raw, unedited case study of a bootstrap SaaS attempt that failed on the business side despite
shipping cleanly on the technical side. The infrastructure works. The site is still live (free
tier, €0/month). The conversion funnel was built end-to-end and validated with manual tests. The
product even kind of solves a real regulatory problem. But the business model was wrong from
day one, and 28 days of effort plus €110 of paid traffic produced exactly zero paying customers.

The repo contains the full source code plus the lessons log (`LESSONS.md`) — every mistake from
the 28 days categorized with root causes and forward fixes. The internal planning docs (strategic
brief, decisions log, marketing drafts, daily action packs, directory-pitch triage) are **kept
private**, because they contain the contact details of third parties — directory maintainers,
inbound sales reps, and others — whose information isn't mine to publish. The lessons that came
out of those docs are all here; the third-party PII is not.

The point isn't to be inspiring. The point is to be useful — specifically, useful to the next
person about to make the same mistakes. There are at least four mistakes here significant enough
that a 30-minute read of `LESSONS.md` before starting your own project would have a positive ROI.

## Timeline (the short version)

- **April 17, 2026** — Thesis selected (EU AI Act Article 50 compliance, fines up to €7.5M,
  enforcement deadline August 2, 2026). Architecture decided (Cloudflare Workers + D1 + Stripe
  + OpenAI). Pricing decided (Free / €29/mo Pro / €99/mo Team). Code begins.
- **April 18** — MVP live. Stripe LIVE mode active. First test transactions refunded.
- **April 24** — Product Hunt launch. 1 self-upvote, 0 external engagement, 0 paid signups
  across 13 hours of being live. The "permanent SEO backlink from PH" thesis was on its way to
  being empirically tested.
- **April 25 – May 6** — Distribution work: 3 GitHub PRs to "awesome-*" lists submitted, dev.to
  article published, Indie Hackers product page, Reddit account registered, Hacker News account
  created and then promptly shadow-banned (50% of comments flagged), aiacttools.com
  submission #1.
- **May 7** — First Google Ads campaign live. €100 budget, 7-day burn, search-only, 5
  phrase-match keywords across 7 EU countries.
- **May 11 evening** — Hero copy pivot. Search-term report revealed buyers were typing "AI Act
  compliance checker" not "AI disclosure generator". Landing copy switched from "Generate"
  framing to "Compliance checker" framing.
- **May 12** — Critical discovery: the email-capture endpoint that the M4 success criteria
  depended on had never been implemented. Table existed in the database, helper function existed
  in code, but no callers, no form, no captures possible since LIVE MODE (24 days earlier).
  Spent the day shipping the capture flow end-to-end.
- **May 12** — aiacttools.com submission #2 (Day 21 of the original submission silently never
  listed).
- **May 14 afternoon** — M4 verdict pulled a day early because the Stripe data point was
  unambiguous: zero checkout sessions started during the entire campaign. 2/4 PASS, threshold
  3/4. NO-GO.
- **May 15 morning** — KILL declared. Three new pieces of evidence — user testimony on the
  job-to-be-done, total organic traffic of 1 visit over 30 days, and aiacttools ghosting the
  re-submission too — flipped the decision from "hold and harvest" to "no further investment".
- **May 21** — Plot twist: the largest directory the project had submitted to
  (`EthicalML/awesome-artificial-intelligence-regulation`, 1,438 stars) merged the listing
  **6 days after the project was declared dead**. Sometimes distribution wins arrive after the
  funeral.
- **May 28** — 7 days post-merge. Still zero organic traffic. The merge confirmed that even a
  major distribution win doesn't reanimate a project where the business model is wrong.

## What went wrong (the headline version)

**Root cause: business model mismatch with usage pattern.** Subscription pricing (€29/mo) was
applied to a one-time job-to-be-done. The target buyer (SME compliance officer) needs roughly
3-5 disclosures over the entire lifetime of their company, not 3-5 per month. The free tier
of 3/day fully covered that lifetime need, which made the paid tier obsolete from day one.
Even with zero free tier, the same buyer wouldn't subscribe at €29/mo for something they'll
use 3 times in their life — they'd pay €10-15 one-time or use ChatGPT.

**Compounding cause: niche with no organic search demand.** The buying-intent keywords
("AI disclosure generator", "Article 50 disclosure tool") have structurally near-zero search
volume — Google explicitly flagged them as "low search volume" and refused to serve them. The
keywords that *did* get traffic ("AI Act transparency obligations", "EU AI Act Article 50") were
research-intent queries from people trying to *understand* the regulation, not buy a tool for it.
The thesis "regulatory deadline will create purchase intent spike" was empirically falsified by
30 days of distribution work producing 1 organic visit.

**Compounding cause: build-before-validate.** Four weeks of code shipped before a single
willingness-to-pay test was run, and before any conversation with a real SME compliance officer
about how they'd actually buy a tool like this. A €0 landing page with a Stripe "join waitlist"
button and a €100 Ads burst would have produced a clean signal in one evening of work — at the
beginning, not at the end.

## The hard data

EN Google Ads campaign, 7-14 May 2026, EN broadcast across 7 EU countries:

| Metric | Total 7-14 May |
|---|---|
| Spend | 377.41 PLN / 400 PLN budget (94.4%) |
| Impressions | 1,271 |
| Clicks | 28 |
| Avg CTR | 2.20% |
| Avg CPC | 13.48 PLN (~€3.15) |
| Organic tool generations | 4 |
| Email captures | **0** |
| Stripe sessions started | **0** |
| Paying customers | **0** |

Click-to-gen conversion (14%) was actually normal for SaaS landing pages. The funnel wasn't
fundamentally broken at the UX level. The failure was upstream: the people clicking weren't
buyers, and even the ones who reached the tool didn't need an account to extract full value
from it.

## The lessons (one paragraph, then a link to the full version)

Four hard rules survived this project, each one earned by a different mistake.

- **R1** — Validate willingness-to-pay before writing feature code. A landing page + Stripe
  "join waitlist" + €100 Ads is one evening of work.
- **R2** — Match the pricing model to the buyer's usage pattern. Never default to SaaS
  subscription. One-time need takes one-time fee.
- **R3** — Free tier calibrated as a demo, never as full use-case coverage. If free covers 90%
  of the realistic lifetime job-to-be-done, the paid tier has no trigger.
- **R4** — Validate pre-existence of search demand before BRIEF.md exists. If top buying-intent
  keywords have under 100 monthly searches and the top-10 organic results are all educational
  content (not transactional), the niche is pre-commerce and no R1-R3 sequence will save the
  project.

Full breakdown of all 14 misses with root causes and forward fixes: [LESSONS.md](LESSONS.md).

## What's still live

The site stays up because the marginal cost is zero (Cloudflare Workers free tier handles
disclosekit.com at well under 1% of free-tier quota). The domain renewal costs €10/year and is
worth it as cheap optionality if the niche ever wakes up. Stripe LIVE mode is preserved (zero
ongoing cost in the absence of transactions). The capture flow works end-to-end, so if someone
ever organically wanders in and leaves an email, there's a notification path for the founder to
hand-deliver the templates.

But there is no further investment of time or money. No more paid acquisition. No more code
changes beyond critical security hotfixes. The project is in maintenance mode for the duration
of the Article 50 enforcement deadline (August 2, 2026) and will be left to sunset quietly after.

## Repo navigation

This public repo contains the code and the lessons. Code was further redacted for identifying
information (founder email → `your-business@example.com`, Cloudflare account / D1 / KV IDs and
Google Ads campaign IDs → `REPLACE_WITH_YOUR_*` placeholders).

| File / dir | What it is |
|---|---|
| [`LESSONS.md`](LESSONS.md) | Append-only lessons log — 14 misses categorized with root causes and forward fixes, plus the R1-R4 hard rules for the next project. **This is the most valuable file in the repo.** |
| `src/` | Cloudflare Worker code — `worker.ts` (router + handlers), `lib/*` (LLM, ratelimit, db, stripe), `pages/*` (HTML rendering), `prompts/` (Article 50 clause text) |
| `migrations/` | D1 schema migrations (4 of them, all applied) |
| `public/` | Static assets (PH gallery HTML) |
| `wrangler.jsonc` | Cloudflare Workers config (D1/KV/env vars — placeholders for IDs) |
| `.dev.vars.example` | Local dev secrets template |
| `package.json` / `tsconfig.json` | Standard Node/TypeScript project files |

**Not in this repo (kept private):** the strategic brief, the full decisions log, marketing copy
drafts, daily action packs, directory-pitch triage, and the AI-agent project-context file. These
were excluded because they contain third-party contact details (directory maintainers, inbound
sales reps) that aren't mine to publish. Everything teachable from them is distilled into
`LESSONS.md` and this README.

## If you want to fork this

The technical infrastructure is reusable for any Cloudflare Workers + D1 + Stripe + LLM SaaS.
The business model is not. If tempted to fork and "try again with a different niche": read
`LESSONS.md` first, specifically rules R1 and R4. The original mistake was building before
validating. Don't repeat it on a fork.

Standard setup:

1. Clone, `npm install`
2. Replace placeholders in `wrangler.jsonc` (search for `REPLACE_WITH_YOUR_*`) — create your own
   D1 database and KV namespace via `wrangler d1 create` / `wrangler kv namespace create`
3. Copy `.dev.vars.example` → `.dev.vars` and fill in real keys (OpenAI, Stripe). DO NOT commit.
4. `wrangler secret put` each secret for production
5. Replace `your-business@example.com` in `src/pages/legal.ts`, `src/pages/home.ts`, and the
   `SITE_URL` in `wrangler.jsonc`
6. `npx wrangler d1 migrations apply <db-name> --remote` to apply schema
7. `npm run deploy` to ship

Common commands: `npm run dev` (local on :8787), `npx tsc --noEmit` (type-check), `npx wrangler
deploy --dry-run` (bundle-size + binding sanity), `npx wrangler tail` (live logs). Required
secrets via `wrangler secret put`: `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
(plus `ANTHROPIC_API_KEY` only if you flip `LLM_PROVIDER=anthropic`).

## A note on the writing

This README, the code, and the lessons log were written collaboratively with an AI coding agent
(Claude Code) over the 28 days of the project. That collaboration produced its own lesson, now
formalized as Miss #14 in `LESSONS.md`: AI-assisted development **reduces typing cost but does
not reduce thinking or steering cost**. The human cooperator still has to verify, redirect, push
back, and own the strategic decisions. The AI is excellent at writing the code once you know what
code to write. Knowing what code to write — and whether to write any code at all — is still on you.

That lesson is worth carrying forward more than any of the technical specifics in this repo.

## License

MIT. Take what's useful, leave the business-model mistakes behind.

---

*Built with [Claude Code](https://claude.com/claude-code) over 28 days. Killed by data.
Repurposed as a case study because failed projects are more useful to share than successful ones.*
