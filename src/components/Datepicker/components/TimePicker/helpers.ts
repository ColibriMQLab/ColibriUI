import { addMinutes, format, isBefore, parse } from "date-fns";

export type Timestamp = {
  time: string;
  disabled?: boolean;
};

const day = new Date();

day.setHours(24, 0, 0, 0);

export const DEFAULT_TIME = { index: 24, time: "12:00" };
export const formatTime = (date: Date): string => format(date, "HH:mm");

export const generateSuggest = (interval: number = 15): Timestamp[] => {
  return new Array((24 * 60) / interval).fill(null).map((_, index) => {
    const date = addMinutes(day, index * interval);

    return {
      time: formatTime(date),
    };
  });
};

export const checkIsBeforeNow = (
  time: string,
  currentDate?: Date | null,
): boolean =>
  currentDate ? isBefore(parse(time, "HH:mm", currentDate), new Date()) : false;

export const checkIsBeforeSelectedDate = (
  time: string,
  interval: number,
  date?: Date | null,
): boolean => {
  if (date) {
    const selectedDate = new Date(date);
    selectedDate.setMinutes(selectedDate.getMinutes() + interval);
    return isBefore(parse(time, "HH:mm", date), selectedDate);
  }

  return false;
};
