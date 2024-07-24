import type { InputHTMLAttributes } from "react";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  variant?: "primary";
  disabled?: boolean;
}
