## Role Handoff Protocol

### Pre-Handoff Gate Check

Before any handoff, validate the exit gate:

```yaml
gate_check:
  from_phase: [current phase]
  to_phase: [next phase]
  gate_file: gates/[phase]-exit.md
  checks:
    - [ ] All artifacts produced
    - [ ] Quality criteria met
    - [ ] No critical blockers
  result: PASS/FAIL
```

### Standard Handoff Template

```yaml
handoff:
  from: ROLE_NAME
  to: ROLE_NAME
  stage: CURRENT_STAGE
  context:
    completed_tasks:
      - task_1
      - task_2
    pending_decisions:
      - decision_1
      - decision_2
    artifacts:
      - artifact_path_1
      - artifact_path_2
    blockers:
      - blocker_1
  next_actions:
    - action_1
    - action_2
```

### Example Handoff: PM → ARCHITECT

```yaml
handoff:
  from: PM
  to: ARCHITECT
  stage: Requirements → Architecture
  context:
    completed_tasks:
      - "Product brief finalized"
      - "User stories written (15 stories)"
      - "Acceptance criteria defined"
    pending_decisions:
      - "Tech stack selection (React vs Vue)"
      - "Database choice (PostgreSQL vs MongoDB)"
    artifacts:
      - ".kracked/KD_output/product-brief/brief.md"
      - ".kracked/KD_output/PRD/prd.md"
      - ".kracked/KD_output/epics-and-stories/epic-1/"
    blockers:
      - "Third-party API rate limits unknown"
  next_actions:
    - "Design system architecture"
    - "Select tech stack"
    - "Create database schema"
    - "Define API contracts"
```

**Auto-Triggered Message**:
```
[PM] → [ARCHITECT] Handoff Complete

Context Summary:
✅ 15 user stories completed
✅ All acceptance criteria defined
⏳ 2 decisions pending (tech stack, database)
🚧 1 blocker (API rate limits)

Ready for Architecture Phase.

[ARCHITECT] acknowledged. Beginning system design...
```
