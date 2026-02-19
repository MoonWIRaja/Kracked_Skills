---
name: 'KD-test-sprite'
description: 'TestSprite Browser Testing - Visual testing dengan Brave/Chromium'
disable-model-invocation: true
---

Read the full system prompt at .kracked/prompts/system-prompt.md and follow the instructions for the /KD-test-sprite command exactly as written.

# /KD-test-sprite — Browser Testing

Jalankan ujian browser visual menggunakan Brave Browser atau Chromium dengan AI nampak secara real-time.

## Cara Guna

```
/KD-test-sprite https://example.com
/KD-test-sprite --url=https://myapp.com --tests=accessibility,performance
```

## Apa TestSprite Buat

### 1. Browser Detection
- Check jika Brave Browser tersedia
- Jika tiada → prompt untuk download atau guna Chromium (fallback)
- Browser akan BUKA secara visual (AI & user nampak)

### 2. Testing Types
| Test | Apa Check |
|------|-----------|
| Visual Regression | Compare dengan baseline screenshot |
| Functional | Broken links, forms, interactions |
| Performance | Load time, FCP, bundle size |
| Accessibility | WCAG 2.1 compliance |
| Responsive | iPhone, iPad, Desktop viewports |
| Cross-Browser | Chrome, Firefox, Safari user-agents |

### 3. Output
- Screenshots setiap step
- Video recording
- JSON, Markdown, HTML reports

## Flow

```
1. AI check Brave Browser
2. Jika tiada → tanya user:
   "Brave Browser tidak dijumpai. Nak download?
   - [Ya] → Buka brave.com/download
   - [Tidak] → Guna Chromium"
3. Browser BUKA (visual mode)
4. Run tests
5. Capture screenshots + video
6. Generate report
7. AI analisa & cadangkan fixes
```

## Output Location

```
.kracked/KD_output/testsprite/
├── reports/
│   ├── latest.json
│   ├── latest.md
│   └── latest.html
├── screenshots/
│   └── [timestamp]-*.png
└── videos/
    └── [session].webm
```

## CLI Usage

```bash
node .kracked/testsprite/testsprite-core.js
```

## Dependencies

```bash
npm install puppeteer pixelmatch pngjs
```

---

*KD finishes what it starts. | KRACKEDDEVS*