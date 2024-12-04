import type { MouseEvent } from "react";
import type { MenuVariant } from "../../index.props";

export interface MenuItemProps {
  className?: string;
  isSelected?: boolean;
  onClick?: (e: MouseEvent) => void;
  variant?: MenuVariant;
  disabled?: boolean;
}
