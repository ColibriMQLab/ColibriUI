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
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path
      fill={fill}
      d="M21.522 5.015c-.043-.429-.43-.729-.858-.729-5.443 0-7.971-2.314-7.971-2.314a.83.83 0 0 0-1.2 0S9.05 4.286 3.52 4.286c-.428 0-.814.3-.857.729 0 .128-1.671 13.586 9.172 17.228.085.043.17.043.257.043.086 0 .17 0 .257-.043 10.843-3.6 9.173-17.057 9.173-17.228m-2.144 6.857c-1.03 4.414-3.515 7.329-7.286 8.657-3.814-1.371-6.257-4.286-7.286-8.657-.6-2.443-.557-4.757-.471-5.871 4.2-.172 6.728-1.543 7.8-2.315 1.07.772 3.6 2.143 7.8 2.315 0 1.114.043 3.385-.557 5.871"
    />
  </svg>
);
