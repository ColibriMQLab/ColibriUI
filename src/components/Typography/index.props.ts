import type { CSSProperties } from "react";
import type { BreakpointName } from "../Theme";

export type TypographyVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "inverse"
  | "alert"
  | "success"
  | "warning"
  | "info";
export type TypographyFontWeight =
  | "normal"
  | "regular"
  | "medium"
  | "semibold"
  | "bold";
export type TypographySize =
  | "xs"
  | "s"
  | "m"
  | "l"
  | "text-xs"
  | "text-sm"
  | "text-md"
  | "text-lg"
  | "heading-sm"
  | "heading-md"
  | "heading-lg"
  | "heading-xl"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl"
  | "display-s"
  | "display-m"
  | "display-l"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

/**
 * Size per breakpoint, mobile first: `base` applies to every width, each
 * breakpoint from its width up (`BREAKPOINTS` in Theme).
 */
export type TypographyResponsiveSize = {
  base?: TypographySize;
} & Partial<Record<BreakpointName, TypographySize>>;

export type TypographyTag =
  | "span"
  | "label"
  | "legend"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "s";

export type TypographyProps = {
  className?: string;
  /** Associates the text with a form control when `tag` is `label`. */
  htmlFor?: string;
  id?: string;
  tag?: TypographyTag;
  variant?: TypographyVariant;
  /** One size, or sizes per breakpoint: `{ base: "xs", sm: "m" }`. */
  size?: TypographySize | TypographyResponsiveSize;
  fontWeight?: TypographyFontWeight;
  /** Limits the text to this many lines and ends the last one with an ellipsis. */
  lines?: number;
  style?: CSSProperties;
};
