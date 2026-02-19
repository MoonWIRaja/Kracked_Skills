---
step_id: "06-validate"
agent: "architect"
estimated_tokens: 2000
---

# Step 6: Validate

## Context
Finalize and validate architecture document.

## Instructions

### 1. Compile Architecture Document

Save to `.kracked/KD_output/architecture/architecture.md`

### 2. Validation Checklist

- [ ] Tech stack justified
- [ ] Database schema complete
- [ ] API endpoints defined
- [ ] Security addressed
- [ ] Scalability considered
- [ ] File structure defined

### 3. Update Status

Update status.md with architecture completion.

### 4. Present for Review

Display architecture summary for approval.

## Output Format

```
[ARCH] ✅ Architecture Document Created

**Location:** .kracked/KD_output/architecture/architecture.md

---

## Architecture Summary

**Tech Stack:**
- Frontend: [tech]
- Backend: [tech]
- Database: [tech]
- Hosting: [tech]

**Key Decisions:**
1. [decision 1]
2. [decision 2]

**Security Model:** [summary]

---

⏸️ CHECKPOINT: Architecture complete.
Proceed to /KD-dev-story for implementation.