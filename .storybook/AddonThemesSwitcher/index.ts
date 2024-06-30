import { addons, makeDecorator } from "@storybook/preview-api";

import { THEMES2 } from "../../src/components/Theme";
import { events, THEME_COOKIE } from "./constants";

const getThemeByName = (name) => {
  switch (name) {
    case "BA":
      return THEMES2.BA;
    case "DEFAULT":
      return THEMES2.DEFAULT;
    default:
      return THEMES2.DEFAULT;
  }
};

export const withThemesDecorator = makeDecorator({
  name: "withThemes",
  parameterName: "theme",
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const channel = addons.getChannel();

    channel.on(events.CHANGE, ({ name }) => {
      const theme = getThemeByName(name);
      // set CSS variables
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });

      // set selected theme to cookie
      document.cookie = `${THEME_COOKIE}=${name || "DEFAULT"}`;
    });

    return getStory(context);
  },
});

export default withThemesDecorator;
