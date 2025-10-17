import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const reactHooksConfig =
  reactHooksPlugin?.configs?.flat?.recommended ??
  reactHooksPlugin?.configs?.flat?.["recommended-latest"] ??
  reactHooksPlugin?.configs?.recommended ??
  reactHooksPlugin?.default?.configs?.flat?.recommended ??
  reactHooksPlugin?.default?.configs?.flat?.["recommended-latest"] ??
  reactHooksPlugin?.default?.configs?.recommended ??
  {};

const hasReactCompilerRule =
  reactHooksPlugin?.rules?.["react-compiler"] ??
  reactHooksPlugin?.default?.rules?.["react-compiler"];

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  reactHooksConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...(hasReactCompilerRule
        ? {
            "react-hooks/react-compiler": "error",
          }
        : {}),
    },
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
];
