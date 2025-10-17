import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import { campaigns, donations } from "@barebel/db/schema";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const donationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        campaignId: z.string(),
        amount: z.number().positive(),
        isAnonymous: z.boolean().default(false),
        isRecurring: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = ctx.profile!;
      const campaign = await ctx.db.query.campaigns.findFirst({
        where: eq(campaigns.id, input.campaignId),
      });

      if (!campaign) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });
      }

      const donationId = nanoid();
      await ctx.db.insert(donations).values({
        id: donationId,
        campaignId: input.campaignId,
        userId: profile.id,
        amount: input.amount.toString(),
        isAnonymous: input.isAnonymous,
        isRecurring: input.isRecurring,
        status: "pending",
      });

      // Mark donation as completed immediately for now
      await ctx.db
        .update(donations)
        .set({
          status: "completed",
        })
        .where(eq(donations.id, donationId));

      const raised = Number(campaign.raised ?? "0") + input.amount;
      await ctx.db
        .update(campaigns)
        .set({
          raised: raised.toString(),
          backers: (campaign.backers ?? 0) + 1,
        })
        .where(eq(campaigns.id, input.campaignId));

      return { id: donationId };
    }),

  getByCampaign: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.query.donations.findMany({
        where: (d, { eq: eqFn }) =>
          and(
            eqFn(d.campaignId, input),
            eqFn(d.status, "completed"),
          ),
        orderBy: (d, { desc: descFn }) => [descFn(d.createdAt)],
        limit: 50,
        with: {
          donor: true,
        },
      });

      return items.map((item) => ({
        donation: {
          id: item.id,
          amount: item.amount,
          isAnonymous: item.isAnonymous,
          createdAt: item.createdAt,
        },
        user: item.isAnonymous
          ? { name: "Anonymous" }
          : item.donor
            ? { id: item.donor.id, name: item.donor.name, image: item.donor.image }
            : null,
      }));
    }),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const profile = ctx.profile!;
    const items = await ctx.db.query.donations.findMany({
      where: (d, { eq: eqFn }) => eqFn(d.userId, profile.id),
      orderBy: (d, { desc: descFn }) => [descFn(d.createdAt)],
      with: {
        campaign: true,
      },
    });

    return items;
  }),
});
