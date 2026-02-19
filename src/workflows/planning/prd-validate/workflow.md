---
workflow_id: "planning-prd-validate"
agent: "pm"
version: "5.0.0"
language_aware: true
---

# PRD Validate Workflow

## Overview
Validate existing PRD for completeness and quality.

## Prerequisites
- PRD exists at `.kracked/KD_output/PRD/prd.md`

## Steps (Execute in Order)

### Step 1: Check
Load: `step-01-check.md`
Complete when: PRD sections verified

### Step 2: Score
Load: `step-02-score.md`
Complete when: Quality score calculated

### Step 3: Report
Load: `step-03-report.md`
Complete when: Validation report created

## Output
- PRD quality score
- Gap analysis
- Recommendations