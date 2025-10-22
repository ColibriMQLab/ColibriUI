import type { Size } from "../index.props";
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";

export type TabProps = {
  id?: string;
  active?: boolean;
  disabled?: boolean;
  content?: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  innerRef?: RefObject<HTMLLIElement | null>;
  className?: string;
  tabIndex?: number;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  size?: Size;
};
