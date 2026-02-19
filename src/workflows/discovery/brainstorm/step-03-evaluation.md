---
step_id: "03-evaluation"
agent: "analyst"
estimated_tokens: 2000
---

# Step 3: Evaluation

## Context
You have generated multiple ideas. Now evaluate and rank them objectively.

## Instructions

### 1. Define Evaluation Criteria

Standard criteria (adapt as needed):
- **Feasibility:** Can we build this? (1-5)
- **Impact:** Will this solve the problem? (1-5)
- **Effort:** How much work? (1-5, lower = more effort)
- **Risk:** What could go wrong? (1-5, lower = more risk)
- **Novelty:** Is this differentiated? (1-5)

### 2. Score Each Idea

Apply scores consistently:
- 5 = Excellent
- 4 = Good
- 3 = Average
- 2 = Below Average
- 1 = Poor

### 3. Calculate Weighted Score

Formula: `Score = (Feasibility × 0.25) + (Impact × 0.30) + (Effort × 0.20) + (Risk × 0.10) + (Novelty × 0.15)`

Adjust weights based on project priorities.

### 4. Rank Ideas

Sort by total score, identify:
- Top 3 ideas to pursue
- Ideas to combine
- Ideas to shelve

### 5. Stress Test

For top ideas, ask:
- What could kill this idea?
- What are we assuming?
- What's the MVP version?

## Output Format

```
[ANALYST] 📊 Evaluation Complete

**Scoring Matrix:**

| Idea | Feasibility | Impact | Effort | Risk | Novelty | Total |
|------|-------------|--------|--------|------|---------|-------|
| [1]  | 5 | 4 | 3 | 4 | 3 | 3.85 |
| [2]  | 4 | 5 | 4 | 3 | 4 | 4.20 |
| ... | ... | ... | ... | ... | ... | ... |

**Top 3 Ideas:**
1. [Idea] - Score: [X.XX]
   - Strength: [main strength]
   - Concern: [main concern]
   
2. [Idea] - Score: [X.XX]
   - Strength: [main strength]
   - Concern: [main concern]
   
3. [Idea] - Score: [X.XX]
   - Strength: [main strength]
   - Concern: [main concern]

**Ideas to Combine:**
- [Idea A] + [Idea B] = [Combined concept]

**Shelved Ideas:**
- [Idea] - Reason: [why shelved]

**Next:** Proceeding to Step 4: Summary...
```

## Notes
- Be objective, not emotional
- Consider dependencies between ideas
- Low score doesn't mean bad idea - might just be wrong timing
- Document reasoning for future reference