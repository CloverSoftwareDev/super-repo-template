# @super-repo/cli

Internal CLI for scaffolding and managing the Superepo monorepo.

## Usage

Run from the monorepo root:

```bash
# Show all commands
npm run cli -- --help

# Setup environment files
npm run cli -- setup-env

# Scaffold a component (interactive)
npm run cli -- scaffold component

# Scaffold directly
npm run cli -- scaffold component web MyButton
npm run cli -- scaffold component client Card
npm run cli -- scaffold component website HeroSection
```

## Commands

| Command | Description |
|---------|-------------|
| `setup-env` | Creates `.env` from `.env.example` for `api`, `web`, `client` |
| `scaffold component` | Generates components following project conventions |

## Component Scaffolding

Supported packages:
- **web** - Next.js React components (`packages/web/src/components/`)
- **client** - Expo/React Native components (`packages/client/src/components/`)
- **website** - HTMX HTML snippets (`packages/website/components/`)

Generated components follow the project's coding conventions automatically.
