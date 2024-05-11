import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle cx="10" cy="10" r="7.5" fill="#F6F7F9" />
      <path
        stroke="#334657"
        strokeWidth="1.2"
        d="m7.5 12.5 5-5M12.5 12.5l-5-5"
      />
    </svg>
  ),
);
