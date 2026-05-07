## ADDED Requirements

### Requirement: Block-based editor with rich text blocks
The system SHALL provide a block-based editor where each block is a distinct content unit (paragraph, heading, list item, code block, etc.) using TipTap.

#### Scenario: User creates a paragraph block
- **WHEN** user types in an empty block
- **THEN** a paragraph block is created with the typed text

#### Scenario: User creates a heading block
- **WHEN** user types `# ` at the start of a block
- **THEN** the block converts to a heading level 1

#### Scenario: User creates a code block
- **WHEN** user types ``` at the start of a block
- **THEN** the block converts to a code block with syntax highlighting

### Requirement: Block type switching
The system SHALL allow users to change block types via slash commands or toolbar.

#### Scenario: User switches block type via slash command
- **WHEN** user types `/heading` in a block
- **THEN** a menu appears with heading options and selecting one converts the block

#### Scenario: User switches block type via toolbar
- **WHEN** user clicks the block type button in the toolbar and selects a new type
- **THEN** the current block converts to the selected type

### Requirement: Block reordering
The system SHALL allow users to drag and reorder blocks within a page.

#### Scenario: User drags block to new position
- **WHEN** user drags a block handle to a new position
- **THEN** the block moves to the new position in the page

### Requirement: List blocks support
The system SHALL support bulleted lists, numbered lists, and to-do checkbox blocks.

#### Scenario: User creates a bulleted list
- **WHEN** user types `- ` or `* ` at the start of a block
- **THEN** the block converts to a bulleted list item

#### Scenario: User creates a to-do block
- **WHEN** user types `[ ]` at the start of a block
- **THEN** the block converts to a to-do checkbox block

#### Scenario: User toggles to-do completion
- **WHEN** user clicks the checkbox in a to-do block
- **THEN** the checkbox toggles between checked and unchecked state

### Requirement: Inline formatting
The system SHALL support inline text formatting: bold, italic, underline, strikethrough, and code.

#### Scenario: User applies bold formatting
- **WHEN** user selects text and presses Ctrl+B or uses the toolbar
- **THEN** the selected text is formatted as bold

#### Scenario: User applies inline code
- **WHEN** user selects text and presses Ctrl+E or uses backticks
- **THEN** the selected text is formatted as inline code
