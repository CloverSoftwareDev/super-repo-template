# @super-repo/website

HTMX Landing Page.

## Development

```bash
npm start
```

## Serving via API

To serve this website from the `api` package:

1. Build the website static files (if using a build step) or target this directory.
2. In `packages/api/src/index.ts`, register `@fastify/static`.
3. Point the root to `path.join(__dirname, '../../website')`.

Example in Fastify:
```typescript
import fastifyStatic from '@fastify/static'
import path from 'path'

// ...
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../../website'),
  prefix: '/public/', // optional: default '/' or specific route
})
```
