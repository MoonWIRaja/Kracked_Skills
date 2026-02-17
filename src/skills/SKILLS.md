# ══════════════════════════════════════════════════════════
# DEVSTACK — Master Skill Library v1.0
# Curated Skills for BMAD + Kilo Code + GLM-4.7
# ══════════════════════════════════════════════════════════
#
# 10 production-grade skills designed to complement BMAD's
# workflow without process conflicts. Each skill provides
# domain knowledge only — no behavioral directives.
#
# Distribution:
# Global (~/.kilocode/rules/) → Skills 6, 10
# Project (.kilocode/rules/) → Skills 1, 3, 4, 5
# Architect (.kilocode/rules-architect/) → Skill 7
# Dev (.kilocode/rules-dev/) → Skills 2, 7, 9
# QA (.kilocode/rules-qa/) → Skill 2
#
# ══════════════════════════════════════════════════════════

## Table of Contents

| # | Skill Name | Domain | Scope |
|---|--------------------------------|-------------------------|-----------------|
| 1 | Supabase Postgres | Backend Structure | Project-wide |
| 2 | Insecure Defaults | Backend Security | Dev, QA |
| 3 | React & Next.js | Frontend Core | Project-wide |
| 4 | Premium Design System | UI/UX + Library | Project-wide |
| 5 | Web Performance | Production Optimization | Project-wide |
| 6 | Code Review | Code Quality | Global |
| 7 | PWA & Service Workers | Offline-First PWA | Architect, Dev |
| 8 | *(Merged into Skill 4)* | — | — |
| 9 | Animations & Components | Motion + Icons + cva | Dev |
| 10 | Recursive Decomposition | Token Optimization | Global |

---

## BMAD Mode Activation Map

```
┌────────────────┬─────────────────────────────────────────────────┐
│ BMAD Command   │ Skills That Load                                │
├────────────────┼─────────────────────────────────────────────────┤
│ /analyst       │ 6 (Code Review), 10 (Token Optimization)       │
│ /pm            │ 6, 10                                           │
│ /architect     │ 1, 3, 4, 5, 6, 7, 10                           │
│ /sm            │ 6, 10                                           │
│ /dev           │ 1, 2, 3, 4, 5, 6, 7, 9, 10 ← ALL SKILLS        │
│ /qa            │ 1, 2, 3, 4, 5, 6, 10                           │
└────────────────┴─────────────────────────────────────────────────┘
```

---

## Skill Files Location

```
.kracked/skills/
├── SKILLS.md                    ← This file (index)
├── 01-supabase-postgres.md     ← Skill 1
├── 02-insecure-defaults.md     ← Skill 2
├── 03-react-nextjs.md          ← Skill 3
├── 04-premium-design-system.md ← Skill 4
├── 05-web-perf.md              ← Skill 5
├── 06-code-review.md           ← Skill 6
├── 07-pwa-service-worker.md    ← Skill 7
├── 09-animations-components.md ← Skill 9
└── 10-recursive-decomposition.md ← Skill 10
```

---

## Quick Reference

### Skill 1: Supabase Postgres
- **When:** Designing database schemas, writing SQL, creating migrations
- **Key:** Row Level Security, indexing strategies, query optimization
- **File:** `01-supabase-postgres.md`

### Skill 2: Insecure Defaults Detection
- **When:** Writing auth, config, crypto, API keys, CORS
- **Key:** Hardcoded secrets, weak crypto, permissive defaults
- **File:** `02-insecure-defaults.md`

### Skill 3: React & Next.js
- **When:** Building components, data fetching, caching, App Router
- **Key:** Server vs Client components, hydration, dynamic imports
- **File:** `03-react-nextjs.md`

### Skill 4: Premium Design System
- **When:** Design decisions, UI components, typography, colors
- **Key:** Anti-generic aesthetics, library discipline, visual hierarchy
- **File:** `04-premium-design-system.md`

### Skill 5: Web Performance
- **When:** Optimizing load times, Core Web Vitals, runtime perf
- **Key:** LCP, INP, CLS optimization, resource hints
- **File:** `05-web-perf.md`

### Skill 6: Code Review
- **When:** Reviewing code changes, quality checks before merge
- **Key:** Correctness, security, performance, maintainability
- **File:** `06-code-review.md`

### Skill 7: PWA & Service Workers
- **When:** Building PWA manifests, service workers, offline features
- **Key:** Caching strategies, offline support, background sync
- **File:** `07-pwa-service-worker.md`

### Skill 9: Animations & Components
- **When:** UI animations, icon libraries, reusable components
- **Key:** Framer Motion, Lucide icons, cva, micro-interactions
- **File:** `09-animations-components.md`

### Skill 10: Recursive Decomposition
- **When:** Large codebases, multi-file tasks, context limits
- **Key:** Task decomposition, context loading, summarization
- **File:** `10-recursive-decomposition.md`

---

# ══════════════════════════════════════════════════════════
# DEVSTACK v1.0 — Built for BMAD + Kilo Code + GLM-4.7
# ══════════════════════════════════════════════════════════