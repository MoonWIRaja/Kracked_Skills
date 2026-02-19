---
step_id: "04-report"
agent: "qa"
estimated_tokens: 1500
---

# Step 4: Report

## Context
Generate code review report.

## Instructions

### 1. Compile Report

Create code review summary document.

### 2. Save Report

Save to `.kracked/KD_output/code-review/code-review.md`

### 3. Determine Status

- **PASS:** No critical/high issues
- **CONDITIONAL:** Minor issues, can proceed
- **FAIL:** Critical issues must be fixed

### 4. Update Status

Update status.md with review results.

## Output Format

```
[QA] 📋 Code Review Report

**Location:** .kracked/KD_output/code-review/code-review.md

---

## Summary

**Overall Status:** [PASS/CONDITIONAL/FAIL]

**Quality Score:** [X]/100

**Issues Summary:**
| Severity | Count |
|----------|-------|
| Critical | [X] |
| High | [X] |
| Medium | [X] |
| Low | [X] |

---

⏸️ CHECKPOINT: Code review complete.
- If PASS: Proceed to /KD-deployment-plan
- If FAIL: Return to /KD-dev-story to fix issues