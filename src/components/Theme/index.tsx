import type { FC, ReactNode } from "react";
import React, { useMemo, createContext, useContext } from "react";

import globalStyles from "./globalStyles";
import type { BreakpointsTheme } from "./breakpoints";
import breakpoints from "./breakpoints";
import type { ButtonTheme } from "./button";
import button from "./button";

export type Theme = {
  breakpoints: BreakpointsTheme;
  button: ButtonTheme;
};

const THEME: Theme = {
  breakpoints,
  button,
};

type ThemeContextType = {
  theme: Theme;
};

const defaultContext = { theme: THEME };

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={defaultContext}>
    {globalStyles}
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => {
  const { theme: _theme } = useContext<ThemeContextType>(ThemeContext);

  return useMemo(() => _theme, [_theme]);
};

export default THEME;
