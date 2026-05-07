## Context

This project builds a local-first Notion-like productivity application with integrated free local AI. The app runs entirely on the user's machine with no cloud dependencies. The user wants a professional, responsive UI that feels like Notion but works offline with local AI assistance via Ollama.

Current state: Greenfield project with no existing codebase.

Constraints:
- Local-only, no production deployment needed
- Free local AI (Ollama) with lower efficiency but acceptable for local use
- Must look professional and be responsive across screen sizes

## Goals / Non-Goals

**Goals:**
- Build a block-based rich text editor similar to Notion
- Implement hierarchical page management with sidebar navigation
- Integrate local Ollama AI for content assistance (summarization, generation, suggestions)
- Create a professional, responsive UI with dark/light mode
- Use SQLite for local data persistence
- Include testing setup for local development
- Provide Docker and Docker Compose setup for easy local deployment

**Non-Goals:**
- No cloud synchronization or multi-device support
- No user authentication or multi-user support
- No production deployment, CI/CD, or hosting configuration
- No real-time collaboration features
- No mobile native app (web app with responsive design only)

## Decisions

### Technology Stack: Next.js + TypeScript + Tailwind CSS
**Decision**: Use Next.js with App Router, TypeScript, and Tailwind CSS.
**Rationale**: Next.js provides excellent React tooling with hot reload for local development. TypeScript adds type safety. Tailwind enables rapid professional UI development with built-in responsive design.
**Alternatives considered**: Vite + React (simpler but less tooling), Remix (similar but smaller ecosystem), plain CSS (too slow for professional UI).

### Block Editor: TipTap
**Decision**: Use TipTap (ProseMirror-based) for the block-based editor.
**Rationale**: TipTap is the same foundation Notion uses conceptually. It provides excellent block editing, extensions for all Notion-like blocks (headings, lists, code, embeds), and React integration.
**Alternatives considered**: Slate.js (more custom but more work), Quill (less extensible), Draft.js (deprecated).

### Local Database: SQLite via better-sqlite3
**Decision**: Use SQLite with better-sqlite3 for local data persistence.
**Rationale**: SQLite is perfect for local-first apps - single file, no server, fast, reliable. better-sqlite3 is synchronous and faster than sqlite3 with async API.
**Alternatives considered**: IndexedDB (browser-only, not suitable for Electron/Node), localStorage (too limited), JSON files (no querying).

### Local AI: Ollama with Node.js client
**Decision**: Integrate Ollama running locally with the `ollama` npm package.
**Rationale**: Ollama is free, runs locally, supports many open models (Llama 3.2, Mistral, etc.), and has a simple API. The npm package provides easy Node.js integration.
**Alternatives considered**: LM Studio (GUI-only, harder to integrate), GPT4All (less model support), calling OpenAI API (not local, not free).

### Testing: Vitest + React Testing Library
**Decision**: Use Vitest and React Testing Library for unit and component testing.
**Rationale**: Vitest is fast, works well with Next.js, and React Testing Library is the standard for testing React components. Both are free and local.
**Alternatives considered**: Jest (slower, more config), Cypress (overkill for local testing).

### App Delivery: Next.js dev server (local only)
**Decision**: Run the app via `next dev` for local usage, no build/production setup.
**Rationale**: Since this is local-only, the dev server is sufficient. It provides hot reload and all features without production optimization overhead.
**Alternatives considered**: Electron (adds complexity), Tauri (Rust learning curve), static build (no API routes for AI).

### Local Deployment: Docker + Docker Compose
**Decision**: Provide Docker and Docker Compose configuration to run the app and Ollama together in containers.
**Rationale**: Docker simplifies local setup - user only needs Docker installed, not Node.js, Ollama, or any dependencies. Docker Compose orchestrates the app container and Ollama container with proper networking.
**Alternatives considered**: Manual setup scripts (error-prone), npm scripts only (requires Node.js installed), Electron distribution (overkill for web app).

## Risks / Trade-offs

- **[Low AI Performance]** → Ollama with smaller models (3B-7B) is slower and less capable than cloud AI. Mitigation: Set user expectations, allow model selection, show loading states.
- **[SQLite Concurrent Access]** → SQLite has limited concurrent writes. Mitigation: Single-user local app, no concurrency issues in practice.
- **[Next.js Dev Server]** → Running via dev server means no production optimizations. Mitigation: Acceptable for local-only use case.
- **[Ollama Dependency]** → User must install Ollama separately. Mitigation: Add clear setup instructions and detect/guide on first run.
