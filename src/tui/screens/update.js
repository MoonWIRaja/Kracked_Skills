/**
 * Update Screen
 * KD TUI Application
 */

import * as readline from 'readline';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

const VERSION = '5.0.0';
const KD_DIR = '.kracked';

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

export async function updateKD(options = {}) {
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log(chalk.white('  🔄 UPDATE KD'));
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log();

  // Use installDir if provided, otherwise use current directory
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

  // Create readline interface
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
    spinner.text = 'Updating configuration...';
    currentConfig.version = VERSION;
    currentConfig.updated_date = new Date().toISOString();
    fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));

    spinner.succeed('Update complete!');
    
    console.log();
    console.log(chalk.green('  ✅ KD updated to v' + VERSION));
    console.log(chalk.cyan('  KD finishes what it starts.'));
    console.log();
    
    process.exit(0);

  } catch (error) {
    spinner.fail('Update failed!');
    console.error(chalk.red(`  Error: ${error.message}`));
    process.exit(1);
  }
}