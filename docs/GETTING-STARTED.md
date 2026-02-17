# Getting Started with KD v5.0.0

## Prerequisites

- **bash** (version 4.0+)
- **curl** or **wget**
- One of the supported AI tools:
  - Claude Code
  - Cursor
  - Antigravity (Google Gemini)
  - Cline
  - Kilo Code
  - Roo Code
  - Any AI tool with custom instructions support

## Installation

### Step 1: Install KD

Run in your project root directory:

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/install.sh | bash

# Windows PowerShell
irm https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/install.ps1 | iex
```

The installer will:
1. Ask which AI tool you're using
2. Ask your preferred language (EN/MS)
3. Create the `.kracked/` directory with all system files
4. Set up the adapter for your chosen AI tool
5. Initialize `status.md` for project state tracking

### Step 2: Start Your First Session

Open your AI tool and type:

```
/KD-analyze
```

This activates the **Analyst** role and begins the **Discovery** stage.

### Step 3: Follow the Workflow

KD guides you through 8 stages:

1. **Discovery** — Understand the project
2. **Brainstorm** — Ideate solutions
3. **Requirements** — Define what to build
4. **Architecture** — Design the system
5. **Implementation** — Write the code
6. **Quality** — Review and audit
7. **Deployment** — Ship it
8. **Release** — Document and close

## New Features in v5.0.0

### 13 Specialized Roles
- Analyst, Product Manager, Architect, Tech Lead, Engineer
- QA, Security, DevOps, Release Manager
- **NEW**: UX Designer, Data Scientist, Mobile Developer, Database Admin

### Intelligent Tool Selection
```
/KD-tool-selector --type=web --scale=medium
```
Get context-aware tech stack recommendations.

### TestSprite Integration
```
/KD-test-sprite --url=http://localhost:3000
```
Automated visual and functional testing.

### 6 AI Tool Adapters
- Claude Code (`CLAUDE.md`)
- Cursor (`.cursorrules`)
- Antigravity (`.antigravity/SKILL.md`)
- Cline (`.clinerules`)
- Kilo Code (`.kilocode`)
- Roo Code (`.roo`)

## Configuration

Settings are stored in `.kracked/config/settings.json`:

```json
{
  "version": "5.0.0",
  "language": "EN",
  "target_tool": "claude-code",
  "project_name": "My Project"
}
```

## Next Steps

- Read the [Commands Reference](COMMANDS.md) for all 120+ available commands
- Read the [Architecture Guide](ARCHITECTURE.md) to understand the system
- Read the [Contributing Guide](CONTRIBUTING.md) to contribute

---

*KD finishes what it starts. | KRACKEDDEVS | https://krackeddevs.com/*