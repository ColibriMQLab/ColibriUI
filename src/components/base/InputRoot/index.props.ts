import type { CSSProperties, ReactNode } from "react";
import type { PropsWithChildren } from "react";

export type Size = "s" | "m" | "l";

export type Variant = "primary";

export type InputProps = PropsWithChildren<{
  variant?: Variant;
  disabled: boolean;
  error?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: Size;
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}>;
