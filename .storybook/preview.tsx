import React from "react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "@emotion/react";
import { Global, css } from "@emotion/react";
import { THEMES } from "../src/components/Theme";
import type { Preview } from "@storybook/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: "Roboto", Arial, sans-serif;
        font-weight: 400;
        font-style: normal;
      }
      #storybook-root {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `}
  />
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        DEFAULT: THEMES.DEFAULT,
        BA: THEMES.BA,
      },
      defaultTheme: "DEFAULT",
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;
