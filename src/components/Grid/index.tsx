import React from "react";
import clsx from "clsx";
import styles from "./Grid.module.scss";
import type { FC, PropsWithChildren } from "react";
import type { GridProps } from "./index.props";

const toRemLength = (value: number | string) =>
  typeof value === "number" ? `${value / 16}rem` : value;

export const Grid: FC<PropsWithChildren<GridProps>> = ({
  children,
  gridRowGap = "6",
  gridColumnGap = "4",
  gridItemMinWidth = "var(--component-grid-item-min-width)",
  className,
  "data-testid": testId,
}) => (
  <div
    className={clsx(styles.root, className)}
    data-testid={testId}
    style={{
      rowGap: `var(--space-${gridRowGap})`,
      columnGap: `var(--space-${gridColumnGap})`,
      gridTemplateColumns: `repeat(auto-fill, minmax(${toRemLength(
        gridItemMinWidth,
      )}, 1fr))`,
    }}
  >
    {children}
  </div>
);
