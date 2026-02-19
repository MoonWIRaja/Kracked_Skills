// src/github-reader/github-reader.js
// KD GitHub Reader - Public Repo Deep Scanner
// KRACKEDDEVS - Version 5.0.0

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_API = 'https://api.github.com';
const GITHUB_RAW = 'https://raw.githubusercontent.com';

// File extensions yang perlu dibaca contentnya
const READABLE_EXTENSIONS = [
  '.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs',
  '.py', '.rb', '.go', '.rs', '.java', '.kt', '.swift',
  '.c', '.cpp', '.h', '.cs', '.php',
  '.html', '.css', '.scss', '.less', '.sass',
  '.json', '.yaml', '.yml', '.toml', '.ini', '.env.example',
  '.md', '.txt', '.rst', '.log',
  '.sh', '.bash', '.ps1', '.bat',
  '.sql', '.graphql', '.prisma',
  '.dockerfile', 'Dockerfile', '.dockerignore',
  '.gitignore', '.gitattributes', '.editorconfig',
  'Makefile', 'Rakefile', 'Gemfile', 'Podfile',
  '.vue', '.svelte', '.astro',
  '.xml', '.svg'
];

// File patterns yang nak skip
const SKIP_PATTERNS = [
  'node_modules/', '.git/', 'dist/', 'build/', '.next/', '.nuxt/',
  'vendor/', '__pycache__/', '.venv/', 'venv/', 'env/',
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp', '.avif',
  '.mp4', '.mp3', '.wav', '.pdf', '.zip', '.tar', '.gz', '.rar',
  '.woff', '.woff2', '.ttf', '.eot', '.otf',
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  'Gemfile.lock', 'composer.lock', 'Cargo.lock',
  '.min.js', '.min.css',
  '.pyc', '.pyo', '.exe', '.dll', '.so', '.dylib'
];

/**
 * HTTP GET JSON
 */
function fetchJSON(url, token = null) {
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
        if (res.statusCode === 404) {
          reject(new Error(`404: Repo tidak dijumpai atau private`));
          return;
        }
        if (res.statusCode === 403) {
          reject(new Error('403: Rate limit exceeded. Tambah GITHUB_TOKEN.'));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * HTTP GET Raw Content
 */
function fetchRaw(url, token = null) {
  return new Promise((resolve, reject) => {
    const headers = { 'User-Agent': 'KD-GitHub-Reader/1.0' };
    if (token) headers['Authorization'] = `token ${token}`;

    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Parse GitHub URL
 */
function parseGitHubUrl(input) {
  // Handle various formats:
  // https://github.com/owner/repo
  // https://github.com/owner/repo/tree/branch/path
  // github.com/owner/repo
  // owner/repo
  
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/\?#]+)/;
  const match = input.match(urlPattern);
  
  if (match) {
    return {
      owner: match[1],
      repo: match[2].replace('.git', ''),
      isValid: true
    };
  }
  
  if (input.includes('/') && !input.includes(' ')) {
    const parts = input.split('/');
    if (parts.length >= 2) {
      return {
        owner: parts[0],
        repo: parts[1],
        isValid: true
      };
    }
  }
  
  return { isValid: false };
}

/**
 * Get repository information
 */
async function getRepoInfo(owner, repo, token = null) {
  const data = await fetchJSON(`${GITHUB_API}/repos/${owner}/${repo}`, token);
  return {
    name: data.full_name,
    description: data.description,
    language: data.language,
    stars: data.stargazers_count,
    forks: data.forks_count,
    defaultBranch: data.default_branch,
    topics: data.topics || [],
    license: data.license?.name || 'None',
    size: data.size,
    updatedAt: data.updated_at,
    openIssues: data.open_issues_count,
    isPrivate: data.private,
    url: data.html_url
  };
}

/**
 * Get file tree
 */
async function getFileTree(owner, repo, branch, token = null) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const data = await fetchJSON(url, token);
  
  if (data.truncated) {
    console.warn('[KD-GitHub] ⚠️  Repo besar - tree truncated');
  }

  const tree = data.tree || [];
  return tree.filter(item => {
    for (const skip of SKIP_PATTERNS) {
      if (item.path.includes(skip)) return false;
    }
    return true;
  });
}

/**
 * Build tree display
 */
function buildTreeDisplay(files) {
  const tree = {};
  
  for (const file of files) {
    const parts = file.path.split('/');
    let current = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = { _type: 'dir', _children: {} };
      current = current[parts[i]]._children;
    }
    const filename = parts[parts.length - 1];
    current[filename] = { _type: file.type, _size: file.size, _path: file.path };
  }

  function renderTree(node, prefix = '', isLast = true) {
    let output = '';
    const entries = Object.entries(node).filter(([k]) => !k.startsWith('_'));
    
    entries.forEach(([name, item], index) => {
      const isLastItem = index === entries.length - 1;
      const connector = isLastItem ? '└── ' : '├── ';
      const childPrefix = isLastItem ? '    ' : '│   ';
      
      if (item._type === 'dir') {
        output += `${prefix}${connector}📁 ${name}/\n`;
        output += renderTree(item._children, prefix + childPrefix, isLastItem);
      } else if (item._type === 'blob') {
        const sizeStr = item._size ? ` (${(item._size/1024).toFixed(1)}KB)` : '';
        output += `${prefix}${connector}📄 ${name}${sizeStr}\n`;
      }
    });
    return output;
  }

  return renderTree(tree);
}

/**
 * Read file content
 */
async function readFileContent(owner, repo, branch, filePath, token = null) {
  const shouldRead = READABLE_EXTENSIONS.some(ext => {
    if (ext.startsWith('.')) return filePath.endsWith(ext);
    return filePath.endsWith('/' + ext) || filePath === ext;
  });

  if (!shouldRead) return null;

  const url = `${GITHUB_RAW}/${owner}/${repo}/${branch}/${filePath}`;
  
  try {
    const content = await fetchRaw(url, token);
    if (content.length > 100000) {
      return `[FILE TOO LARGE: ${(content.length/1024).toFixed(0)}KB — ${url}]`;
    }
    return content;
  } catch (e) {
    return `[ERROR: ${e.message}]`;
  }
}

/**
 * Get language statistics
 */
function getLanguageStats(files) {
  const stats = {};
  for (const file of files) {
    if (file.type !== 'blob') continue;
    const ext = path.extname(file.path) || 'no-ext';
    stats[ext] = (stats[ext] || 0) + 1;
  }
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});
}

/**
 * Deep scan repository
 */
async function deepScan(githubUrl, options = {}) {
  // Parse URL
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed.isValid) {
    throw new Error('Format tidak sah. Guna: "owner/repo" atau GitHub URL');
  }
  
  const { owner, repo } = parsed;
  const token = options.token || process.env.GITHUB_TOKEN || null;
  const maxFiles = options.maxFiles || 100;
  const readContent = options.readContent !== false;

  console.log(`\n[KD-GitHub] 🔍 Mengimbas ${owner}/${repo}...\n`);

  // 1. Dapatkan repo info
  const repoInfo = await getRepoInfo(owner, repo, token);
  
  if (repoInfo.isPrivate) {
    throw new Error('Repo ini private. KD-GitHub Reader hanya untuk public repos.');
  }

  console.log(`[KD-GitHub] ✅ Repo: ${repoInfo.name}`);
  console.log(`[KD-GitHub] 📝 ${repoInfo.description || 'Tiada description'}`);
  console.log(`[KD-GitHub] 💻 Language: ${repoInfo.language || 'Mixed'}`);
  console.log(`[KD-GitHub] ⭐ Stars: ${repoInfo.stars}`);
  console.log(`[KD-GitHub] 🌿 Branch: ${repoInfo.defaultBranch}`);

  // 2. Dapatkan file tree
  const allFiles = await getFileTree(owner, repo, repoInfo.defaultBranch, token);
  const codeFiles = allFiles.filter(f => f.type === 'blob');
  const directories = allFiles.filter(f => f.type === 'tree');

  console.log(`[KD-GitHub] 📊 Dijumpai: ${codeFiles.length} fail, ${directories.length} folder`);

  // 3. Baca content fail-fail
  const fileContents = {};
  let filesRead = 0;

  // Priority: README, package.json, config files dulu
  const priorityFiles = codeFiles.filter(f => {
    const name = path.basename(f.path).toLowerCase();
    return name.startsWith('readme') || 
           name === 'package.json' || 
           name === 'pyproject.toml' || 
           name === 'cargo.toml' ||
           name === 'go.mod' ||
           name === 'dockerfile' ||
           name.includes('.env.example') ||
           name === 'tsconfig.json' ||
           name === 'vite.config' ||
           name === 'next.config';
  });

  const otherFiles = codeFiles.filter(f => !priorityFiles.includes(f));
  const filesToRead = [...priorityFiles, ...otherFiles];

  if (readContent) {
    console.log(`[KD-GitHub] 📖 Membaca kandungan fail...`);
    
    for (const file of filesToRead) {
      if (filesRead >= maxFiles) {
        console.log(`[KD-GitHub] ⚠️  Limit reached: ${maxFiles} files`);
        break;
      }
      
      const content = await readFileContent(owner, repo, repoInfo.defaultBranch, file.path, token);
      if (content !== null) {
        fileContents[file.path] = content;
        filesRead++;
        process.stdout.write(`\r[KD-GitHub] 📖 Progress: ${filesRead}/${Math.min(filesToRead.length, maxFiles)} files`);
      }
    }
    console.log('\n');
  }

  // 4. Build tree display
  const treeDisplay = buildTreeDisplay(allFiles);

  // 5. Compile result
  const result = {
    repoInfo,
    allFiles,
    fileContents,
    treeDisplay,
    stats: {
      totalFiles: codeFiles.length,
      totalDirs: directories.length,
      filesRead,
      languages: getLanguageStats(codeFiles)
    }
  };

  console.log(`[KD-GitHub] ✅ Scan selesai!\n`);

  return result;
}

/**
 * Generate report
 */
function generateReport(result) {
  const { repoInfo, treeDisplay, fileContents, stats } = result;
  
  let report = `# 📖 GitHub Reader Report: ${repoInfo.name}

## 📊 Maklumat Repo

| Field | Nilai |
|-------|-------|
| **Nama** | ${repoInfo.name} |
| **URL** | ${repoInfo.url} |
| **Penerangan** | ${repoInfo.description || 'Tiada'} |
| **Bahasa Utama** | ${repoInfo.language || 'Mixed'} |
| **Stars** | ⭐ ${repoInfo.stars} |
| **Forks** | 🍴 ${repoInfo.forks} |
| **Default Branch** | ${repoInfo.defaultBranch} |
| **License** | ${repoInfo.license} |
| **Saiz Repo** | ${(repoInfo.size/1024).toFixed(1)} MB |
| **Last Updated** | ${repoInfo.updatedAt} |
| **Open Issues** | ${repoInfo.openIssues} |
| **Topics** | ${repoInfo.topics.join(', ') || 'Tiada'} |

---

## 📁 Struktur Fail

\`\`\`
${repoInfo.name}/
${treeDisplay}
\`\`\`

**Statistik:**
- Jumlah fail: **${stats.totalFiles}**
- Jumlah folder: **${stats.totalDirs}**
- Fail dibaca: **${stats.filesRead}**

**Bahasa/Extensions:**
${Object.entries(stats.languages).map(([ext, count]) => `- ${ext}: ${count} files`).join('\n')}

---

## 📄 Kandungan Fail

`;

  // Add file contents
  for (const [filePath, content] of Object.entries(fileContents)) {
    const ext = path.extname(filePath).replace('.', '') || 'text';
    const filename = path.basename(filePath);
    report += `### \`${filePath}\`\n\n`;
    
    // Truncate very long files
    const truncatedContent = content.length > 8000 
      ? content.substring(0, 8000) + '\n\n... [TRUNCATED - file too long]' 
      : content;
    
    report += `\`\`\`${ext}\n${truncatedContent}\n\`\`\`\n\n---\n\n`;
  }

  report += `\n*Dijana oleh KD-GitHub Reader | KRACKEDDEVS*\n`;
  
  return report;
}

module.exports = {
  deepScan,
  parseGitHubUrl,
  getRepoInfo,
  getFileTree,
  readFileContent,
  buildTreeDisplay,
  generateReport,
  getLanguageStats,
  READABLE_EXTENSIONS,
  SKIP_PATTERNS
};