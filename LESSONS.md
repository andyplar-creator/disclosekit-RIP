# 📒 Lessons Log — disclosekit + future projects

Append-only log of mistakes I (Claude) made with this project, captured for application to Project #2+.
Format: `[YYYY-MM-DD] miss → root cause → fix for next time`.

This file is read at the **start of every new project** as part of the pre-mortem checklist.

---

## 2026-04-30 — Reflection after Day 6 of disclosekit launch

### MISS #1 — never asked about user's distribution surface
**What happened:** On Apr 17 (Day 1 of pivoting to AI Act thesis) I jumped into product/legal/architecture without 5 minutes of mapping the user's existing distribution surface. I assumed "they have something" — they had near-zero (no Twitter, no LinkedIn, no Slack/Discord communities, no HN/Reddit karma).

**Root cause:** My instinct was to optimize what I could control (code, prompts, Stripe). Distribution is the user's domain, so I outsourced the diagnosis. Wrong call — the distribution surface IS the constraint that determines whether ANY product launch can succeed in the planned timeline.

**Fix for next time:**
- **Day 0 of any project**: explicit 30-minute conversation mapping every channel. Template:
  - Twitter/X: handle, follower count, last post, engagement rate
  - LinkedIn: profile filled out? size of network? recent activity?
  - Newsletter list / Substack / blog?
  - Slack/Discord communities you're in (regular member, not spectator)?
  - HN/Reddit account ages + karma?
  - Existing customers / past projects you can mention?
  - Friends in tech you can ask for organic share?
- **Output**: a "distribution surface report" that becomes the gate for timeline. Empty surface = launch is 8-12 weeks of warmup before any "launch event" makes sense.

### MISS #2 — interpreted "no outbound" too narrowly
**What happened:** User said "no outbound sales" → I interpreted as "no cold email/DM/calls". I planned PH + HN + SEO as the only channels. That logic only works IF the founder has existing organic surface to amplify the launch. They didn't.

**Root cause:** Constraint analysis without surface analysis. "No outbound" is a CONSTRAINT, but the binding consequence depends on what surface exists. With zero surface + no outbound = SEO-only = 6-month payoff curve.

**Fix for next time:**
- After mapping surface (Miss #1 fix), explicitly state the consequence: *"With your current surface and no-outbound constraint, the realistic first-revenue timeline is X months, not Y weeks. We can either (a) extend timeline, (b) relax 'no outbound' to allow founder-led organic content, (c) change product positioning to one with deadline-driven urgency that overrides distribution gap."*
- Frame it as a **decision the user owns**, not a recommendation I make alone.

### MISS #3 — pushed PH launch with insufficient warmup
**What happened:** User had ~7 days between thesis pivot (Apr 17) and PH launch (Apr 24). In that time I had user build product + Stripe + legal + PH gallery + directory submissions. Zero time was allocated to warming up HN/dev.to/Reddit accounts that would be needed for launch-day amplification. Result: flat PH launch (1 self-upvote, 0 external engagement, 0 paid signups across 13h).

**Root cause:** I optimized for "what can be shipped in 7 days" instead of "what does this product actually need before its launch event lands well". I treated PH as a checkpoint to hit on schedule rather than asking whether the prerequisites for PH success existed.

**Fix for next time:**
- **Pre-launch warmup is non-negotiable, 14-30 days minimum**. Daily 20-min warmup ritual on launch-relevant channels. Encoded as todo entries from Day 1.
- If warmup time conflicts with launch date — recommend **delaying launch**. The cost of a flat launch (lost backlink momentum, lost PR window, lost founder morale) is higher than the cost of waiting 4 weeks.
- Specifically for PH: must have 25-30 supporter contacts with relationships strong enough to ask for an upvote. If user can't list 25 such contacts, PH is wrong channel for them.

### MISS #4 — focused on what I could control vs what was needed
**What happened:** Across Apr 17 → Apr 24 my attention was 80% on engineering (Codex review gate, Stripe webhook security, atomic UPSERT, MX validation, www redirect, etc.) and 20% on legal/positioning. Distribution warmup was 0%. The output was a perfect product with broken distribution.

**Root cause:** Selection bias — I gravitated toward problems where I had clear answers. Distribution warmup is messy, depends on user time, doesn't have a "deploy" command. So I avoided it.

**Fix for next time:**
- **Time allocation at project start**: explicitly block 25% of pre-launch advisor time for distribution coaching, even if user can't do all the work themselves. Use that time to draft templates (HN comments, dev.to drafts) that user can use later.
- **Track distribution as a status column** in the project dashboard from Day 1, not just engineering progress.

### MISS #5 — too "execute the plan" mindset, not enough "challenge the plan"
**What happened:** Once we had a plan (BRIEF.md + DECISIONS.md), I executed it without challenging the underlying premise. I should have pushed back HARD when user said "X account suspended" + "no Slack/Discord network" — that should have triggered an immediate plan revision, not just a status note.

**Root cause:** Plans feel real once written down. I treated my own draft plan as commitment instead of hypothesis. That's confirmation bias.

**Fix for next time:**
- **Weekly plan review**: every Monday, ask "what new info this week should revise the plan?". If material info has emerged (X suspension, no community surface, slow PH approval), explicitly flag whether the plan still makes sense.
- **Pivot triggers** documented in advance: "If X happens, we'll change Y." Not just M2/M3/M4 milestone gates — granular weekly triggers.

---

## Forward application to Project #2 (post-Aug, Ben Cera template)

When ideation starts (target late May / early June, after M4):

1. **Hour 1**: Distribution surface mapping (Miss #1 fix). NO PRODUCT TALK YET.
2. **Hour 2**: Constraint × surface decision tree (Miss #2 fix). User picks tradeoff path.
3. **Hour 3+**: Product ideation, but with timeline derived from surface, not desired launch date.
4. **Pre-launch**: 14-30 day daily warmup ritual, encoded as todos from Day 1 (Miss #3 + #4 fix).
5. **Weekly plan review** every Monday with explicit pivot-trigger check (Miss #5 fix).

For Project #2 specifically: user now has X (PLAR_AI unblocked), LinkedIn personal (with face), dev.to (1 article live), HN andy_pl (1 karma + history forming). That's a non-zero surface to build on. Project #2 will have a different starting position than disclosekit did.

---

## 2026-05-05 — Reflection after user's LinkedIn post #2 (live pilot story)

### MISS #6 — fabricating anecdotal case studies for content drafts
**What happened:** I drafted 3 "Pani Krysia format" LinkedIn posts (Pani Magda/handlowiec, Pan Tomek/support team, Pani Anna/SaaS founder) using fabricated characters and made-up specifics ("73% sprzedawców", "60% to są te same 12 pytań", "61% polskich SaaS-ów ma chatbota"). User correctly identified the stat in #2 was unverified before publishing. He then published a completely different post — a real pilot story from yesterday at an actual client, with concrete details (the email "Kolejny raz to samo zamówienie", the 30s × 40 × 250 = 80h math, the 5-minute fix). The result was significantly stronger content with a memorable aphorism: "Najtrudniejsze w automatyzacji nie jest sprawić, żeby AI rozumiało. Najtrudniejsze jest sprawić, żeby człowiek po drugiej stronie miał jedną rzecz do zrobienia."

**Root cause:** I optimized for "draft something Andrzej can publish" rather than "ensure content carries real-world authority". Fabricated case studies feel synthetic when readers look closely. The user has actual ongoing client work; that's a richer source of content than anything I can invent.

**Fix for next time:**
- For founder-led personal-brand content (LinkedIn, X), **stop fabricating anecdotes**. Provide:
  - **Topic angles** (e.g., "human-in-the-loop UI boundary problem", "AI Act minimum viable compliance for MŚP")
  - **Format scaffolding** (hook structure, pivot, CTA template)
  - **Stat verification** when claims are made
- User writes the **specific anecdote from their actual client/work history**.
- This division of labor: Claude = positioning + structure + stat verification. User = real story + voice.
- Apply to all future founder-led content unless user explicitly delegates fully.

### Updated approach for LinkedIn posts #3 and #4 (May 9, May 11)
- **REMOVED**: Pan Tomek/support team draft, Pani Anna/SaaS founder draft (both fabricated).
- **REPLACED WITH**: topic angles only. User writes real story.
- Topic angle for #3 (Sat 9 May): TBD — should connect to user's current consulting work, ideally within last 7 days.
- Topic angle for #4 (Mon 11 May, AI Act bridge): EU AI Act Article 50 case study from user's pilot work or client conversations. Real, not fabricated. Disclosekit link in first comment if relevant.

---

## 2026-05-06 — Reflection after Google Ads first-time setup

### MISS #7 — Underestimated first-time Google Ads EU setup friction
**What happened:** Planned "Wed 6 May: Andrzej launches Google Ads campaign per MON_MAY4_PACK.md spec" with budget estimate of 45-60 min total. Actual execution stalled before campaign creation due to multiple unanticipated friction layers, consuming the full session without producing a live campaign. Account creation, billing profile, and Expert Mode access completed; campaign creation deferred to Thu 7 May.

**Specific friction layers (none flagged in my checklist):**
- **Smart Mode default**: Google's signup wizard auto-engages "Smart Campaign" mode for new accounts. Expert Mode requires explicit exit via "Skonfiguruj tylko konto" — easy to miss, derails into UI Andrzej can't use.
- **Google One subscription conflict**: User's personal Gmail had Google One subscription, which interferes with business Ads billing setup (presents personal payment profile by default). Resolution: separate payment profile per Gmail (Google supports one Gmail → multiple billing profiles, but it's not surfaced clearly).
- **Safari payment form hang**: Safari reliably hangs on Google Ads payment input. Chrome required for reliable submission. Browser-switching is friction the user shouldn't have to discover mid-task.
- **Verification status ambiguity**: Google's advertiser verification has no exposed dashboard surface. `/policymanager/advertiserverification` returns 404. Verification appears to run in background OR surface on first campaign submit. Means: we can't confirm "ready to launch" before actually clicking launch.

**Root cause:** I provided a "campaign-creation walkthrough" without considering the prerequisite gate work (account setup, billing, Expert Mode exit, browser compatibility). Treating Google Ads as "5 ad copies + click launch" ignores ~30-50 min of unique-to-EU first-time friction.

**Fix for next time:**
- For any new SaaS onboarding (Ads, analytics, Stripe, etc.), **plan a separate "account setup" session distinct from "feature configuration"** session. Budget at least 60 min for first-time setup with friction buffer.
- Pre-flight checklist additions for new platforms:
  - [ ] What's the default mode (Smart vs Expert)? How do I exit?
  - [ ] What payment profile conflicts exist with personal account state?
  - [ ] Browser compatibility quirks (Safari vs Chrome vs Firefox)?
  - [ ] Verification flow — is it explicit or hidden?
- Capture friction findings in real-time via screenshots → log to LESSONS.md so future runs (especially Project #2 setup) inherit the warnings.

### Forward application
- For Project #2 SaaS onboardings (Stripe, analytics, marketing tools): assume 60-min setup session before any feature work.
- Add to Hour-1 distribution-surface mapping (Miss #1 fix): "what platform accounts already exist?" — confirms which ones need setup vs already-warm.

---

## 2026-05-07 — Google Ads EU corporate first-campaign frictions (post-publish addendum to Miss #7)

**Context**: Wed 6 May logged Miss #7 about account setup friction. Thu 7 May campaign creation surfaced a SECOND wave of frictions specific to building the first campaign on a fresh EU corporate account. Logging here so Project #2 inherits the warning.

### Frictions discovered during campaign build (Thu 7 May, 11:33 CEST publish)

1. **Smart Mode is forced default** — the only way to escape into Expert Mode for a brand-new account is via "Skonfiguruj tylko konto" (Set up account only) link, which is hidden in the advertiser verification 404 path. Not surfaced in normal signup wizard.

2. **Safari hangs on Google Ads payment forms** — reliably reproducible, not a one-off. Always switch to Chrome before payment input.

3. **Personal Google One Visa conflicts with corporate billing** — Google presents personal payment method by default on a Gmail with Google One subscription. Solution: create separate payment profile for the business on the same Gmail. One Gmail supports multiple billing profiles; not surfaced clearly.

4. **Advertiser Verification triggers automatic 50 PLN charge** to verify card validity, refunded after success. Looks like a billing error to the user; isn't.

5. **Broad-match keywords pre-fill containing negated terms** — Google's keyword suggestion tool pre-fills broad-match keywords that include words from your negative list (e.g. "free template" gets suggested even though "free" is a negative). Manual cleanup of ~14 keywords required before publish.

6. **"Same final URL" warning blocks duplicate sitelinks** — if 2 sitelinks point to the same Final URL, Google blocks publish. Workaround: append distinct UTM parameter (e.g. `?ref=langs`) per sitelink to differentiate.

7. **Standard delivery is the only option** for Search/Shopping (Accelerated deprecated 2019). Czat had suggested Accelerated; Claude flagged correctly.

8. **Google upsell flow during build** — multiple decline-required steps:
   - Search Partners network (auto-on, +2.3% reach promised) → DECLINE for clean attribution
   - gtag.js conversion tracking post-publish → DECLINE (out-of-scope for $100 burst)
   - EOG (European Online Gambling?) consent banner → DECLINE
   All require explicit "Nie, dziękuję" clicks; defaults are ON.

9. **Auto-conversion goal "Wyświetlenia strony" cannot be deleted** when it's the last remaining goal. Solution: ignore (Maximize Clicks bidding doesn't optimize for goals anyway).

10. **Campaign "ends soon" alert is false-positive** for any end date <30 days from creation. UI shows red banner; ignore.

### Total time investment
- Account setup (Wed 6 May): ~50 min
- Campaign build + publish (Thu 7 May): ~2 hours
- **Total: ~2h 50min hands-on across 2 days**
- vs. original plan estimate: 30-45 min
- **Plan miss factor: ~4-6×**

### Updated planning rule for Project #2
For first-time Google Ads (or equivalent paid-channel) setup on a new corporate account, plan **3-hour minimum block split across 2 sessions**:
- Session 1 (1 hr): account creation, billing profile, Expert Mode access, browser compatibility test
- Session 2 (2 hr): campaign build, hardening checklist, decline upsells, publish
This 3× the original 30-45 min estimate; treat as a hard floor, not a stretch goal.

---

## 2026-05-08 — Google Ads onboarding email patterns (post-publish)

### Lesson #8 — Distinguish real Google Ads notifications from upsell emails
**Context**: Day 1 of EN campaign serving, Google sent multiple emails that look operational but are actually sales/onboarding nudges. First time managing an Ads account = easy to react to wrong signals.

### Pattern catalog (so far, ~24h post-publish)
1. **"Skonfiguruj w swojej witrynie tag Google"** (Wed 6 May 09:33, repeats daily) — gtag.js install nudge. Decision: declined intentionally per M4 plan (manual attribution via D1). **Ignore.**
2. **"Skonfiguruj płatności" labelowany "REKLAMY DISPLAYOWE"** (Fri 8 May 14:26) — false-positive: payments are OK, our campaign is **Search-only**, this is Google trying to upsell into Display network. **Ignore.** Real billing issues come from `notifications@stripe.com` or specific Ads billing failure emails (different sender pattern).
3. **"Utwórz pierwszą kampanię na nowym koncie"** (Wed 6 May 12:35) — onboarding email from before campaign was actually built. Stale by Thu morning. **Ignore.**
4. **"AI Max", "Search Partners"** upsell suggestions in dashboard — also auto-presented during build. Decline both.

### Real notifications to watch for (when these arrive, ACT)
- `ads-noreply@google.com` with subject containing "zatwierdzona" / "approved" / "odrzucona" / "disapproved" — actual policy decisions
- `ads-noreply@google.com` with subject "Płatność nie powiodła się" / "Payment failed" — billing failures (action required)
- `policy-notification` patterns — keyword bans, ad disapprovals (specific words rejected)
- Stripe-style email about charges from Google itself (when monthly invoice issued)

### Forward fix
- Don't auto-react to Google Ads emails autonomously; user filters via `/google-ads-real` Gmail label or just via subject keywords
- Add to GOOGLE_ADS_MONITORING.md "Email triage" section as part of daily 2-min check
- For Project #2: build a Gmail filter from Day 1 that routes `ads-noreply@google.com` AND `(REKLAMY DISPLAYOWE OR Display OR Search Partners OR tag Google OR Smart Mode)` to a "Google Ads upsell" folder and AWAY from primary inbox — eliminates noise during campaign run

---

## [2026-05-12] Miss #9 — Infrastructure audit must precede target-setting

**What happened**: M4 success criterion set on 2026-04-21 included `≥100 email captures by 2026-05-15`. Discovered 25 days post-launch (during Day 5 EN-campaign deep review on 2026-05-12) that the email-capture endpoint **never existed in production**: `email_captures` table created in `0001_init.sql`, `captureEmail()` helper defined in `src/lib/db.ts:133`, but `grep -rn "captureEmail" src/` returned **only the definition** — zero callers. No form on `home.ts`. The target measured an unreachable outcome for 25 days.

**Compounding cause**: Day 1-5 D1 monitoring queries used `(strftime('%s','now')-N)*1000` assuming `usage_logs.created_at` was milliseconds, but the codebase stores **unix seconds** (`captureEmail` calls `Math.floor(Date.now()/1000)`, `ratelimit.ts:18` matches). Every "last N days" filter compared seconds against seconds×1000 and silently returned 0. The bug masked the real Days 1-5 funnel signal (3 generations, not 0) — making the discovery of the capture-flow gap look like a fresh problem on Day 5 instead of a 25-day-old infra hole.

**Root cause**: Target set from **feature LIST** (email_captures table exists + migration ran in D1) not from **feature EXISTS** (endpoint + form + handler present and wired in the request path of shipped UI). Schema ≠ feature. Migration applied ≠ feature shipped.

**Forward fix — codify for Project #2**:
Before committing any milestone metric target to DECISIONS.md, verify:
1. **Endpoint exists in production**: `grep -rn "<handler_function_name>" src/` returns ≥2 matches (definition + at least one caller in the request path).
2. **Form/trigger exists in shipped UI**: HTML/JS form posting to the endpoint is rendered in at least one served page (not just declared in code).
3. **End-to-end manual test confirms write happens**: live curl + D1 SELECT shows a row appeared.
4. **Timestamp units consistent across schema and monitoring**: a single audit query inspecting `created_at` typical values (10-digit = seconds, 13-digit = milliseconds) — both writers AND ad-hoc monitoring queries must agree, not just the migration file.

Apply this as an "infra audit checklist" gate before any milestone target is added to DECISIONS.md or BRIEF.md. Audit must include schema-to-endpoint mapping + timestamp-unit convention check.

---

## [2026-05-12] Miss #10 — Spec must be validated against codebase before implementation

**What happened**: While implementing the capture-flow spec on 2026-05-12, two spec-codebase mismatches surfaced before I touched a line of code:
1. **`usage_logs` event/metadata columns** — spec said log capture events with `{ event: 'email_captured', metadata: {...} }`, but `usage_logs` schema has neither column. Following the spec literally would have either (a) silently dropped the logging via a wrong INSERT (worst case), (b) triggered a SQL error on first capture (good case), or (c) forced an emergency schema refactor under M4 deadline (most-likely case).
2. **Rate limit storage = KV** — spec said use Cloudflare KV with TTL. CLAUDE.md invariant #8 (added after Codex Review Gate #1) explicitly forbids KV for rate limits — the prior KV-backed limiter was bypassable under parallel/cross-colo bursts because KV is eventually-consistent. Following the spec would have reintroduced the exact regression Gate #1 caught.

**Root cause**: The spec author (Andy, acting as planning agent in this exchange) doesn't always hold the full current state of the codebase in head — schemas drift, invariants get added after a security review, file structures change. A spec is a **plan** based on a mental model that may lag the repo.

**Forward fix — codify as Implementer Rule**:
Before any apply step on a non-trivial spec from a planning agent (human or AI), the implementer (Code, or me-the-implementer in single-agent mode) must run a **codebase reality check** on every assumption the spec makes about: (a) table/column existence, (b) function signatures the spec calls, (c) invariants in CLAUDE.md that the spec might cross, (d) timestamp/format conventions, (e) routing/auth patterns. Flag every mismatch in a "ALERTS" section **before** showing the diff, propose an alternative for each, and wait for explicit override.

Applied today: this check caught one regression (KV invariant violation) and one wasted-work scenario (events column refactor under deadline). Cost of the check: ~5 min of grep + schema query. Cost of skipping it: hours of post-deploy firefight.

For Project #2: encode this as a `before-apply.md` checklist in the repo root: `[ ] schema audit · [ ] invariant audit · [ ] timestamp audit · [ ] routing pattern audit · [ ] flag mismatches before diff`.

---

## [2026-05-12] Miss #11 — Copy referencing infrastructure not verified

**What happened**: Success-state copy on `/api/capture-email` flow referenced sender address `your-business@example.com` without verifying the mailbox exists. `plar.ai` zone has no MX records; the only working mailbox is `your-business@example.com`. Caught only via Andy's screenshot review of second incognito test (~12:14 CEST). Had a real user waited 2-3 days for templates and then replied to `your-business@example.com` → bounce → trust collapse. Hot-fix shipped same hour: single-string swap to `your-business@example.com` (the actual mailbox).

**Root cause**: Planning agent (desktop Claude in this exchange) proposed `your-business@example.com` as part of "honest delivery framing" without asking the implementer to verify the address resolves to a monitored mailbox. Implementer (me) accepted the spec literally, ran tsc + dry-run + curl smoke — all passed because **type-check and grep verify presence of strings, not truth of claims**. A live `mailto:` test or DNS MX check would have caught it; neither was in the pre-deploy gate.

**Compounding factor**: This is the second consecutive day of user-testing catching semantic-layer issues that all automated gates missed. Day 1 (11.05): hero copy "Generate disclosure" passed every check, caught by Andy's search-term review as wrong product framing. Day 2 (12.05): success-copy sender passed every check, caught by Andy's screenshot review as non-existent mailbox. Pattern: automated tests verify shape; only humans verify meaning.

**Forward fix — Contact reference audit rule**:
Before deploying any copy that references a contact mechanism (email address, phone number, URL, social handle, support channel), verify:
1. **Mechanism exists** — for email: `dig MX <domain>` returns records AND the local-part is configured in the receiving service. For URL: HEAD request returns 2xx. For phone: number is provisioned and answers.
2. **Mechanism is monitored** — someone (or automation) will see messages within the SLA implied by the copy ("2-3 days" requires daily inbox check; "shortly" requires hours).
3. **Deliverability tested from external source** — send a probe from outside the org (Gmail account, throwaway, etc.) and confirm receipt. For URLs: load in incognito to bypass cache + auth.
4. **Fallback path documented** — if the primary mechanism breaks, what does user do? At minimum, the copy should be ambiguous enough that one breakage doesn't strand users (e.g., "expect an email from us" + signature in body that names a working alternate is safer than naming a single brittle address).

**For Project #2 application**: add "contact reference audit" gate to copy-deployment checklist alongside the existing schema/invariant audits. Cost of audit: ~2-5 min per address. Cost of skipping: same-day hot-fix + trust loss + LESSONS.md entry.

**Meta-lesson**: User-testing (incognito flow with screenshot review) catches a category of bugs that no automated gate I have access to can catch. For semantic-layer changes (copy referencing product claims, contacts, infrastructure, or user-receivable artifacts), the deploy isn't done until a human has flowed through it. Build this expectation into the spec phase, not the bugfix phase.

---

## [2026-05-14] Miss #12 — Validate business model BEFORE building (the meta-miss of disclosekit)

**What happened**: 30 calendar days + ~80 hours of Andy's time + €110 cash burned on disclosekit (€10 domain + €100 Ads) + uncounted Claude tokens. M4 verdict on 2026-05-14 returned NO-GO (2/4 PASS). The infrastructure shipped is technically sound — capture flow E2E proven, hero copy iterated to positioning that buyers actually search for, Stripe LIVE mode wired, custom domain + TLS + SEO listings — but **zero captures, zero checkout sessions, zero paying customers** across 8 days of paid traffic post-funnel-plumb. Project enters hold-and-harvest mode with sunk-cost-acknowledgment.

**Root cause** (the deepest layer, owned by me at 2026-04-16 architecture phase): **subscription pricing model applied by default to a one-time-use product**, without ever asking "is the buyer's need recurring or one-time?".

Target buyer (SME compliance officer) lifetime need: ~3-5 disclosures TOTAL across all AI systems the company deploys. Not 3-5 monthly. Not 3-5 weekly. **3-5 ever.** Subscription model (€29/mo Pro, €99/mo Team) is structurally wrong for that usage pattern — even if pricing was €9/mo it would still be wrong, because the customer's mental model is "I need this document, once, ever". Free 3/day cap as I designed it covered that entire lifetime need at zero cost — which is why nobody ever needed to upgrade.

**Andy's verdict from the post-mortem dialogue**: *"Skoro my dajemy 3/day free, kto miałby zapłacić? Przeciecz to nie ma prawa się udać."* He was 80% right — the configuration had no monetization path. The 20% correction is that the free tier was a symptom, not cause; the cause was using SaaS subscription as the default monetization for a one-time compliance document.

**Why I didn't catch this**: I treated "what's the pricing?" as a tactical decision (default to standard SaaS tiers, calibrate numbers) instead of a strategic one (what does buyer need look like → what pricing model maps to that). The check I should have run at architecture phase, but didn't:

```
Buyer need analysis:
- Frequency:      [ ] daily/weekly  [ ] monthly  [x] one-time-or-rare
- Recurrence:     [ ] subscribed seat  [x] discrete document/output
- Value source:   [ ] productivity gain  [x] risk avoidance / regulatory
- Substitution:   [ ] specialized only  [x] generic LLM is "good enough"
Decision tree:
- 3+ left column = SaaS subscription model OK
- 3+ right column = one-time fee OR transactional OR don't build
```

For disclosekit, all 4 answers landed in the right column → one-time fee model (€10-25 per disclosure pack) or transactional (€1-3 per generation after first free). Subscription was the wrong tool from the architecture phase forward; every downstream decision (free tier sizing, pricing page copy, Stripe plan setup, conversion-funnel design) compounded the original mismatch.

**Compounding misses chained off this root** (5 specific decisions, all on me):
1. **Build-before-validate**: 4 weeks of code before any willingness-to-pay test or single SME compliance-officer conversation. Could have run `landing-page + Stripe "early access" + €100 Ads` in 1 evening; would have killed/pivoted the model before code.
2. **Default subscription pricing**: 2026-04-16 architecture phase applied "Free / €29/mo / €99/mo" automatically because that's the SaaS shape. Never asked the recurring-vs-one-time question.
3. **Free tier as rate-limit, not strategy**: 3/day was calibrated against API abuse cost, not against business model. At 3/day, lifetime SME need (3-5 docs total) is fully covered → paid tier has no trigger.
4. **Reactive A/B in week 5, not proactive research in week 1**: paid for the "buyers search 'checker' not 'generator'" lesson in EN Ads spend (€100), not in 30-min user calls (free).
5. **No friction-test landing**: zero validation between hypothesis ("EU SMEs will pay €29/mo for AI Act disclosures") and code. Pure faith-based development.

**Forward fix — codify as `Project #2 pre-build gate` (three hard rules)**:

**R1: Validate willingness-to-pay BEFORE writing any feature code.**
- Build only: single landing page + Stripe "join waitlist" button + 1 €100 Ads burst (or LinkedIn organic if no Ads budget).
- Threshold: **≥5 emails per 50 clicks** = build signal.
- Below threshold = the model is broken before the product exists; iterate on copy/pricing/positioning before adding code. Cost of this gate: 1 evening + €100. Cost of skipping it (disclosekit case study): 30 days + €110 + 80h.

**R2: Match pricing model to usage pattern, never default to SaaS subscription.**
- One-time buyer need → one-time fee (€X for output, no recurrence).
- Recurring buyer need (uses N times/month forever) → subscription.
- Bursty buyer need (heavy in short windows, dormant otherwise) → credits or per-use.
- Required at architecture phase: a one-paragraph buyer-need analysis in BRIEF.md before pricing tiers go into wrangler.jsonc.

**R3: Free tier calibrated as DEMO, never as full use-case coverage.**
- Options that work: 1 generation per IP per email lifetime · watermarked output · output-quality-cap (free = 60% of paid quality) · time-limited trial (7 days, then locked).
- Option that fails: per-day cap higher than realistic lifetime need (this was disclosekit).
- Test before shipping: *"If a typical buyer used only the free tier, would their full job-to-be-done be 90%+ complete?"* — if yes, you've just built a free product with a paid wrapper; redesign tiers.

**Meta-lesson for me**: my biggest miss as an architect on this project wasn't any single code decision or copy choice — it was treating monetization as a downstream tactical detail when it was the upstream strategic question that determined whether any of the code ever had a chance. For Project #2, the very first artifact in BRIEF.md must be the buyer-need analysis (R2 above) and the pre-build gate plan (R1). Code starts only after both pass.

---

## [2026-05-15] Miss #13 — Job-to-be-done analysis must precede free tier calibration AND pricing model selection (Andy's correction of Miss #12)

**Background**: Yesterday's Miss #12 framed the meta-failure as "validate business model before building" with R1+R2+R3 as forward rules. After overnight reflection + this morning's search-term data review, Andy corrected the framing into a sharper, more general lesson — kept here verbatim in spirit because his framing is more transferable than mine.

**Failed sequence (what we actually did on disclosekit, 2026-04-16 architecture phase)**:
1. Pick niche (EU AI Act Article 50 compliance)
2. Pick pricing model (SaaS subscription, default)
3. Calibrate free tier size against API abuse cost (3/day rate-limit)
4. Build
5. Ship
6. Discover users' job-to-be-done was: "one disclosure, copy-paste, done forever"
7. Realize free tier covered 100% of that JTBD
8. KILL

**Correct sequence** (the rule that should have been followed):
1. **JTBD interviews ≥5 target users** — what is the job they're hiring this tool to do? How often? What's the substitute today?
2. **Frequency-of-need classification** — one-time? recurring? bursty? — answer drives everything downstream
3. **Pricing model maps to frequency** — one-time fee for one-time JTBD; subscription only when the JTBD recurs
4. **Free tier sized against R3 rule** (Miss #12: demo-not-coverage; if free covers full JTBD, redesign tiers)
5. **Build**

**For disclosekit specifically — what JTBD analysis would have revealed at week 0**:
- JTBD: *"Generate one Article 50 disclosure for my chatbot/AI feature, paste it into my UI, save the audit-file note, never think about it again until I ship another AI feature."*
- Frequency: 1 disclosure when shipping each new AI system → ~1-3 per company per year for SMEs, often 1-2 lifetime for many.
- Substitute: ChatGPT free + 10 min copy-paste from Regulation 2024/1689 text.
- Correct product based on JTBD: free with watermark + €5 to remove watermark + €19 PDF compliance binder upsell. **One-time transactional, not subscription.**

**But — and this is the harder lesson**: even the correct product would have failed for disclosekit, because the niche has insufficient organic search demand to support volume that makes a transactional model viable. Which leads to:

**R4 — Pre-existence search demand validation (added to project planning rules, alongside R1+R2+R3 from Miss #12)**:

Before ANY work starts on BRIEF.md or buyer-need analysis or code, run this 30-minute check:

1. **Keyword search volume** on top 5 buying-intent keywords for the niche. Use Google Keyword Planner (free), Ahrefs free tier, or Ubersuggest.
   - Threshold: top buying keyword must have **≥1,000 monthly searches** in target geography, OR ≥100 monthly searches across ≥3 buying-intent keyword variants.
   - Below threshold: niche is research-phase, not purchase-phase. Defer or kill.

2. **Top 10 organic results** for those buying keywords. Read what's there.
   - If results dominated by **educational content / guides / regulatory bodies / academia**: nobody is selling here yet because nobody is buying yet. Niche is pre-commerce.
   - If results show **transactional landing pages / pricing pages / tool listings**: commerce exists → can compete.
   - If results show **enterprise vendors only** ($10k+/yr products): SMB long-tail might exist but verify via R1 willingness-to-pay test before committing.

3. **"Compliance deadline" ≠ "purchase intent"**. The thesis that an upcoming regulatory deadline (Article 50: 2026-08-02) will generate organic purchase intent spike was **falsified by disclosekit data**: 30 days of distribution work pre-deadline produced 1 organic visit. Enterprise compliance buyers solve regulation problems through outbound sales motion (vendor sales reps reaching out), not through Google search. SMB buyers either don't know they need to comply or solve it ad-hoc with ChatGPT. There is no warm market in the middle.

**For Project #2 application**: encode R4 as the very first checkbox before BRIEF.md exists:
```
[ ] R4: Pre-existence search demand validated
    [ ] ≥1 buying-intent keyword has ≥1k/mo searches OR ≥3 have ≥100/mo
    [ ] Top-10 organic results show ≥3 transactional pages (not all educational)
    [ ] If deadline-driven niche: confirmed search demand 3+ months pre-deadline,
        not assumed from deadline date

If R4 fails: STOP. Pick different niche. Do not proceed to BRIEF.md or R1-R3.
```

**Why this rule is more powerful than R1-R3**: R1 (willingness-to-pay) and R2 (pricing model match) and R3 (free tier as demo) all assume buyers exist and just need to be matched correctly. R4 catches the deeper case where the buyer population is so thin that no R1-R3 sequence will save the project. R4 is the niche-existence check; R1-R3 are the niche-fit checks.

**Disclosekit retro applied to R4**: top buying keyword `"AI disclosure generator"` had **structurally zero search volume** per Google itself ("Mała liczba wyszukiwań" status), and `"Article 50 disclosure"` was paused for same reason. Both would have failed R4 keyword-volume gate. Top organic results for `"EU AI Act compliance"` are dominated by EU Commission pages, IAPP educational content, OneTrust enterprise marketing — would have failed R4 transactional-pages gate. **30-minute R4 check at week 0 would have stopped this project before BRIEF.md, saving 28 days + €110 + 80h.**

**Final meta-lesson — niche selection precedes product design precedes pricing precedes build**. Disclosekit's deepest error was niche selection: we picked a regulatory deadline as proxy for buyer intent, and the deadline does not exist in Google search behavior the way we assumed. For Project #2, R4 runs first. If R4 fails, no BRIEF.md, no buyer-need analysis, no code. Pick again.

---

## [2026-05-28] Miss #14 — AI-assisted development reduces typing cost, not thinking or steering cost

**Founder testimony (verbatim, voiced ~2026-05-21 during the case-study decision)**: *"to wszystko jest trudniejsze niż myślałem nawet z twoją pomocą bo to ciebie trzeba pilnować przede wszystkim z tobą rozmawiać"* — roughly: "all of this is harder than I thought even with your help, because the AI has to be watched, and above all, talked to."

**What happened**: disclosekit was built over 28 days with heavy AI-coding-agent assistance. The narrative around AI coding tools is "the AI does the work." The lived reality was different: the AI eliminated typing, syntax lookup, boilerplate, and most mechanical execution — but it did NOT eliminate the strategic thinking, the verification burden, or the steering effort. Those stayed entirely with the human, and they turned out to be the expensive part.

**The evidence is in this very project's own miss log**:
- **Miss #9** (capture endpoint never built): the AI shipped a database table and a helper function but never wired them to any caller, and didn't notice for 25 days. It took the human drilling into D1 data to surface it. An AI confident in its own output is not a substitute for human verification.
- **Miss #11** (sender address pointed to a non-existent mailbox): the AI wrote a contact address into user-facing copy without checking the mailbox existed. Caught only by the human's screenshot review of a real incognito test. Type-checks and curl-greps verify *presence of strings*, not *truth of claims*.
- **Search-term diagnosis (May 14-15)**: the AI's first reading of the Ads data ("86% research intent") was based on a keyword-bucket aggregate, not the actual search-term report — a wrong conclusion a second reviewer caught. The AI was articulate and confident while being wrong.

**Root cause**: the "AI does the work" framing measures the wrong cost. It measures keystrokes saved. The actual cost of building is (a) deciding what to build and whether to build at all, (b) verifying that what got built matches intent, and (c) keeping the AI aligned with the goal across a long, context-shifting project. AI assistance compresses execution and most mechanical work, but the decision, verification, and steering all remain human — and they don't shrink. If anything, working with a fast, confident, occasionally-wrong collaborator *increases* verification and steering load, because the AI produces more output to check, faster, with conviction that masks errors.

**Forward rule (for Project #2 and beyond)**:
1. **Budget AI-cooperation time realistically.** Plan for steering + verification + re-briefing to consume ~30-40% of total project time, NOT the 5-10% the "AI does everything" narrative implies. If a task "should take the AI 20 minutes," budget an hour of human attention around it.
2. **Human verification gates are non-negotiable for anything user-facing or money-touching.** Any copy making a claim (about the product, a contact, an SLA, an infrastructure fact) must be checked by a human against reality before ship — automated gates cannot catch semantic-layer truth gaps. For money/auth/data flows, the human runs the real end-to-end test, not the AI's self-report that it passed.
3. **Treat AI confidence as zero evidence.** The AI is equally fluent when right and when wrong; its tone carries no signal about correctness. Demand the underlying data (the actual DB row, the real search-term report, the live HTTP response), not the AI's summary of it.
4. **The AI is leverage on execution, not a replacement for ownership.** The decisions that determined disclosekit's fate — niche selection, pricing model, build-before-validate — were strategic, and no amount of AI execution speed could rescue a wrong strategic call. Faster wrong is still wrong. The human owns the wheel; the AI is the engine.

**Why this is the most transferable lesson in the repo**: the technical specifics apply only to projects with the same stack. The business lessons (R1-R4) apply to any bootstrap product. But this lesson — that AI assistance changes *which* work is expensive without reducing *how much* thinking and steering you owe — applies to every project anyone builds with an AI coding agent from here forward. The tool is genuinely transformative for execution. It is not a shortcut around judgment, verification, or ownership. Plan accordingly.
