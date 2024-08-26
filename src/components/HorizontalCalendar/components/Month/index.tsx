import React, { forwardRef, useCallback } from "react";
import classNames from "classnames/bind";
import { getDaysInMonth } from "date-fns";
import {
  getShortWeekDayNameByIndex,
  getUpperMonthName,
} from "../../../helpers/date";
import Typography from "../../../Typography";

import { doubleDigits, formatToComparable } from "../../utils";
import styles from "./index.module.scss";

const clx = classNames.bind(styles);

type Props = {
  startDate: Date;
  selectedDate?: string;
  onChange: (selectedDate?: string) => void;
  shouldHideTitle?: boolean;
};

export const Month = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { startDate, selectedDate, shouldHideTitle, onChange } = props;

  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const day = startDate.getDate();

  const daysToShow = getDaysInMonth(startDate) - day + 1;
  const monthName = getUpperMonthName(startDate);
  const currentYear = new Date().getFullYear();

  const normalizedSelectedDate = selectedDate
    ? new Date(selectedDate)
    : undefined;

  const handleClick = useCallback(
    (preparedDate?: string) => () => {
      onChange(preparedDate);
    },
    [onChange],
  );
  return (
    <div
      className={clx(styles.root)}
      data-component="HorizontalCalendarMonth"
      ref={ref}
    >
      <div className={clx(styles["month-name"])}>
        {monthName}
        {year === currentYear ? null : ` ${year}`}
      </div>
      <div className={clx(styles.wrapper)}>
        {[...Array(daysToShow)].map((empty, index) => {
          const dayOffset = index + day;

          const currentDate = new Date(year, month, dayOffset);

          const weekDay = new Date(year, month, dayOffset - 1).getDay();

          const weekDayName = getShortWeekDayNameByIndex(weekDay);

          const isWeekend = weekDay > 4;
          const isSelected =
            formatToComparable(normalizedSelectedDate) ===
            formatToComparable(currentDate);

          const preparedDate = isSelected
            ? undefined
            : [year, doubleDigits(month + 1), doubleDigits(dayOffset)].join(
                "-",
              );
          return (
            <div
              key={String(index)}
              className={clx(styles.day)}
              style={{
                background: isSelected ? `rgba(0, 0, 0, 0.07)` : `transparent`,
              }}
              onClick={handleClick(preparedDate)}
            >
               <div className={clx(styles['day-number'])}>{dayOffset}</div>
              <div
                className={clx(styles.name)}
                style={{ color: isWeekend ? "#F72F2F" : "rgba(0, 0, 0, 0.5)" }}
              >
                {weekDayName}
              </div>
             
            </div>
          );
        })}
      </div>
    </div>
  );
});
