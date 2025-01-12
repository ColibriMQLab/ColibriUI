import React, { useMemo, isValidElement, Children, cloneElement } from "react";

import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import type { Props } from "./index.props";
import type { MouseEvent } from "react";

const clx = classNames.bind(styles);

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
  return (
    <ul ref={ref} className={clx("menu", className)}>
      {renderChild}
    </ul>
  );
};

export default Menu;
