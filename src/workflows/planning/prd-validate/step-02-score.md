---
step_id: "02-score"
agent: "pm"
estimated_tokens: 1500
---

# Step 2: Score

## Context
Calculate quality score for the PRD.

## Instructions

### 1. Scoring Criteria

Score each section (0-10):

**Completeness (40%)**
- All sections present
- Each section has required content
- No placeholder text

**Clarity (30%)**
- Clear language
- Unambiguous requirements
- Well-organized

**Consistency (20%)**
- Cross-references correct
- No contradictions
- Alignment with product brief

**Actionability (10%)**
- Requirements are testable
- Scope is clear
- Priorities defined

### 2. Calculate Score

Formula: `(Completeness × 0.4) + (Clarity × 0.3) + (Consistency × 0.2) + (Actionability × 0.1)`

### 3. Determine Grade

- A: 90-100 (Excellent)
- B: 80-89 (Good)
- C: 70-79 (Acceptable)
- D: 60-69 (Needs Work)
- F: <60 (Insufficient)

## Output Format

```
[PM] 📊 PRD Quality Score

**Overall Score:** [X]/100
**Grade:** [A/B/C/D/F]

## Breakdown

| Criteria | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Completeness | [X]/10 | 40% | [X.X] |
| Clarity | [X]/10 | 30% | [X.X] |
| Consistency | [X]/10 | 20% | [X.X] |
| Actionability | [X]/10 | 10% | [X.X] |

**Strengths:**
- [strength 1]
- [strength 2]

**Weaknesses:**
- [weakness 1]
- [weakness 2]

**Next:** Proceeding to Step 3: Report...