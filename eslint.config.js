import globals from "globals";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

export default [
  // ESLint's recommended rules for general JS files
  js.configs.recommended,

  // TypeScript-specific configurations
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply to TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json", // Point to the new tsconfig for ESLint
        ecmaVersion: 2022, // Corresponds to original ecmaVersion: 13
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Apply recommended TypeScript rules
      // Any additional TypeScript-specific rules can go here
    },
  },

  // Configuration for Web Workers
  {
    files: ["src/workers/*.ts"],
    languageOptions: {
      globals: {
        ...globals.worker, // Add Web Worker globals
      },
    },
  },

  // Configuration for Test files (Jest globals)
  {
    files: ["tests/**/*.ts"], // Apply to test files
    languageOptions: {
      globals: {
        ...globals.jest, // Add Jest globals
      },
    },
  },

  // Prettier configuration (must be last to disable conflicting rules)
  prettierConfig,

  // General configuration for all files not ignored, or for files not covered by specific `files` arrays
  {
    languageOptions: {
      globals: {
        ...globals.es2021, // For ES2021 globals
        ...globals.node,   // For Node.js globals (process, module, console)
        ...globals.browser, // For browser globals (e.g., 'window')
      },
    },
    rules: {
      // Any general project-specific rules can go here
    },
  },

  // Ignore files that are not part of the project
  {
    ignores: ["dist/", "node_modules/", "esbuild.mjs", "jest.config.js", ".github/", ".specify/"],
  }
];
