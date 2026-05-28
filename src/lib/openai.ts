// OpenAI client for the disclosure generator.
// Mirrors the shape of ./anthropic.ts so the worker can swap providers via env var.
// Uses /v1/chat/completions with response_format=json_object — forces valid JSON back.

import type { DisclosureRequest, DisclosureResult } from '../types';
import { buildSystemPrompt, buildUserPrompt, applicableClausesFor } from '../prompts/disclosure';

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
// Cheapest reliable mini model. Bump to a newer mini if available; this is the one line to change.
// Pricing (as of April 2026): $0.15/M input, $0.60/M output.
const MODEL = 'gpt-4o-mini';
const MAX_TOKENS = 900;

interface OpenAIChatResponse {
  choices: Array<{ message: { content: string } }>;
  usage: { prompt_tokens: number; completion_tokens: number };
  model: string;
}

export async function generateDisclosure(
  apiKey: string,
  req: DisclosureRequest
): Promise<DisclosureResult> {
  const t0 = Date.now();

  const body = {
    model: MODEL,
    temperature: 0.2,
    max_tokens: MAX_TOKENS,
    response_format: { type: 'json_object' as const },
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(req) },
    ],
  };

  const res = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    // Log full body server-side; never embed raw provider response in the
    // thrown message (errText can contain echoed user payload on 4xx).
    console.error(`OpenAI ${res.status} error body:`, errText.slice(0, 400));
    throw new Error(
      `OpenAI ${res.status} (request-id: ${res.headers.get('x-request-id') ?? 'unknown'})`
    );
  }

  const data = (await res.json()) as OpenAIChatResponse;
  const text = data.choices?.[0]?.message?.content ?? '';

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
      tokensIn: data.usage.prompt_tokens,
      tokensOut: data.usage.completion_tokens,
      latencyMs: latency,
      generatedAt: Math.floor(Date.now() / 1000),
    },
  };
}

// response_format=json_object usually returns clean JSON, but we still defend against
// accidental markdown fences / preambles from older behavior.
function safeParseJson(text: string): any | null {
  const trimmed = text.trim();
  const stripped = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(stripped);
  } catch {
    const match = stripped.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch { /* fall through */ }
    }
    return null;
  }
}
