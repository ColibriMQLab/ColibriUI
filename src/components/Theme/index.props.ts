import type { BreakpointsTheme } from "./breakpoints";
import type { ButtonBase, ButtonVariant } from "../Button/index.props";
import type { TypographyVariant } from "../Typography/index.props";
import type { SwitchStates } from "../Switch/index.props";

export type ThemeProps = {
  button: ButtonVariant & ButtonBase;
  breakpoints: BreakpointsTheme;
  typography: TypographyVariant;
  switch: SwitchStates;
};
