import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

/** `overflow` keeps items in a row and moves the rest to "More", `scroll` is a horizontal strip. */
export type NavigationMenuLayout = "overflow" | "scroll";
export type NavigationMenuSize = "s" | "m";

export interface NavigationMenuItem {
  /** Unique key. Defaults to `href`, then to `label`. */
  id?: string;
  label: string;
  href?: string;
  /** Current section: highlighted, gets `aria-current="page"` and never moves to "More". */
  active?: boolean;
  /** Icon before the label. */
  icon?: ReactNode;
}

export interface NavigationMenuLinkProps {
  item: NavigationMenuItem;
  className: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  tabIndex?: number;
  /** Set for links inside the "More" dropdown. */
  role?: "menuitem";
  "aria-current"?: "page";
}

/** Renders an item link, for example a router `Link`. Pass every prop except `item` to the element. */
export type NavigationMenuRenderLink = (
  props: NavigationMenuLinkProps,
) => ReactNode;

export interface NavigationMenuProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: NavigationMenuItem[];
  /** Always visible after `items`. */
  pinnedItems?: NavigationMenuItem[];
  /** Always inside "More", after the items that do not fit. In the `scroll` layout they end the strip. */
  moreItems?: NavigationMenuItem[];
  layout?: NavigationMenuLayout;
  size?: NavigationMenuSize;
  moreLabel?: ReactNode;
  /** Called on a click on any item, including the ones inside "More". */
  onItemClick?: (item: NavigationMenuItem) => void;
  /** Custom link. Defaults to `<a href>`. */
  renderLink?: NavigationMenuRenderLink;
}
