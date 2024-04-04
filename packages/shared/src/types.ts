export type ComponentFramework = 'react' | 'vue' | 'svelte' | 'html';
export type StyleFramework = 'tailwind' | 'css-modules' | 'styled-components' | 'vanilla';
export type AIProvider = 'openai' | 'anthropic';

export interface GenerateRequest {
  prompt: string;
  framework: ComponentFramework;
  styling: StyleFramework;
  provider: AIProvider;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResponse {
  id: string;
  code: string;
  language: string;
  framework: ComponentFramework;
  styling: StyleFramework;
  provider: AIProvider;
  tokensUsed: number;
  createdAt: string;
}

export interface ComponentHistoryItem {
  id: string;
  prompt: string;
  code: string;
  framework: ComponentFramework;
  styling: StyleFramework;
  createdAt: string;
  isFavorite: boolean;
}

export interface APIError {
  detail: string;
  code: string;
  status: number;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  providers: Record<AIProvider, boolean>;
  uptime: number;
}

export interface PreviewConfig {
  darkMode: boolean;
  showGrid: boolean;
  responsive: boolean;
  viewport: 'mobile' | 'tablet' | 'desktop';
}

export interface ExportOptions {
  includeImports: boolean;
  includeTypes: boolean;
  wrapInComponent: boolean;
  fileName: string;
}
