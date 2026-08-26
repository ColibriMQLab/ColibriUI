import type {
  DatepickerSize,
  DatepickerCalendarProps,
  Props as DatepickerProps,
} from "../../index.props";

export type DatePickerProps = DatepickerCalendarProps & {
  className?: string;
  endPlaceholder?: string;
  hasError?: boolean;
  hint?: DatepickerProps["hint"];
  label?: DatepickerProps["label"];
  placeholder?: string;
  required?: boolean;
  selectedDate?: string;
  selectedRange?: DatepickerProps["selectedRange"];
  selectionMode?: DatepickerProps["selectionMode"];
  size?: DatepickerSize;
  startPlaceholder?: string;
  onChangeDate?: (date: string) => void;
  onChangeRange?: DatepickerProps["onChangeRange"];
};
