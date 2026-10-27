import React from "react";
import clsx from "clsx";
import styles from "./Skeleton.module.scss";
import type { FC } from "react";
import type { RectProps, TextProps } from "./index.props";

const toRemLength = (value?: number | string) =>
  typeof value === "number" ? `${value / 16}rem` : value;

export const SkeletonRect: FC<RectProps> = ({
  className,
  width,
  height,
  radius = "sm",
  "data-testid": testId,
}) => (
  <div
    className={clsx(styles.rect, className)}
    data-testid={testId}
    style={{
      width: toRemLength(width),
      height: toRemLength(height),
      borderRadius: `var(--radius-${radius})`,
    }}
  />
);

export const SkeletonText: FC<TextProps> = ({
  className,
  width,
  size,
  "data-testid": testId,
}) => (
  <div
    className={clsx(styles.text, className)}
    data-testid={testId}
    style={{ width: toRemLength(width), height: toRemLength(size) }}
  />
);
