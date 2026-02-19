---
name: 'Browser Testing'
skill_id: '16'
category: 'Testing'
tags: ['testing', 'browser', 'e2e', 'visual', 'accessibility']
---

# Skill 16: Browser Testing (KD-TestSprite)

## Bila Digunakan

Gunakan skill ini apabila:

1. **Testing website atau web app** — Perlu uji secara visual dan functional
2. **Visual regression** — Nak pastikan UI tak berubah dari baseline
3. **Accessibility audit** — Perlu check WCAG 2.1 compliance
4. **Performance testing** — Nak tahu load time, bundle size, FCP
5. **Responsive testing** — Perlu uji di pelbagai screen sizes
6. **Cross-browser testing** — Nak pastikan compatible dengan Chrome, Firefox, Safari

## Trigger Phrases

User mungkin cakap:
- "Test website ni"
- "Run browser tests"
- "Check accessibility"
- "Test performance"
- "Nampak tak ada bug?"
- "Screenshot setiap step"

## Cara Guna

### Command
```
/KD-test-sprite
```

### CLI
```bash
node .kracked/testsprite/testsprite-core.js --url=https://example.com
```

## Fitur TestSprite

| Fitur | Function |
|-------|----------|
| **Brave Detection** | Auto-detect Brave Browser, fallback ke Chromium |
| **Visual Mode** | Browser NAMPAK - AI dan user boleh tengok |
| **Screenshots** | Setiap step ditangkap gambar |
| **Video Recording** | Rakam keseluruhan sesi testing |
| **Visual Regression** | Compare dengan baseline screenshot |
| **Functional Tests** | Check broken links, forms, interactions |
| **Performance Tests** | Load time, FCP, bundle size |
| **Accessibility Tests** | WCAG 2.1 compliance check |
| **Cross-Browser** | Test dengan Chrome, Firefox, Safari user-agents |

## Output

Selepas testing, lihat hasil di:
```
.kracked/KD_output/testsprite/
├── reports/
│   ├── latest.json      ← JSON report
│   ├── latest.md        ← Markdown report
│   └── latest.html      ← HTML report (open in browser)
├── screenshots/
│   ├── [timestamp]-initial_page.png
│   ├── [timestamp]-responsive_iPhone_SE.png
│   └── ...
└── videos/
    └── [session-id].webm
```

## Flow Kerja

```
1. User: "/KD-test-sprite https://myapp.com"

2. AI Check:
   - Brave Browser ada? → Gunakan Brave
   - Tak ada? → Gunakan Chromium (fallback)

3. Browser BUKA (visual mode):
   - User dan AI NAMPAK browser
   - Setiap action ditangkap screenshot

4. Tests Run:
   - Visual Regression
   - Functional Tests
   - Performance Tests
   - Accessibility Tests
   - Responsive Tests
   - Cross-Browser Tests

5. Report Generated:
   - JSON, Markdown, HTML
   - Screenshots
   - Video recording

6. AI Analisa:
   - Baca report
   - Beritahu user isu yang dijumpai
   - Cadangkan fixes
```

## Brave Browser

TestSprite akan:
1. **Detect** Brave Browser secara automatik
2. **Prompt** jika tiada Brave - tanya user nak download atau guna Chromium
3. **Fallback** ke Chromium jika user tak nak download

### Download Brave
- URL: https://brave.com/download/
- Sebab guna Brave: Privacy-focused, fast, Chromium-based

## Dependencies

```json
{
  "dependencies": {
    "puppeteer": "^21.0.0",
    "pixelmatch": "^5.3.0",
    "pngjs": "^7.0.0"
  }
}
```

## Contoh Penggunaan

### Basic Testing
```
User: "Test https://myapp.com"
AI: 
1. Buka browser
2. Navigate ke URL
3. Run semua tests
4. Generate report
5. "Saya jumpa 3 issues..."
```

### Specific Tests
```
User: "Check accessibility je untuk page ni"
AI:
1. Buka browser
2. Run accessibility tests only
3. Report WCAG issues
```

### Visual Regression
```
User: "Ada perubahan visual dari last time?"
AI:
1. Compare dengan baseline
2. Highlight differences
3. "Ada 2.3% pixel changes di homepage"
```

---

*KD finishes what it starts. | KRACKEDDEVS*