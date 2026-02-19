# Workflows Index — KD v5.0.0

## Discovery Phase
| Workflow | Agent | Location |
|----------|-------|----------|
| Analyze | Analyst | `workflows/discovery/analyze/` |
| Brainstorm | Analyst | `workflows/discovery/brainstorm/` |
| Domain Research | Analyst | `workflows/discovery/domain-research/` |

## Planning Phase
| Workflow | Agent | Location |
|----------|-------|----------|
| PRD Create | PM | `workflows/planning/prd-create/` |
| PRD Validate | PM | `workflows/planning/prd-validate/` |
| Epics & Stories | Tech Lead | `workflows/planning/epics-stories/` |

## Architecture Phase
| Workflow | Agent | Location |
|----------|-------|----------|
| Architecture Design | Architect | `workflows/architecture/design/` |

## Implementation Phase
| Workflow | Agent | Location |
|----------|-------|----------|
| Dev Story | Engineer | `workflows/implementation/dev-story/` |
| Code Review | QA | `workflows/implementation/code-review/` |

## Deployment Phase
| Workflow | Agent | Location |
|----------|-------|----------|
| Deployment Plan | DevOps | `workflows/deployment/plan/` |

## Release Phase
| Workflow | Agent | Location |
|----------|-------|----------|
| Release Notes | Release Manager | `workflows/release/notes/` |

## Workflow Structure
Each workflow follows this pattern:
```
workflow.md          # Main workflow file
step-01-*.md         # Step instructions
step-02-*.md
...
```

## Activation
```
/KD-[workflow-name]
```

---
*Load workflows on demand*