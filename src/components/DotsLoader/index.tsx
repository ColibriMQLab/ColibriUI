import React from "react";
import classNames from "classnames/bind";
import styles from "./DotsLoader.module.scss";
import type { FC } from "react";

const clx = classNames.bind(styles);

const DotsLoader: FC<{ color?: string }> = ({ color }) => (
  <div className={clx("wrapper")}>
    <div
      style={{ backgroundColor: color }}
      className={clx({ dot: true, dot_first: true })}
    />
    <div
      style={{ backgroundColor: color }}
      className={clx({ dot: true, dot_second: true })}
    />
    <div
      style={{ backgroundColor: color }}
      className={clx({ dot: true, dot_third: true })}
    />
    <div
      style={{ backgroundColor: color }}
      className={clx({ dot: true, dot_fourth: true })}
    />
  </div>
);

export default DotsLoader;
