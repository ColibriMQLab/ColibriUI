import type { ReactNode } from "react";
import type { Placement, Strategy } from "@floating-ui/react";

export type Trigger = "click" | "hover" | "focus";

export type DropdownProps = {
  defaultVisible?: boolean;
  disabled?: boolean;
  flip?: boolean;
  fontSize?: number;
  onVisibleChange?: (visible: boolean) => void;
  overlay: ReactNode;
  placement?: Placement;
  preventOverflow?: boolean;
  preventAutoClose?: boolean;
  samewidth?: boolean;
  strategy?: Strategy;
  trigger?: [Trigger, ...Trigger[]];
  visible?: boolean;
  zIndex?: number;
};
