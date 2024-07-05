import type { ReactNode } from "react";

export interface CheckboxProps {
  variant?: "primary";
  size?: "s" | "m" | "l";
  id?: string;
  name?: string;
  value?: string | number;
  label?: ReactNode;
  hint?: ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  isError?: boolean;
}
