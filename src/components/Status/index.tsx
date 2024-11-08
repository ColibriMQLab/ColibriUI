import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import type { StatusProps } from "./index.props";

const clx = classNames.bind(styles);

const Status = ({
  className,
  tag: Component = "span",
  children,
  type,
}: StatusProps) => {
  return (
    <Component
      className={clx(styles.root, { [`root_${type}`]: !!type }, className)}
    >
      {children}
    </Component>
  );
};

export default Status;
