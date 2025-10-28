import React from "react";
import clsx from "clsx";
import styles from "./Chip.module.scss";
import type { ChipProps } from "./index.props";
import type { FC, PropsWithChildren } from "react";

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
  <span className={styles.chip} data-testid={testID} {...props}>
    <span
      className={clsx(styles.inner, {
        [styles["inner_active"]]: iconEnd || isActive,
        [styles["inner_inactive"]]: !iconEnd && !isActive,
      })}
      data-size={size}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span
        className={styles.content}
        aria-pressed={isActive}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <span className={styles["content-inner"]}>{children}</span>
      </span>
      {iconEnd && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <span
          className={styles["icon-right"]}
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
