import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { type FC, type ReactNode } from "react";
import globalStyles from "./global";
import { THEME_DEFAULT } from "./themes/default";
import { THEME_BA } from "./themes/buenos_aires";
import type { ThemeProps } from "./index.props";

export const THEMES = {
  DEFAULT: THEME_DEFAULT,
  BA: THEME_BA,
};

export const ThemeProvider: FC<{
  children: ReactNode;
  theme: ThemeProps;
}> = ({ children, theme = THEME_DEFAULT }) => (
  <EmotionThemeProvider theme={theme}>
    {globalStyles}
    {children}
  </EmotionThemeProvider>
);
