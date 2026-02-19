---
step_id: "04-api"
agent: "architect"
estimated_tokens: 2000
---

# Step 4: API

## Context
Define API contracts and endpoints.

## Instructions

### 1. API Style

Choose style:
- REST
- GraphQL
- tRPC

### 2. Endpoint Design

For each endpoint:
- HTTP method
- Path
- Request body
- Response body
- Authentication required

### 3. Error Handling

Define error response format.

### 4. Rate Limiting

Define rate limits per endpoint.

## Output Format

```
[ARCH] 🔌 API Design Complete

## Endpoints

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/login | No | Login |
| POST | /auth/register | No | Register |

### Resources
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /users | Yes | List users |

## Response Format
```json
{
  "data": {},
  "error": null
}
```

**Next:** Proceeding to Step 5: Security...