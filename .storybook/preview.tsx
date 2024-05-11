import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/components/Theme";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { THEME_BA } from "../src/components/Theme/themes/buenos_aires";
import { THEME_DEFAULT } from "../src/components/Theme/themes/default";

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
        default: THEME_DEFAULT,
        ba: THEME_BA,
      },
      defaultTheme: "default",
      Provider: ThemeProvider,
    }),
  ],
};

export default preview;
