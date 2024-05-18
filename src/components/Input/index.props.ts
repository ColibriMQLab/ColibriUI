import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { FormFieldProps } from "../base/FormField/index.props";
import { InputSize, InputVariant } from "../base/InputRoot/index.props";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">,
    Omit<FormFieldProps, "children"> {
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  variant?: keyof InputVariant;
  size?: InputSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
}
