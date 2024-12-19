import type { CSSProperties } from "react";

export type TypographyVariant = "alert" | "success" | "secondary";
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

export type Props = {
  className?: string;
  tag?: TypographyTag;
  variant?: TypographyVariant;
  size?: TypographySize;
  fontWeight?: TypographyFontWeight;
  style?: CSSProperties;
};
