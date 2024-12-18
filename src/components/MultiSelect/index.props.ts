import type { FormFieldProps } from "../base/FormField/index.props";

export type GroupOptions = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type Coordinates = {
  top: number;
  height: number;
};

export type Group = {
  title?: string;
  options: GroupOptions[];
};

type Size = "s" | "m" | "l";

export interface MultiSelectProps extends Omit<FormFieldProps, "children"> {
  groups: Group[];
  className?: string;
  zIndex?: number;
  fontSize?: number;
  disabled?: boolean;

  fullWidth?: boolean;
  required?: boolean;
  size?: Size;
  placeholder?: string;
  name?: string;
}
