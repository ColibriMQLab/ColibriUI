import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg ref={ref} {...props} height="24px" width="24px" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.339 16.175l-.361.075a14.43 14.43 0 0 0-2.504.768L8.5 17l-.028.019a18.181 18.181 0 0 0-3.928 2.232 20.058 20.058 0 0 0-1.997 1.684l-.174.17-.003.002a.036.036 0 0 1-.008.006.022.022 0 0 1-.006.002h-.01c.079-.989.228-1.97.447-2.938.801-3.531 2.888-8.426 8.336-10.153l.21-.066V3.942a.668.668 0 0 1 1.085-.52l9.553 7.66a.668.668 0 0 1 0 1.042l-9.552 7.688a.667.667 0 0 1-1.086-.52v-3.117zm1.852.644l6.478-5.214-6.478-5.195v2.903l-1.502.476c-3.046.965-4.85 3.108-5.955 5.445-.092.194-.178.387-.259.582l-.328.79.75-.412a17.235 17.235 0 0 1 4.705-1.757l2.589-.539v2.921z"
        fill="currentColor"
      ></path>
    </svg>
  ),
);
