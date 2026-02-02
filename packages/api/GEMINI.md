# API Package

This package allows us to communicate with the database and other external services.

## Tech Stack

- **Fastify**: High performance web framework
- **TypeScript**: Static typing
- **Supabase**: Database and Auth
- **Zod**: Schema validation
- **Swagger**: API Documentation

## Best Practices

### RESTful Design
- Use standard HTTP methods (GET, POST, PUT, DELETE)
- Use proper HTTP status codes

### Validation
- Always use `zod` schemas for request/response validation
- Define schemas in `src/schemas` (if applicable) or inline if simple

### Database
- Use the `supabase` client exported from `src/lib/supabase.ts`
- Do NOT hardcode credentials, use environment variables

### Documentation
- Keep Swagger documentation up to date
- Use descriptive summaries and descriptions for routes
