import React from "react";
import type { Props } from "./index.props";

export const SignIn = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.37 10.78a1 1 0 0 0 0 1.44l3.4 3.4a1.02 1.02 0 1 0 1.43-1.45l-1.65-1.65h10.43a1.02 1.02 0 0 0 0-2.04H9.55l1.65-1.65a1.02 1.02 0 0 0-1.44-1.44zM14.54 6.41a1.02 1.02 0 0 1-2.04 0v-.34a2.04 2.04 0 0 0-2.04-2.03H7.07a2.04 2.04 0 0 0-2.03 2.03v10.86a2.04 2.04 0 0 0 2.03 2.04h3.4a2.04 2.04 0 0 0 2.03-2.04v-.34a1.02 1.02 0 0 1 2.04 0v.34A4.07 4.07 0 0 1 10.46 21H7.07A4.07 4.07 0 0 1 3 16.93V6.07A4.07 4.07 0 0 1 7.07 2h3.4a4.07 4.07 0 0 1 4.07 4.07z"
    />
  </svg>
);
