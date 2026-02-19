---
workflow_id: "implementation-code-review"
agent: "qa"
version: "5.0.0"
language_aware: true
---

# Code Review Workflow

## Overview
Review implemented code for quality, security, and adherence to architecture.

## Prerequisites
- Code implemented
- Stories marked complete

## Steps (Execute in Order)

### Step 1: Read Story
Load: `step-01-read-story.md`
Complete when: Story context understood

### Step 2: Review Code
Load: `step-02-review-code.md`
Complete when: Code reviewed

### Step 3: Security Check
Load: `step-03-security-check.md`
Complete when: Security validated

### Step 4: Report
Load: `step-04-report.md`
Complete when: Report created

## Output
- `.kracked/KD_output/code-review/code-review.md`
- Update status.md

## Next
If issues found: Back to /KD-dev-story
If passed: Proceed to /KD-deployment-plan