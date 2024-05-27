import { defineConfig } from "cypress";
import { devServer } from "@cypress/webpack-dev-server";

export default defineConfig({
  component: {
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: "react",
        webpackConfig: require("./cypress/webpack.config.ts"),
      });
    },
    video: false,
    screenshotOnRunFailure: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
