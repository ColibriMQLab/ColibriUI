import classNames from "classnames";
import React from "react";
import styles from "./Content.module.scss";
import type { FC, PropsWithChildren } from "react";

const Content: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={classNames(styles.root)}>{children}</div>;
};

export default Content;
