import React, { useCallback } from "react";
import classNames from "classnames/bind";

import {
  HorizontalSliderWithShadowControls,
  HorizontalSliderNative,
} from "../HorizontalSlider";

import { Month } from "./components/Month";
import { getParsedDate, getNumberOfMonthsBetweenDates } from "./utils";
import { useSliderLogic } from "./hooks/useSliderLogic";
import styles from "./index.module.scss";
import type { FC } from "react";
import type { Props } from "./index.props";

const clx = classNames.bind(styles);

export const HorizontalCalendar: FC<Props> = (props) => {
  const { selectedDate, startDate, monthsLimit = 12, onChange, size } = props;

  const isLargeSlider = size === "l";

  const normalizedStartDate = startDate ? new Date(startDate) : new Date();
  const normalizedSelectedDate = selectedDate
    ? new Date(selectedDate)
    : undefined;
  const { year, month, date } = getParsedDate(normalizedStartDate);

  const {
    handleStickyMonth,
    currentMonth,
    isStickyShown,
    $months,
    $slider,
    $wrapper,
    scrollLeft,
  } = useSliderLogic(isLargeSlider, startDate, selectedDate);

  const saveMonthRef = useCallback(
    (index: number) => (ref: HTMLDivElement) => ($months.current[index] = ref),
    [$months],
  );

  const monthsBetweenDates =
    getNumberOfMonthsBetweenDates(normalizedStartDate, normalizedSelectedDate) +
    1;

  const updatedMonthsLimit = Math.max(monthsBetweenDates, monthsLimit);

  const monthsStartDates: Date[] = [...Array(updatedMonthsLimit)].reduce(
    (acc, empty, index) => {
      const currentDate = index < 1 ? date : 1;

      acc[index] = new Date(year, month + index, currentDate);

      return acc;
    },
    [],
  );

  const Slider = isLargeSlider
    ? HorizontalSliderWithShadowControls
    : HorizontalSliderNative;

  const attrs = isLargeSlider
    ? {
        onScroll: handleStickyMonth,
        initialScrollLeft: scrollLeft,
        controlSize: 75,
      }
    : {
        ref: $slider,
      };

  const handleChange = useCallback(
    (userSelectedDate?: string) => {
      if (userSelectedDate) {
        onChange({ date: userSelectedDate, period: 1 });
      }
    },
    [onChange],
  );

  return (
    <div
      className={clx(styles.root)}
      ref={isLargeSlider ? $slider : null}
      data-component="HorizontalCalendar"
    >
      <Slider {...attrs} data-component="Slider">
        <div className={clx(styles.wrapper)} ref={$wrapper}>
          {monthsStartDates.map((_monthStartDate, index) => {
            return (
              <Month
                ref={saveMonthRef(index)}
                shouldHideTitle={isStickyShown && currentMonth === index}
                selectedDate={selectedDate}
                startDate={_monthStartDate}
                onChange={handleChange}
                key={String(index)}
              />
            );
          })}
        </div>
      </Slider>
    </div>
  );
};
