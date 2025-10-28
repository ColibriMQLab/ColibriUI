import React, { useMemo, isValidElement, Children, cloneElement } from "react";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import type { Props } from "./index.props";
import type { KeyboardEvent, MouseEvent } from "react";

const Menu = ({
  selected,
  variant,
  className,
  onClick,
  children,
  ref,
}: Props) => {
  const renderChild = useMemo(
    () =>
      Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        const childKey = child.key ? String(child.key) : null;
        const isSelected =
          selected && childKey ? selected.includes(childKey) : undefined;

        const onClickHandler = (event: MouseEvent | KeyboardEvent) => {
          child.props.onClick?.(event);
          if (onClick && childKey) onClick(childKey, event);
        };

        return cloneElement(child, {
          isSelected,
          onClick: onClickHandler,
          variant,
        });
      }),
    [children, selected, onClick, variant],
  );

  return (
    <ul ref={ref} className={clsx(styles.menu, className)} role="menu">
      {renderChild}
    </ul>
  );
};

export default Menu;
