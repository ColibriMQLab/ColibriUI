import React from "react";
import clsx from "clsx";
import styles from "./Skeleton.module.scss";
import type { FC } from "react";
import type { RectProps, TextProps } from "./index.props";

export const SkeletonRect: FC<RectProps> = ({
  className,
  width,
  height,
  borderRadius,
}) => (
  <div
    className={clsx(styles.rect, className)}
    style={{ width, height, borderRadius }}
  />
);

export const SkeletonText: FC<TextProps> = ({ className, width, size }) => (
  <div
    className={clsx(styles.text, className)}
    style={{ width, height: size }}
  />
);
