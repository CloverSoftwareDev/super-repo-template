# @super-repo/api

Fastify API with Supabase integration.

## Setup

1. Copy `.env.example` to `.env` (create if not exists)
2. `npm install`
3. `npm run dev`

## Documentation

Swagger UI is available at `/docs`.

## Docker

```bash
docker build -t super-repo-api .
docker run -p 3000:3000 super-repo-api
```
