import baseConfig, { restrictEnvAccess } from "@barebel/eslint-config/base";
import nextjsConfig from "@barebel/eslint-config/nextjs";
import reactConfig from "@barebel/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
