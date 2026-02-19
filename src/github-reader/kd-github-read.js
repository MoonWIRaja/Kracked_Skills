#!/usr/bin/env node
// src/github-reader/kd-github-read.js
// KD GitHub Reader - CLI Runner
// KRACKEDDEVS - Version 5.0.0

const { deepScan, generateReport } = require('./github-reader');
const fs = require('fs');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const repoArg = args.find(a => a.startsWith('--repo='))?.split('=').slice(1).join('=');
  const outputDir = args.find(a => a.startsWith('--output='))?.split('=')[1] || '.kracked/KD_output/github-reader';
  const maxFiles = parseInt(args.find(a => a.startsWith('--max-files='))?.split('=')[1] || '100');
  const noContent = args.includes('--no-content');
  const token = args.find(a => a.startsWith('--token='))?.split('=')[1] || process.env.GITHUB_TOKEN;
  const help = args.includes('--help') || args.includes('-h');

  // Show help
  if (help) {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📖 KD-GitHub Reader
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usage:
  node kd-github-read.js --repo=https://github.com/owner/repo
  node kd-github-read.js --repo=owner/repo

Options:
  --repo=URL       GitHub URL atau "owner/repo" (required)
  --output=DIR     Output directory (default: .kracked/KD_output/github-reader)
  --max-files=N    Maximum files to read (default: 100)
  --no-content     Skip reading file contents
  --token=TOKEN    GitHub personal access token
  --help, -h       Show this help

Examples:
  node kd-github-read.js --repo=https://github.com/facebook/react
  node kd-github-read.js --repo=vercel/next.js --max-files=200
  node kd-github-read.js --repo=owner/repo --token=ghp_xxx

Environment:
  GITHUB_TOKEN     Set token as env var for higher rate limits

Rate Limits:
  Without token:   60 requests/hour
  With token:      5,000 requests/hour

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    process.exit(0);
  }

  // Validate required argument
  if (!repoArg) {
    console.error('[KD-GitHub] ❌ Error: --repo diperlukan');
    console.error('[KD-GitHub] Guna: --repo=https://github.com/owner/repo');
    process.exit(1);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  📖 KD-GITHUB READER');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Run deep scan
    const result = await deepScan(repoArg, {
      token,
      maxFiles,
      readContent: !noContent
    });

    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Generate timestamp
    const timestamp = Date.now();
    const repoName = result.repoInfo.name.replace('/', '_');

    // Save markdown report
    const reportPath = path.join(outputDir, `${repoName}_${timestamp}.md`);
    const report = generateReport(result);
    fs.writeFileSync(reportPath, report);
    console.log(`[KD-GitHub] 📝 Report: ${reportPath}`);

    // Save JSON cache
    const cachePath = path.join(outputDir, `${repoName}_${timestamp}_cache.json`);
    fs.writeFileSync(cachePath, JSON.stringify({
      repoInfo: result.repoInfo,
      stats: result.stats,
      files: result.allFiles.map(f => ({ 
        path: f.path, 
        type: f.type, 
        size: f.size 
      })),
      scannedAt: new Date().toISOString()
    }, null, 2));
    console.log(`[KD-GitHub] 💾 Cache: ${cachePath}`);

    // Save full content if read
    if (Object.keys(result.fileContents).length > 0) {
      const contentPath = path.join(outputDir, `${repoName}_${timestamp}_content.json`);
      fs.writeFileSync(contentPath, JSON.stringify(result.fileContents, null, 2));
      console.log(`[KD-GitHub] 📦 Content: ${contentPath}`);
    }

    // Summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  ✅ SCAN COMPLETE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  📁 Repo: ${result.repoInfo.name}`);
    console.log(`  📊 Files: ${result.stats.totalFiles}`);
    console.log(`  📖 Read: ${result.stats.filesRead}`);
    console.log(`  💻 Language: ${result.repoInfo.language || 'Mixed'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Print summary to stdout
    console.log('--- PREVIEW ---');
    console.log(`\n${result.repoInfo.name}: ${result.repoInfo.description || 'No description'}`);
    console.log(`\nTop Languages: ${Object.entries(result.stats.languages).slice(0, 5).map(([k,v]) => `${k}(${v})`).join(', ')}`);
    console.log(`\nSee full report at: ${reportPath}`);
    console.log('--- END PREVIEW ---\n');

  } catch (error) {
    console.error(`\n[KD-GitHub] ❌ Error: ${error.message}`);
    
    if (error.message.includes('404')) {
      console.error('[KD-GitHub] Pastikan repo adalah PUBLIC dan URL betul.');
    }
    if (error.message.includes('403')) {
      console.error('[KD-GitHub] Rate limit exceeded. Tambah GITHUB_TOKEN.');
    }
    
    process.exit(1);
  }
}

main();