---
workflow_id: "architecture-design"
agent: "architect"
version: "5.0.0"
language_aware: true
---

# Architecture Design Workflow

## Overview
Create comprehensive system architecture document.

## Prerequisites
- PRD approved
- Stories available (optional but recommended)

## Steps (Execute in Order)

### Step 1: Orient
Load: `step-01-orient.md`
Complete when: Project context understood

### Step 2: Tech Stack
Load: `step-02-tech-stack.md`
Complete when: Technologies selected

### Step 3: Database
Load: `step-03-database.md`
Complete when: Data models defined

### Step 4: API
Load: `step-04-api.md`
Complete when: API contracts defined

### Step 5: Security
Load: `step-05-security.md`
Complete when: Security architecture defined

### Step 6: Validate
Load: `step-06-validate.md`
Complete when: Architecture validated

## Output
- `.kracked/KD_output/architecture/architecture.md`
- Update status.md

## Next
Gate check, then /KD-epics-and-stories or /KD-dev-story