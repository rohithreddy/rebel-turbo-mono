import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import { volunteerApplications, volunteerOpportunities } from "@barebel/db/schema";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const DEFAULT_STATUS = "active" as const;

export const volunteersRouter = createTRPCRouter({
  getOpportunities: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          location: z.string().optional(),
          remote: z.boolean().optional(),
          status: z
            .enum(["draft", "active", "completed", "cancelled"])
            .optional(),
          campaignId: z.string().optional(),
          creatorId: z.string().optional(),
          search: z.string().optional(),
          sort: z.enum(["newest", "ending-soon", "most-slots"]).optional(),
          limit: z.number().min(1).max(100).default(10),
          cursor: z.number().nullish(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const offset = input?.cursor ?? 0;

      const filters: SQL<unknown>[] = [
        eq(volunteerOpportunities.status, input?.status ?? DEFAULT_STATUS),
      ];

      if (input?.category) {
        filters.push(eq(volunteerOpportunities.category, input.category));
      }

      if (input?.location) {
        filters.push(eq(volunteerOpportunities.location, input.location));
      }

      if (typeof input?.remote === "boolean") {
        filters.push(eq(volunteerOpportunities.remote, input.remote));
      }

      if (input?.campaignId) {
        filters.push(
          eq(volunteerOpportunities.campaignId, input.campaignId),
        );
      }

      if (input?.creatorId) {
        filters.push(eq(volunteerOpportunities.creatorId, input.creatorId));
      }

      if (input?.search) {
        const pattern = `%${input.search}%`;
        filters.push(
          sql`(
            ${volunteerOpportunities.title} ILIKE ${pattern}
            OR ${volunteerOpportunities.description} ILIKE ${pattern}
            OR ${volunteerOpportunities.organizationName} ILIKE ${pattern}
          )`,
        );
      }

      const where =
        filters.length > 1
          ? and(...filters)
          : filters.length === 1
            ? filters[0]
            : undefined;

      const orderBy =
        input?.sort === "ending-soon"
          ? asc(volunteerOpportunities.endDate)
          : input?.sort === "most-slots"
            ? desc(
                sql`(${volunteerOpportunities.slots} - ${volunteerOpportunities.filledSlots})`,
              )
            : desc(volunteerOpportunities.createdAt);

      const items = await ctx.db.query.volunteerOpportunities.findMany({
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

  getOpportunityById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const opportunity = await ctx.db.query.volunteerOpportunities.findFirst({
      where: eq(volunteerOpportunities.id, input),
      with: {
        creator: true,
      },
    });

    if (!opportunity) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Volunteer opportunity not found",
      });
    }

    const countResult = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(volunteerApplications)
      .where(eq(volunteerApplications.opportunityId, input));

    return {
      ...opportunity,
      applicationsCount: Number(countResult[0]?.count ?? 0),
    };
  }),

  createOpportunity: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5),
        description: z.string().min(50),
        organizationName: z.string().min(2),
        organizationDescription: z.string().optional(),
        location: z.string(),
        remote: z.boolean().default(false),
        category: z.string(),
        skills: z.array(z.string()).optional(),
        commitment: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        slots: z.number().int().positive().default(1),
        campaignId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const opportunityId = nanoid();

      await ctx.db.insert(volunteerOpportunities).values({
        id: opportunityId,
        title: input.title,
        description: input.description,
        organizationName: input.organizationName,
        organizationDescription: input.organizationDescription ?? null,
        location: input.location,
        remote: input.remote,
        category: input.category,
        skills: input.skills ?? null,
        commitment: input.commitment,
        startDate: input.startDate ?? null,
        endDate: input.endDate ?? null,
        slots: input.slots,
        filledSlots: 0,
        creatorId: ctx.profile.id,
        campaignId: input.campaignId ?? null,
        status: DEFAULT_STATUS,
      });

      return { id: opportunityId };
    }),

  applyForOpportunity: protectedProcedure
    .input(
      z.object({
        opportunityId: z.string(),
        message: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const opportunity =
        await ctx.db.query.volunteerOpportunities.findFirst({
          where: eq(volunteerOpportunities.id, input.opportunityId),
        });

      if (!opportunity || opportunity.status !== DEFAULT_STATUS) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Volunteer opportunity not found or inactive",
        });
      }

      if (opportunity.filledSlots >= opportunity.slots) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No slots available for this opportunity",
        });
      }

      const existingApplication =
        await ctx.db.query.volunteerApplications.findFirst({
          where: and(
            eq(volunteerApplications.opportunityId, input.opportunityId),
            eq(volunteerApplications.userId, ctx.profile.id),
          ),
        });

      if (existingApplication) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already applied for this opportunity",
        });
      }

      const applicationId = nanoid();
      await ctx.db.insert(volunteerApplications).values({
        id: applicationId,
        opportunityId: input.opportunityId,
        userId: ctx.profile.id,
        message: input.message ?? null,
        status: "pending",
      });

      return { id: applicationId };
    }),
});
