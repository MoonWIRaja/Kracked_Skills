---
step_id: "05-brief"
agent: "analyst"
estimated_tokens: 2000
---

# Step 5: Brief

## Context
You have synthesized all findings. Now create the product brief document.

## Instructions

### 1. Create Product Brief

Use the template from `.kracked/templates/product-brief.md` and populate with:

**Required Sections:**
- Project name
- Problem statement
- Target users
- Key features (high-level)
- Success metrics
- Timeline
- Budget (if known)
- Risks and assumptions

### 2. Write to Output

Save the brief to:
`.kracked/KD_output/product-brief/product-brief.md`

### 3. Update Status

Update `.kracked/KD_output/status/status.md`:
- Mark Discovery stage as "in-progress" or "complete"
- Add product-brief.md to Completed Artifacts
- Set scale assessment

### 4. Present for Review

Display the brief for user review and approval.

## Output Format

```
[ANALYST] 📄 Product Brief Created

**Location:** .kracked/KD_output/product-brief/product-brief.md

---

## Product Brief: [Project Name]

### Problem Statement
[Problem statement]

### Target Users
[User description]

### Key Features
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

### Success Metrics
- [Metric 1]
- [Metric 2]

### Timeline
[Timeline summary]

### Risks
- [Risk 1]
- [Risk 2]

### Assumptions
- [Assumption 1]
- [Assumption 2]

---

**Scale Assessment:** [SMALL/STANDARD/DEEP]

⏸️ CHECKPOINT: Please review the product brief.
- Approve to proceed to Brainstorm phase
- Request changes if needed
```

## Notes
- Brief should be concise (1-2 pages)
- Focus on clarity over completeness
- This is a living document that can be refined
- Gate check will validate before proceeding