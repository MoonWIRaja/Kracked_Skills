---
name: 'KD-github-read'
description: 'GitHub Reader - Deep scan public repos, faham structure & code'
disable-model-invocation: true
---

Read the full system prompt at .kracked/prompts/system-prompt.md and follow the instructions for the /KD-github-read command exactly as written.

# /KD-github-read — GitHub Repo Deep Scanner

Baca mana-mana GitHub public repo secara mendalam — folder, file, code, semua terperinci.

## Cara Guna

```
/KD-github-read https://github.com/owner/repo
/KD-github-read owner/repo
/KD-github-read --repo=https://github.com/facebook/react --max-files=200
```

## Apa GitHub Reader Buat

### 1. Deep Scan
- Baca SEMUA fail dalam repo (code, config, docs)
- Skip binary files (images, videos, etc)
- Baca content untuk analysis

### 2. Analisa
- Repo info (stars, language, description)
- File tree structure
- Tech stack detection
- Language statistics

### 3. Cache
- Simpan semua maklumat untuk rujukan
- Ready untuk copy/modify operations

## Output

```
.kracked/KD_output/github-reader/
├── owner_repo_[timestamp].md           ← Full report
├── owner_repo_[timestamp]_cache.json   ← Metadata
└── owner_repo_[timestamp]_content.json ← All code
```

## Flow

```
1. User: "/KD-github-read https://github.com/owner/repo"

2. AI Scan:
   - Get repo info
   - Get file tree
   - Read file contents (up to 100 files default)

3. Cache:
   - Save untuk rujukan

4. AI Lapor:
   - Ringkasan repo
   - Structure overview
   - Tech stack
   - Key files

5. User Request:
   - "Copy struktur" → AI buat sama
   - "Ubah X" → AI dah faham, boleh modify
```

## Rate Limits

| Mode | Limit |
|------|-------|
| Tanpa token | 60 requests/hour |
| Dengan GITHUB_TOKEN | 5,000 requests/hour |

## CLI Usage

```bash
node .kracked/github-reader/kd-github-read.js --repo=https://github.com/owner/repo
```

## Contoh Penggunaan

```
User: "/KD-github-read https://github.com/vercel/next.js"

AI:
"Repo: vercel/next.js
 Description: The React Framework
 Language: TypeScript
 Stars: 120k+

 Structure:
 ├── packages/
 │   ├── next/
 │   └── create-next-app/
 ├── examples/
 └── docs/

 Tech Stack: TypeScript, React, Rollup
 Files scanned: 100

 Apa yang nak saya buat dengan repo ni?"
```

---

*KD finishes what it starts. | KRACKEDDEVS*