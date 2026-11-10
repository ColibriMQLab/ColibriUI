import React from "react";
import type { Props } from "./index.props";

export const Book = ({
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
    viewBox="1.9 1.1 50 50"
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.09 15.13C22.3 11.67 16.28 9.3 9.54 10.2c-.35 0-.7.36-.88.73L6.18 15.3c-.18.18-.18.37-.18.73L7.77 35.9c.36 1.46.89 2 1.95 2.2 5.14.36 9.04 1.09 13.65 3.1.7 2.36 6.9 2.54 7.8 0 4.6-2.01 7.97-2.74 13.1-3.1a2 2 0 0 0 1.96-2.01c.35-4.01 1.42-18.05 1.6-20.42 0-.19 0-.55-.18-.73l-1.95-4.01c-.18-.37-.54-.55-.89-.73a23.6 23.6 0 0 0-17.72 4.92M27 18.05c-4.6-4.01-10.42-6.08-16.62-5.35l1.74 19.62c5.5.18 10.1 1.2 14.88 3.57zm0 0c4.6-4.01 10.42-6.08 16.63-5.35l-1.76 19.62c-5.49.18-10.09 1.2-14.87 3.57z"
    />
  </svg>
);
