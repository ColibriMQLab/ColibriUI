import type { ReactNode } from "react";
import type { CalendarCommonProps } from "../Calendar";

export type DatepickerSize = "s" | "m" | "l";
export type DatepickerSelectionMode = "single" | "range";
export type DatepickerRangeValue = [string, string];

export type DatepickerCalendarProps = Omit<
  CalendarCommonProps,
  "className" | "size"
>;

export type Props = DatepickerCalendarProps & {
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
