import React from "react";
import clsx from "clsx";
import styles from "./Separator.module.scss";
import type { FC } from "react";
import type { SeparatorProps } from "./index.props";

export const Separator: FC<SeparatorProps> = ({ className }) => (
  <div className={clsx(styles.root, className)} />
);
