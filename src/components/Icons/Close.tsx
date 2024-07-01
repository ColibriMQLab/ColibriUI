import React, { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ width = 24, height = 24, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      ref={ref}
      {...props}
      viewBox="0 0 12 12"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.14645 3.14645C3.34171 2.95118 3.65829 2.95118 3.85355 3.14645L6 5.29289L8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645C9.04882 3.34171 9.04882 3.65829 8.85355 3.85355L6.70711 6L8.85355 8.14645C9.04882 8.34171 9.04882 8.65829 8.85355 8.85355C8.65829 9.04882 8.34171 9.04882 8.14645 8.85355L6 6.70711L3.85355 8.85355C3.65829 9.04882 3.34171 9.04882 3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645L5.29289 6L3.14645 3.85355C2.95118 3.65829 2.95118 3.34171 3.14645 3.14645Z"
        fill="currentColor"
      />
    </svg>
  ),
);
