---
step_id: "01-read-prd"
agent: "tech-lead"
estimated_tokens: 1500
---

# Step 1: Read PRD

## Context
Load and understand the PRD before breaking down into stories.

## Instructions

### 1. Load PRD

Read `.kracked/KD_output/PRD/prd.md`

### 2. Extract Epics

List all epics defined in PRD:
- Epic names
- Business value
- Affected personas
- Priority

### 3. Understand Dependencies

Map dependencies between epics.

### 4. Identify MVP Scope

Which epics are MVP vs post-MVP?

## Output Format

```
[TL] 📖 PRD Loaded

**Total Epics:** [X]
**MVP Epics:** [X]

## Epic Summary

| Epic | Priority | MVP | Dependencies |
|------|----------|-----|--------------|
| [Epic 1] | 1 | ✅ | None |
| [Epic 2] | 2 | ✅ | Epic 1 |
| [Epic 3] | 3 | ❌ | Epic 1, 2 |

**Next:** Proceeding to Step 2: Define Epics...