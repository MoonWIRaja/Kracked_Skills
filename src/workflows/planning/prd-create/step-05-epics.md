---
step_id: "05-epics"
agent: "pm"
estimated_tokens: 2000
---

# Step 5: Epics

## Context
Group related features into epics for better organization.

## Instructions

### 1. Identify Epic Categories

Common epic categories:
- User Management
- Core Product Features
- Administration
- Analytics/Reporting
- Integrations
- Infrastructure

### 2. Group Features into Epics

Each epic should:
- Represent a significant feature area
- Contain 3-10 user stories
- Be deliverable independently (mostly)

### 3. Define Epic Details

For each epic:
- Name and description
- Business value
- Affected personas
- Estimated complexity (S/M/L)

### 4. Prioritize Epics

Order by:
- Business value
- Dependencies
- Risk mitigation

## Output Format

```
[PM] 📦 Epics Defined

**Total Epics:** [X]

## Epic List

### Epic 1: [Name]
- **Description:** [what it is]
- **Business Value:** [why it matters]
- **Personas:** [affected personas]
- **Stories:** [X user stories]
- **Complexity:** [S/M/L]
- **Priority:** [1-5]

### Epic 2: [Name]
[same structure]

## Epic Dependencies
[Epic A] → [Epic B] (Epic B depends on A)

## MVP Epics
1. [Epic 1]
2. [Epic 2]
3. [Epic 3]

**Next:** Proceeding to Step 6: MVP...