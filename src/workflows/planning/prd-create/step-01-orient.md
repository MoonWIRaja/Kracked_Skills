---
step_id: "01-orient"
agent: "pm"
estimated_tokens: 1500
---

# Step 1: Orient

## Context
As PM, orient yourself with the project context before creating PRD.

## Instructions

### 1. Load Existing Artifacts

Read the following:
- `.kracked/KD_output/product-brief/product-brief.md`
- `.kracked/KD_output/brainstorm/brainstorm.md` (if exists)
- `.kracked/KD_output/research/domain-research.md` (if exists)

### 2. Understand Project Scope

Identify:
- Project name and vision
- Target users
- Key problems to solve
- Success criteria

### 3. Review Scale Assessment

Check the project scale:
- SMALL: Lightweight PRD, focus on essentials
- STANDARD: Full PRD with all sections
- DEEP: Comprehensive PRD with detailed specs

### 4. Identify Stakeholders

List who will review/approve the PRD.

## Output Format

```
[PM] 🎯 Oriented with Project Context

**Project:** [name]
**Vision:** [1-2 sentences]
**Scale:** [SMALL/STANDARD/DEEP]

**Target Users:**
- [user segment 1]
- [user segment 2]

**Key Problems:**
1. [problem 1]
2. [problem 2]

**Artifacts Loaded:**
- [x] Product Brief
- [x] Brainstorm Results
- [ ] Domain Research

**Next:** Proceeding to Step 2: Personas...