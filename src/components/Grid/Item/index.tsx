import React from "react";
import classNames from "classnames";
import styles from "./Grid-Item.module.scss";
import type { FC, PropsWithChildren } from "react";
import type { GridItemProps } from "./index.props";

const GridItem: FC<PropsWithChildren<GridItemProps>> = ({
  children,
  fullWidth = false,
  className,
  style,
}) => (
  <div
    className={classNames(styles.item, { [styles.full]: fullWidth }, className)}
    style={style}
  >
    {children}
  </div>
);

export default GridItem;
