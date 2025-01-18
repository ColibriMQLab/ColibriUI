import React from "react";
import type { Props } from "./index.props";

export default ({
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
    ref={ref}
    {...props}
    fill="none"
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeWidth="1.6"
      d="M21.936 23.026a10.286 10.286 0 0 0-19.872 0"
    />
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeWidth="1.6"
      d="M12 15.086a6.857 6.857 0 1 0 0-13.714 6.857 6.857 0 0 0 0 13.714Z"
    />
  </svg>
);
