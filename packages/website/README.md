# @super-repo/website

HTMX Landing Page.

> **Note**: In production, this website is served by the `@super-repo/api` package at the root path (`/`).

## Development

```bash
npm start
```

## Production

The website is automatically bundled and served by the API package. When the API runs:
- `/` → Website (this package)
- `/api` → Swagger documentation
- `/health` → Health check endpoint
