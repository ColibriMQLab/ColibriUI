import withTheme from "./AddonThemesSwitcher";
import type { Preview } from "@storybook/react-webpack5";

const preview: Preview = {
  parameters: {
    themes: [
      { name: "BA", color: "#163300" },
      { name: "JAIPUR", color: "#2C2242", default: true },
    ],
  },
  decorators: [withTheme],
};

export default preview;
