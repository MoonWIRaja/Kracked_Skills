---
step_id: "01-read-story"
agent: "qa"
estimated_tokens: 1500
---

# Step 1: Read Story

## Context
Load story context for review.

## Instructions

### 1. Load Completed Stories

Read all completed stories from `.kracked/KD_output/epics-and-stories/`

### 2. Identify Changed Files

List all files that were modified/created.

### 3. Load Architecture

Reference architecture for expected patterns.

## Output Format

```
[QA] 📖 Stories Loaded

**Completed Stories:** [X]

| Story | Title | Files |
|-------|-------|-------|
| [ID] | [title] | [file list] |

**Next:** Proceeding to Step 2: Review Code...