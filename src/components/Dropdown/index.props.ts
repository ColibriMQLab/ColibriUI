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
  fontSize?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  overlay: ReactNode;
  placement?: Placement;
  strategy?: PositioningStrategy;
  trigger?: [Trigger, ...Trigger[]];
  visible?: boolean;
  preventOverflow?: boolean;
  preventAutoClose?: boolean;
  flip?: boolean;
  samewidth?: boolean;
};
