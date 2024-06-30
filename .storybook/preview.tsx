import withTheme from "./AddonThemesSwitcher";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    themes: [
      { name: "BA", color: "#ffdc82" },
      { name: "DEFAULT", color: "#ccc", default: true },
    ],
  },
  decorators: [withTheme],
};

export default preview;
