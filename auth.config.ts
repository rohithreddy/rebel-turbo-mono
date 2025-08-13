// Auth configuration file for better-auth CLI
// This file is used by the CLI to generate auth schema
// It includes the full configuration inline to avoid import issues

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, bearer, jwt, organization } from "better-auth/plugins";
import { dodopayments, checkout, portal, webhooks } from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Temporary database connection for CLI
const connectionString = process.env.POSTGRES_URL || "postgresql://username:password@localhost:5432/database";
const client = postgres(connectionString);
const db = drizzle(client);

// Create DodoPayments client
const dodoPayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || "test-key",
  environment: "test_mode",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.AUTH_SECRET || "dev-secret-key-supersecret",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    admin(),
    organization(),
    bearer(),
    jwt(),
    dodopayments({
      client: dodoPayments,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "pdt_example_premium",
              slug: "premium-plan",
            },
            {
              productId: "pdt_example_basic",
              slug: "basic-plan",
            },
          ],
          successUrl: "/dashboard/success",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET || "test-secret",
          onPayload: async (payload) => {
            console.log("Received webhook:", payload.type);
          },
          onPaymentSucceeded: async (payload) => {
            console.log("Payment succeeded:", payload);
          },
          onPaymentFailed: async (payload) => {
            console.log("Payment failed:", payload);
          },
          onSubscriptionActive: async (payload) => {
            console.log("Subscription active:", payload);
          },
          onSubscriptionCancelled: async (payload) => {
            console.log("Subscription cancelled:", payload);
          },
        }),
      ],
    }),
  ],
  trustedOrigins: ["expo://"],
});