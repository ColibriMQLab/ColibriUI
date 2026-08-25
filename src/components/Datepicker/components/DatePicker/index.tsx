import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "../../../Dropdown";
import Calendar from "../../../Calendar";
import Input from "../../../Input";
import BaseInput from "../../../base/BaseInput";
import FormField from "../../../base/FormField";
import InputRoot from "../../../base/InputRoot";
import { parse, toDMYDate, toISODate } from "../../../helpers/date";
import styles from "./index.module.scss";
import type { CalendarSize } from "../../../Calendar";
import type { DatepickerRangeValue } from "../../index.props";
import type { DatePickerProps } from "./index.props";

const calendarSizeByDatepickerSize: Record<
  NonNullable<DatePickerProps["size"]>,
  CalendarSize
> = {
  l: "s",
  m: "xs",
  s: "xs",
};

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={styles["calendar-icon"]}
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    />
  </svg>
);

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  endPlaceholder,
  hasError,
  hint,
  label,
  placeholder,
  required,
  selectedDate = "",
  selectedRange = ["", ""],
  selectionMode = "single",
  size = "m",
  startPlaceholder,
  onChangeDate,
  onChangeRange,
}) => {
  const [date, setDate] = useState(selectedDate);
  const [range, setRange] = useState<DatepickerRangeValue>(selectedRange);
  const [isOpen, setIsOpen] = useState(false);
  const calendarValue = useMemo(() => (date ? parse(date) : null), [date]);
  const calendarRangeValue = useMemo<[Date | null, Date | null]>(
    () => [
      range[0] ? parse(range[0]) : null,
      range[1] ? parse(range[1]) : null,
    ],
    [range],
  );
  const calendarSize = calendarSizeByDatepickerSize[size];
  const visibleMonth = calendarValue ?? calendarRangeValue[0] ?? new Date();
  const isRangeMode = selectionMode === "range";

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setRange(selectedRange);
  }, [selectedRange]);

  const handleDateChange = (nextDate: Date) => {
    const nextValue = toISODate(nextDate);
    setDate(nextValue);
    setIsOpen(false);
    onChangeDate?.(nextValue);
  };

  const handleRangeChange = (nextRange: [Date | null, Date | null]) => {
    const nextValue: DatepickerRangeValue = [
      nextRange[0] ? toISODate(nextRange[0]) : "",
      nextRange[1] ? toISODate(nextRange[1]) : "",
    ];

    setRange(nextValue);
    if (nextValue[0] && nextValue[1]) setIsOpen(false);
    onChangeRange?.(nextValue);
  };

  const renderCalendar = () => {
    if (isRangeMode) {
      return (
        <Calendar
          className={className}
          defaultVisibleMonth={visibleMonth}
          monthsToShow={2}
          selectionMode="range"
          size={calendarSize}
          value={calendarRangeValue}
          onChange={handleRangeChange}
        />
      );
    }

    return (
      <Calendar
        className={className}
        defaultVisibleMonth={visibleMonth}
        selectionMode="single"
        size={calendarSize}
        value={calendarValue}
        onChange={handleDateChange}
      />
    );
  };

  const renderRangeInput = () => (
    <div className={styles["range-input"]}>
      <InputRoot
        className={styles["range-control-start"]}
        disabled={false}
        hasError={hasError}
        size={size}
      >
        <BaseInput
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-invalid={hasError}
          autoComplete="off"
          maxLength={10}
          placeholder={startPlaceholder ?? placeholder}
          readOnly
          required={required}
          value={toDMYDate(range[0])}
        />
      </InputRoot>
      <InputRoot
        className={styles["range-control-end"]}
        disabled={false}
        endIcon={<CalendarIcon />}
        hasError={hasError}
        size={size}
      >
        <BaseInput
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-invalid={hasError}
          autoComplete="off"
          maxLength={10}
          placeholder={endPlaceholder ?? placeholder}
          readOnly
          required={required}
          value={toDMYDate(range[1])}
        />
      </InputRoot>
    </div>
  );

  return (
    <FormField
      label={label}
      required={required}
      hint={hint}
      hasError={hasError}
    >
      <Dropdown
        visible={isOpen}
        onVisibleChange={setIsOpen}
        placement="bottom"
        preventAutoClose
        trigger={["click"]}
        overlay={
          <div className={styles["calendar-popup"]}>{renderCalendar()}</div>
        }
      >
        <div className={styles.trigger}>
          {isRangeMode ? (
            renderRangeInput()
          ) : (
            <Input
              className={styles.input}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-invalid={hasError}
              autoComplete="off"
              endIcon={<CalendarIcon />}
              hasError={hasError}
              maxLength={10}
              placeholder={placeholder}
              readOnly
              required={required}
              size={size}
              value={toDMYDate(date)}
            />
          )}
        </div>
      </Dropdown>
    </FormField>
  );
};

export default DatePicker;
