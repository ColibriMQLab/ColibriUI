import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg ref={ref} {...props} fill="currentColor" width="24" height="24">
      <circle cx="5" cy="12" r="1.75"></circle>
      <circle cx="12" cy="12" r="1.75"></circle>
      <circle cx="19" cy="12" r="1.75"></circle>
    </svg>
  )
);
