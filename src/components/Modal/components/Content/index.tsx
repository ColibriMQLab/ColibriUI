import React from "react";
import styles from "./Content.module.scss";
import type { FC, PropsWithChildren } from "react";

const Content: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

export default Content;
