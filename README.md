# <img src="packages/website/assets/logo.png" alt="Superepo Logo" width="50" height="50" style="vertical-align: middle; margin-right: 10px;"> The Superepo

The high-performance TypeScript superepo template integrated with **Antigravity** and **Google Gemini**.

> **"Build Faster. Scale Infinitely."**

## Packages

| Package | Description | Tech Stack |
| --- | --- | --- |
| **[@super-repo/api](./packages/api)** | Backend API | Fastify, Supabase, Swagger |
| **[@super-repo/api-client](./packages/api-client)** | API Client SDK | Kubb, React Query, Faker Mocks |
| **[@super-repo/cli](./packages/cli)** | CLI Tool | Commander, Inquirer |
| **[@super-repo/client](./packages/client)** | Native Client | Expo, React Native Paper |
| **[@super-repo/web](./packages/web)** | Web App | Next.js 16, Vanilla CSS |
| **[@super-repo/website](./packages/website)** | Landing Page | HTMX, LinearX CSS |

## Agentic AI Readiness

This template is **AI-Native**.
Every package includes a `GEMINI.md` file that acts as long-term memory for Antigravity agents.

- **Antigravity**: Autonomous coding agent.
- **Gemini CLI**: Seamless context integration.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables** (using CLI):
   ```bash
   npm run cli -- setup-env
   ```
   This creates `.env` files from `.env.example` templates.

## CLI Tool

The monorepo includes a CLI for common tasks:

```bash
# Show all commands
npm run cli -- --help

# Setup environment files
npm run cli -- setup-env

# Scaffold a component
npm run cli -- scaffold component web MyButton
```

See [@super-repo/cli](./packages/cli) for full documentation.

## Workflows

- **Develop All**: `npm run dev` (Runs API, Web, and Website in parallel)
- **Develop API**: `cd packages/api && npm run dev`
- **Develop Web**: `cd packages/web && npm run dev`
- **Develop Client**: `cd packages/client && npm start`
