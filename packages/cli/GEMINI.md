# CLI Package

This package contains the CLI tools for development and utility workflow.

## Tech Stack

- **Commander**: CLI framework
- **TypeScript**: Static typing
- **Inquirer**: Interactive command line user interface
- **Chalk**: Terminal styling

## Best Practices

- Use `commander` for command definitions.
- Keep commands in `src/commands` folder.
- Use `inquirer` for user input.
- Make sure to adding `#!/usr/bin/env node` at the top of the entry file.

## MANDATORY: Use CLI for Scaffolding

> **ALWAYS use the CLI to scaffold new components instead of manually creating files.**

```bash
# Scaffold components
npm run cli -- scaffold component web MyComponent
npm run cli -- scaffold component client MyComponent
npm run cli -- scaffold component website MyComponent

# Setup environment files
npm run cli -- setup-env
```

This ensures:
- Consistent file naming (kebab-case)
- Correct component structure
- Proper interface/props patterns
- Less boilerplate errors
