---
workflow_id: "discovery-brainstorm"
agent: "analyst"
version: "5.0.0"
language_aware: true
---

# Discovery Brainstorm Workflow

## Overview
Creative ideation session to generate and evaluate solution concepts.

## Prerequisites
- Product brief exists (from /KD-analyze)
- If missing: STOP and run /KD-analyze first

## Steps (Execute in Order)

### Step 1: Setup
Load: `step-01-setup.md`
Complete when: Brainstorm session parameters defined

### Step 2: Ideation
Load: `step-02-ideation.md`
Complete when: All ideas generated and documented

### Step 3: Evaluation
Load: `step-03-evaluation.md`
Complete when: Ideas scored and ranked

### Step 4: Summary
Load: `step-04-summary.md`
Complete when: brainstorm.md created

## Output
- `.kracked/KD_output/brainstorm/brainstorm.md`
- Update `.kracked/KD_output/status/status.md`

## Next
Handoff to PM with /KD-prd