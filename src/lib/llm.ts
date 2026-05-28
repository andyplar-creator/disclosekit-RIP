// Thin LLM provider router.
// Default is OpenAI (set LLM_PROVIDER=openai). Switch to Anthropic by setting LLM_PROVIDER=anthropic.
// Both providers must return identical DisclosureResult shapes — enforced in their respective files.

import type { Env, DisclosureRequest, DisclosureResult } from '../types';
import { generateDisclosure as genOpenAI } from './openai';
import { generateDisclosure as genAnthropic } from './anthropic';

export async function generate(env: Env, req: DisclosureRequest): Promise<DisclosureResult> {
  const provider = (env.LLM_PROVIDER || 'openai').toLowerCase();

  if (provider === 'anthropic') {
    if (!env.ANTHROPIC_API_KEY) {
      throw new Error('LLM_PROVIDER=anthropic but ANTHROPIC_API_KEY is not set');
    }
    return genAnthropic(env.ANTHROPIC_API_KEY, req);
  }

  // default: openai
  if (!env.OPENAI_API_KEY) {
    throw new Error('LLM_PROVIDER=openai but OPENAI_API_KEY is not set');
  }
  return genOpenAI(env.OPENAI_API_KEY, req);
}
