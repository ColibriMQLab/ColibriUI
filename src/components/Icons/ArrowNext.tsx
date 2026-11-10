import React from "react";
import type { Props } from "./index.props";

export const ArrowNext = ({
  fill = "currentColor",
  width = 24,
  height = 24,
  ref,
  ...props
}: Props) => (
  <svg
    ref={ref}
    fill="none"
    width={width}
    height={height}
    viewBox="-7.3 -4 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 1L8 8L1 15"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
