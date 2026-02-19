---
workflow_id: "discovery-domain-research"
agent: "analyst"
version: "5.0.0"
language_aware: true
---

# Domain Research Workflow

## Overview
Deep research into specific domain or market for informed decision-making.

## Prerequisites
- Product brief exists
- Domain identified for research

## Steps (Execute in Order)

### Step 1: Scope
Load: `step-01-scope.md`
Complete when: Research questions defined

### Step 2: Research
Load: `step-02-research.md`
Complete when: All questions answered

### Step 3: Report
Load: `step-03-report.md`
Complete when: Research report created

## Output
- `.kracked/KD_output/research/domain-research.md`
- Update `.kracked/KD_output/status/status.md`

## When to Use
- New industry/domain
- Competitive analysis needed
- Technology evaluation
- Market validation