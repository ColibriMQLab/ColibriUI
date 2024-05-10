import React, { FC, useMemo, createContext, useContext, ReactNode } from 'react';

import globalStyles from './globalStyles';
import breakpoints, { BreakpointsTheme } from './breakpoints';
import button, { ButtonTheme } from './button';

export type Theme = {
    breakpoints: BreakpointsTheme;
    button: ButtonTheme;
}

const THEME: Theme = {
    breakpoints,
    button
};

type ThemeContextType = {
    theme: Theme;
}

const defaultContext = { theme: THEME };

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => (
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
