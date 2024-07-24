import React, { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ fill = "currentColor", width = 24, height = 24, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      width={width}
      height={height}
      ref={ref}
      {...props}
      viewBox="0 0 24 24"
    >
      <g fill={fill} fillRule="evenodd">
        <path d="M4 13h16v-2H4z" />
        <path d="M11 4v16h2V4z" />
      </g>
    </svg>
  ),
);
