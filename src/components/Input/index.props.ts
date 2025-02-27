import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import type { FormFieldProps } from "../base/FormField/index.props";
import type { Size, Variant } from "../base/InputRoot/index.props";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">,
    Omit<FormFieldProps, "children"> {
  endIcon?: ReactNode;
  hasError?: boolean;
  hint?: ReactNode;
  inputRef?: ForwardedRef<HTMLInputElement>;
  label?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  ref?: Ref<HTMLInputElement>;
  required?: boolean;
  size?: Size;
  startIcon?: ReactNode;
  variant?: Variant;
}
