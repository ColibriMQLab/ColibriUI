import type { CSSProperties, ReactNode } from "react";

export type Size = "s" | "m" | "l";

export type Variant = "primary";

export type InputProps = {
  variant?: Variant;
  disabled: boolean;
  error?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: Size;
  style?: CSSProperties;
};
