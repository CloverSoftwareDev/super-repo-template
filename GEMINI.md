# Super Template - Monorepo

Description: This is a monorepo template for AI projects using TypeScript.

## Structure

```txt
super-repo-template/
├── packages/
│   ├── package-1/
│   └── package-2/
├── tools/
│   └── tool-1/
├── scripts/
│   └── script-1/
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Packages

| Package | Description |
| --- | --- |
| package-1 | Package 1 |
| package-2 | Package 2 |

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run lint:fix
```

## Testing Changes

- **Do NOT run `build` to test AI results** - only run `lint` to verify code quality
- Run `npm run lint` to check for errors
- Run `npx tsc --project packages/package-1/tsconfig.app.json` for TypeScript errors

## Code Patterns (All Packages)

### Naming Conventions

#### File Naming

- Use kebab-case for file names (e.g. `my-file.ts`)

#### Function & Variable Naming

- Use camelCase for function and variable names (e.g. `myFunction`, `myVariable`)

#### Class, Interface & Type Naming

- Use PascalCase for class, interface and type names (e.g. `MyClass`, `MyInterface`, `MyType`)

#### Enum & Constant Naming

- Use UPPER_SNAKE_CASE for enum and constant names (e.g. `MY_ENUM`, `MY_CONSTANT`)

### Exports

- No default exports - always use named exports (Biome enforces this)
- Exception: `vite.config.ts` files 

### Barrel Files

- **Do NOT create barrel files** for internal folders
- Only use barrel files for packages entry points (`src/index.ts`)
- Import directly from source files: `from './theme/slots'` instead of `from './theme'`
- Exception: Kubb-generated files are auto-manteined

### Component Structure

```tsx
import type { ComponentProps } from 'react'

export interface MyComponentProps extends ComponentProps<'div'> {}

export function MyComponent({ className, children, ...props }: MyComponentProps) {
    return (
        <div className={ className } { ...props }>
            { children }
        </div>
    )
}
```

- Extend `ComponentProps<'element'>` for HTML attribute typing
- React 19 handles refs automatically - no `fowardRef`

## Tooling

- **npm** - package management
- **Biome** - code formatting and linting
- **Vanilla CSS** - styling
- **TypeScript** - strict mode enabled

## Git Commits

- **Do NOT commit automatically**  only commit when explicitly asked by the user
- Wait for user approval before running 'git commit'

## CLI Tool

> **MANDATORY: Use the CLI for scaffolding and environment setup.**

### Scaffolding Components

**ALWAYS** use the CLI to scaffold new components:

```bash
npm run cli -- scaffold component web MyComponent
npm run cli -- scaffold component client MyComponent
npm run cli -- scaffold component website MyComponent
```

Do NOT manually create component files. The CLI ensures:
- Correct file naming (kebab-case)
- Proper component structure
- Consistent interface patterns

### Environment Setup

Use the CLI to set up environment files:

```bash
npm run cli -- setup-env
```

This copies `.env.example` to `.env` for all packages that have templates.