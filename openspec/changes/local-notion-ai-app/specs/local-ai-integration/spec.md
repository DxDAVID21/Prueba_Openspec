## ADDED Requirements

### Requirement: AI content generation
The system SHALL allow users to generate content using the local Ollama AI by providing a prompt.

#### Scenario: User generates content from prompt
- **WHEN** user types a prompt and clicks "Generate with AI"
- **THEN** the system calls Ollama locally and inserts the generated text into the editor

#### Scenario: AI generation shows loading state
- **WHEN** the AI is processing a generation request
- **THEN** a loading indicator is displayed and the editor is disabled until completion

### Requirement: AI text summarization
The system SHALL allow users to summarize selected text using the local AI.

#### Scenario: User summarizes selected content
- **WHEN** user selects text and clicks "Summarize with AI"
- **THEN** the system returns a concise summary of the selected text

### Requirement: AI writing assistance
The system SHALL provide AI-powered writing suggestions (continue writing, rephrase, fix grammar).

#### Scenario: User requests AI to continue writing
- **WHEN** user places cursor and clicks "Continue writing"
- **THEN** the AI generates text that continues from the current cursor position

#### Scenario: User requests AI to rephrase text
- **WHEN** user selects text and clicks "Rephrase"
- **THEN** the AI provides alternative phrasings for the selected text

### Requirement: Ollama connection detection
The system SHALL detect whether Ollama is running locally and guide the user if not.

#### Scenario: Ollama is not running
- **WHEN** the app starts and Ollama is not detected
- **THEN** a notice is displayed with instructions to install and start Ollama

#### Scenario: Ollama is running
- **WHEN** the app starts and Ollama is detected
- **THEN** the AI features are enabled and ready to use

### Requirement: Model selection
The system SHALL allow users to select which Ollama model to use for AI features.

#### Scenario: User selects AI model
- **WHEN** user opens settings and selects a different model from the dropdown
- **THEN** subsequent AI requests use the selected model

### Requirement: AI response streaming
The system SHALL stream AI responses token-by-token for better UX.

#### Scenario: AI response appears progressively
- **WHEN** the AI generates a response
- **THEN** text appears progressively as tokens are received, not all at once
