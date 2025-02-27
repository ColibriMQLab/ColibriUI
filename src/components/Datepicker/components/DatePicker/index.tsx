import React, { useState } from "react";
import classNames from "classnames/bind";
import Dropdown from "../../../Dropdown";
import Calendar from "../../../Calendar";
import { toDMYDate, toISODate } from "../../../helpers/date";
import styles from "./index.module.scss";
import type { DatePickerProps } from "./index.props";
import type { CalendarPayload } from "../../../Calendar/index.props";

const clx = classNames.bind(styles);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={clx("calendar-icon")}
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
  selectedDate = "",
  onChangeDate,
}) => {
  const [date, setDate] = useState(selectedDate);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDateChange = ({ date }: CalendarPayload) => {
    setDate(date);
    onChangeDate?.(date);
  };

  return (
    <Dropdown
      placement="bottom"
      fontSize={14}
      trigger={["click"]}
      overlay={
        <Calendar
          minWidth={260}
          className={clx("calendar", className)}
          today={toISODate(new Date())}
          titleSize="h5"
          selectedDate={date}
          onChange={handleDateChange}
        />
      }
    >
      <div className={clx("input-container", "input-date", className)}>
        <input
          className={clx("input-field")}
          tabIndex={0}
          aria-expanded="false"
          aria-haspopup="true"
          aria-invalid="false"
          autoComplete="off"
          maxLength={7}
          readOnly
          value={toDMYDate(date)}
        />
        <CalendarIcon />
      </div>
    </Dropdown>
  );
};

export default DatePicker;
