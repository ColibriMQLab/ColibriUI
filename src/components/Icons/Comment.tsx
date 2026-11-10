import React from "react";
import type { Props } from "./index.props";

export const Comment = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 10.79c0 4.85-4.25 8.79-9.5 8.79a10 10 0 0 1-2.68-.36 12.4 12.4 0 0 1-5.49 1.73c-.29.03-.43-.35-.24-.56.6-.65 1.43-1.8 1.72-3.37A8.5 8.5 0 0 1 3 10.8C3 5.93 7.25 2 12.5 2S22 5.93 22 10.79"
    />
  </svg>
);
