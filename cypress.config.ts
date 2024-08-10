import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: require("./cypress/webpack.config.ts"),
    },
    video: false,
    screenshotOnRunFailure: false,
  },
});
