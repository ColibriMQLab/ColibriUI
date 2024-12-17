import React from "react";
import classNames from "classnames";
import styles from "./Separator.module.scss";
import type { FC } from "react";

type Props = {
  className?: string;
};

const Separator: FC<Props> = ({ className }) => (
  <div className={classNames(styles.root, className)} />
);

export default Separator;
