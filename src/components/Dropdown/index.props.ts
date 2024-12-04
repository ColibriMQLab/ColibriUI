import type { ReactNode } from "react";
import type { PositioningStrategy } from "@popperjs/core";

import type { Placement as PopperPlacement } from "@popperjs/core";

export type Placement = Extract<
  PopperPlacement,
  "bottom-start" | "bottom" | "bottom-end"
>;

export type Trigger = "click" | "hover" | "focus";

export type DropdownProps = {
  zIndex?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  overlay: ReactNode;
  placement?: Placement;
  strategy?: PositioningStrategy;
  trigger?: [Trigger, ...Trigger[]];
  visible?: boolean;
  preventOverflow?: boolean;
  samewidth?: boolean;
};
