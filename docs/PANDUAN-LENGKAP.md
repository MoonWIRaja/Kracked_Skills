# PANDUAN LENGKAP KRAKCED_SKILLS (KD) v5.0.0

---

## 🎯 APA ITU KRACKED_SKILLS?

**Kracked_Skills (KD)** adalah sistem AI Skill untuk pembangunan produk perisian yang terstruktur. Sistem ini membantu developer dan AI bekerja bersama dengan workflow yang jelas dari idea hingga release.

### Konsep Utama
- **10 Workflow Stages** - Tahap pembangunan berperingkat
- **75 Commands** - Arahan untuk setiap tugasan
- **16 Roles** - Peranan AI yang berbeza
- **15 Skills** - Kemahiran teknikal
- **8 Tools** - Alat bantuan

---

## 📁 STRUKTUR FOLDER LENGKAP

```
Kracked_skill/
│
├── 📄 kd.js                    ← Entry point TUI (Node.js)
├── 📄 kd.sh                    ← Wrapper untuk Linux/Mac
├── 📄 kd.ps1                   ← Wrapper untuk Windows
├── 📄 package.json             ← Konfigurasi Node.js
├── 📄 README.md                ← Dokumentasi utama
├── 📄 VERSION                  ← Fail versi
├── 📄 LICENSE                  ← Lesen MIT
│
├── 📁 src/                     ← SEMUA KOD SUMBER
│   │
│   ├── 📁 tui/                 ← APLIKASI TUI (BARU)
│   │   ├── banner.js           ← Banner ASCII KD
│   │   └── screens/
│   │       ├── main-menu.js    ← Menu utama
│   │       ├── install.js      ← Screen install
│   │       ├── update.js       ← Screen update
│   │       ├── uninstall.js    ← Screen uninstall
│   │       └── about.js        ← Maklumat KD
│   │
│   ├── 📁 skills/              ← 15 SKILLS (KEMAHIRAN)
│   │   ├── SKILLS.md           ← Index skills
│   │   ├── 01-supabase-postgres.md  ← Database
│   │   ├── 02-insecure-defaults.md  ← Security
│   │   ├── 03-react-nextjs.md       ← Frontend
│   │   ├── 04-premium-design-system.md ← UI/UX
│   │   ├── 05-web-perf.md          ← Performance
│   │   ├── 06-code-review.md        ← Quality
│   │   ├── 07-pwa-service-worker.md ← PWA
│   │   ├── 08-testing-qa.md         ← Testing (BARU)
│   │   ├── 09-animations-components.md ← Animations
│   │   ├── 10-recursive-decomposition.md ← Optimization
│   │   ├── 11-api-design.md         ← APIs (BARU)
│   │   ├── 12-devops-deployment.md  ← DevOps (BARU)
│   │   ├── 13-game-development.md   ← Games (BARU)
│   │   ├── 14-mobile-development.md ← Mobile (BARU)
│   │   └── 15-documentation.md      ← Docs (BARU)
│   │
│   ├── 📁 prompts/             ← PROMPTS UNTUK AI
│   │   ├── system-prompt.md    ← Prompt utama AI
│   │   ├── role-switcher.md    ← Pertukaran role
│   │   ├── handoff-protocol.md ← Serah terima
│   │   ├── conflict-resolution.md ← Penyelesaian konflik
│   │   │
│   │   ├── 📁 stages/          ← 10 TAHAP WORKFLOW
│   │   │   ├── _stage-template.md
│   │   │   ├── discovery.md    ← Stage 1: Penemuan
│   │   │   ├── brainstorm.md   ← Stage 2: Ideation
│   │   │   ├── requirements.md ← Stage 3: Keperluan
│   │   │   ├── architecture.md ← Stage 4: Senibina
│   │   │   ├── planning.md     ← Stage 5: Perancangan
│   │   │   ├── implementation.md ← Stage 6: Pelaksanaan
│   │   │   ├── testing.md      ← Stage 7: Testing
│   │   │   ├── quality.md      ← Stage 8: Kualiti
│   │   │   ├── deployment.md   ← Stage 9: Deployment
│   │   │   └── release.md      ← Stage 10: Release
│   │   │
│   │   ├── 📁 roles/           ← 16 PERANAN AI
│   │   │   ├── _role-template.md
│   │   │   ├── analyst.md      ← Analyst
│   │   │   ├── architect.md    ← Architect
│   │   │   ├── engineer.md     ← Engineer
│   │   │   ├── qa.md           ← QA
│   │   │   ├── devops.md       ← DevOps
│   │   │   └── ... (11 lagi)
│   │   │
│   │   └── 📁 multi-agent/     ← MULTI-AGENT SYSTEM
│   │       ├── party-mode.md   ← Party mode
│   │       ├── agent-swarm.md  ← Swarm
│   │       └── ... 
│   │
│   ├── 📁 adapters/            ← 6 ADAPTER AI TOOLS
│   │   ├── 📁 cline/           ← Untuk Cline
│   │   │   ├── .clinerules     ← Config Cline
│   │   │   └── workflows/      ← 82 commands
│   │   │
│   │   ├── 📁 claude-code/     ← Untuk Claude Code
│   │   │   ├── CLAUDE.md       ← Config
│   │   │   └── commands/
│   │   │
│   │   ├── 📁 cursor/          ← Untuk Cursor IDE
│   │   │   ├── .cursorrules    ← Config
│   │   │   └── commands/
│   │   │
│   │   ├── 📁 kilocode/        ← Untuk Kilo Code
│   │   ├── 📁 roo/             ← Untuk Roo Code
│   │   ├── 📁 antigravity/     ← Untuk Antigravity
│   │   └── 📁 generic/         ← Untuk AI lain
│   │
│   ├── 📁 core/                ← TERAS SISTEM
│   │   ├── core.md             ← Dokumentasi teras
│   │   ├── kracked.sh          ← Script utama
│   │   ├── language.sh         ← Sokongan bahasa
│   │   ├── status.sh           ← Tracking status
│   │   ├── utils.sh            ← Utiliti
│   │   ├── validation.sh       ← Pengesahan
│   │   │
│   │   └── 📁 indexes/         ← INDEX RUJUKAN
│   │       ├── stages-index.md ← 10 stages
│   │       ├── commands-index.md ← 75 commands
│   │       ├── skills-index.md ← 15 skills
│   │       ├── roles-index.md  ← 16 roles
│   │       └── tools-index.md  ← 8 tools
│   │
│   ├── 📁 templates/           ← 9 TEMPLATE DOKUMEN
│   │   ├── status.md           ← Status projek
│   │   ├── product-brief.md    ← Product brief
│   │   ├── prd.md              ← PRD
│   │   ├── architecture.md     ← Architecture doc
│   │   ├── story-card.md       ← User story
│   │   ├── deployment-plan.md  ← Deployment
│   │   ├── release-notes.md    ← Release notes
│   │   ├── decision-log.md     ← Decision log
│   │   └── risk-register.md    ← Risk register
│   │
│   ├── 📁 version-checker/     ← ALAT SEMAK VERSI
│   │   ├── version-checker.js  ← Script utama
│   │   ├── registry.json       ← Cache
│   │   ├── compatibility-rules.json ← Rules
│   │   └── README.md           ← Panduan
│   │
│   ├── 📁 tool-selector/       ← PEMILIH TOOL
│   │   ├── tool-selector.js    ← Script
│   │   └── knowledge-base.json ← Data
│   │
│   ├── 📁 testsprite/          ← AUTOMATED TESTING
│   │   └── testsprite-core.js  ← Script
│   │
│   ├── 📁 config/              ← KONFIGURASI
│   │   ├── defaults.json       ← Default settings
│   │   ├── settings-schema.json ← Schema
│   │   │
│   │   ├── 📁 language/        ← BAHASA
│   │   │   ├── en.json         ← English
│   │   │   └── ms.json         ← Bahasa Melayu
│   │   │
│   │   └── 📁 agents/
│   │       └── personalities.json
│   │
│   ├── 📁 checklists/          ← 6 CHECKLISTS
│   │   ├── stage-completion.md
│   │   ├── decision-validation.md
│   │   ├── checkpoint-approval.md
│   │   ├── security-audit.md
│   │   ├── pre-deployment.md
│   │   └── code-quality.md
│   │
│   ├── 📁 workflows/           ← 4 WORKFLOWS
│   │   ├── main.md             ← Workflow utama
│   │   ├── quick-start.md      ← Ringkas
│   │   ├── full-product.md     ← Lengkap
│   │   └── maintenance.md      ← Penyelenggaraan
│   │
│   ├── 📁 exporters/           ← EXPORT UTILITIES
│   │   ├── export-jira.js
│   │   ├── export-pdf.sh
│   │   └── export-consolidated.sh
│   │
│   ├── 📁 git-integration/     ← GIT AUTO-COMMIT
│   │   ├── auto-commit.sh
│   │   └── config.yaml
│   │
│   ├── 📁 analytics/           ← ANALYTICS
│   │   └── agent-performance.json
│   │
│   └── 📁 artifacts/           ← ARTIFACTS
│       └── manifest.yaml
│
├── 📁 docs/                    ← DOKUMENTASI
│   ├── COMPLETE-GUIDE.md       ← Panduan lengkap
│   ├── GETTING-STARTED.md      ← Mula menggunakan
│   ├── ARCHITECTURE.md         ← Architecture
│   ├── COMMANDS.md             ← Commands reference
│   ├── ROLES.md                ← Roles guide
│   ├── MULTI-AGENT.md          ← Multi-agent guide
│   ├── LANGUAGE.md             ← Language support
│   ├── ADAPTERS.md             ← Adapters guide
│   └── CONTRIBUTING.md         ← Cara contribute
│
├── 📄 install.sh               ← Install script (Linux/Mac)
├── 📄 install.ps1              ← Install script (Windows)
├── 📄 update.sh                ← Update (Linux/Mac)
├── 📄 update.ps1               ← Update (Windows)
├── 📄 uninstall.sh             ← Uninstall (Linux/Mac)
├── 📄 uninstall.ps1            ← Uninstall (Windows)
├── 📄 validate.sh              ← Validation script
└── 📄 CHANGELOG.md             ← Sejarah perubahan
```

---

## 🚀 CARA PENGGUNAAN

### 1. INSTALL KD

#### Cara 1: TUI (Recommended)
```bash
# Linux / Mac
curl -fsSL https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.sh | bash

# Windows PowerShell
irm https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.ps1 | iex
```

#### Cara 2: Direct Command
```bash
# Clone repo
git clone https://github.com/MoonWIRaja/Kracked_Skills.git
cd Kracked_Skills

# Install dependencies
npm install

# Run TUI
node kd.js
```

#### Cara 3: Non-Interactive
```bash
node kd.js install --target=cline,cursor --lang=ms --non-interactive
```

### 2. GUNA KD DALAM PROJEK

Selepas install, dalam projek anda:

```
/KD                    # Show command menu
/KD-analyze            # Mulakan discovery
/KD-brainstorm         # Brainstorming
/KD-product-brief      # Buat product brief
/KD-prd                # Buat PRD
/KD-architecture       # Design system
/KD-dev-story          # Implement story
/KD-test               # Testing
/KD-code-review        # Review
/KD-deployment-plan    # Deploy
```

---

## 📊 10 STAGES WORKFLOW

| Stage | Nama | Tujuan | Command |
|-------|------|--------|---------|
| 1 | Discovery | Kumpul konteks, analisis risiko | `/KD-analyze` |
| 2 | Ideation | Brainstorm, solve problems | `/KD-brainstorm` |
| 3 | Requirements | Definikan keperluan | `/KD-product-brief`, `/KD-prd` |
| 4 | Architecture | Design sistem | `/KD-architecture` |
| 5 | Planning | Plan kerja | `/KD-epics-and-stories` |
| 6 | Implementation | Tulis kod | `/KD-dev-story` |
| 7 | Testing | Test aplikasi | `/KD-test` |
| 8 | Quality | Review kualiti | `/KD-code-review` |
| 9 | Deployment | Deploy ke production | `/KD-deployment-plan` |
| 10 | Release | Close cycle | `/KD-retrospective` |

---

## 👥 16 ROLES

| Role | Prefix | Fokus |
|------|--------|-------|
| Analyst | [ANALYST] | Discovery, research |
| Product Manager | [PM] | Requirements |
| Architect | [ARCH] | System design |
| Tech Lead | [TL] | Technical planning |
| Engineer | [ENG] | Implementation |
| QA | [QA] | Testing |
| Security | [SEC] | Security |
| DevOps | [DEVOPS] | Deployment |
| Release Manager | [RM] | Releases |
| UX Designer | [UX] | User experience |
| Data Scientist | [DATA] | Data, ML |
| Mobile Developer | [MOBILE] | Mobile apps |
| Database Admin | [DBA] | Database |
| Scrum Master | [SM] | Agile |
| Solo Developer | [SOLO] | Full stack |
| Tech Writer | [TW] | Documentation |

---

## 📚 15 SKILLS

| # | Skill | Domain | Bilang |
|---|-------|--------|--------|
| 1 | Supabase Postgres | Backend/DB | Database, SQL |
| 2 | Insecure Defaults | Security | Security audit |
| 3 | React & Next.js | Frontend | Components |
| 4 | Premium Design System | UI/UX | Design |
| 5 | Web Performance | Performance | Optimization |
| 6 | Code Review | Quality | Review |
| 7 | PWA & Service Workers | PWA | Offline |
| 8 | Testing & QA | Testing | Tests |
| 9 | Animations & Components | UI | Animations |
| 10 | Recursive Decomposition | Optimization | Token opt |
| 11 | API Design | APIs | REST/GraphQL |
| 12 | DevOps & Deployment | DevOps | CI/CD |
| 13 | Game Development | Games | Game dev |
| 14 | Mobile Development | Mobile | iOS/Android |
| 15 | Documentation | Docs | Writing |

---

## 🛠️ 8 TOOLS

| Tool | Fungsi | Cara Guna |
|------|--------|-----------|
| Tool Selector | Pilih tech stack | `/KD-tool-selector` |
| Version Checker | Semak versi | `node src/version-checker/version-checker.js` |
| TestSprite | Visual testing | `/KD-test-sprite` |
| Multi-Agent | Party mode/Swarm | `/KD-party-mode` |
| Exporters | Export Jira/PDF | Auto |
| Analytics | Performance | Auto |
| Git Integration | Auto commit | Auto |
| Core Scripts | Utilities | Auto |

---

## 🌍 SOKONGAN BAHASA

KD menyokong sebarang bahasa:

```bash
# Bahasa preset
node kd.js install --lang=en     # English
node kd.js install --lang=ms     # Bahasa Melayu

# Bahasa custom
node kd.js install --lang="Bahasa Indonesia"
node kd.js install --lang="Français"
node kd.js install --lang="日本語"
node kd.js install --lang="中文"
```

---

## 🔗 KAITAN FAIL

### `kd.js` → Entry Point
Memanggil:
- `src/tui/screens/main-menu.js`
- `src/tui/banner.js`

### `main-menu.js` → Menu
Memanggil:
- `src/tui/screens/install.js`
- `src/tui/screens/update.js`
- `src/tui/screens/uninstall.js`
- `src/tui/screens/about.js`

### `install.js` → Install
- Download dari GitHub
- Buat folder `.kracked/`
- Setup adapters

### Adapters → AI Tools
- `.clinerules` untuk Cline
- `CLAUDE.md` untuk Claude Code
- `.cursorrules` untuk Cursor

---

## ✅ STATUS SISTEM

| Komponen | Jumlah | Status |
|----------|--------|--------|
| Stages | 10 | ✅ Complete |
| Commands | 75 | ✅ Complete |
| Roles | 16 | ✅ Complete |
| Skills | 15 | ✅ Complete |
| Tools | 8 | ✅ Complete |
| Adapters | 6 | ✅ Complete |
| Templates | 9 | ✅ Complete |
| TUI App | 1 | ✅ Working |

**SISTEM: SEMPURNA - TIADA ISU**

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/