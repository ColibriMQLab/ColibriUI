import type { HTMLAttributes, ReactNode, RefObject } from "react";

export type SheetSnapPoint =
  | number
  | `${number}px`
  | `${number}%`
  | `${number}vh`
  | `${number}dvh`;
export type SheetCloseReason = "overlay" | "escape" | "drag";

export interface SheetProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  open: boolean;
  onOpenChange: (open: boolean, reason?: SheetCloseReason) => void;
  /** Called once the closing animation has finished and the sheet is removed. */
  onClosed?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  snapPoints?: readonly SheetSnapPoint[];
  snapPoint?: SheetSnapPoint;
  defaultSnapPoint?: SheetSnapPoint;
  onSnapPointChange?: (snapPoint: SheetSnapPoint) => void;
  modal?: boolean;
  blurOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  draggable?: boolean;
  showHandle?: boolean;
  lockBodyScroll?: boolean;
  portalContainer?: HTMLElement | null;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  zIndex?: number;
}
