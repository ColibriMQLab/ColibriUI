import React from "react";
import clsx from "clsx";
import styles from "./NavigationLink.module.scss";
import type {
  NavigationMenuItem,
  NavigationMenuLinkProps,
  NavigationMenuRenderLink,
} from "../../index.props";

interface NavigationLinkProps {
  item: NavigationMenuItem;
  /** `item` is a pill in the row, `option` is a line inside "More". */
  view?: "item" | "option";
  role?: "menuitem";
  onClick?: (item: NavigationMenuItem) => void;
  renderLink?: NavigationMenuRenderLink;
}

export const getLinkClassName = (
  view: NavigationLinkProps["view"] = "item",
  active?: boolean,
) => clsx(styles[view], { [styles[`${view}_selected`]]: active });

export const LinkContent = ({ item }: { item: NavigationMenuItem }) => (
  <>
    {item.icon && (
      <span className={styles.icon} aria-hidden="true">
        {item.icon}
      </span>
    )}
    <span>{item.label}</span>
  </>
);

export const NavigationLink = ({
  item,
  view,
  role,
  onClick,
  renderLink,
}: NavigationLinkProps) => {
  const props: NavigationMenuLinkProps = {
    item,
    className: getLinkClassName(view, item.active),
    children: <LinkContent item={item} />,
    onClick: onClick ? () => onClick(item) : undefined,
    role,
    "aria-current": item.active ? "page" : undefined,
  };

  if (renderLink) return <>{renderLink(props)}</>;

  return (
    <a
      href={item.href}
      className={props.className}
      onClick={props.onClick}
      role={role}
      aria-current={props["aria-current"]}
    >
      {props.children}
    </a>
  );
};
