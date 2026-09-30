import React from "react";
import clsx from "clsx";
import styles from "./Body.module.scss";
import type { FC } from "react";
import type { BodyProps } from "./index.props";

export const Body: FC<BodyProps> = ({
  children,
  className,
  bleed = false,
  ...props
}) => (
  <div
    {...props}
    className={clsx(styles.root, { [styles.root_bleed]: bleed }, className)}
  >
    {children}
  </div>
);
