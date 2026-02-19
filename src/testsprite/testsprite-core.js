// src/testsprite/testsprite-core.js
// KD TestSprite - Complete Browser Testing Suite
// KRACKEDDEVS - Version 5.0.0

const puppeteer = require('puppeteer');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Import browser setup for Brave detection
const { 
  detectBrave, 
  getBrowserOptions, 
  printBrowserStatus,
  BRAVE_DOWNLOAD_URL 
} = require('./browser-setup');

class TestSprite {
    constructor(config = {}) {
        this.config = {
            headless: false,        // VISUAL by default
            slowMo: 500,            // 500ms delay per action
            recordVideo: true,      // Enable video recording
            screenshots: true,      // Enable screenshots
            ...config
        };
        this.browser = null;
        this.context = null;
        this.page = null;
        this.results = {
            visual: [],
            functional: [],
            performance: [],
            accessibility: []
        };
        this.screenshots = [];
        this.videoPath = null;
        this.sessionId = `kd_test_${Date.now()}`;
        this.outputDir = this.config.outputDir || '.kracked/KD_output/testsprite';
    }
    
    /**
     * Initialize browser with Brave detection
     */
    async init() {
        // Print browser status
        printBrowserStatus();
        
        // Get browser options with Brave detection
        const browserOptions = getBrowserOptions({
            headless: this.config.headless,
            slowMo: this.config.slowMo
        });
        
        // Launch browser
        this.browser = await puppeteer.launch(browserOptions);
        
        // Create context with video recording
        const contextOptions = {
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        };
        
        if (this.config.recordVideo) {
            const videoDir = path.join(this.outputDir, 'videos');
            fs.mkdirSync(videoDir, { recursive: true });
            contextOptions.recordVideo = {
                dir: videoDir,
                size: { width: 1920, height: 1080 }
            };
        }
        
        this.context = await this.browser.newContext(contextOptions);
        this.page = await this.context.newPage();
        
        // Setup event listeners
        this._setupEventListeners();
        
        console.log(`✅ [KD-TestSprite] Browser initialized`);
        console.log(`📹 [KD-TestSprite] Session ID: ${this.sessionId}`);
        
        return this;
    }
    
    /**
     * Setup event listeners for logging
     */
    _setupEventListeners() {
        // Console logs
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                this.results.functional.push({
                    type: 'CONSOLE_ERROR',
                    severity: 'MEDIUM',
                    message: msg.text(),
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        // JavaScript errors
        this.page.on('pageerror', error => {
            this.results.functional.push({
                type: 'JAVASCRIPT_ERROR',
                severity: 'CRITICAL',
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString()
            });
        });
        
        // Network failures
        this.page.on('requestfailed', request => {
            this.results.functional.push({
                type: 'NETWORK_FAILURE',
                severity: 'HIGH',
                url: request.url(),
                error: request.failure()?.errorText,
                timestamp: new Date().toISOString()
            });
        });
    }
    
    /**
     * Take screenshot with label
     */
    async takeScreenshot(label) {
        if (!this.config.screenshots) return null;
        
        const screenshotDir = path.join(this.outputDir, 'screenshots');
        fs.mkdirSync(screenshotDir, { recursive: true });
        
        const timestamp = Date.now();
        const safeLabel = label.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${timestamp}-${safeLabel}.png`;
        const screenshotPath = path.join(screenshotDir, filename);
        
        await this.page.screenshot({ 
            path: screenshotPath, 
            fullPage: true 
        });
        
        this.screenshots.push({
            label,
            path: screenshotPath,
            timestamp: new Date().toISOString()
        });
        
        console.log(`📸 [KD-TestSprite] Screenshot: ${label}`);
        return screenshotPath;
    }
    
    /**
     * Run full test suite
     */
    async runFullSuite(url) {
        console.log(`\n🧪 [KD-TestSprite] Starting full test suite for ${url}\n`);
        
        await this.init();
        
        // Navigate to page first
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.takeScreenshot('initial_page');
        
        // Run all tests
        await this.visualRegression(url);
        await this.functionalTests(url);
        await this.performanceTests(url);
        await this.accessibilityTests(url);
        await this.crossBrowserTests(url);
        
        // Generate reports
        const report = await this.generateReport();
        
        // Close browser
        await this.close();
        
        return report;
    }
    
    /**
     * Close browser and save video
     */
    async close() {
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
        
        // Get video path
        if (this.config.recordVideo && this.page) {
            const video = this.page.video();
            if (video) {
                this.videoPath = await video.path();
                console.log(`📹 [KD-TestSprite] Video saved: ${this.videoPath}`);
            }
        }
        
        console.log(`✅ [KD-TestSprite] Browser closed`);
    }
    
    /**
     * Visual Regression Testing
     */
    async visualRegression(url) {
        console.log('📸 [KD-TestSprite] Running visual regression tests...');
        
        await this.page.setViewport({ width: 1920, height: 1080 });
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.takeScreenshot('visual_regression_desktop');
        
        // Baseline comparison
        const baselinePath = path.join(this.outputDir, 'baseline.png');
        const currentPath = path.join(this.outputDir, 'screenshots', 'current.png');
        
        if (fs.existsSync(baselinePath)) {
            const diff = await this.compareScreenshots(baselinePath, currentPath);
            
            if (diff.mismatchedPixels > (this.config.visualThreshold || 100)) {
                this.results.visual.push({
                    type: 'VISUAL_REGRESSION',
                    severity: 'MEDIUM',
                    message: `Visual difference detected: ${diff.mismatchPercentage}% pixels changed`,
                    diffImage: diff.diffPath,
                    suggestion: 'Review visual changes. Update baseline if intentional.'
                });
            }
        } else {
            // First run - save as baseline
            fs.copyFileSync(currentPath, baselinePath);
            console.log('✅ [KD-TestSprite] Baseline screenshot saved');
        }
        
        // Test responsive layouts
        const viewports = [
            { width: 375, height: 667, name: 'iPhone_SE' },
            { width: 768, height: 1024, name: 'iPad' },
            { width: 1920, height: 1080, name: 'Desktop' }
        ];
        
        for (const viewport of viewports) {
            await this.page.setViewport(viewport);
            await this.page.goto(url, { waitUntil: 'networkidle2' });
            await this.takeScreenshot(`responsive_${viewport.name}`);
            
            // Check for layout issues
            const layoutIssues = await this.page.evaluate(() => {
                const issues = [];
                
                if (document.body.scrollWidth > window.innerWidth) {
                    issues.push('Horizontal scrollbar detected');
                }
                
                const elements = document.querySelectorAll('*');
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > window.innerWidth + 50) {
                        issues.push(`Element overflow: ${el.tagName}.${el.className}`);
                    }
                });
                
                return issues;
            });
            
            if (layoutIssues.length > 0) {
                this.results.visual.push({
                    type: 'RESPONSIVE_LAYOUT',
                    severity: 'HIGH',
                    viewport: viewport.name,
                    issues: layoutIssues.slice(0, 5),
                    suggestion: 'Fix responsive layout issues. Use flexible units.'
                });
            }
        }
        
        console.log('✅ [KD-TestSprite] Visual tests complete');
    }
    
    /**
     * Functional Testing
     */
    async functionalTests(url) {
        console.log('🔧 [KD-TestSprite] Running functional tests...');
        
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.takeScreenshot('functional_before');
        
        // Check broken links
        const links = await this.page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href]'))
                .map(link => link.href)
                .filter(href => href && !href.startsWith('javascript:'));
        });
        
        const brokenLinks = [];
        for (const link of links.slice(0, 20)) { // Check first 20 links
            try {
                const response = await this.page.goto(link, { timeout: 5000, waitUntil: 'domcontentloaded' });
                if (response && response.status() >= 400) {
                    brokenLinks.push({ url: link, status: response.status() });
                }
                await this.page.goBack();
            } catch (error) {
                brokenLinks.push({ url: link, error: error.message });
            }
        }
        
        if (brokenLinks.length > 0) {
            this.results.functional.push({
                type: 'BROKEN_LINKS',
                severity: 'MEDIUM',
                count: brokenLinks.length,
                links: brokenLinks,
                suggestion: 'Fix or remove broken links'
            });
        }
        
        // Check forms
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        const forms = await this.page.$$('form');
        
        if (forms.length > 0) {
            for (let i = 0; i < forms.length; i++) {
                const requiredFields = await forms[i].$$('input[required], select[required], textarea[required]');
                if (requiredFields.length > 0) {
                    // Test empty form submission
                    const submitBtn = await forms[i].$('button[type="submit"], input[type="submit"]');
                    if (submitBtn) {
                        await this.takeScreenshot(`form_${i}_before_submit`);
                    }
                }
            }
        }
        
        await this.takeScreenshot('functional_after');
        console.log('✅ [KD-TestSprite] Functional tests complete');
    }
    
    /**
     * Performance Testing
     */
    async performanceTests(url) {
        console.log('⚡ [KD-TestSprite] Running performance tests...');
        
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.takeScreenshot('performance_test');
        
        const metrics = await this.page.metrics();
        const performanceMetrics = await this.page.evaluate(() => {
            const perfData = window.performance.timing;
            const navigationStart = perfData.navigationStart;
            
            return {
                domContentLoaded: perfData.domContentLoadedEventEnd - navigationStart,
                loadComplete: perfData.loadEventEnd - navigationStart,
                firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByType('paint')
                    .find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
            };
        });
        
        // Check load time
        if (performanceMetrics.loadComplete > 3000) {
            this.results.performance.push({
                type: 'SLOW_PAGE_LOAD',
                severity: 'HIGH',
                loadTime: `${(performanceMetrics.loadComplete / 1000).toFixed(2)}s`,
                threshold: '3s',
                suggestion: 'Optimize page load. Consider code splitting, lazy loading.'
            });
        }
        
        // Check FCP
        if (performanceMetrics.firstContentfulPaint > 1800) {
            this.results.performance.push({
                type: 'SLOW_FCP',
                severity: 'MEDIUM',
                fcp: `${(performanceMetrics.firstContentfulPaint / 1000).toFixed(2)}s`,
                threshold: '1.8s',
                suggestion: 'Optimize critical rendering path.'
            });
        }
        
        // Check bundle size
        const resourceSizes = await this.page.evaluate(() => {
            return performance.getEntriesByType('resource').map(r => ({
                name: r.name,
                size: r.transferSize,
                type: r.initiatorType
            }));
        });
        
        const jsSize = resourceSizes
            .filter(r => r.type === 'script')
            .reduce((sum, r) => sum + r.size, 0);
        
        if (jsSize > 500000) {
            this.results.performance.push({
                type: 'LARGE_BUNDLE',
                severity: 'HIGH',
                bundleSize: `${(jsSize / 1024).toFixed(0)}KB`,
                threshold: '500KB',
                suggestion: 'JavaScript bundle too large. Use code splitting.'
            });
        }
        
        console.log('✅ [KD-TestSprite] Performance tests complete');
    }
    
    /**
     * Accessibility Testing
     */
    async accessibilityTests(url) {
        console.log('♿ [KD-TestSprite] Running accessibility tests...');
        
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.takeScreenshot('accessibility_test');
        
        // Check missing alt text
        const missingAlt = await this.page.evaluate(() => {
            return Array.from(document.querySelectorAll('img'))
                .filter(img => !img.alt && !img.getAttribute('aria-label'))
                .map(img => img.src);
        });
        
        if (missingAlt.length > 0) {
            this.results.accessibility.push({
                type: 'MISSING_ALT_TEXT',
                severity: 'HIGH',
                count: missingAlt.length,
                images: missingAlt.slice(0, 5),
                wcag: 'WCAG 2.1 Level A - 1.1.1',
                suggestion: 'Add descriptive alt text to all images'
            });
        }
        
        // Check heading hierarchy
        const headingIssues = await this.page.evaluate(() => {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            const issues = [];
            let previousLevel = 0;
            
            for (const heading of headings) {
                const level = parseInt(heading.tagName[1]);
                if (level - previousLevel > 1) {
                    issues.push(`Skipped: ${heading.tagName} after H${previousLevel}`);
                }
                previousLevel = level;
            }
            
            return issues;
        });
        
        if (headingIssues.length > 0) {
            this.results.accessibility.push({
                type: 'HEADING_HIERARCHY',
                severity: 'MEDIUM',
                issues: headingIssues,
                wcag: 'WCAG 2.1 Level AA - 2.4.6',
                suggestion: 'Maintain proper heading hierarchy'
            });
        }
        
        // Check form labels
        const formIssues = await this.page.evaluate(() => {
            return Array.from(document.querySelectorAll('input, select, textarea'))
                .filter(input => {
                    const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
                    const hasAriaLabel = input.getAttribute('aria-label');
                    return !hasLabel && !hasAriaLabel;
                })
                .map(input => ({ type: input.type, name: input.name }));
        });
        
        if (formIssues.length > 0) {
            this.results.accessibility.push({
                type: 'FORM_LABELS',
                severity: 'HIGH',
                count: formIssues.length,
                inputs: formIssues.slice(0, 5),
                wcag: 'WCAG 2.1 Level A - 3.3.2',
                suggestion: 'Add labels to all form inputs'
            });
        }
        
        console.log('✅ [KD-TestSprite] Accessibility tests complete');
    }
    
    /**
     * Cross-Browser Testing (via user-agent simulation)
     */
    async crossBrowserTests(url) {
        console.log('🌐 [KD-TestSprite] Running cross-browser tests...');
        
        const userAgents = [
            { name: 'Chrome', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
            { name: 'Firefox', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Firefox/121.0' },
            { name: 'Safari', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.2' }
        ];
        
        for (const { name, ua } of userAgents) {
            const page = await this.browser.newPage();
            await page.setUserAgent(ua);
            
            try {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
                console.log(`  ✅ ${name}: OK`);
            } catch (error) {
                this.results.functional.push({
                    type: 'BROWSER_COMPATIBILITY',
                    severity: 'HIGH',
                    browser: name,
                    error: error.message,
                    suggestion: `Test and fix compatibility issues for ${name}`
                });
            }
            
            await page.close();
        }
        
        console.log('✅ [KD-TestSprite] Cross-browser tests complete');
    }
    
    /**
     * Compare screenshots for visual regression
     */
    async compareScreenshots(baselinePath, currentPath) {
        if (!fs.existsSync(baselinePath) || !fs.existsSync(currentPath)) {
            return { mismatchedPixels: 0, mismatchPercentage: 0 };
        }
        
        const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
        const current = PNG.sync.read(fs.readFileSync(currentPath));
        
        const { width, height } = baseline;
        const diff = new PNG({ width, height });
        
        const mismatchedPixels = pixelmatch(
            baseline.data,
            current.data,
            diff.data,
            width,
            height,
            { threshold: 0.1 }
        );
        
        const diffPath = path.join(this.outputDir, 'screenshots', 'diff.png');
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        
        return {
            mismatchedPixels,
            mismatchPercentage: ((mismatchedPixels / (width * height)) * 100).toFixed(2),
            diffPath
        };
    }
    
    /**
     * Generate test report
     */
    async generateReport() {
        const report = {
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            browser: detectBrave().found ? 'Brave' : 'Chromium',
            summary: {
                total_issues: 
                    this.results.visual.length +
                    this.results.functional.length +
                    this.results.performance.length +
                    this.results.accessibility.length,
                critical: this.countBySeverity('CRITICAL'),
                high: this.countBySeverity('HIGH'),
                medium: this.countBySeverity('MEDIUM'),
                low: this.countBySeverity('LOW')
            },
            screenshots: this.screenshots,
            videoPath: this.videoPath,
            visual_regression: this.results.visual,
            functional: this.results.functional,
            performance: this.results.performance,
            accessibility: this.results.accessibility
        };
        
        // Ensure output directory exists
        fs.mkdirSync(this.outputDir, { recursive: true });
        fs.mkdirSync(path.join(this.outputDir, 'reports'), { recursive: true });
        
        // Save JSON report
        const jsonPath = path.join(this.outputDir, 'reports', 'latest.json');
        fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
        
        // Generate markdown report
        const mdReport = this.generateMarkdownReport(report);
        const mdPath = path.join(this.outputDir, 'reports', 'latest.md');
        fs.writeFileSync(mdPath, mdReport);
        
        // Generate HTML report
        const htmlReport = this.generateHTMLReport(report);
        const htmlPath = path.join(this.outputDir, 'reports', 'latest.html');
        fs.writeFileSync(htmlPath, htmlReport);
        
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('  📊 KD-TESTSPRITE REPORT GENERATED');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`  📄 JSON: ${jsonPath}`);
        console.log(`  📝 Markdown: ${mdPath}`);
        console.log(`  🌐 HTML: ${htmlPath}`);
        console.log(`  📸 Screenshots: ${this.screenshots.length}`);
        console.log(`  📹 Video: ${this.videoPath || 'N/A'}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        return report;
    }
    
    countBySeverity(severity) {
        return Object.values(this.results).flat().filter(r => r.severity === severity).length;
    }
    
    generateMarkdownReport(report) {
        return `# 🧪 KD-TestSprite Report

**Session:** ${report.sessionId}  
**Generated:** ${report.timestamp}  
**Browser:** ${report.browser}

---

## 📊 Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | ${report.summary.critical} |
| 🟠 High | ${report.summary.high} |
| 🟡 Medium | ${report.summary.medium} |
| 🟢 Low | ${report.summary.low} |
| **Total** | **${report.summary.total_issues}** |

---

## 📸 Screenshots

${report.screenshots.map(s => `- **${s.label}**: \`${s.path}\``).join('\n')}

---

## 🎨 Visual Regression

${report.visual_regression.length === 0 ? '✅ No issues found' : 
report.visual_regression.map(i => `### ${i.type}\n- **Severity:** ${i.severity}\n- **Message:** ${i.message}\n`).join('\n')}

---

## 🔧 Functional Issues

${report.functional.length === 0 ? '✅ No issues found' : 
report.functional.map(i => `### ${i.type}\n- **Severity:** ${i.severity}\n- **Details:** ${i.message || i.error || i.count}\n`).join('\n')}

---

## ⚡ Performance Issues

${report.performance.length === 0 ? '✅ No issues found' : 
report.performance.map(i => `### ${i.type}\n- **Severity:** ${i.severity}\n- **Value:** ${i.loadTime || i.fcp || i.bundleSize}\n`).join('\n')}

---

## ♿ Accessibility Issues

${report.accessibility.length === 0 ? '✅ No issues found' : 
report.accessibility.map(i => `### ${i.type}\n- **Severity:** ${i.severity}\n- **WCAG:** ${i.wcag}\n`).join('\n')}

---

*KD finishes what it starts. | KRACKEDDEVS*
`;
    }
    
    generateHTMLReport(report) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KD TestSprite Report</title>
    <style>
        :root {
            --bg: #0d1117; --surface: #161b22; --text: #c9d1d9;
            --pass: #00c853; --fail: #f44336; --warn: #ff9800;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, sans-serif; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { background: linear-gradient(135deg, #58a6ff, #bc8cff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .stat { background: var(--surface); padding: 1.5rem; border-radius: 12px; text-align: center; }
        .stat .value { font-size: 2rem; font-weight: bold; }
        .stat.critical .value { color: var(--fail); }
        .stat.high .value { color: var(--warn); }
        .stat.medium .value { color: #ffc107; }
        .stat.low .value { color: var(--pass); }
        .section { background: var(--surface); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        .section h2 { margin-bottom: 1rem; border-bottom: 1px solid #30363d; padding-bottom: 0.5rem; }
        .issue { background: #21262d; padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; border-left: 4px solid var(--warn); }
        .issue.critical { border-color: var(--fail); }
        .issue.high { border-color: var(--warn); }
        .issue.medium { border-color: #ffc107; }
        .issue.low { border-color: var(--pass); }
        .screenshots { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
        .screenshot { background: #21262d; padding: 0.5rem; border-radius: 8px; text-align: center; }
        footer { text-align: center; margin-top: 2rem; color: #8b949e; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 KD-TestSprite Report</h1>
        <p>Session: <code>${report.sessionId}</code> | Browser: ${report.browser}</p>
    </div>
    
    <div class="summary">
        <div class="stat critical">
            <div class="value">${report.summary.critical}</div>
            <div>Critical</div>
        </div>
        <div class="stat high">
            <div class="value">${report.summary.high}</div>
            <div>High</div>
        </div>
        <div class="stat medium">
            <div class="value">${report.summary.medium}</div>
            <div>Medium</div>
        </div>
        <div class="stat low">
            <div class="value">${report.summary.low}</div>
            <div>Low</div>
        </div>
    </div>
    
    ${report.screenshots.length > 0 ? `
    <div class="section">
        <h2>📸 Screenshots (${report.screenshots.length})</h2>
        <div class="screenshots">
            ${report.screenshots.map(s => `<div class="screenshot"><strong>${s.label}</strong></div>`).join('')}
        </div>
    </div>
    ` : ''}
    
    ${report.visual_regression.length > 0 ? `
    <div class="section">
        <h2>🎨 Visual Regression</h2>
        ${report.visual_regression.map(i => `<div class="issue ${i.severity.toLowerCase()}"><strong>${i.type}</strong>: ${i.message || ''}</div>`).join('')}
    </div>
    ` : ''}
    
    ${report.functional.length > 0 ? `
    <div class="section">
        <h2>🔧 Functional Issues</h2>
        ${report.functional.map(i => `<div class="issue ${i.severity.toLowerCase()}"><strong>${i.type}</strong>: ${i.message || i.error || ''}</div>`).join('')}
    </div>
    ` : ''}
    
    ${report.performance.length > 0 ? `
    <div class="section">
        <h2>⚡ Performance Issues</h2>
        ${report.performance.map(i => `<div class="issue ${i.severity.toLowerCase()}"><strong>${i.type}</strong>: ${i.loadTime || i.fcp || i.bundleSize}</div>`).join('')}
    </div>
    ` : ''}
    
    ${report.accessibility.length > 0 ? `
    <div class="section">
        <h2>♿ Accessibility Issues</h2>
        ${report.accessibility.map(i => `<div class="issue ${i.severity.toLowerCase()}"><strong>${i.type}</strong> (${i.wcag})</div>`).join('')}
    </div>
    ` : ''}
    
    <footer>
        <p>KD finishes what it starts. | KRACKEDDEVS</p>
    </footer>
</body>
</html>`;
    }
}

module.exports = TestSprite;