import { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ width = 24, height = 24, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      ref={ref}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M15.796 15.447a6 6 0 0 0-11.592 0"
      />
      <circle
        cx="10"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  ),
);
