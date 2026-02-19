---
step_id: "04-synthesize"
agent: "analyst"
estimated_tokens: 2000
---

# Step 4: Synthesize

## Context
You have gathered information through interview and research. Now synthesize all findings into a coherent picture.

## Instructions

### 1. Consolidate Findings

Combine all information gathered:
- Interview answers
- Research findings
- Technical constraints
- Business requirements

### 2. Identify Patterns

Look for:
- Recurring themes
- Conflicting requirements
- Knowledge gaps
- Dependencies

### 3. Determine Scale

Assess project scale based on:
- Team size (Solo=1, Standard=2-5, Deep=6+)
- Timeline (< 2 weeks=Small, 2-8 weeks=Standard, > 8 weeks=Deep)
- Technical risk (Low=Small, Medium=Standard, High=Deep)

### 4. Define Problem Statement

Create a clear problem statement:
- What is the core problem?
- Who is affected?
- Why does it matter?
- What would success look like?

### 5. Document Assumptions

List all assumptions made:
- Technical assumptions
- User assumptions
- Business assumptions

## Output Format

```
[ANALYST] 🧩 Synthesis Complete

**Problem Statement:**
[Clear, concise problem statement in 2-3 sentences]

**Project Scale:**
- Size: [SMALL/STANDARD/DEEP]
- Rationale: [why this scale]

**Key Findings:**
1. [finding 1]
2. [finding 2]
3. [finding 3]

**Patterns Identified:**
- [pattern 1]
- [pattern 2]

**Assumptions:**
- [assumption 1]
- [assumption 2]

**Knowledge Gaps:**
- [gap 1]
- [gap 2]

**Risks:**
- [risk 1]
- [risk 2]

**Next:** Proceeding to Step 5: Brief...
```

## Notes
- Be honest about uncertainties
- Highlight any conflicting requirements
- Scale assessment affects subsequent workflow depth