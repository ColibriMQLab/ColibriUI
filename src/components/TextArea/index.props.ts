import type {
  ChangeEvent,
  ForwardedRef,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export interface ITextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "style"
  > {
  minRows?: number;
  maxRows?: number;
  value?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
  required?: boolean;
  onChange?: (value: string, e: ChangeEvent<HTMLTextAreaElement>) => void;
  inputRef?: ForwardedRef<HTMLTextAreaElement>;
  ref?: React.Ref<HTMLDivElement>;
}
