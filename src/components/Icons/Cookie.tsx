import React from "react";
import type { Props } from "./index.props";

export const Cookie = ({
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
    viewBox="0 0 24 24"
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill={fill}
      d="M12 3a9 9 0 1 0 8.87 7.5C20.6 10 20 10 20 10h-2V9c0-1-1-1-1-1h-2V7c0-1-1-1-1-1h-1V4c0-1-1-1-1-1M9.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m-3 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m5 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3M11 16a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"
    />
  </svg>
);
