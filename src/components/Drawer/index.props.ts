import type {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";

export type DrawerPlacement = "top" | "right" | "bottom" | "left";
export type DrawerClosePlacement = "left" | "right";

export interface DrawerAnimationInfo {
  enter?: string;
  exit?: string;
}

export interface DrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart"> {
  opened: boolean;
  placement?: DrawerPlacement;
  width?: string | number;
  height?: string | number;
  offset?: [string | number, string | number];
  zIndex?: string | number;
  asModal?: boolean;
  withBlur?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  borderRadius?: "none" | "default";
  customBackgroundColor?: string;
  customContentBackgroundColor?: string;
  animationInfo?: DrawerAnimationInfo;
  initialFocusRef?: RefObject<HTMLElement | null>;
  focusAfterRef?: RefObject<HTMLElement | null>;
  portalContainer?: HTMLElement | null;
  onClose?: () => void;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode;
  hasClose?: boolean;
  closePlacement?: DrawerClosePlacement;
  closeAriaLabel?: string;
  onClose?: () => void;
}

export type DrawerContentProps = HTMLAttributes<HTMLDivElement>;
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;
