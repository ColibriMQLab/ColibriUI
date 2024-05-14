import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider, THEMES } from "../src/components/Theme";
import type { Preview } from "@storybook/react";

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
    }),
  ],
};

export default preview;
