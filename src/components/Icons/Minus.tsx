import { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ fill = "currentColor", width = 24, height = 24, ...props }, ref) => (
    <svg width={width} height={height} viewBox="0 0 24 24" ref={ref} {...props}>
      <path fill={fill} d="M4 13h16v-2H4z" fillRule="evenodd" />
    </svg>
  ),
);
