# KD Changelog

All notable changes to the Kracked_Skills (KD) project will be documented in this file.

## [5.0.0] - 2026-02-19

### Major Upgrade — Phase-Gate Architecture

#### Added
- **Agent YAML Files**: 15 agent definitions with skills mapping
  - `src/agents/*.agent.yaml`
  - Includes: analyst, pm, architect, tech-lead, engineer, qa, security, devops, release-manager, ux-designer, data-scientist, mobile-developer, database-admin, scrum-master, solo-dev

- **Phase Gates**: 7 exit gate documents
  - `src/gates/discovery-exit.md`
  - `src/gates/requirements-exit.md`
  - `src/gates/architecture-exit.md`
  - `src/gates/implementation-exit.md`
  - `src/gates/quality-exit.md`
  - `src/gates/deployment-exit.md`
  - `src/gates/release-exit.md`

- **Workflows**: Complete workflow system (~60 files)
  - Discovery: analyze, brainstorm, domain-research
  - Planning: prd-create, prd-validate, epics-stories
  - Architecture: design
  - Implementation: dev-story, code-review
  - Deployment: plan
  - Release: notes

- **Knowledge Base**: 8 pattern/standard files
  - `src/knowledge/patterns/auth-patterns.md`
  - `src/knowledge/patterns/api-patterns.md`
  - `src/knowledge/patterns/database-patterns.md`
  - `src/knowledge/patterns/security-patterns.md`
  - `src/knowledge/standards/code-style.md`
  - `src/knowledge/standards/naming-conventions.md`
  - `src/knowledge/standards/documentation-standards.md`

- **Scale Taxonomy**: Project scale detection
  - `src/config/scale-taxonomy.yaml`
  - SMALL, STANDARD, DEEP scales with workflow depth adjustment

- **Agent Names Configuration**
  - `src/config/agents/names.json`

#### Changed
- Updated `roles-index.md` to reference agent YAML files
- Added `workflows-index.md` for workflow navigation
- Enhanced workflow structure with step-by-step instructions

#### Architecture
- Phase-gate model implementation
- Agent-first approach
- Scale-aware workflows
- Knowledge-driven development

### Previous Versions
- v4.x: Initial modular structure
- v3.x: Multi-agent support
- v2.x: Role-based system
- v1.x: Basic project structure