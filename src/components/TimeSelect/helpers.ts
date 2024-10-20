import { addMinutes, format } from "date-fns";
import type { Timestamp } from "./index.props";

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
