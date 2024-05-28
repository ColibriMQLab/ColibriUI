import React from "react";
import { Item } from "./styles";
import type { FC } from "react";

import type { MenuItemProps } from "./index.props";

const MenuItem: FC<MenuItemProps> = ({
  className,
  isSelected = false,
  variant = "primary",
  disabled,
  onClick,
  children,
}) => {
  return (
    <Item
      isSelected={isSelected}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      className={className}
    >
      {children}
    </Item>
  );
};

export default MenuItem;
