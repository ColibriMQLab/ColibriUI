import type { HTMLAttributes, ReactNode } from "react";

export type ProgressSize = "s" | "m" | "l";
export type ProgressBarSize = "2" | "4" | "6" | "8";
export type ProgressView =
  | "default"
  | "secondary"
  | "accent"
  | "accentGradient"
  | "info"
  | "positive"
  | "warning"
  | "negative";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  hasValue?: boolean;
  view?: ProgressView | string;
  size?: ProgressSize | string;
  progressSize?: ProgressBarSize | string;
  label?: string;
  labelIcon?: ReactNode;
  labelTextPlacement?: "left" | "right" | "none";
  labelPlacement?: "top" | "left" | "none";
  valuePlacement?: "top" | "right" | "none";
  valueAlign?: "start" | "center" | "end";
  caption?: string;
}
