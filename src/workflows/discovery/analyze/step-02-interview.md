---
step_id: "02-interview"
agent: "analyst"
estimated_tokens: 2000
---

# Step 2: Interview

## Context
You have oriented yourself with the project. Now conduct a structured interview to gather comprehensive requirements.

## Instructions

### 1. Core Questions

Ask the following questions systematically:

**Business Context:**
- What is the primary business goal?
- Who are the stakeholders?
- What defines success for this project?
- What is the budget range?

**User Context:**
- Who are the primary users?
- What problems do they currently face?
- How do they solve these problems today?
- What would make them switch to this solution?

**Technical Context:**
- Are there existing systems to integrate?
- What are the technical constraints?
- What technologies are preferred or required?
- What are the performance requirements?

**Timeline & Resources:**
- What is the target launch date?
- What is the team composition?
- Are there external dependencies?
- What are the milestones?

### 2. Follow-up Questions

Based on answers, probe deeper:
- "Can you tell me more about...?"
- "What happens if...?"
- "Have you considered...?"
- "What's the priority between X and Y?"

### 3. Document Answers

Record all answers in a structured format.

## Output Format

```
[ANALYST] 📋 Interview Complete

**Business Context:**
- Goal: [answer]
- Stakeholders: [list]
- Success Criteria: [answer]
- Budget: [answer]

**User Context:**
- Primary Users: [answer]
- Current Problems: [list]
- Current Solutions: [answer]
- Switch Incentives: [answer]

**Technical Context:**
- Existing Systems: [list or "None"]
- Constraints: [list]
- Preferred Tech: [answer]
- Performance Needs: [answer]

**Timeline & Resources:**
- Launch Date: [date or TBD]
- Team: [answer]
- Dependencies: [list]
- Milestones: [list]

**Follow-ups Needed:**
- [any unclear areas]

**Next:** Proceeding to Step 3: Research...
```

## Notes
- If user cannot answer, mark as "TBD" and note as risk
- Ask one question at a time for better responses
- Summarize understanding before moving on