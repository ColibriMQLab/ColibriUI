import { useState, useRef, useCallback } from "react";

export const useSticky = (stickyOffset: number, selectedDate?: string) => {
  const $months = useRef<HTMLDivElement[]>([]);
  const normalizedSelectedDate = selectedDate
    ? new Date(selectedDate)
    : undefined;

  const _currentMonth = normalizedSelectedDate
    ? normalizedSelectedDate.getMonth()
    : 0;

  const [currentMonth, setCurrentMonth] = useState(_currentMonth);
  const [isStickyShown, setIsStickyShown] = useState(true);

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

  return {
    handleStickyMonth,
    currentMonth,
    isStickyShown,
    $months,
  };
};
