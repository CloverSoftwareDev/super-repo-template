import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import inquirer from 'inquirer'

type PackageType = 'web' | 'client' | 'website'

interface ScaffoldOptions {
  packageType: PackageType
  name: string
}

function getPackagesDir(): string {
  const cliDir = path.resolve(__dirname, '../../..')
  return path.resolve(cliDir, '..', 'packages')
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

function generateReactComponent(name: string): string {
  return `import type { ComponentProps } from 'react'

export interface ${name}Props extends ComponentProps<'div'> {}

export function ${name}({ className, children, ...props }: ${name}Props) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
`
}

function generateWebsiteComponent(name: string): string {
  const kebabName = toKebabCase(name)
  return `<!-- ${name} Component -->
<div class="${kebabName}">
  <h2>${name}</h2>
  <p>Content goes here.</p>
</div>

<style>
  .${kebabName} {
    /* Add styles here */
  }
</style>
`
}

async function getComponentPath(packageType: PackageType, name: string): Promise<string> {
  const packagesDir = getPackagesDir()
  const fileName = toKebabCase(name)

  switch (packageType) {
    case 'web':
      return path.join(packagesDir, 'web', 'src', 'components', `${fileName}.tsx`)
    case 'client':
      return path.join(packagesDir, 'client', 'src', 'components', `${fileName}.tsx`)
    case 'website':
      return path.join(packagesDir, 'website', 'components', `${fileName}.html`)
    default:
      throw new Error(`Unknown package type: ${packageType}`)
  }
}

export async function scaffoldComponent(options?: ScaffoldOptions): Promise<void> {
  let packageType: PackageType
  let name: string

  if (options?.packageType && options?.name) {
    packageType = options.packageType
    name = options.name
  } else {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'packageType',
        message: 'Which package should the component be created in?',
        choices: [
          { name: 'Web (Next.js)', value: 'web' },
          { name: 'Client (Expo/React Native)', value: 'client' },
          { name: 'Website (HTMX)', value: 'website' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (input: string) => {
          if (!input.trim()) return 'Component name is required'
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) return 'Use PascalCase (e.g., MyComponent)'
          return true
        },
      },
    ])
    packageType = answers.packageType
    name = answers.name
  }

  const filePath = await getComponentPath(packageType, name)
  const dir = path.dirname(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (fs.existsSync(filePath)) {
    console.log(chalk.red(`\n❌ Component already exists: ${filePath}\n`))
    return
  }

  const content = packageType === 'website'
    ? generateWebsiteComponent(name)
    : generateReactComponent(name)

  fs.writeFileSync(filePath, content)
  console.log(chalk.green(`\n✔ Created component: ${filePath}\n`))
}
