import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type { PropsWithChildren } from "react";
import type { MenuItemProps } from "./index.props";

const clx = classNames.bind(styles);

const MenuItem = ({
  className,
  isSelected,
  variant = "primary",
  disabled,
  onClick,
  children,
  ref,
}: PropsWithChildren<MenuItemProps>) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <li
    ref={ref}
    style={{
      backgroundColor: isSelected
        ? "var(--palette-bg-2, rgb(232, 240, 254))"
        : "",
    }}
    aria-label="MenuItem"
    data-testid="menuitem"
    aria-disabled={disabled}
    className={clx(
      "item",
      {
        item_disabled: !!disabled,
        [`item_variant_${variant}`]: !!variant,
      },
      className,
    )}
    onClick={!disabled ? onClick : undefined}
  >
    {children}
  </li>
);

export default MenuItem;
