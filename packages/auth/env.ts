import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

function isProdEnvironment() {
  if (process.env.AUTH_ENFORCE_SECRET === "true") {
    return true;
  }

  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv !== "production") {
    return false;
  }

  // CI flag is set on most hosted build environments (Vercel, GitHub Actions, etc.).
  // Treat those as production to avoid silently shipping with a generated secret.
  if (process.env.CI && process.env.CI !== "false") {
    return true;
  }

  // Explicit Vercel/Netlify deploys should also require a real secret.
  if (process.env.VERCEL === "1" || process.env.NETLIFY === "true") {
    return true;
  }

  return false;
}

const DEV_AUTH_SECRET_PLACEHOLDER = "dev-secret-key-supersecret";

export function authEnv() {
  const requireRealSecret = isProdEnvironment();

  if (!requireRealSecret && !process.env.AUTH_SECRET) {
    process.env.AUTH_SECRET = DEV_AUTH_SECRET_PLACEHOLDER;
  }

  return createEnv({
    server: {
      AUTH_SECRET: requireRealSecret
        ? z.string().min(1)
        : z.string().min(1).optional(),
      NODE_ENV: z.enum(["development", "production"]).optional(),
    },
    experimental__runtimeEnv: {},
    skipValidation:
      !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}
