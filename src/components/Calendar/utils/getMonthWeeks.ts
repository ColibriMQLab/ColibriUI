import { leadingZeros } from "../../libs/numbers/leadingZeros";

type Day = {
  day: number;
  isDummy?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  isStartOfSelection?: boolean;
  isEndOfSelection?: boolean;
  isInSelectedRange?: boolean;
};

type Week = Day[];

type Options = {
  today: string;
  startDate: Date;
  activeDays?: string[];
  selectedDate?: string;
  selectedPeriod?: number;
  availableDates?: string[];
};

const dummyDay: Day = {
  day: 0,
  isDummy: true,
};

export function getMonthWeeks(options: Options): Week[] {
  const { selectedDateFrom, selectedDateTo } = getSelectedDates(options);

  const currMonth = options.startDate.getMonth();
  const weeks: Week[] = [[]];

  let currWeek = weeks[weeks.length - 1];
  const currDate = new Date(options.startDate);

  {
    // Prepending wirst week with dummy days
    let dayInWeek = getDateDayInWeek(currDate);

    while (dayInWeek) {
      weeks[0].push(dummyDay);
      dayInWeek -= 1;
    }
  }

  while (currDate.getMonth() === currMonth) {
    const currCompareDate = formatToComparable(currDate);
    const isStartOfSelection = currCompareDate === selectedDateFrom;
    const isEndOfSelection = currCompareDate === selectedDateTo;

    currWeek.push({
      day: currDate.getDate(),
      isActive: checkIfDateIsAvailable(currCompareDate, options),
      isSelected: isStartOfSelection || isEndOfSelection,
      isStartOfSelection,
      isEndOfSelection,
      isInSelectedRange:
        !!selectedDateFrom &&
        !!selectedDateTo &&
        currCompareDate > selectedDateFrom &&
        currCompareDate < selectedDateTo,
    });

    if (currWeek.length === 7) {
      currWeek = [];
      weeks.push(currWeek);
    }

    currDate.setDate(currDate.getDate() + 1);
  }

  {
    const lastWeek = weeks[weeks.length - 1];

    while (lastWeek.length < 7) {
      lastWeek.push(dummyDay);
    }
  }

  return weeks;
}

function getDateDayInWeek(date: Date) {
  const day = date.getDay() - 1;

  return day >= 0 ? day : 6;
}

function getSelectedDates(options: Options) {
  const period = options.selectedPeriod ? options.selectedPeriod - 1 : 0;
  const dateFrom = options.selectedDate
    ? new Date(options.selectedDate)
    : undefined;
  const dateTo = dateFrom
    ? new Date(dateFrom.getTime() + 24 * 60 * 60 * 1000 * period)
    : undefined;

  return {
    selectedDateFrom: dateFrom ? formatToComparable(dateFrom) : undefined,
    selectedDateTo: dateTo ? formatToComparable(dateTo) : undefined,
  };
}

function formatToComparable(date: Date) {
  return new Date(
    [
      date.getFullYear(),
      doubleDigits(date.getMonth() + 1),
      doubleDigits(date.getDate()),
    ].join("-"),
  ).getTime();
}

function doubleDigits(v: number) {
  return leadingZeros(v, 2);
}

function checkIfDateIsAvailable(date: number, options: Options) {
  const { availableDates, today } = options;

  const todayCompatible = formatToComparable(new Date(today));

  const availableDatesComparable =
    availableDates &&
    availableDates.length > 0 &&
    availableDates.map((_date) => formatToComparable(new Date(_date)));

  const isAvailableDate = availableDatesComparable
    ? availableDatesComparable.includes(date)
    : true;

  return date >= todayCompatible && isAvailableDate;
}
