import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M14.408.196c1.247-.401 1.896.272 1.452 1.504L11.065 14.99c-.444 1.232-1.197 1.245-1.685.022L7.364 9.958c-.242-.608-.93-1.317-1.531-1.58L.875 6.203c-1.2-.525-1.16-1.277.086-1.678L14.408.196Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
);
