---
step_id: "03-research"
agent: "analyst"
estimated_tokens: 2500
---

# Step 3: Research (Optional)

## Context
You have gathered initial requirements through interview. Now conduct research to validate and expand understanding.

## When to Use This Step

**Skip if:**
- Project is well-defined with clear requirements
- Timeline is very short (< 1 week)
- User has deep domain expertise

**Use if:**
- New market/domain for the user
- Competitive analysis needed
- Technical feasibility unclear
- Market validation required

## Instructions

### 1. Market Research

**Competitive Landscape:**
- Who are the main competitors?
- What are their strengths/weaknesses?
- What is their pricing model?
- What features do they offer?

**Market Size:**
- Total addressable market (TAM)
- Serviceable addressable market (SAM)
- Growth trends

### 2. Technical Research

**Technology Options:**
- What technologies are available?
- What are the pros/cons of each?
- What is the community support?
- What is the learning curve?

**Integration Points:**
- API availability
- SDK options
- Documentation quality

### 3. User Research

**User Behavior:**
- How do users currently solve this problem?
- What tools do they use?
- What are their pain points?

**Validation:**
- Is the problem real?
- Is the solution viable?

## Output Format

```
[ANALYST] 🔬 Research Complete

**Market Research:**
- Competitors: [list with brief analysis]
- Market Size: [TAM/SAM estimates]
- Trends: [key trends]

**Technical Research:**
- Options Evaluated: [list with pros/cons]
- Recommended: [technology with rationale]
- Risks: [technical risks identified]

**User Research:**
- Current Solutions: [what users use now]
- Pain Points: [validated pain points]
- Willingness to Switch: [assessment]

**Key Findings:**
1. [finding 1]
2. [finding 2]
3. [finding 3]

**Risks Identified:**
- [risk 1]
- [risk 2]

**Next:** Proceeding to Step 4: Synthesize...
```

## Notes
- Use web search if needed for current information
- Cite sources where possible
- Focus on actionable insights
- Time-box research to avoid scope creep