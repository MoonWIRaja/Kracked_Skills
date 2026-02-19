---
workflow_id: "planning-prd-create"
agent: "pm"
version: "5.0.0"
language_aware: true
---

# PRD Create Workflow

## Overview
Create comprehensive Product Requirements Document from product brief and brainstorm results.

## Prerequisites
- Product brief exists (from /KD-analyze)
- Brainstorm results available (optional but recommended)

## Steps (Execute in Order)

### Step 1: Orient
Load: `step-01-orient.md`
Complete when: PM understands project context

### Step 2: Personas
Load: `step-02-personas.md`
Complete when: User personas defined

### Step 3: Requirements
Load: `step-03-requirements.md`
Complete when: Functional requirements documented

### Step 4: NFR
Load: `step-04-nfr.md`
Complete when: Non-functional requirements defined

### Step 5: Epics
Load: `step-05-epics.md`
Complete when: Epics identified

### Step 6: MVP
Load: `step-06-mvp.md`
Complete when: MVP scope defined

### Step 7: Metrics
Load: `step-07-metrics.md`
Complete when: Success metrics defined

### Step 8: Validate
Load: `step-08-validate.md`
Complete when: PRD validated and saved

## Output
- `.kracked/KD_output/PRD/prd.md`
- Update `.kracked/KD_output/status/status.md`

## Next
Gate check, then /KD-architecture