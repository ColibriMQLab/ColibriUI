import React from "react";
import classNames from "classnames";
import styles from "./Grid.module.scss";
import type { GridProps } from "./index.props";

const Grid: React.FC<GridProps> = ({
  children,
  gridRowGap = 24,
  gridColumnGap = 16,
  gridItemMinWidth = 136,
  className,
}) => (
  <div className={classNames(styles.root, className)}>
    <div
      className={classNames(styles.items)}
      style={{
        rowGap: `${gridRowGap}px`,
        columnGap: `${gridColumnGap}px`,
        gridTemplateColumns: `repeat(auto-fit, minmax(${gridItemMinWidth}px, 1fr))`,
      }}
    >
      {children}
    </div>
  </div>
);

export default Grid;
