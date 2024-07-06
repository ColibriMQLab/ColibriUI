import React from "react";
import classNames from "classnames";
import styles from "./Skeleton.module.scss";
import type { FC } from "react";
import type { RectProps, TextProps } from "./index.props";

export const SkeletonRect: FC<RectProps> = ({
  className,
  width,
  height,
  borderRadius,
}) => {
  return (
    <div
      className={classNames(styles.rect, className)}
      style={{ width, height, borderRadius }}
    />
  );
};

export const SkeletonText: FC<TextProps> = ({ className, width, size }) => {
  return (
    <div
      className={classNames(styles.text, className)}
      style={{ width, height: size }}
    />
  );
};
