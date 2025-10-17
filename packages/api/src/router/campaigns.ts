import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import {
  campaignUpdates,
  campaigns,
  donations,
  solutions,
} from "@barebel/db/schema";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const DEFAULT_STATUS = "active" as const;

export const campaignsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          status: z
            .enum(["draft", "active", "completed", "cancelled"])
            .optional(),
          sort: z
            .enum(["newest", "ending-soon", "most-funded", "most-solutions"])
            .optional(),
          limit: z.number().min(1).max(100).default(10),
          cursor: z.number().nullish(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const offset = input?.cursor ?? 0;

      const filters = [
        eq(campaigns.status, input?.status ?? DEFAULT_STATUS),
      ];

      if (input?.category) {
        filters.push(eq(campaigns.category, input.category));
      }

      const where =
        filters.length > 1
          ? and(...filters)
          : filters.length === 1
            ? filters[0]
            : undefined;

      const orderBy =
        input?.sort === "ending-soon"
          ? asc(campaigns.endDate)
          : input?.sort === "most-funded"
            ? desc(campaigns.raised)
            : input?.sort === "most-solutions"
              ? desc(campaigns.updatedAt)
              : desc(campaigns.createdAt);

      const items = await ctx.db.query.campaigns.findMany({
        where,
        orderBy,
        limit,
        offset,
        with: {
          creator: true,
        },
      });

      return {
        items,
        nextCursor: items.length === limit ? offset + limit : null,
      };
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const campaign = await ctx.db.query.campaigns.findFirst({
      where: eq(campaigns.id, input),
      with: {
        creator: true,
        updates: true,
        donations: true,
        solutions: {
          with: {
            author: true,
            comments: {
              with: { author: true },
            },
            votes: true,
          },
        },
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Campaign not found",
      });
    }

    return campaign;
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5),
        category: z.string(),
        description: z.string().min(50),
        summary: z.string().min(10).max(150),
        location: z.string(),
        image: z.string().optional(),
        goal: z.number().positive(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const campaignId = nanoid();
      const slug =
        input.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-") +
        "-" +
        campaignId.substring(0, 6);

      await ctx.db.insert(campaigns).values({
        id: campaignId,
        title: input.title,
        slug,
        category: input.category,
        description: input.description,
        summary: input.summary,
        location: input.location,
        image: input.image,
        goal: input.goal.toString(),
        endDate: input.endDate,
        creatorId: ctx.profile.id,
      });

      return { id: campaignId, slug };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(5).optional(),
        category: z.string().optional(),
        description: z.string().min(50).optional(),
        summary: z.string().min(10).max(150).optional(),
        location: z.string().optional(),
        image: z.string().optional(),
        goal: z.number().positive().optional(),
        endDate: z.date().optional(),
        status: z
          .enum(["draft", "active", "completed", "cancelled"])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const campaign = await ctx.db.query.campaigns.findFirst({
        where: eq(campaigns.id, input.id),
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      if (campaign.creatorId !== ctx.profile.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this campaign",
        });
      }

      await ctx.db
        .update(campaigns)
        .set({
          ...(input.title && { title: input.title }),
          ...(input.category && { category: input.category }),
          ...(input.description && { description: input.description }),
          ...(input.summary && { summary: input.summary }),
          ...(input.location && { location: input.location }),
          ...(input.image && { image: input.image }),
          ...(typeof input.goal === "number" && {
            goal: input.goal.toString(),
          }),
          ...(input.endDate && { endDate: input.endDate }),
          ...(input.status && { status: input.status }),
          updatedAt: new Date(),
        })
        .where(eq(campaigns.id, input.id));

      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const campaign = await ctx.db.query.campaigns.findFirst({
        where: eq(campaigns.id, input),
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      if (campaign.creatorId !== ctx.profile.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this campaign",
        });
      }

      await ctx.db.delete(campaignUpdates).where(eq(campaignUpdates.campaignId, input));
      await ctx.db.delete(solutions).where(eq(solutions.campaignId, input));
      await ctx.db.delete(donations).where(eq(donations.campaignId, input));
      await ctx.db.delete(campaigns).where(eq(campaigns.id, input));

      return { success: true };
    }),
});
