import React from "react";
import clsx from "clsx";
import styles from "./MenuItem.module.scss";
import type { PropsWithChildren } from "react";
import type { MenuItemProps } from "./index.props";

const MenuItem = ({
  className,
  isSelected,
  variant = "primary",
  disabled,
  onClick,
  children,
  onMouseEnter,
  ref,
  ...props
}: PropsWithChildren<MenuItemProps>) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (!disabled && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <li
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      data-testid="menuitem"
      aria-disabled={disabled || undefined}
      className={clsx(
        styles.item,
        {
          [styles["item_disabled"]]: Boolean(disabled),
          [styles["item_selected"]]: Boolean(isSelected),
          [styles[`item_variant_${variant}`]]: Boolean(variant),
        },
        className,
      )}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {children}
    </li>
  );
};

export default MenuItem;
