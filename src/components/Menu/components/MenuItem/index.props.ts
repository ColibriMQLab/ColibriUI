import type { CSSObject } from "@emotion/react";
import type { ReactNode, MouseEvent } from "react";
import type { MenuVariant } from "../../index.props";

interface IStylesProps {
  color?: CSSObject["color"];
  backgroundColor: CSSObject["backgroundColor"];
}

export interface MenuItemPalette {
  normal: IStylesProps;
  hovered?: IStylesProps;
  focused?: IStylesProps;
  selected?: IStylesProps;
  disabled?: IStylesProps;
}

export interface MenuItemProps {
  children: ReactNode;
  className?: string;
  isSelected?: boolean;
  onClick?: (e: MouseEvent) => void;
  variant?: keyof MenuVariant;
  disabled?: boolean;
}
