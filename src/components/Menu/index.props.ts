import type { ReactElement, MouseEvent, FC } from "react";
import type MenuItem from "./components/MenuItem";
import type { MenuItemProps } from "./components/MenuItem/index.props";

export type MenuVariant = "primary";

type Props = {
  selected?: string[];
  variant?: MenuVariant;
  className?: string;
  onClick?: (key: string, e: MouseEvent) => void;
  children?: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
};

export interface MenuProps extends FC<Props> {
  Item: typeof MenuItem;
}
