import React from "react";
import classNames from "classnames";
import styles from "./Separator.module.scss";
import type { FC } from "react";

type SeparatorProps = {
  className?: string;
};

const Separator: FC<SeparatorProps> = ({ className }) => {
  return <div className={classNames(styles.root, className)} />;
};

export default Separator;
