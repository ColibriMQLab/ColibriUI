import type { ReactNode } from "react";
import type { ControlProps } from "./Control/index.props";

export interface BadgeProps extends ControlProps {
  className?: string;
  color?: string;
  background?: string;
  content?: number;
  children: ReactNode;
  invisible?: boolean;
  max?: number;
  showZero?: boolean;
  direction?: "right" | "left";
}
