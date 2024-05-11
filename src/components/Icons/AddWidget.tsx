import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
        d="M11.5 9v5M12.5 7.5v-3a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3M9 11.5h5"
      />
      <rect width={3} height={3} x={4} y={4} fill="currentColor" rx=".5" />
      <rect width={3} height={3} x={4} y={8} fill="currentColor" rx=".5" />
      <rect width={3} height={3} x={8} y={4} fill="currentColor" rx=".5" />
    </svg>
  )
);
