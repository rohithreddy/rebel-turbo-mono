// Auth configuration file for better-auth CLI
// This file is used by the CLI to generate auth schema
// It includes the full configuration inline to avoid import issues

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, bearer, jwt, organization } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Temporary database connection for CLI
const connectionString = process.env.POSTGRES_URL || "postgresql://username:password@localhost:5432/database";
const client = postgres(connectionString);
const db = drizzle(client);

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
  ],
  trustedOrigins: ["expo://"],
});
