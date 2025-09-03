import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  FocusEvent,
  KeyboardEvent,
  FormEvent,
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
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
  required?: boolean;
  size?: Size;
  startIcon?: ReactNode;
  variant?: Variant;
}
