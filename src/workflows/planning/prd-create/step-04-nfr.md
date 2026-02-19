---
step_id: "04-nfr"
agent: "pm"
estimated_tokens: 2000
---

# Step 4: Non-Functional Requirements

## Context
Define quality attributes and constraints for the system.

## Instructions

### 1. Performance Requirements

- Response time targets
- Throughput requirements
- Concurrent user capacity

### 2. Security Requirements

- Authentication/authorization
- Data protection
- Compliance (GDPR, HIPAA, etc.)

### 3. Scalability Requirements

- Expected growth
- Horizontal/vertical scaling needs
- Peak load handling

### 4. Reliability Requirements

- Uptime targets (SLA)
- Data backup
- Disaster recovery

### 5. Usability Requirements

- Accessibility (WCAG level)
- Browser support
- Mobile support

### 6. Technical Constraints

- Technology preferences
- Integration requirements
- Budget constraints

## Output Format

```
[PM] ⚙️ Non-Functional Requirements Defined

## Performance
- Response Time: [target]
- Concurrent Users: [capacity]
- Page Load: [target]

## Security
- Auth Method: [method]
- Data Encryption: [requirements]
- Compliance: [standards]

## Scalability
- Expected Users (MVP): [number]
- Expected Users (Year 1): [number]
- Scaling Strategy: [approach]

## Reliability
- Uptime SLA: [target]
- Backup Frequency: [frequency]

## Usability
- Accessibility: [WCAG level]
- Browser Support: [browsers]
- Mobile: [responsive/native]

## Technical Constraints
- [constraint 1]
- [constraint 2]

**Next:** Proceeding to Step 5: Epics...