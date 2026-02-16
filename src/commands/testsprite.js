#!/usr/bin/env node

const TestSprite = require('../testsprite/testsprite-core');
const fs = require('fs');

async function runTestSprite(url, config) {
    const testsprite = new TestSprite({
        headless: config.headless !== false,
        visualThreshold: config.visualThreshold || 100  // pixels
    });
    
    const report = await testsprite.runFullSuite(url);
    
    // Auto-generate fix stories from critical/high issues
    const criticalIssues = Object.values(report)
        .slice(2)
        .flat()
        .filter(issue => issue.severity === 'CRITICAL' || issue.severity === 'HIGH');
    
    if (criticalIssues.length > 0) {
        console.log('\n⚠️  Auto-generating fix stories...');
        
        for (const issue of criticalIssues) {
            const story = {
                title: `Fix: ${issue.type}`,
                description: issue.suggestion,
                severity: issue.severity,
                type: 'bug',
                estimation: estimateEffort(issue.type)
            };
            
            // Save to backlog
            const storyPath = `.kracked/KD_output/backlog/fix-${Date.now()}.json`;
            fs.writeFileSync(storyPath, JSON.stringify(story, null, 2));
            
            console.log(`  ✅ Created: ${story.title}`);
        }
    }
    
    return report;
}

function estimateEffort(issueType) {
    const efforts = {
        'VISUAL_REGRESSION': '2 hours',
        'SLOW_PAGE_LOAD': '4 hours',
        'LARGE_BUNDLE': '3 hours',
        'MISSING_ALT_TEXT': '1 hour',
        'COLOR_CONTRAST': '2 hours',
        'FORM_VALIDATION': '3 hours',
        'BROKEN_LINK': '1 hour',
        'JAVASCRIPT_ERROR': '4 hours'
    };
    
    return efforts[issueType] || '2 hours';
}

// CLI
const args = process.argv.slice(2);
const url = args.find(arg => arg.startsWith('--url='))?.split('=')[1];
const headless = !args.includes('--no-headless');

if (!url) {
    console.error('Usage: /KD-testsprite --url=http://localhost:3000');
    process.exit(1);
}

runTestSprite(url, { headless });
