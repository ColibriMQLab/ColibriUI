import React from "react";
import type { Props } from "./index.props";

export default ({
  fill = "currentColor",
  width = 10,
  height = 16,
  ref,
  ...props
}: Props) => (
  <svg
    ref={ref}
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 10 16"
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
