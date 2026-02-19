---
step_id: "01-orient"
agent: "architect"
estimated_tokens: 1500
---

# Step 1: Orient

## Context
Understand project requirements before designing architecture.

## Instructions

### 1. Load Artifacts

Read:
- `.kracked/KD_output/PRD/prd.md`
- `.kracked/KD_output/epics-and-stories/` (if exists)
- `.kracked/KD_output/product-brief/product-brief.md`

### 2. Identify Constraints

- Technical constraints from PRD
- Budget constraints
- Timeline constraints
- Team expertise

### 3. Define Quality Attributes

Prioritize:
- Performance
- Scalability
- Security
- Maintainability
- Cost

## Output Format

```
[ARCH] 🏗️ Oriented with Project

**Project:** [name]
**Scale:** [SMALL/STANDARD/DEEP]

**Key Requirements:**
- [req 1]
- [req 2]

**Constraints:**
- [constraint 1]
- [constraint 2]

**Quality Priorities:**
1. [priority 1]
2. [priority 2]

**Next:** Proceeding to Step 2: Tech Stack...