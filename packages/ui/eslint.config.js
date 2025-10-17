import baseConfig from "@barebel/eslint-config/base";
import reactConfig from "@barebel/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
