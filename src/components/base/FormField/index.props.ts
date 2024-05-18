import { ReactNode } from "react";

export type FormFieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
  className?: string;
  children: ReactNode;
}
