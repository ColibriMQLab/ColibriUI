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

          const onClickHandler = (event: MouseEvent) => {
            if (child.props.onClick) child.props.onClick(event);
            if (onClick && child.key) onClick(child.key.toString(), event);
          };

          return cloneElement(child, {
            isSelected,
            onClick: onClickHandler,
            variant,
          });
        }
        return child;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, selected, onClick],
  );
  return (
    <ul ref={ref} className={clx(styles.menu, className)}>
      {renderChild}
    </ul>
  );
};

export default Menu;
