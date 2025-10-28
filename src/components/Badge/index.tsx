import React from "react";
import clsx from "clsx";
import { BadgeControl as Control } from "./Control";
import styles from "./Badge.module.scss";
import type { FC, PropsWithChildren } from "react";
import type { Props } from "./index.props";

const Badge: FC<PropsWithChildren<Props>> = ({
  background,
  children,
  className,
  color,
  content,
  direction = "right",
  invisible: invisibleProp,
  max = 99,
  showZero = false,
  ...props
}) => {
  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((content === 0 && !showZero) || content == null)
  ) {
    invisible = true;
  }

  const displayValue = content
    ? content > max
      ? `${max}+`
      : content
    : undefined;

  return (
    <Control {...props}>
      {children}
      {displayValue && (
        <span
          className={clsx(
            styles.root,
            {
              [styles[`root_direction_${direction}`]]: Boolean(direction),
              [styles["root_invisible"]]: Boolean(invisible),
            },
            className,
          )}
          data-testid="badge"
          style={{ backgroundColor: background, color }}
        >
          {displayValue}
        </span>
      )}
    </Control>
  );
};

export default Badge;
