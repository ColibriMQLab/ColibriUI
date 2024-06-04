import { forwardRef } from "react";
import type { Props } from "./index.props";

export default forwardRef<SVGSVGElement, Props>(
  ({ fill = "currentColor", width = 24, height = 24, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      ref={ref}
      fill={fill}
      width={width}
      height={height}
      viewBox="0 0 20 24"
      {...props}
    >
      <path d="M17.677,5.214 C17.6474966,4.87676512 17.3655221,4.61778237 17.027,4.617 L14.47,4.617 C14.47,2.033 12.103,0 9.54,0 C6.976,0 4.768,2.063 4.729,4.617 L2.052,4.617 C1.71273371,4.61587046 1.42966152,4.87586137 1.402,5.214 L0.042,20.519 C0.037,22.32 1.634,23.738 3.601,23.738 L15.478,23.738 C17.444,23.738 19.042,22.32 19.042,20.578 C19.042,20.558 17.677,5.214 17.677,5.214 L17.677,5.214 Z M15.762,22.62 L3.438,22.62 C2.158,22.62 1.12,21.774 1.1,20.731 L2.45,5.5 L4.73,5.5 L4.728,7.566 C4.728,7.944 5.03,8.246 5.408,8.246 C5.786,8.246 6.088,7.944 6.088,7.566 L6.09,5.5 L13.107,5.5 L13.107,7.566 C13.107,7.944 13.409,8.246 13.787,8.246 C13.9678664,8.24679795 14.1415988,8.17550771 14.2697731,8.04789639 C14.3979474,7.92028506 14.4700018,7.7468682 14.47,7.566 L14.47,5.5 L16.745,5.5 L18.1,20.731 C18.08,21.774 17.037,22.621 15.762,22.621 L15.762,22.62 Z M9.595,1.13 C11.482,1.13 13.07,2.716 13.11,4.62 L6.09,4.62 C6.13,2.716 7.708,1.13 9.595,1.13 L9.595,1.13 Z"></path>
    </svg>
  ),
);
