---
step_id: "03-implement"
agent: "engineer"
estimated_tokens: 3000
---

# Step 3: Implement

## Context
Write code to pass the tests.

## Instructions

### 1. Apply Skills

Use loaded skills from `.kracked/skills/`:
- Follow patterns and best practices
- Apply security considerations
- Follow architecture decisions

### 2. Write Code

Implement:
- Start with simplest solution
- Make tests pass
- Refactor if needed

### 3. Follow Standards

From architecture:
- Code style
- File structure
- Naming conventions

### 4. Run Tests Frequently

After each change:
- Run tests
- Fix failures
- Ensure no regressions

## Output Format

```
[ENG] 💻 Implementation Complete

**Files Created/Modified:**
- [file1] — [description]
- [file2] — [description]

**Test Run:**
```
[✓] [test case 1]
[✓] [test case 2]
[✓] [test case 3]

0 failed, 3 passed
```

**Code Quality:**
- [x] Follows architecture
- [x] No hardcoded secrets
- [x] Error handling
- [x] Comments added

**Next:** Proceeding to Step 4: Test...