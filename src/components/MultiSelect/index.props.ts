import { CSSProperties } from "react";
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

export type GroupProps = {
  value: string;
  title: string;
  options: GroupOptions[];
};

type Size = "s" | "m" | "l";

type Type = "chip";

export type SelectedItem = { group: string; option: string };
export interface MultiSelectProps extends Omit<FormFieldProps, "children"> {
  groups: GroupProps[];
  className?: string;
  zIndex?: number;
  fontSize?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  size?: Size;
  placeholder?: string;
  name?: string;
  type?: Type;
  style?: CSSProperties;
  value?: SelectedItem[];
  onChange?: (value: SelectedItem[]) => void;
}
