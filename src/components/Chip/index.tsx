import React from "react";
import classNames from "classnames/bind";
import styles from "./Chip.module.scss";
import type { ChipProps } from "./index.props";
import type { FC, PropsWithChildren } from "react";

const clx = classNames.bind(styles);

const Chip: FC<PropsWithChildren<ChipProps>> = ({
  children,
  iconEnd,
  isActive,
  onClick,
  onClickIcon,
  size = "m",
  testID = "chip",
  ...props
}) => (
  <span className={clx("chip")} data-testid={testID} {...props}>
    <span
      className={clx("inner", {
        inner_active: iconEnd || isActive,
        inner_inactive: !iconEnd && !isActive,
      })}
      data-size={size}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span
        className={clx("content")}
        aria-pressed={isActive}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <span className={clx("content-inner")}>{children}</span>
      </span>
      {iconEnd && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <span
          className={clx("icon-right")}
          role="button"
          tabIndex={0}
          onClick={onClickIcon}
        >
          {iconEnd}
        </span>
      )}
    </span>
  </span>
);

export default Chip;
