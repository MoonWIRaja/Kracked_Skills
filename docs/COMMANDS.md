# KD Commands Reference v5.0.0

## Setup Commands

| Command | Description |
|---------|-------------|
| `/KD-kickoff` | Initialize project context |
| `/KD-help` | Show all available commands |
| `/KD-status` | Display current project state |

## Core Workflow Commands

### `/KD-analyze`

Start discovery. Activates Analyst role.

- Gathers project context
- Identifies risks
- Assesses project scale (SMALL/STANDARD/DEEP)

### `/KD-brainstorm`

Ideate solutions. Activates PM role.

- Requires: Discovery complete
- Produces: `brainstorm.md`

### `/KD-product-brief`

Create a Product Brief. Activates PM role.

- Requires: Discovery complete
- Produces: `product-brief.md`
- ⏸️ Requires human approval

### `/KD-prd`

Create a PRD. Activates PM role.

- Requires: Product Brief approved
- Produces: `prd.md`
- ⏸️ Requires human approval

### `/KD-architecture [--depth=quick|standard|deep]`

Design system architecture. Activates Architect role.

- Requires: PRD approved
- Produces: `architecture.md`
- ⏸️ Requires human approval
- `--depth=quick` — Key decisions only
- `--depth=standard` — Full architecture (default)
- `--depth=deep` — Comprehensive with diagrams

### `/KD-epics-and-stories`

Create implementation backlog. Activates Tech Lead role.

- Requires: Architecture approved
- Produces: Story cards

### `/KD-dev-story [id] [--focus=backend|frontend|full]`

Implement a story. Activates Engineer role.

- Requires: Story backlog created
- `--focus=backend` — Backend only
- `--focus=frontend` — Frontend only
- `--focus=full` — Full-stack (default)

### `/KD-code-review [--scope=full|diff] [--severity=normal|strict]`

Code quality and security review. Activates QA + Security roles.

- Requires: Implementation complete
- `--scope=full` — Entire codebase (default)
- `--scope=diff` — Changed files only
- `--severity=normal` — Standard review (default)
- `--severity=strict` — Stricter standards

### `/KD-deployment-plan [--env=staging|production]`

Create deployment strategy. Activates DevOps role.

- Requires: Quality checks passed
- `--env=staging` — Staging deployment
- `--env=production` — Production (⏸️ requires approval)

### `/KD-scale-review`

Post-deployment assessment. Activates Release Manager role.

- Requires: Deployment successful
- Produces: `release-notes.md`

## Role Commands (13 Roles)

| Command | Role | Focus |
|---------|------|-------|
| `/KD-role-analyst` | Analyst | Discovery, risks, scale |
| `/KD-role-pm` | Product Manager | Requirements, PRD |
| `/KD-role-architect` | Architect | System design, tech stack |
| `/KD-role-tech-lead` | Tech Lead | Epics, stories, planning |
| `/KD-role-dev` | Engineer | Code implementation |
| `/KD-role-qa` | QA | Testing, code review |
| `/KD-role-sec` | Security | Security audit |
| `/KD-role-devops` | DevOps | Deployment, CI/CD |
| `/KD-role-rm` | Release Manager | Release notes |
| `/KD-role-ux` | **UX Designer** | Wireframes, user flows |
| `/KD-role-data` | **Data Scientist** | Data pipelines, ML |
| `/KD-role-mobile` | **Mobile Developer** | iOS, Android, cross-platform |
| `/KD-role-dba` | **Database Admin** | Schema, optimization |

## Multi-Agent Commands

### `/KD-party-mode --agents=N --topic="topic"`

Parallel ideation with multiple perspectives.

- `--agents=N` — Number of agents (2-5, default: 3)
- `--topic` — Focus topic

### `/KD-swarm --agents=N --tasks="task1,task2"`

Parallel task execution.

- `--agents=N` — Number of agents (2-8)
- `--tasks` — Comma-separated task list

## Testing Commands

### `/KD-test`

Run test planning. Activates QA role.

### `/KD-test-arch`

Design test architecture.

### `/KD-test-automate`

Create automated tests.

### `/KD-test-sprite --url=URL`

**NEW** Run TestSprite automated testing.

- Visual regression testing
- Functional testing
- Accessibility testing (WCAG 2.1)
- Performance metrics
- `--url` — Target URL to test

## Tool Selection Commands

### `/KD-tool-selector [--type=TYPE] [--scale=SCALE]`

**NEW** Intelligent tech stack recommendations.

- Context-aware framework selection
- Database recommendations
- Scoring engine with metrics
- `--type` — Project type (web, mobile, api)
- `--scale` — Project scale (small, medium, large)

## Agile Commands

### `/KD-sprint-planning`

Plan sprint iteration.

### `/KD-refactor`

Refactor codebase.

### `/KD-retrospective`

Run sprint retrospective.

## Validation Commands

### `/KD-validate`

Validate project state.

### `/KD-fix-course`

Course correction.

## Game Development Commands

### `/KD-game-gdd`

Create Game Design Document.

### `/KD-game-mechanics`

Design game mechanics.

### `/KD-game-qa`

Game testing.

## Innovation Commands

### `/KD-idea-design-thinking`

Design thinking workshop.

### `/KD-idea-storyteller`

Storytelling framework.

## API Commands

### `/KD-api-design`

Design API endpoints.

## Export Commands

### `/KD-export --format=FORMAT`

Export project artifacts.

- `--format=pdf` — Export as PDF
- `--format=jira` — Export to Jira CSV
- `--format=markdown` — Consolidated markdown

---

*Total: 120+ commands available*

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/*
