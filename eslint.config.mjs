import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginImportOrder from "eslint-plugin-import";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: eslintPluginImportOrder,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
        },
      ],
    },
  },
  {
    ignores: [
      ".git/*",
      "dist/*",
      ".storybook",
      "scripts/*",
      "node_modules/*",
      "storybook-static/*",
      "**/*.stories.tsx",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
    ],
  },
];
