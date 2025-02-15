import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "pseudo"
  | "alert"
  | "success"
  | "clear";
export type ButtonSize = "xs" | "s" | "m" | "l";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  ref?: React.Ref<HTMLButtonElement>;
}
