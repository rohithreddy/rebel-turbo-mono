import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { users } from "@barebel/db/schema";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";

export const usersRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.profile) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const record = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.profile.id),
    });

    return record ?? ctx.profile;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.profile) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const existing = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.profile.id),
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      await ctx.db
        .update(users)
        .set({
          ...(input.name && { name: input.name }),
          ...(input.image && { image: input.image }),
        })
        .where(eq(users.id, ctx.profile.id));

      return { success: true };
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findMany();
  }),
});
