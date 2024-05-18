import type { CSSObject } from "@emotion/react";
import type { ReactNode } from "react";

export type InputSize = "s" | "m" | "l";

type VariantStyles = {
  color?: CSSObject["color"];
  backgroundColor?: CSSObject["backgroundColor"];
  borderColor?: CSSObject["borderColor"];
  boxShadow?: CSSObject["boxShadow"];
};

type PlaceholderStyles = {
  color?: CSSObject["color"];
};

type VariantStates = {
  normal?: VariantStyles;
  hovered?: VariantStyles;
  focused?: VariantStyles;
  active?: VariantStyles;
  disabled?: VariantStyles;
  error?: {
    normal?: VariantStyles;
    hovered?: VariantStyles;
    focused?: VariantStyles;
  };
};

export type InputVariant = {
  primary: VariantStates;
};

export type PlaceholderProps = {
  placeholder: PlaceholderStyles;
};

export type InputProps = {
  variant?: keyof InputVariant;
  disabled: boolean;
  error?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  size?: InputSize;
};
