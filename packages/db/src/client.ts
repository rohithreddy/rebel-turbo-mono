import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is required");
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const db = drizzle({
  client: pool,
  schema,
  casing: "snake_case",
});
