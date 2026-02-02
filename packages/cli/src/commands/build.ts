import { execSync } from 'node:child_process'
import path from 'node:path'
import chalk from 'chalk'
import { rebuildWebsite } from './rebuild-website'

function getMonorepoRoot(): string {
  const cliDir = path.resolve(__dirname, '../../..')
  return path.resolve(cliDir, '..')
}

export async function build(): Promise<void> {
  const root = getMonorepoRoot()

  console.log(chalk.blue('\n🔧 Building for production...\n'))

  // Step 1: Rebuild website
  console.log(chalk.cyan('  [1/2] Rebuilding website...'))
  await rebuildWebsite()

  // Step 2: Build API
  console.log(chalk.cyan('  [2/2] Building API...'))
  try {
    execSync('npm run build', {
      cwd: path.join(root, 'packages', 'api'),
      stdio: 'inherit',
    })
    console.log(chalk.green('  ✔ API built successfully\n'))
  } catch {
    console.log(chalk.red('  ❌ API build failed\n'))
    process.exit(1)
  }

  console.log(chalk.blue('✅ Production build complete!\n'))
  console.log(chalk.gray('  Run `npm start` to start the server.\n'))
}
