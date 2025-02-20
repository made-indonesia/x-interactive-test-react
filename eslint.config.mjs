import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  ...compat.config({
    plugins: [
      "@typescript-eslint",
      "sort-keys",
      "sort-destructure-keys",
      "typescript-sort-keys",
    ],
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "sort-keys": 0,
      "sort-keys/sort-keys-fix": 1,
      "typescript-sort-keys/interface": "error",
      "sort-destructure-keys/sort-destructure-keys": [
        "error",
        { caseSensitive: false },
      ],
      "@typescript-eslint/sort-type-constituents": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-interface": "error",
      "react/prop-types": ["off"],
    },
  }),
];

export default eslintConfig;
