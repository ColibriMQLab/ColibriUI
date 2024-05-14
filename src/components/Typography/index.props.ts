export type TypographyVariant = {
  primary: string;
  secondary: string;
  alert: string;
  success: string;
  link: string;
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
