import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { initAuth } from "@acme/auth";

import { env } from "~/env";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";

export const auth = initAuth({
  baseUrl,
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "turbo.t3.gg"}`,
  secret: env.AUTH_SECRET,
  dodoPaymentsApiKey: env.DODO_PAYMENTS_API_KEY,
  dodoPaymentsWebhookSecret: env.DODO_PAYMENTS_WEBHOOK_SECRET,
});

export const getSession = cache(async () => {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.warn("Failed to get session:", error);
    return null;
  }
});
