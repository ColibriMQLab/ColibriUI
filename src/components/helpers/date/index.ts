import { addDays, format, startOfWeek } from "date-fns";
import { enGB } from "date-fns/locale";

type DateFormat = string | Date;

const checkIfShouldParseDateString = (dateString: string) => {
  const pattern = /^(\d{4})\-(\d{2})\-(\d{2})(T(\d{2}):(\d{2})(:(\d{2}))?)?$/;

  return pattern.test(dateString);
};

const parseDateString = (dateString: string) => {
  const [year, month, day, hours, minutes, seconds] = dateString
    .split(/[T\:\-]/)
    .slice(0, 6);

  return {
    year: Number(year),
    month: Number(month) - 1,
    day: Number(day),
    hours: Number(hours) || 0,
    minutes: Number(minutes) || 0,
    seconds: Number(seconds) || 0,
  };
};

export const parse = (dateString: string) => {
  if (!dateString) {
    return new Date();
  }

  if (checkIfShouldParseDateString(dateString)) {
    const { year, month, day, hours, minutes, seconds } =
      parseDateString(dateString);

    return new Date(year, month, day, hours, minutes, seconds);
  }

  return new Date(dateString);
};

export const getUpperMonthName = (date: DateFormat) => {
  if (typeof date === "string" || !date) {
    date = parse(date);
  }

  return format(date, "LLLL", { locale: enGB });
};

export const getShortWeekDayNameByIndex = (index: number) => {
  const firstDOW = startOfWeek(new Date());
  return format(addDays(firstDOW, index), "EEEEEE", { locale: enGB });
};

const getDateMonth = (date: DateFormat) => {
  if (typeof date === "string" || !date) {
    date = parse(date);
  }

  return format(date, "MMMM d", { locale: enGB });
};

export const shiftDate = (date: Date, days: number) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

export const isSameMonthAndYear = (date: Date, otherDate: Date) => {
  const isSameYears = date.getFullYear() === otherDate.getFullYear();
  const isSameMonths = date.getMonth() === otherDate.getMonth();

  return isSameMonths && isSameYears;
};

export const toISODate = (date: Date) => {
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1);

  if (month.length < 2) {
    month = `0${month}`;
  }

  let day = String(date.getDate());

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

export const getPeriodDates = (startDate: DateFormat, period = 1) => {
  if (typeof startDate === "string" || !startDate) {
    startDate = parse(startDate);
  }

  if (period === 1) {
    return getDateMonth(startDate);
  }
  const endDate = shiftDate(startDate, period - 1);

  const startDateFormat = isSameMonthAndYear(startDate, endDate)
    ? startDate.getDate()
    : getDateMonth(startDate);

  return [startDateFormat, getDateMonth(endDate)].join(" – ");
};

export function clearTime(date: Date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export function getDaysDiff(dateStart: Date, dateEnd: Date) {
  const DAYS_FACTOR = 86400000; // 1000*60*60*24 - один день

  let clonedDateStart = shiftDate(dateStart, 0);
  let clonedDateEnd = shiftDate(dateEnd, 0);

  clonedDateStart = clearTime(clonedDateStart);
  clonedDateEnd = clearTime(clonedDateEnd);

  return Math.floor((clonedDateEnd - clonedDateStart) / DAYS_FACTOR);
}
