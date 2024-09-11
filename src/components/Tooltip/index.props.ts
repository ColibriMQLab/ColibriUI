import type { ReactNode } from "react";
import type { PositioningStrategy } from "@popperjs/core";
import type { Placement as PopperPlacement } from "@popperjs/core";

export type Trigger = "hover";

export type Placement = Extract<
  PopperPlacement,
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "left-start"
  | "left"
  | "left-end"
>;

export interface ITooltipProps {
  children: ReactNode;
  content: ReactNode;
  zIndex?: number;
  placement?: Placement;
  strategy?: PositioningStrategy;
  withTail?: boolean;
}
