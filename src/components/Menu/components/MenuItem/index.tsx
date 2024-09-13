import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type { MenuItemProps } from "./index.props";

const clx = classNames.bind(styles);

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      className,
      isSelected,
      variant = "primary",
      disabled,
      onClick,
      children,
    }: MenuItemProps,
    ref,
  ) => (
    <li
      ref={ref}
      data-component="menu-item"
      style={{
        backgroundColor: isSelected ? "var(--palette-primary-1)" : "",
      }}
      className={clx(
        "item",
        {
          item_disabled: !!disabled,
          [`item_variant_${variant}`]: !!variant,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </li>
  ),
);

export default MenuItem;
