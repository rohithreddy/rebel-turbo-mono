import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import {
  campaigns,
  solutionComments,
  solutions,
  solutionVotes,
  users,
} from "@barebel/db/schema";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const solutionsRouter = createTRPCRouter({
  getByCampaign: publicProcedure
    .input(
      z.object({
        campaignId: z.string(),
        sort: z
          .enum(["most-voted", "newest", "most-discussed"])
          .optional(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit;
      const offset = input.cursor ?? 0;

      const orderBy =
        input.sort === "most-voted"
          ? desc(solutions.votes)
          : input.sort === "most-discussed"
            ? desc(solutions.votes)
            : desc(solutions.createdAt);

      const items = await ctx.db
        .select({
          solution: solutions,
          user: {
            id: users.id,
            name: users.name,
            image: users.image,
          },
        })
        .from(solutions)
        .leftJoin(users, eq(solutions.userId, users.id))
        .where(eq(solutions.campaignId, input.campaignId))
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);

      return {
        items,
        nextCursor: items.length === limit ? offset + limit : null,
      };
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db
      .select({
        solution: solutions,
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
      })
      .from(solutions)
      .leftJoin(users, eq(solutions.userId, users.id))
      .where(eq(solutions.id, input))
      .limit(1);

    if (!result.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Solution not found",
      });
    }

    return result[0];
  }),

  create: protectedProcedure
    .input(
      z.object({
        campaignId: z.string(),
        content: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const campaign = await ctx.db.query.campaigns.findFirst({
        where: eq(campaigns.id, input.campaignId),
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      const solutionId = nanoid();
      await ctx.db.insert(solutions).values({
        id: solutionId,
        campaignId: input.campaignId,
        userId: ctx.profile.id,
        content: input.content,
      });

      return { id: solutionId };
    }),

  vote: protectedProcedure
    .input(
      z.object({
        solutionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const solution = await ctx.db.query.solutions.findFirst({
        where: eq(solutions.id, input.solutionId),
      });

      if (!solution) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Solution not found",
        });
      }

      const existingVote = await ctx.db.query.solutionVotes.findFirst({
        where: and(
          eq(solutionVotes.solutionId, input.solutionId),
          eq(solutionVotes.userId, ctx.profile.id),
        ),
      });

      if (existingVote) {
        await ctx.db
          .delete(solutionVotes)
          .where(
            and(
              eq(solutionVotes.solutionId, input.solutionId),
              eq(solutionVotes.userId, ctx.profile.id),
            ),
          );

        await ctx.db
          .update(solutions)
          .set({ votes: (solution.votes ?? 0) - 1 })
          .where(eq(solutions.id, input.solutionId));

        return { voted: false };
      }

      await ctx.db.insert(solutionVotes).values({
        solutionId: input.solutionId,
        userId: ctx.profile.id,
      });

      await ctx.db
        .update(solutions)
        .set({ votes: (solution.votes ?? 0) + 1 })
        .where(eq(solutions.id, input.solutionId));

      return { voted: true };
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        solutionId: z.string(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const solution = await ctx.db.query.solutions.findFirst({
        where: eq(solutions.id, input.solutionId),
      });

      if (!solution) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Solution not found",
        });
      }

      const commentId = nanoid();
      await ctx.db.insert(solutionComments).values({
        id: commentId,
        solutionId: input.solutionId,
        userId: ctx.profile.id,
        content: input.content,
      });

      return { id: commentId };
    }),

  getComments: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          comment: solutionComments,
          user: {
            id: users.id,
            name: users.name,
            image: users.image,
          },
        })
        .from(solutionComments)
        .leftJoin(users, eq(solutionComments.userId, users.id))
        .where(eq(solutionComments.solutionId, input))
        .orderBy(desc(solutionComments.createdAt));
    }),
});
