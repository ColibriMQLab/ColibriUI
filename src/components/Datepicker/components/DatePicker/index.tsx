import React, { useState } from "react";
import classNames from "classnames/bind";
import Dropdown from "../../../Dropdown";
import Calendar from "../../../Calendar";
import { toDMYDate, toISODate } from "../../../helpers/date";
import styles from "./index.module.scss";
import type { CalendarPayload } from "../../../Calendar/index.props";

const clx = classNames.bind(styles);

type Props = {
  className?: string;
  selectedDate?: string;
};

const DatePicker = ({ className, selectedDate = "" }: Props) => {
  const [date, setDate] = useState(selectedDate);
  return (
    <Dropdown
      placement="bottom"
      preventAutoClose
      fontSize={14}
      trigger={["click"]}
      overlay={
        <Calendar
          minWidth={260}
          className={styles.calendar}
          today={toISODate(new Date())}
          titleSize="h5"
          selectedDate={date}
          onChange={(payload: CalendarPayload) => {
            setDate(payload.date);
          }}
        />
      }
    >
      <div
        className={clx(
          styles["input-container"],
          styles["input-date"],
          className,
        )}
      >
        <input
          className={clx(styles["input-field"])}
          tabIndex={0}
          aria-expanded="false"
          aria-haspopup="true"
          aria-invalid="false"
          autoComplete="off"
          maxLength={7}
          readOnly
          value={toDMYDate(date)}
        />
      </div>
    </Dropdown>
  );
};

export default DatePicker;
