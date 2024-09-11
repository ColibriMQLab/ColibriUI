import React, { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ fill = "currentColor", width = 24, height = 24, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      ref={ref}
      {...props}
      fill="none"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M22.17 11.205a1.125 1.125 0 0 1 0 1.59l-3.75 3.75a1.126 1.126 0 1 1-1.59-1.59l1.83-1.83H7.125a1.125 1.125 0 1 1 0-2.25H18.66l-1.83-1.83a1.125 1.125 0 0 1 1.59-1.59zm-7.92-4.83a1.125 1.125 0 1 1-2.25 0V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h3.75A2.25 2.25 0 0 0 12 18v-.375a1.125 1.125 0 1 1 2.25 0V18a4.5 4.5 0 0 1-4.5 4.5H6A4.5 4.5 0 0 1 1.5 18V6A4.5 4.5 0 0 1 6 1.5h3.75a4.5 4.5 0 0 1 4.5 4.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
