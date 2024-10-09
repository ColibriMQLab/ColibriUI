import type { ReactNode } from "react";

export type FormFieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
  required?: boolean;
  className?: string;
  children: ReactNode;
};
