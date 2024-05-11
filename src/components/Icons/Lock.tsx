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
      <g>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12.276 4.069h-.69a2.069 2.069 0 0 0-2.069 2.069v2.759h4.828v-2.76a2.069 2.069 0 0 0-2.07-2.068ZM7.448 6.138v2.816A4.139 4.139 0 0 0 4 13.034v7.587C4 21.383 4.618 22 5.38 22h13.792a1.38 1.38 0 0 0 1.38-1.38v-7.586a4.138 4.138 0 0 0-4.138-4.137v-2.76A4.138 4.138 0 0 0 12.276 2h-.69a4.138 4.138 0 0 0-4.138 4.138Zm1.38 4.828h7.586c1.142 0 2.069.926 2.069 2.069v6.896H6.069v-6.897c0-1.142.926-2.069 2.069-2.069h.69Zm3.448 6.206a1.38 1.38 0 1 0 0-2.758 1.38 1.38 0 0 0 0 2.758Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath>
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
);
