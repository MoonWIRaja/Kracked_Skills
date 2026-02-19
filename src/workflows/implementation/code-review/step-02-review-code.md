---
step_id: "02-review-code"
agent: "qa"
estimated_tokens: 2500
---

# Step 2: Review Code

## Context
Review code against quality standards.

## Instructions

### 1. Code Quality Check

Check:
- Code style consistency
- Naming conventions
- Comments and documentation
- Error handling

### 2. Architecture Compliance

Verify:
- Follows tech stack decisions
- Uses defined patterns
- Respects file structure

### 3. Test Coverage

Verify:
- Unit tests exist
- Tests are meaningful
- Edge cases covered

### 4. Best Practices

Check:
- DRY principle
- SOLID principles
- No code smells

## Output Format

```
[QA] 🔍 Code Review Complete

## Quality Scores

| Category | Score | Issues |
|----------|-------|--------|
| Code Style | [X]/10 | [count] |
| Architecture | [X]/10 | [count] |
| Test Coverage | [X]/10 | [count] |
| Best Practices | [X]/10 | [count] |

## Issues Found

| File | Issue | Severity |
|------|-------|----------|
| [file] | [issue] | [High/Med/Low] |

**Next:** Proceeding to Step 3: Security Check...