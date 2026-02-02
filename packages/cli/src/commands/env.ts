import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'

const PACKAGES_WITH_ENV = ['api', 'web', 'client']

function getPackagesDir(): string {
  // Resolve from CLI package to monorepo root
  const cliDir = path.resolve(__dirname, '../../..')
  return path.resolve(cliDir, '..', 'packages')
}

export async function setupEnv(): Promise<void> {
  const packagesDir = getPackagesDir()

  console.log(chalk.blue('\n🔧 Setting up environment files...\n'))

  for (const pkg of PACKAGES_WITH_ENV) {
    const pkgPath = path.join(packagesDir, pkg)
    const examplePath = path.join(pkgPath, '.env.example')
    const envPath = path.join(pkgPath, '.env.local')

    if (!fs.existsSync(pkgPath)) {
      console.log(chalk.yellow(`  ⚠ Package "${pkg}" not found, skipping.`))
      continue
    }

    if (!fs.existsSync(examplePath)) {
      console.log(chalk.yellow(`  ⚠ No .env.example in "${pkg}", skipping.`))
      continue
    }

    if (fs.existsSync(envPath)) {
      console.log(chalk.gray(`  ✓ .env.local already exists in "${pkg}", skipping.`))
      continue
    }

    fs.copyFileSync(examplePath, envPath)
    console.log(chalk.green(`  ✔ Created .env.local in "${pkg}" from .env.example`))
  }

  console.log(chalk.blue('\n✅ Environment setup complete!\n'))
}

