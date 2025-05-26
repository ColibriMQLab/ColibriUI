import type { InputHTMLAttributes, ReactNode } from "react";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  variant?: "primary";
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  hint?: ReactNode;
  hasError?: boolean;
  label?: ReactNode;
}
