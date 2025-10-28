import React from "react";
import clsx from "clsx";
import styles from "./DotsLoader.module.scss";
import type { FC } from "react";

const DotsLoader: FC<{ color?: string }> = ({ color }) => (
  <div className={styles.wrapper}>
    <div
      style={{ backgroundColor: color }}
      className={clsx({ [styles.dot]: true, [styles.dot_first]: true })}
    />
    <div
      style={{ backgroundColor: color }}
      className={clsx({ [styles.dot]: true, [styles.dot_second]: true })}
    />
    <div
      style={{ backgroundColor: color }}
      className={clsx({ [styles.dot]: true, [styles.dot_third]: true })}
    />
    <div
      style={{ backgroundColor: color }}
      className={clsx({ [styles.dot]: true, [styles.dot_fourth]: true })}
    />
  </div>
);

export default DotsLoader;
