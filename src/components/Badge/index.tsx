import { BadgeControl as Control } from "./Control";
import React from "react";
import type { FC } from "react";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./index.props";
import classNames from "classnames/bind";

const clx = classNames.bind(styles);

const Badge: FC<BadgeProps> = ({
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
        className={clx({ root: true, [`root_direction_${direction}`] : !!direction, 'root_invisible' : invisible }, className)}
        data-cy="badge"
      >
        {displayValue}
      </span>
    </Control>
  );
};

export default Badge;
