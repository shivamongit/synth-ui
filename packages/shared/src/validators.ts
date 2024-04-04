import type { GenerateRequest } from './types';
import { MAX_PROMPT_LENGTH } from './constants';

export function validateGenerateRequest(req: Partial<GenerateRequest>): string[] {
  const errors: string[] = [];

  if (!req.prompt || req.prompt.trim().length === 0) {
    errors.push('Prompt is required');
  }

  if (req.prompt && req.prompt.length > MAX_PROMPT_LENGTH) {
    errors.push(`Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer`);
  }

  if (req.framework && !['react', 'vue', 'svelte', 'html'].includes(req.framework)) {
    errors.push('Invalid framework. Must be one of: react, vue, svelte, html');
  }

  if (req.styling && !['tailwind', 'css-modules', 'styled-components', 'vanilla'].includes(req.styling)) {
    errors.push('Invalid styling framework');
  }

  if (req.provider && !['openai', 'anthropic'].includes(req.provider)) {
    errors.push('Invalid AI provider. Must be one of: openai, anthropic');
  }

  if (req.temperature !== undefined && (req.temperature < 0 || req.temperature > 2)) {
    errors.push('Temperature must be between 0 and 2');
  }

  if (req.maxTokens !== undefined && (req.maxTokens < 100 || req.maxTokens > 16384)) {
    errors.push('Max tokens must be between 100 and 16384');
  }

  return errors;
}

export function sanitizePrompt(prompt: string): string {
  return prompt.trim().replace(/\s+/g, ' ').slice(0, MAX_PROMPT_LENGTH);
}
