import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      {...props}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.204 11.5a1 1 0 0 0-1.732 1l1.732-1Zm17.324 1a1 1 0 0 0-1.731-1l1.73 1ZM12 16a8.996 8.996 0 0 1-7.796-4.5l-1.732 1C4.372 15.787 7.927 18 12 18v-2Zm7.797-4.5A8.996 8.996 0 0 1 12 16v2c4.073 0 7.627-2.214 9.528-5.5l-1.731-1Z" />
    </svg>
  )
);
