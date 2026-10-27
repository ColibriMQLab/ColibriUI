import type { ReactElement, KeyboardEvent, MouseEvent } from "react";
import type { MenuItemProps } from "./components/MenuItem/index.props";
import type { TestIdProps } from "../helpers/testId";

export type MenuVariant = "primary";

export type Props = TestIdProps & {
  selected?: string[];
  variant?: MenuVariant;
  className?: string;
  onClick?: (key: string, e: MouseEvent | KeyboardEvent) => void;
  children?: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
  ref?: React.Ref<HTMLUListElement>;
};
