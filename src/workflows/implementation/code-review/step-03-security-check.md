---
step_id: "03-security-check"
agent: "qa"
estimated_tokens: 2000
---

# Step 3: Security Check

## Context
Validate security practices in code.

## Instructions

### 1. Authentication Check

- Passwords not hardcoded
- Tokens properly managed
- Sessions secure

### 2. Input Validation

- All inputs validated
- SQL injection prevention
- XSS prevention

### 3. Data Protection

- Sensitive data encrypted
- No secrets in code
- Proper error messages (no leak)

### 4. Dependencies

- No known vulnerable packages
- Dependencies up to date

## Output Format

```
[QA] 🔒 Security Check Complete

## Security Audit

| Check | Status | Notes |
|-------|--------|-------|
| No hardcoded secrets | ✅ | |
| Input validation | ✅ | |
| SQL injection prevention | ✅ | |
| XSS prevention | ✅ | |
| Secure auth | ✅ | |

## Vulnerabilities Found

| Severity | Count | Details |
|----------|-------|---------|
| Critical | 0 | |
| High | 0 | |
| Medium | 0 | |
| Low | 0 | |

**Next:** Proceeding to Step 4: Report...