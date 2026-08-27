import type { InputProps } from "../Input/index.props";

export type NumberInputGroupStyle = "thousand" | "lakh" | "wan" | "none";
export type NumberInputSize = "s" | "m" | "l";

export interface NumberInputValues {
  value: string;
  formattedValue: string;
  floatValue?: number;
}

export interface NumberInputProps
  extends Omit<
    InputProps,
    | "type"
    | "inputMode"
    | "value"
    | "defaultValue"
    | "onChange"
    | "min"
    | "max"
    | "prefix"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (values: NumberInputValues) => void;
  thousandSeparator?: string | false;
  decimalSeparator?: string;
  thousandsGroupStyle?: NumberInputGroupStyle;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  isAllowed?: (values: NumberInputValues) => boolean;
  clearable?: boolean;
  clearLabel?: string;
  size?: NumberInputSize;
}
