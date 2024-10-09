import type { ReactNode } from "react";
import type { FormFieldProps } from "../base/FormField/index.props";

export interface IOption<T extends string> {
  value: T;
  label: ReactNode;
}

export interface SelectProps<T extends string>
  extends Omit<FormFieldProps, "children"> {
  options: IOption<T>[];
  value?: T;
  zIndex?: number;
  onChange: (value: T) => void;
  disabled?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
}

export type Coordinates = {
  top: number;
  height: number;
};
