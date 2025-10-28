import React from "react";
import clsx from "clsx";
import styles from "./index.module.scss";
import type { PropsWithChildren } from "react";
import type { StatusProps } from "./index.props";

const Status = ({
  className,
  tag: Component = "span",
  children,
  type,
}: PropsWithChildren<StatusProps>) => (
  <Component
    className={clsx(
      styles.root,
      { [styles[`root_${type}`]]: Boolean(type) },
      className,
    )}
  >
    {children}
  </Component>
);

export default Status;
