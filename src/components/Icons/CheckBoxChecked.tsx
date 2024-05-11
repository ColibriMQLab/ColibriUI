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
      <rect width="22" height="22" fill="#F33" rx="2" />
      <path stroke="#fff" strokeWidth="2" d="m5.166 13 4 3 9-11" />
    </svg>
  ),
);
