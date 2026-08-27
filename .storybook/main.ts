import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration, RuleSetRule, RuleSetUseItem } from "webpack";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const configureSassLoader = (useItem: RuleSetUseItem): RuleSetUseItem => {
  if (!isObject(useItem) || !String(useItem.loader).includes("sass-loader")) {
    return useItem;
  }

  const options = isObject(useItem.options) ? useItem.options : {};
  const sassOptions = isObject(options.sassOptions) ? options.sassOptions : {};

  return {
    ...useItem,
    options: {
      ...options,
      api: "modern",
      sassOptions: {
        ...sassOptions,
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  };
};

const createScssRule = (modules: boolean): RuleSetRule => ({
  test: modules ? /\.module\.s[ac]ss$/i : /\.s[ac]ss$/i,
  exclude: modules ? undefined : /\.module\.s[ac]ss$/i,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: modules
          ? {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            }
          : false,
      },
    },
    "postcss-loader",
    {
      loader: "sass-loader",
      options: {
        api: "modern",
        sassOptions: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  ],
});

const configureSassRule = (rule: RuleSetRule): RuleSetRule => {
  if (Array.isArray(rule.use)) {
    return {
      ...rule,
      use: rule.use.map(configureSassLoader),
    };
  }

  if (rule.use) {
    return {
      ...rule,
      use: configureSassLoader(rule.use),
    };
  }

  return rule;
};

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../static"],
  webpackFinal: async (webpackConfig: Configuration) => ({
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        createScssRule(true),
        createScssRule(false),
        ...(webpackConfig.module?.rules?.map((rule) =>
          isObject(rule) ? configureSassRule(rule) : rule
        ) ?? []),
      ],
    },
  }),
};
export default config;
