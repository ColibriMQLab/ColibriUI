import React from "react";
import { GridItems, GridWrapper } from "./styles";
import type { GridProps } from "./index.props";

const Grid: React.FC<GridProps> = ({
  children,
  gridRowGap = 24,
  gridColumnGap = 16,
  gridItemMinWidth = 136,
  className,
}) => (
  <GridWrapper className={className}>
    <GridItems
      gridRowGap={gridRowGap}
      gridColumnGap={gridColumnGap}
      gridItemMinWidth={gridItemMinWidth}
    >
      {children}
    </GridItems>
  </GridWrapper>
);

export default Grid;
