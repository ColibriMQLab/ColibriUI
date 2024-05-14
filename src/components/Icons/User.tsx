import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 20 20"
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
