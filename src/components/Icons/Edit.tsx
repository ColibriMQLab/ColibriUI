import React from "react";
import type { Props } from "./index.props";

export default ({
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
    {...props}
    ref={ref}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill={fill}
      d="m19.34 2.268 2.39 2.39a2.287 2.287 0 0 1 0 3.236L7.732 21.893a.76.76 0 0 1-.494.22l-4.831.286a.76.76 0 0 1-.807-.717v-.09l.285-4.83a.76.76 0 0 1 .223-.494L16.106 2.27a2.287 2.287 0 0 1 3.233-.002m-6.57 5.8-.136.119-7.499 7.499a1.326 1.326 0 0 0 1.738 1.993l.138-.12 7.499-7.499a1.326 1.326 0 0 0-1.74-1.992m3.75-3.75-.137.118-.936.938a1.326 1.326 0 0 0 1.738 1.994l.137-.12.937-.937a1.326 1.326 0 0 0-1.739-1.994"
    />
  </svg>
);
