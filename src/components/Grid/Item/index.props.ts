import type { CSSProperties, ReactNode } from "react";

export type GridItemProps = {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
};
