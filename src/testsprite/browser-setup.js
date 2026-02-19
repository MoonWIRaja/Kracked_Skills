// src/testsprite/browser-setup.js
// KD TestSprite Browser Setup - Brave Detection + Install Prompt
// KRACKEDDEVS

const fs = require('fs');
const path = require('path');

// Brave Browser installation paths
const BRAVE_PATHS = {
  win32: [
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    path.join(process.env.LOCALAPPDATA || '', 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe')
  ],
  darwin: [
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
  ],
  linux: [
    '/usr/bin/brave-browser',
    '/usr/bin/brave',
    '/snap/bin/brave',
    '/opt/brave.com/brave/brave'
  ]
};

const BRAVE_DOWNLOAD_URL = 'https://brave.com/download/';

/**
 * Detect if Brave Browser is installed
 * @returns {{ found: boolean, path: string|null, platform: string }}
 */
function detectBrave() {
  const platform = process.platform;
  const paths = BRAVE_PATHS[platform] || [];
  
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) {
        return { 
          found: true, 
          path: p, 
          platform: platform 
        };
      }
    } catch (e) { 
      continue; 
    }
  }
  
  return { found: false, path: null, platform: platform };
}

/**
 * Generate prompt message for Brave install
 * @returns {{ message: string, downloadUrl: string, fallback: string }}
 */
function promptBraveInstall() {
  const detected = detectBrave();
  
  return {
    message: `🦁 Brave Browser tidak dijumpai.

Brave Browser disyorkan untuk TestSprite kerana:
✅ Privacy-focused (tiada tracking)
✅ Fast performance  
✅ Chromium-based (compatible dengan semua web apps)
✅ Built-in ad blocker

Nak download Brave sekarang?
- Ya: Buka halaman download Brave
- Tidak: Guna Chromium (fallback browser)`,
    downloadUrl: BRAVE_DOWNLOAD_URL,
    fallback: 'Chromium (bundled dengan Puppeteer)',
    detected: detected
  };
}

/**
 * Get browser executable path
 * Returns Brave path if found, null for Chromium fallback
 * @returns {string|null}
 */
function getBrowserPath() {
  const detected = detectBrave();
  return detected.found ? detected.path : null;
}

/**
 * Get browser launch options
 * @param {Object} options - Custom options
 * @returns {Object}
 */
function getBrowserOptions(options = {}) {
  const bravePath = getBrowserPath();
  
  const launchOptions = {
    headless: options.headless ?? false,  // VISUAL by default
    slowMo: options.slowMo ?? 500,        // 500ms delay per action
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ],
    defaultViewport: null,  // Use full screen
    ignoreHTTPSErrors: true
  };

  if (bravePath) {
    launchOptions.executablePath = bravePath;
    console.log('🦁 [KD-TestSprite] Menggunakan Brave Browser');
  } else {
    console.log('⚠️  [KD-TestSprite] Brave tidak dijumpai. Menggunakan Chromium.');
  }

  return launchOptions;
}

/**
 * Check browser status and print info
 */
function printBrowserStatus() {
  const detected = detectBrave();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🧪 KD-TESTSPRITE BROWSER STATUS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (detected.found) {
    console.log(`  ✅ Brave Browser: FOUND`);
    console.log(`  📁 Path: ${detected.path}`);
  } else {
    console.log(`  ❌ Brave Browser: NOT FOUND`);
    console.log(`  📥 Download: ${BRAVE_DOWNLOAD_URL}`);
    console.log(`  🔄 Fallback: Chromium`);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

module.exports = {
  detectBrave,
  promptBraveInstall,
  getBrowserPath,
  getBrowserOptions,
  printBrowserStatus,
  BRAVE_DOWNLOAD_URL,
  BRAVE_PATHS
};