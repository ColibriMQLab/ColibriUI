import React from "react";
import classNames from "classnames/bind";
import Typography from "../../../Typography";
import styles from "./Title.module.scss";
import type { FC, ReactNode } from "react";

const clx = classNames.bind(styles);

const Title: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <Typography tag="h3" size="h3" className={clx(styles.title)}>
      <div className={clx(styles.wrapper)}>{children}</div>
    </Typography>
  );
};

export default Title;
