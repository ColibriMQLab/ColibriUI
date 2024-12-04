import React from "react";
import classNames from "classnames";
import styles from "./Control.module.scss";
import type { FC, PropsWithChildren } from "react";

import type { ControlProps } from "./index.props";

export const BadgeControl: FC<PropsWithChildren<ControlProps>> = ({
  className,
  children,
  ...props
}) => (
  <span className={classNames(styles.root, className)} {...props}>
    {children}
  </span>
);
