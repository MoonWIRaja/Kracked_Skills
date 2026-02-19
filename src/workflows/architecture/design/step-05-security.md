---
step_id: "05-security"
agent: "architect"
estimated_tokens: 2000
---

# Step 5: Security

## Context
Define security architecture and controls.

## Instructions

### 1. Authentication

- Method (JWT, OAuth, Session)
- Provider (Auth0, Clerk, Supabase Auth)
- Token management

### 2. Authorization

- Role-based access control (RBAC)
- Permissions model
- Resource ownership

### 3. Data Protection

- Encryption at rest
- Encryption in transit
- Sensitive data handling

### 4. Security Controls

- Input validation
- SQL injection prevention
- XSS prevention
- CSRF protection
- Rate limiting

### 5. Compliance

- GDPR requirements
- Data retention
- Audit logging

## Output Format

```
[ARCH] 🔒 Security Architecture Defined

## Authentication
- Method: [method]
- Provider: [provider]
- Token Expiry: [duration]

## Authorization
- Model: [RBAC/ABAC]
- Roles: [list]

## Data Protection
- Encryption: [standard]
- HTTPS: Enforced

## Security Controls
- [x] Input validation
- [x] SQL injection prevention
- [x] XSS prevention
- [x] CSRF protection
- [x] Rate limiting

**Next:** Proceeding to Step 6: Validate...