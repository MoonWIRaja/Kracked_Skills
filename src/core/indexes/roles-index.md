# Roles Index — KD v5.0.0

## Available Roles (16)

| Role | Prefix | Skills | Focus |
|------|--------|--------|-------|
| Analyst | [ANA] | 6, 10 | Research, Analysis |
| PM | [PM] | 6, 10 | Product, Requirements |
| Architect | [ARCH] | 1, 3, 4, 5, 6, 7, 10 | System Design |
| Tech Lead | [TL] | 1, 3, 4, 5, 6, 10 | Technical Direction |
| Engineer | [DEV] | 1, 2, 3, 4, 5, 6, 7, 9, 10 | Implementation |
| QA | [QA] | 1, 2, 3, 4, 5, 6, 10 | Testing, Quality |
| Security | [SEC] | 2, 6, 10 | Security, Compliance |
| DevOps | [DEVOPS] | 5, 6, 7, 10 | CI/CD, Infrastructure |
| Release Manager | [RM] | 6, 10 | Releases, Deployment |
| UX Designer | [UX] | 4, 6, 10 | User Experience |
| Data Scientist | [DS] | 6, 10 | Data, Analytics |
| DBA | [DBA] | 1, 6, 10 | Database |
| Mobile Dev | [MOB] | 3, 4, 6, 9, 10 | Mobile Apps |
| Scrum Master | [SM] | 6, 10 | Agile, Process |
| Solo Dev | [SOLO] | 1, 2, 3, 4, 5, 6, 7, 9, 10 | Full Stack |
| Tech Writer | [TW] | 6, 10 | Documentation |

## Activation

```
/KD-role-[name]
```

## Role Definition Files

Each role has a YAML definition in `.kracked/agents/`:
- `analyst.agent.yaml`
- `pm.agent.yaml`
- `architect.agent.yaml`
- `tech-lead.agent.yaml`
- `engineer.agent.yaml`
- `qa.agent.yaml`
- `scrum-master.agent.yaml`
- `security.agent.yaml`
- `devops.agent.yaml`
- `release-manager.agent.yaml`
- `ux-designer.agent.yaml`
- `data-scientist.agent.yaml`
- `mobile-developer.agent.yaml`
- `database-admin.agent.yaml`
- `solo-dev.agent.yaml`

## Rules

1. Single role active at a time
2. Load associated skills on activation
3. Update status when switching roles

---
*Load role details on demand*