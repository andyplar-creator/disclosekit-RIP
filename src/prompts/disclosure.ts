// System prompt for Article 50 disclosure generation.
// Anchored on the exact legal text so Haiku stays grounded.
// Reference: https://artificialintelligenceact.eu/article/50/

import type { DisclosureRequest, SystemType } from '../types';

// Exact clauses of Article 50 (condensed, faithful summary — not a legal interpretation).
// Keeping this in the prompt lets the model cite the right clause per system type.
export const ARTICLE_50_CLAUSES: Record<string, string> = {
  '50(1)': 'Providers of AI systems intended to interact directly with natural persons shall ensure the systems are designed and developed in such a way that the natural persons concerned are informed that they are interacting with an AI system, unless this is obvious from the circumstances and context of use.',
  '50(2)': 'Providers of AI systems, including GPAI systems, generating synthetic audio, image, video, or text content, shall ensure that the outputs of the AI system are marked in a machine-readable format and detectable as artificially generated or manipulated. The technical solutions shall be effective, interoperable, robust and reliable as far as technically feasible.',
  '50(3)': 'Deployers of an emotion recognition system or a biometric categorisation system shall inform the natural persons exposed to it of the operation of the system and shall process the personal data in accordance with Regulations (EU) 2016/679 and (EU) 2018/1725 and Directive (EU) 2016/680.',
  '50(4)': 'Deployers of an AI system that generates or manipulates image, audio or video content constituting a deep fake, shall disclose that the content has been artificially generated or manipulated. Deployers of an AI system that generates or manipulates text which is published with the purpose of informing the public on matters of public interest shall disclose that the text has been artificially generated or manipulated.',
};

const CLAUSE_MAP: Record<SystemType, string[]> = {
  chatbot: ['50(1)'],
  text_generator: ['50(2)', '50(4)'],
  image_generator: ['50(2)'],
  video_generator: ['50(2)'],
  audio_generator: ['50(2)'],
  deepfake: ['50(2)', '50(4)'],
  emotion_recognition: ['50(3)'],
  biometric_categorisation: ['50(3)'],
};

export function applicableClausesFor(systemType: SystemType): string[] {
  return CLAUSE_MAP[systemType] ?? [];
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  pl: 'Polish',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  nl: 'Dutch',
  cs: 'Czech',
  sv: 'Swedish',
  pt: 'Portuguese',
};

export function buildSystemPrompt(): string {
  return `You are a compliance assistant specialised in the EU AI Act (Regulation (EU) 2024/1689), specifically Article 50 "Transparency obligations for providers and deployers of certain AI systems", enforceable from 2 August 2026.

Your job: generate a SHORT, clear, user-facing disclosure notice plus a compliance-file note for a specific AI system, in the requested EU language.

You will be given JSON input describing the system. You must reply with ONLY valid JSON matching this schema:
{
  "userFacingText": string,          // 1-3 sentences shown to end users
  "shortLabel": string,              // <=40 chars persistent badge/label
  "placement": string,               // where to place it (e.g., "at the top of the chat window, visible from the first message")
  "htmlSnippet": string,             // copy-paste HTML banner with inline styles, self-contained, no external assets
  "docNote": string,                 // 2-4 sentences for the internal compliance file
  "caveats": string[]                // 1-4 short caveats (watermarking, legal review, accessibility, etc.)
}

HARD RULES:
- Output ONLY the JSON object. No preamble, no markdown fences, no commentary.
- User-facing text must be: clear, conspicuous, timely, accessible. No legalese. No phrases like "smart assistant" that obscure the AI nature. Use the word "AI" explicitly.
- Do NOT invent obligations that are not in Article 50. Do NOT give legal advice.
- Always include a caveat that this is a starting template, not legal advice, and that a final review by qualified counsel is recommended.
- For systems generating synthetic content (clauses 50(2) and 50(4)), include a caveat mentioning that a separate machine-readable marking (C2PA provenance metadata and/or digital watermarking such as SynthID) is ALSO required — disclosure text alone is not sufficient.
- For emotion recognition / biometric categorisation (clause 50(3)), include a caveat that GDPR (Regulation (EU) 2016/679) processing grounds must also be established.
- HTML snippet: single <div> with inline style, neutral colors (light background, dark text), 12-14px font, role="status" or aria-label, no JavaScript, no external CSS, no images. Must work dropped into any page.
- Match the requested language strictly. Do not mix languages.
- Keep each field concise. Quality over length.`;
}

export function buildUserPrompt(req: DisclosureRequest): string {
  const clauses = applicableClausesFor(req.systemType).map(c => `${c}: ${ARTICLE_50_CLAUSES[c]}`).join('\n');
  const langName = LANGUAGE_NAMES[req.language] ?? req.language;

  return `Generate an Article 50 disclosure for this system.

INPUT:
${JSON.stringify({
  systemType: req.systemType,
  industry: req.industry ?? 'general',
  productName: req.productName ?? '(unnamed)',
  deploymentContext: req.deploymentContext ?? '(unspecified)',
  language: req.language,
  languageName: langName,
  tone: req.tone ?? 'conversational',
}, null, 2)}

APPLICABLE CLAUSES (write output consistent with these):
${clauses}

Respond with ONLY the JSON object.`;
}
