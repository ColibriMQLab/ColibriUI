import React from "react";
import styles from './Control.module.scss'
import type { FC } from "react";

import type { ControlProps } from "./index.props";
import classNames from "classnames";

export const BadgeControl: FC<ControlProps> = ({
  className,
  children,
  ...props
}) => (
  <span className={classNames(styles.root, className)} {...props}>
    {children}
  </span>
);
