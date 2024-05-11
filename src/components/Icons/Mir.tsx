import { forwardRef, HTMLAttributes } from "react";

export default forwardRef<SVGSVGElement, HTMLAttributes<SVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill="url(#a)"
        fill-rule="evenodd"
        d="M20.53 9h-4.175c.224 1.329 1.571 2.571 3.053 2.571h3.322c.045-.128.045-.3.045-.428 0-1.2-.987-2.143-2.244-2.143Z"
        clip-rule="evenodd"
      />
      <path
        fill="#4DB45F"
        fill-rule="evenodd"
        d="M16.714 11.786V15h2.02v-1.714h1.797c.987 0 1.84-.643 2.11-1.5h-5.927ZM9.53 9v6h1.797s.449 0 .673-.429l1.572-3h.224V15h2.02V9h-1.795s-.45.043-.674.429l-1.571 3h-.225V9h-2.02ZM1 15V9h2.02s.584 0 .898.857c.809 2.272.898 2.572.898 2.572s.18-.558.898-2.572C6.03 9 6.612 9 6.612 9h2.02v6h-2.02v-3.214h-.224L5.265 15h-.898l-1.122-3.214H3.02V15H1Z"
        clip-rule="evenodd"
      />
      <defs>
        <linearGradient
          id="a"
          x1="16.343"
          x2="22.775"
          y1="10.286"
          y2="10.286"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00B4E6" />
          <stop offset="1" stop-color="#088CCB" />
        </linearGradient>
      </defs>
    </svg>
  )
);
