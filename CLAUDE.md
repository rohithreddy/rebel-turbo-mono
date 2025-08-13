# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **create-t3-turbo** monorepo - a full-stack TypeScript turborepo template with tRPC, Next.js, Expo, and modern tooling. It uses **better-auth** for authentication (migrated from NextAuth.js).

## Essential Commands

### Development
```bash
# Start all apps in watch mode
pnpm dev

# Start only Next.js app
pnpm dev:next

# Install dependencies
pnpm i

# Database operations
pnpm db:push       # Push schema changes to database
pnpm db:push:dev   # Push schema changes to dev database
pnpm db:push:prod  # Push schema changes to prod database
pnpm db:seed       # Seed database
pnpm db:seed:dev   # Seed dev database  
pnpm db:seed:prod  # Seed prod database
pnpm db:studio     # Open Drizzle Studio
pnpm db:studio:dev # Open Drizzle Studio for dev
pnpm db:studio:prod # Open Drizzle Studio for prod
pnpm db:start      # Start local database

# Generate auth types
pnpm auth:generate      # Generate auth types
pnpm auth:generate:dev  # Generate auth types for dev
pnpm auth:generate:prod # Generate auth types for prod
```

### Code Quality
```bash
# Lint all packages
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
pnpm format:fix

# Type checking
pnpm typecheck

# Workspace validation
pnpm lint:ws
```

### Building & Testing
```bash
# Build all packages
pnpm build      # Build for production
pnpm build:dev  # Build for development

# Start production server
pnpm start      # Start all apps
pnpm start:dev  # Start in dev mode

# Clean all node_modules
pnpm clean

# Clean workspace build artifacts
pnpm clean:workspaces
```

### UI & Package Management
```bash
# Add new shadcn/ui components
pnpm ui-add

# Generate new package
pnpm turbo gen init
```

### Mobile Development
```bash
# Run on Android
pnpm android

# Run on iOS  
pnpm ios
```

## Architecture

### Monorepo Structure
- **apps/**: Application packages
  - `nextjs/` - Next.js 15 web app with React 19
  - `expo/` - React Native app using Expo SDK 53 (experimental)
- **packages/**: Shared packages
  - `api/` - tRPC v11 router definitions and type inference
  - `auth/` - Authentication using better-auth
  - `db/` - Database layer with Drizzle ORM + Supabase/Postgres
  - `ui/` - Shared UI components using shadcn/ui
  - `validators/` - Shared validation schemas
- **tooling/**: Development tools and configs
  - `eslint/`, `prettier/`, `tailwind/`, `typescript/` - Shared configurations

### Key Technologies
- **Database**: Drizzle ORM with Supabase Postgres (edge-compatible)
- **Authentication**: better-auth with OAuth providers (Discord preconfigured)
- **API**: tRPC v11 for end-to-end type safety
- **UI**: shadcn/ui components with Tailwind CSS
- **Build System**: Turborepo with pnpm workspaces
- **Deployment**: Vercel-optimized (Next.js), EAS Build (Expo)

### Package Naming Convention
Uses `@acme` as namespace prefix. Replace with your organization name across the codebase.

### Environment Setup
1. Copy `.env.example` to `.env`
2. Configure `POSTGRES_URL` for Supabase connection
3. Set `AUTH_SECRET` (generate with `openssl rand -base64 32`)
4. Add OAuth provider credentials (`AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`)
5. Run `pnpm db:push` to sync database schema

### tRPC Architecture
- Context creation in `packages/api/src/trpc.ts`
- Route definitions in `packages/api/src/router/`
- Type inference helpers exported from `packages/api/src/index.ts`
- Client setup in `apps/nextjs/src/trpc/` and `apps/expo/src/utils/api.tsx`

### Authentication Flow
- better-auth configuration in `packages/auth/src/index.ts`
- OAuth proxy plugin for Expo development
- Session management integrated with tRPC context

### Deployment Notes
- Next.js: Deploy to Vercel, set `POSTGRES_URL` env var
- Expo: Use EAS Build for app store distribution
- Auth Proxy: Required for OAuth in preview deployments

### Development Workflow
1. Make changes to packages first, then consume in apps
2. Use `pnpm ui-add` for new shadcn/ui components
3. Follow existing patterns in router definitions and component structure
4. Run type checking and linting before commits
5. Use `packages/validators` for shared validation schemas between client/server