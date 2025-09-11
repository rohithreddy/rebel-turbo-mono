import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import {
  checkout,
  dodopayments,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  bearer,
  jwt,
  oAuthProxy,
  openAPI,
  organization,
} from "better-auth/plugins";
import DodoPayments from "dodopayments";

import { db } from "@acme/db/client";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  dodoPaymentsApiKey: string;
  dodoPaymentsWebhookSecret: string;
}) {
  // Create DodoPayments client
  const dodoPayments = new DodoPayments({
    bearerToken: options.dodoPaymentsApiKey,
    environment: "test_mode", // Change to "live_mode" for production
  });

  const config = {
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      admin(),
      organization(),
      bearer(),
      jwt(),
      openAPI(),
      oAuthProxy({
        /**
         * Auto-inference blocked by https://github.com/better-auth/better-auth/pull/2891
         */
        currentURL: options.baseUrl,
        productionURL: options.productionUrl,
      }),
      expo(),
      dodopayments({
        client: dodoPayments,
        createCustomerOnSignUp: true,
        use: [
          checkout({
            products: [
              {
                productId: "pdt_example_premium", // Replace with actual product ID from Dodo Payments
                slug: "premium-plan",
              },
              {
                productId: "pdt_example_basic", // Replace with actual product ID from Dodo Payments
                slug: "basic-plan",
              },
            ],
            successUrl: "/dashboard/success",
            authenticatedUsersOnly: true,
          }),
          portal(),
          webhooks({
            webhookKey: options.dodoPaymentsWebhookSecret,
            // Generic handler for all webhook events
            onPayload: async (payload) => {
              console.log("Received webhook:", payload);
            },
            // Payment event handlers
            onPaymentSucceeded: async (payload) => {
              console.log("Payment succeeded:", payload);
            },
            onPaymentFailed: async (payload) => {
              console.log("Payment failed:", payload);
            },
            onPaymentProcessing: async (payload) => {
              console.log("Payment processing:", payload);
            },
            onPaymentCancelled: async (payload) => {
              console.log("Payment cancelled:", payload);
            },
            // Subscription event handlers
            onSubscriptionActive: async (payload) => {
              console.log("Subscription active:", payload);
            },
            onSubscriptionCancelled: async (payload) => {
              console.log("Subscription cancelled:", payload);
            },
            onSubscriptionRenewed: async (payload) => {
              console.log("Subscription renewed:", payload);
            },
            // License key event handlers
            onLicenseKeyCreated: async (payload) => {
              console.log("License key created:", payload);
            },
          }),
        ],
      }),
    ],
    trustedOrigins: ["expo://"],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
