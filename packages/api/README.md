# @super-repo/api

Fastify API with Supabase integration.

## Features

- **Static Website Serving**: Serves the `@super-repo/website` package at `/`
- **Swagger Documentation**: API docs available at `/api`
- **CRUD Endpoints**: Auth, Users, and Addresses routes
- **Health Check**: Status endpoint at `/health`

## Setup

1. Copy `.env.example` to `.env`
2. `npm install`
3. `npm run dev`

## Endpoints

| Path | Description |
|------|-------------|
| `/` | Website (static files) |
| `/api` | Swagger UI documentation |
| `/health` | Health check |
| `/auth/*` | Authentication routes |
| `/users/*` | User management |
| `/addresses/*` | Address management |

## Docker

```bash
docker build -f packages/api/Dockerfile -t super-repo-api .
docker run -p 3000:3000 super-repo-api
```
