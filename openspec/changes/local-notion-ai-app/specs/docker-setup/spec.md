## ADDED Requirements

### Requirement: Dockerfile for Next.js app
The system SHALL provide a Dockerfile to build and run the Next.js app in a container for local deployment.

#### Scenario: App container builds successfully
- **WHEN** user runs `docker build -t local-notion-ai .`
- **THEN** a Docker image is created with the app ready to run

#### Scenario: App container runs and serves the app
- **WHEN** user runs the app container
- **THEN** the Next.js app is accessible on the configured port (e.g., localhost:3000)

### Requirement: Docker Compose configuration
The system SHALL provide a docker-compose.yml that orchestrates the app container and Ollama container together.

#### Scenario: Full stack starts with docker compose
- **WHEN** user runs `docker-compose up`
- **THEN** both the app and Ollama containers start with proper networking between them

#### Scenario: Ollama container pulls model automatically
- **WHEN** the Ollama container starts for the first time
- **THEN** it automatically pulls a default model (e.g., llama3.2:3b) for immediate use

### Requirement: Volume mounting for data persistence
The system SHALL use Docker volumes to persist SQLite database data across container restarts.

#### Scenario: Database persists after container restart
- **WHEN** user creates pages and blocks, then restarts the container
- **THEN** all data is preserved because the SQLite database is stored in a mounted volume

### Requirement: Environment configuration
The system SHALL provide an .env.example file and support environment variables for Docker deployment configuration.

#### Scenario: User configures via environment variables
- **WHEN** user sets environment variables (port, model name, etc.)
- **THEN** the containers use these values when starting

#### Scenario: .env.example is provided
- **WHEN** user clones the repo
- **THEN** an .env.example file is available showing all configurable options

### Requirement: Docker ignore file
The system SHALL include a .dockerignore file to exclude unnecessary files from the Docker build context.

#### Scenario: Docker build context is optimized
- **WHEN** user builds the Docker image
- **THEN** node_modules, .git, and other unnecessary files are excluded from the build context
