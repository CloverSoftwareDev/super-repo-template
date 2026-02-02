# Deno Deploy Configuration

## Build Command
```bash
npm run build:deno
```

## Entrypoint
```
packages/api/src/index.ts
```

## Environment Variables
Set these in your Deno Deploy dashboard:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `API_URL` - Your deployed URL (e.g., `https://your-project.deno.dev`)
- `PORT` - Usually auto-set by Deno Deploy

## Why a Separate Build Script?

The default `npm run build` uses the CLI with `tsx`, which scans the entire monorepo including `expo` dependencies from the `client` package. Deno Deploy doesn't support React Native's JSX configuration.

The `build:deno` script simply copies website files to the API's public folder without invoking TypeScript tooling, since Deno runs TypeScript natively.
