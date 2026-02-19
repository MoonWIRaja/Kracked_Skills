---
workflow_id: "implementation-dev-story"
agent: "engineer"
version: "5.0.0"
language_aware: true
focus_modes: ["backend", "frontend", "full"]
---

# Dev Story Implementation Workflow

## Overview
Implement a single story from the backlog following TDD principles.

## Prerequisites
- Story card exists in `.kracked/KD_output/epics-and-stories/`
- Architecture document exists
- If missing: STOP and direct user to run /KD-epics-and-stories first

## Gate Check
Before starting, validate:
- [ ] Architecture phase complete (check status.md)
- [ ] Story file exists
- [ ] No blockers on this story

## Steps (Execute in Order)

### Step 1: Orient
Load: `step-01-orient.md`
Complete when: Engineer confirms understanding of story

### Step 2: TDD Setup
Load: `step-02-tdd-setup.md`
Complete when: Test file created with failing tests

### Step 3: Implement
Load: `step-03-implement.md`
Complete when: All tests passing

### Step 4: Test
Load: `step-04-test.md`
Complete when: All acceptance criteria verified

### Step 5: Handoff
Load: `step-05-handoff.md`
Complete when: Story marked COMPLETE

## Skills to Load
Based on story type, load from `skills/`:
- Backend story: Skills 1, 2, 6, 8, 10
- Frontend story: Skills 3, 4, 5, 6, 8, 9, 10
- Full-stack: Skills 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11

## Tools Available
- TestSprite (`testsprite/`) — for browser testing
- GitHub Reader (`github-reader/`) — for reference code

## Output
- Implemented code in project
- Test files
- Updated story card
- Updated status.md

## Next
- If more stories: Run /KD-dev-story [next-id]
- If all complete: Run /KD-code-review