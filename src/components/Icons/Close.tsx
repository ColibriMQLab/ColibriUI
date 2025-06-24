import React from "react";
import type { Props } from "./index.props";

export default ({ width = 24, height = 24, ref, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    ref={ref}
    {...props}
    fill="none"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M.536.541A1.9 1.9 0 0 0 0 1.848c0 .49.203.959.536 1.306l8.868 8.857-8.868 8.857c-.333.35-.518.815-.518 1.299 0 .486.204.948.555 1.291A1.8 1.8 0 0 0 1.848 24a1.86 1.86 0 0 0 1.311-.52l8.85-8.856 8.85 8.857a1.86 1.86 0 0 0 1.312.519c.48-.006.942-.2 1.275-.541A1.8 1.8 0 0 0 24 22.167c0-.484-.185-.95-.517-1.3l-8.869-8.856 8.869-8.857c.332-.349.517-.815.517-1.299a1.8 1.8 0 0 0-.554-1.291A1.8 1.8 0 0 0 22.17.022a1.86 1.86 0 0 0-1.312.52l-8.85 8.856L3.16.541a1.857 1.857 0 0 0-2.623 0"
      clipRule="evenodd"
    />
  </svg>
);
