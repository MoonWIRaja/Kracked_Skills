# Language Support v5.0.0

## Overview

KD supports dual language interface to accommodate both English and Malay (Bahasa Melayu) users.

## Available Languages

| Language | Code | Description |
|----------|-------|-------------|
| English | EN | Full interface in English |
| Bahasa Melayu | MS | Full interface in Bahasa Melayu |

## Language Configuration

Language preference is stored in `.kracked/config/settings.json`:

```json
{
  "version": "5.0.0",
  "language": "EN",
  "target_tool": "claude-code"
}
```

## Language Rules

### Interface Language
- All user-facing text follows the selected language
- Error messages, prompts, and documentation are in the selected language
- Code examples and technical terms remain in English

### Code Language
- **ALWAYS in English**: variable names, function names, class names, APIs, database names
- Code comments follow the selected interface language
- Technical terms without common translation remain in English

### Switching Languages

To change language after installation:

1. Edit `.kracked/config/settings.json`
2. Change `"language"` value to `EN` or `MS`
3. Restart your AI tool session

## Language Files

Language-specific strings are stored in:

```
.kracked/config/language/
├── en.json    # English translations
└── ms.json    # Bahasa Melayu translations
```

## Installation Language Selection

During installation (`install.sh` or `install.ps1`), you can select your preferred language:

**Interactive Install:**
```
Select preferred language:
[EN] English
[MS] Bahasa Melayu
```

**Non-Interactive Install:**
```bash
# English
bash install.sh --language=EN
# Bahasa Melayu
bash install.sh --language=MS
```

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/*
