import { addDays, format, startOfWeek, parseISO, isValid } from "date-fns";
import { enGB } from "date-fns/locale";

type DateFormat = string | Date;

// Helper to parse date strings with fallback
export const parse = (dateInput: DateFormat): Date => {
  if (!dateInput) {
    return new Date();
  }

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  return isValid(date) ? date : new Date(dateInput);
};

// Get full month name with the first letter capitalized
export const getUpperMonthName = (date: DateFormat): string => {
  const parsedDate = parse(date);
  return format(parsedDate, "LLLL", { locale: enGB });
};

// Get short weekday name by index (e.g., Mo, Tu, etc.)
export const getShortWeekDayNameByIndex = (index: number): string => {
  const firstDayOfWeek = startOfWeek(new Date());
  return format(addDays(firstDayOfWeek, index), "EEEEEE", { locale: enGB });
};

// Get formatted date string with month and day
const getDateMonth = (date: DateFormat): string => {
  const parsedDate = parse(date);
  return format(parsedDate, "MMMM d", { locale: enGB });
};

// Shift the date by a number of days
export const shiftDate = (date: Date, days: number): Date =>
  addDays(date, days);

// Check if two dates are in the same month and year
export const isSameMonthAndYear = (date: Date, otherDate: Date): boolean =>
  date.getFullYear() === otherDate.getFullYear() &&
  date.getMonth() === otherDate.getMonth();

// Convert date to ISO format (YYYY-MM-DD)
export const toISODate = (date: Date): string => format(date, "yyyy-MM-dd");

// Convert date to DMY format (dd.MM.yyyy)
export const toDMYDate = (dateISO: string): string =>
  dateISO ? format(new Date(dateISO), "dd.MM.yyyy") : "";

// Get the period dates as a formatted string
export const getPeriodDates = (startDate: DateFormat, period = 1): string => {
  const start = parse(startDate);
  if (period === 1) {
    return getDateMonth(start);
  }

  const end = shiftDate(start, period - 1);
  const startDateFormat = isSameMonthAndYear(start, end)
    ? format(start, "d")
    : getDateMonth(start);

  return `${startDateFormat} – ${getDateMonth(end)}`;
};

// Clear time from a date
export const clearTime = (date: Date): Date =>
  new Date(date.setHours(0, 0, 0, 0));

// Get the difference in days between two dates
export const getDaysDiff = (dateStart: Date, dateEnd: Date): number => {
  const start = clearTime(dateStart).getTime();
  const end = clearTime(dateEnd).getTime();

  return Math.round((end - start) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};
