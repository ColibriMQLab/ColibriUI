import { toISODate } from "../../helpers/date";
import { PRESETS } from "../components/Presets";

export type DatePreset = {
  name: string;
  date: string;
  period: number;
};

export function getPresets(presets: string[]) {
  if(!presets) {
    return;
  }

  return presets.map((preset) => {
    switch (preset) {
      case PRESETS.TODAY:
        return getToday();
      case PRESETS.TOMORROW:
        return getTomorrow();
      case PRESETS.WEEKENDS:
        return getWeekends();
      case PRESETS.CURWEEK:
        return getCurrWeek();
      case PRESETS.NEXTWEEK:
        return getNextWeek();
      default:
        break;
    }
  });
}

function getToday() {
  return {
    name: 'today',
    date: format(new Date()),
    period: 1,
  };
}

function getTomorrow() {
  const date = new Date();

  increaseDate(date);

  return {
    name: 'tomorrow',
    date: format(date),
    period: 1,
  };
}

function getWeekends() {
  const date = new Date();

  while (date.getDay() !== 0 && date.getDay() !== 6) {
    increaseDate(date);
  }

  return {
    name: 'weekends',
    date: format(date),
    period: date.getDay() === 6 ? 2 : 1,
  };
}

function getCurrWeek() {
  const today = new Date();
  const date = new Date(today);
  let days = 0;

  if (today.getDay() === 1) {
    increaseDate(date);
    days += 1;
  }

  while (date.getDay() !== 1) {
    increaseDate(date);
    days += 1;
  }

  return {
    name: 'currWeek',
    date: format(today),
    period: days,
  };
}

function getNextWeek() {
  const today = new Date();
  const date = new Date(today);

  if (today.getDay() === 1) {
    increaseDate(date);
  }

  while (date.getDay() !== 1) {
    increaseDate(date);
  }

  return {
    name: 'nextWeek',
    date: format(date),
    period: 7,
  };
}

function format(date: Date): string {
  return toISODate(date);
}

function increaseDate(date: Date) {
  date.setDate(date.getDate() + 1);
}
