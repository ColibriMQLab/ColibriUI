import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type { FC } from "react";
import type { MenuItemProps } from "./index.props";

const clx = classNames.bind(styles);

const MenuItem: FC<MenuItemProps> = ({
  className,
  isSelected = false,
  variant = "primary",
  disabled,
  onClick,
  children,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "#B8D2FF" : "" }}
      className={clx(
        {
          item: true,
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
};

export default MenuItem;
