import React from "react";
import Typography from "../../../Typography";
import type { FC, ReactNode } from "react";
import styles from './Title.module.scss'
import classNames from "classnames/bind";

const clx = classNames.bind(styles);

const Title: FC<{
  children: ReactNode;
}> = ({ children}) => {
  return (
    <Typography tag="h3" size="h3">
      <div className={clx(styles.wrapper)}>{children}</div>
    </Typography>
  );
};

export default Title;
