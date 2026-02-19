---
step_id: "02-define-epics"
agent: "tech-lead"
estimated_tokens: 2000
---

# Step 2: Define Epics

## Context
Create detailed epic definitions.

## Instructions

### 1. Epic File Structure

For each epic, create a file using template:

```markdown
# Epic [N]: [Name]

## Overview
- **Description:** [what this epic delivers]
- **Business Value:** [why it matters]
- **Priority:** [1-N]
- **MVP:** [Yes/No]

## Personas Affected
- [Persona 1]
- [Persona 2]

## Stories
| ID | Story | Points | Status |
|----|-------|--------|--------|
| [N]-1 | [story title] | [X] | Pending |

## Dependencies
- Depends on: [Epic X]
- Blocks: [Epic Y]

## Technical Notes
[Key technical considerations]
```

### 2. Save Epic Files

Save to `.kracked/KD_output/epics-and-stories/epic-[N]-[name].md`

### 3. Estimate Complexity

Rough estimation:
- Small: 2-5 stories
- Medium: 5-8 stories
- Large: 8+ stories

## Output Format

```
[TL] 📦 Epics Defined

**Files Created:** [X]

| Epic | File | Stories | Complexity |
|------|------|---------|------------|
| Epic 1 | epic-1-auth.md | 5 | Medium |
| Epic 2 | epic-2-dashboard.md | 3 | Small |

**Next:** Proceeding to Step 3: Write Stories...