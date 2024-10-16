import React, { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ fill = "currentColor", width = 18, height = 18, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      ref={ref}
      {...props}
    >
      <path
        fill={fill}
        fillRule="nonzero"
        d="M15.517 7.642h-5.16v-5.16a1.358 1.358 0 0 0-2.715 0v5.16h-5.16a1.358 1.358 0 0 0 0 2.716h5.16v5.16a1.358 1.358 0 0 0 2.716 0v-5.16h5.16a1.358 1.358 0 0 0 0-2.716"
      />
    </svg>
  ),
);
