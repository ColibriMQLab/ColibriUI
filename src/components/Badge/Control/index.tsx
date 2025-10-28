import React from "react";
import clsx from "clsx";
import styles from "./Control.module.scss";
import type { FC, PropsWithChildren } from "react";

import type { ControlProps } from "./index.props";

export const BadgeControl: FC<PropsWithChildren<ControlProps>> = ({
  className,
  children,
  ...props
}) => (
  <span className={clsx(styles.root, className)} {...props}>
    {children}
  </span>
);
