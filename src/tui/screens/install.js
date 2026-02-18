/**
 * Install Screen
 * KD TUI Application - Full Installation
 * AI Skill by KRACKEDDEVS - https://krackeddevs.com/
 */

import * as readline from 'readline';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const VERSION = '5.0.0';
const KD_REPO = 'MoonWIRaja/Kracked_Skills';
const KD_RAW_URL = `https://raw.githubusercontent.com/${KD_REPO}/main`;
const KD_DIR = '.kracked';

// AI Tools available
const AI_TOOLS = [
  { key: '1', name: 'Claude Code', value: 'claude-code' },
  { key: '2', name: 'Cursor', value: 'cursor' },
  { key: '3', name: 'Cline', value: 'cline' },
  { key: '4', name: 'Kilo Code', value: 'kilocode' },
  { key: '5', name: 'Roo Code', value: 'roo-code' },
  { key: '6', name: 'Antigravity', value: 'antigravity' },
  { key: 'A', name: 'All', value: 'all' },
];

// Common languages
const LANGUAGES = [
  { key: '1', name: 'English (Default)', value: 'EN' },
  { key: '2', name: 'Bahasa Melayu', value: 'MS' },
  { key: 'C', name: 'Custom (type your own)', value: 'custom' },
];

// Full command list for adapters (synced with src/adapters/*/commands)
const COMMANDS = [
  'KD', 'KD-analyze', 'KD-api-design', 'KD-architecture', 'KD-brainstorm',
  'KD-build-agent', 'KD-build-module', 'KD-build-workflow', 'KD-code-review',
  'KD-deployment-plan', 'KD-dev-story', 'KD-doc-project', 'KD-domain-research',
  'KD-epics-and-stories', 'KD-fix-course', 'KD-game-arch', 'KD-game-architect',
  'KD-game-brainstorm', 'KD-game-brief', 'KD-game-designer', 'KD-game-dev',
  'KD-game-dev-story', 'KD-game-gdd', 'KD-game-narrative', 'KD-game-qa',
  'KD-game-scrum-master', 'KD-game-solo', 'KD-game-story', 'KD-game-test-auto',
  'KD-game-test-design', 'KD-game-test-perf', 'KD-game-test-plan', 'KD-game-writer',
  'KD-help', 'KD-idea-coach', 'KD-idea-design-thinking', 'KD-idea-innovation',
  'KD-idea-presenter', 'KD-idea-problem-solving', 'KD-idea-solver', 'KD-idea-storyteller',
  'KD-idea-storytelling', 'KD-idea-strategist', 'KD-kickoff', 'KD-market-research',
  'KD-party-mode', 'KD-prd', 'KD-product-brief', 'KD-project-context',
  'KD-qa-automate', 'KD-quick-dev', 'KD-quick-spec', 'KD-refactor',
  'KD-retrospective', 'KD-role-analyst', 'KD-role-architect', 'KD-role-bmad-master',
  'KD-role-data-scientist', 'KD-role-dba', 'KD-role-dev', 'KD-role-devops',
  'KD-role-mobile-dev', 'KD-role-pm', 'KD-role-qa', 'KD-role-release-manager',
  'KD-role-scrum-master', 'KD-role-security', 'KD-role-solo-dev', 'KD-role-tech-writer',
  'KD-role-ux', 'KD-scale-review', 'KD-sprint-planning', 'KD-sprint-status',
  'KD-status', 'KD-swarm', 'KD-tech-research', 'KD-test', 'KD-test-arch',
  'KD-test-atdd', 'KD-test-automate', 'KD-test-ci', 'KD-test-design',
  'KD-test-frame', 'KD-test-nfr', 'KD-test-sprite', 'KD-test-teach',
  'KD-test-trace', 'KD-tool-selector', 'KD-ux-design', 'KD-validate',
  'KD-validate-agent', 'KD-validate-workflow'
];

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

export async function installKD(options = {}) {
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log(chalk.white('  📦 INSTALL KD'));
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log();

  // Use installDir if provided, otherwise use current directory
  const workDir = options.installDir || process.cwd();
  
  // Check existing installation
  const kdPath = path.join(workDir, KD_DIR);
  if (fs.existsSync(kdPath)) {
    if (options.force) {
      console.log(chalk.yellow('  ⚠️  Existing installation found. Overwriting...'));
      fs.rmSync(kdPath, { recursive: true, force: true });
    } else {
      console.log(chalk.red('  ❌ KD is already installed in this directory.'));
      console.log(chalk.gray('  Use --force to overwrite.'));
      return;
    }
  }

  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // Step 1: Select AI Tools
    let selectedTools = [];
    if (options.target) {
      selectedTools = options.target.split(',').map(t => t.trim());
    } else if (!options.nonInteractive) {
      console.log(chalk.white('  Step 1 of 3: Select AI Tool(s)'));
      console.log();
      
      for (const tool of AI_TOOLS) {
        console.log(chalk.cyan(`  [${tool.key}]`) + ` ${tool.name}`);
      }
      console.log();
      console.log(chalk.gray('  Enter multiple numbers separated by commas (e.g., 1,3,4) or A for all'));
      console.log();

      const answer = await ask(rl, chalk.white('  Select AI tool(s): '));
      
      if (answer.toUpperCase() === 'A') {
        selectedTools = AI_TOOLS.filter(t => t.value !== 'all').map(t => t.value);
      } else {
        const keys = answer.split(',').map(k => k.trim().toUpperCase());
        for (const key of keys) {
          const tool = AI_TOOLS.find(t => t.key.toUpperCase() === key);
          if (tool && tool.value !== 'all') {
            selectedTools.push(tool.value);
          }
        }
      }

      if (selectedTools.length === 0) {
        console.log(chalk.yellow('  No tools selected. Using Claude Code as default.'));
        selectedTools = ['claude-code'];
      }
    } else {
      selectedTools = ['claude-code'];
    }

    // Step 2: Select Language
    let language = 'EN';
    if (options.lang) {
      language = options.lang.toUpperCase();
    } else if (!options.nonInteractive) {
      console.log();
      console.log(chalk.white('  Step 2 of 3: Select Language'));
      console.log();
      
      for (const lang of LANGUAGES) {
        console.log(chalk.cyan(`  [${lang.key}]`) + ` ${lang.name}`);
      }
      console.log();

      const answer = await ask(rl, chalk.white('  Select language: '));
      
      const lang = LANGUAGES.find(l => l.key.toUpperCase() === answer.toUpperCase());
      if (lang) {
        if (lang.value === 'custom') {
          language = await ask(rl, chalk.white('  Enter your language: '));
        } else {
          language = lang.value;
        }
      }
    }

    // Step 3: Confirm
    if (!options.nonInteractive) {
      console.log();
      console.log(chalk.white('  Step 3 of 3: Confirm Installation'));
      console.log();
      
      console.log(chalk.cyan('  ┌─────────────────────────────────────────┐'));
      console.log(chalk.cyan('  │') + chalk.white('       INSTALLATION SUMMARY              ') + chalk.cyan('│'));
      console.log(chalk.cyan('  ├─────────────────────────────────────────┤'));
      console.log(chalk.cyan('  │') + chalk.white(`  Version:      ${VERSION}              `) + chalk.cyan('│'));
      console.log(chalk.cyan('  │') + chalk.white(`  Directory:    ${workDir}/${KD_DIR}`) + chalk.cyan('│'));
      console.log(chalk.cyan('  │') + chalk.white(`  Target(s):    ${selectedTools.join(', ')}`) + chalk.cyan('│'));
      console.log(chalk.cyan('  │') + chalk.white(`  Language:     ${language}`) + chalk.cyan('│'));
      console.log(chalk.cyan('  └─────────────────────────────────────────┘'));
      console.log();

      const confirm = await ask(rl, chalk.white('  Proceed with installation? [Y/n]: '));
      
      if (confirm && confirm.toLowerCase() === 'n') {
        console.log(chalk.yellow('\n  Installation cancelled.'));
        rl.close();
        return;
      }
    }

    rl.close();

    // Installation
    console.log();
    const spinner = ora('Installing KD...').start();

    try {
      // Create directories
      spinner.text = 'Creating directory structure...';
      await createDirectories(workDir);
      
      // Download files
      spinner.text = 'Downloading KD files...';
      await downloadFiles(workDir);
      
      // Create config
      spinner.text = 'Creating configuration...';
      await createConfig(workDir, selectedTools, language);
      
      // Init status
      spinner.text = 'Initializing status...';
      await initStatus(workDir, language);

      // Setup adapters
      spinner.text = 'Setting up adapters...';
      for (const tool of selectedTools) {
        spinner.text = `Setting up ${tool}...`;
        await setupAdapter(workDir, tool);
      }

      spinner.succeed('Installation complete!');
      
      // Success message
      showSuccess(workDir, selectedTools, language);
      
      // Force exit - clear any pending timers/intervals
      setTimeout(() => process.exit(0), 100);

    } catch (error) {
      spinner.fail('Installation failed!');
      console.error(chalk.red(`  Error: ${error.message}`));
      process.exit(1);
    }

  } catch (error) {
    rl.close();
    throw error;
  }
}

async function createDirectories(workDir) {
  const dirs = [
    KD_DIR,
    `${KD_DIR}/prompts`,
    `${KD_DIR}/prompts/roles`,
    `${KD_DIR}/prompts/stages`,
    `${KD_DIR}/prompts/multi-agent`,
    `${KD_DIR}/templates`,
    `${KD_DIR}/checklists`,
    `${KD_DIR}/workflows`,
    `${KD_DIR}/config`,
    `${KD_DIR}/config/language`,
    `${KD_DIR}/config/agents`,
    `${KD_DIR}/testsprite`,
    `${KD_DIR}/tool-selector`,
    `${KD_DIR}/git-integration`,
    `${KD_DIR}/analytics`,
    `${KD_DIR}/exporters`,
    `${KD_DIR}/artifacts`,
    `${KD_DIR}/version-checker`,
    `${KD_DIR}/core`,
    `${KD_DIR}/core/indexes`,
    `${KD_DIR}/skills`,
    `${KD_DIR}/KD_output`,
    `${KD_DIR}/KD_output/status`,
    `${KD_DIR}/KD_output/brainstorm`,
    `${KD_DIR}/KD_output/product-brief`,
    `${KD_DIR}/KD_output/PRD`,
    `${KD_DIR}/KD_output/architecture`,
    `${KD_DIR}/KD_output/epics-and-stories`,
    `${KD_DIR}/KD_output/code-review`,
    `${KD_DIR}/KD_output/deployment`,
    `${KD_DIR}/KD_output/release`,
    `${KD_DIR}/KD_output/decisions`,
    `${KD_DIR}/KD_output/risks`,
  ];

  for (const dir of dirs) {
    const fullPath = path.join(workDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
}

async function downloadFile(url, dest) {
  try {
    const response = await axios.get(url, { timeout: 10000 });
    fs.writeFileSync(dest, response.data);
    return true;
  } catch (error) {
    return false;
  }
}

async function downloadFiles(workDir) {
  const base = `${KD_RAW_URL}/src`;
  
  // System prompts
  const files = [
    // Prompts
    { url: `${base}/prompts/system-prompt.md`, dest: `${KD_DIR}/prompts/system-prompt.md` },
    { url: `${base}/prompts/role-switcher.md`, dest: `${KD_DIR}/prompts/role-switcher.md` },
    { url: `${base}/prompts/handoff-protocol.md`, dest: `${KD_DIR}/prompts/handoff-protocol.md` },
    { url: `${base}/prompts/conflict-resolution.md`, dest: `${KD_DIR}/prompts/conflict-resolution.md` },
    
    // Roles
    { url: `${base}/prompts/roles/analyst.md`, dest: `${KD_DIR}/prompts/roles/analyst.md` },
    { url: `${base}/prompts/roles/architect.md`, dest: `${KD_DIR}/prompts/roles/architect.md` },
    { url: `${base}/prompts/roles/engineer.md`, dest: `${KD_DIR}/prompts/roles/engineer.md` },
    { url: `${base}/prompts/roles/product-manager.md`, dest: `${KD_DIR}/prompts/roles/product-manager.md` },
    { url: `${base}/prompts/roles/tech-lead.md`, dest: `${KD_DIR}/prompts/roles/tech-lead.md` },
    { url: `${base}/prompts/roles/qa.md`, dest: `${KD_DIR}/prompts/roles/qa.md` },
    { url: `${base}/prompts/roles/security.md`, dest: `${KD_DIR}/prompts/roles/security.md` },
    { url: `${base}/prompts/roles/devops.md`, dest: `${KD_DIR}/prompts/roles/devops.md` },
    { url: `${base}/prompts/roles/ux-designer.md`, dest: `${KD_DIR}/prompts/roles/ux-designer.md` },
    { url: `${base}/prompts/roles/data-scientist.md`, dest: `${KD_DIR}/prompts/roles/data-scientist.md` },
    { url: `${base}/prompts/roles/mobile-developer.md`, dest: `${KD_DIR}/prompts/roles/mobile-developer.md` },
    { url: `${base}/prompts/roles/database-admin.md`, dest: `${KD_DIR}/prompts/roles/database-admin.md` },
    { url: `${base}/prompts/roles/release-manager.md`, dest: `${KD_DIR}/prompts/roles/release-manager.md` },
    
    // Stages
    { url: `${base}/prompts/stages/discovery.md`, dest: `${KD_DIR}/prompts/stages/discovery.md` },
    { url: `${base}/prompts/stages/brainstorm.md`, dest: `${KD_DIR}/prompts/stages/brainstorm.md` },
    { url: `${base}/prompts/stages/requirements.md`, dest: `${KD_DIR}/prompts/stages/requirements.md` },
    { url: `${base}/prompts/stages/architecture.md`, dest: `${KD_DIR}/prompts/stages/architecture.md` },
    { url: `${base}/prompts/stages/implementation.md`, dest: `${KD_DIR}/prompts/stages/implementation.md` },
    { url: `${base}/prompts/stages/quality.md`, dest: `${KD_DIR}/prompts/stages/quality.md` },
    { url: `${base}/prompts/stages/deployment.md`, dest: `${KD_DIR}/prompts/stages/deployment.md` },
    { url: `${base}/prompts/stages/release.md`, dest: `${KD_DIR}/prompts/stages/release.md` },
    
    // Multi-agent
    { url: `${base}/prompts/multi-agent/party-mode.md`, dest: `${KD_DIR}/prompts/multi-agent/party-mode.md` },
    { url: `${base}/prompts/multi-agent/agent-swarm.md`, dest: `${KD_DIR}/prompts/multi-agent/agent-swarm.md` },
    { url: `${base}/prompts/multi-agent/confidence-scoring.md`, dest: `${KD_DIR}/prompts/multi-agent/confidence-scoring.md` },
    { url: `${base}/prompts/multi-agent/conflict-resolution.md`, dest: `${KD_DIR}/prompts/multi-agent/conflict-resolution.md` },
    { url: `${base}/prompts/multi-agent/aggregation.md`, dest: `${KD_DIR}/prompts/multi-agent/aggregation.md` },
    
    // Templates
    { url: `${base}/templates/status.md`, dest: `${KD_DIR}/templates/status.md` },
    { url: `${base}/templates/product-brief.md`, dest: `${KD_DIR}/templates/product-brief.md` },
    { url: `${base}/templates/prd.md`, dest: `${KD_DIR}/templates/prd.md` },
    { url: `${base}/templates/architecture.md`, dest: `${KD_DIR}/templates/architecture.md` },
    { url: `${base}/templates/story-card.md`, dest: `${KD_DIR}/templates/story-card.md` },
    { url: `${base}/templates/deployment-plan.md`, dest: `${KD_DIR}/templates/deployment-plan.md` },
    { url: `${base}/templates/release-notes.md`, dest: `${KD_DIR}/templates/release-notes.md` },
    { url: `${base}/templates/decision-log.md`, dest: `${KD_DIR}/templates/decision-log.md` },
    { url: `${base}/templates/risk-register.md`, dest: `${KD_DIR}/templates/risk-register.md` },
    
    // Checklists
    { url: `${base}/checklists/stage-completion.md`, dest: `${KD_DIR}/checklists/stage-completion.md` },
    { url: `${base}/checklists/decision-validation.md`, dest: `${KD_DIR}/checklists/decision-validation.md` },
    { url: `${base}/checklists/checkpoint-approval.md`, dest: `${KD_DIR}/checklists/checkpoint-approval.md` },
    { url: `${base}/checklists/security-audit.md`, dest: `${KD_DIR}/checklists/security-audit.md` },
    { url: `${base}/checklists/pre-deployment.md`, dest: `${KD_DIR}/checklists/pre-deployment.md` },
    { url: `${base}/checklists/code-quality.md`, dest: `${KD_DIR}/checklists/code-quality.md` },
    
    // Workflows
    { url: `${base}/workflows/main.md`, dest: `${KD_DIR}/workflows/main.md` },
    { url: `${base}/workflows/quick-start.md`, dest: `${KD_DIR}/workflows/quick-start.md` },
    { url: `${base}/workflows/full-product.md`, dest: `${KD_DIR}/workflows/full-product.md` },
    { url: `${base}/workflows/maintenance.md`, dest: `${KD_DIR}/workflows/maintenance.md` },
    
    // Config
    { url: `${base}/config/settings-schema.json`, dest: `${KD_DIR}/config/settings-schema.json` },
    { url: `${base}/config/defaults.json`, dest: `${KD_DIR}/config/defaults.json` },
    { url: `${base}/config/language/en.json`, dest: `${KD_DIR}/config/language/en.json` },
    { url: `${base}/config/language/ms.json`, dest: `${KD_DIR}/config/language/ms.json` },
    { url: `${base}/config/agents/personalities.json`, dest: `${KD_DIR}/config/agents/personalities.json` },
    
    // Core
    { url: `${base}/core/core.md`, dest: `${KD_DIR}/core/core.md` },
    { url: `${base}/core/indexes/skills-index.md`, dest: `${KD_DIR}/core/indexes/skills-index.md` },
    { url: `${base}/core/indexes/commands-index.md`, dest: `${KD_DIR}/core/indexes/commands-index.md` },
    { url: `${base}/core/indexes/tools-index.md`, dest: `${KD_DIR}/core/indexes/tools-index.md` },
    { url: `${base}/core/indexes/roles-index.md`, dest: `${KD_DIR}/core/indexes/roles-index.md` },
    { url: `${base}/core/indexes/stages-index.md`, dest: `${KD_DIR}/core/indexes/stages-index.md` },
    
    // Skills
    { url: `${base}/skills/SKILLS.md`, dest: `${KD_DIR}/skills/SKILLS.md` },
    { url: `${base}/skills/01-supabase-postgres.md`, dest: `${KD_DIR}/skills/01-supabase-postgres.md` },
    { url: `${base}/skills/02-insecure-defaults.md`, dest: `${KD_DIR}/skills/02-insecure-defaults.md` },
    { url: `${base}/skills/03-react-nextjs.md`, dest: `${KD_DIR}/skills/03-react-nextjs.md` },
    { url: `${base}/skills/04-premium-design-system.md`, dest: `${KD_DIR}/skills/04-premium-design-system.md` },
    { url: `${base}/skills/05-web-perf.md`, dest: `${KD_DIR}/skills/05-web-perf.md` },
    { url: `${base}/skills/06-code-review.md`, dest: `${KD_DIR}/skills/06-code-review.md` },
    { url: `${base}/skills/07-pwa-service-worker.md`, dest: `${KD_DIR}/skills/07-pwa-service-worker.md` },
    { url: `${base}/skills/08-testing-qa.md`, dest: `${KD_DIR}/skills/08-testing-qa.md` },
    { url: `${base}/skills/09-animations-components.md`, dest: `${KD_DIR}/skills/09-animations-components.md` },
    { url: `${base}/skills/10-recursive-decomposition.md`, dest: `${KD_DIR}/skills/10-recursive-decomposition.md` },
    { url: `${base}/skills/11-api-design.md`, dest: `${KD_DIR}/skills/11-api-design.md` },
    { url: `${base}/skills/12-devops-deployment.md`, dest: `${KD_DIR}/skills/12-devops-deployment.md` },
    { url: `${base}/skills/13-game-development.md`, dest: `${KD_DIR}/skills/13-game-development.md` },
    { url: `${base}/skills/14-mobile-development.md`, dest: `${KD_DIR}/skills/14-mobile-development.md` },
    { url: `${base}/skills/15-documentation.md`, dest: `${KD_DIR}/skills/15-documentation.md` },
    
    // TestSprite
    { url: `${base}/testsprite/testsprite-core.js`, dest: `${KD_DIR}/testsprite/testsprite-core.js` },
    
    // Tool Selector
    { url: `${base}/tool-selector/tool-selector.js`, dest: `${KD_DIR}/tool-selector/tool-selector.js` },
    { url: `${base}/tool-selector/knowledge-base.json`, dest: `${KD_DIR}/tool-selector/knowledge-base.json` },
    
    // Git Integration
    { url: `${base}/git-integration/auto-commit.sh`, dest: `${KD_DIR}/git-integration/auto-commit.sh` },
    { url: `${base}/git-integration/config.yaml`, dest: `${KD_DIR}/git-integration/config.yaml` },
    
    // Analytics
    { url: `${base}/analytics/agent-performance.json`, dest: `${KD_DIR}/analytics/agent-performance.json` },
    
    // Version Checker
    { url: `${base}/version-checker/version-checker.js`, dest: `${KD_DIR}/version-checker/version-checker.js` },
    { url: `${base}/version-checker/registry.json`, dest: `${KD_DIR}/version-checker/registry.json` },
    { url: `${base}/version-checker/compatibility-rules.json`, dest: `${KD_DIR}/version-checker/compatibility-rules.json` },
    
    // Exporters
    { url: `${base}/exporters/export-consolidated.sh`, dest: `${KD_DIR}/exporters/export-consolidated.sh` },
    { url: `${base}/exporters/export-jira.js`, dest: `${KD_DIR}/exporters/export-jira.js` },
    { url: `${base}/exporters/export-pdf.sh`, dest: `${KD_DIR}/exporters/export-pdf.sh` },
    
    // Artifacts
    { url: `${base}/artifacts/manifest.yaml`, dest: `${KD_DIR}/artifacts/manifest.yaml` },
  ];

  for (const file of files) {
    const destPath = path.join(workDir, file.dest);
    await downloadFile(file.url, destPath);
  }
}

async function createConfig(workDir, tools, language) {
  const projName = path.basename(workDir);
  const now = new Date().toISOString();

  const config = {
    version: VERSION,
    project_name: projName,
    language: language,
    target_tools: tools.join(','),
    scale: 'auto',
    installed_date: now,
    site: 'https://krackeddevs.com/',
    branding: 'KRACKEDDEVS',
    features: {
      multi_agent: true,
      status_tracking: true,
      decision_validation: true,
      checkpoints: true,
      web_research: true,
      agent_personalities: true
    }
  };

  const configPath = path.join(workDir, `${KD_DIR}/config/settings.json`);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

async function initStatus(workDir, language) {
  const projName = path.basename(workDir);
  const now = new Date().toISOString().split('T')[0];

  const statusContent = `# PROJECT STATUS

## Meta
- Project: ${projName}
- Domain: [to be defined]
- Language: ${language}
- Scale: [to be determined by AI during /KD-analyze]
- Deadline: [not defined]
- Created: ${now}
- Last Updated: ${now}

## Current State
- Stage: Ready to begin
- Active Role: None
- Active Story: none
- Multi-Agent Mode: none

## Completed Stages

| Stage | Status | Completed Date | Key Artifact |
|-------|--------|----------------|--------------|
| Discovery | pending | - | - |
| Brainstorm | pending | - | - |
| Requirements | pending | - | - |
| Architecture | pending | - | - |
| Implementation | pending | - | - |
| Quality | pending | - | - |
| Deployment | pending | - | - |
| Release | pending | - | - |

## Next Actions
1. Run /KD-analyze to begin discovery phase

## Change Log

| Timestamp | Stage | Change | Role | Reason |
|-----------|-------|--------|------|--------|
| ${now} | Init | KD installed v${VERSION} | System | Initial installation |
`;

  const statusPath = path.join(workDir, `${KD_DIR}/KD_output/status/status.md`);
  fs.writeFileSync(statusPath, statusContent);
}

async function setupAdapter(workDir, tool) {
  const adapterConfigs = {
    'claude-code': { 
      dir: '.claude', 
      file: 'CLAUDE.md',
      cmdDir: '.claude/commands',
      cmdSource: 'commands'
    },
    'cursor': { 
      dir: '.cursor', 
      file: '.cursorrules',
      cmdDir: '.cursor/commands',
      cmdSource: 'commands'
    },
    'cline': { 
      dir: '.clinerules', 
      file: '.clinerules',
      cmdDir: '.clinerules/workflows',
      cmdSource: 'workflows'
    },
    'kilocode': { 
      dir: '.kilocode', 
      file: '.kilocode',
      cmdDir: '.kilocode/workflows',
      cmdSource: 'workflows'
    },
    'roo-code': { 
      dir: '.roo', 
      file: '.roo',
      cmdDir: '.roo/commands',
      cmdSource: 'commands'
    },
    'antigravity': { 
      dir: '.agent', 
      file: 'SKILL.md',
      cmdDir: '.agent/workflows',
      cmdSource: 'workflows'
    },
  };

  const config = adapterConfigs[tool];
  if (!config) return;

  // Create adapter directory
  const dirPath = path.join(workDir, config.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Download main adapter file
  let adapterUrl;
  if (tool === 'antigravity') {
    adapterUrl = `${KD_RAW_URL}/src/adapters/${tool}/SKILL.md`;
  } else if (tool === 'claude-code') {
    adapterUrl = `${KD_RAW_URL}/src/adapters/${tool}/CLAUDE.md`;
  } else {
    adapterUrl = `${KD_RAW_URL}/src/adapters/${tool}/${config.file}`;
  }

  const adapterDest = path.join(dirPath, config.file);
  const downloaded = await downloadFile(adapterUrl, adapterDest);
  
  if (!downloaded) {
    // Create fallback
    const fallbackContent = tool === 'antigravity' 
      ? `---
name: Kracked_Skills (KD)
description: Structured Multi-Role AI Product Execution System by KRACKEDDEVS
---
Read .kracked/prompts/system-prompt.md for full instructions.
Type /KD for command menu.
Status: .kracked/KD_output/status/status.md`
      : `# KD - AI Skill by KRACKEDDEVS
Read .kracked/prompts/system-prompt.md for full instructions.
Type /KD for command menu.
Status: .kracked/KD_output/status/status.md`;
    
    fs.writeFileSync(adapterDest, fallbackContent);
  }

  // Create commands directory
  const cmdDirPath = path.join(workDir, config.cmdDir);
  if (!fs.existsSync(cmdDirPath)) {
    fs.mkdirSync(cmdDirPath, { recursive: true });
  }

  // Download commands
  for (const cmd of COMMANDS) {
    const cmdUrl = `${KD_RAW_URL}/src/adapters/${tool}/${config.cmdSource}/${cmd}.md`;
    const cmdDest = path.join(cmdDirPath, `${cmd}.md`);
    await downloadFile(cmdUrl, cmdDest);
  }
}

function showSuccess(workDir, tools, language) {
  console.log();
  console.log(chalk.green('  ╔═══════════════════════════════════════════════════════════════╗'));
  console.log(chalk.green('  ║') + chalk.white('                                                               ') + chalk.green('║'));
  console.log(chalk.green('  ║') + chalk.bold.white('              ✅ INSTALLATION COMPLETE!                        ') + chalk.green('║'));
  console.log(chalk.green('  ║') + chalk.white('                                                               ') + chalk.green('║'));
  console.log(chalk.green('  ║') + chalk.white(`              KD v${VERSION} installed successfully!            `) + chalk.green('║'));
  console.log(chalk.green('  ║') + chalk.white('              AI Skill by KRACKEDDEVS                          ') + chalk.green('║'));
  console.log(chalk.green('  ║') + chalk.white('              https://krackeddevs.com/                         ') + chalk.green('║'));
  console.log(chalk.green('  ║') + chalk.white('                                                               ') + chalk.green('║'));
  console.log(chalk.green('  ╚═══════════════════════════════════════════════════════════════╝'));
  console.log();
  console.log(chalk.cyan('  📋 Installed:'));
  console.log(chalk.white(`     Adapters:  ${tools.join(', ')}`));
  console.log(chalk.white(`     Language:  ${language}`));
  console.log(chalk.white(`     Directory: ${workDir}/${KD_DIR}`));
  console.log();
  console.log(chalk.cyan('  📝 Next Steps:'));
  console.log(chalk.white('     1. Open your AI tool'));
  console.log(chalk.white('     2. Type /KD to see command menu'));
  console.log(chalk.white('     3. Run /KD-analyze to start your project'));
  console.log();
  console.log(chalk.cyan('  KD finishes what it starts.'));
  console.log();
}