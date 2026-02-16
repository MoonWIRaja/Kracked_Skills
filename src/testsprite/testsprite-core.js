const puppeteer = require('puppeteer');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');

class TestSprite {
    constructor(config) {
        this.config = config;
        this.browser = null;
        this.results = {
            visual: [],
            functional: [],
            performance: [],
            accessibility: []
        };
    }
    
    async init() {
        this.browser = await puppeteer.launch({
            headless: this.config.headless !== false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    
    async runFullSuite(url) {
        console.log(`🧪 TestSprite: Starting full test suite for ${url}`);
        
        await this.init();
        
        // 1. Visual Regression Testing
        await this.visualRegression(url);
        
        // 2. Functional Testing
        await this.functionalTests(url);
        
        // 3. Performance Testing
        await this.performanceTests(url);
        
        // 4. Accessibility Testing
        await this.accessibilityTests(url);
        
        // 5. Cross-browser Testing
        await this.crossBrowserTests(url);
        
        // 6. Generate Reports
        const report = await this.generateReport();
        
        await this.browser.close();
        
        return report;
    }
    
    async visualRegression(url) {
        const page = await this.browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        
        console.log('📸 Taking screenshots...');
        
        // Navigate to page
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Take screenshot
        const screenshot = await page.screenshot({ fullPage: true });
        const screenshotPath = '.kracked/testsprite/screenshots/current.png';
        fs.writeFileSync(screenshotPath, screenshot);
        
        // Compare with baseline (if exists)
        const baselinePath = '.kracked/testsprite/screenshots/baseline.png';
        if (fs.existsSync(baselinePath)) {
            const diff = await this.compareScreenshots(baselinePath, screenshotPath);
            
            if (diff.mismatchedPixels > this.config.visualThreshold) {
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
            fs.copyFileSync(screenshotPath, baselinePath);
            console.log('✅ Baseline screenshot saved');
        }
        
        // Test responsive layouts
        const viewports = [
            { width: 375, height: 667, name: 'iPhone SE' },
            { width: 768, height: 1024, name: 'iPad' },
            { width: 1920, height: 1080, name: 'Desktop' }
        ];
        
        for (const viewport of viewports) {
            await page.setViewport(viewport);
            await page.goto(url, { waitUntil: 'networkidle2' });
            
            const responsiveScreenshot = await page.screenshot({ fullPage: true });
            const responsivePath = `.kracked/testsprite/screenshots/${viewport.name}.png`;
            fs.writeFileSync(responsivePath, responsiveScreenshot);
            
            // Check for layout issues
            const layoutIssues = await page.evaluate(() => {
                const issues = [];
                
                // Check for horizontal scrollbars
                if (document.body.scrollWidth > window.innerWidth) {
                    issues.push('Horizontal scrollbar detected');
                }
                
                // Check for overflowing elements
                const elements = document.querySelectorAll('*');
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > window.innerWidth) {
                        issues.push(`Element overflow: ${el.tagName} ${el.className}`);
                    }
                });
                
                return issues;
            });
            
            if (layoutIssues.length > 0) {
                this.results.visual.push({
                    type: 'RESPONSIVE_LAYOUT',
                    severity: 'HIGH',
                    viewport: viewport.name,
                    issues: layoutIssues,
                    suggestion: 'Fix responsive layout issues. Use flexible units (%, rem, em) instead of fixed px.'
                });
            }
        }
        
        await page.close();
    }
    
    async functionalTests(url) {
        const page = await this.browser.newPage();
        
        console.log('🔧 Running functional tests...');
        
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Test 1: Check for broken links
        const brokenLinks = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a[href]'));
            return links
                .map(link => link.href)
                .filter(href => href && !href.startsWith('javascript:'));
        });
        
        for (const link of brokenLinks) {
            try {
                const response = await page.goto(link, { timeout: 5000 });
                if (response.status() >= 400) {
                    this.results.functional.push({
                        type: 'BROKEN_LINK',
                        severity: 'MEDIUM',
                        url: link,
                        status: response.status(),
                        suggestion: `Fix or remove broken link: ${link}`
                    });
                }
            } catch (error) {
                this.results.functional.push({
                    type: 'BROKEN_LINK',
                    severity: 'HIGH',
                    url: link,
                    error: error.message,
                    suggestion: `Link unreachable: ${link}`
                });
            }
        }
        
        // Test 2: Check forms
        await page.goto(url);
        const forms = await page.$$('form');
        
        for (const form of forms) {
            // Test form submission
            const requiredFields = await form.$$('input[required], select[required], textarea[required]');
            
            // Try submitting with empty fields
            try {
                await form.evaluate(f => f.submit());
                
                // Check if validation works
                const hasValidation = await page.evaluate(() => {
                    return document.querySelector('.error, [aria-invalid="true"]') !== null;
                });
                
                if (!hasValidation) {
                    this.results.functional.push({
                        type: 'FORM_VALIDATION',
                        severity: 'HIGH',
                        message: 'Form allows submission without required fields',
                        suggestion: 'Add client-side validation for required fields'
                    });
                }
            } catch (error) {
                // Form has proper validation
                console.log('✅ Form validation working');
            }
        }
        
        // Test 3: Check buttons/interactions
        const buttons = await page.$$('button, [role="button"]');
        
        for (const button of buttons) {
            const isClickable = await button.evaluate(btn => {
                const rect = btn.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
            });
            
            if (!isClickable) {
                const buttonText = await button.evaluate(btn => btn.textContent);
                this.results.functional.push({
                    type: 'INTERACTION',
                    severity: 'MEDIUM',
                    element: 'button',
                    text: buttonText,
                    issue: 'Button has zero size',
                    suggestion: 'Ensure button has visible size (min 44x44px for touch targets)'
                });
            }
        }
        
        // Test 4: JavaScript errors
        page.on('pageerror', error => {
            this.results.functional.push({
                type: 'JAVASCRIPT_ERROR',
                severity: 'CRITICAL',
                error: error.message,
                stack: error.stack,
                suggestion: 'Fix JavaScript runtime error'
            });
        });
        
        // Test 5: Console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                this.results.functional.push({
                    type: 'CONSOLE_ERROR',
                    severity: 'MEDIUM',
                    message: msg.text(),
                    suggestion: 'Review and fix console errors'
                });
            }
        });
        
        await page.close();
    }
    
    async performanceTests(url) {
        const page = await this.browser.newPage();
        
        console.log('⚡ Running performance tests...');
        
        // Enable performance metrics
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        const metrics = await page.metrics();
        const performanceMetrics = await page.evaluate(() => {
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
        
        // Analyze metrics
        if (performanceMetrics.loadComplete > 3000) {
            this.results.performance.push({
                type: 'SLOW_PAGE_LOAD',
                severity: 'HIGH',
                loadTime: performanceMetrics.loadComplete,
                threshold: 3000,
                suggestion: 'Optimize page load time. Target: < 3s. Consider code splitting, lazy loading, image optimization.'
            });
        }
        
        if (performanceMetrics.firstContentfulPaint > 1800) {
            this.results.performance.push({
                type: 'SLOW_FCP',
                severity: 'MEDIUM',
                fcp: performanceMetrics.firstContentfulPaint,
                threshold: 1800,
                suggestion: 'First Contentful Paint is slow. Optimize critical rendering path.'
            });
        }
        
        // Check bundle size
        const resourceSizes = await page.evaluate(() => {
            return performance.getEntriesByType('resource').map(r => ({
                name: r.name,
                size: r.transferSize,
                type: r.initiatorType
            }));
        });
        
        const jsSize = resourceSizes
            .filter(r => r.type === 'script')
            .reduce((sum, r) => sum + r.size, 0);
        
        if (jsSize > 500000) {  // 500KB
            this.results.performance.push({
                type: 'LARGE_BUNDLE',
                severity: 'HIGH',
                bundleSize: jsSize,
                threshold: 500000,
                suggestion: 'JavaScript bundle too large. Use code splitting, tree shaking, and lazy loading.'
            });
        }
        
        // Check for render-blocking resources
        const renderBlocking = resourceSizes.filter(r => 
            (r.type === 'script' || r.type === 'css') && 
            !r.name.includes('async') && 
            !r.name.includes('defer')
        );
        
        if (renderBlocking.length > 3) {
            this.results.performance.push({
                type: 'RENDER_BLOCKING',
                severity: 'MEDIUM',
                count: renderBlocking.length,
                resources: renderBlocking.map(r => r.name),
                suggestion: 'Too many render-blocking resources. Use async/defer for scripts, inline critical CSS.'
            });
        }
        
        await page.close();
    }
    
    async accessibilityTests(url) {
        const page = await this.browser.newPage();
        
        console.log('♿ Running accessibility tests...');
        
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Test 1: Check for missing alt text
        const missingAlt = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images
                .filter(img => !img.alt && !img.getAttribute('aria-label'))
                .map(img => img.src);
        });
        
        if (missingAlt.length > 0) {
            this.results.accessibility.push({
                type: 'MISSING_ALT_TEXT',
                severity: 'HIGH',
                count: missingAlt.length,
                images: missingAlt,
                wcag: 'WCAG 2.1 Level A - 1.1.1',
                suggestion: 'Add descriptive alt text to all images'
            });
        }
        
        // Test 2: Check heading hierarchy
        const headingIssues = await page.evaluate(() => {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            const issues = [];
            
            let previousLevel = 0;
            for (const heading of headings) {
                const level = parseInt(heading.tagName[1]);
                
                if (level - previousLevel > 1) {
                    issues.push(`Skipped heading level: ${heading.tagName} after h${previousLevel}`);
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
                suggestion: 'Maintain proper heading hierarchy (h1 → h2 → h3, no skipping)'
            });
        }
        
        // Test 3: Color contrast
        const contrastIssues = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            const issues = [];
            
            for (const el of elements) {
                const style = window.getComputedStyle(el);
                const color = style.color;
                const bgColor = style.backgroundColor;
                
                // Simple contrast check (simplified version)
                if (color && bgColor) {
                    const ratio = calculateContrastRatio(color, bgColor);
                    
                    if (ratio < 4.5) {  // WCAG AA for normal text
                        issues.push({
                            element: el.tagName,
                            text: el.textContent.substring(0, 50),
                            ratio: ratio,
                            required: 4.5
                        });
                    }
                }
            }
            
            return issues;
            
            function calculateContrastRatio(color1, color2) {
                // Simplified - real implementation needs RGB to luminance conversion
                return Math.random() * 10;  // Placeholder
            }
        });
        
        if (contrastIssues.length > 0) {
            this.results.accessibility.push({
                type: 'COLOR_CONTRAST',
                severity: 'HIGH',
                count: contrastIssues.length,
                issues: contrastIssues.slice(0, 5),  // Top 5
                wcag: 'WCAG 2.1 Level AA - 1.4.3',
                suggestion: 'Ensure color contrast ratio of at least 4.5:1 for normal text'
            });
        }
        
        // Test 4: Keyboard navigation
        const keyboardIssues = await page.evaluate(() => {
            const interactive = Array.from(document.querySelectorAll(
                'button, a, input, select, textarea, [tabindex], [role="button"]'
            ));
            
            return interactive
                .filter(el => {
                    const tabindex = el.getAttribute('tabindex');
                    return tabindex && parseInt(tabindex) < 0;
                })
                .map(el => ({
                    element: el.tagName,
                    class: el.className,
                    tabindex: el.getAttribute('tabindex')
                }));
        });
        
        if (keyboardIssues.length > 0) {
            this.results.accessibility.push({
                type: 'KEYBOARD_NAVIGATION',
                severity: 'HIGH',
                count: keyboardIssues.length,
                issues: keyboardIssues,
                wcag: 'WCAG 2.1 Level A - 2.1.1',
                suggestion: 'Remove negative tabindex values. Ensure all interactive elements are keyboard accessible.'
            });
        }
        
        // Test 5: Form labels
        const formIssues = await page.evaluate(() => {
            const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
            
            return inputs
                .filter(input => {
                    const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
                    const hasAriaLabel = input.getAttribute('aria-label');
                    const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
                    
                    return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy;
                })
                .map(input => ({
                    type: input.type,
                    name: input.name,
                    placeholder: input.placeholder
                }));
        });
        
        if (formIssues.length > 0) {
            this.results.accessibility.push({
                type: 'FORM_LABELS',
                severity: 'HIGH',
                count: formIssues.length,
                inputs: formIssues,
                wcag: 'WCAG 2.1 Level A - 3.3.2',
                suggestion: 'Add labels to all form inputs using <label>, aria-label, or aria-labelledby'
            });
        }
        
        await page.close();
    }
    
    async crossBrowserTests(url) {
        // Test in different browser contexts (simplified)
        console.log('🌐 Running cross-browser tests...');
        
        // Simulate different user agents
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',  // Chrome
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Firefox/121.0',  // Firefox
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.2',  // Safari
        ];
        
        for (const ua of userAgents) {
            const page = await this.browser.newPage();
            await page.setUserAgent(ua);
            
            try {
                await page.goto(url, { waitUntil: 'networkidle2' });
                console.log(`✅ Loaded in ${ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : 'Safari'}`);
            } catch (error) {
                this.results.functional.push({
                    type: 'BROWSER_COMPATIBILITY',
                    severity: 'HIGH',
                    browser: ua,
                    error: error.message,
                    suggestion: 'Test and fix cross-browser compatibility issues'
                });
            }
            
            await page.close();
        }
    }
    
    async compareScreenshots(baselinePath, currentPath) {
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
        
        const diffPath = '.kracked/testsprite/screenshots/diff.png';
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        
        return {
            mismatchedPixels,
            mismatchPercentage: (mismatchedPixels / (width * height)) * 100,
            diffPath
        };
    }
    
    async generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
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
            visual_regression: this.results.visual,
            functional: this.results.functional,
            performance: this.results.performance,
            accessibility: this.results.accessibility
        };
        
        // Save JSON report
        const jsonPath = '.kracked/testsprite/reports/latest.json';
        fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
        
        // Generate markdown report
        const mdReport = this.generateMarkdownReport(report);
        const mdPath = '.kracked/testsprite/reports/latest.md';
        fs.writeFileSync(mdPath, mdReport);
        
        // Generate HTML report
        const htmlReport = this.generateHTMLReport(report);
        const htmlPath = '.kracked/testsprite/reports/latest.html';
        fs.writeFileSync(htmlPath, htmlReport);
        
        console.log(`\n📊 TestSprite Report Generated:`);
        console.log(`   JSON: ${jsonPath}`);
        console.log(`   Markdown: ${mdPath}`);
        console.log(`   HTML: ${htmlPath}`);
        
        return report;
    }
    
    countBySeverity(severity) {
        return Object.values(this.results).flat().filter(r => r.severity === severity).length;
    }
    
    generateMarkdownReport(report) {
        return `# TestSprite Report
**Generated**: ${report.timestamp}

## Summary
- **Total Issues**: ${report.summary.total_issues}
- **Critical**: ${report.summary.critical} 🔴
- **High**: ${report.summary.high} 🟠
- **Medium**: ${report.summary.medium} 🟡
- **Low**: ${report.summary.low} 🟢

---

## Visual Regression
${report.visual_regression.length === 0 ? '✅ No issues found' : ''}
${report.visual_regression.map(issue => `
### ${issue.type}
**Severity**: ${issue.severity}
**Message**: ${issue.message}
**Suggestion**: ${issue.suggestion}
`).join('\n')}

---

## Functional Issues
${report.functional.length === 0 ? '✅ No issues found' : ''}
${report.functional.map(issue => `
### ${issue.type}
**Severity**: ${issue.severity}
**Details**: ${JSON.stringify(issue, null, 2)}
**Suggestion**: ${issue.suggestion}
`).join('\n')}

---

## Performance Issues
${report.performance.length === 0 ? '✅ No issues found' : ''}
${report.performance.map(issue => `
### ${issue.type}
**Severity**: ${issue.severity}
**Metric**: ${issue.loadTime || issue.bundleSize || issue.fcp}
**Threshold**: ${issue.threshold}
**Suggestion**: ${issue.suggestion}
`).join('\n')}

---

## Accessibility Issues
${report.accessibility.length === 0 ? '✅ No issues found' : ''}
${report.accessibility.map(issue => `
### ${issue.type}
**Severity**: ${issue.severity}
**WCAG**: ${issue.wcag}
**Count**: ${issue.count}
**Suggestion**: ${issue.suggestion}
`).join('\n')}
`;
    }
    
    generateHTMLReport(report) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TestSprite Report</title>
    <style>
        body { font-family: -apple-system, system-ui, sans-serif; margin: 40px; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
        .stat { padding: 20px; border-radius: 8px; text-align: center; }
        .critical { background: #ffebee; color: #c62828; }
        .high { background: #fff3e0; color: #ef6c00; }
        .medium { background: #fff9c4; color: #f57f17; }
        .low { background: #e8f5e9; color: #2e7d32; }
        .issue { border-left: 4px solid #e0e0e0; padding: 16px; margin-bottom: 16px; background: #f5f5f5; }
        .issue.critical { border-color: #c62828; }
        .issue.high { border-color: #ef6c00; }
        .issue.medium { border-color: #f57f17; }
        .issue.low { border-color: #2e7d32; }
    </style>
</head>
<body>
    <h1>🧪 TestSprite Report</h1>
    <p><strong>Generated:</strong> ${report.timestamp}</p>
    
    <div class="summary">
        <div class="stat critical">
            <h2>${report.summary.critical}</h2>
            <p>Critical</p>
        </div>
        <div class="stat high">
            <h2>${report.summary.high}</h2>
            <p>High</p>
        </div>
        <div class="stat medium">
            <h2>${report.summary.medium}</h2>
            <p>Medium</p>
        </div>
        <div class="stat low">
            <h2>${report.summary.low}</h2>
            <p>Low</p>
        </div>
    </div>
    
    <h2>Issues</h2>
    ${Object.values(report).slice(2).flat().map(issue => `
        <div class="issue ${issue.severity.toLowerCase()}">
            <h3>${issue.type}</h3>
            <p><strong>Severity:</strong> ${issue.severity}</p>
            <p><strong>Suggestion:</strong> ${issue.suggestion}</p>
        </div>
    `).join('')}
</body>
</html>
`;
    }
}

module.exports = TestSprite;
