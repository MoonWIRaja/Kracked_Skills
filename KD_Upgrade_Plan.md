# 🔧 KD v5.0.0 UPGRADE PLAN — COMPREHENSIVE
## "Gabungkan Sistem Baru dengan Tools/Skills Lama"
**KRACKEDDEVS | 2026**

---

# 📋 RINGKASAN

Upgrade ini akan:
1. **GANTI** role files lama → YAML agents baru (LEBIH TERSTRUKTUR)
2. **KEKAL** semua 17 skills sedia ada
3. **KEKAL** semua tools (testsprite, github-reader, dll)
4. **KEKAL** system prompt TAPI enhance dengan protocols baru
5. **TAMBAH** workflow sharding system
6. **TAMBAH** validation gates
7. **TAMBAH** knowledge base
8. **KEKAL** VERSION 5.0.0

---

# 1. ANALISIS SISTEM SEDIA ADA

## 1.1 Roles (14 files) — AKAN DIGANTI
```
src/prompts/roles/
├── analyst.md          ← DIGANTI dengan analyst.agent.yaml
├── architect.md        ← DIGANTI dengan architect.agent.yaml
├── data-scientist.md   ← DIGANTI dengan data-scientist.agent.yaml
├── database-admin.md   ← DIGANTI dengan database-admin.agent.yaml
├── devops.md           ← DIGANTI dengan devops.agent.yaml
├── engineer.md         ← DIGANTI dengan engineer.agent.yaml
├── mobile-developer.md ← DIGANTI dengan mobile-developer.agent.yaml
├── product-manager.md  ← DIGANTI dengan pm.agent.yaml
├── qa.md               ← DIGANTI dengan qa.agent.yaml
├── release-manager.md  ← DIGANTI dengan release-manager.agent.yaml
├── security.md         ← DIGANTI dengan security.agent.yaml
├── tech-lead.md        ← DIGANTI dengan tech-lead.agent.yaml
├── ux-designer.md      ← DIGANTI dengan ux-designer.agent.yaml
└── _role-template.md   ← DIGANTI dengan template baru
```

**Maklumat yang perlu DIAMBIL dan DIMASUKKAN ke YAML baru:**
- Role name, prefix, stage
- Responsibilities
- Entry/Exit criteria
- Activities
- Handoff info
- Commands
- Templates used

## 1.2 Skills (17 files) — KEKAL, DIHUBUNGKAN
```
src/skills/
├── SKILLS.md                    ← Index (dikekalkan)
├── 01-supabase-postgres.md      ← Backend, Database
├── 02-insecure-defaults.md      ← Security
├── 03-react-nextjs.md           ← Frontend
├── 04-premium-design-system.md  ← UI/UX
├── 05-web-perf.md               ← Performance
├── 06-code-review.md            ← Quality
├── 07-pwa-service-worker.md     ← PWA
├── 08-testing-qa.md             ← Testing
├── 09-animations-components.md  ← Animations
├── 10-recursive-decomposition.md ← Optimization
├── 11-api-design.md             ← APIs
├── 12-devops-deployment.md      ← DevOps
├── 13-game-development.md       ← Games
├── 14-mobile-development.md     ← Mobile
├── 15-documentation.md          ← Docs
├── 16-browser-testing.md        ← TestSprite
└── 17-github-analysis.md        ← GitHub Reader
```

**CARA HUBUNGKAN:**
```yaml
# Dalam agent YAML, ada field:
skills:
  primary: [6, 10]      ← Rujuk skill numbers
  secondary: [15]

# AI akan load skills dari src/skills/ berdasarkan numbers
```

## 1.3 Tools (Sedia Ada) — KEKAL, DIHUBUNGKAN
```
src/
├── testsprite/
│   ├── testsprite-core.js    ← Browser testing
│   └── browser-setup.js      ← Brave detection
│
├── github-reader/
│   ├── github-reader.js      ← Repo scanner
│   └── kd-github-read.js     ← CLI
│
├── tool-selector/
│   ├── tool-selector.js      ← Tech stack selector
│   └── knowledge-base.json   ← Tool database
│
├── version-checker/
│   ├── version-checker.js    ← Version compatibility
│   ├── registry.json         ← Version registry
│   └── compatibility-rules.json
│
└── exporters/
    ├── export-jira.js        ← Jira export
    └── export-pdf.sh         ← PDF generation
```

**CARA HUBUNGKAN:**
- Workflows akan CALL tools bila perlu
- Contoh: workflow testing → calls testsprite-core.js

## 1.4 Templates (Sedia Ada) — KEKAL, ENHANCED
```
src/templates/
├── architecture.md      ← KEKAL
├── decision-log.md      ← KEKAL
├── deployment-plan.md   ← KEKAL
├── prd.md               ← KEKAL
├── product-brief.md     ← KEKAL
├── release-notes.md     ← KEKAL
├── risk-register.md     ← KEKAL
├── status.md            ← ENHANCED (tambah phase gates)
└── story-card.md        ← ENHANCED (tambah technical context)
```

## 1.5 System Prompt — KEKAL, ENHANCED
```
src/prompts/
├── system-prompt.md         ← ENHANCED dengan protocols baru
├── handoff-protocol.md      ← ENHANCED
├── role-switcher.md         ← KEKAL
├── conflict-resolution.md   ← KEKAL
└── multi-agent/
    ├── agent-swarm.md       ← KEKAL
    ├── aggregation.md       ← KEKAL
    ├── confidence-scoring.md← KEKAL
    ├── conflict-resolution.md← KEKAL
    └── party-mode.md        ← KEKAL
```

## 1.6 Checklists (Sedia Ada) — KEKAL
```
src/checklists/
├── checkpoint-approval.md   ← KEKAL
├── code-quality.md          ← KEKAL
├── decision-validation.md   ← KEKAL
├── pre-deployment.md        ← KEKAL
├── security-audit.md        ← KEKAL
└── stage-completion.md      ← KEKAL
```

## 1.7 Commands (80+ files) — UPDATE FORMAT
```
src/adapters/
├── claude-code/commands/    ← UPDATE format
├── cursor/commands/         ← UPDATE format
├── cline/workflows/         ← UPDATE format
├── kilocode/workflows/      ← UPDATE format
├── roo/commands/            ← UPDATE format
└── antigravity/workflows/   ← UPDATE format
```

---

# 2. STRUKTUR BARU YANG AKAN DIBUAT

## 2.1 Agents Directory (BARU)
```
src/agents/
├── analyst.agent.yaml
├── pm.agent.yaml
├── architect.agent.yaml
├── tech-lead.agent.yaml
├── engineer.agent.yaml
├── qa.agent.yaml
├── scrum-master.agent.yaml      ← BARU (tambah dari roles-index)
├── security.agent.yaml
├── devops.agent.yaml
├── release-manager.agent.yaml
├── ux-designer.agent.yaml
├── data-scientist.agent.yaml
├── mobile-developer.agent.yaml
├── database-admin.agent.yaml
└── solo-dev.agent.yaml          ← BARU (dari roles-index)
```

## 2.2 Workflows Directory (BARU)
```
src/workflows/
├── discovery/
│   ├── analyze/
│   │   ├── workflow.md
│   │   ├── step-01-orient.md
│   │   ├── step-02-interview.md
│   │   ├── step-03-research.md
│   │   ├── step-04-synthesize.md
│   │   └── step-05-brief.md
│   ├── brainstorm/
│   │   └── ... (5 files)
│   └── domain-research/
│       └── ... (4 files)
│
├── planning/
│   ├── prd-create/
│   │   └── ... (9 files)
│   ├── prd-validate/
│   │   └── ... (4 files)
│   └── epics-stories/
│       └── ... (6 files)
│
├── architecture/
│   ├── design/
│   │   └── ... (7 files)
│   ├── tech-research/
│   │   └── ... (4 files)
│   └── api-design/
│       └── ... (5 files)
│
├── implementation/
│   ├── story-generate/        ← PENTING: SM story generator
│   │   └── ... (6 files)
│   ├── dev-story/
│   │   └── ... (6 files)
│   ├── code-review/
│   │   └── ... (5 files)
│   └── refactor/
│       └── ... (4 files)
│
├── quality/
│   ├── test-design/
│   │   └── ... (5 files)
│   ├── test-execute/
│   │   └── ... (4 files)
│   └── security-audit/
│       └── ... (5 files)
│
├── deployment/
│   ├── plan/
│   │   └── ... (5 files)
│   └── execute/
│       └── ... (4 files)
│
└── release/
    ├── notes/
    │   └── ... (4 files)
    └── retrospective/
        └── ... (4 files)
```

## 2.3 Gates Directory (BARU)
```
src/gates/
├── discovery-exit.md
├── requirements-exit.md
├── architecture-exit.md
├── implementation-exit.md
├── quality-exit.md
├── deployment-exit.md
└── release-exit.md
```

## 2.4 Knowledge Directory (BARU)
```
src/knowledge/
├── kd-index.md
├── patterns/
│   ├── auth-patterns.md
│   ├── api-patterns.md
│   ├── database-patterns.md
│   └── security-patterns.md
└── standards/
    ├── code-style.md
    ├── naming-conventions.md
    └── documentation-standards.md
```

## 2.5 Config Updates (BARU)
```
src/config/
├── scale-taxonomy.yaml        ← BARU: 4-level scale system
├── agents/
│   ├── personalities.json     ← KEKAL
│   └── names.json             ← BARU: Agent name pools
└── ... (rest KEKAL)
```

---

# 3. FORMAT AGENT YAML (LENGKAP)

## 3.1 Contoh: engineer.agent.yaml

```yaml
# src/agents/engineer.agent.yaml
# KD Agent Definition — Engineer Role
# Version: 5.0.0

id: "engineer"
role: "Software Engineer"
prefix: "[ENG]"
emoji: "💻"
stage: "implementation"

# ==========================================
# PERSONA — Random name selection
# ==========================================
persona:
  name_pool:
    - "Dev"
    - "Corey"
    - "Sam"
    - "Max"
    - "Blake"
    - "Jordan"
    - "Riley"
    - "Casey"
  selected_name: null  # Diisi semasa first activation
  style: "pragmatic, detail-oriented, test-driven"
  language_default: "EN"

# ==========================================
# DESCRIPTION — DARI roles/engineer.md LAMA
# ==========================================
description: |
  The Engineer implements code story by story according to the backlog 
  created by the Tech Lead. Follows the architecture decisions, writes 
  production-quality code with tests, and ensures each story meets its 
  acceptance criteria.

# ==========================================
# RESPONSIBILITIES — DARI roles/engineer.md LAMA
# ==========================================
responsibilities:
  - "Implement stories according to story cards"
  - "Write clean, production-ready code"
  - "Write tests (unit, integration as needed)"
  - "Follow architecture decisions and tech stack"
  - "Handle error cases and edge cases"
  - "Document code with appropriate comments"
  - "Update status.md with progress"

# ==========================================
# CAPABILITIES
# ==========================================
capabilities:
  primary:
    - code_implementation
    - test_writing
    - debugging
    - code_refactoring
  secondary:
    - code_review
    - documentation
    - performance_optimization

# ==========================================
# SKILLS — DIPETAKAN DARI skills-index.md
# ==========================================
skills:
  primary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  # 1=Supabase, 2=Security, 3=React, 4=Design, 5=Perf
  # 6=CodeReview, 7=PWA, 8=Testing, 9=Animations, 10=Decomposition, 11=API
  secondary: [15]
  # 15=Documentation

# ==========================================
# CONSTRAINTS
# ==========================================
constraints:
  - "NEVER deviate from architecture without approval"
  - "NEVER skip writing tests"
  - "ALWAYS follow code style from knowledge/standards/"
  - "ALWAYS update story card after completion"

# ==========================================
# WHEN TO USE
# ==========================================
when_to_use: |
  Load when implementation phase begins.
  After Tech Lead has created story backlog.
  When user runs /KD-dev-story command.

# ==========================================
# ENTRY CRITERIA — DARI roles/engineer.md LAMA
# ==========================================
entry_criteria:
  - "Story backlog created by Tech Lead"
  - "Architecture document available"
  - "Tech stack and data models defined"

# ==========================================
# EXIT CRITERIA — DARI roles/engineer.md LAMA
# ==========================================
exit_criteria:
  - "Story acceptance criteria met"
  - "Tests passing"
  - "Code follows architecture decisions"
  - "Story card updated with completion status"
  - "status.md updated"

# ==========================================
# WORKFLOWS — POINTS TO NEW WORKFLOW SYSTEM
# ==========================================
entry_workflow: "workflows/implementation/dev-story/workflow.md"

workflows:
  - trigger: "/KD-dev-story"
    workflow: "workflows/implementation/dev-story"
    description: "Implement a story"
  - trigger: "/KD-dev-story --focus=backend"
    workflow: "workflows/implementation/dev-story"
    args: { focus: "backend" }
    description: "Backend only"
  - trigger: "/KD-dev-story --focus=frontend"
    workflow: "workflows/implementation/dev-story"
    args: { focus: "frontend" }
    description: "Frontend only"

# ==========================================
# OUTPUT ARTIFACTS
# ==========================================
output_artifacts:
  - id: "code"
    path: "[project source files]"
    required: true
  - id: "tests"
    path: "[test files]"
    required: true
  - id: "story-card-update"
    path: ".kracked/KD_output/epics-and-stories/story-*.md"
    required: true

# ==========================================
# HANDOFF — DARI roles/engineer.md LAMA
# ==========================================
handoff_to:
  - agent: "qa"
    condition: "story implementation complete"
    message: "Code ready for QA review"
  - agent: "tech-lead"
    condition: "all stories complete"
    message: "Implementation phase complete"

# ==========================================
# TOOLS — YANG BOLEH DIGUNAKAN
# ==========================================
tools:
  - id: "testsprite"
    path: "testsprite/testsprite-core.js"
    use_when: "browser testing needed"
  - id: "github-reader"
    path: "github-reader/github-reader.js"
    use_when: "need to analyze external repos"
  - id: "tool-selector"
    path: "tool-selector/tool-selector.js"
    use_when: "need to select tech stack"

# ==========================================
# TEMPLATES — DARI roles/engineer.md LAMA
# ==========================================
templates:
  - "story-card.md"

# ==========================================
# CHECKLISTS — DARI roles/engineer.md LAMA
# ==========================================
checklists:
  - "stage-completion.md (Implementation execution)"

# ==========================================
# FOCUS MODES — DARI roles/engineer.md LAMA
# ==========================================
focus_modes:
  backend: "Backend/API implementation only"
  frontend: "Frontend/UI implementation only"
  full: "Full-stack implementation (default)"
```

## 3.2 Mapping dari Role MD Lama ke YAML Baru

| Field di MD Lama | Field di YAML Baru |
|------------------|-------------------|
| Role Name | `role` |
| Prefix | `prefix` |
| Stage(s) | `stage` |
| Description | `description` |
| Responsibilities | `responsibilities` |
| Entry Criteria | `entry_criteria` |
| Exit Criteria | `exit_criteria` |
| Activities | `capabilities` |
| Handoff To | `handoff_to` |
| Templates Used | `templates` |
| Checklists Used | `checklists` |
| Commands | `workflows` |
| (NEW) | `persona.name_pool` |
| (NEW) | `skills` |
| (NEW) | `tools` |
| (NEW) | `constraints` |

---

# 4. FORMAT WORKFLOW

## 4.1 Contoh: dev-story/workflow.md

```markdown
---
workflow_id: "implementation-dev-story"
agent: "engineer"
version: "5.0.0"
language_aware: true
focus_modes: ["backend", "frontend", "full"]
---

# Dev Story Implementation Workflow

## Overview
Implement a single story from the backlog following TDD principles.

## Prerequisites
- Story card exists in `.kracked/KD_output/epics-and-stories/`
- Architecture document exists
- If missing: STOP and direct user to run /KD-epics-and-stories first

## Gate Check
Before starting, validate:
- [ ] Architecture phase complete (check status.md)
- [ ] Story file exists
- [ ] No blockers on this story

## Steps (Execute in Order)

### Step 1: Orient
Load: `step-01-orient.md`
- Read story card
- Understand acceptance criteria
- Identify dependencies
Complete when: Engineer confirms understanding

### Step 2: TDD Setup
Load: `step-02-tdd-setup.md`
- Write test cases first
- Setup test environment
Complete when: Test file created with failing tests

### Step 3: Implement
Load: `step-03-implement.md`
- Write code to pass tests
- Follow architecture patterns
- Apply relevant skills (load from skills/)
Complete when: All tests passing

### Step 4: Test & Validate
Load: `step-04-test.md`
- Run all tests
- Check edge cases
- Consider using TestSprite for UI testing
Complete when: All acceptance criteria verified

### Step 5: Handoff
Load: `step-05-handoff.md`
- Update story card status
- Update status.md
- Notify QA
Complete when: Story marked COMPLETE

## Skills to Load
Based on story type, load from `skills/`:
- Backend story: Skills 1, 2, 6, 8, 10
- Frontend story: Skills 3, 4, 5, 6, 8, 9, 10
- Full-stack: Skills 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11

## Tools Available
- TestSprite (`testsprite/`) — for browser testing
- GitHub Reader (`github-reader/`) — for reference code

## Output
- Implemented code in project
- Test files
- Updated story card
- Updated status.md

## Next
- If more stories: Run /KD-dev-story [next-id]
- If all complete: Run /KD-code-review
```

## 4.2 Contoh: step-03-implement.md

```markdown
---
step_id: "03-implement"
agent: "engineer"
estimated_tokens: 2000
---

# Step 3: Implement Code

## Context
You are implementing a story. Tests are already written (failing).
Your job is to write code that passes the tests.

## Instructions

### 1. Load Relevant Skills
Read and apply skills from `.kracked/skills/` based on story type:

**If Backend:**
- Read `01-supabase-postgres.md` for database patterns
- Read `02-insecure-defaults.md` for security
- Read `11-api-design.md` for API patterns

**If Frontend:**
- Read `03-react-nextjs.md` for React patterns
- Read `04-premium-design-system.md` for UI patterns
- Read `09-animations-components.md` for animations

### 2. Follow Architecture
Read `.kracked/KD_output/architecture/architecture.md`:
- Follow tech stack decisions
- Follow file structure
- Follow naming conventions

### 3. Implement
- Write code to pass tests
- Handle error cases
- Add appropriate comments
- Follow code style from `knowledge/standards/code-style.md`

### 4. Self-Check
- [ ] Code follows architecture decisions
- [ ] No hardcoded secrets (Skill 2)
- [ ] Proper error handling
- [ ] Code is readable and maintainable

## Output Format

```
[ENG] ✅ Implementation complete for [story-id]

**Files created/modified:**
- [file1] — [description]
- [file2] — [description]

**Tests status:**
- [X] unit tests passing
- [X] integration tests passing

Proceeding to Step 4: Test & Validate...
```

## Notes
- If blocked, document in status.md under Blockers
- If architecture change needed, escalate to Tech Lead
```

---

# 5. CARA HUBUNGKAN BARU DENGAN LAMA

## 5.1 Agent YAML → Skills

```yaml
# Dalam agent YAML:
skills:
  primary: [1, 2, 3]
  secondary: [15]

# AI akan:
1. Baca numbers dari YAML
2. Load skills dari src/skills/XX-*.md
3. Apply knowledge semasa execution
```

## 5.2 Workflow → Tools

```markdown
# Dalam workflow:
## Tools Available
- TestSprite (`testsprite/`) — for browser testing
- GitHub Reader (`github-reader/`) — for reference code

# AI akan:
1. Detect yang tool diperlukan
2. Load dan execute tool
3. Include results dalam workflow
```

## 5.3 Workflow → Templates

```yaml
# Dalam agent YAML:
output_artifacts:
  - id: "story-card-update"
    path: ".kracked/KD_output/epics-and-stories/story-*.md"
    template: "story-card.md"  ← Rujuk template sedia ada
```

## 5.4 Workflow → Checklists

```yaml
# Dalam agent YAML:
checklists:
  - "stage-completion.md"

# AI akan:
1. Load checklist dari src/checklists/
2. Verify semua items
3. Gate check sebelum proceed
```

## 5.5 System Prompt Enhancement

```markdown
# Dalam system-prompt.md (TAMBAH):

## Agent Loading Protocol

When activating an agent:

1. READ the agent's `.agent.yaml` file from `agents/`
2. LOAD persona (name will be random-selected on first activation)
3. LOAD skills from `skills/` based on skill numbers in YAML
4. FOLLOW the agent's constraints strictly
5. USE the agent's tools when needed
6. EXECUTE workflows from `workflows/` step by step
7. HANDOFF to next agent when output artifacts complete

## Workflow Execution Protocol

When executing a workflow:

1. READ workflow.md for overview
2. CHECK prerequisites and gates
3. EXECUTE steps in order
4. LOAD step files one at a time
5. COMPLETE each step before proceeding
6. UPDATE status.md after each step
```

---

# 6. GATE FORMAT

## 6.1 Contoh: architecture-exit.md

```markdown
---
gate_id: "architecture-exit"
from_phase: "architecture"
to_phase: "implementation"
---

# Gate: Architecture → Implementation

## Checklist

### Architecture Document
- [ ] System overview documented
- [ ] Tech stack selected and justified
- [ ] Database schema defined
- [ ] API contracts defined
- [ ] Security architecture documented
- [ ] File structure defined

### Quality Checks
- [ ] Decision Validation Block completed
- [ ] Risks documented in risk-register.md
- [ ] Tech stack verified with version-checker

### Approval
- [ ] User reviewed and approved architecture
- [ ] status.md updated: architecture → COMPLETE

## Gate Result

### PASS
```
[KD] ✅ Gate LULUS — Architecture complete!

Proceed ke Implementation: /KD-epics-and-stories
Tech Lead [TL] akan create story backlog.
```

### FAIL
```
[KD] ⚠️ Gate TIDAK LULUS

Missing:
❌ Database schema not defined
❌ API contracts missing

Sila lengkapkan sebelum proceed.
Guna /KD-architecture untuk continue.
```

## Override
Advanced users can bypass: "KD override gate"
(KD akan log warning dalam status.md)
```

---

# 7. INSTALL SCRIPT (RE-PLAN)

## 7.1 Struktur Baru install.sh

```bash
#!/bin/bash
# KD Install Script v5.0.0
# KRACKEDDEVS

set -e

KD_VERSION="5.0.0"
KD_REPO="MoonWIRaja/Kracked_Skills"
KD_RAW="https://raw.githubusercontent.com/${KD_REPO}/main"
KD_DIR=".kracked"

# ============================================
# PHASE 1: DIRECTORY SETUP
# ============================================

create_directories() {
    echo "[KD] 📁 Creating directories..."
    
    # Core directories (KEKAL)
    mkdir -p "${KD_DIR}/prompts/roles"
    mkdir -p "${KD_DIR}/prompts/stages"
    mkdir -p "${KD_DIR}/prompts/multi-agent"
    mkdir -p "${KD_DIR}/templates"
    mkdir -p "${KD_DIR}/checklists"
    mkdir -p "${KD_DIR}/config/language"
    mkdir -p "${KD_DIR}/config/agents"
    mkdir -p "${KD_DIR}/core/indexes"
    mkdir -p "${KD_DIR}/skills"
    
    # NEW: Agents directory
    mkdir -p "${KD_DIR}/agents"
    
    # NEW: Workflows directories (ALL)
    mkdir -p "${KD_DIR}/workflows/discovery/analyze"
    mkdir -p "${KD_DIR}/workflows/discovery/brainstorm"
    mkdir -p "${KD_DIR}/workflows/discovery/domain-research"
    mkdir -p "${KD_DIR}/workflows/planning/prd-create"
    mkdir -p "${KD_DIR}/workflows/planning/prd-validate"
    mkdir -p "${KD_DIR}/workflows/planning/epics-stories"
    mkdir -p "${KD_DIR}/workflows/architecture/design"
    mkdir -p "${KD_DIR}/workflows/architecture/tech-research"
    mkdir -p "${KD_DIR}/workflows/architecture/api-design"
    mkdir -p "${KD_DIR}/workflows/implementation/story-generate"
    mkdir -p "${KD_DIR}/workflows/implementation/dev-story"
    mkdir -p "${KD_DIR}/workflows/implementation/code-review"
    mkdir -p "${KD_DIR}/workflows/implementation/refactor"
    mkdir -p "${KD_DIR}/workflows/quality/test-design"
    mkdir -p "${KD_DIR}/workflows/quality/test-execute"
    mkdir -p "${KD_DIR}/workflows/quality/security-audit"
    mkdir -p "${KD_DIR}/workflows/deployment/plan"
    mkdir -p "${KD_DIR}/workflows/deployment/execute"
    mkdir -p "${KD_DIR}/workflows/release/notes"
    mkdir -p "${KD_DIR}/workflows/release/retrospective"
    
    # NEW: Gates directory
    mkdir -p "${KD_DIR}/gates"
    
    # NEW: Knowledge directories
    mkdir -p "${KD_DIR}/knowledge/patterns"
    mkdir -p "${KD_DIR}/knowledge/standards"
    
    # Output directories
    mkdir -p "${KD_DIR}/KD_output/status"
    mkdir -p "${KD_DIR}/KD_output/brainstorm"
    mkdir -p "${KD_DIR}/KD_output/product-brief"
    mkdir -p "${KD_DIR}/KD_output/PRD"
    mkdir -p "${KD_DIR}/KD_output/architecture"
    mkdir -p "${KD_DIR}/KD_output/epics-and-stories"
    mkdir -p "${KD_DIR}/KD_output/code-review"
    mkdir -p "${KD_DIR}/KD_output/deployment"
    mkdir -p "${KD_DIR}/KD_output/release"
    mkdir -p "${KD_DIR}/KD_output/decisions"
    mkdir -p "${KD_DIR}/KD_output/risks"
    mkdir -p "${KD_DIR}/KD_output/testsprite"
    mkdir -p "${KD_DIR}/KD_output/github-reader"
    
    # Tools directories (KEKAL)
    mkdir -p "${KD_DIR}/testsprite"
    mkdir -p "${KD_DIR}/github-reader"
    mkdir -p "${KD_DIR}/tool-selector"
    mkdir -p "${KD_DIR}/version-checker"
    mkdir -p "${KD_DIR}/analytics"
    mkdir -p "${KD_DIR}/exporters"
    mkdir -p "${KD_DIR}/artifacts"
    mkdir -p "${KD_DIR}/git-integration"
    
    echo "[KD] ✅ Directories created"
}

# ============================================
# PHASE 2: DOWNLOAD FILES
# ============================================

download_file() {
    local url="$1"
    local dest="$2"
    curl -fsSL "$url" -o "$dest" 2>/dev/null || echo "[KD] ⚠️  Failed: $url"
}

download_all() {
    local base="${KD_RAW}/src"
    
    echo "[KD] 📥 Downloading files..."
    
    # === NEW: AGENTS (YAML) ===
    echo "[KD] 📥 Downloading agents..."
    local agents="analyst pm architect tech-lead engineer qa scrum-master security devops release-manager ux-designer data-scientist mobile-developer database-admin solo-dev"
    for agent in $agents; do
        download_file "${base}/agents/${agent}.agent.yaml" "${KD_DIR}/agents/${agent}.agent.yaml"
    done
    
    # === NEW: WORKFLOWS ===
    echo "[KD] 📥 Downloading workflows..."
    
    # Discovery/analyze
    for step in workflow step-01-orient step-02-interview step-03-research step-04-synthesize step-05-brief; do
        download_file "${base}/workflows/discovery/analyze/${step}.md" "${KD_DIR}/workflows/discovery/analyze/${step}.md"
    done
    
    # Discovery/brainstorm
    for step in workflow step-01-setup step-02-ideation step-03-evaluation step-04-summary; do
        download_file "${base}/workflows/discovery/brainstorm/${step}.md" "${KD_DIR}/workflows/discovery/brainstorm/${step}.md"
    done
    
    # Discovery/domain-research
    for step in workflow step-01-scope step-02-research step-03-report; do
        download_file "${base}/workflows/discovery/domain-research/${step}.md" "${KD_DIR}/workflows/discovery/domain-research/${step}.md"
    done
    
    # Planning/prd-create
    for step in workflow step-01-orient step-02-personas step-03-requirements step-04-nfr step-05-epics step-06-mvp step-07-metrics step-08-validate; do
        download_file "${base}/workflows/planning/prd-create/${step}.md" "${KD_DIR}/workflows/planning/prd-create/${step}.md"
    done
    
    # Planning/prd-validate
    for step in workflow step-01-check step-02-score step-03-report; do
        download_file "${base}/workflows/planning/prd-validate/${step}.md" "${KD_DIR}/workflows/planning/prd-validate/${step}.md"
    done
    
    # Planning/epics-stories
    for step in workflow step-01-read-prd step-02-define-epics step-03-write-stories step-04-sequence step-05-validate; do
        download_file "${base}/workflows/planning/epics-stories/${step}.md" "${KD_DIR}/workflows/planning/epics-stories/${step}.md"
    done
    
    # Architecture/design
    for step in workflow step-01-orient step-02-tech-stack step-03-database step-04-api step-05-security step-06-validate; do
        download_file "${base}/workflows/architecture/design/${step}.md" "${KD_DIR}/workflows/architecture/design/${step}.md"
    done
    
    # Architecture/tech-research
    for step in workflow step-01-identify step-02-compare step-03-recommend; do
        download_file "${base}/workflows/architecture/tech-research/${step}.md" "${KD_DIR}/workflows/architecture/tech-research/${step}.md"
    done
    
    # Architecture/api-design
    for step in workflow step-01-resources step-02-endpoints step-03-contracts step-04-validate; do
        download_file "${base}/workflows/architecture/api-design/${step}.md" "${KD_DIR}/workflows/architecture/api-design/${step}.md"
    done
    
    # Implementation/story-generate
    for step in workflow step-01-read-prd step-02-identify-stories step-03-sequence step-04-generate-files step-05-validate; do
        download_file "${base}/workflows/implementation/story-generate/${step}.md" "${KD_DIR}/workflows/implementation/story-generate/${step}.md"
    done
    
    # Implementation/dev-story
    for step in workflow step-01-orient step-02-tdd-setup step-03-implement step-04-test step-05-handoff; do
        download_file "${base}/workflows/implementation/dev-story/${step}.md" "${KD_DIR}/workflows/implementation/dev-story/${step}.md"
    done
    
    # Implementation/code-review
    for step in workflow step-01-read-story step-02-review-code step-03-security-check step-04-report; do
        download_file "${base}/workflows/implementation/code-review/${step}.md" "${KD_DIR}/workflows/implementation/code-review/${step}.md"
    done
    
    # Implementation/refactor
    for step in workflow step-01-analyze step-02-plan step-03-execute; do
        download_file "${base}/workflows/implementation/refactor/${step}.md" "${KD_DIR}/workflows/implementation/refactor/${step}.md"
    done
    
    # Quality/test-design
    for step in workflow step-01-strategy step-02-unit step-03-integration step-04-e2e; do
        download_file "${base}/workflows/quality/test-design/${step}.md" "${KD_DIR}/workflows/quality/test-design/${step}.md"
    done
    
    # Quality/test-execute
    for step in workflow step-01-run step-02-analyze step-03-report; do
        download_file "${base}/workflows/quality/test-execute/${step}.md" "${KD_DIR}/workflows/quality/test-execute/${step}.md"
    done
    
    # Quality/security-audit
    for step in workflow step-01-surface step-02-threats step-03-test step-04-report; do
        download_file "${base}/workflows/quality/security-audit/${step}.md" "${KD_DIR}/workflows/quality/security-audit/${step}.md"
    done
    
    # Deployment/plan
    for step in workflow step-01-environment step-02-pipeline step-03-rollback step-04-checklist; do
        download_file "${base}/workflows/deployment/plan/${step}.md" "${KD_DIR}/workflows/deployment/plan/${step}.md"
    done
    
    # Deployment/execute
    for step in workflow step-01-pre-check step-02-deploy step-03-verify; do
        download_file "${base}/workflows/deployment/execute/${step}.md" "${KD_DIR}/workflows/deployment/execute/${step}.md"
    done
    
    # Release/notes
    for step in workflow step-01-collect-changes step-02-write-notes step-03-publish; do
        download_file "${base}/workflows/release/notes/${step}.md" "${KD_DIR}/workflows/release/notes/${step}.md"
    done
    
    # Release/retrospective
    for step in workflow step-01-collect-data step-02-analyze step-03-action-items; do
        download_file "${base}/workflows/release/retrospective/${step}.md" "${KD_DIR}/workflows/release/retrospective/${step}.md"
    done
    
    # === NEW: GATES ===
    echo "[KD] 📥 Downloading gates..."
    for gate in discovery-exit requirements-exit architecture-exit implementation-exit quality-exit deployment-exit release-exit; do
        download_file "${base}/gates/${gate}.md" "${KD_DIR}/gates/${gate}.md"
    done
    
    # === NEW: KNOWLEDGE ===
    echo "[KD] 📥 Downloading knowledge base..."
    download_file "${base}/knowledge/kd-index.md" "${KD_DIR}/knowledge/kd-index.md"
    for pattern in auth-patterns api-patterns database-patterns security-patterns; do
        download_file "${base}/knowledge/patterns/${pattern}.md" "${KD_DIR}/knowledge/patterns/${pattern}.md"
    done
    for standard in code-style naming-conventions documentation-standards; do
        download_file "${base}/knowledge/standards/${standard}.md" "${KD_DIR}/knowledge/standards/${standard}.md"
    done
    
    # === CONFIG (KEKAL + NEW) ===
    echo "[KD] 📥 Downloading config..."
    download_file "${base}/config/defaults.json" "${KD_DIR}/config/defaults.json"
    download_file "${base}/config/settings-schema.json" "${KD_DIR}/config/settings-schema.json"
    download_file "${base}/config/agents/personalities.json" "${KD_DIR}/config/agents/personalities.json"
    download_file "${base}/config/agents/names.json" "${KD_DIR}/config/agents/names.json"
    download_file "${base}/config/scale-taxonomy.yaml" "${KD_DIR}/config/scale-taxonomy.yaml"
    download_file "${base}/config/language/en.json" "${KD_DIR}/config/language/en.json"
    download_file "${base}/config/language/ms.json" "${KD_DIR}/config/language/ms.json"
    
    # === SKILLS (KEKAL) ===
    echo "[KD] 📥 Downloading skills..."
    download_file "${base}/skills/SKILLS.md" "${KD_DIR}/skills/SKILLS.md"
    for skill in 01-supabase-postgres 02-insecure-defaults 03-react-nextjs 04-premium-design-system 05-web-perf 06-code-review 07-pwa-service-worker 08-testing-qa 09-animations-components 10-recursive-decomposition 11-api-design 12-devops-deployment 13-game-development 14-mobile-development 15-documentation 16-browser-testing 17-github-analysis; do
        download_file "${base}/skills/${skill}.md" "${KD_DIR}/skills/${skill}.md"
    done
    
    # === TEMPLATES (KEKAL) ===
    echo "[KD] 📥 Downloading templates..."
    for template in architecture decision-log deployment-plan prd product-brief release-notes risk-register status story-card tech-stack phase-gate-report; do
        download_file "${base}/templates/${template}.md" "${KD_DIR}/templates/${template}.md"
    done
    
    # === CHECKLISTS (KEKAL) ===
    echo "[KD] 📥 Downloading checklists..."
    for checklist in checkpoint-approval code-quality decision-validation pre-deployment security-audit stage-completion; do
        download_file "${base}/checklists/${checklist}.md" "${KD_DIR}/checklists/${checklist}.md"
    done
    
    # === PROMPTS (KEKAL + ENHANCED) ===
    echo "[KD] 📥 Downloading prompts..."
    download_file "${base}/prompts/system-prompt.md" "${KD_DIR}/prompts/system-prompt.md"
    download_file "${base}/prompts/handoff-protocol.md" "${KD_DIR}/prompts/handoff-protocol.md"
    download_file "${base}/prompts/role-switcher.md" "${KD_DIR}/prompts/role-switcher.md"
    download_file "${base}/prompts/conflict-resolution.md" "${KD_DIR}/prompts/conflict-resolution.md"
    
    # Multi-agent
    for ma in agent-swarm aggregation confidence-scoring conflict-resolution party-mode; do
        download_file "${base}/prompts/multi-agent/${ma}.md" "${KD_DIR}/prompts/multi-agent/${ma}.md"
    done
    
    # Stages
    for stage in discovery brainstorm requirements architecture implementation testing quality deployment release; do
        download_file "${base}/prompts/stages/${stage}.md" "${KD_DIR}/prompts/stages/${stage}.md"
    done
    
    # === TOOLS (KEKAL) ===
    echo "[KD] 📥 Downloading tools..."
    
    # TestSprite
    download_file "${base}/testsprite/testsprite-core.js" "${KD_DIR}/testsprite/testsprite-core.js"
    download_file "${base}/testsprite/browser-setup.js" "${KD_DIR}/testsprite/browser-setup.js"
    
    # GitHub Reader
    download_file "${base}/github-reader/github-reader.js" "${KD_DIR}/github-reader/github-reader.js"
    download_file "${base}/github-reader/kd-github-read.js" "${KD_DIR}/github-reader/kd-github-read.js"
    
    # Tool Selector
    download_file "${base}/tool-selector/tool-selector.js" "${KD_DIR}/tool-selector/tool-selector.js"
    download_file "${base}/tool-selector/knowledge-base.json" "${KD_DIR}/tool-selector/knowledge-base.json"
    
    # Version Checker
    download_file "${base}/version-checker/version-checker.js" "${KD_DIR}/version-checker/version-checker.js"
    download_file "${base}/version-checker/registry.json" "${KD_DIR}/version-checker/registry.json"
    download_file "${base}/version-checker/compatibility-rules.json" "${KD_DIR}/version-checker/compatibility-rules.json"
    
    # Exporters
    download_file "${base}/exporters/export-jira.js" "${KD_DIR}/exporters/export-jira.js"
    download_file "${base}/exporters/export-pdf.sh" "${KD_DIR}/exporters/export-pdf.sh"
    download_file "${base}/exporters/export-consolidated.sh" "${KD_DIR}/exporters/export-consolidated.sh"
    
    # === CORE (KEKAL) ===
    echo "[KD] 📥 Downloading core..."
    download_file "${base}/core/core.md" "${KD_DIR}/core/core.md"
    download_file "${base}/core/kracked.sh" "${KD_DIR}/core/kracked.sh"
    download_file "${base}/core/language.sh" "${KD_DIR}/core/language.sh"
    download_file "${base}/core/status.sh" "${KD_DIR}/core/status.sh"
    download_file "${base}/core/utils.sh" "${KD_DIR}/core/utils.sh"
    download_file "${base}/core/validation.sh" "${KD_DIR}/core/validation.sh"
    
    # Indexes
    for idx in skills-index commands-index tools-index roles-index stages-index workflows-index; do
        download_file "${base}/core/indexes/${idx}.md" "${KD_DIR}/core/indexes/${idx}.md"
    done
    
    echo "[KD] ✅ All files downloaded"
}

# ============================================
# PHASE 3: INITIALIZE STATUS
# ============================================

init_status() {
    local status_file="${KD_DIR}/KD_output/status/status.md"
    
    if [ ! -f "$status_file" ]; then
        cat > "$status_file" << 'EOF'
# KD Project Status

## Meta
- **Project:** [Untitled]
- **Scale:** Not assessed
- **Language:** EN
- **Started:** [date]

## Current Stage
Ready to begin — Run `/KD-analyze` to start.

## Agent Names (Project-Specific)
| Role | Name | Activated |
|------|------|-----------|
| Analyst | - | - |
| PM | - | - |
| Architect | - | - |
| Engineer | - | - |

## Phase Gates
| Phase | Status | Artifact |
|-------|--------|----------|
| Discovery | ⏳ Pending | product-brief.md |
| Requirements | ⏳ Locked | prd.md |
| Architecture | ⏳ Locked | architecture.md |
| Implementation | ⏳ Locked | story files |
| Quality | ⏳ Locked | test results |
| Deployment | ⏳ Locked | deployment-plan.md |
| Release | ⏳ Locked | release-notes.md |

---
*KD v5.0.0 | KRACKEDDEVS*
EOF
        echo "[KD] ✅ Status initialized"
    fi
}

# ============================================
# MAIN
# ============================================

main() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  📦 KD INSTALLER v${KD_VERSION}"
    echo "  KRACKEDDEVS — AI Skill System"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    create_directories
    download_all
    init_status
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  ✅ KD v${KD_VERSION} INSTALLED!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  Next steps:"
    echo "  1. Start your AI tool (Claude Code, Cursor, etc.)"
    echo "  2. Run /KD-analyze to begin"
    echo ""
    echo "  KD finishes what it starts."
    echo ""
}

main "$@"
```

---

# 8. CHECKLIST IMPLEMENTASI LENGKAP

## Fasa 1: Agents (14 files)
- [ ] `src/agents/analyst.agent.yaml` — Dari prompts/roles/analyst.md
- [ ] `src/agents/pm.agent.yaml` — Dari prompts/roles/product-manager.md
- [ ] `src/agents/architect.agent.yaml` — Dari prompts/roles/architect.md
- [ ] `src/agents/tech-lead.agent.yaml` — Dari prompts/roles/tech-lead.md
- [ ] `src/agents/engineer.agent.yaml` — Dari prompts/roles/engineer.md
- [ ] `src/agents/qa.agent.yaml` — Dari prompts/roles/qa.md
- [ ] `src/agents/scrum-master.agent.yaml` — BARU
- [ ] `src/agents/security.agent.yaml` — Dari prompts/roles/security.md
- [ ] `src/agents/devops.agent.yaml` — Dari prompts/roles/devops.md
- [ ] `src/agents/release-manager.agent.yaml` — Dari prompts/roles/release-manager.md
- [ ] `src/agents/ux-designer.agent.yaml` — Dari prompts/roles/ux-designer.md
- [ ] `src/agents/data-scientist.agent.yaml` — Dari prompts/roles/data-scientist.md
- [ ] `src/agents/mobile-developer.agent.yaml` — Dari prompts/roles/mobile-developer.md
- [ ] `src/agents/database-admin.agent.yaml` — Dari prompts/roles/database-admin.md
- [ ] `src/agents/solo-dev.agent.yaml` — BARU

## Fasa 2: Workflows (~80 files)
- [ ] Discovery: analyze (6 files), brainstorm (5 files), domain-research (4 files)
- [ ] Planning: prd-create (9 files), prd-validate (4 files), epics-stories (6 files)
- [ ] Architecture: design (7 files), tech-research (4 files), api-design (5 files)
- [ ] Implementation: story-generate (6 files), dev-story (6 files), code-review (5 files), refactor (4 files)
- [ ] Quality: test-design (5 files), test-execute (4 files), security-audit (5 files)
- [ ] Deployment: plan (5 files), execute (4 files)
- [ ] Release: notes (4 files), retrospective (4 files)

## Fasa 3: Gates (7 files)
- [ ] `src/gates/discovery-exit.md`
- [ ] `src/gates/requirements-exit.md`
- [ ] `src/gates/architecture-exit.md`
- [ ] `src/gates/implementation-exit.md`
- [ ] `src/gates/quality-exit.md`
- [ ] `src/gates/deployment-exit.md`
- [ ] `src/gates/release-exit.md`

## Fasa 4: Knowledge (8 files)
- [ ] `src/knowledge/kd-index.md`
- [ ] `src/knowledge/patterns/auth-patterns.md`
- [ ] `src/knowledge/patterns/api-patterns.md`
- [ ] `src/knowledge/patterns/database-patterns.md`
- [ ] `src/knowledge/patterns/security-patterns.md`
- [ ] `src/knowledge/standards/code-style.md`
- [ ] `src/knowledge/standards/naming-conventions.md`
- [ ] `src/knowledge/standards/documentation-standards.md`

## Fasa 5: Config (2 files baru)
- [ ] `src/config/scale-taxonomy.yaml`
- [ ] `src/config/agents/names.json`

## Fasa 6: Templates Enhancement (2 files)
- [ ] `src/templates/status.md` — Tambah phase gates section
- [ ] `src/templates/story-card.md` — Tambah technical context section
- [ ] `src/templates/tech-stack.md` — BARU
- [ ] `src/templates/phase-gate-report.md` — BARU

## Fasa 7: System Prompt Enhancement
- [ ] `src/prompts/system-prompt.md` — Tambah Agent Loading Protocol
- [ ] `src/prompts/system-prompt.md` — Tambah Workflow Execution Protocol
- [ ] `src/prompts/handoff-protocol.md` — Tambah gate checking

## Fasa 8: Core Indexes
- [ ] `src/core/indexes/workflows-index.md` — BARU
- [ ] `src/core/indexes/roles-index.md` — Update untuk point ke YAML
- [ ] `src/core/indexes/commands-index.md` — Update dengan new commands

## Fasa 9: TUI Installer (kd.js)
- [ ] `src/tui/screens/install.js` — Update dengan directories & files baru
- [ ] `src/tui/screens/update.js` — Update untuk support new files
- [ ] (install.sh & install.ps1 adalah wrappers sahaja, kekalkan)

## Fasa 10: Testing
- [ ] Test fresh install
- [ ] Test agent activation dengan random names
- [ ] Test workflow execution
- [ ] Test gate checking
- [ ] Test skill loading
- [ ] Test tool integration

## Fasa 11: Cleanup
- [ ] DELETE `src/prompts/roles/*.md` (diganti dengan YAML)
- [ ] Update CHANGELOG.md
- [ ] Commit & push

---

# 9. COUNT SUMMARY

| Category | Count | Status |
|----------|-------|--------|
| Agent YAML files | 15 | BARU |
| Workflow step files | ~80 | BARU |
| Gate files | 7 | BARU |
| Knowledge files | 8 | BARU |
| Config files baru | 2 | BARU |
| Template updates | 4 | ENHANCED |
| System prompt updates | 2 | ENHANCED |
| Core index updates | 3 | ENHANCED |
| Install scripts | 3 | REWRITE |
| Role MD files | 14 | DELETE |
| **TOTAL NEW** | ~112 | — |
| **TOTAL ENHANCED** | ~9 | — |
| **TOTAL DELETED** | 14 | — |

---

# 10. VERSION

**KEKAL: 5.0.0**

Ini adalah enhancement, bukan breaking change.

---

# 11. KELEBIHAN KD vs BMAD

Selepas upgrade, KD akan ada:

| Feature | KD 5.0 | BMAD |
|---------|--------|------|
| Agent YAML | ✅ | ✅ |
| Workflow Sharding | ✅ | ✅ |
| Story Files | ✅ | ✅ |
| Validation Gates | ✅ | ✅ |
| Knowledge Base | ✅ | ✅ |
| **Bahasa Melayu** | ✅ | ❌ |
| **Game Dev Suite** | ✅ (15+ commands) | ❌ |
| **Browser Testing** | ✅ (TestSprite) | Limited |
| **GitHub Reader** | ✅ | ❌ |
| **80+ Commands** | ✅ | ~40 |
| **17 Skills** | ✅ | Varies |

---

# 12. PERBANDINGAN SEBELUM & SELEPAS

## Sebelum (KD 5.0 Current)
```
User run /KD-analyze
    ↓
AI baca system-prompt.md
    ↓
AI baca prompts/roles/analyst.md (text)
    ↓
AI execute dengan interpretasi sendiri
    ↓
Output mungkin inconsistent
```

## Selepas (KD 5.0 Upgraded)
```
User run /KD-analyze
    ↓
AI baca system-prompt.md (enhanced)
    ↓
AI baca agents/analyst.agent.yaml (structured)
    ↓
AI random-pick name dari name_pool (first time only)
    ↓
AI load skills dari skills/ (berdasarkan YAML)
    ↓
AI execute workflow step-by-step
    ↓
AI check gate sebelum proceed
    ↓
Output CONSISTENT & STRUCTURED
```

---

*KD finishes what it starts.*  
*KRACKEDDEVS — AI Skill System v5.0.0*

---

# ⏸️ MENUNGGU APPROVAL

**SILA BACA PLAN INI DENGAN TELITI.**

**Key Points:**
1. ✅ Role files lama DIGANTI dengan YAML (lebih structured)
2. ✅ Skills KEKAL (17 skills dihubungkan via YAML)
3. ✅ Tools KEKAL (testsprite, github-reader, dll)
4. ✅ Templates KEKAL dengan enhancement
5. ✅ System prompt ENHANCED dengan protocols baru
6. ✅ Semua yang lama dihubungkan dengan yang baru

Selepas anda setuju, cakap **"TERUSKAN"** untuk saya mula implementasi.

Jika ada yang perlu diubah, beritahu saya.