// Minimal Anthropic client for Cloudflare Workers.
// Uses fetch directly — no SDK dependency (keeps bundle tiny, avoids node polyfills).

import type { DisclosureRequest, DisclosureResult } from '../types';
import { buildSystemPrompt, buildUserPrompt, applicableClausesFor } from '../prompts/disclosure';

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
// Pinned model version. Bumping this requires spot-check re-validation.
const MODEL = 'claude-haiku-4-5-20250929';
const MAX_TOKENS = 900;

interface AnthropicMessageResponse {
  content: Array<{ type: string; text?: string }>;
  usage: { input_tokens: number; output_tokens: number };
  model: string;
  stop_reason: string;
}

export async function generateDisclosure(
  apiKey: string,
  req: DisclosureRequest
): Promise<DisclosureResult> {
  const t0 = Date.now();

  const body = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: 0.2, // low — we want consistent, grounded output
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: buildUserPrompt(req) }],
  };

  const res = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    // Log full body server-side; never embed raw provider response in the
    // thrown message (errText can contain echoed user payload on 4xx).
    console.error(`Anthropic ${res.status} error body:`, errText.slice(0, 400));
    throw new Error(
      `Anthropic ${res.status} (request-id: ${res.headers.get('request-id') ?? 'unknown'})`
    );
  }

  const data = (await res.json()) as AnthropicMessageResponse;
  const text = data.content.find(c => c.type === 'text')?.text ?? '';

  const parsed = safeParseJson(text);
  if (!parsed) {
    throw new Error('Model returned non-JSON output');
  }

  const latency = Date.now() - t0;

  return {
    systemType: req.systemType,
    language: req.language,
    userFacingText: String(parsed.userFacingText ?? ''),
    shortLabel: String(parsed.shortLabel ?? ''),
    placement: String(parsed.placement ?? ''),
    applicableClauses: applicableClausesFor(req.systemType),
    htmlSnippet: String(parsed.htmlSnippet ?? ''),
    docNote: String(parsed.docNote ?? ''),
    caveats: Array.isArray(parsed.caveats) ? parsed.caveats.map(String) : [],
    meta: {
      model: data.model,
      tokensIn: data.usage.input_tokens,
      tokensOut: data.usage.output_tokens,
      latencyMs: latency,
      generatedAt: Math.floor(Date.now() / 1000),
    },
  };
}

// Strip any accidental markdown fences and parse.
function safeParseJson(text: string): any | null {
  const trimmed = text.trim();
  const stripped = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(stripped);
  } catch {
    // Try to extract the first {...} block
    const match = stripped.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch { /* fall through */ }
    }
    return null;
  }
}
