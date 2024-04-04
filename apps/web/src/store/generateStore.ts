import { create } from 'zustand';

export type ComponentFramework = 'react' | 'vue' | 'svelte' | 'html';
export type StyleFramework = 'tailwind' | 'css-modules' | 'styled-components' | 'vanilla';
export type AIProvider = 'openai' | 'anthropic';

interface HistoryItem {
  id: string;
  prompt: string;
  code: string;
  framework: ComponentFramework;
  createdAt: string;
  isFavorite: boolean;
}

interface GenerateState {
  prompt: string;
  generatedCode: string;
  isGenerating: boolean;
  framework: ComponentFramework;
  styling: StyleFramework;
  provider: AIProvider;
  temperature: number;
  darkMode: boolean;
  showGrid: boolean;
  viewport: 'mobile' | 'tablet' | 'desktop';
  history: HistoryItem[];
  error: string | null;

  setPrompt: (prompt: string) => void;
  setGeneratedCode: (code: string) => void;
  setIsGenerating: (val: boolean) => void;
  setFramework: (fw: ComponentFramework) => void;
  setStyling: (s: StyleFramework) => void;
  setProvider: (p: AIProvider) => void;
  setTemperature: (t: number) => void;
  toggleDarkMode: () => void;
  toggleGrid: () => void;
  setViewport: (v: 'mobile' | 'tablet' | 'desktop') => void;
  addToHistory: (item: HistoryItem) => void;
  toggleFavorite: (id: string) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  setError: (err: string | null) => void;
  reset: () => void;
}

export const useGenerateStore = create<GenerateState>((set) => ({
  prompt: '',
  generatedCode: '',
  isGenerating: false,
  framework: 'react',
  styling: 'tailwind',
  provider: 'openai',
  temperature: 0.7,
  darkMode: true,
  showGrid: false,
  viewport: 'desktop',
  history: [],
  error: null,

  setPrompt: (prompt) => set({ prompt }),
  setGeneratedCode: (generatedCode) => set({ generatedCode }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setFramework: (framework) => set({ framework }),
  setStyling: (styling) => set({ styling }),
  setProvider: (provider) => set({ provider }),
  setTemperature: (temperature) => set({ temperature }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  setViewport: (viewport) => set({ viewport }),
  addToHistory: (item) => set((s) => ({ history: [item, ...s.history].slice(0, 50) })),
  toggleFavorite: (id) =>
    set((s) => ({
      history: s.history.map((h) => (h.id === id ? { ...h, isFavorite: !h.isFavorite } : h)),
    })),
  removeFromHistory: (id) => set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
  clearHistory: () => set({ history: [] }),
  setError: (error) => set({ error }),
  reset: () => set({ prompt: '', generatedCode: '', isGenerating: false, error: null }),
}));
