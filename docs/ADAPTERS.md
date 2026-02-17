# KD Adapters Guide v5.0.0

## Overview

KD supports 6 major AI tools through adapter files. Each adapter translates KD's system prompt into the format understood by the target AI tool.

## Supported Tools

| Tool | Adapter File | Auto-Setup | Platform |
|------|--------------|------------|----------|
| **Claude Code** | `CLAUDE.md` | ✅ | VSCode Extension |
| **Cursor** | `.cursorrules` | ✅ | VSCode Extension |
| **Antigravity** | `.antigravity/SKILL.md` | ✅ | VSCode Extension |
| **Cline** | `.clinerules` | ✅ | VSCode Extension |
| **Kilo Code** | `.kilocode` | ✅ | VSCode Extension |
| **Roo Code** | `.roo` | ✅ | VSCode Extension |

## Adapter Details

### 1. Claude Code

**Adapter File:** `CLAUDE.md`

**Setup:** Automatic via `install.sh`

**Command Location:** `.claude/commands/`

**Usage:**
- Read `CLAUDE.md` at session start
- Commands appear as suggestions when typing `/`

**Features:**
- Full slash command integration
- 120+ commands available
- Direct role activation

---

### 2. Cursor

**Adapter File:** `.cursorrules`

**Setup:** Automatic via `install.sh`

**Command Location:** `.cursor/commands/`

**Usage:**
- Cursor reads `.cursorrules` at project root
- Commands available via `/` prefix

---

### 3. Antigravity

**Adapter File:** `.antigravity/SKILL.md`

**Setup:** Automatic via `install.sh`

**Workflow Location:** `.agent/workflows/`

**Usage:**
- Antigravity reads skill file format
- Workflows appear in skill menu

---

### 4. Cline

**Adapter File:** `.clinerules`

**Setup:** Automatic via `install.sh`

**Workflow Location:** `.cline/workflows/`

**Usage:**
- Cline reads `.clinerules` at project root
- Workflows for common commands

---

### 5. Kilo Code

**Adapter File:** `.kilocode`

**Setup:** Automatic via `install.sh`

**Workflow Location:** `.kilocode/workflows/`

**Usage:**
- Kilo Code reads `.kilocode` at project root
- Workflows for common commands

---

### 6. Roo Code

**Adapter File:** `.roo`

**Setup:** Automatic via `install.sh`

**Command Location:** `.roo/commands/`

**Usage:**
- Roo Code reads `.roo` at project root
- Commands available via `/` prefix

---

## Installation

### Interactive Installation

Run the installation script and select your tool:

```bash
curl -fsSL https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/install.sh | bash
```

Select from menu:
```
Select target AI tool(s) — choose multiple with commas (e.g. 1,3):
[1] Claude Code
[2] Cursor
[3] Antigravity
[4] Cline
[5] Kilo Code
[6] Roo Code
[A] All of the above
```

### Non-Interactive Installation

```bash
# Single tool
bash install.sh --target=claude-code --language=EN

# Multiple tools
bash install.sh --target=claude-code,cursor,cline --language=EN

# All tools
bash install.sh --target=all --language=EN
```

### PowerShell Installation

```powershell
irm https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/install.ps1 | iex
```

---

## Adapter Files Structure

Each adapter creates the appropriate files in your project root:

```
project-root/
├── CLAUDE.md                 # Claude Code adapter
├── .cursorrules              # Cursor adapter
├── .antigravity/            # Antigravity adapter
│   └── SKILL.md
├── .clinerules              # Cline adapter
├── .kilocode               # Kilo Code adapter
├── .roo                     # Roo Code adapter
├── .claude/                 # Claude Code commands (optional)
│   └── commands/
├── .cursor/                 # Cursor commands (optional)
│   └── commands/
├── .agent/                  # Antigravity workflows (optional)
│   └── workflows/
├── .cline/                  # Cline workflows (optional)
│   └── workflows/
├── .kilocode/              # Kilo Code workflows (optional)
│   └── workflows/
└── .roo/                    # Roo Code commands (optional)
    └── commands/
```

---

## Adding New Adapters

To add support for a new AI tool:

1. Create adapter directory: `src/adapters/new-tool/`
2. Create adapter file following tool's format
3. Create commands or workflows subdirectory
4. Add setup function to `install.sh` and `install.ps1`
5. Add removal to `uninstall.sh`
6. Update documentation

---

## Troubleshooting

### Adapter Not Working

If commands are not appearing:

1. Verify adapter file exists in project root
2. Check AI tool supports custom instructions
3. Restart AI tool to reload configuration

### Commands Not Appearing

1. Verify commands folder exists and contains files
2. Check file naming convention matches tool expectations
3. Review tool documentation for command setup

---

## Updating Adapters

To update KD adapters:

```bash
# Update all adapters
bash update.sh

# Update specific adapter
bash install.sh --target=claude-code --force
```

---

## Uninstalling

To remove KD and all adapters:

```bash
bash uninstall.sh
```

This removes:
- `.kracked/` directory
- All adapter files
- All command/workflow directories
- Preserves `status.md` backup

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/*
