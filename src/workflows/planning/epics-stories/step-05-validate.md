---
step_id: "05-validate"
agent: "tech-lead"
estimated_tokens: 1500
---

# Step 5: Validate

## Context
Validate all stories are complete and actionable.

## Instructions

### 1. Story Validation Checklist

For each story verify:
- [ ] Has acceptance criteria
- [ ] Has points assigned
- [ ] Dependencies documented
- [ ] INVEST criteria met

### 2. Backlog Validation

- Total points reasonable for timeline
- MVP stories identified
- No orphan stories (missing dependencies)

### 3. Update Status

Update status.md with:
- Story count
- Total points
- Sprint plan summary

## Output Format

```
[TL] ✅ Stories Validated

**Total Stories:** [X]
**Total Points:** [X]
**MVP Stories:** [X]

## Validation Results
- Acceptance Criteria: ✅ All stories
- Points Assigned: ✅ All stories
- Dependencies: ✅ No orphans
- INVEST: ✅ All pass

---

⏸️ CHECKPOINT: Epics and Stories ready.
Proceed to /KD-architecture for technical design.