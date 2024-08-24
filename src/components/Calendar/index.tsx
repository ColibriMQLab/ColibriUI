import React, { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames/bind";
import { requestIdleCallback } from "../libs/requestIdleCallback";
import { getDaysDiff } from "../helpers/date";
import { Month } from "./components/Month/Month";
import { getStartMonth } from "./utils/getStartMonth";
import { Presets } from "./components/Presets";
import { getNumberOfMonthsBetweenDates } from "./utils/getNumberOfMonthsBetweenDates";
import { ContinueButton } from "./components/ContinueButton";
import styles from "./index.module.scss";
import type { Preset } from "./components/Presets";

const clx = classNames.bind(styles);

const idleCallbackOptions = {
  timeout: 1000,
};

type ChangePayload = {
  date: string;
  period: number;
};

type Props = {
  today: string;
  selectedDate?: string;
  selectedPeriod?: number;
  canSelectRange?: boolean;
  activeDates?: string[];
  datePresets?: Preset[];
  availableDates?: string[];
  onChange?: (payload: ChangePayload) => void;
  onCancel?: () => void;
  withContinueButton?: boolean;
};

const Calendar: React.FC<Props> = ({
  today,
  selectedDate: initialSelectedDate,
  selectedPeriod: initialSelectedPeriod,
  activeDates,
  datePresets,
  availableDates,
  canSelectRange,
  onChange,
  onCancel,
  withContinueButton = false,
}) => {
  const $root = useRef<HTMLDivElement>(null);

  const startMonth = getStartMonth({ today, activeDates });

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [selectedPeriod, setSelectedPeriod] = useState(initialSelectedPeriod);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(() => {
    if (initialSelectedDate) {
      return getNumberOfMonthsBetweenDates(startMonth, initialSelectedDate);
    } else if (activeDates && activeDates.length) {
      return getNumberOfMonthsBetweenDates(startMonth, activeDates.sort()[0]);
    }
    return 0;
  });
  const [contentWidth, setContentWidth] = useState(0);
  const [isRangeCompleted, setIsRangeCompleted] = useState(true);

  useEffect(() => {
    setContentWidth($root.current?.offsetWidth || 0);
  }, []);

  const showPrevMonth = useCallback(() => {
    setCurrentMonthOffset((prev) => prev - 1);
  }, []);

  const showNextMonth = useCallback(() => {
    setCurrentMonthOffset((prev) => prev + 1);
  }, []);

  const selectDate = useCallback((date: string, period: number, rangeCompleted: boolean) => {
    setSelectedDate(date);
    setSelectedPeriod(period);
    setIsRangeCompleted(rangeCompleted);
    setCurrentMonthOffset(getNumberOfMonthsBetweenDates(startMonth, date));
  }, [startMonth]);

  const handleDayClick = useCallback((date: string) => {
    if (canSelectRange && selectedDate && !isRangeCompleted) {
      const [startDate, endDate] = [date, selectedDate].sort();
      const period = getDaysDiff(new Date(startDate), new Date(endDate)) + 1;

      requestIdleCallback(
        () => selectDate(startDate, period, true),
        idleCallbackOptions,
      );
    } else {
      requestIdleCallback(
        () => selectDate(date, 1, !canSelectRange),
        idleCallbackOptions,
      );
    }
  }, [canSelectRange, selectedDate, isRangeCompleted, selectDate]);

  const handlePresetSelect = useCallback((preset: Preset) => {
    requestIdleCallback(
      () => selectDate(preset.date, preset.period, true),
      idleCallbackOptions,
    );
  }, [selectDate]);

  const commitSelectedDates = useCallback(() => {
    if (selectedDate && selectedPeriod) {
      if (onCancel) {
        onCancel();
      }
      if (onChange) {
        onChange({
          date: selectedDate,
          period: selectedPeriod,
        });
      }
    }
  }, [selectedDate, selectedPeriod, onChange, onCancel]);

  const cancelCalendar = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const getMonthStartDate = useCallback((shiftIndex: number) => {
    const startDate = new Date(startMonth);
    startDate.setMonth(startDate.getMonth() + shiftIndex);
    return startDate;
  }, [startMonth]);

  const commonAttrs = {
    selectedDate,
    selectedPeriod,
    activeDates,
    availableDates,
    isRangeCompleted,
    onDayClick: handleDayClick,
  };

  return (
    <div
      className={clx(styles.root)}
      data-component="Calendar"
      ref={$root}
    >
      {contentWidth ? (
        <div
          data-component="Months"
          className={clx(styles.months)}
          style={{
            transform: `translate3D(${-1 * currentMonthOffset * contentWidth}px, 0, 0)`,
          }}
        >
          {[currentMonthOffset - 1, currentMonthOffset, currentMonthOffset + 1]
            .filter((index) => index >= 0)
            .map((index) => {
              const attrs = {
                ...commonAttrs,
                today,
                startDate: getMonthStartDate(index),
                offsetLeft: index * contentWidth,
              };

              return <Month {...attrs} key={`month-${index}`} />;
            })}
        </div>
      ) : (
        <Month
          today={today}
          startDate={getMonthStartDate(currentMonthOffset)}
          offsetLeft={0}
          {...commonAttrs}
        />
      )}
      <button
        className={clx(styles.monthControl, styles["monthControl-prev"])}
        onClick={showPrevMonth}
        disabled={currentMonthOffset <= 0}
      />
      <button
        className={clx(styles.monthControl, styles["monthControl-next"])}
        onClick={showNextMonth}
        disabled={currentMonthOffset >= 11}
      />
      {datePresets && (
        <Presets
          presets={datePresets}
          selectedDate={selectedDate}
          selectedPeriod={selectedPeriod}
          onPresetSelect={handlePresetSelect}
        />
      )}
      {withContinueButton && <ContinueButton
        isChanged={
          selectedDate !== initialSelectedDate ||
          selectedPeriod !== initialSelectedPeriod
        }
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        onContinue={commitSelectedDates}
        onCancel={cancelCalendar}
      />}
    </div>
  );
};

export default Calendar;
