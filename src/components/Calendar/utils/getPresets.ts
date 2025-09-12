import { toISODate } from "../../helpers/date";
import { PRESETS } from "../components/Presets";

export type DatePreset = {
  name: string;
  date: string;
  period: number;
};

const format = (date: Date): string => toISODate(date);

export const addDays = (date: Date, days: number = 1): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const getToday = (): DatePreset => ({
  name: PRESETS.TODAY,
  date: format(new Date()),
  period: 1,
});

export const getTomorrow = (): DatePreset => {
  const tomorrow = addDays(new Date());
  return {
    name: PRESETS.TOMORROW,
    date: format(tomorrow),
    period: 1,
  };
};

export const getWeekends = (): DatePreset => {
  let date = new Date();
  while (![0, 6].includes(date.getDay())) {
    date = addDays(date);
  }

  return {
    name: PRESETS.WEEKENDS,
    date: format(date),
    period: date.getDay() === 6 ? 2 : 1,
  };
};

export const getCurrWeek = (): DatePreset => {
  const today = new Date();
  let date = new Date(today);
  let days = 0;

  // если сегодня понедельник, пропускаем его
  if (today.getDay() === 1) {
    date = addDays(date);
    days++;
  }

  while (date.getDay() !== 1) {
    date = addDays(date);
    days++;
  }

  return {
    name: PRESETS.CURWEEK,
    date: format(today),
    period: days,
  };
};

export const getNextWeek = (): DatePreset => {
  let date = new Date();

  // если сегодня понедельник — смещаемся на завтра
  if (date.getDay() === 1) {
    date = addDays(date);
  }

  while (date.getDay() !== 1) {
    date = addDays(date);
  }

  return {
    name: PRESETS.NEXTWEEK,
    date: format(date),
    period: 7,
  };
};

const PRESET_MAP: Record<string, () => DatePreset> = {
  [PRESETS.TODAY]: getToday,
  [PRESETS.TOMORROW]: getTomorrow,
  [PRESETS.WEEKENDS]: getWeekends,
  [PRESETS.CURWEEK]: getCurrWeek,
  [PRESETS.NEXTWEEK]: getNextWeek,
};

export function getPresets(presets: string[]): DatePreset[] {
  return presets.map((preset) => {
    const presetFn = PRESET_MAP[preset];
    if (!presetFn) {
      console.warn(`Unknown preset: ${preset}, falling back to TODAY`);
    }
    return presetFn?.() ?? getToday();
  });
}