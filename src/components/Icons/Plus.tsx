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
        d="M12.5 1a1.26 1.26 0 0 1 1.26 1.26v7.98h7.98a1.26 1.26 0 1 1 0 2.52h-7.98v7.98a1.26 1.26 0 0 1-2.52 0v-7.98H3.26a1.26 1.26 0 0 1 0-2.52h7.98V2.26A1.26 1.26 0 0 1 12.5 1"
        clipRule="evenodd"
      />
    </svg>
  ),
);
