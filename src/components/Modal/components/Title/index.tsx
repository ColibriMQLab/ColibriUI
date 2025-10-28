import React from "react";
import Typography from "../../../Typography";
import styles from "./Title.module.scss";
import type { FC, PropsWithChildren } from "react";
// eslint-disable-next-line @typescript-eslint/ban-types
const Title: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Typography tag="h3" size="h3" className={styles.title}>
    <div className={styles.wrapper}>{children}</div>
  </Typography>
);

export default Title;
