/**
 * Uninstall Screen
 * KD TUI Application
 */

import * as readline from 'readline';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

const KD_DIR = '.kracked';

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

export async function uninstallKD(options = {}) {
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log(chalk.white('  🗑️  UNINSTALL KD'));
  console.log(chalk.cyan('  ───────────────────────────────────────────'));
  console.log();

  // Use installDir if provided, otherwise use current directory
  const workDir = options.installDir || process.cwd();
  const kdPath = path.join(workDir, KD_DIR);
  
  if (!fs.existsSync(kdPath)) {
    console.log(chalk.red('  ❌ KD is not installed in this directory.'));
    console.log(chalk.gray(`  Directory: ${workDir}`));
    process.exit(0);
    return;
  }

  // Show what will be deleted
  console.log(chalk.yellow('  ⚠️  WARNING'));
  console.log();
  console.log(chalk.white('  This will remove KD from this project:'));
  console.log(chalk.gray(`  Directory: ${kdPath}`));
  console.log();
  console.log(chalk.white('  The following will be deleted:'));
  console.log(chalk.gray('  ✓ All configuration files'));
  console.log(chalk.gray('  ✓ All workflow files'));
  console.log(chalk.gray('  ✓ Status tracking'));
  console.log(chalk.gray('  ✓ AI tool adapters'));
  console.log();
  console.log(chalk.cyan('  📋 Your project files will NOT be affected.'));
  console.log();

  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Confirm uninstall
  if (!options.force) {
    if (!options.nonInteractive) {
      const confirmText = await ask(rl, chalk.white('  Type "uninstall" to confirm: '));

      if (confirmText.toLowerCase() !== 'uninstall') {
        console.log(chalk.yellow('\n  Uninstall cancelled.'));
        rl.close();
        process.exit(0);
        return;
      }
    }
  }

  rl.close();

  // Uninstall
  console.log();
  const spinner = ora('Uninstalling KD...').start();

  try {
    // Remove .kracked directory
    spinner.text = 'Removing KD files...';
    fs.rmSync(kdPath, { recursive: true, force: true });

    // Remove adapter files
    spinner.text = 'Removing adapters...';
    const adapters = ['.claude', '.cursor', '.clinerules', '.kilocode', '.roo', '.agent'];
    for (const adapter of adapters) {
      const adapterPath = path.join(workDir, adapter);
      if (fs.existsSync(adapterPath)) {
        fs.rmSync(adapterPath, { recursive: true, force: true });
      }
    }

    spinner.succeed('Uninstall complete!');
    
    console.log();
    console.log(chalk.green('  ✅ KD has been uninstalled successfully.'));
    console.log(chalk.gray('  Your project files were not affected.'));
    console.log();
    console.log(chalk.cyan('  To reinstall, run: kd install'));
    console.log();
    
    process.exit(0);

  } catch (error) {
    spinner.fail('Uninstall failed!');
    console.error(chalk.red(`  Error: ${error.message}`));
    process.exit(1);
  }
}