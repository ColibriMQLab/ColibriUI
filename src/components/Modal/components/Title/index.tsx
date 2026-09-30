import React, { useEffect } from "react";
import clsx from "clsx";
import { Typography } from "../../../Typography";
import { useModalContext } from "../../context";
import styles from "./Title.module.scss";
import type { FC } from "react";
import type { TitleProps } from "./index.props";

export const Title: FC<TitleProps> = ({ children, className, ...props }) => {
  const { titleId, registerTitle } = useModalContext();

  useEffect(() => registerTitle(), [registerTitle]);

  return (
    <Typography tag="h4" size="h4" className={styles.title}>
      <div {...props} id={titleId} className={clsx(styles.wrapper, className)}>
        {children}
      </div>
    </Typography>
  );
};
