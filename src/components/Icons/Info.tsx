import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

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
        d="M7 8H8V10.6667H9.33333M8.00001 5.33333H8.00667M9.04189 13.9088C9.81785 13.772 10.5593 13.4837 11.2238 13.0603C11.8883 12.637 12.463 12.0869 12.9149 11.4415C13.3669 10.796 13.6872 10.0679 13.8578 9.29864C14.0283 8.52938 14.0457 7.73407 13.9088 6.95811C13.772 6.18215 13.4837 5.44074 13.0603 4.7762C12.637 4.11167 12.0869 3.53703 11.4415 3.08509C10.796 2.63315 10.0679 2.31276 9.29864 2.14222C8.52938 1.97168 7.73407 1.95433 6.95811 2.09115C6.18215 2.22798 5.44074 2.5163 4.7762 2.93965C4.11167 3.36301 3.53703 3.91311 3.08509 4.55854C2.63315 5.20398 2.31276 5.93211 2.14222 6.70136C1.97168 7.47062 1.95433 8.26593 2.09115 9.04189C2.22798 9.81785 2.5163 10.5593 2.93965 11.2238C3.36301 11.8883 3.91311 12.463 4.55854 12.9149C5.20398 13.3669 5.93211 13.6872 6.70136 13.8578C7.47062 14.0283 8.26593 14.0457 9.04189 13.9088Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
);
