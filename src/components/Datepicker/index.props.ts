import type { ReactNode } from "react";

export type DatepickerSize = "s" | "m" | "l";
export type DatepickerSelectionMode = "single" | "range";
export type DatepickerRangeValue = [string, string];

export type Props = {
  className?: string;
  endPlaceholder?: string;
  hasError?: boolean;
  hint?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  selectedDate?: string;
  selectedRange?: DatepickerRangeValue;
  selectionMode?: DatepickerSelectionMode;
  size?: DatepickerSize;
  startPlaceholder?: string;
  onChangeDate?: (date: string) => void;
  onChangeRange?: (range: DatepickerRangeValue) => void;
};
