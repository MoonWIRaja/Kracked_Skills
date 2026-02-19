---
step_id: "04-test"
agent: "engineer"
estimated_tokens: 2000
---

# Step 4: Test

## Context
Verify all acceptance criteria are met.

## Instructions

### 1. Run All Tests

- Unit tests
- Integration tests
- E2E tests (if applicable)

### 2. Verify Acceptance Criteria

For each criterion:
- Test manually if needed
- Document results

### 3. Edge Cases

Test edge cases:
- Empty inputs
- Invalid inputs
- Boundary conditions

### 4. Browser Testing (if UI)

Use TestSprite if needed:
- Visual verification
- Responsive testing
- Cross-browser testing

## Output Format

```
[ENG] ✅ Testing Complete

**Test Results:**
- Unit Tests: [X] passed
- Integration Tests: [X] passed
- E2E Tests: [X] passed

**Acceptance Criteria Verification:**
| Criterion | Status | Notes |
|-----------|--------|-------|
| [criterion 1] | ✅ PASS | |
| [criterion 2] | ✅ PASS | |

**Edge Cases:**
- [edge case 1]: ✅ Handled
- [edge case 2]: ✅ Handled

**Next:** Proceeding to Step 5: Handoff...