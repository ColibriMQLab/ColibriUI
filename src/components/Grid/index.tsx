import React from "react";
import { GridItems, GridWrapper } from "./styles";
import type { GridProps } from "./index.props";

const Grid: React.FC<GridProps> = ({ children, className }) => (
  <GridWrapper className={className}>
    <GridItems>{children}</GridItems>
  </GridWrapper>
);

export default Grid;
