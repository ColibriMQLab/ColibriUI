import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { CSSObject } from "@emotion/react";

type BaseStyles = {
  color?: CSSObject["color"];
  borderRadius: CSSObject["borderRadius"];
  border?: CSSObject["border"];
};

type VariantStyles = {
  color?: CSSObject["color"];
  backgroundColor?: CSSObject["backgroundColor"];
  borderColor?: CSSObject["borderColor"];
  boxShadow?: CSSObject["boxShadow"];
  borderWidth?: CSSObject["borderWidth"];
  borderRadius?: CSSObject["borderRadius"];
  border?: CSSObject["border"];
};

type VariantStates = {
  normal?: VariantStyles;
  hovered?: VariantStyles;
  focused?: VariantStyles;
  active?: VariantStyles;
  disabled?: VariantStyles;
};

export type ButtonBase = {
  base: BaseStyles;
};

export type ButtonVariant = {
  "primary": VariantStates;
  "secondary": VariantStates;
  "pseudo": VariantStates;
  "clear": VariantStates;
};

export type ButtonSize = "xs" | "s" | "m" | "l";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  size?: ButtonSize;
}
