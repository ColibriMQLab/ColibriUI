import React from "react";
import clsx from "clsx";
import styles from "./Footer.module.scss";
import type { FC } from "react";
import type { FooterProps } from "./index.props";

export const Footer: FC<FooterProps> = ({ children, className, ...props }) => (
  <div {...props} className={clsx(styles.root, className)}>
    {children}
  </div>
);
