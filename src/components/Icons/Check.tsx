import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path stroke="currentColor" d="m3.333 9.333 2.667 2L12 4" />
    </svg>
  ),
);
