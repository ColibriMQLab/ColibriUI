import React from "react";
import clsx from "clsx";
import styles from "./DotsLoader.module.scss";
import type { FC } from "react";
import type { DotsLoaderProps } from "./index.props";

export const DotsLoader: FC<DotsLoaderProps> = () => (
  <div className={styles.wrapper}>
    <div className={clsx({ [styles.dot]: true, [styles.dot_first]: true })} />
    <div className={clsx({ [styles.dot]: true, [styles.dot_second]: true })} />
    <div className={clsx({ [styles.dot]: true, [styles.dot_third]: true })} />
    <div className={clsx({ [styles.dot]: true, [styles.dot_fourth]: true })} />
  </div>
);
