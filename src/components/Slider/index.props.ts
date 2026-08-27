import type { HTMLAttributes, ReactNode } from "react";

export type SliderSize = "s" | "m" | "l";
export type SliderView = "default" | "accent" | "gradient";
export type SliderOrientation = "horizontal" | "vertical";
export type SliderPointerSize = "small" | "large" | "none";

export interface SliderTick {
  value: number;
  label?: ReactNode;
}

interface SliderCommonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  labelContent?: ReactNode;
  labelPlacement?: "top" | "left" | "none";
  orientation?: SliderOrientation;
  reversed?: boolean;
  disabled?: boolean;
  size?: SliderSize;
  view?: SliderView | string;
  pointerSize?: SliderPointerSize;
  pointerVisibility?: "always" | "hover";
  showValue?: boolean;
  valueFormatter?: (value: number) => ReactNode;
  ticks?: Array<number | SliderTick>;
  tickType?: "bullet" | "separator";
}

export interface SliderSingleProps extends SliderCommonProps {
  mode?: "single";
  value: number;
  onChange: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
  ariaLabel?: string;
  name?: string;
}

export interface SliderRangeProps extends SliderCommonProps {
  mode: "range";
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onChangeCommitted?: (value: [number, number]) => void;
  ariaLabel?: [string, string];
  name?: [string, string];
  minDistance?: number;
}

export type SliderProps = SliderSingleProps | SliderRangeProps;
