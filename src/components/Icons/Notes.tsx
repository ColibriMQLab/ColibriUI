import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        stroke="#A1A4A8"
        strokeLinecap="round"
        strokeWidth="3"
        d="M11.25 13.25h3m-3 4h7"
      />
      <path
        fill="#A1A4A8"
        d="M8.183 6.09C8.446 6.03 8.72 6 9 6h.879c.404-.603 1.09-1 1.871-1h11A2.25 2.25 0 0 1 25 7.25v15a2.25 2.25 0 0 1-1.25 2.016v.484c0 .405-.064.795-.183 1.16a3.752 3.752 0 0 0 2.933-3.66v-15a3.75 3.75 0 0 0-3.75-3.75h-11a3.752 3.752 0 0 0-3.567 2.59Z"
      />
      <path
        stroke="#A1A4A8"
        strokeLinecap="round"
        strokeWidth="3"
        d="M11.25 21.25h7"
      />
      <path
        fill="#47484A"
        d="M5.5 9.75A3.75 3.75 0 0 1 9.25 6h11A3.75 3.75 0 0 1 24 9.75v15a3.75 3.75 0 0 1-3.75 3.75h-11a3.75 3.75 0 0 1-3.75-3.75v-15ZM9.25 7.5A2.25 2.25 0 0 0 7 9.75v15A2.25 2.25 0 0 0 9.25 27h11a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25h-11Z"
      />
      <path
        fill="#DCE0E5"
        d="M7 9.75A2.25 2.25 0 0 1 9.25 7.5h11c.879 0 1.64.504 2.01 1.239a2.24 2.24 0 0 0-1.01-.24h-11A2.25 2.25 0 0 0 8 10.75v15c0 .364.087.707.24 1.011A2.25 2.25 0 0 1 7 24.75v-15Z"
      />
    </svg>
  ),
);
