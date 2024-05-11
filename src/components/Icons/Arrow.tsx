import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height=".5em"
      fill="none"
      viewBox="0 0 17 8"
    >
      <path stroke="currentColor" d="M0 4h16m0 0-3-3m3 3-3 3" />
    </svg>
  )
);
