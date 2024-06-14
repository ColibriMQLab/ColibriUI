import type { ReactNode } from "react";
import type { CSSObject } from "@emotion/react";

type VariantStyles = {
  backgroundColor?: CSSObject["backgroundColor"];
  borderColor?: CSSObject["borderColor"];
  boxShadow?: CSSObject["boxShadow"];
};

type VariantStates = {
  normal?: VariantStyles;
  hovered?: VariantStyles;
  checked?: VariantStyles;
  focused?: VariantStyles;
  active?: VariantStyles;
  disabled?: VariantStyles;
};

export type CheckboxVariant = {
  primary: VariantStates;
};

export interface CheckboxProps {
  variant?: keyof CheckboxVariant;
  size?: "s" | "m" | "l";
  id?: string;
  name?: string;
  value?: string | number;
  label?: ReactNode;
  hint?: ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  isError?: boolean;
}
