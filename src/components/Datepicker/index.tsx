import React from "react";
import classNames from "classnames/bind";
import styles from "./Datepicker.module.scss";
import TimePickerInput from "./components/TimePicker";
import DatePickerInput from "./components/DatePicker";

const clx = classNames.bind(styles);

type Props = {
  className?: string;
};

const Datepicker = ({ className }: Props) => {
  return (
    <div className={clx(styles.root, className)}>
      <TimePickerInput />
      <DatePickerInput />
    </div>
  );
};

export default Datepicker;
