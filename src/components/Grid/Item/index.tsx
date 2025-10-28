import React from "react";
import clsx from "clsx";
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
    className={clsx(
      styles.item,
      { [styles.full]: Boolean(fullWidth) },
      className,
    )}
    style={style}
  >
    {children}
  </div>
);

export default GridItem;
