import classNames from "classnames";
import React from "react";
import type { FC, ReactNode } from "react";
import styles from './Content.module.scss'

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={classNames(styles.root)}>{children}</div>;
};

export default Content;
