---
step_id: "03-write-stories"
agent: "tech-lead"
estimated_tokens: 3000
---

# Step 3: Write Stories

## Context
Create user stories with acceptance criteria.

## Instructions

### 1. Story Template

```markdown
# Story [Epic-N]: [Title]

## User Story
As a [persona], I want [action] so that [benefit]

## Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

## Technical Notes
[Implementation hints]

## Definition of Done
- [ ] Code complete
- [ ] Unit tests passing
- [ ] Code review approved
- [ ] QA verified

## Points
[1/2/3/5/8]

## Dependencies
[Other stories this depends on]
```

### 2. Write INVEST Stories

Stories should be:
- **I**ndependent: Can be developed separately
- **N**egotiable: Details can be discussed
- **V**aluable: Delivers user value
- **E**stimable: Can be estimated
- **S**mall: Fits in single sprint
- **T**estable: Has clear acceptance criteria

### 3. Save Story Files

Save to `.kracked/KD_output/epics-and-stories/story-[epic]-[N].md`

## Output Format

```
[TL] 📝 Stories Written

**Total Stories:** [X]

| Story ID | Title | Points | Epic |
|----------|-------|--------|------|
| 1-1 | Login | 3 | Epic 1 |
| 1-2 | Register | 5 | Epic 1 |
| 1-3 | Password Reset | 2 | Epic 1 |

**Total Points:** [X]

**Next:** Proceeding to Step 4: Sequence...