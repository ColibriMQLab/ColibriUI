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
      <rect width="20" height="20" x="1" y="1" stroke="currentColor" rx="2" />
    </svg>
  ),
);
