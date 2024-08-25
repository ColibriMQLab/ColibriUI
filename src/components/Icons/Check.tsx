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
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#a)">
        <path
          fill={fill}
          d="m9.109 15.441-5.23-5.402L2 11.69 9.075 19 21.443 6.682 19.595 5z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
);
