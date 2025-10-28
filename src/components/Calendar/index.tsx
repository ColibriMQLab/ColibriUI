import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import classNames from "classnames/bind";
import { requestIdleCallback } from "../libs/requestIdleCallback";
import { getDaysDiff } from "../helpers/date";
import { ArrowNext } from "../Icons";
import Month from "./components/Month/Month";
import { getStartMonth } from "./utils/getStartMonth";
import { Presets } from "./components/Presets";
import { getNumberOfMonthsBetweenDates } from "./utils/getNumberOfMonthsBetweenDates";
import { ContinueButton } from "./components/ContinueButton";
import styles from "./index.module.scss";
import type { MouseEvent } from "react";
import type { CalendarProps } from "./index.props";
import type { Preset } from "./components/Presets";

const clx = classNames.bind(styles);

const idleCallbackOptions = {
  timeout: 1000,
};

type CalendarState = {
  selectedDate: string | undefined;
  selectedPeriod: number | undefined;
  currentMonthOffset: number;
  contentWidth: number;
  isRangeCompleted: boolean;
};

type CalendarAction =
  | { type: "SET_SELECTED_DATE"; payload: string | undefined }
  | { type: "SET_SELECTED_PERIOD"; payload: number | undefined }
  | { type: "SET_CURRENT_MONTH_OFFSET"; payload: number }
  | { type: "SET_CONTENT_WIDTH"; payload: number }
  | { type: "SET_IS_RANGE_COMPLETED"; payload: boolean }
  | {
      type: "SELECT_DATE";
      payload: {
        date: string;
        period: number;
        rangeCompleted: boolean;
        startMonth: string;
      };
    }
  | { type: "INCREMENT_MONTH_OFFSET" }
  | { type: "DECREMENT_MONTH_OFFSET" }
  | {
      type: "SYNC_INITIAL_STATE";
      payload: {
        selectedDate?: string;
        selectedPeriod?: number;
        startMonth: string;
      };
    };

const updates: Partial<CalendarState> = {};

const calendarReducer = (
  state: CalendarState,
  action: CalendarAction,
): CalendarState => {
  switch (action.type) {
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };

    case "SET_SELECTED_PERIOD":
      return { ...state, selectedPeriod: action.payload };

    case "SET_CURRENT_MONTH_OFFSET":
      return { ...state, currentMonthOffset: action.payload };

    case "SET_CONTENT_WIDTH":
      return { ...state, contentWidth: action.payload };

    case "SET_IS_RANGE_COMPLETED":
      return { ...state, isRangeCompleted: action.payload };

    case "SELECT_DATE":
      return {
        ...state,
        selectedDate: action.payload.date,
        selectedPeriod: action.payload.period,
        isRangeCompleted: action.payload.rangeCompleted,
        currentMonthOffset: getNumberOfMonthsBetweenDates(
          action.payload.startMonth,
          action.payload.date,
        ),
      };

    case "INCREMENT_MONTH_OFFSET":
      return { ...state, currentMonthOffset: state.currentMonthOffset + 1 };

    case "DECREMENT_MONTH_OFFSET":
      return { ...state, currentMonthOffset: state.currentMonthOffset - 1 };

    case "SYNC_INITIAL_STATE":
      if (
        action.payload.selectedDate !== undefined &&
        action.payload.selectedDate !== state.selectedDate
      ) {
        updates.selectedDate = action.payload.selectedDate;
        if (action.payload.selectedDate) {
          updates.currentMonthOffset = getNumberOfMonthsBetweenDates(
            action.payload.startMonth,
            action.payload.selectedDate,
          );
        }
      }

      if (
        action.payload.selectedPeriod !== undefined &&
        action.payload.selectedPeriod !== state.selectedPeriod
      ) {
        updates.selectedPeriod = action.payload.selectedPeriod;
      }

      return Object.keys(updates).length > 0 ? { ...state, ...updates } : state;

    default:
      return state;
  }
};

const Calendar: React.FC<CalendarProps> = ({
  today,
  selectedDate: initialSelectedDate,
  selectedPeriod: initialSelectedPeriod,
  activeDates,
  datePresets,
  availableDates,
  canSelectRange,
  onChange,
  onCancel,
  minWidth = 320,
  withContinueButton = false,
  className,
  titleSize = "h3",
}) => {
  const $root = useRef<HTMLDivElement>(null);

  const startMonth = getStartMonth({ today, activeDates });

  const getInitialOffset = () => {
    if (initialSelectedDate) {
      return getNumberOfMonthsBetweenDates(startMonth, initialSelectedDate);
    } else if (activeDates && activeDates.length) {
      return getNumberOfMonthsBetweenDates(startMonth, activeDates.sort()[0]);
    }
    return 0;
  };

  const [state, dispatch] = useReducer(calendarReducer, {
    selectedDate: initialSelectedDate,
    selectedPeriod: initialSelectedPeriod,
    currentMonthOffset: getInitialOffset(),
    contentWidth: 0,
    isRangeCompleted: true,
  });

  useEffect(() => {
    dispatch({
      type: "SET_CONTENT_WIDTH",
      payload: $root.current?.offsetWidth || 0,
    });
  }, []);

  const showPrevMonth = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "DECREMENT_MONTH_OFFSET" });
  };

  const showNextMonth = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "INCREMENT_MONTH_OFFSET" });
  };

  const selectDate = useCallback(
    (date: string, period: number, rangeCompleted: boolean) => {
      dispatch({
        type: "SELECT_DATE",
        payload: { date, period, rangeCompleted, startMonth },
      });
    },
    [startMonth],
  );

  const handleDayClick = useCallback(
    (date: string) => {
      if (canSelectRange && state.selectedDate && !state.isRangeCompleted) {
        const [startDate, endDate] = [date, state.selectedDate].sort();
        const period = getDaysDiff(new Date(startDate), new Date(endDate)) + 1;

        if (onChange) {
          onChange({
            date,
            period,
          });
        }

        requestIdleCallback(
          () => selectDate(startDate, period, true),
          idleCallbackOptions,
        );
      } else {
        if (onChange) {
          onChange({
            date,
            period: 1,
          });
        }

        requestIdleCallback(
          () => selectDate(date, 1, false),
          idleCallbackOptions,
        );
      }
    },
    [
      canSelectRange,
      state.selectedDate,
      state.isRangeCompleted,
      selectDate,
      onChange,
    ],
  );

  const handlePresetSelect = useCallback(
    (preset: Preset) => {
      if (onChange) {
        onChange({
          date: preset.date,
          period: preset.period,
        });
      }

      requestIdleCallback(
        () => selectDate(preset.date, preset.period, true),
        idleCallbackOptions,
      );
    },
    [selectDate, onChange],
  );

  const commitSelectedDates = useCallback(() => {
    if (state.selectedDate && state.selectedPeriod) {
      if (onCancel) {
        onCancel();
      }
      if (onChange) {
        onChange({
          date: state.selectedDate,
          period: state.selectedPeriod,
        });
      }
    }
  }, [state.selectedDate, state.selectedPeriod, onChange, onCancel]);

  const cancelCalendar = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const getMonthStartDate = useCallback(
    (shiftIndex: number) => {
      const startDate = new Date(startMonth);
      startDate.setMonth(startDate.getMonth() + shiftIndex);
      return startDate;
    },
    [startMonth],
  );

  const commonAttrs = useMemo(
    () => ({
      selectedDate: state.selectedDate,
      selectedPeriod: state.selectedPeriod,
      activeDates,
      availableDates,
      isRangeCompleted: state.isRangeCompleted,
      onDayClick: handleDayClick,
    }),
    [
      state.selectedDate,
      state.selectedPeriod,
      activeDates,
      availableDates,
      state.isRangeCompleted,
      handleDayClick,
    ],
  );

  useEffect(() => {
    dispatch({
      type: "SYNC_INITIAL_STATE",
      payload: {
        selectedDate: initialSelectedDate,
        selectedPeriod: initialSelectedPeriod,
        startMonth,
      },
    });
  }, [initialSelectedDate, initialSelectedPeriod, startMonth]);

  return (
    <div
      className={clx(styles.root, className)}
      style={{ minWidth: `${minWidth}px` }}
      data-testid="calendar"
      ref={$root}
    >
      <>
        {state.contentWidth ? (
          <div
            data-component="Months"
            className={styles.months}
            style={{
              transform: `translate3D(${-1 * state.currentMonthOffset * state.contentWidth}px, 0, 0)`,
            }}
          >
            {[
              state.currentMonthOffset - 1,
              state.currentMonthOffset,
              state.currentMonthOffset + 1,
            ]
              .filter((index) => index >= 0)
              .map((index) => {
                const attrs = {
                  ...commonAttrs,
                  today,
                  startDate: getMonthStartDate(index),
                  offsetLeft: index * state.contentWidth,
                };

                return (
                  <Month
                    {...attrs}
                    titleSize={titleSize}
                    key={`month-${index}`}
                  />
                );
              })}
          </div>
        ) : (
          <Month
            titleSize={titleSize}
            today={today}
            startDate={getMonthStartDate(state.currentMonthOffset)}
            offsetLeft={0}
            {...commonAttrs}
          />
        )}
        <button
          className={clx(styles["month-control"], styles["month-control-prev"])}
          onClick={showPrevMonth}
          disabled={state.currentMonthOffset <= 0}
          type="button"
          role="button"
          aria-label="Prev"
        >
          <ArrowNext className={styles["month-control-prev-arrow"]} />
        </button>
        <button
          className={clx(styles["month-control"], styles["month-control-next"])}
          onClick={showNextMonth}
          disabled={state.currentMonthOffset >= 11}
          type="button"
          role="button"
          aria-label="Next"
        >
          <ArrowNext className={styles["month-control-next-arrow"]} />
        </button>
      </>
      {datePresets && (
        <Presets presets={datePresets} onPresetSelect={handlePresetSelect} />
      )}
      {withContinueButton && (
        <ContinueButton
          isChanged={
            state.selectedDate !== initialSelectedDate ||
            state.selectedPeriod !== initialSelectedPeriod
          }
          selectedDate={state.selectedDate}
          selectedPeriod={state.selectedPeriod}
          onContinue={commitSelectedDates}
          onCancel={cancelCalendar}
        />
      )}
    </div>
  );
};

export default Calendar;
