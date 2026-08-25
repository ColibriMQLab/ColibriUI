import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import { Chevron } from "../Icons";
import styles from "./Calendar.module.scss";
import type { HTMLAttributes, KeyboardEvent, ReactNode, SVGProps } from "react";
import type { ButtonSize } from "../Button/index.props";

export type CalendarSize = "xs" | "s" | "m" | "l" | "xl";
export type CalendarSelectionMode = "single" | "range";
export type CalendarView = "days" | "months" | "years";

export interface CalendarEvent {
  date: Date;
  color?: string;
  label?: ReactNode;
}

interface CalendarCommonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  defaultVisibleMonth?: Date;
  defaultView?: CalendarView;
  disabledDates?: Date[] | ((date: Date) => boolean);
  events?: CalendarEvent[];
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  monthLabel?: string;
  monthsToShow?: 1 | 2;
  nextMonthLabel?: string;
  onVisibleMonthChange?: (month: Date) => void;
  previousMonthLabel?: string;
  showOutsideDays?: boolean;
  size?: CalendarSize;
  visibleMonth?: Date;
  weekStartsOn?: 0 | 1;
  yearLabel?: string;
  yearRange?: [number, number];
}

export interface CalendarSingleProps extends CalendarCommonProps {
  onChange: (value: Date) => void;
  selectionMode?: "single";
  value: Date | null;
}

export interface CalendarRangeProps extends CalendarCommonProps {
  onChange: (value: [Date | null, Date | null]) => void;
  selectionMode: "range";
  value: [Date | null, Date | null];
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");
const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);
const addDays = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const alignYearPage = (year: number) => year - (year % 12);
const isSameDay = (
  left: Date | null | undefined,
  right: Date | null | undefined,
) => Boolean(left && right && dayKey(left) === dayKey(right));
const isBefore = (left: Date, right: Date) =>
  startOfDay(left).getTime() < startOfDay(right).getTime();
const isMonthBefore = (left: Date, right: Date) =>
  startOfMonth(left).getTime() < startOfMonth(right).getTime();

const getMonthDays = (month: Date, weekStartsOn: 0 | 1) => {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
};

const isDateDisabled = (
  date: Date,
  minDate: Date | undefined,
  maxDate: Date | undefined,
  disabledDates: CalendarCommonProps["disabledDates"],
) => {
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isBefore(maxDate, date)) return true;
  if (typeof disabledDates === "function") return disabledDates(date);
  return disabledDates?.some((item) => isSameDay(item, date)) ?? false;
};
const getButtonSize = (size: CalendarSize): ButtonSize =>
  size === "xl" ? "l" : size;

const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const PreviousIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

const Calendar = (props: CalendarProps) => {
  const {
    selectionMode = "single",
    value,
    onChange,
    locale = "en-US",
    weekStartsOn = 1,
    monthsToShow = 1,
    size = "m",
    visibleMonth,
    defaultVisibleMonth,
    defaultView = "days",
    onVisibleMonthChange,
    minDate,
    maxDate,
    monthLabel = "Month",
    disabledDates,
    events = [],
    showOutsideDays = true,
    previousMonthLabel = "Previous month",
    nextMonthLabel = "Next month",
    yearLabel = "Year",
    yearRange,
    className,
    ...rest
  } = props;
  const initialDate = Array.isArray(value) ? value[0] : value;
  const initialVisibleMonth = startOfMonth(
    defaultVisibleMonth ?? initialDate ?? new Date(),
  );
  const [internalMonth, setInternalMonth] = useState(initialVisibleMonth);
  const [calendarView, setCalendarView] = useState<CalendarView>(defaultView);
  const [yearPageStart, setYearPageStart] = useState(
    alignYearPage(initialVisibleMonth.getFullYear()),
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date>(() =>
    startOfDay(initialDate ?? new Date()),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const currentMonth = startOfMonth(visibleMonth ?? internalMonth);
  const buttonSize = getButtonSize(size);
  const today = useMemo(() => startOfDay(new Date()), []);
  const monthNames = useMemo(
    () =>
      Array.from({ length: 12 }, (_, monthIndex) =>
        new Intl.DateTimeFormat(locale, { month: "long" }).format(
          new Date(2024, monthIndex, 1),
        ),
      ),
    [locale],
  );
  const yearBounds = useMemo(() => {
    const currentYear = currentMonth.getFullYear();
    const minYear =
      yearRange?.[0] ?? minDate?.getFullYear() ?? currentYear - 50;
    const maxYear =
      yearRange?.[1] ?? maxDate?.getFullYear() ?? currentYear + 50;

    return {
      max: Math.max(minYear, maxYear),
      min: Math.min(minYear, maxYear),
    };
  }, [currentMonth, maxDate, minDate, yearRange]);
  const visibleYears = useMemo(
    () => Array.from({ length: 12 }, (_, index) => yearPageStart + index),
    [yearPageStart],
  );

  const rangeValue: [Date | null, Date | null] =
    selectionMode === "range"
      ? (value as [Date | null, Date | null])
      : [null, null];
  const singleValue =
    selectionMode === "single" ? (value as Date | null) : null;

  const clampMonth = (month: Date) => {
    if (minDate && isMonthBefore(month, minDate)) return startOfMonth(minDate);
    if (maxDate && isMonthBefore(maxDate, month)) return startOfMonth(maxDate);
    return startOfMonth(month);
  };

  const setMonth = (nextMonth: Date) => {
    const normalized = clampMonth(nextMonth);
    if (visibleMonth === undefined) setInternalMonth(normalized);
    onVisibleMonthChange?.(normalized);
  };

  const isVisibleMonthDisabled = (year: number, monthIndex: number) => {
    const optionMonth = new Date(year, monthIndex, 1);
    return Boolean(
      (minDate && isMonthBefore(optionMonth, minDate)) ||
        (maxDate && isMonthBefore(maxDate, optionMonth)),
    );
  };

  const isVisibleYearDisabled = (year: number) =>
    year < yearBounds.min || year > yearBounds.max;

  const handleHeaderClick = () => {
    if (calendarView === "days") {
      setCalendarView("months");
      return;
    }

    if (calendarView === "months") {
      setYearPageStart(alignYearPage(currentMonth.getFullYear()));
      setCalendarView("years");
    }
  };

  const handlePreviousClick = () => {
    if (calendarView === "days") {
      setMonth(addMonths(currentMonth, -1));
    } else if (calendarView === "months") {
      setMonth(addMonths(currentMonth, -12));
    } else {
      setYearPageStart((year) => year - 12);
    }
  };

  const handleNextClick = () => {
    if (calendarView === "days") {
      setMonth(addMonths(currentMonth, 1));
    } else if (calendarView === "months") {
      setMonth(addMonths(currentMonth, 12));
    } else {
      setYearPageStart((year) => year + 12);
    }
  };

  const handleMonthSelect = (monthIndex: number) => {
    setMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setCalendarView("days");
  };

  const handleYearSelect = (year: number) => {
    setMonth(new Date(year, currentMonth.getMonth(), 1));
    setCalendarView("months");
  };

  const headerTitle = useMemo(() => {
    if (calendarView === "months") return String(currentMonth.getFullYear());
    if (calendarView === "years") {
      return `${yearPageStart}-${yearPageStart + visibleYears.length - 1}`;
    }

    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(currentMonth);
  }, [calendarView, currentMonth, locale, visibleYears.length, yearPageStart]);

  const isPreviousDisabled = Boolean(
    calendarView === "days"
      ? minDate && !isMonthBefore(startOfMonth(minDate), currentMonth)
      : calendarView === "months"
        ? yearBounds.min >= currentMonth.getFullYear()
        : yearPageStart <= yearBounds.min,
  );

  const isNextDisabled = Boolean(
    calendarView === "days"
      ? maxDate &&
          !isMonthBefore(
            addMonths(currentMonth, monthsToShow - 1),
            startOfMonth(maxDate),
          )
      : calendarView === "months"
        ? yearBounds.max <= currentMonth.getFullYear()
        : yearPageStart + visibleYears.length - 1 >= yearBounds.max,
  );

  const headerLabel = calendarView === "days" ? monthLabel : yearLabel;
  const canDrillUp = calendarView !== "years";

  const renderPeriodGrid = () => {
    if (calendarView === "months") {
      return (
        <div className={styles["period-grid"]}>
          {monthNames.map((monthName, monthIndex) => {
            const selected = monthIndex === currentMonth.getMonth();

            return (
              <button
                key={monthName}
                type="button"
                className={cx(
                  styles["period-button"],
                  selected && styles["period-button-selected"],
                )}
                disabled={isVisibleMonthDisabled(
                  currentMonth.getFullYear(),
                  monthIndex,
                )}
                onClick={() => handleMonthSelect(monthIndex)}
              >
                {monthName}
              </button>
            );
          })}
        </div>
      );
    }

    if (calendarView === "years") {
      return (
        <div className={styles["period-grid"]}>
          {visibleYears.map((year) => {
            const selected = year === currentMonth.getFullYear();

            return (
              <button
                key={year}
                type="button"
                className={cx(
                  styles["period-button"],
                  selected && styles["period-button-selected"],
                )}
                disabled={isVisibleYearDisabled(year)}
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </button>
            );
          })}
        </div>
      );
    }

    return null;
  };

  const selectDate = (date: Date) => {
    if (selectionMode === "single") {
      (onChange as CalendarSingleProps["onChange"])(date);
      return;
    }

    const [start, end] = rangeValue;
    const changeRange = onChange as CalendarRangeProps["onChange"];
    if (!start || end) {
      changeRange([date, null]);
    } else if (isBefore(date, start)) {
      changeRange([date, start]);
    } else {
      changeRange([start, date]);
    }
  };

  const focusDay = (date: Date) => {
    setFocusedDate(date);
    const firstVisible = currentMonth;
    const lastVisible = addMonths(currentMonth, monthsToShow);
    if (isBefore(date, firstVisible)) {
      setMonth(startOfMonth(date));
    } else if (!isBefore(date, lastVisible)) {
      setMonth(addMonths(startOfMonth(date), 1 - monthsToShow));
    }

    window.requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`[data-day="${dayKey(date)}"]`)
        ?.focus();
    });
  };

  const handleDayKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    date: Date,
  ) => {
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in offsets) {
      event.preventDefault();
      focusDay(addDays(date, offsets[event.key]));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const weekdayOffset = (date.getDay() - weekStartsOn + 7) % 7;
      focusDay(
        addDays(
          date,
          event.key === "Home" ? -weekdayOffset : 6 - weekdayOffset,
        ),
      );
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      focusDay(addMonths(date, event.key === "PageUp" ? -1 : 1));
    }
  };

  const weekdayNames = useMemo(() => {
    const sunday = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, index) => {
      const day = addDays(sunday, (index + weekStartsOn) % 7);
      return {
        isWeekend: day.getDay() === 0 || day.getDay() === 6,
        name: new Intl.DateTimeFormat(locale, { weekday: "short" })
          .format(day)
          .replace(".", ""),
      };
    });
  }, [locale, weekStartsOn]);

  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) =>
      map.set(dayKey(event.date), [
        ...(map.get(dayKey(event.date)) ?? []),
        event,
      ]),
    );
    return map;
  }, [events]);

  const rangePreviewEnd = rangeValue[0] && !rangeValue[1] ? hoveredDate : null;
  const rangeStart = rangeValue[0];
  const rangeEnd = rangeValue[1] ?? rangePreviewEnd;
  const rangeLower =
    rangeStart && rangeEnd && isBefore(rangeEnd, rangeStart)
      ? rangeEnd
      : rangeStart;
  const rangeUpper =
    rangeStart && rangeEnd && isBefore(rangeEnd, rangeStart)
      ? rangeStart
      : rangeEnd;

  return (
    <div
      {...rest}
      ref={rootRef}
      className={cx(
        styles.root,
        styles[size],
        monthsToShow === 2 && styles.double,
        className,
      )}
    >
      <div className={styles.header}>
        <div className={styles["header-side"]}>
          <Button
            variant="outline"
            size={buttonSize}
            type="button"
            className={cx(
              styles["title-button"],
              !canDrillUp && styles["title-button-static"],
            )}
            aria-label={headerLabel}
            aria-expanded={calendarView !== "days"}
            aria-disabled={!canDrillUp}
            tabIndex={canDrillUp ? undefined : -1}
            onClick={canDrillUp ? handleHeaderClick : undefined}
            iconEnd={
              canDrillUp ? (
                <Chevron className={styles["title-icon"]} aria-hidden="true" />
              ) : undefined
            }
          >
            {headerTitle}
          </Button>
        </div>
        <div className={styles["header-side"]}>
          <Button
            variant="outline"
            size={buttonSize}
            type="button"
            className={styles["nav-button"]}
            aria-label={previousMonthLabel}
            onClick={handlePreviousClick}
            disabled={isPreviousDisabled}
            icon={
              <PreviousIcon className={styles["nav-icon"]} aria-hidden="true" />
            }
          />
          <Button
            variant="outline"
            size={buttonSize}
            type="button"
            className={styles["nav-button"]}
            aria-label={nextMonthLabel}
            onClick={handleNextClick}
            disabled={isNextDisabled}
            icon={
              <NextIcon className={styles["nav-icon"]} aria-hidden="true" />
            }
          />
        </div>
      </div>

      <div className={styles.content}>
        {calendarView !== "days" && renderPeriodGrid()}

        <div
          className={cx(
            styles.calendars,
            calendarView !== "days" && styles.hidden,
          )}
        >
          {Array.from({ length: monthsToShow }, (_, monthIndex) => {
            const month = addMonths(currentMonth, monthIndex);
            const days = getMonthDays(month, weekStartsOn);
            const heading = new Intl.DateTimeFormat(locale, {
              month: "long",
              year: "numeric",
            }).format(month);

            return (
              <section
                className={styles.month}
                key={dayKey(month)}
                aria-label={heading}
              >
                {monthsToShow === 2 && (
                  <h2 className={styles.heading}>{heading}</h2>
                )}
                <div className={styles.weekdays} aria-hidden="true">
                  {weekdayNames.map((name) => (
                    <span
                      key={name.name}
                      className={cx(name.isWeekend && styles.weekend)}
                    >
                      {name.name}
                    </span>
                  ))}
                </div>
                <div className={styles.days}>
                  {days.map((date) => {
                    const outside = date.getMonth() !== month.getMonth();
                    const disabled = isDateDisabled(
                      date,
                      minDate,
                      maxDate,
                      disabledDates,
                    );
                    const selected =
                      isSameDay(singleValue, date) ||
                      isSameDay(rangeStart, date) ||
                      isSameDay(rangeValue[1], date);
                    const inRange = Boolean(
                      rangeLower &&
                        rangeUpper &&
                        !isBefore(date, rangeLower) &&
                        !isBefore(rangeUpper, date),
                    );
                    const dateEvents = eventMap.get(dayKey(date)) ?? [];
                    const dateLabel = new Intl.DateTimeFormat(locale, {
                      dateStyle: "full",
                    }).format(date);

                    return (
                      <button
                        type="button"
                        key={dayKey(date)}
                        data-day={dayKey(date)}
                        className={cx(
                          styles.day,
                          outside && styles.outside,
                          isSameDay(today, date) && styles.today,
                          inRange && styles["in-range"],
                          selected && styles.selected,
                          isSameDay(rangeStart, date) && styles["range-start"],
                          isSameDay(rangeValue[1], date) && styles["range-end"],
                        )}
                        disabled={disabled || (outside && !showOutsideDays)}
                        aria-label={dateLabel}
                        aria-pressed={selected}
                        tabIndex={isSameDay(focusedDate, date) ? 0 : -1}
                        onClick={() => {
                          selectDate(date);
                          if (outside) setMonth(startOfMonth(date));
                        }}
                        onFocus={() => setFocusedDate(date)}
                        onMouseEnter={() => setHoveredDate(date)}
                        onMouseLeave={() => setHoveredDate(null)}
                        onKeyDown={(event) => handleDayKeyDown(event, date)}
                      >
                        <span>
                          {outside && !showOutsideDays ? "" : date.getDate()}
                        </span>
                        {dateEvents.length > 0 && (
                          <span
                            className={styles.events}
                            title={dateEvents
                              .map((item) => String(item.label ?? ""))
                              .join(", ")}
                          >
                            {dateEvents.slice(0, 3).map((item, index) => (
                              <i
                                key={index}
                                style={{ backgroundColor: item.color }}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
