import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'

function getPackagesDir(): string {
  const cliDir = path.resolve(__dirname, '../../..')
  return path.resolve(cliDir, '..', 'packages')
}

function copyDirRecursive(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

export async function rebuildWebsite(): Promise<void> {
  const packagesDir = getPackagesDir()
  const websiteDir = path.join(packagesDir, 'website')
  const apiPublicDir = path.join(packagesDir, 'api', 'public')

  console.log(chalk.blue('\n🔧 Rebuilding website for API static serving...\n'))

  if (!fs.existsSync(websiteDir)) {
    console.log(chalk.red('  ❌ Website package not found at packages/website'))
    return
  }

  // Clear existing public directory
  if (fs.existsSync(apiPublicDir)) {
    fs.rmSync(apiPublicDir, { recursive: true })
    console.log(chalk.gray('  ✓ Cleared existing public directory'))
  }

  // Copy website files
  copyDirRecursive(websiteDir, apiPublicDir)
  console.log(chalk.green('  ✔ Copied website files to packages/api/public/'))

  // Remove GEMINI.md and README.md from public
  const filesToRemove = ['GEMINI.md', 'README.md', 'package.json']
  for (const file of filesToRemove) {
    const filePath = path.join(apiPublicDir, file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  console.log(chalk.blue('\n✅ Website rebuilt! Ready for deployment.\n'))
}
