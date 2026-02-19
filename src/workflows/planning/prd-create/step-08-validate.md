---
step_id: "08-validate"
agent: "pm"
estimated_tokens: 2000
---

# Step 8: Validate

## Context
Final validation and PRD creation.

## Instructions

### 1. Compile PRD

Use template from `.kracked/templates/prd.md`:

**Required Sections:**
- Project Overview
- Problem Statement
- Personas
- Functional Requirements
- Non-Functional Requirements
- Epics
- MVP Scope
- Success Metrics
- Risks
- Timeline

### 2. Validate Completeness

Checklist:
- [ ] All personas documented
- [ ] All requirements prioritized
- [ ] MVP scope clear
- [ ] Metrics defined
- [ ] Timeline realistic

### 3. Save PRD

Save to `.kracked/KD_output/PRD/prd.md`

### 4. Update Status

Update status.md with PRD completion.

### 5. Present for Review

Display PRD summary for user approval.

## Output Format

```
[PM] ✅ PRD Created

**Location:** .kracked/KD_output/PRD/prd.md

---

## PRD Summary: [Project Name]

**Vision:** [1 sentence]

**MVP Scope:** [X features, X epics]
**Timeline:** [X weeks]

**Key Personas:**
1. [Persona 1]
2. [Persona 2]

**Must-Have Features:** [X]
**Success Metrics:** [X defined]

---

⏸️ CHECKPOINT: Please review the PRD.
- Approve to proceed to Architecture phase
- Request changes if needed