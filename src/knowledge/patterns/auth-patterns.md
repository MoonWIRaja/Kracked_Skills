# Authentication Patterns

## Overview
Standard authentication patterns for KD projects.

## Patterns

### 1. JWT Token Pattern
- Access token (short-lived)
- Refresh token (long-lived)
- Secure storage in httpOnly cookies

### 2. OAuth Integration
- Provider selection
- Callback handling
- User linking

### 3. Session-Based Auth
- Server-side sessions
- Secure session storage
- Session expiration

## Best Practices
- Never store tokens in localStorage
- Use CSRF protection
- Implement token rotation
- Rate limit auth endpoints