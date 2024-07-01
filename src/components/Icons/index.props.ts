import type { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  fill?: string;
}
