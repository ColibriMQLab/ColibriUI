import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { CSSObject } from "@emotion/react";

export enum SIZE {
  S = "s",
  M = "m",
  L = "l",
}

export enum VARIANT {
  PRIMARY = "primary",
  DEFAULT = "default",
  CLEAR = "clear",
}

type BaseStyles = {
  color: CSSObject["color"];
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
  hover?: VariantStyles;
  focus?: VariantStyles;
  active?: VariantStyles;
  disabled?: VariantStyles;
};

export type ButtonBase = {
  base: BaseStyles;
};

export type ButtonVariant = {
  [VARIANT.DEFAULT]: VariantStates;
  [VARIANT.PRIMARY]: VariantStates;
  [VARIANT.CLEAR]: VariantStates;
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  size?: SIZE;
}
