import type { CSSProperties } from "react";

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
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

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
  tag?: TypographyTag;
  variant?: TypographyVariant;
  size?: TypographySize;
  fontWeight?: TypographyFontWeight;
  style?: CSSProperties;
};
