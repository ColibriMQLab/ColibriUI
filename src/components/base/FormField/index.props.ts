import type { ReactNode } from "react";
import type { PropsWithChildren } from "react";

export type FormFieldProps = PropsWithChildren<{
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
  required?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}>;
