import React, { FC } from "react";

import { MenuItemProps } from "./index.props";
import { Item } from "./styles";

const MenuItem: FC<MenuItemProps> = ({
  className,
  isSelected = false,
  variant = 'primary',
  disabled,
  onClick,
  children,
}) => {
  return (
    <Item isSelected={isSelected} disabled={disabled} variant={variant} onClick={onClick} className={className}>
      {children}
    </Item>
  );
};

export default MenuItem;
