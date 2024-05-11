import type { BreakpointsTheme } from "./breakpoints";
import type { ButtonBase, ButtonVariant } from "../Button/index.props";

export type ThemeProps = {
  button: ButtonVariant & ButtonBase;
  breakpoints: BreakpointsTheme;
};
