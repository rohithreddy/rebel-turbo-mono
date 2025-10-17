import { campaignsRouter } from "./router/campaigns";
import { donationsRouter } from "./router/donations";
import { solutionsRouter } from "./router/solutions";
import { usersRouter } from "./router/users";
import { volunteersRouter } from "./router/volunteers";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  campaigns: campaignsRouter,
  solutions: solutionsRouter,
  donations: donationsRouter,
  volunteers: volunteersRouter,
});

export type AppRouter = typeof appRouter;
