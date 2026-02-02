#!/usr/bin/env node
import { Command } from 'commander'

const program = new Command()

program
  .name('super-cli')
  .description('CLI for Super Repo')
  .version('0.0.1')

program.command('greet')
  .description('Greet the user')
  .action(() => {
    console.log('Hello from Super Repo CLI!')
  })

program.parse(process.argv)
