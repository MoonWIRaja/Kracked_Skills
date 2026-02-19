---
step_id: "01-check"
agent: "pm"
estimated_tokens: 1500
---

# Step 1: Check

## Context
Verify PRD has all required sections.

## Instructions

### 1. Load PRD

Read `.kracked/KD_output/PRD/prd.md`

### 2. Section Checklist

Verify presence of:
- [ ] Project Overview
- [ ] Problem Statement
- [ ] Personas
- [ ] Functional Requirements
- [ ] Non-Functional Requirements
- [ ] Epics
- [ ] MVP Scope
- [ ] Success Metrics
- [ ] Risks
- [ ] Timeline

### 3. Content Check

For each section, verify:
- Not empty
- Has meaningful content
- Internally consistent

## Output Format

```
[PM] 🔍 PRD Section Check

**Sections Present:** [X/10]

| Section | Status | Quality |
|---------|--------|---------|
| Overview | ✅ | Good |
| Problem Statement | ✅ | Good |
| Personas | ✅ | Good |
| Requirements | ✅ | Good |
| NFR | ⚠️ | Incomplete |
| Epics | ✅ | Good |
| MVP Scope | ✅ | Good |
| Metrics | ✅ | Good |
| Risks | ❌ | Missing |
| Timeline | ✅ | Good |

**Missing/Incomplete:** [list]

**Next:** Proceeding to Step 2: Score...