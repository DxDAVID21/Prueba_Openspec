## 1. Project Setup

- [ ] 1.1 Initialize Next.js project with TypeScript and Tailwind CSS
- [ ] 1.2 Install dependencies: @tiptap/react, @tiptap/starter-kit, @tiptap/extension-code-block-lowlight, better-sqlite3, ollama, uuid
- [ ] 1.3 Install dev dependencies: Vitest, React Testing Library, @testing-library/jest-dom, tailwindcss-animate
- [ ] 1.4 Set up project folder structure: components/, lib/, pages/, db/, types/
- [ ] 1.5 Create SQLite database initialization module with schema for pages and blocks tables
- [ ] 1.6 Create Dockerfile for Next.js app container with multi-stage build

## 2. Database Layer

- [ ] 2.1 Implement pages table schema (id, title, parent_id, order, created_at, updated_at, schema_version)
- [ ] 2.2 Implement blocks table schema (id, page_id, type, content, order, metadata, created_at, updated_at)
- [ ] 2.3 Create database functions: createPage, getPage, updatePage, deletePage, getPageTree
- [ ] 2.4 Create database functions: createBlock, getBlocksByPage, updateBlock, deleteBlock, reorderBlocks
- [ ] 2.5 Add unit tests for all database functions with Vitest

## 3. Block Editor Component

- [ ] 3.1 Set up TipTap editor with StarterKit extension in a React component
- [ ] 3.2 Add CodeBlockLowlight extension for code block support with syntax highlighting
- [ ] 3.3 Implement block type switching via slash command menu
- [ ] 3.4 Add support for heading blocks (H1, H2, H3) with keyboard shortcuts
- [ ] 3.5 Add support for list blocks (bullet, ordered, todo checkbox)
- [ ] 3.6 Implement inline formatting toolbar (bold, italic, underline, strikethrough, code)
- [ ] 3.7 Add drag-and-drop block reordering with @dnd-kit/sortable
- [ ] 3.8 Write component tests for editor with React Testing Library

## 4. Page Management

- [ ] 4.1 Create sidebar component with collapsible page tree navigation
- [ ] 4.2 Implement page tree data structure and recursive rendering for nested pages
- [ ] 4.3 Add "New Page" and "Add Sub-page" buttons with create functionality
- [ ] 4.4 Create breadcrumb navigation component showing page hierarchy path
- [ ] 4.5 Implement page title editing with inline edit and auto-save
- [ ] 4.6 Add page delete with confirmation dialog and cascade delete for children
- [ ] 4.7 Implement search bar with real-time filtering of page titles and content
- [ ] 4.8 Write tests for page management components

## 5. Local AI Integration

- [ ] 5.1 Create Ollama client module with connection detection and health check
- [ ] 5.2 Implement AI content generation: send prompt to Ollama and stream response
- [ ] 5.3 Add "Generate with AI" button in editor with prompt input modal
- [ ] 5.4 Implement AI text summarization for selected text
- [ ] 5.5 Add AI writing assistance: continue writing, rephrase, fix grammar
- [ ] 5.6 Implement streaming response display with progressive text rendering
- [ ] 5.7 Create settings section for Ollama model selection (list local models)
- [ ] 5.8 Add onboarding notice when Ollama is not installed with setup instructions
- [ ] 5.9 Write tests for Ollama client with mocked responses

## 6. Responsive UI and Design System

- [ ] 6.1 Set up Tailwind CSS with custom Notion-like design tokens (colors, fonts, spacing)
- [ ] 6.2 Implement dark/light mode toggle with next-themes and persist preference
- [ ] 6.3 Create responsive layout: collapsible sidebar, adaptive content area
- [ ] 6.4 Add mobile responsive behavior: hamburger menu, full-width content
- [ ] 6.5 Create loading skeletons and empty states for pages and editor
- [ ] 6.6 Style toolbar, buttons, and action menus with professional Notion-like aesthetics
- [ ] 6.7 Add smooth transitions and hover states throughout the UI
- [ ] 6.8 Write visual regression tests for key UI components

## 7. Integration and Polish

- [ ] 7.1 Connect editor to database: auto-save blocks on change (debounced)
- [ ] 7.2 Connect page navigation: sidebar clicks load page content from DB
- [ ] 7.3 Integrate AI features into editor toolbar and selection context menu
- [ ] 7.4 Add error handling and user feedback (toasts) for all async operations
- [ ] 7.5 Test full app flow: create page, add content, use AI, navigate, delete
- [ ] 7.6 Run all tests and fix any failures
- [ ] 7.7 Final UI polish and responsiveness testing across screen sizes

## 8. Docker Setup

- [ ] 8.1 Create .dockerignore file to exclude node_modules, .git, and build artifacts
- [ ] 8.2 Create Dockerfile with multi-stage build: install deps, build Next.js, run production server
- [ ] 8.3 Create docker-compose.yml with app service and ollama service
- [ ] 8.4 Configure Docker Compose networking so app container can reach Ollama container
- [ ] 8.5 Add volume mounts for SQLite database persistence across container restarts
- [ ] 8.6 Add volume mount for Ollama models to avoid re-downloading on restart
- [ ] 8.7 Create .env.example with configurable options (ports, model name, DB path)
- [ ] 8.8 Configure Ollama container to auto-pull a default model on first start
- [ ] 8.9 Add README instructions for running with Docker Compose
- [ ] 8.10 Test full Docker setup: docker-compose up, verify app and AI features work
