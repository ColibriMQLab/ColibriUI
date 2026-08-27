import React from "react";
import clsx from "clsx";
import styles from "./index.module.scss";
import type { PropsWithChildren } from "react";
import type { StatusProps } from "./index.props";

export const Status = ({
  className,
  indicator,
  showIndicator = true,
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
    {showIndicator && (
      <span
        className={clsx(styles.indicator, {
          [styles["indicator_custom"]]: Boolean(indicator),
        })}
        aria-hidden="true"
      >
        {indicator}
      </span>
    )}
    {children}
  </Component>
);
