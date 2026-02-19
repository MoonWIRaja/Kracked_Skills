---
step_id: "01-orient"
agent: "analyst"
estimated_tokens: 1500
---

# Step 1: Orient

## Context
You are the Analyst starting the discovery phase. Your goal is to understand the project context before diving into details.

## Instructions

### 1. Read Project State
Load `.kracked/KD_output/status/status.md`:
- Note current stage
- Note any existing context
- Check for blockers

### 2. Understand Project Type
Identify the project type:
- **New Product**: Greenfield project, no existing codebase
- **Enhancement**: Adding features to existing product
- **Migration**: Moving from one tech to another
- **Bug Fix**: Addressing specific issues
- **Research**: Investigation/analysis only

### 3. Gather Initial Context
Ask clarifying questions:
- What is the core problem being solved?
- Who are the target users?
- What is the timeline?
- What is the team size?
- Are there existing systems to integrate?

### 4. Check for Existing Artifacts
Look for:
- Existing PRD or product brief
- Existing architecture documents
- Existing codebase (if enhancement/migration)
- Design documents

## Output Format

```
[ANALYST] 🎯 Orientation Complete

**Project Type:** [type]
**Core Problem:** [1-2 sentences]

**Initial Context:**
- Timeline: [duration or TBD]
- Team: [size or TBD]
- Users: [target audience]

**Existing Artifacts:**
- [list or "None"]

**Next:** Proceeding to Step 2: Interview...
```

## Notes
- If project type is unclear, ask the user
- Document any assumptions in status.md
- Flag any immediate blockers