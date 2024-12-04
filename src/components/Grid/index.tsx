import React from "react";
import classNames from "classnames";
import styles from "./Grid.module.scss";
import type { FC, PropsWithChildren } from "react";
import type { GridProps } from "./index.props";

const Grid: FC<PropsWithChildren<GridProps>> = ({
  children,
  gridRowGap = 24,
  gridColumnGap = 16,
  gridItemMinWidth = 100,
  className,
}) => (
  <div
    className={classNames(styles.root, className)}
    style={{
      rowGap: `${gridRowGap}px`,
      columnGap: `${gridColumnGap}px`,
      gridTemplateColumns: `repeat(auto-fill, minmax(${gridItemMinWidth}px, 1fr))`,
    }}
  >
    {children}
  </div>
);

export default Grid;
