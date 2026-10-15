import React from "react";
import type { Props } from "./index.props";

export const Pipette = ({
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
    {...props}
    ref={ref}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      stroke={fill}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.5 4.5l5 5M17 2.5a2.12 2.12 0 0 1 3 3L17.5 8l1 1-1.5 1.5-5-5L13.5 4l1 1L17 2.5zM12 7l-8 8v4h4l8-8"
    />
  </svg>
);
