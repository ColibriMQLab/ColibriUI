import React from "react";
import clsx from "clsx";
import styles from "./Separator.module.scss";
import type { FC } from "react";

type Props = {
  className?: string;
};

const Separator: FC<Props> = ({ className }) => (
  <div className={clsx(styles.root, className)} />
);

export default Separator;
