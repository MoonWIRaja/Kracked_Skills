---
step_id: "02-tdd-setup"
agent: "engineer"
estimated_tokens: 2000
---

# Step 2: TDD Setup

## Context
Write tests before implementation (Test-Driven Development).

## Instructions

### 1. Identify Test Cases

From acceptance criteria, derive test cases:
- Unit tests for each criterion
- Integration tests for workflows
- Edge case tests

### 2. Create Test File

Create appropriate test file:
- `[filename].test.ts` or `[filename].spec.ts`
- Place in `__tests__/` or alongside source

### 3. Write Failing Tests

Write tests that:
- Test expected behavior
- Will fail initially (no implementation)
- Cover happy path and edge cases

### 4. Run Tests

Confirm tests fail as expected.

## Output Format

```
[ENG] 🧪 TDD Setup Complete

**Test File:** [path/to/file.test.ts]

**Test Cases:**
1. ✗ [test case 1] - Expected to fail
2. ✗ [test case 2] - Expected to fail
3. ✗ [test case 3] - Expected to fail

**Test Run:**
```
[X] [test case 1]
[X] [test case 2]
[X] [test case 3]

3 failed, 0 passed
```

**Next:** Proceeding to Step 3: Implement...