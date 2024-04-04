import type { ComponentFramework, StyleFramework, AIProvider } from './types';

export const FRAMEWORKS: Record<ComponentFramework, string> = {
  react: 'React + TypeScript',
  vue: 'Vue 3 + TypeScript',
  svelte: 'Svelte',
  html: 'Plain HTML',
};

export const STYLE_FRAMEWORKS: Record<StyleFramework, string> = {
  tailwind: 'Tailwind CSS',
  'css-modules': 'CSS Modules',
  'styled-components': 'Styled Components',
  vanilla: 'Vanilla CSS',
};

export const AI_PROVIDERS: Record<AIProvider, string> = {
  openai: 'OpenAI GPT-4o',
  anthropic: 'Anthropic Claude 3.5',
};

export const DEFAULT_TEMPERATURE = 0.7;
export const DEFAULT_MAX_TOKENS = 4096;
export const MAX_PROMPT_LENGTH = 2000;
export const MAX_HISTORY_ITEMS = 50;

export const API_ENDPOINTS = {
  generate: '/api/v1/generate',
  history: '/api/v1/history',
  health: '/api/v1/health',
  export: '/api/v1/export',
} as const;

export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
} as const;
