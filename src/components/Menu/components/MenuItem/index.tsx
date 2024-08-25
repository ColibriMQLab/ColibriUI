import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type { FC } from "react";
import type { MenuItemProps } from "./index.props";

const clx = classNames.bind(styles);

const MenuItem: FC<MenuItemProps> = ({
  className,
  isSelected,
  variant = "primary",
  disabled,
  onClick,
  children,
}) => (
  <li
    style={{
      backgroundColor: isSelected
        ? "var(--palette-primary-1)"
        : "var(--palette-white)",
    }}
    className={clx(
      styles.item,
      {
        disabled: disabled,
        [`variant_${variant}`]: !!variant,
      },
      className,
    )}
    onClick={onClick}
  >
    {children}
  </li>
);

export default MenuItem;
