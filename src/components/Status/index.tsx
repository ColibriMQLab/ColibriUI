import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import type { PropsWithChildren } from "react";
import type { StatusProps } from "./index.props";

const clx = classNames.bind(styles);

const Status = ({
  className,
  tag: Component = "span",
  children,
  type,
}: PropsWithChildren<StatusProps>) => (
  <Component
    className={clx(styles.root, { [`root_${type}`]: !!type }, className)}
  >
    {children}
  </Component>
);

export default Status;
