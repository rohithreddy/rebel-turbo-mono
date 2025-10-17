import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./root";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

/**
 * Inference helpers for input types
 * @example
 * type CampaignListInput = RouterInputs['campaigns']['getAll']
 *      ^? { category?: string | undefined; ... }
 **/
type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type CampaignListOutput = RouterOutputs['campaigns']['getAll']
 *      ^? { items: Campaign[]; nextCursor: number | null }
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter };
export type { AppRouter, RouterInputs, RouterOutputs };
