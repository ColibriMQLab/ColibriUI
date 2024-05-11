import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        fill="#F09937"
        fill-rule="evenodd"
        d="M100 50c0 27.614-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0s50 22.386 50 50ZM46 33a4 4 0 0 1 8 0v20a4 4 0 0 1-8 0V33Zm4 30a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        clip-rule="evenodd"
      />
    </svg>
  )
);
