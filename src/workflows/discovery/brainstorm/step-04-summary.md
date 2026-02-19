---
step_id: "04-summary"
agent: "analyst"
estimated_tokens: 1500
---

# Step 4: Summary

## Context
You have evaluated all ideas. Now create the brainstorm summary document.

## Instructions

### 1. Create Brainstorm Document

Save to `.kracked/KD_output/brainstorm/brainstorm.md`:

**Structure:**
```markdown
# Brainstorm Summary: [Project Name]

## Session Info
- Date: [date]
- Technique: [technique used]
- Participants: [who participated]
- Duration: [time spent]

## Problem Statement
[From product brief]

## Ideas Generated
[Total count]

## Top Concepts

### Concept 1: [Name]
- Description: [what it is]
- Score: [X.XX]
- Why selected: [rationale]
- Risks: [identified risks]
- MVP approach: [how to start small]

### Concept 2: [Name]
[same structure]

### Concept 3: [Name]
[same structure]

## Ideas Shelved
| Idea | Reason |
|------|--------|
| [idea] | [why shelved] |

## Next Steps
1. [next action]
2. [next action]

## Appendix: All Ideas
[Full list for reference]
```

### 2. Update Status

Update `.kracked/KD_output/status/status.md`:
- Mark Brainstorm stage as complete
- Add brainstorm.md to artifacts

### 3. Present Summary

Display key findings to user.

## Output Format

```
[ANALYST] 📝 Brainstorm Summary Created

**Location:** .kracked/KD_output/brainstorm/brainstorm.md

---

## Brainstorm Summary

**Session:** [technique] on [date]
**Ideas Generated:** [X]
**Top Concepts:** [3 selected]

### Selected Concepts:
1. **[Concept 1]** - [one-line description]
2. **[Concept 2]** - [one-line description]
3. **[Concept 3]** - [one-line description]

---

⏸️ CHECKPOINT: Please review the brainstorm summary.
- Approve to proceed to Requirements phase
- Request changes if needed
```

## Notes
- Keep summary actionable
- Focus on decisions made, not process
- Preserve all ideas for future reference
- This informs the PRD phase