import type { ReactNode } from "react";
import type { Placement, Strategy } from "@floating-ui/react";

export type Trigger = "click" | "hover" | "focus";

export type DropdownProps = {
  zIndex?: number;
  fontSize?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  overlay: ReactNode;
  placement?: Placement;
  strategy?: Strategy;
  trigger?: [Trigger, ...Trigger[]];
  visible?: boolean;
  preventOverflow?: boolean;
  preventAutoClose?: boolean;
  flip?: boolean;
  samewidth?: boolean;
};
