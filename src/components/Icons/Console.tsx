import React from "react";
import type { Props } from "./index.props";

export const Console = ({
  fill = "currentColor",
  width = 24,
  height = 24,
  ref,
  ...props
}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="-0.125 0 20 20"
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill={fill}
      d="M2 3.63c0-.83.67-1.5 1.5-1.5h3.75c.83 0 1.5.67 1.5 1.5v3.75c0 .82-.67 1.5-1.5 1.5H3.5A1.5 1.5 0 0 1 2 7.38zM11 12.5c0-.83.67-1.5 1.5-1.5h3.75c.83 0 1.5.67 1.5 1.5v3.75c0 .83-.67 1.5-1.5 1.5H12.5a1.5 1.5 0 0 1-1.5-1.5zM2 12.63c0-.83.67-1.5 1.5-1.5h3.75c.83 0 1.5.67 1.5 1.5v3.74c0 .83-.67 1.5-1.5 1.5H3.5a1.5 1.5 0 0 1-1.5-1.5zM11 3.63c0-.83.67-1.5 1.5-1.5h3.75c.83 0 1.5.67 1.5 1.5v3.75c0 .82-.67 1.5-1.5 1.5H12.5a1.5 1.5 0 0 1-1.5-1.5z"
    />
  </svg>
);
