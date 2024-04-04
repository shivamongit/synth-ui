<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Turborepo-2.1-EF4444?logo=turborepo&logoColor=white" alt="Turborepo" />
</p>

# Synth UI

**AI-powered UI component generator** — describe a component in plain English, get production-ready React + TypeScript code with a live preview.

Think [v0.dev](https://v0.dev) but self-hosted and extensible.

---

## Features

- **Natural language to code** — describe any UI component and get clean, typed code
- **Live preview** — see your component rendered in real-time with responsive viewports
- **Multi-framework** — React, Vue, Svelte, or plain HTML output
- **Multi-provider** — OpenAI GPT-4o or Anthropic Claude 3.5 Sonnet
- **Code editor** — syntax-highlighted output with copy/download
- **Component history** — favorites, recent generations, instant replay
- **Dark mode** — beautiful dark UI with glass morphism
- **Responsive preview** — mobile, tablet, desktop viewport simulation
- **Docker ready** — one command to run the full stack

## Architecture

```
synth-ui/
├── apps/
│   ├── web/              # React 18 + TypeScript + Vite + Tailwind
│   │   ├── src/
│   │   │   ├── components/   # UI components (Header, PromptInput, CodeEditor, Preview, etc.)
│   │   │   ├── store/        # Zustand state management
│   │   │   └── lib/          # API client, utilities
│   │   └── ...
│   └── api/              # Python FastAPI backend
│       ├── app/
│       │   ├── routes/       # REST endpoints (generate, health, history)
│       │   ├── services/     # AI provider integrations (OpenAI, Anthropic)
│       │   └── ...
│       └── tests/
├── packages/
│   └── shared/           # Shared TypeScript types & validators
├── docker-compose.yml
├── turbo.json
└── .github/workflows/ci.yml
```

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- OpenAI or Anthropic API key

### Development

```bash
# Clone
git clone https://github.com/shivamongit/synth-ui.git
cd synth-ui

# Install frontend dependencies
npm install

# Set up Python backend
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your API keys to .env

# Start API server
uvicorn app.main:app --reload --port 8000

# In another terminal — start frontend
cd ../..
npm run dev
```

### Docker

```bash
# Set API keys
export OPENAI_API_KEY=your-key
export ANTHROPIC_API_KEY=your-key

# Run full stack
docker compose up
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/generate` | Generate a component from a prompt |
| `GET` | `/api/v1/history` | List generation history |
| `GET` | `/api/v1/health` | Health check with provider status |

### Generate Request

```json
{
  "prompt": "A pricing card with three tiers and a monthly/yearly toggle",
  "framework": "react",
  "styling": "tailwind",
  "provider": "openai",
  "temperature": 0.7,
  "max_tokens": 4096
}
```

## Testing

```bash
# Frontend
cd apps/web && npm test

# Backend
cd apps/api && pytest tests/ -v
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion |
| Backend | Python 3.11, FastAPI, Pydantic, aiosqlite |
| AI | OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet |
| Infra | Docker, Turborepo, GitHub Actions CI |

## License

MIT
