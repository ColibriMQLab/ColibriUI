import { useState, useRef, useCallback, useEffect } from "react";

import { getNumberOfMonthsBetweenDates } from "../utils";

const STICKY_DESKTOP_OFFSET = 150;
const STICKY_TOUCH_OFFSET = 85;

export const useSliderLogic = (
  isLargeSlider: boolean,
  startDate?: string,
  selectedDate?: string,
) => {
  const $months = useRef<HTMLDivElement[]>([]);
  const $slider = useRef<HTMLDivElement>(null);
  const $wrapper = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const getSliderWidth = () => {
    if (!$slider.current) {
      return 0;
    }

    return $slider.current.clientWidth;
  };

  const getCurrentMonth = () => {
    const normalizedStartDate = startDate ? new Date(startDate) : new Date();

    return getNumberOfMonthsBetweenDates(
      normalizedStartDate,
      normalizedSelectedDate,
    );
  };

  const normalizedSelectedDate = selectedDate
    ? new Date(selectedDate)
    : undefined;

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [isStickyShown, setIsStickyShown] = useState(false);

  const stickyOffset = isLargeSlider
    ? STICKY_DESKTOP_OFFSET
    : STICKY_TOUCH_OFFSET;

  const handleStickyMonth = useCallback(
    (scrollValue: number) => {
      let index = 0;

      while (index < $months.current.length) {
        const { offsetLeft, offsetWidth } = $months.current[index];

        if (offsetLeft + offsetWidth - scrollValue > stickyOffset) {
          setCurrentMonth(index);
          setIsStickyShown(true);

          return;
        }

        index = index + 1;
      }

      setIsStickyShown(false);
    },
    [setCurrentMonth, setIsStickyShown, stickyOffset],
  );

  const handleScroll = useCallback(() => {
    if ($slider.current) {
      handleStickyMonth($slider.current.scrollLeft);
    }
  }, [handleStickyMonth]);

  const setSliderScrollLeft = () => {
    if (!$months.current || !$wrapper.current) {
      return;
    }

    const _currentMonth = getCurrentMonth();

    const totalMonthsWidth = $wrapper.current.offsetWidth;

    const normalizedStartDate = startDate ? new Date(startDate) : new Date();

    let daysOffset = normalizedSelectedDate
      ? normalizedSelectedDate.getDate()
      : 0;

    daysOffset =
      _currentMonth > 0
        ? daysOffset
        : daysOffset - normalizedStartDate.getDate();

    const monthsWidth = $months.current
      .slice(0, getCurrentMonth())
      .reduce((sum, $month) => sum + $month.offsetWidth, 0);

    // day width with margin-right
    const dayWidth = isLargeSlider ? 55 : 45;

    const totalWidth = monthsWidth + daysOffset * dayWidth - dayWidth / 2;

    let _scrollLeft = Math.max(totalWidth - getSliderWidth() / 2, 0);

    const sliderControlWidth = isLargeSlider ? 75 : 0;

    const lastMonthOffset = totalMonthsWidth - getSliderWidth();

    if (totalWidth > lastMonthOffset + sliderControlWidth) {
      _scrollLeft = lastMonthOffset;
    }

    if (_scrollLeft > 0) {
      setIsStickyShown(true);
    }

    handleStickyMonth(_scrollLeft);

    setScrollLeft(_scrollLeft);
  };

  useEffect(() => {
    if (isLargeSlider) {
      return;
    }

    const _slider = $slider.current;

    if (_slider) {
      _slider.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (_slider) {
        _slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLargeSlider, handleScroll]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    if (isLargeSlider) {
      return setSliderScrollLeft();
    }

    const _slider = $slider.current;

    if (_slider) {
      setSliderScrollLeft();
      _slider.scrollLeft = scrollLeft;
    }
  }, [selectedDate, scrollLeft]);

  return {
    handleStickyMonth,
    currentMonth,
    isStickyShown,
    scrollLeft,
    $months,
    $slider,
    $wrapper,
  };
};
