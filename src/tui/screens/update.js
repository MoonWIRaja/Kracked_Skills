/**
 * Update Screen
 * KD TUI Application
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

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function downloadFile(url, dest) {
  try {
    const res = await axios.get(url, { timeout: 10000 });
    fs.writeFileSync(dest, res.data);
    return true;
  } catch { return false; }
}

export async function updateKD(options = {}) {
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log(chalk.white('  🔄 UPDATE KD'));
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log();

  const workDir = options.installDir || process.cwd();
  const kdPath = path.join(workDir, KD_DIR);
  
  if (!fs.existsSync(kdPath)) {
    console.log(chalk.red('  ❌ KD is not installed in this directory.'));
    console.log(chalk.gray(`  Directory: ${workDir}`));
    console.log(chalk.gray('  Run "kd install" to install KD first.'));
    process.exit(0);
    return;
  }

  const configPath = path.join(kdPath, 'config/settings.json');
  let currentConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      currentConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (e) {
      // Ignore parse errors
    }
  }

  console.log(chalk.white('  Current Version:'), chalk.cyan(currentConfig.version || 'Unknown'));
  console.log(chalk.white('  Latest Version: '), chalk.green(VERSION));
  console.log();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (currentConfig.version === VERSION && !options.force) {
    console.log(chalk.yellow('  You are already on the latest version.'));
    
    if (!options.nonInteractive) {
      const proceed = await ask(rl, chalk.white('  Reinstall anyway? [y/N]: '));
      if (proceed.toLowerCase() !== 'y') {
        console.log(chalk.gray('\n  Update cancelled.'));
        rl.close();
        process.exit(0);
        return;
      }
    } else {
      rl.close();
      process.exit(0);
      return;
    }
  }

  if (!options.nonInteractive && !options.force) {
    const proceed = await ask(rl, chalk.white('  Proceed with update? [Y/n]: '));
    if (proceed.toLowerCase() === 'n') {
      console.log(chalk.yellow('\n  Update cancelled.'));
      rl.close();
      process.exit(0);
      return;
    }
  }

  rl.close();

  console.log();
  const spinner = ora('Updating KD...').start();

  try {
    // Download all files (same as install)
    spinner.text = 'Downloading latest files...';
    await downloadAllFiles(workDir);

    spinner.text = 'Updating configuration...';
    currentConfig.version = VERSION;
    currentConfig.updated_date = new Date().toISOString();
    fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));

    spinner.succeed('Update complete!');
    
    console.log();
    console.log(chalk.green('  ✅ KD updated to v' + VERSION));
    console.log(chalk.cyan('  KD finishes what it starts.'));
    console.log();
    
    setTimeout(() => process.exit(0), 100);

  } catch (error) {
    spinner.fail('Update failed!');
    console.error(chalk.red(`  Error: ${error.message}`));
    process.exit(1);
  }
}

async function downloadAllFiles(workDir) {
  const base = `${KD_RAW_URL}/src`;
  
  const files = [
    // Prompts
    { url: `${base}/prompts/system-prompt.md`, dest: `${KD_DIR}/prompts/system-prompt.md` },
    { url: `${base}/prompts/role-switcher.md`, dest: `${KD_DIR}/prompts/role-switcher.md` },
    { url: `${base}/prompts/handoff-protocol.md`, dest: `${KD_DIR}/prompts/handoff-protocol.md` },
    { url: `${base}/prompts/conflict-resolution.md`, dest: `${KD_DIR}/prompts/conflict-resolution.md` },
    
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
    { url: `${base}/templates/tech-stack.md`, dest: `${KD_DIR}/templates/tech-stack.md` },
    { url: `${base}/templates/phase-gate-report.md`, dest: `${KD_DIR}/templates/phase-gate-report.md` },
    
    // Core
    { url: `${base}/core/core.md`, dest: `${KD_DIR}/core/core.md` },
    { url: `${base}/core/indexes/skills-index.md`, dest: `${KD_DIR}/core/indexes/skills-index.md` },
    { url: `${base}/core/indexes/commands-index.md`, dest: `${KD_DIR}/core/indexes/commands-index.md` },
    { url: `${base}/core/indexes/tools-index.md`, dest: `${KD_DIR}/core/indexes/tools-index.md` },
    { url: `${base}/core/indexes/roles-index.md`, dest: `${KD_DIR}/core/indexes/roles-index.md` },
    { url: `${base}/core/indexes/stages-index.md`, dest: `${KD_DIR}/core/indexes/stages-index.md` },
    { url: `${base}/core/indexes/workflows-index.md`, dest: `${KD_DIR}/core/indexes/workflows-index.md` },
    
    // v5.0.0 - Agents YAML
    { url: `${base}/agents/analyst.agent.yaml`, dest: `${KD_DIR}/agents/analyst.agent.yaml` },
    { url: `${base}/agents/pm.agent.yaml`, dest: `${KD_DIR}/agents/pm.agent.yaml` },
    { url: `${base}/agents/architect.agent.yaml`, dest: `${KD_DIR}/agents/architect.agent.yaml` },
    { url: `${base}/agents/tech-lead.agent.yaml`, dest: `${KD_DIR}/agents/tech-lead.agent.yaml` },
    { url: `${base}/agents/engineer.agent.yaml`, dest: `${KD_DIR}/agents/engineer.agent.yaml` },
    { url: `${base}/agents/qa.agent.yaml`, dest: `${KD_DIR}/agents/qa.agent.yaml` },
    { url: `${base}/agents/scrum-master.agent.yaml`, dest: `${KD_DIR}/agents/scrum-master.agent.yaml` },
    { url: `${base}/agents/security.agent.yaml`, dest: `${KD_DIR}/agents/security.agent.yaml` },
    { url: `${base}/agents/devops.agent.yaml`, dest: `${KD_DIR}/agents/devops.agent.yaml` },
    { url: `${base}/agents/release-manager.agent.yaml`, dest: `${KD_DIR}/agents/release-manager.agent.yaml` },
    { url: `${base}/agents/ux-designer.agent.yaml`, dest: `${KD_DIR}/agents/ux-designer.agent.yaml` },
    { url: `${base}/agents/data-scientist.agent.yaml`, dest: `${KD_DIR}/agents/data-scientist.agent.yaml` },
    { url: `${base}/agents/mobile-developer.agent.yaml`, dest: `${KD_DIR}/agents/mobile-developer.agent.yaml` },
    { url: `${base}/agents/database-admin.agent.yaml`, dest: `${KD_DIR}/agents/database-admin.agent.yaml` },
    { url: `${base}/agents/solo-dev.agent.yaml`, dest: `${KD_DIR}/agents/solo-dev.agent.yaml` },
    
    // v5.0.0 - Gates
    { url: `${base}/gates/discovery-exit.md`, dest: `${KD_DIR}/gates/discovery-exit.md` },
    { url: `${base}/gates/requirements-exit.md`, dest: `${KD_DIR}/gates/requirements-exit.md` },
    { url: `${base}/gates/architecture-exit.md`, dest: `${KD_DIR}/gates/architecture-exit.md` },
    { url: `${base}/gates/implementation-exit.md`, dest: `${KD_DIR}/gates/implementation-exit.md` },
    { url: `${base}/gates/quality-exit.md`, dest: `${KD_DIR}/gates/quality-exit.md` },
    { url: `${base}/gates/deployment-exit.md`, dest: `${KD_DIR}/gates/deployment-exit.md` },
    { url: `${base}/gates/release-exit.md`, dest: `${KD_DIR}/gates/release-exit.md` },
    
    // v5.0.0 - Knowledge
    { url: `${base}/knowledge/kd-index.md`, dest: `${KD_DIR}/knowledge/kd-index.md` },
    { url: `${base}/knowledge/patterns/auth-patterns.md`, dest: `${KD_DIR}/knowledge/patterns/auth-patterns.md` },
    { url: `${base}/knowledge/patterns/api-patterns.md`, dest: `${KD_DIR}/knowledge/patterns/api-patterns.md` },
    { url: `${base}/knowledge/patterns/database-patterns.md`, dest: `${KD_DIR}/knowledge/patterns/database-patterns.md` },
    { url: `${base}/knowledge/patterns/security-patterns.md`, dest: `${KD_DIR}/knowledge/patterns/security-patterns.md` },
    { url: `${base}/knowledge/standards/code-style.md`, dest: `${KD_DIR}/knowledge/standards/code-style.md` },
    { url: `${base}/knowledge/standards/naming-conventions.md`, dest: `${KD_DIR}/knowledge/standards/naming-conventions.md` },
    { url: `${base}/knowledge/standards/documentation-standards.md`, dest: `${KD_DIR}/knowledge/standards/documentation-standards.md` },
    
    // v5.0.0 - Config
    { url: `${base}/config/scale-taxonomy.yaml`, dest: `${KD_DIR}/config/scale-taxonomy.yaml` },
    { url: `${base}/config/agents/names.json`, dest: `${KD_DIR}/config/agents/names.json` },
  ];

  for (const f of files) {
    await downloadFile(f.url, path.join(workDir, f.dest));
  }
}