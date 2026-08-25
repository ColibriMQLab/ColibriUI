import type { ControlProps } from "./Control/index.props";

export interface Props extends ControlProps {
  className?: string;
  content?: number;
  invisible?: boolean;
  max?: number;
  showZero?: boolean;
  direction?: "right" | "left";
}
