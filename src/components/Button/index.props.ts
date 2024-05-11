import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { CSSObject } from "@emotion/react";

type ButtonStyles = {
  color?: CSSObject["color"];
  backgroundColor?: CSSObject["backgroundColor"];
  borderColor?: CSSObject["borderColor"];
  boxShadow?: CSSObject["boxShadow"];
  borderWidth?: CSSObject["borderWidth"];
  border?: CSSObject["border"];
};

type ButtonState = {
  normal?: ButtonStyles;
  hover?: ButtonStyles;
  focus?: ButtonStyles;
  active?: ButtonStyles;
  disabled?: ButtonStyles;
};

export type ButtonVariant = {
  primary: ButtonState;
};

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  size?: "s" | "m" | "l";
}
