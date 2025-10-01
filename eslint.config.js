import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs["flat/recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
