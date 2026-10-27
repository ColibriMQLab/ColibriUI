import type { ReactNode } from "react";
import type { CalendarCommonProps } from "../Calendar";
import type { TestIdProps } from "../helpers/testId";

export type DatepickerSize = "s" | "m" | "l";
export type DatepickerSelectionMode = "single" | "range";
export type DatepickerRangeValue = [string, string];

export type DatepickerCalendarProps = Omit<
  CalendarCommonProps,
  "className" | "size"
>;

export type Props = DatepickerCalendarProps &
  TestIdProps & {
    className?: string;
    disabled?: boolean;
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
