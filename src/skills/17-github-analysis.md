---
name: 'GitHub Analysis'
skill_id: '17'
category: 'Research'
tags: ['github', 'repository', 'code-analysis', 'research', 'clone']
---

# Skill 17: GitHub Analysis (KD-GitHub Reader)

## Bila Digunakan

Gunakan skill ini apabila:

1. **Analisa GitHub repo** — Nak faham projek orang lain
2. **Copy/Clone repo** — Nak tiru structure atau code dari repo lain
3. **Research** — Nak kaji cara orang lain buat projek
4. **Before modification** — Nak ubah repo, kena faham dulu
5. **Code review** — Nak review code dari repo luar
6. **Learning** — Nak belajar dari open source projects

## Trigger Phrases

User mungkin cakap:
- "Baca repo ni"
- "Analisa GitHub ni"
- "Copy project ni"
- "Fahamkan code ni"
- "Scan repo https://github.com/..."
- "Apa ada dalam repo ni?"

## Cara Guna

### Command
```
/KD-github-read https://github.com/owner/repo
```

### CLI
```bash
node .kracked/github-reader/kd-github-read.js --repo=https://github.com/owner/repo
```

## Fitur GitHub Reader

| Fitur | Function |
|-------|----------|
| **Deep Scan** | Baca SEMUA fail dalam repo |
| **File Tree** | Paparan struktur folder visual |
| **Content Reading** | Baca kandungan setiap fail code |
| **Language Stats** | Statistik bahasa/extension |
| **Cache System** | Simpan untuk rujukan |
| **Clone Ready** | Data tersedia untuk copy/modify |

## Output

Selepas scan, lihat hasil di:
```
.kracked/KD_output/github-reader/
├── owner_repo_[timestamp].md           ← Full report dengan code
├── owner_repo_[timestamp]_cache.json   ← Metadata & file list
└── owner_repo_[timestamp]_content.json ← All file contents
```

## Flow Kerja

```
1. User: "/KD-github-read https://github.com/facebook/react"

2. AI Scan:
   - Dapatkan repo info (stars, language, description)
   - Dapatkan file tree (semua fail & folder)
   - Baca kandungan fail (code, config, dll)
   - Build structure understanding

3. Cache:
   - Simpan semua maklumat
   - Ready untuk rujukan

4. AI Lapor:
   - Ringkasan repo
   - Structure overview
   - Key files & their purposes
   - Tech stack detected

5. User Request:
   - "Copy struktur ni" → AI create struktur sama
   - "Ubah component X" → AI dah faham, boleh modify
   - "Explain file Y" → AI explain berdasarkan pemahaman
```

## Rate Limits

| Mode | Limit |
|------|-------|
| Tanpa token | 60 requests/hour |
| Dengan GITHUB_TOKEN | 5,000 requests/hour |

### Set Token
```bash
# Environment variable
export GITHUB_TOKEN=ghp_xxxxxxxxxx

# Or pass as argument
node kd-github-read.js --repo=owner/repo --token=ghp_xxx
```

## Yang Dibaca

### File Types (Dibaca)
- `.js`, `.ts`, `.jsx`, `.tsx` — JavaScript/TypeScript
- `.py` — Python
- `.go` — Go
- `.rs` — Rust
- `.java`, `.kt` — Java/Kotlin
- `.html`, `.css`, `.scss` — Web
- `.json`, `.yaml`, `.yml` — Config
- `.md`, `.txt` — Documentation
- `.sql`, `.prisma` — Database
- `.sh`, `.ps1` — Scripts
- Dan banyak lagi...

### Skip (Tidak Dibaca)
- `node_modules/`, `.git/` — Dependencies
- `.jpg`, `.png`, `.gif` — Images
- `.mp4`, `.mp3` — Media
- `.zip`, `.tar` — Archives
- `package-lock.json` — Lock files
- Files > 100KB

## Contoh Penggunaan

### Analisa Repo
```
User: "Baca https://github.com/vercel/next.js"

AI:
1. Scan repo
2. "Next.js adalah React framework..."
3. "Structure: /packages, /examples, /docs..."
4. "Tech stack: TypeScript, React, Rollup..."
5. "Key files: packages/next/package.json..."
```

### Copy Struktur
```
User: "Copy folder structure ni untuk projek baru"

AI:
1. Ambil dari cache
2. Create struktur folder sama
3. "Saya dah create struktur seperti Next.js..."
```

### Faham & Modify
```
User: "Ubah landing page jadi lebih moden"

AI:
1. Rujuk cache - dah faham landing page
2. Analisa components yang perlu ubah
3. "Berdasarkan analisa, saya cadangkan..."
4. [Execute changes]
```

### Code Review
```
User: "Review code quality repo ni"

AI:
1. Scan semua code files
2. Analisa patterns, conventions
3. "Saya jumpa beberapa isu..."
4. "Cadangan improvement..."
```

## Penggunaan Bersama Tools Lain

### GitHub Reader + TestSprite
```
1. User: "Baca repo X"
2. AI: [Scan dengan GitHub Reader]
3. User: "Test deployment dia"
4. AI: [Test dengan TestSprite]
```

### GitHub Reader + Architect
```
1. User: "Analisa architecture repo ni"
2. AI: [Deep scan + architecture analysis]
3. User: "Buat PRD untuk clone projek ni"
4. AI: [Generate PRD based on understanding]
```

---

*KD finishes what it starts. | KRACKEDDEVS*