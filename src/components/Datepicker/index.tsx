import React from "react";
import clsx from "clsx";
import styles from "./Datepicker.module.scss";
import TimePickerInput from "./components/TimePicker";
import DatePickerInput from "./components/DatePicker";
import type { Props } from "./index.props";

const Datepicker = ({
  className,
  selectedTime,
  selectedDate,
  onChangeDate,
  onChangeTime,
}: Props) => (
  <div className={clsx(styles.root, className)}>
    <TimePickerInput selectedTime={selectedTime} onChangeTime={onChangeTime} />
    <DatePickerInput selectedDate={selectedDate} onChangeDate={onChangeDate} />
  </div>
);

export default Datepicker;
