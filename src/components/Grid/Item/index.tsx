import { Item } from "./styles";
import type { FC } from "react";
import type { GridItemProps } from "./index.props";

const GridItem: FC<GridItemProps> = ({
  children,
  className,
  fullWidth = false,
}) => (
  <Item fullWidth={fullWidth} className={className}>
    {children}
  </Item>
);

export default GridItem;
