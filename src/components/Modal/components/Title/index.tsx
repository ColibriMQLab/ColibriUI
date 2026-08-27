import React from "react";
import { Typography } from "../../../Typography";
import styles from "./Title.module.scss";
import type { FC } from "react";
import type { TitleProps } from "./index.props";

export const Title: FC<TitleProps> = ({ children }) => (
  <Typography tag="h3" size="h3" className={styles.title}>
    <div className={styles.wrapper}>{children}</div>
  </Typography>
);
