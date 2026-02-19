# 🚀 KRACKED_SKILLS (KD) — PELAN PENAMBAHAN SISTEM
## KD v5.0.0 Enhancement Plan
**Oleh: KRACKEDDEVS | Tarikh: 2026**

---

# 📋 RINGKASAN

Penambahan ini memperkenalkan **2 modul baru** kepada sistem KD:

| Modul | Nama | Fungsi Utama |
|-------|------|--------------|
| **A** | `KD-TestSprite Browser Upgrade` | Upgrade TestSprite sedia ada dengan Brave Browser + Visual Mode |
| **B** | `KD-GitHub Reader` | AI baca mana-mana GitHub repo awam - deep scan, clone, modify |

**KEKAL VERSION 5.0.0** ✅

---

# BAHAGIAN A
# 🌐 KD-TestSprite Browser Upgrade

## A.1 — Apa Yang Sedia Ada

**File:** `src/testsprite/testsprite-core.js`

**Keupayaan sekarang:**
- ✅ Puppeteer (buka browser)
- ✅ Visual Regression Testing (screenshot compare)
- ✅ Functional Testing (broken links, forms, buttons)
- ✅ Performance Testing (load time, bundle size, FCP)
- ✅ Accessibility Testing (WCAG 2.1 compliance)
- ✅ Cross-browser Testing (user-agent simulation)
- ✅ Generate reports (JSON, MD, HTML)

**Kelemahan sekarang:**
- ❌ Headless mode sahaja (user tidak nampak browser)
- ❌ Tiada Brave Browser detection
- ❌ Tiada video recording
- ❌ Tiada real-time AI feedback

## A.2 — Apa Yang Akan Ditambah

### A.2.1 — Brave Browser Detection + Auto-Prompt

```
Flow:
1. User run /KD-test-sprite
2. System check Brave Browser
3. Jika ADA → Gunakan Brave
4. Jika TIADA → AI tanya user:
   "Brave Browser tidak dijumpai. Nak download sekarang?"
   - [Ya] → AI buka https://brave.com/download/
   - [Tidak] → AI guna Chromium (fallback)
```

### A.2.2 — Visual Mode (Browser Nampak)

```
Before: headless: true (browser tersembunyi)
After:  headless: false (browser NAMPAK)

AI dan user boleh NAMPAK browser buat testing secara real-time.
```

### A.2.3 — Screenshot Setiap Step

```
Setiap tindakan testing akan ditangkap screenshot:
- Navigate to page → Screenshot 1
- Click button → Screenshot 2
- Fill form → Screenshot 3
- Submit → Screenshot 4
- Error detected → Screenshot FAIL

Semua screenshot disimpan dalam:
.kracked/KD_output/testsprite/screenshots/
```

### A.2.4 — Video Recording

```
Rakam keseluruhan sesi testing sebagai video.
Format: .webm
Disimpan: .kracked/KD_output/testsprite/videos/
```

## A.3 — Fail Yang Akan Diubah/Ditambah

### A.3.1 — `src/testsprite/testsprite-core.js` (UBAH)

Tambah dalam class TestSprite:

```javascript
// === TAMBAHAN BARU ===

// Brave Browser Paths
const BRAVE_PATHS = {
  win32: [
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    process.env.LOCALAPPDATA + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
  ],
  darwin: ['/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'],
  linux: ['/usr/bin/brave-browser', '/usr/bin/brave', '/snap/bin/brave']
};

detectBravePath() {
  const platform = process.platform;
  const paths = BRAVE_PATHS[platform] || [];
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (e) { continue; }
  }
  return null;
}

async init(options = {}) {
  const bravePath = this.detectBravePath();
  
  const launchOptions = {
    headless: options.headless ?? false, // VISUAL by default
    slowMo: options.slowMo ?? 500, // 500ms delay per action
    args: ['--start-maximized', '--no-sandbox'],
    recordVideo: {
      dir: '.kracked/KD_output/testsprite/videos',
      size: { width: 1920, height: 1080 }
    }
  };

  if (bravePath) {
    launchOptions.executablePath = bravePath;
    console.log('🦁 Menggunakan Brave Browser');
  } else {
    console.log('⚠️ Brave tidak dijumpai. Menggunakan Chromium.');
  }

  this.browser = await puppeteer.launch(launchOptions);
}

// Screenshot helper
async takeScreenshot(page, label) {
  const timestamp = Date.now();
  const filename = `${timestamp}-${label}.png`;
  const path = `.kracked/KD_output/testsprite/screenshots/${filename}`;
  await page.screenshot({ path, fullPage: true });
  return path;
}
```

### A.3.2 — `src/testsprite/browser-setup.js` (BARU)

```javascript
// src/testsprite/browser-setup.js
// KD TestSprite Browser Setup - Brave Detection + Install Prompt

const fs = require('fs');
const { exec } = require('child_process');

const BRAVE_PATHS = {
  win32: [
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
  ],
  darwin: ['/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'],
  linux: ['/usr/bin/brave-browser', '/snap/bin/brave']
};

const BRAVE_DOWNLOAD_URL = 'https://brave.com/download/';

function detectBrave() {
  const platform = process.platform;
  const paths = BRAVE_PATHS[platform] || [];
  
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) {
        return { found: true, path: p };
      }
    } catch (e) { continue; }
  }
  return { found: false, path: null };
}

function promptBraveInstall() {
  return {
    message: `🦁 Brave Browser tidak dijumpai.

Brave Browser disyorkan untuk TestSprite kerana:
- Privacy-focused (tiada tracking)
- Fast performance
- Chromium-based (compatible)

Nak download Brave sekarang?`,
    downloadUrl: BRAVE_DOWNLOAD_URL,
    fallback: 'Chromium (Playwright bundled browser)'
  };
}

module.exports = { detectBrave, promptBraveInstall, BRAVE_DOWNLOAD_URL };
```

---

# BAHAGIAN B
# 📖 KD-GitHub Reader

## B.1 — Keupayaan

| Fitur | Keterangan |
|-------|------------|
| **Deep Scan** | Baca SEMUA fail dalam repo (code, assets, config) |
| **Analisa Struktur** | Faham folder structure, dependencies, patterns |
| **Cache** | Simpan maklumat untuk rujukan |
| **Clone** | Copy repo ke local termasuk assets |
| **Modify** | AI boleh buat perubahan berdasarkan pemahaman |

## B.2 — Flow Kerja

```
User: "/KD-github-read https://github.com/owner/repo"

AI:
1. Deep Scan - baca SEMUA fail
2. Analisa - faham struktur + dependencies
3. Cache - simpan dalam .kracked/cache/
4. Lapor - beri ringkasan

User: "Copy repo ini ke folder baru"

AI:
1. Ambil dari cache
2. Clone semua fail + assets
3. Create struktur sama

User: "Ubah login page"

AI:
1. Rujuk cache - dah faham login page
2. Analisa perubahan
3. Execute perubahan
```

## B.3 — Fail Yang Akan Dibuat

### B.3.1 — `src/github-reader/github-reader.js` (BARU)

```javascript
// src/github-reader/github-reader.js
// KD GitHub Reader - Public Repo Deep Scanner

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_API = 'https://api.github.com';
const GITHUB_RAW = 'https://raw.githubusercontent.com';

// Extensions untuk baca content
const READABLE_EXTENSIONS = [
  '.js', '.ts', '.jsx', '.tsx', '.mjs',
  '.py', '.rb', '.go', '.rs', '.java', '.kt',
  '.html', '.css', '.scss', '.json', '.yaml', '.yml',
  '.md', '.txt', '.sh', '.sql', '.prisma'
];

// Skip patterns
const SKIP_PATTERNS = [
  'node_modules/', '.git/', 'dist/', 'build/',
  '.jpg', '.png', '.gif', '.mp4', '.pdf', '.zip'
];

async function fetchJSON(url, token = null) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': 'KD-GitHub-Reader/1.0',
      'Accept': 'application/vnd.github.v3+json'
    };
    if (token) headers['Authorization'] = `token ${token}`;

    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 403) {
          reject(new Error('Rate limit exceeded. Add GITHUB_TOKEN.'));
          return;
        }
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'KD-GitHub-Reader/1.0' }}, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getRepoInfo(owner, repo, token) {
  const data = await fetchJSON(`${GITHUB_API}/repos/${owner}/${repo}`, token);
  return {
    name: data.full_name,
    description: data.description,
    language: data.language,
    stars: data.stargazers_count,
    defaultBranch: data.default_branch,
    isPrivate: data.private
  };
}

async function getFileTree(owner, repo, branch, token) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const data = await fetchJSON(url, token);
  
  return (data.tree || []).filter(item => {
    for (const skip of SKIP_PATTERNS) {
      if (item.path.includes(skip)) return false;
    }
    return true;
  });
}

async function readFileContent(owner, repo, branch, filePath, token) {
  const shouldRead = READABLE_EXTENSIONS.some(ext => filePath.endsWith(ext));
  if (!shouldRead) return null;

  const url = `${GITHUB_RAW}/${owner}/${repo}/${branch}/${filePath}`;
  try {
    return await fetchRaw(url);
  } catch (e) {
    return null;
  }
}

async function deepScan(githubUrl, options = {}) {
  // Parse URL
  let owner, repo;
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (match) {
    owner = match[1];
    repo = match[2].replace('.git', '');
  } else {
    throw new Error('Format tidak sah. Guna: https://github.com/owner/repo');
  }

  const token = options.token || process.env.GITHUB_TOKEN || null;
  const maxFiles = options.maxFiles || 100;

  console.log(`[KD-GitHub] 🔍 Scanning ${owner}/${repo}...`);

  // Get repo info
  const repoInfo = await getRepoInfo(owner, repo, token);
  
  if (repoInfo.isPrivate) {
    throw new Error('Repo ini private. Hanya public repos sahaja.');
  }

  // Get file tree
  const files = await getFileTree(owner, repo, repoInfo.defaultBranch, token);
  const codeFiles = files.filter(f => f.type === 'blob');

  console.log(`[KD-GitHub] 📊 Found: ${codeFiles.length} files`);

  // Read contents
  const fileContents = {};
  let filesRead = 0;

  for (const file of codeFiles) {
    if (filesRead >= maxFiles) break;
    
    const content = await readFileContent(owner, repo, repoInfo.defaultBranch, file.path, token);
    if (content !== null) {
      fileContents[file.path] = content;
      filesRead++;
    }
  }

  return {
    repoInfo,
    files: codeFiles,
    fileContents,
    stats: { totalFiles: codeFiles.length, filesRead }
  };
}

module.exports = { deepScan, getRepoInfo, getFileTree, readFileContent };
```

### B.3.2 — `src/github-reader/kd-github-read.js` (BARU)

```javascript
// src/github-reader/kd-github-read.js
// KD GitHub Reader CLI

const { deepScan } = require('./github-reader');
const fs = require('fs');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  const repoArg = args.find(a => a.startsWith('--repo='))?.split('=')[1];
  const outputDir = args.find(a => a.startsWith('--output='))?.split('=')[1] || '.kracked/KD_output/github-reader';

  if (!repoArg) {
    console.error('[KD-GitHub] ❌ Guna: --repo=https://github.com/owner/repo');
    process.exit(1);
  }

  try {
    const result = await deepScan(repoArg);
    
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Save report
    const reportPath = path.join(outputDir, `${result.repoInfo.name.replace('/', '_')}.md`);
    const report = generateReport(result);
    fs.writeFileSync(reportPath, report);
    
    // Save cache
    const cachePath = path.join(outputDir, 'cache.json');
    fs.writeFileSync(cachePath, JSON.stringify(result, null, 2));

    console.log(`[KD-GitHub] ✅ Scan complete!`);
    console.log(`[KD-GitHub] 📁 Report: ${reportPath}`);
    console.log(`[KD-GitHub] 💾 Cache: ${cachePath}`);

  } catch (error) {
    console.error(`[KD-GitHub] ❌ Error: ${error.message}`);
    process.exit(1);
  }
}

function generateReport(result) {
  let report = `# GitHub Reader Report: ${result.repoInfo.name}

## Repo Info
| Field | Value |
|-------|-------|
| **Name** | ${result.repoInfo.name} |
| **Description** | ${result.repoInfo.description || 'None'} |
| **Language** | ${result.repoInfo.language || 'Mixed'} |
| **Stars** | ⭐ ${result.repoInfo.stars} |
| **Default Branch** | ${result.repoInfo.defaultBranch} |

## Stats
- Total Files: ${result.stats.totalFiles}
- Files Read: ${result.stats.filesRead}

## File Contents
`;

  for (const [filePath, content] of Object.entries(result.fileContents)) {
    const ext = path.extname(filePath).replace('.', '') || 'text';
    report += `### \`${filePath}\`\n\n\`\`\`${ext}\n${content.substring(0, 5000)}\n\`\`\`\n\n`;
  }

  return report;
}

main();
```

---

# FAIL YANG PERLU DIKEMASKINI

## `src/tui/screens/install.js`

Tambah dalam `downloadAllFiles()`:

```javascript
// GitHub Reader
{ url: `${base}/github-reader/github-reader.js`, dest: `${KD_DIR}/github-reader/github-reader.js` },
{ url: `${base}/github-reader/kd-github-read.js`, dest: `${KD_DIR}/github-reader/kd-github-read.js` },
```

Tambah dalam `createDirectories()`:

```javascript
`${KD_DIR}/github-reader`,
`${KD_DIR}/KD_output/testsprite/screenshots`,
`${KD_DIR}/KD_output/testsprite/videos`,
`${KD_DIR}/KD_output/github-reader`,
```

## `src/core/indexes/commands-index.md`

Tambah:
- KD-test-sprite
- KD-github-read

## `src/core/indexes/skills-index.md`

Tambah:
- 16-browser-testing.md
- 17-github-analysis.md

---

# CHECKLIST PELAKSANAAN

## TestSprite (Upgrade)
- [ ] Ubah `testsprite-core.js` - tambah Brave + visual mode
- [ ] Buat `browser-setup.js` - Brave detection
- [ ] Buat `KD-test-sprite.md` untuk 6 adapters

## GitHub Reader (Baru)
- [ ] Buat `github-reader.js` - deep scan engine
- [ ] Buat `kd-github-read.js` - CLI
- [ ] Buat `KD-github-read.md` untuk 6 adapters

## Skills (Baru)
- [ ] Buat `16-browser-testing.md`
- [ ] Buat `17-github-analysis.md`

## Update Scripts
- [ ] Update `install.js` - tambah download entries
- [ ] Update `commands-index.md`
- [ ] Update `skills-index.md`

---

**VERSION KEKAL: 5.0.0** ✅

*KD finishes what it starts. | KRACKEDDEVS*