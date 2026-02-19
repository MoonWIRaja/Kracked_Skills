# KD System Architecture v5.0.0

## Overview

KD operates as a prompt-based system that guides AI tools through a structured product development workflow. It does not require a runtime — the system is entirely file-based.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     AI TOOL                                 │
│  (Claude Code / Cursor / Antigravity / Cline /              │
│   Kilo Code / Roo)                                          │
├─────────────────────────────────────────────────────────────┤
│                     ADAPTER                                 │
│  (CLAUDE.md / .cursorrules / SKILL.md /                     │
│   .clinerules / .kilocode / .roo)                           │
├─────────────────────────────────────────────────────────────┤
│                  SYSTEM PROMPT                              │
│              (system-prompt.md)                             │
├──────────┬──────────┬──────────┬──────────┬────────────────┤
│  ROLES   │  STAGES  │ MULTI-   │   TOOL     │ TESTSPRITE    │
│  (13)    │  (8)     │  AGENT   │  SELECTOR  │               │
├──────────┴──────────┴──────────┴──────────┴────────────────┤
│        TEMPLATES (9)  │  CHECKLISTS (6)  │  WORKFLOWS │  ANALYTICS │
├─────────────────────────────────────────────────────────────┤
│                  status.md                              │
│            (Persistent State)                             │
└─────────────────────────────────────────────────────────────┘
```

## Components

### Adapter Layer
Translates KD system prompt into tool-specific format:

- **Claude Code**: `CLAUDE.md`
- **Cursor**: `.cursorrules`
- **Antigravity**: `.antigravity/SKILL.md`
- **Cline**: `.clinerules`
- **Kilo Code**: `.kilocode`
- **Roo Code**: `.roo`

### System Prompt
Core instructions, rules, role/stage definitions:
- `system-prompt.md` — single source of truth

### Roles (13 Specialized)

| Role | Prefix | Focus |
|-------|---------|--------|
| Analyst | `[ANALYST]` | Discovery, risks, scale assessment |
| Product Manager | `[PM]` | Product brief, PRD, requirements |
| Architect | `[ARCH]` | System design, tech stack, decisions |
| Tech Lead | `[TL]` | Epics, stories, technical planning |
| Engineer | `[ENG]` | Code implementation, testing |
| QA | `[QA]` | Code review, test coverage |
| Security | `[SEC]` | Security audit, vulnerability assessment |
| DevOps | `[DEVOPS]` | Deployment, CI/CD, monitoring |
| Release Manager | `[RM]` | Release notes, versioning |
| UX Designer | `[UX]` | Wireframes, user flows, accessibility |
| Data Scientist | `[DATA]` | Data pipelines, ML models, analytics |
| Mobile Developer | `[MOBILE]` | iOS, Android, cross-platform development |
| Database Admin | `[DBA]` | Schema design, query optimization, migrations |

### Stages (8 Sequential)

1. **Discovery** — Understand the project
2. **Brainstorm** — Ideate solutions
3. **Requirements** — Define what to build
4. **Architecture** — Design the system
5. **Implementation** — Write the code
6. **Quality** — Review and audit
7. **Deployment** — Ship it
8. **Release** — Document and close

### Multi-Agent

- **Party Mode** for ideation
- **Agent Swarm** for execution
- **Confidence scoring** and conflict resolution
- **Personality profiles** for agents

### Tool Selector

- Context-aware technology recommendations
- Scoring engine for frameworks, databases, tools
- Knowledge base with performance metrics

### TestSprite

- Automated visual regression testing
- Functional testing (Puppeteer)
- Accessibility testing (WCAG 2.1)
- Performance metrics

### Templates & Checklists

- 9 document templates for consistent outputs
- 6 quality checklists for systematic verification

### Config & Language

- JSON-based configuration
- Dual language support (EN/MS)

### Analytics

- Agent performance tracking
- Decision history
- Consensus metrics

### Status Tracking

- `status.md` — persistent project state
- Updated after every major action
- Read at every session start

## Data Flow

```
User Command → Adapter → System Prompt → Role Activation → Stage Execution → Template/Checklist → status.md Update
```

## New in v5.0.0

- 4 new roles: UX Designer, Data Scientist, Mobile Developer, DBA
- 3 new adapters: Cline, Kilo Code, Roo Code
- TestSprite integration for automated testing
- Intelligent Tool Selector with scoring engine
- Analytics dashboard for agent performance
- Git integration with auto-commit
- Export utilities (PDF, Jira, consolidated markdown)

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/*
