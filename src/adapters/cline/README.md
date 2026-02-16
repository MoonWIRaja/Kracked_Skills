# KD Cline Adapter

## Overview
This adapter provides integration with [Cline](https://github.com/cline/cline) AI coding assistant.

## Installation

### Automatic Installation
Run the Kracked_Skills installer with the `--target=cline` flag:

```bash
bash install.sh --target=cline
```

### Manual Installation
1. Copy the `.clinerules` folder to your project root
2. Copy the contents of `workflows/` to `.clinerules/workflows/`
3. Restart Cline to load the new workflows

## Structure

```
.clinerules/
├── workflows/
│   ├── KD-help.md           # Help and command reference
│   ├── KD-analyze.md        # Discovery phase
│   ├── KD-brainstorm.md     # Ideation
│   ├── KD-product-brief.md  # Product brief
│   ├── KD-prd.md            # Product requirements
│   ├── KD-architecture.md   # System architecture
│   ├── KD-epics-and-stories.md  # Backlog creation
│   ├── KD-dev-story.md      # Story implementation
│   ├── KD-code-review.md    # Quality review
│   ├── KD-deployment-plan.md # Deployment strategy
│   ├── KD-status.md         # Project state
│   ├── KD-party-mode.md     # Multi-agent ideation
│   ├── KD-swarm.md          # Multi-agent execution
│   └── ...                  # More workflows
```

## Usage

In Cline, type any of the workflow names to activate:

```
KD-help          # Show command reference
KD-analyze       # Start discovery phase
KD-status        # Check project state
```

## Workflow Format

Each workflow file follows this format:

```markdown
---
name: 'workflow-name'
description: 'Workflow description'
disable-model-invocation: true
---

# Workflow Title

Instructions for the AI to execute this workflow.
```

## Features

- **Full KD Integration**: All 80+ KD commands available
- **Multi-Agent Support**: Party mode and agent swarm
- **Web Research**: AI searches for market data and best practices
- **Auto-Debug**: System auto-checks for errors
- **Output Organization**: All output in `.kracked/KD_output/`

## Official Site
https://krackeddevs.com/