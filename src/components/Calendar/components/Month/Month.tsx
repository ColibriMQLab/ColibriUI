import * as React from "react";
import classNames from "classnames/bind";
import { leadingZeros } from "../../../libs/numbers/leadingZeros";
import Typography from "../../../Typography";
import {
  getShortWeekDayNameByIndex,
  getUpperMonthName,
} from "../../../helpers/date";
import { getMonthWeeks } from "../../utils/getMonthWeeks";
import styles from "./index.module.scss";
import type { FunctionComponent } from "react";

const clx = classNames.bind(styles);

export interface FCWithElements<T = {}> extends FunctionComponent<T> {}

type Props = {
  today: string;
  startDate: Date;
  activeDays?: string[];
  selectedDate?: string;
  selectedPeriod?: number;
  onDayClick: (date: string) => void;
  offsetLeft: number;
  availableDates?: string[];
};

type ComponentProps = {
  isStartOfSelection?: boolean;
  isEndOfSelection?: boolean;
  isSelected?: boolean;
  isInSelectedRange?: boolean;
  children?: React.ReactNode;
};

const Item = ({
  isSelected,
  isInSelectedRange,
  isStartOfSelection,
  isEndOfSelection,
  children,
}: ComponentProps) => {
  const noSelection =
    isStartOfSelection && isEndOfSelection ? styles.noSelection : "";
  const startClass =
    isStartOfSelection && !isEndOfSelection ? styles.startOfSelection : "";
  const endClass =
    isEndOfSelection && !isStartOfSelection ? styles.endOfSelection : "";
  const firstChildClass = isEndOfSelection ? styles.firstChild : "";
  const lastChildClass = isStartOfSelection ? styles.lastChild : "";

  if (isSelected) {
    return (
      <li
        className={clx(
          styles.selectedRangeDay,
          styles.selectedDay,
          noSelection,
          startClass,
          endClass,
          firstChildClass,
          lastChildClass,
        )}
      >
        {children}
      </li>
    );
  } else if (isInSelectedRange) {
    return <li className={clx(styles.selectedRangeDay)}>{children}</li>;
  }

  return <li className={clx(styles.day)}>{children}</li>;
};

export const Month: FCWithElements<Props> = (props) => {
  const year = props.startDate.getFullYear();
  const month = leadingZeros(props.startDate.getMonth() + 1, 2);

  return (
    <div
      data-component="Month"
      className={clx(styles.root)}
      style={{ left: props.offsetLeft ? `${props.offsetLeft}px` : undefined }}
    >
      <div className={clx(styles.monthName)}>
        <Typography tag="span" size="h3">
          {getUpperMonthName(props.startDate)}
        </Typography>
      </div>
      <div className={clx(styles.table)}>
        <ul className={clx(styles.legend)}>
          {[...Array(7)].map((empty, ...rest) => {
            const index = rest[0] + 1;

            return (
              <li className={clx(styles.day)} key={index}>
                <Typography
                  style={{
                    opacity: index > 5 ? 80 : 30,
                    color: index > 5 ? "var(--typography-alert)" : "black",
                  }}
                >
                  {getShortWeekDayNameByIndex(index)}
                </Typography>
              </li>
            );
          })}
        </ul>
        {getMonthWeeks(props).map((days, ...rest1) => {
          return (
            <ul key={`week-${rest1[0]}`} className={clx(styles.week)}>
              {days.map((day, ...rest2) => {
                const key = `day-${rest2[0]}`;

                if (day.isDummy) {
                  return <li className={clx(styles.day)} key={key} />;
                }
                const attrs = {
                  isStartOfSelection: day.isStartOfSelection,
                  isEndOfSelection: day.isEndOfSelection,
                  isSelected: day.isSelected,
                  isInSelectedRange: day.isInSelectedRange,
                };

                const dayInnerActive = day.isActive
                  ? styles.dayInnerActive
                  : "";
                return (
                  <Item {...attrs} key={key}>
                    <button
                      className={clx(styles.dayInner, dayInnerActive)}
                      style={{
                        background: day.isSelected ? "#e3e3e3" : "transparent",
                      }}
                      onClick={
                        day.isActive
                          ? () =>
                              props.onDayClick(
                                [year, month, leadingZeros(day.day, 2)].join(
                                  "-",
                                ),
                              )
                          : undefined
                      }
                    >
                      <Typography
                        size="s"
                        style={{
                          opacity: day.isActive ? 80 : 30,
                          color: day.isActive
                            ? "rgba(0, 0, 0, 0.8)"
                            : "rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {day.day}
                      </Typography>
                    </button>
                  </Item>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};
