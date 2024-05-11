import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="none"
      viewBox="0 0 64 64"
    >
      <path
        fill="#FADEBD"
        fillRule="evenodd"
        d="M36.303 12.27c-1.936-3.27-6.67-3.27-8.606 0L7.467 46.455c-1.664 2.81-.216 6.248 2.602 7.256a4.934 4.934 0 0 1 .397-4.257L30.697 15.27c1.329-2.245 3.975-2.949 6.13-2.112l-.524-.887Z"
        clipRule="evenodd"
      />
      <path
        fill="#F19D38"
        fillRule="evenodd"
        d="M25.546 12.96c2.904-4.906 10.004-4.906 12.908 0l18.477 31.22c2.96 5-.645 11.32-6.454 11.32H13.523c-5.81 0-9.413-6.32-6.454-11.32l18.477-31.22Zm10.327 1.528c-1.743-2.944-6.003-2.944-7.746 0L9.65 45.709c-1.775 3 .387 6.792 3.873 6.792h36.954c3.486 0 5.648-3.792 3.873-6.792l-18.477-31.22Z"
        clipRule="evenodd"
      />
      <path
        fill="#F6BE7A"
        fillRule="evenodd"
        d="M32 24a2 2 0 0 1 2 2v12a2 2 0 1 1-4 0V26a2 2 0 0 1 2-2Z"
        clipRule="evenodd"
      />
      <path fill="#F6BE7A" d="M34 45a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  ),
);
