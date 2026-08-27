import React from "react";
import clsx from "clsx";
import styles from "./Datepicker.module.scss";
import { DatePicker as DatePickerInput } from "./components/DatePicker";
import type { Props } from "./index.props";

export const Datepicker = ({
  className,
  endPlaceholder,
  hasError,
  hint,
  label,
  placeholder,
  required,
  selectedDate,
  selectedRange,
  selectionMode,
  size = "m",
  startPlaceholder,
  onChangeDate,
  onChangeRange,
  ...calendarProps
}: Props) => (
  <div className={clsx(styles.root, className)}>
    <DatePickerInput
      {...calendarProps}
      endPlaceholder={endPlaceholder}
      hasError={hasError}
      hint={hint}
      label={label}
      placeholder={placeholder}
      required={required}
      selectedDate={selectedDate}
      selectedRange={selectedRange}
      selectionMode={selectionMode}
      size={size}
      startPlaceholder={startPlaceholder}
      onChangeDate={onChangeDate}
      onChangeRange={onChangeRange}
    />
  </div>
);
