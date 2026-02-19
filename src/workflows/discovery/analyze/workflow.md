---
workflow_id: "discovery-analyze"
agent: "analyst"
version: "5.0.0"
language_aware: true
---

# Discovery Analysis Workflow

## Overview
Analisis projek lengkap — context gathering, risk assessment, scale determination.

## Prerequisites
- status.md exists in `.kracked/KD_output/status/`
- If missing: STOP and run /KD-kickoff first

## Steps (Execute in Order)

### Step 1: Orient
Load: `step-01-orient.md`
Complete when: Analyst confirms understanding of project context

### Step 2: Interview
Load: `step-02-interview.md`
Complete when: All context questions answered

### Step 3: Research (Optional)
Load: `step-03-research.md`
Complete when: Market/domain research done (if needed)

### Step 4: Synthesize
Load: `step-04-synthesize.md`
Complete when: All findings documented

### Step 5: Brief
Load: `step-05-brief.md`
Complete when: product-brief.md created

## Output
- `.kracked/KD_output/product-brief/product-brief.md`
- Update `.kracked/KD_output/status/status.md`

## Next
Handoff to PM with /KD-prd