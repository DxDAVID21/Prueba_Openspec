# NotionAI - Local Knowledge Base

A local-first Notion-like productivity app with integrated free local AI for content assistance. Runs entirely offline with no cloud dependencies.

## Features

- **Block-based editor** - Notion-style editing with headings, lists, code blocks, and formatting
- **Hierarchical pages** - Nested page structure with sidebar navigation
- **Local AI** - AI-powered content generation, summarization, and writing assistance via Ollama
- **Dark/Light mode** - Professional UI with theme switching
- **Responsive** - Works on desktop, tablet, and mobile
- **Local storage** - SQLite database for offline persistence

## Quick Start

### Option 1: Run with Node.js (development)

```bash
# Install dependencies
cd app
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: For AI features, you need [Ollama](https://ollama.com) installed and running locally.

### Option 2: Run with Docker Compose (recommended)

```bash
# Build and start everything
docker-compose up --build
```

This starts both the app and Ollama containers. The app is available at [http://localhost:3000](http://localhost:3000).

## Configuration

Copy `.env.example` to `.env` and customize:

```env
APP_PORT=3000
OLLAMA_PORT=11434
OLLAMA_MODEL=llama3.2:3b
```

## Project Structure

```
app/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes (pages, blocks, AI)
│   │   └── page.tsx      # Main page
│   ├── components/       # React components
│   │   ├── app-layout.tsx
│   │   ├── sidebar.tsx
│   │   ├── editor.tsx
│   │   ├── formatting-toolbar.tsx
│   │   └── ai-toolbar.tsx
│   ├── db/               # SQLite database layer
│   │   ├── index.ts      # DB initialization
│   │   ├── pages.ts      # Page CRUD
│   │   └── blocks.ts     # Block CRUD
│   └── types/            # TypeScript types
├── Dockerfile
├── docker-compose.yml
├── vitest.config.ts
└── package.json
```

## Tech Stack

- **Framework**: Next.js 16 + TypeScript
- **Editor**: TipTap (ProseMirror-based)
- **Styling**: Tailwind CSS v4
- **Database**: SQLite (better-sqlite3)
- **AI**: Ollama (local LLM)
- **Testing**: Vitest + React Testing Library
- **Deployment**: Docker + Docker Compose

## AI Setup

The app uses [Ollama](https://ollama.com) for local AI. When running with Docker Compose, Ollama is included automatically. For manual setup:

1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull a model: `ollama pull llama3.2:3b`
3. Start Ollama: `ollama serve`
4. The app will detect Ollama automatically on startup

## Running Tests

```bash
npm run test
```

## License

MIT
