import { leadingZeros } from "../../libs/numbers/leadingZeros";

export const doubleDigits = (v: number) => {
  return leadingZeros(v, 2);
};

export const formatToComparable = (date?: Date) => {
  if (!date) {
    return;
  }

  return new Date(
    [
      date.getFullYear(),
      doubleDigits(date.getMonth() + 1),
      doubleDigits(date.getDate()),
    ].join("-"),
  ).getTime();
};
