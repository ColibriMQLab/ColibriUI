import type { Placement, Strategy } from "@floating-ui/react";
import type { ReactNode } from "react";
import type { PopupTestIdProps } from "../helpers/testId";
export type TooltipProps = PopupTestIdProps & {
  content: ReactNode;
  zIndex?: number;
  placement?: Placement;
  strategy?: Strategy;
  withTail?: boolean;
  className?: string;
};
