import type {
  InputVariant,
  PlaceholderProps,
} from "../base/InputRoot/index.props";
import type { CheckboxVariant } from "../Checkbox/index.props";
import type { ColorsTheme } from "./color";
import type { BreakpointsTheme } from "./breakpoints";
import type { ButtonBase, ButtonVariant } from "../Button/index.props";
import type { TypographyVariant } from "../Typography/index.props";
import type { SwitchStates } from "../Switch/index.props";

export type ThemeProps = {
  button: ButtonVariant & ButtonBase;
  checkbox: CheckboxVariant;
  breakpoints: BreakpointsTheme;
  typography: TypographyVariant;
  input: InputVariant & PlaceholderProps;
  switch: SwitchStates;
  palette: ColorsTheme;
};
