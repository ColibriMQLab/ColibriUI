import type { KeyboardEvent, MouseEvent } from "react";
import type { MenuVariant } from "../../index.props";
import type { TestIdProps } from "../../../helpers/testId";

export interface MenuItemProps extends TestIdProps {
  className?: string;
  isSelected?: boolean;
  onClick?: (event: MouseEvent<Element> | KeyboardEvent<Element>) => void;
  variant?: MenuVariant;
  disabled?: boolean;
  ref?: React.Ref<HTMLLIElement>;
  onMouseEnter?: () => void;
}
