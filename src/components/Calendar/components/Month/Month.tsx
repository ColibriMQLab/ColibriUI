import * as React from "react";
import classNames from "classnames/bind";
import { leadingZeros } from "../../../libs/numbers/leadingZeros";
import Typography from "../../../Typography";
import {
  getShortWeekDayNameByIndex,
  getUpperMonthName,
} from "../../../helpers/date";
import generateUniqID from "../../../helpers/generateUniqID";
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
    isStartOfSelection && isEndOfSelection ? styles["no-selection"] : "";
  const startClass =
    isStartOfSelection && !isEndOfSelection ? styles["start-of-selection"] : "";
  const endClass =
    isEndOfSelection && !isStartOfSelection ? styles["end-of-selection"] : "";
  const firstChildClass = isEndOfSelection ? styles["first-child"] : "";
  const lastChildClass = isStartOfSelection ? styles["last-child"] : "";

  if (isSelected) {
    return (
      <li
        className={clx(
          styles["selected-range-day"],
          styles["selected-day"],
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
    return <li className={clx(styles["selected-range-day"])}>{children}</li>;
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
      <div className={clx(styles["month-name"])}>
        <Typography tag="span" size="h3">
          {getUpperMonthName(props.startDate)}
        </Typography>
      </div>
      <div className={clx(styles.table)}>
        <ul className={clx(styles.legend)}>
          {[...Array(7)].map((empty, ...rest) => {
            const index = rest[0] + 1;

            return (
              <li className={clx(styles.day)} key={generateUniqID(index)}>
                <Typography
                  style={{
                    opacity: index > 5 ? 80 : 30,
                    color:
                      index > 5
                        ? "var(--typography-alert)"
                        : "var(--palette-black)",
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
                  ? styles["day-inner-active"]
                  : "";

                return (
                  <Item {...attrs} key={key}>
                    <button
                      className={clx(styles["day-inner"], dayInnerActive)}
                      style={{
                        background: day.isSelected
                          ? "var(--palette-bg-2)"
                          : "transparent",
                      }}
                      role="button"
                      type="button"
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
