---
step_id: "01-orient"
agent: "engineer"
estimated_tokens: 2000
---

# Step 1: Orient

## Context
Understand the story before implementation.

## Instructions

### 1. Load Story Card

Read the story file from `.kracked/KD_output/epics-and-stories/story-*.md`

### 2. Load Architecture

Read `.kracked/KD_output/architecture/architecture.md`:
- Tech stack to use
- File structure
- Coding standards

### 3. Load Relevant Skills

Based on story type, load from `.kracked/skills/`:
- Backend: Skills 1, 2, 6, 8, 10
- Frontend: Skills 3, 4, 5, 6, 8, 9, 10

### 4. Understand Acceptance Criteria

Break down each criterion into testable scenarios.

## Output Format

```
[ENG] 🎯 Story Oriented

**Story:** [ID] - [Title]
**Epic:** [Epic ID]
**Points:** [X]

**User Story:**
As a [persona], I want [action] so that [benefit]

**Acceptance Criteria:**
1. [criterion 1]
2. [criterion 2]

**Technical Context:**
- Frontend: [tech]
- Backend: [tech]
- Database: [tech]

**Skills Loaded:** [list]

**Next:** Proceeding to Step 2: TDD Setup...