## 1. Project Setup

- [x] 1.1 Initialize Next.js project with TypeScript and Tailwind CSS
- [x] 1.2 Install dependencies: @tiptap/react, @tiptap/starter-kit, @tiptap/extension-code-block-lowlight, better-sqlite3, ollama, uuid
- [x] 1.3 Install dev dependencies: Vitest, React Testing Library, @testing-library/jest-dom, tailwindcss-animate
- [x] 1.4 Set up project folder structure: components/, lib/, pages/, db/, types/
- [x] 1.5 Create SQLite database initialization module with schema for pages and blocks tables
- [x] 1.6 Create Dockerfile for Next.js app container with multi-stage build

## 2. Database Layer

- [x] 2.1 Implement pages table schema (id, title, parent_id, order, created_at, updated_at, schema_version)
- [x] 2.2 Implement blocks table schema (id, page_id, type, content, order, metadata, created_at, updated_at)
- [x] 2.3 Create database functions: createPage, getPage, updatePage, deletePage, getPageTree
- [x] 2.4 Create database functions: createBlock, getBlocksByPage, updateBlock, deleteBlock, reorderBlocks
- [x] 2.5 Add unit tests for all database functions with Vitest

## 3. Block Editor Component

- [x] 3.1 Set up TipTap editor with StarterKit extension in a React component
- [x] 3.2 Add CodeBlockLowlight extension for code block support with syntax highlighting
- [x] 3.3 Implement block type switching via slash command menu
- [x] 3.4 Add support for heading blocks (H1, H2, H3) with keyboard shortcuts
- [x] 3.5 Add support for list blocks (bullet, ordered, todo checkbox)
- [x] 3.6 Implement inline formatting toolbar (bold, italic, underline, strikethrough, code)
- [ ] 3.7 Add drag-and-drop block reordering with @dnd-kit/sortable
- [ ] 3.8 Write component tests for editor with React Testing Library

## 4. Page Management

- [x] 4.1 Create sidebar component with collapsible page tree navigation
- [x] 4.2 Implement page tree data structure and recursive rendering for nested pages
- [x] 4.3 Add "New Page" and "Add Sub-page" buttons with create functionality
- [x] 4.4 Create breadcrumb navigation component showing page hierarchy path
- [ ] 4.5 Implement page title editing with inline edit and auto-save
- [ ] 4.6 Add page delete with confirmation dialog and cascade delete for children
- [x] 4.7 Implement search bar with real-time filtering of page titles and content
- [ ] 4.8 Write tests for page management components

## 5. Local AI Integration

- [x] 5.1 Create Ollama client module with connection detection and health check
- [x] 5.2 Implement AI content generation: send prompt to Ollama and stream response
- [x] 5.3 Add "Generate with AI" button in editor with prompt input modal
- [x] 5.4 Implement AI text summarization for selected text
- [x] 5.5 Add AI writing assistance: continue writing, rephrase, fix grammar
- [ ] 5.6 Implement streaming response display with progressive text rendering
- [ ] 5.7 Create settings section for Ollama model selection (list local models)
- [x] 5.8 Add onboarding notice when Ollama is not installed with setup instructions
- [ ] 5.9 Write tests for Ollama client with mocked responses

## 6. Responsive UI and Design System

- [x] 6.1 Set up Tailwind CSS with custom Notion-like design tokens (colors, fonts, spacing)
- [x] 6.2 Implement dark/light mode toggle with next-themes and persist preference
- [x] 6.3 Create responsive layout: collapsible sidebar, adaptive content area
- [x] 6.4 Add mobile responsive behavior: hamburger menu, full-width content
- [x] 6.5 Create loading skeletons and empty states for pages and editor
- [x] 6.6 Style toolbar, buttons, and action menus with professional Notion-like aesthetics
- [x] 6.7 Add smooth transitions and hover states throughout the UI
- [ ] 6.8 Write visual regression tests for key UI components

## 7. Integration and Polish

- [x] 7.1 Connect editor to database: auto-save blocks on change (debounced)
- [x] 7.2 Connect page navigation: sidebar clicks load page content from DB
- [x] 7.3 Integrate AI features into editor toolbar and selection context menu
- [x] 7.4 Add error handling and user feedback (toasts) for all async operations
- [ ] 7.5 Test full app flow: create page, add content, use AI, navigate, delete
- [ ] 7.6 Run all tests and fix any failures
- [ ] 7.7 Final UI polish and responsiveness testing across screen sizes

## 8. Docker Setup

- [x] 8.1 Create .dockerignore file to exclude node_modules, .git, and build artifacts
- [x] 8.2 Create Dockerfile with multi-stage build: install deps, build Next.js, run production server
- [x] 8.3 Create docker-compose.yml with app service and ollama service
- [x] 8.4 Configure Docker Compose networking so app container can reach Ollama container
- [x] 8.5 Add volume mounts for SQLite database persistence across container restarts
- [x] 8.6 Add volume mount for Ollama models to avoid re-downloading on restart
- [x] 8.7 Create .env.example with configurable options (ports, model name, DB path)
- [x] 8.8 Configure Ollama container to auto-pull a default model on first start
- [x] 8.9 Add README instructions for running with Docker Compose
- [ ] 8.10 Test full Docker setup: docker-compose up, verify app and AI features work
