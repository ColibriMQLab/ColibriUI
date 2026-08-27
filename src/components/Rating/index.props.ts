import type { HTMLAttributes, ReactNode } from "react";

export type RatingSize =
  | "xxs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "displayS"
  | "displayM"
  | "displayL";

export type RatingView = "default" | "accent";

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  value?: number | null;
  hasValue?: boolean;
  precision?: number;
  decimalSeparator?: string;
  valuePlacement?: "before" | "after";
  iconSlot?: ReactNode;
  iconSlotOutline?: ReactNode;
  iconSlotHalf?: ReactNode;
  hasIcons?: boolean;
  iconQuantity?: 1 | 5 | 10;
  helperText?: string;
  helperTextStretching?: "fixed" | "filled";
  size?: RatingSize;
  view?: RatingView | string;
  fillColor?: string;
  outlineColor?: string;
}
