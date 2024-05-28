import { useMemo, isValidElement, Children, cloneElement } from "react";

import MenuItem from "./components/MenuItem";

import { MenuList } from "./styles";
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
  return <MenuList className={className}>{renderChild}</MenuList>;
};

Menu.Item = MenuItem;

export default Menu;
