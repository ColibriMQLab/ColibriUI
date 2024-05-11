import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      height="1em"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19.714 6.004H4.286v1.714h15.428V6.004Zm0 5.144H4.286v1.715h15.428v-1.715ZM4.286 16.29h15.428v1.715H4.286V16.29Z" />
    </svg>
  ),
);
