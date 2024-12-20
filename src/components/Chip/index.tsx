import React from "react";
import classNames from "classnames/bind";
import styles from "./Chip.module.scss";
import type { ChipProps } from "./index.props";
import type { FC, PropsWithChildren } from "react";

const clx = classNames.bind(styles);

const Chip: FC<PropsWithChildren<ChipProps>> = (props) => {
  const {
    children,
    iconOnRight,
    isActive,
    onClick,
    onIconOnRightClick,
    size = "m",
    testID = "chip",
  } = props;

  return (
    <span className={clx("root")} data-testid={testID}>
      <span
        className={clx("inner", {
          inner_active: iconOnRight || isActive,
          inner_inactive: !iconOnRight && !isActive,
        })}
        data-size={size}
      >
        <span className={clx("content")} onClick={onClick}>
          <span className={clx("content-inner")}>{children}</span>
        </span>
        {iconOnRight && (
          <span
            className={clx("icon-right")}
            onClick={onIconOnRightClick || onClick}
          >
            {iconOnRight}
          </span>
        )}
      </span>
    </span>
  );
};

export default Chip;
