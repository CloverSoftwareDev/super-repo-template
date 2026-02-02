#!/usr/bin/env node
import { Command } from 'commander'
import { setupEnv } from './commands/env'
import { scaffoldComponent } from './commands/scaffold'

const program = new Command()

program
  .name('super-cli')
  .description('CLI for Super Repo - Scaffold components and manage the monorepo')
  .version('0.0.1')

// Setup environment command
program
  .command('setup-env')
  .description('Create .env files from .env.example templates')
  .action(async () => {
    await setupEnv()
  })

// Scaffold command group
const scaffold = program
  .command('scaffold')
  .description('Scaffold new files and components')

scaffold
  .command('component [packageType] [name]')
  .description('Scaffold a new component (web, client, or website)')
  .action(async (packageType?: string, name?: string) => {
    const validTypes = ['web', 'client', 'website']
    if (packageType && !validTypes.includes(packageType)) {
      console.error(`Invalid package type. Choose from: ${validTypes.join(', ')}`)
      process.exit(1)
    }
    await scaffoldComponent(
      packageType && name
        ? { packageType: packageType as 'web' | 'client' | 'website', name }
        : undefined
    )
  })

program.parse(process.argv)
