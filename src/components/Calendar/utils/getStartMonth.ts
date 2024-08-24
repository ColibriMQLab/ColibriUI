import { leadingZeros } from "../../libs/numbers/leadingZeros";

type Options = {
  today?: string;
  activeDates?: string[];
};

export function getStartMonth({
  today = "",
  activeDates = [""],
}: Options): string {
  const sortedDates = ([] as string[])
    .concat(activeDates, today)
    .filter(Boolean)
    .sort();
  const date = new Date(sortedDates[0]);

  return [date.getFullYear(), leadingZeros(date.getMonth() + 1, 2)].join("-");
}
