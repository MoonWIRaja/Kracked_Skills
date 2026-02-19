---
step_id: "02-tech-stack"
agent: "architect"
estimated_tokens: 2000
---

# Step 2: Tech Stack

## Context
Select technologies for each layer of the system.

## Instructions

### 1. Frontend Selection

Options:
- React/Next.js
- Vue/Nuxt
- Angular
- Svelte
- React Native (mobile)
- Flutter (mobile)

### 2. Backend Selection

Options:
- Node.js/Express
- Python/FastAPI
- Go
- Rust
- Next.js API routes

### 3. Database Selection

Options:
- PostgreSQL (Supabase)
- MySQL
- MongoDB
- Redis (caching)

### 4. Infrastructure Selection

Options:
- Vercel
- AWS
- GCP
- Azure
- Self-hosted

### 5. Justify Choices

For each selection, document:
- Why this technology?
- Alternatives considered?
- Risks?

## Output Format

```
[ARCH] 🔧 Tech Stack Selected

| Layer | Technology | Version | Reason |
|-------|------------|---------|--------|
| Frontend | [tech] | [ver] | [why] |
| Backend | [tech] | [ver] | [why] |
| Database | [tech] | [ver] | [why] |
| Hosting | [tech] | [ver] | [why] |

**Risk Assessment:**
- [risk 1]: [mitigation]
- [risk 2]: [mitigation]

**Next:** Proceeding to Step 3: Database...