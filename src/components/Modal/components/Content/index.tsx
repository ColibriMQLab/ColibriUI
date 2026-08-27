import React from "react";
import styles from "./Content.module.scss";
import type { FC } from "react";
import type { ContentProps } from "./index.props";

export const Content: FC<ContentProps> = ({ children }) => (
  <div className={styles.root}>{children}</div>
);
