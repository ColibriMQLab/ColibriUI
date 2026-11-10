import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

export type ListSize = "s" | "m" | "l";
export type ListDensity = "compact" | "normal";
export type ListSurface = "none" | "container" | "items";

export interface ListLinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href" | "onClick" | "aria-current"
  > {
  /** `undefined` for a disabled item. */
  href?: string;
  className: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  "aria-current"?: "page";
}

/** Renders an item link, for example a router `Link`. Pass every prop to the element. */
export type ListRenderLink = (props: ListLinkProps) => ReactNode;

export interface ListContextValue {
  disabled: boolean;
  dividers: boolean;
  surface: ListSurface;
  renderLink?: ListRenderLink;
}

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  ariaLabel?: string;
  density?: ListDensity;
  disabled?: boolean;
  dividers?: boolean;
  size?: ListSize;
  surface?: ListSurface;
  /** Custom link for items with `href`. Defaults to `<a href>`. */
  renderLink?: ListRenderLink;
}

export interface ListItemBaseProps {
  children: ReactNode;
  className?: string;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

export interface ListItemStaticProps
  extends ListItemBaseProps,
    Omit<HTMLAttributes<HTMLLIElement>, "children" | "onClick"> {
  href?: never;
  onAction?: never;
}

export interface ListItemButtonProps
  extends ListItemBaseProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "children" | "disabled" | "onClick"
    > {
  href?: never;
  onAction: () => void;
}

export interface ListItemLinkProps
  extends ListItemBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  href: string;
  onAction?: () => void;
  /** Custom link. Overrides `renderLink` of the `List`. Defaults to `<a href>`. */
  renderLink?: ListRenderLink;
}

export type ListItemProps =
  | ListItemStaticProps
  | ListItemButtonProps
  | ListItemLinkProps;

export interface ListSectionProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  children: ReactNode;
  title?: ReactNode;
}
