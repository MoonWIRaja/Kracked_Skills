---
workflow_id: "planning-epics-stories"
agent: "tech-lead"
version: "5.0.0"
language_aware: true
---

# Epics and Stories Workflow

## Overview
Break down epics into actionable user stories with acceptance criteria.

## Prerequisites
- PRD approved and available
- Epics defined in PRD

## Steps (Execute in Order)

### Step 1: Read PRD
Load: `step-01-read-prd.md`
Complete when: Epics extracted from PRD

### Step 2: Define Epics
Load: `step-02-define-epics.md`
Complete when: Epic structure defined

### Step 3: Write Stories
Load: `step-03-write-stories.md`
Complete when: Stories written with acceptance criteria

### Step 4: Sequence
Load: `step-04-sequence.md`
Complete when: Stories sequenced by priority

### Step 5: Validate
Load: `step-05-validate.md`
Complete when: Stories validated

## Output
- `.kracked/KD_output/epics-and-stories/epic-*.md`
- `.kracked/KD_output/epics-and-stories/stories-*.md`
- Update status.md

## Next
Gate check, then /KD-architecture