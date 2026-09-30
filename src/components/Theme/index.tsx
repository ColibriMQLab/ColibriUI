import { BUTTON_TOKENS } from "../Button/tokens";
import theme_jaipur from "./themes/jaipur";
import THEME_BA from "./themes/buenos_aires";

export { BREAKPOINTS, media } from "./breakpoints";
export type { BreakpointName, Media } from "./breakpoints";

export const THEMES = {
  JAIPUR: {
    ...theme_jaipur,
    ...BUTTON_TOKENS,
  },
  BA: {
    ...THEME_BA,
    ...BUTTON_TOKENS,
  },
};
