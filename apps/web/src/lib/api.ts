import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export interface GeneratePayload {
  prompt: string;
  framework: string;
  styling: string;
  provider: string;
  temperature: number;
  max_tokens: number;
}

export interface GenerateResult {
  id: string;
  code: string;
  language: string;
  framework: string;
  styling: string;
  provider: string;
  tokens_used: number;
  created_at: string;
}

export async function generateComponent(payload: GeneratePayload): Promise<GenerateResult> {
  const { data } = await api.post<GenerateResult>('/api/v1/generate', payload);
  return data;
}

export async function getHistory(): Promise<GenerateResult[]> {
  const { data } = await api.get<GenerateResult[]>('/api/v1/history');
  return data;
}

export async function getHealth() {
  const { data } = await api.get('/api/v1/health');
  return data;
}

export async function exportComponent(id: string, options: Record<string, boolean>) {
  const { data } = await api.post(`/api/v1/export/${id}`, options);
  return data;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  },
);

export default api;
