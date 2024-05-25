import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { CSSObject } from "@emotion/react";

export enum VARIANT {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  PSEUDO = "pseudo",
  CLEAR = "clear",
}

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
  [VARIANT.PRIMARY]: VariantStates;
  [VARIANT.SECONDARY]: VariantStates;
  [VARIANT.PSEUDO]: VariantStates;
  [VARIANT.CLEAR]: VariantStates;
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
