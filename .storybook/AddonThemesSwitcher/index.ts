import { addons, makeDecorator } from "storybook/preview-api";

import { THEMES } from "../../src/components/Theme";
import { events, THEME_COOKIE } from "./constants";

const getThemeByName = (name) => {
  switch (name) {
    case "BA":
      return THEMES.BA;
    case "DEFAULT":
      return THEMES.DEFAULT;
    default:
      return THEMES.DEFAULT;
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

      document.cookie = `${THEME_COOKIE}=${name || "DEFAULT"}`;
    });

    const name = new Map(
      document.cookie.split("; ").map((keyValue) => keyValue.split("=")),
    ).get(THEME_COOKIE);

    channel.emit(events.CHANGE, { name });

    return getStory(context);
  },
});

export default withThemesDecorator;
