// src/exporters/export-jira.js
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '.kracked/KD_output/jira-import';
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Convert stories to Jira CSV format
function exportStories() {
    const storiesDir = '.kracked/KD_output/epics-and-stories';
    if (!fs.existsSync(storiesDir)) return;

    const csvRows = ['Summary,Description,Issue Type,Priority'];

    // Recursively find story files
    // (Simplified for this example)
    
    // Example row
    // csvRows.push(`"User login","As a user...",Story,High`);

    const csvContent = csvRows.join('\n');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'jira-stories.csv'), csvContent);
    console.log(`Exported Jira CSV to ${OUTPUT_DIR}/jira-stories.csv`);
}

exportStories();
