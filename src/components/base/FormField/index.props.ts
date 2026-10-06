import type { ReactNode } from "react";
import type { PropsWithChildren } from "react";

export type FormFieldProps = PropsWithChildren<{
  className?: string;
  hasError?: boolean;
  hint?: ReactNode;
  /** Id of the hint, referenced by the control's `aria-describedby`. */
  hintId?: string;
  /** Id of the control the label belongs to. */
  htmlFor?: string;
  label?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  required?: boolean;
}>;
