import type { CSSObject } from "@emotion/react";

export enum VARIANT {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ALERT = "alert",
  SUCCESS = "success",
  LINK = "link",
}

type VariantStyles = {
  color?: CSSObject["color"];
};

export type TypographyVariant = {
  [VARIANT.PRIMARY]: VariantStyles;
  [VARIANT.SECONDARY]: VariantStyles;
  [VARIANT.ALERT]: VariantStyles;
  [VARIANT.SUCCESS]: VariantStyles;
  [VARIANT.LINK]: VariantStyles;
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
  variant?: keyof TypographyVariant;
  size?: TypographySize;
  fontWeight?: TypographyFontWeight;
  nowrap?: boolean;
};
