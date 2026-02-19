# Skill 11: API Design

## Overview
REST and GraphQL API design best practices.

## REST Principles
- Use nouns for resources
- HTTP methods for actions
- Proper status codes
- Version your APIs

## Endpoint Naming
```
GET    /api/v1/users          # List users
GET    /api/v1/users/:id      # Get user
POST   /api/v1/users          # Create user
PUT    /api/v1/users/:id      # Update user
DELETE /api/v1/users/:id      # Delete user
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## When to Apply
- Architect: API design
- Engineer: API implementation
- QA: API testing