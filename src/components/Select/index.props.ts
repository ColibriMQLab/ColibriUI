import type { ReactNode } from "react";
import type { FormFieldProps } from "../base/FormField/index.props";

type Size = "s" | "m" | "l";

export type Coordinates = {
  height: number;
  top: number;
};

export interface IOption<T extends string> {
  disabled?: boolean;
  label: ReactNode;
  value: T;
}

export interface SelectProps<T extends string>
  extends Omit<FormFieldProps, "children" | "labelId"> {
  /** Accessible name of the trigger when no visible `label` is passed. */
  "aria-label"?: string;
  className?: string;
  customInputRoot?: ReactNode;
  disabled?: boolean;
  fontSize?: number;
  fullWidth?: boolean;
  name?: string;
  onChange: (value: T) => void;
  options: IOption<T>[];
  placeholder?: string;
  required?: boolean;
  size?: Size;
  value?: T;
  zIndex?: number;
}
