import ESLINT_RULES from "@andrewt03/eslint-typescript-rules";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintImportPlugin from "eslint-plugin-import";

const DIR_NAME = import.meta.dirname;

export default [
  {
    ignores: ["**/dist"]
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.builtin,
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: DIR_NAME
      }
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      "@typescript-eslint": tseslint.plugin,
      "simple-import-sort": eslintPluginSimpleImportSort,
      import: eslintImportPlugin
    },
    rules: {
      // Standard ESLint Rules
      ...ESLINT_RULES.STANDARD_ESLINT_CONFIG_RULES,

      // TypeScript ESLint Rules
      ...ESLINT_RULES.TYPESCRIPT_ESLINT_CONFIG_RULES,

      // Unicorn ESLint Rules
      ...ESLINT_RULES.UNICORN_ESLINT_CONFIG_RULES,

      // ESLint Rules: Console/Debugger to "Error"
      ...ESLINT_RULES.CONSOLE_DEBUGGER_ERROR_ESLINT_CONFIG_RULES,

      // ESLint Rules: Sorting Imports
      ...ESLINT_RULES.SORT_IMPORT_ESLINT_CONFIG_RULES

      // TODO: Add more ESLint rules here for personal customization (or you can override existing rules manually based on project/team development norms)
    }
  }
];
