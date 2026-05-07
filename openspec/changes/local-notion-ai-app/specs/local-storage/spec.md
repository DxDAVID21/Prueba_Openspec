## ADDED Requirements

### Requirement: SQLite database initialization
The system SHALL initialize a local SQLite database on first run for storing pages and blocks.

#### Scenario: First run creates database
- **WHEN** the app runs for the first time
- **THEN** a SQLite database file is created at the configured local path

#### Scenario: Subsequent runs use existing database
- **WHEN** the app runs and a database file already exists
- **THEN** the existing database is used without reinitialization

### Requirement: Page persistence
The system SHALL persist page data (title, parent_id, order, created_at, updated_at) to SQLite.

#### Scenario: Page is saved on creation
- **WHEN** user creates a new page
- **THEN** the page is inserted into the pages table with a unique ID

#### Scenario: Page updates are saved
- **WHEN** user modifies a page title or content
- **THEN** the changes are persisted to the database and updated_at is refreshed

### Requirement: Block persistence
The system SHALL persist block data (page_id, type, content, order, metadata) to SQLite.

#### Scenario: Blocks are saved when editor content changes
- **WHEN** user edits content in the block editor
- **THEN** the blocks are persisted to the database with their current order and content

#### Scenario: Block order is preserved
- **WHEN** user reorders blocks via drag-and-drop
- **THEN** the new order is persisted to the database

### Requirement: Data retrieval
The system SHALL efficiently retrieve pages and blocks from SQLite with proper relationships.

#### Scenario: Page loads with all its blocks
- **WHEN** user navigates to a page
- **THEN** the page data and all its blocks are loaded from the database in correct order

#### Scenario: Page tree is loaded for sidebar
- **WHEN** the sidebar loads
- **THEN** all pages are retrieved with their parent-child relationships to build the tree

### Requirement: Database migration support
The system SHALL support simple schema migrations for future updates.

#### Scenario: Schema version is tracked
- **WHEN** the database is initialized
- **THEN** a schema version is stored to enable future migrations
