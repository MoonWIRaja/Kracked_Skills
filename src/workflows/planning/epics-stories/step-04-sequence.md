---
step_id: "04-sequence"
agent: "tech-lead"
estimated_tokens: 1500
---

# Step 4: Sequence

## Context
Order stories by priority and dependencies.

## Instructions

### 1. Apply Dependencies

Ensure dependent stories come after their dependencies.

### 2. Apply Business Priority

Within each epic, prioritize by:
- MVP requirements first
- User value
- Risk mitigation

### 3. Assign to Sprints

Based on velocity estimate:
- Sprint 1: Foundation stories
- Sprint 2-N: Feature stories

### 4. Create Backlog

Generate prioritized backlog file.

## Output Format

```
[TL] 📋 Stories Sequenced

## Sprint Plan

### Sprint 1 (Week 1-2)
| Story | Points | Priority |
|-------|--------|----------|
| 1-1 Login | 3 | P1 |
| 1-2 Register | 5 | P1 |

**Sprint Total:** [X] points

### Sprint 2 (Week 3-4)
| Story | Points | Priority |
|-------|--------|----------|
| 2-1 Dashboard | 5 | P1 |

**Sprint Total:** [X] points

## Backlog Summary
- Sprint 1: [X] points
- Sprint 2: [X] points
- Backlog: [X] points

**Next:** Proceeding to Step 5: Validate...