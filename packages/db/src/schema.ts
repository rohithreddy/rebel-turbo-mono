import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  password: text("password"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  location: text("location").notNull(),
  image: text("image"),
  goal: numeric("goal", { precision: 14, scale: 2 }).notNull(),
  raised: numeric("raised", { precision: 14, scale: 2 })
    .default(sql`0`)
    .notNull(),
  backers: integer("backers").default(0).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  status: text("status").default("draft").notNull(),
  creatorId: text("creator_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const campaignUpdates = pgTable("campaign_updates", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const solutions = pgTable("solutions", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  votes: integer("votes").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const solutionComments = pgTable("solution_comments", {
  id: text("id").primaryKey(),
  solutionId: text("solution_id")
    .notNull()
    .references(() => solutions.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const solutionVotes = pgTable(
  "solution_votes",
  {
    solutionId: text("solution_id")
      .notNull()
      .references(() => solutions.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.solutionId, table.userId] }),
  }),
);

export const donations = pgTable("donations", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  isAnonymous: boolean("is_anonymous").default(false).notNull(),
  isRecurring: boolean("is_recurring").default(false).notNull(),
  paymentId: text("payment_id"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const volunteerOpportunities = pgTable("volunteer_opportunities", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  organizationName: text("organization_name").notNull(),
  organizationDescription: text("organization_description"),
  location: text("location").notNull(),
  remote: boolean("remote").default(false).notNull(),
  category: text("category").notNull(),
  skills: jsonb("skills").$type<string[] | null>().default(null),
  commitment: text("commitment").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
  slots: integer("slots").default(1).notNull(),
  filledSlots: integer("filled_slots").default(0).notNull(),
  creatorId: text("creator_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  campaignId: text("campaign_id").references(() => campaigns.id, {
    onDelete: "set null",
  }),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const volunteerApplications = pgTable("volunteer_applications", {
  id: text("id").primaryKey(),
  opportunityId: text("opportunity_id")
    .notNull()
    .references(() => volunteerOpportunities.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message"),
  status: text("status")
    .$type<"pending" | "accepted" | "rejected" | "withdrawn">()
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  campaigns: many(campaigns),
  solutions: many(solutions),
  donations: many(donations),
  volunteerOpportunities: many(volunteerOpportunities),
  volunteerApplications: many(volunteerApplications),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  creator: one(users, {
    fields: [campaigns.creatorId],
    references: [users.id],
  }),
  updates: many(campaignUpdates),
  solutions: many(solutions),
  donations: many(donations),
}));

export const campaignUpdatesRelations = relations(
  campaignUpdates,
  ({ one }) => ({
    campaign: one(campaigns, {
      fields: [campaignUpdates.campaignId],
      references: [campaigns.id],
    }),
  }),
);

export const solutionsRelations = relations(solutions, ({ one, many }) => ({
  campaign: one(campaigns, {
    fields: [solutions.campaignId],
    references: [campaigns.id],
  }),
  author: one(users, {
    fields: [solutions.userId],
    references: [users.id],
  }),
  comments: many(solutionComments),
  votes: many(solutionVotes),
}));

export const solutionCommentsRelations = relations(
  solutionComments,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [solutionComments.solutionId],
      references: [solutions.id],
    }),
    author: one(users, {
      fields: [solutionComments.userId],
      references: [users.id],
    }),
  }),
);

export const solutionVotesRelations = relations(
  solutionVotes,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [solutionVotes.solutionId],
      references: [solutions.id],
    }),
    voter: one(users, {
      fields: [solutionVotes.userId],
      references: [users.id],
    }),
  }),
);

export const donationsRelations = relations(donations, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [donations.campaignId],
    references: [campaigns.id],
  }),
  donor: one(users, {
    fields: [donations.userId],
    references: [users.id],
  }),
}));

export const volunteerOpportunitiesRelations = relations(
  volunteerOpportunities,
  ({ one, many }) => ({
    creator: one(users, {
      fields: [volunteerOpportunities.creatorId],
      references: [users.id],
    }),
    campaign: one(campaigns, {
      fields: [volunteerOpportunities.campaignId],
      references: [campaigns.id],
    }),
    applications: many(volunteerApplications),
  }),
);

export const volunteerApplicationsRelations = relations(
  volunteerApplications,
  ({ one }) => ({
    opportunity: one(volunteerOpportunities, {
      fields: [volunteerApplications.opportunityId],
      references: [volunteerOpportunities.id],
    }),
    applicant: one(users, {
      fields: [volunteerApplications.userId],
      references: [users.id],
    }),
  }),
);

export const schema = {
  users,
  campaigns,
  campaignUpdates,
  solutions,
  solutionComments,
  solutionVotes,
  donations,
};

export * from "./auth-schema";
