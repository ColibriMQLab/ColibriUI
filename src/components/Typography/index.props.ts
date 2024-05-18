import type { CSSObject } from "@emotion/react";

type VariantStyles = {
  color?: CSSObject["color"];
};
export type TypographyVariant = {
  alert: VariantStyles;
  success: VariantStyles;
  secondary: VariantStyles;
};
export type TypographyFontWeight = "normal" | "medium" | "bold";
export type TypographySize =
  | "xs"
  | "s"
  | "m"
  | "l"
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
  variant?: keyof TypographyVariant;
  size?: TypographySize;
  fontWeight?: TypographyFontWeight;
  nowrap?: boolean;
};
