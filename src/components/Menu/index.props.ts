import type { ReactElement, MouseEvent, FC } from "react";
import type { MenuItemProps } from "./components/MenuItem/index.props";

export type MenuVariant = "primary";

export type Props = {
  selected?: string[];
  variant?: MenuVariant;
  className?: string;
  onClick?: (key: string, e: MouseEvent) => void;
  children?: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
};
