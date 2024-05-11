import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 7.5L13.8535 7.14644L14.2071 7.5L13.8536 7.85355L13.5 7.5ZM7.5 8C7.22386 8 7 7.77614 7 7.5C7 7.22386 7.22386 7 7.5 7V8ZM11.8535 5.14644L13.8535 7.14644L13.1465 7.85356L11.1464 5.85356L11.8535 5.14644ZM13.8536 7.85355L11.8536 9.85355L11.1464 9.14645L13.1464 7.14645L13.8536 7.85355ZM13.5 8H7.5V7H13.5V8Z"
        fill="currentColor"
      />
      <path
        d="M8.5 6V3.3673C8.5 2.86964 8.13407 2.44772 7.64142 2.37735L2.64142 1.66306C2.03899 1.577 1.5 2.04446 1.5 2.65301V12.347C1.5 12.9555 2.03899 13.423 2.64142 13.3369L7.64142 12.6227C8.13407 12.5523 8.5 12.1304 8.5 11.6327V9"
        stroke="currentColor"
      />
    </svg>
  ),
);
