import React from "react";
import classNames from "classnames";
import styles from "./Grid-Item.module.scss";
import type { FC } from "react";
import type { GridItemProps } from "./index.props";

const GridItem: FC<GridItemProps> = ({
  children,
  fullWidth = false,
  className,
}) => (
  <div className={classNames({[styles.full]: fullWidth }, className)}>
    {children}
  </div>
);

export default GridItem;
