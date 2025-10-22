import type { KeyboardEvent, MouseEvent } from "react";
import type { MenuVariant } from "../../index.props";

export interface MenuItemProps {
  className?: string;
  isSelected?: boolean;
  onClick?: (event: MouseEvent<Element> | KeyboardEvent<Element>) => void;
  variant?: MenuVariant;
  disabled?: boolean;
  ref?: React.Ref<HTMLLIElement>;
  onMouseEnter?: () => void;
}
