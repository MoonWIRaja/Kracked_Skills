---
step_id: "03-requirements"
agent: "pm"
estimated_tokens: 2500
---

# Step 3: Requirements

## Context
Define functional requirements based on personas and problem statement.

## Instructions

### 1. Brainstorm Features

For each persona, ask:
- What do they need to do?
- What problems must be solved?
- What would delight them?

### 2. Write User Stories

Format: `As a [persona], I want [action] so that [benefit]`

Examples:
- As a user, I want to log in so that I can access my account
- As an admin, I want to manage users so that I can control access

### 3. Prioritize Features

Use MoSCoW prioritization:
- **M**ust Have: Critical for MVP
- **S**hould Have: Important but not critical
- **C**ould Have: Nice to have
- **W**on't Have: Out of scope for now

### 4. Group into Categories

Organize features by:
- User management
- Core functionality
- Administration
- Integrations
- etc.

## Output Format

```
[PM] 📋 Requirements Defined

**Total Features:** [X]
**Must Have:** [X]
**Should Have:** [X]
**Could Have:** [X]
**Won't Have:** [X]

## Must Have (MVP)
| ID | User Story | Priority | Persona |
|----|------------|----------|---------|
| F001 | As a [user], I want [action] so that [benefit] | MUST | [persona] |
| F002 | ... | MUST | [persona] |

## Should Have
| ID | User Story | Priority | Persona |
|----|------------|----------|---------|
| F003 | ... | SHOULD | [persona] |

## Could Have
| ID | User Story | Priority | Persona |
|----|------------|----------|---------|
| F004 | ... | COULD | [persona] |

**Next:** Proceeding to Step 4: NFR...