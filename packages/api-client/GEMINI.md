# API Client Package

This package contains the generated API client, types, and mocks.

## Tech Stack

- **Kubb**: OpenAPI client generator
- **TypeScript**: Static typing
- **TanStack Query**: Data fetching hooks
- **Faker**: Mock data generation

## Workflow

1. Update the API and ensure it's running (or has a reachable spec).
2. Run `npm run generate` in this package.
3. Commit the generated code.

## Best Practices

- Do not modify generated files manually.
- Update `kubb.config.ts` if generation settings need to change.
- Use the exported hooks for data fetching in frontend apps.
