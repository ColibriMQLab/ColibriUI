import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import type { FormFieldProps } from "../base/FormField/index.props";
import type { Size, Variant } from "../base/InputRoot/index.props";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">,
    Omit<FormFieldProps, "children"> {
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
  required?: boolean;
}
