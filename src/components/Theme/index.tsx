import type { FC, ReactNode } from "react";
import type { Theme } from "@emotion/react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import globalStyles from "./global";

export const ThemeProvider: FC<{
  children: ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}> = ({ children, theme }) => (
  <EmotionThemeProvider theme={theme}>
    {globalStyles}
    {children}
  </EmotionThemeProvider>
);
