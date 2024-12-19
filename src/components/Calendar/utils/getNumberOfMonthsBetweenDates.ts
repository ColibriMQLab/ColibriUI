/**
 * Returns number of months between dates
 */

export function getNumberOfMonthsBetweenDates(
  startDate: string,
  activeDate: string,
) {
  const start = new Date(normalizeDate(startDate));
  const active = new Date(normalizeDate(activeDate));
  const offset = active > start ? 1 : -1;

  let count = 0;

  while (
    start.getFullYear() !== active.getFullYear() ||
    start.getMonth() !== active.getMonth()
  ) {
    count += offset;
    start.setMonth(start.getMonth() + offset);
  }

  return count;
}

function normalizeDate(date: string) {
  return date.split("-").slice(0, 2).join("-");
}
