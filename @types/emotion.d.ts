import "@emotion/react";
import type { ThemeProps } from "../src/components/Theme/index.props";

declare module "@emotion/react" {
  export interface Theme extends ThemeProps {}
}
