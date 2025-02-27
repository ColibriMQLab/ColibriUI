import type { ReactNode } from "react";
import type { PropsWithChildren } from "react";

export type FormFieldProps = PropsWithChildren<{
  className?: string;
  hasError?: boolean;
  hint?: ReactNode;
  label?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  required?: boolean;
}>;
