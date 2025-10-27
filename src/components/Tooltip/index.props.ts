import type { Placement, Strategy } from "@floating-ui/react";
import type { ReactNode } from "react";
export type TooltipProps = {
  content: ReactNode;
  zIndex?: number;
  placement?: Placement;
  strategy?: Strategy;
  withTail?: boolean;
  className?: string;
};
