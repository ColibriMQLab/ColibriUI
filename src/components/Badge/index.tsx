import React from "react";
import classNames from "classnames/bind";
import { BadgeControl as Control } from "./Control";
import styles from "./Badge.module.scss";
import type { FC } from "react";
import type { Props } from "./index.props";

const clx = classNames.bind(styles);

const Badge: FC<Props> = ({
  className,
  content,
  children,
  invisible: invisibleProp,
  max = 99,
  showZero = false,
  color,
  direction = "right",
  background,
  ...props
}) => {
  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((content === 0 && !showZero) || content == null)
  ) {
    invisible = true;
  }

  let displayValue;

  if (content) {
    displayValue = content > max ? `${max}+` : content;
  }

  return (
    <Control {...props}>
      {children}
      <span
        style={{
          color,
          backgroundColor: background,
        }}
        className={clx(
          {
            root: true,
            [`root_direction_${direction}`]: !!direction,
            root_invisible: invisible,
          },
          className,
        )}
        data-testid="badge"
      >
        {displayValue}
      </span>
    </Control>
  );
};

export default Badge;
