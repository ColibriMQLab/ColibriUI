import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export type ListSize = "s" | "m" | "l";
export type ListDensity = "compact" | "normal";
export type ListSurface = "none" | "container" | "items";

export interface ListContextValue {
  disabled: boolean;
  dividers: boolean;
  surface: ListSurface;
}

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  ariaLabel?: string;
  density?: ListDensity;
  disabled?: boolean;
  dividers?: boolean;
  size?: ListSize;
  surface?: ListSurface;
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
