import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
    >
      <circle cx={12} cy={12} r={8} stroke="currentColor" strokeWidth={2} />
      <ellipse
        cx={12}
        cy={12}
        stroke="currentColor"
        strokeWidth={2}
        rx={3}
        ry={8}
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        d="M4 12h16"
      />
    </svg>
  ),
);
