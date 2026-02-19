---
step_id: "03-report"
agent: "pm"
estimated_tokens: 1500
---

# Step 3: Report

## Context
Generate validation report with recommendations.

## Instructions

### 1. Compile Report

Create validation summary:
- Overall assessment
- Gap analysis
- Recommendations
- Pass/Fail determination

### 2. Gap Analysis

For each gap identified:
- Severity (Critical/Major/Minor)
- Section affected
- What's missing
- Recommended action

### 3. Recommendations

Priority-ordered actions:
- Must fix before proceeding
- Should improve
- Nice to have

### 4. Determination

- **PASS:** PRD is sufficient for architecture phase
- **CONDITIONAL:** Minor gaps, can proceed with caveats
- **FAIL:** Critical gaps, must revise before proceeding

## Output Format

```
[PM] 📋 PRD Validation Report

**Score:** [X]/100
**Grade:** [A/B/C/D/F]
**Determination:** [PASS/CONDITIONAL/FAIL]

---

## Gap Analysis

| Gap | Severity | Section | Action Required |
|-----|----------|---------|-----------------|
| [gap 1] | Critical | [section] | [action] |
| [gap 2] | Major | [section] | [action] |

## Recommendations

### Must Fix
1. [recommendation 1]
2. [recommendation 2]

### Should Improve
1. [recommendation 1]

### Nice to Have
1. [recommendation 1]

---

**Next Steps:**
- If PASS: Proceed to /KD-architecture
- If CONDITIONAL: Address gaps, then proceed
- If FAIL: Run /KD-prd to revise