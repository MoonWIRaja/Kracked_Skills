# 📖 KD v5.0.0 — DOKUMENTASI SISTEM LENGKAP
## "Semak Full System, Fungsi, Cara Guna"
**KRACKEDDEVS | 2026**

---

# 📋 ISI KANDUNGAN

1. [Gambaran Keseluruhan System](#1-gambaran-keseluruhan)
2. [Struktur Folder & Fail](#2-struktur-folder--fail)
3. [Roles System](#3-roles-system)
4. [Skills System](#4-skills-system)
5. [Commands System](#5-commands-system)
6. [Tools System](#6-tools-system)
7. [Templates System](#7-templates-system)
8. [Workflows System](#8-workflows-system)
9. [Multi-Agent System](#9-multi-agent-system)
10. [Cara Guna Step-by-Step](#10-cara-guna-step-by-step)
11. [Issues & Solutions](#11-issues--solutions)

---

# 1. GAMBARAN KESELURUHAN SYSTEM

## 1.1 Apa Itu KD?

**KD (Kracked_Skills)** adalah sistem AI-assisted development yang membantu pembangunan projek dari A ke Z.

```
┌─────────────────────────────────────────────────────────┐
│                    KD SYSTEM v5.0.0                     │
├─────────────────────────────────────────────────────────┤
│  14 Roles    → Specialist AI personas                   │
│  17 Skills   → Domain expertise                         │
│  80+ Commands → Actions & workflows                     │
│  6 Adapters  → Support different AI tools               │
│  10 Stages   → Development lifecycle                    │
│  7 Tools     → Testing, scanning, deployment            │
└─────────────────────────────────────────────────────────┘
```

## 1.2 Cara Kerja Utama

```
User run command (contoh: /KD-analyze)
        ↓
AI baca system-prompt.md
        ↓
AI activate role (contoh: Analyst)
        ↓
AI load skills yang berkaitan
        ↓
AI execute task
        ↓
AI generate output ke KD_output/
        ↓
AI update status.md
```

## 1.3 Versi & Status

- **Version:** 5.0.0
- **Status:** ✅ Berfungsi dengan baik
- **Author:** KRACKEDDEVS
- **Site:** https://krackeddevs.com/

---

# 2. STRUKTUR FOLDER & FAIL

## 2.1 Root Directory

```
C:/Users/Moon/Desktop/Kracked_skill/
│
├── src/                    ← Semua source files
├── docs/                   ← Dokumentasi
├── tests/                  ← Test scripts
├── install.sh              ← Linux/Mac installer
├── install.ps1             ← Windows installer
├── update.sh               ← Linux/Mac updater
├── update.ps1              ← Windows updater
├── uninstall.sh            ← Linux/Mac uninstaller
├── uninstall.ps1           ← Windows uninstaller
├── validate.sh             ← Validation script
├── kd.sh                   ← Linux/Mac CLI
├── kd.ps1                  ← Windows CLI
├── kd.js                   ← Node.js CLI
├── VERSION                 ← Version number
├── CHANGELOG.md            ← Version history
├── README.md               ← Overview
├── Planing.md              ← Planning notes
├── KD_Upgrade_Plan.md      ← Upgrade plan
├── package.json            ← Node.js config
└── LICENSE                 ← MIT License
```

## 2.2 Source Directory (src/)

```
src/
│
├── adapters/               ← AI tool adapters
│   ├── antigravity/        ← Antigravity adapter
│   ├── claude-code/        ← Claude Code adapter
│   ├── cline/              ← Cline adapter
│   ├── cursor/             ← Cursor adapter
│   ├── kilocode/           ← Kilo Code adapter
│   ├── roo/                ← Roo Code adapter
│   └── generic/            ← Generic adapter
│
├── prompts/                ← AI prompts
│   ├── roles/              ← 14 role definitions
│   ├── stages/             ← 10 stage definitions
│   └── multi-agent/        ← Multi-agent prompts
│
├── skills/                 ← 17 domain skills
├── templates/              ← Output templates
├── checklists/             ← Quality checklists
├── config/                 ← Configuration files
├── core/                   ← Core system files
├── workflows/              ← Workflow definitions
├── testsprite/             ← Browser testing tool
├── github-reader/          ← GitHub scanner tool
├── tool-selector/          ← Tech stack selector
├── version-checker/        ← Version compatibility
├── exporters/              ← Export utilities
├── analytics/              ← Analytics data
├── artifacts/              ← Artifacts manifest
├── commands/               ← Command scripts
└── tui/                    ← Terminal UI
```

---

# 3. ROLES SYSTEM

## 3.1 Apa Itu Roles?

Roles adalah specialist AI personas yang diaktifkan berdasarkan stage atau command.

## 3.2 Senarai Roles (14 Roles)

| # | Role | Prefix | Stage | Fungsi |
|---|------|--------|-------|--------|
| 1 | Analyst | [ANA] | Discovery | Analisa projek, kumpul requirements |
| 2 | Product Manager | [PM] | Requirements | Buat PRD, product brief |
| 3 | Architect | [ARCH] | Architecture | Design system, tech stack |
| 4 | Tech Lead | [TL] | Planning | Buat epics, stories, backlog |
| 5 | Engineer | [ENG] | Implementation | Code implementation |
| 6 | QA | [QA] | Quality | Testing, code review |
| 7 | Security | [SEC] | Quality | Security audit |
| 8 | DevOps | [DEVOPS] | Deployment | CI/CD, deployment |
| 9 | Release Manager | [RM] | Release | Release management |
| 10 | UX Designer | [UX] | Architecture | UI/UX design |
| 11 | Data Scientist | [DS] | Implementation | Data, ML |
| 12 | Mobile Developer | [MOB] | Implementation | Mobile apps |
| 13 | Database Admin | [DBA] | Architecture | Database |
| 14 | Scrum Master | [SM] | Planning | Agile process |

## 3.3 Fail Role

**Lokasi:** `src/prompts/roles/[role-name].md`

**Contoh:** `src/prompts/roles/engineer.md`

```markdown
# Role: Engineer

## Metadata
- **Role Name:** Engineer
- **Prefix:** [ENG]
- **Stage(s):** Implementation

## Description
The Engineer implements code story by story...

## Responsibilities
1. Implement stories according to story cards
2. Write clean, production-ready code
...

## Commands
- `/KD-dev-story [id]` — Implement a story
```

## 3.4 Cara Aktifkan Role

```
Method 1: Auto-activation
Run /KD-analyze → Analyst auto-activate

Method 2: Manual activation
Run /KD-role-engineer → Engineer activate
```

---

# 4. SKILLS SYSTEM

## 4.1 Apa Itu Skills?

Skills adalah domain expertise yang di-load berdasarkan role atau stage.

## 4.2 Senarai Skills (17 Skills)

| # | Skill | Domain | Bila Guna |
|---|-------|--------|-----------|
| 1 | Supabase Postgres | Backend | Database, SQL |
| 2 | Insecure Defaults | Security | Security check |
| 3 | React & Next.js | Frontend | UI development |
| 4 | Premium Design System | UI/UX | Design system |
| 5 | Web Performance | Performance | Optimization |
| 6 | Code Review | Quality | Code quality |
| 7 | PWA & Service Workers | PWA | Offline apps |
| 8 | Testing & QA | Testing | Testing |
| 9 | Animations & Components | UI | Animations |
| 10 | Recursive Decomposition | Optimization | Token saving |
| 11 | API Design | APIs | REST/GraphQL |
| 12 | DevOps & Deployment | DevOps | CI/CD |
| 13 | Game Development | Games | Game dev |
| 14 | Mobile Development | Mobile | Mobile apps |
| 15 | Documentation | Docs | Documentation |
| 16 | Browser Testing | Testing | TestSprite |
| 17 | GitHub Analysis | Tools | GitHub Reader |

## 4.3 Fail Skill

**Lokasi:** `src/skills/XX-[name].md`

**Contoh:** `src/skills/03-react-nextjs.md`

## 4.4 Skill Loading by Role

```
┌────────────────┬─────────────────────────────────────────────────┐
│ Role           │ Skills That Load                                │
├────────────────┼─────────────────────────────────────────────────┤
│ Analyst        │ 6, 10, 15                                       │
│ PM             │ 6, 10, 15                                       │
│ Architect      │ 1, 3, 4, 5, 6, 7, 10, 11, 12                   │
│ Tech Lead      │ 1, 3, 4, 5, 6, 10, 11, 15                      │
│ Engineer       │ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15          │
│ QA             │ 2, 5, 6, 8, 10, 15                              │
│ Security       │ 2, 6, 10                                        │
│ DevOps         │ 5, 6, 7, 10, 12, 15                             │
│ Mobile Dev     │ 3, 4, 6, 8, 9, 10, 14, 15                       │
│ Game Dev       │ 6, 8, 10, 13, 15                                │
│ UX Designer    │ 4, 6, 9, 10, 15                                 │
│ Release Mgr    │ 6, 10, 12, 15                                   │
└────────────────┴─────────────────────────────────────────────────┘
```

---

# 5. COMMANDS SYSTEM

## 5.1 Apa Itu Commands?

Commands adalah actions yang user boleh run untuk trigger AI tasks.

## 5.2 Commands by Stage

### Stage 1: Discovery (6 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-kickoff` | Initialize projek baru |
| `/KD-analyze` | Discovery & risk assessment |
| `/KD-domain-research` | Domain research |
| `/KD-market-research` | Market analysis |
| `/KD-tech-research` | Tech research |
| `/KD-project-context` | Context analysis |

### Stage 2: Ideation (5 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-brainstorm` | Creative ideation |
| `/KD-idea-design-thinking` | Design thinking |
| `/KD-idea-innovation` | Innovation workshop |
| `/KD-idea-problem-solving` | Problem solving |
| `/KD-idea-strategist` | Strategic planning |

### Stage 3: Requirements (3 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-product-brief` | Product brief |
| `/KD-prd` | Product requirements doc |
| `/KD-quick-spec` | Quick spec |

### Stage 4: Architecture (6 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-architecture` | System design |
| `/KD-api-design` | API design |
| `/KD-ux-design` | UX/UI design |
| `/KD-tool-selector` | Tech stack selection |
| `/KD-version-check` | Version compatibility |
| `/KD-scale-review` | Scalability review |

### Stage 5: Planning (3 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-epics-and-stories` | Backlog creation |
| `/KD-sprint-planning` | Sprint planning |
| `/KD-build-workflow` | Build workflow |

### Stage 6: Implementation (4 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-dev-story` | Story implementation |
| `/KD-quick-dev` | Quick development |
| `/KD-refactor` | Refactoring |
| `/KD-build-module` | Module building |

### Stage 7: Testing (7 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-test` | Test planning |
| `/KD-test-arch` | Test architecture |
| `/KD-test-design` | Test design |
| `/KD-test-automate` | Automation |
| `/KD-test-sprite` | Visual testing (TestSprite) |
| `/KD-test-ci` | CI testing |
| `/KD-test-nfr` | Non-functional testing |

### Stage 8: Quality (3 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-code-review` | Code review |
| `/KD-validate` | Project validation |
| `/KD-fix-course` | Course correction |

### Stage 9: Deployment (2 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-deployment-plan` | Deployment strategy |
| `/KD-validate-workflow` | Workflow validation |

### Stage 10: Release (2 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-scale-review` | Post-deploy review |
| `/KD-retrospective` | Sprint retrospective |

### Utility Commands
| Command | Fungsi |
|---------|--------|
| `/KD-status` | View project state |
| `/KD-help` | Command help |
| `/KD` | Interactive menu |

### Multi-Agent Commands
| Command | Fungsi |
|---------|--------|
| `/KD-party-mode` | Parallel ideation |
| `/KD-swarm` | Parallel execution |

### Game Dev Commands (17 Commands)
| Command | Fungsi |
|---------|--------|
| `/KD-game-gdd` | Game Design Document |
| `/KD-game-arch` | Game Architecture |
| `/KD-game-brainstorm` | Game brainstorming |
| `/KD-game-dev` | Game development |
| ... | (13 more) |

## 5.3 Fail Command

**Lokasi:** `src/adapters/[adapter]/commands/KD-[command].md`

**Contoh:** `src/adapters/claude-code/commands/KD-analyze.md`

```markdown
---
name: 'KD-analyze'
description: 'Project analysis and risk assessment'
---

Read the full system prompt at .kracked/prompts/system-prompt.md
and follow the instructions for the /KD-analyze command.
```

---

# 6. TOOLS SYSTEM

## 6.1 Apa Itu Tools?

Tools adalah executable utilities untuk specific tasks.

## 6.2 Senarai Tools (7 Tools)

### Tool 1: TestSprite
**Lokasi:** `src/testsprite/`
**Fungsi:** Browser testing dengan Brave/Chromium
**Files:**
- `testsprite-core.js` — Main engine
- `browser-setup.js` — Brave detection

**Cara Guna:**
```bash
/KD-test-sprite https://myapp.com
```

**Output:**
- Screenshots
- Video recording
- Test reports (JSON, MD, HTML)

---

### Tool 2: GitHub Reader
**Lokasi:** `src/github-reader/`
**Fungsi:** Deep scan public GitHub repos
**Files:**
- `github-reader.js` — Scanner engine
- `kd-github-read.js` — CLI

**Cara Guna:**
```bash
/KD-github-read https://github.com/owner/repo
```

**Output:**
- Repo structure
- File contents
- Analysis report

---

### Tool 3: Tool Selector
**Lokasi:** `src/tool-selector/`
**Fungsi:** Tech stack selection
**Files:**
- `tool-selector.js` — Selector engine
- `knowledge-base.json` — Tool database

---

### Tool 4: Version Checker
**Lokasi:** `src/version-checker/`
**Fungsi:** Version compatibility check
**Files:**
- `version-checker.js` — Checker engine
- `registry.json` — Version registry
- `compatibility-rules.json` — Rules

---

### Tool 5: Exporters
**Lokasi:** `src/exporters/`
**Fungsi:** Export artifacts
**Files:**
- `export-jira.js` — Export to Jira
- `export-pdf.sh` — PDF generation
- `export-consolidated.sh` — Consolidated export

---

### Tool 6: Git Integration
**Lokasi:** `src/git-integration/`
**Fungsi:** Git automation
**Files:**
- `auto-commit.sh` — Auto commit
- `config.yaml` — Git config

---

### Tool 7: TUI (Terminal UI)
**Lokasi:** `src/tui/`
**Fungsi:** Terminal interface
**Files:**
- `banner.js` — Banner display
- `screens/` — Menu screens

---

# 7. TEMPLATES SYSTEM

## 7.1 Apa Itu Templates?

Templates adalah output document formats.

## 7.2 Senarai Templates (11 Templates)

| Template | Fail | Output |
|----------|------|--------|
| Status | `status.md` | Project status |
| Product Brief | `product-brief.md` | Product brief |
| PRD | `prd.md` | Requirements doc |
| Architecture | `architecture.md` | System design |
| Story Card | `story-card.md` | Story file |
| Deployment Plan | `deployment-plan.md` | Deployment strategy |
| Release Notes | `release-notes.md` | Release notes |
| Decision Log | `decision-log.md` | Decision records |
| Risk Register | `risk-register.md` | Risk tracking |

## 7.3 Cara Guna Templates

AI akan guna templates secara automatik bila generate output.

**Lokasi:** `src/templates/[template-name].md`

---

# 8. WORKFLOWS SYSTEM

## 8.1 Apa Itu Workflows?

Workflows adalah sequence of stages dari mula hingga habis.

## 8.2 10 Stages

```
┌──────────┐    ┌────────────┐    ┌──────────────┐    ┌──────────────┐
│ Discovery│───▶│ Ideation   │───▶│ Requirements │───▶│ Architecture │
│ Stage 1  │    │ Stage 2    │    │ Stage 3      │    │ Stage 4      │
└──────────┘    └────────────┘    └──────────────┘    └──────┬───────┘
                                                              │
┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌────────┴───────┐
│ Release  │◀───│ Deployment │◀───│ Quality     │◀───│ Implementation │
│ Stage 10 │    │ Stage 9    │    │ Stage 8     │    │ Stage 5-7      │
└──────────┘    └────────────┘    └─────────────┘    └────────────────┘
```

## 8.3 Stage Definitions

**Lokasi:** `src/prompts/stages/[stage-name].md`

---

# 9. MULTI-AGENT SYSTEM

## 9.1 Apa Itu Multi-Agent?

Multi-Agent membolehkan multiple AI agents work together.

## 9.2 Modes

### Party Mode
```bash
/KD-party-mode --agents=3 --topic="API design"
```
Multiple agents ideate in parallel.

### Swarm Mode
```bash
/KD-swarm --agents=3 --tasks="task1,task2,task3"
```
Multiple agents execute tasks in parallel.

## 9.3 Files

**Lokasi:** `src/prompts/multi-agent/`

| File | Fungsi |
|------|--------|
| `party-mode.md` | Party mode protocol |
| `agent-swarm.md` | Swarm protocol |
| `aggregation.md` | Result aggregation |
| `confidence-scoring.md` | Confidence scoring |
| `conflict-resolution.md` | Conflict resolution |

---

# 10. CARA GUNA STEP-BY-STEP

## 10.1 Install KD

### 🎯 TUI Install (Recommended) — Node.js CLI

**All Platforms** (requires Node.js):
```bash
# macOS / Linux / Git Bash
curl -fsSL https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.sh | bash

# Windows PowerShell
irm https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.ps1 | iex
```

### 📦 Direct Commands (Node.js)

```bash
# Install (interactive)
node kd.js install

# Install (non-interactive)
node kd.js install --target=cline,cursor --lang=ms --non-interactive

# Update
node kd.js update

# Uninstall
node kd.js uninstall

# Show help
node kd.js help
```

## 10.2 Start Projek Baru

```
Step 1: /KD-kickoff       ← Initialize
Step 2: /KD-analyze       ← Discovery
Step 3: /KD-brainstorm    ← Idea
Step 4: /KD-product-brief ← Product brief
Step 5: /KD-prd           ← Requirements
Step 6: /KD-architecture  ← Design
Step 7: /KD-epics-and-stories ← Backlog
Step 8: /KD-dev-story [id] ← Implement
Step 9: /KD-test          ← Testing
Step 10: /KD-code-review  ← Quality
Step 11: /KD-deployment-plan ← Deploy
```

## 10.3 Quick Start (5 Commands)

```
/KD-analyze      → Discovery
/KD-prd          → Requirements
/KD-architecture → Design
/KD-dev-story    → Implement
/KD-code-review  → Quality
```

## 10.4 Test dengan TestSprite

```
/KD-test-sprite https://myapp.com
```

Output akan disimpan di `.kracked/KD_output/testsprite/`

## 10.5 Scan GitHub Repo

```
/KD-github-read https://github.com/owner/repo
```

Output akan disimpan di `.kracked/KD_output/github-reader/`

---

# 11. ISSUES & SOLUTIONS

## 11.1 Status: ✅ SEMUA BERFUNGSI

Berdasarkan semakan, sistem KD v5.0.0 berfungsi dengan baik.

## 11.2 Minor Issues (Sudah Fixed)

| Issue | Status | Solution |
|-------|--------|----------|
| TestSprite perlu Puppeteer | ✅ Fixed | Install dengan `npm install puppeteer` |
| Brave detection | ✅ Fixed | Auto-prompt download jika tiada |
| GitHub rate limit | ✅ Known | Tambah GITHUB_TOKEN env var |

## 11.3 Edge Cases

### Edge Case 1: Fresh Install
```bash
# Jika tiada .kracked folder
# Run installer untuk create struktur
```

### Edge Case 2: Corrupted Status
```bash
# Jika status.md rosak
# Delete dan run /KD-kickoff untuk regenerate
```

### Edge Case 3: Missing Skills
```bash
# Jika skill fail missing
# Run update.sh atau reinstall
```

---

# 12. ADAPTERS SUPPORT

| Adapter | Type | Files Location |
|---------|------|----------------|
| Claude Code | Commands | `src/adapters/claude-code/commands/` |
| Cursor | Commands | `src/adapters/cursor/commands/` |
| Cline | Workflows | `src/adapters/cline/workflows/` |
| Kilo Code | Workflows | `src/adapters/kilocode/workflows/` |
| Roo Code | Commands | `src/adapters/roo/commands/` |
| Antigravity | Workflows | `src/adapters/antigravity/workflows/` |

---

# 13. CONFIGURATION

## 13.1 Settings

**Lokasi:** `.kracked/config/settings.json`

```json
{
  "language": "EN",
  "scale": "STANDARD",
  "project_name": "My Project"
}
```

## 13.2 Language Support

| Language | File |
|----------|------|
| English | `src/config/language/en.json` |
| Bahasa Melayu | `src/config/language/ms.json` |

---

# 14. OUTPUT DIRECTORY

```
.kracked/KD_output/
├── status/
│   └── status.md           ← Project state (PERSISTENT MEMORY)
├── brainstorm/             ← Brainstorm outputs
├── product-brief/          ← Product briefs
├── PRD/                    ← Requirements docs
├── architecture/           ← Architecture docs
├── epics-and-stories/      ← Backlog
├── code-review/            ← Review reports
├── deployment/             ← Deployment plans
├── release/                ← Release notes
├── decisions/              ← Decision logs
├── risks/                  ← Risk registers
├── testsprite/             ← TestSprite reports
└── github-reader/          ← GitHub scan reports
```

---

# 15. CHECKLISTS

**Lokasi:** `src/checklists/`

| Checklist | Fungsi |
|-----------|--------|
| `checkpoint-approval.md` | Checkpoint approval |
| `code-quality.md` | Code quality check |
| `decision-validation.md` | Decision validation |
| `pre-deployment.md` | Pre-deployment check |
| `security-audit.md` | Security audit |
| `stage-completion.md` | Stage completion |

---

# 16. SUMMARY

## ✅ Status Keseluruhan: BERFUNGSI DENGAN BAIK

| Komponen | Status | Count |
|----------|--------|-------|
| Roles | ✅ OK | 14 |
| Skills | ✅ OK | 17 |
| Commands | ✅ OK | 80+ |
| Tools | ✅ OK | 7 |
| Templates | ✅ OK | 11 |
| Stages | ✅ OK | 10 |
| Adapters | ✅ OK | 6 |
| Language | ✅ OK | EN + MS |

## 📊 Count Summary

```
Total Roles:      14
Total Skills:     17
Total Commands:   80+
Total Tools:      7
Total Templates:  11
Total Stages:     10
Total Adapters:   6
Total Checklists: 6
```

---

*KD finishes what it starts.*  
*KRACKEDDEVS — AI Skill System v5.0.0*  
*https://krackeddevs.com/*