import path from "path";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

const srcPath = path.resolve(process.cwd(), "src");

/** @type {import("next").NextConfig} */
const config = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@barebel/api",
    "@barebel/auth",
    "@barebel/db",
    "@barebel/ui",
    "@barebel/validators",
  ],

  /** Align Turbopack module resolution with our webpack alias */
  turbopack: {
    resolveAlias: {
      "@": srcPath,
    },
  },

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": srcPath,
    };
    return config;
  },
};

export default config;
