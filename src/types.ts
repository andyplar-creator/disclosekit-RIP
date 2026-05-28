export interface Env {
  // Bindings
  DB: D1Database;
  RATE_LIMIT: KVNamespace;
  ASSETS: Fetcher;

  // Secrets (at least one LLM key required; both may be set)
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;

  // Vars
  LLM_PROVIDER: string;          // 'openai' (default) | 'anthropic'
  FREE_DAILY_LIMIT: string;
  SITE_URL: string;
  PRICE_ID_PRO: string;
  PRICE_ID_TEAM: string;
  STRIPE_PUBLISHABLE_KEY: string;
}

// Article 50 systems per EU AI Act official text
export type SystemType =
  | 'chatbot'              // Art. 50(1) — direct interaction with natural persons
  | 'text_generator'       // Art. 50(4) — AI-generated text for public interest
  | 'image_generator'      // Art. 50(2) — synthetic image content
  | 'video_generator'      // Art. 50(2) — synthetic video content
  | 'audio_generator'      // Art. 50(2) — synthetic audio content
  | 'deepfake'             // Art. 50(4) — deepfake content
  | 'emotion_recognition'  // Art. 50(3) — emotion/biometric categorisation
  | 'biometric_categorisation';

export interface DisclosureRequest {
  systemType: SystemType;
  industry?: string;        // 'ecommerce' | 'healthcare' | 'fintech' | ...
  language: string;         // ISO 639-1: 'en', 'pl', 'de', 'fr', 'es', 'it'
  productName?: string;     // e.g., "ShopBot Assistant"
  deploymentContext?: string; // e.g., "customer support widget on website"
  tone?: 'formal' | 'conversational';
}

export interface DisclosureResult {
  systemType: SystemType;
  language: string;
  // User-facing disclosure text (the main deliverable)
  userFacingText: string;
  // Short persistent label (e.g., for chat header)
  shortLabel: string;
  // Suggested placement on the page/app
  placement: string;
  // Article 50 clause(s) that apply
  applicableClauses: string[];
  // Copy-paste HTML snippet (banner/badge)
  htmlSnippet: string;
  // Internal documentation note for compliance file
  docNote: string;
  // Warnings/caveats (e.g., "consult a lawyer", "see C2PA for watermarking")
  caveats: string[];
  // Generation metadata
  meta: {
    model: string;
    tokensIn: number;
    tokensOut: number;
    latencyMs: number;
    generatedAt: number;
  };
}

export interface User {
  id: number;
  email: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: 'pro' | 'team';
  // 'pending' = Stripe session completed but payment not yet cleared
  //   (async payment methods: SEPA, bank debit). Flipped to 'active' on
  //   checkout.session.async_payment_succeeded, to 'canceled' on
  //   async_payment_failed. Card-only MVP rarely sees 'pending'.
  status: 'active' | 'past_due' | 'canceled' | 'pending';
  // SHA-256 hash of the API key. Raw key never persisted; regeneration
  // requires a new checkout or operator-side manual rotation.
  api_key_hash: string | null;
  created_at: number;
  updated_at: number;
}
