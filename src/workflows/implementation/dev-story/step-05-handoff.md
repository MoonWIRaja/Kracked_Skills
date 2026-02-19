---
step_id: "05-handoff"
agent: "engineer"
estimated_tokens: 1500
---

# Step 5: Handoff

## Context
Complete story and prepare for handoff.

## Instructions

### 1. Update Story Card

Update the story file:
- Mark status as COMPLETE
- Add completion date
- Add notes

### 2. Update Status

Update `.kracked/KD_output/status/status.md`:
- Mark story complete
- Update active story to next
- Log completion

### 3. Commit Changes

If git integration enabled:
- Stage changes
- Commit with story ID

### 4. Determine Next

- More stories? → Suggest next story
- All complete? → Suggest code review

## Output Format

```
[ENG] 🏁 Story Complete

**Story:** [ID] - [Title]
**Status:** COMPLETE
**Points Earned:** [X]

**Files Changed:**
- [file1]
- [file2]

---

✅ Story marked complete. Handoff to QA ready.

**Next Action:**
- Run /KD-dev-story [next-id] for next story
- Or /KD-code-review if all stories complete