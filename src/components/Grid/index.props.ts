import type { ReactNode } from "react";

export type GridProps = {
  children: ReactNode;
  className?: string;
  gridRowGap?: number;
  gridColumnGap?: number;
  gridItemMinWidth?: number;
};
