import React from "react";
import type { Props } from "./index.props";

export const CurrencyGbp = ({
  fill = "currentColor",
  width = 24,
  height = 24,
  ref,
  ...props
}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill={fill}
      d="M6.5 21v-1.25a6 6 0 0 0 2.31-2.05q.85-1.3.87-2.95l-.02-.98-.09-.77H7v-2h2.4a18 18 0 0 1-.27-2.75 5.3 5.3 0 0 1 1.45-3.84A5.2 5.2 0 0 1 14.32 3q1.07 0 1.81.2.73.18 1.18.45l-.55 1.74a5 5 0 0 0-.97-.39 7 7 0 0 0-1.47-.16q-1.59.03-2.32.99-.73.95-.7 2.45l.1 1.49.2 1.23h3.9v2h-3.71q.14 1.51-.14 2.96A6 6 0 0 1 9.83 19H18v2z"
    />
  </svg>
);
