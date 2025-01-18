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
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 16 16"
    ref={ref}
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M12.5 9.5h-9C2.7 9.5 2 8.8 2 8s.7-1.5 1.5-1.5h9c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"
      clipRule="evenodd"
    />
  </svg>
);
