import type { FocusEvent, ChangeEvent, ReactNode } from "react";
import type { TestIdProps } from "../helpers/testId";

export interface CheckboxProps extends TestIdProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  hint?: ReactNode;
  id?: string;
  label?: ReactNode;
  name?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  size?: "s" | "m" | "l";
  value?: string | number;
  variant?: "primary";
}
