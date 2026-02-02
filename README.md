# Super Repo Template

A high-performance TypeScript monorepo template integrated with Antigravity and Gemini.

## Packages

| Package | Description | Tech Stack |
| --- | --- | --- |
| **[@super-repo/api](./packages/api)** | Backend API | Fastify, Supabase, Swagger |
| **[@super-repo/api-client](./packages/api-client)** | API Client SDK | Kubb, React Query, Faker Mocks |
| **[@super-repo/cli](./packages/cli)** | CLI Tool | Commander, Inquirer |
| **[@super-repo/client](./packages/client)** | Native Client | Expo, React Native Paper |
| **[@super-repo/web](./packages/web)** | Web App | Next.js, Vanilla CSS, Material Design Tokens |
| **[@super-repo/website](./packages/website)** | Landing Page | HTMX, Material Web |

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.example` in `packages/api` and set up Supabase credentials.

## Workflows

- **Develop API**: `cd packages/api && npm run dev`
- **Develop Web**: `cd packages/web && npm run dev`
- **Develop Client**: `cd packages/client && npm start`
- **Generate API Client**: `cd packages/api-client && npm run generate`
