import React, { useMemo, isValidElement, Children, cloneElement } from "react";

import classNames from "classnames";
import MenuItem from "./components/MenuItem";

import styles from "./Menu.module.scss";
import type { MenuProps } from "./index.props";
import type { MouseEvent } from "react";

const Menu: MenuProps = ({
  selected,
  variant,
  className,
  onClick,
  children,
}) => {
  const renderChild = useMemo(
    () =>
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          const isSelected = selected
            ? selected.includes(String(child.key))
            : undefined;

          const onClickHandler = (e: MouseEvent) => {
            if (child.props.onClick) child.props.onClick(e);
            if (onClick && child.key) onClick(child.key.toString(), e);
          };

          return cloneElement(child, {
            isSelected,
            onClick: onClickHandler,
            variant,
          });
        }
        return child;
      }),
    [children, selected, onClick],
  );
  return <ul className={classNames(styles.menu, className)}>{renderChild}</ul>;
};

Menu.Item = MenuItem;

export default Menu;
