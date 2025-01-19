import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginImportOrder from "eslint-plugin-import";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJSXA11Y from "eslint-plugin-jsx-a11y";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: eslintPluginImportOrder,
      "react-hooks": eslintPluginReactHooks,
      "jsx-a11y": eslintPluginJSXA11Y,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "react/display-name": "off",
      "react/prop-types": "off",
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
      "max-len": [
        "error",
        {
          code: 100,
          comments: 130,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreTrailingComments: true,
        },
      ],
      "import/no-extraneous-dependencies": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-shadow": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/no-unused-prop-types": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "arrow-body-style": ["error", "as-needed"],
      "jsx-a11y/label-has-associated-control": "error",
      "no-console": "error",
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
