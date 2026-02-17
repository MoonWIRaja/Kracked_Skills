# Contributing to KD v5.0.0

## How to Contribute

### Reporting Issues

- Open an issue on GitHub
- Include: steps to reproduce, expected behavior, actual behavior
- Label: bug, enhancement, documentation

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes
4. Run validation: `bash validate.sh`
5. Commit with descriptive message
6. Push and open PR

### Development Setup

```bash
git clone https://github.com/MoonWIRaja/Kracked_skill.git
cd Kracked_Skills
```

### File Structure

```
src/
├── prompts/
│   ├── roles/                 # 13 role definitions
│   ├── stages/                # 8 stage definitions
│   └── multi-agent/           # Multi-agent protocols
├── templates/                # 9 document templates
├── checklists/               # 6 quality checklists
├── workflows/                # Workflow definitions
├── config/
│   ├── agents/                # Agent personalities
│   └── language/              # EN + MS strings
├── adapters/
│   ├── antigravity/           # Antigravity adapter
│   ├── claude-code/           # Claude Code adapter
│   ├── cline/                 # Cline adapter
│   ├── cursor/                # Cursor adapter
│   ├── kilocode/              # Kilo Code adapter
│   ├── roo/                   # Roo Code adapter
│   └── generic/               # Generic instructions
├── testsprite/               # TestSprite automated testing
├── tool-selector/            # Intelligent tool selection
├── analytics/                # Agent performance tracking
├── git-integration/          # Auto-commit scripts
├── exporters/                # Export utilities
├── commands/                # Command scripts
└── core/                    # Shell scripts
docs/                        # Documentation
tests/                       # Test scripts
```

### Code Standards

- **Shell scripts**: follow existing style, use `set -euo pipefail`
- **Markdown**: consistent formatting, include KD footer
- **JSON**: valid, formatted, follow schema
- **JavaScript**: Node.js style, proper error handling

### Testing

```bash
bash tests/test-install.sh
bash tests/test-validate.sh
```

### Adding New Roles

1. Create `src/prompts/roles/new-role.md`
2. Follow the role template in `_role-template.md`
3. Add commands to all 6 adapters
4. Update documentation

### Adding New Commands

1. Create command file in each adapter's commands/workflows folder
2. Follow existing command format
3. Update COMMANDS.md

### Adding New Adapters

1. Create `src/adapters/new-adapter/` directory
2. Create adapter file (e.g., `.newadapter`)
3. Create README.md with setup instructions
4. Create commands/ or workflows/ subdirectory
5. Update install.sh and install.ps1
6. Update documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/*
