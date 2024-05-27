import { CSSObject } from "@emotion/react";
import { ReactElement, MouseEvent, FC } from "react";
import MenuItem from "./components/MenuItem";
import {
  MenuItemProps,
  MenuItemPalette,
} from "./components/MenuItem/index.props";

export interface MenuPalette {
  backgroundColor: CSSObject["backgroundColor"];
  item: MenuItemPalette;
}

type VariantStyles = {
  color?: CSSObject["color"];
  backgroundColor?: CSSObject["backgroundColor"];
};

type VariantStates = {
  normal?: VariantStyles;
  hovered?: VariantStyles;
  focused?: VariantStyles;
  selected?: VariantStyles;
  disabled?: VariantStyles;
};

export type MenuVariant = {
  "primary": VariantStates;
};

interface Props {
  selected?: string[];
  variant?: keyof MenuVariant;
  className?: string;
  onClick?: (key: string, e: MouseEvent) => void;
  children?: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
}

export interface MenuProps extends FC<Props> {
  Item: typeof MenuItem;
}
