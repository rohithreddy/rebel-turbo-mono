/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod/v4";
import { eq } from "drizzle-orm";

import type { Auth, Session } from "@barebel/auth";
import { db } from "@barebel/db/client";
import { users } from "@barebel/db/schema";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: Auth;
}): Promise<{
  authApi: Auth["api"];
  session: Session | null;
  db: typeof db;
  profile: typeof users.$inferSelect | null;
}> => {
  const authApi = opts.auth.api;
  let session: Session | null = null;
  let profile: typeof users.$inferSelect | null = null;

  try {
    session = await authApi.getSession({
      headers: opts.headers,
    });
  } catch (error) {
    // Log the error but don't throw - let the session be null
    console.warn("Failed to get session:", error);
  }

  const sessionUser = session?.user;
  const sessionUserId =
    (sessionUser as { id?: string; userId?: string } | undefined)?.id ??
    (sessionUser as { id?: string; userId?: string } | undefined)?.userId;

  if (sessionUser && sessionUserId) {
    profile =
      (await db.query.users.findFirst({
        where: eq(users.id, sessionUserId),
      })) ?? null;

    if (!profile) {
      const fallbackName =
        (sessionUser as { name?: string; email?: string }).name ??
        (sessionUser as { email?: string }).email ??
        "User";

      await db.insert(users).values({
        id: sessionUserId,
        name: fallbackName,
        email: (sessionUser as { email?: string }).email ?? "",
        image: (sessionUser as { image?: string; avatar?: string }).image ?? null,
        role: "user",
      });

      profile =
        (await db.query.users.findFirst({
          where: eq(users.id, sessionUserId),
        })) ?? null;
    }
  }

  return {
    authApi,
    session,
    db,
    profile,
  };
};
/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof ZodError
          ? z.flattenError(error.cause as ZodError<Record<string, unknown>>)
          : null,
    },
  }),
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter: typeof t.router = t.router;

/**
 * Middleware for timing procedure execution and adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure: ReturnType<typeof t.procedure.use> = t.procedure.use(
  timingMiddleware,
);

/**
 * Optional auth procedure
 *
 * Similar to public procedure but provides better type safety for session data.
 * Use this when you want to access session data if available, but don't require authentication.
 */
export const optionalAuthProcedure: ReturnType<typeof t.procedure.use> = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    return next({
      ctx: {
        ...ctx,
        // Session is already properly typed as Session | null from context
        session: ctx.session,
      },
    });
  });

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure: ReturnType<typeof t.procedure.use> = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user || !ctx.profile) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Authentication required. Please sign in to access this resource.",
      });
    }
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
        profile: ctx.profile!,
      } as typeof ctx & {
        session: NonNullable<typeof ctx.session>;
        profile: NonNullable<typeof ctx.profile>;
      },
    });
  });

export const adminProcedure: ReturnType<typeof t.procedure.use> = protectedProcedure.use(
  ({ ctx, next }) => {
    const profile = ctx.profile!;
    if (profile.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You must be an admin to access this resource.",
      });
    }

    return next();
  },
);
