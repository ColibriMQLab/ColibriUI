import React from "react";
import classNames from "classnames/bind";
import styles from "./Chip.module.scss";
import type { FC, ReactNode } from "react";

const clx = classNames.bind(styles);

type Size = "s" | "m" | "l" | string;

type Props = {
  size?: Size;
  testID?: string;
  isActive?: boolean;
  iconOnRight?: React.ReactNode;
  onClick?: () => void;
  onIconOnRightClick?: () => void;
  children?: ReactNode;
};

const Chip: FC<Props> = (props) => {
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
    <span className={clx("root")} data-component="Chip" data-testid={testID}>
      <span
        className={clx("inner", {
          inner_active: isActive,
          inner_inactive: !isActive,
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
