export const normalizeDate = (date: string) => {
  return date.split("-").slice(0, 2).join("-");
};

export const getNumberOfMonthsBetweenDates = (
  startDate?: string | Date,
  currentDate?: string | Date,
) => {
  if (!startDate || !currentDate) {
    return 0;
  }

  const _startDate =
    typeof startDate === "string"
      ? new Date(normalizeDate(startDate))
      : startDate;
  const _currentDate =
    typeof currentDate === "string"
      ? new Date(normalizeDate(currentDate))
      : currentDate;
  const offset = _startDate > _currentDate ? -1 : 1;

  let counter = 0;

  while (
    _startDate.getMonth() !== _currentDate.getMonth() ||
    _startDate.getFullYear() !== _currentDate.getFullYear()
  ) {
    _startDate.setMonth(_startDate.getMonth() + offset);
    counter = counter + 1;
  }

  return counter;
};
