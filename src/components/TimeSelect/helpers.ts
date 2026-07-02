import { addMinutes, format, isBefore, parse } from "date-fns";

export type Timestamp = {
  time: string;
  disabled?: boolean;
};

const day = new Date();
day.setHours(24, 0, 0, 0);

export const DEFAULT_TIME = { index: 24, time: "12:00" };
export const formatTime = (date: Date): string => format(date, "HH:mm");

export const generateSuggest = (interval: number = 15): Timestamp[] =>
  new Array((24 * 60) / interval).fill(null).map((_, index) => {
    const date = addMinutes(day, index * interval);

    return {
      time: formatTime(date),
    };
  });

export const checkIsBeforeNow = (
  time: string,
  currentDate?: Date | null,
): boolean => {
  if (!currentDate) return false;
  const baseDate = new Date(currentDate);
  baseDate.setHours(0, 0, 0, 0);
  const parsedTime = parse(time, "HH:mm", baseDate);
  return isBefore(parsedTime, currentDate);
};

export const checkIsBeforeSelectedDate = (
  time: string,
  interval: number,
  date?: Date | null,
): boolean => {
  if (date) {
    const selectedDate = new Date(date);
    selectedDate.setMinutes(selectedDate.getMinutes() + interval);

    const baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);

    const parsedTime = parse(time, "HH:mm", baseDate);
    return isBefore(parsedTime, selectedDate);
  }

  return false;
};

export type TimeRange = { start: string; end: string };

export const isTimeInRange = (
  timeString: string,
  range: TimeRange,
): boolean => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  const [startHours, startMinutes] = range.start.split(":").map(Number);
  const startTotalMinutes = startHours * 60 + startMinutes;

  const [endHours, endMinutes] = range.end.split(":").map(Number);
  const endTotalMinutes = endHours * 60 + endMinutes;

  return totalMinutes >= startTotalMinutes && totalMinutes <= endTotalMinutes;
};
