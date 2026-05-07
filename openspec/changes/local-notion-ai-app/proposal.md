## Why

Build a local-first Notion-like productivity app with integrated free local AI for content assistance. This solves the need for a professional, privacy-focused knowledge management tool that runs entirely offline with AI capabilities at no cost.

## What Changes

- New local desktop/web app with block-based editor (Notion-style)
- Hierarchical page management with nested documents
- Local AI integration using Ollama for content generation, summarization, and assistance
- Professional, responsive UI using Tailwind CSS
- Local SQLite database for offline-first data persistence
- Testing setup with Vitest and React Testing Library
- Docker setup for easy local deployment with Ollama and app containerized

## Capabilities

### New Capabilities
- `block-editor`: Block-based rich text editor with support for paragraphs, headings, lists, code blocks, and embeds using TipTap
- `page-management`: Hierarchical page structure with nested pages, sidebar navigation, and breadcrumbs
- `local-ai-integration`: Integration with Ollama local LLM for AI-powered content suggestions, summarization, and writing assistance
- `local-storage`: SQLite-based local data persistence with CRUD operations for pages and blocks
- `responsive-ui`: Professional responsive UI with Tailwind CSS, dark/light mode, and Notion-like design system
- `docker-setup`: Docker and Docker Compose configuration for containerized local deployment with Ollama service

### Modified Capabilities

(No existing capabilities to modify)

## Impact

- New codebase: Next.js + TypeScript + Tailwind CSS + SQLite stack
- New dependencies: @tiptap/react, better-sqlite3, ollama (Node.js client), Vitest, React Testing Library
- Local-only architecture: no cloud services, no production deployment concerns
- AI model: requires local Ollama installation with a free model (e.g., Llama 3.2 3B)
