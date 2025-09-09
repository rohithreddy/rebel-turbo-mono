# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **create-t3-turbo** monorepo - a full-stack TypeScript turborepo template with tRPC, Next.js, Expo, and modern tooling. It uses **better-auth** for authentication (migrated from NextAuth.js) and targets React 19 with Next.js 15.

## Essential Commands

### Development
```bash
# Start all apps in watch mode
pnpm dev

# Start only Next.js app (faster for web-only development)
pnpm dev:next

# Install dependencies
pnpm i

# Start local database (PostgreSQL in Docker)
pnpm db:start
```

### Database Operations
```bash
# Push schema changes to database
pnpm db:push       # Uses .env.development by default
pnpm db:push:dev   # Explicitly use dev environment
pnpm db:push:prod  # Use production environment

# Seed database with sample data
pnpm db:seed
pnpm db:seed:dev
pnpm db:seed:prod

# Open Drizzle Studio (database GUI)
pnpm db:studio
pnpm db:studio:dev
pnpm db:studio:prod
```

### Authentication
```bash
# Generate auth types and configurations
pnpm auth:generate      # Uses .env.development
pnpm auth:generate:dev  # Explicitly for dev
pnpm auth:generate:prod # For production
```

### Code Quality
```bash
# Lint all packages
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Format code with Prettier
pnpm format
pnpm format:fix

# Type checking across all packages
pnpm typecheck

# Workspace validation (checks dependencies)
pnpm lint:ws
```

### Building & Deployment
```bash
# Build all packages
pnpm build      # Production build
pnpm build:dev  # Development build
pnpm build:prod # Production build with prod env

# Start production server
pnpm start
pnpm start:dev
pnpm start:prod

# Clean node_modules
pnpm clean

# Clean build artifacts across workspace
pnpm clean:workspaces
```

### UI & Package Management
```bash
# Add new shadcn/ui components interactively
pnpm ui-add

# Generate new package using Turbo generator
pnpm turbo gen init
```

### Mobile Development
```bash
# Run Expo app on Android
pnpm android

# Run Expo app on iOS
pnpm ios
```

## Architecture Overview

### Monorepo Structure
- **apps/**: Application packages
  - `nextjs/` - Next.js 15 web app with React 19, Tailwind CSS
  - `expo/` - React Native app using Expo SDK 53 (experimental React 19 support)

- **packages/**: Shared packages that provide reusable functionality
  - `api/` - tRPC v11 router definitions, procedures, and type inference helpers
  - `auth/` - Authentication using better-auth with OAuth providers
  - `db/` - Database layer with Drizzle ORM + Supabase/PostgreSQL (edge-compatible)
  - `ui/` - Shared UI components using shadcn/ui and Radix UI primitives
  - `validators/` - Shared Zod validation schemas for client/server

- **tooling/**: Development tools and shared configurations
  - `eslint/`, `prettier/`, `tailwind/`, `typescript/` - Shared configs across packages

### Key Technologies & Patterns

**Database Layer:**
- Drizzle ORM with PostgreSQL/Supabase for type-safe database operations
- Edge-compatible with Vercel Postgres driver
- Schema definitions in `packages/db/src/schema.ts`
- Migration and studio management via `drizzle-kit`

**API Layer (tRPC):**
- Full-stack type safety with tRPC v11
- Context creation with authentication and database access
- Router composition in `packages/api/src/root.ts`
- Procedures support public, optional auth, and protected patterns
- Superjson transformer for enhanced serialization

**Authentication:**
- better-auth with OAuth providers (Discord preconfigured)
- Session management integrated with tRPC context
- OAuth proxy plugin for Expo development and preview deployments
- Configuration in `packages/auth/src/index.ts`

**Build System:**
- Turborepo for orchestrated builds and caching
- PNPM workspaces with catalog dependencies for version consistency
- Environment-specific builds (dev/prod) with dotenv-cli

### Package Naming Convention
Uses `@acme` as namespace prefix throughout the codebase. Replace with your organization name when adapting.

### Environment Configuration
Required environment variables:
- `POSTGRES_URL` - Supabase/PostgreSQL connection string
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET` - OAuth provider credentials
- `DODO_PAYMENTS_API_KEY`, `DODO_PAYMENTS_WEBHOOK_SECRET` - Payment integration

Environment files:
- `.env.development` - Development configuration
- `.env.prod` - Production configuration
- Root `.env` - Shared/fallback configuration

### tRPC Integration Pattern

**Context Creation:** 
- `packages/api/src/trpc.ts` defines context with auth and database
- Session resolution with error handling for invalid tokens
- Timing middleware for development debugging

**Route Organization:**
- Routers in `packages/api/src/router/` (auth, post, etc.)
- Export type definitions for client-side inference
- Use `publicProcedure`, `optionalAuthProcedure`, `protectedProcedure`

**Client Setup:**
- Next.js: Server and client tRPC setup in `apps/nextjs/src/trpc/`
- Expo: Client setup in `apps/expo/src/utils/api.tsx`
- Hydration boundary for SSR/RSC integration

### Development Workflow Patterns

1. **Package-First Development:** Implement shared logic in packages before consuming in apps
2. **Schema-Driven:** Define database schema and validation schemas first, then generate types
3. **Type Safety:** Leverage tRPC's end-to-end type safety from database to client
4. **Component Composition:** Use shadcn/ui patterns for consistent component architecture
5. **Environment Isolation:** Separate dev/prod configurations for database and auth

### Common Operations

**Adding a new tRPC procedure:**
1. Define input schema in `packages/validators`
2. Add procedure to appropriate router in `packages/api/src/router/`
3. Use in Next.js via `trpc.routerName.procedureName.useQuery/useMutation()`
4. Use in Expo via similar pattern with context setup

**Database schema changes:**
1. Modify schema in `packages/db/src/schema.ts`
2. Run `pnpm db:push:dev` to apply to development database
3. Update any affected tRPC procedures and validation schemas

**Adding UI components:**
1. Use `pnpm ui-add` for shadcn/ui components
2. Extend in `packages/ui` for cross-app sharing
3. Import in apps via `@acme/ui` package reference

### Deployment Considerations

**Next.js (Vercel):**
- Deploy `apps/nextjs` as Vercel project
- Set `POSTGRES_URL` and auth environment variables
- Auth proxy automatically handles OAuth in preview deployments

**Expo (EAS Build):**
- Use EAS Build for app store distribution
- Update API base URL in production builds
- Configure OAuth redirects for production auth flow

**Database:**
- Supabase recommended for production PostgreSQL
- Connection pooling configured for edge runtime compatibility
- Migrations managed through Drizzle Kit push commands
