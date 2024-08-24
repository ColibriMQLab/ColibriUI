import { getNumberOfMonthsBetweenDates } from "../getNumberOfMonthsBetweenDates";

describe("Components. Calendar. Utils. getNumberOfMonthsBetweenDates", () => {
  it("should return proper number of dates", () => {
    const start = "2019-01-15";

    expect(getNumberOfMonthsBetweenDates(start, "2019-01-01")).toBe(0);
    expect(getNumberOfMonthsBetweenDates(start, "2019-01-15")).toBe(0);
    expect(getNumberOfMonthsBetweenDates(start, "2019-01-25")).toBe(0);
    expect(getNumberOfMonthsBetweenDates(start, "2019-02-01")).toBe(1);
    expect(getNumberOfMonthsBetweenDates(start, "2019-02-05")).toBe(1);
    expect(getNumberOfMonthsBetweenDates(start, "2019-03-10")).toBe(2);
    expect(getNumberOfMonthsBetweenDates(start, "2019-04-15")).toBe(3);
    expect(getNumberOfMonthsBetweenDates(start, "2019-05-20")).toBe(4);
    expect(getNumberOfMonthsBetweenDates(start, "2019-06-25")).toBe(5);
    expect(getNumberOfMonthsBetweenDates(start, "2019-07-30")).toBe(6);
    expect(getNumberOfMonthsBetweenDates(start, "2019-08-31")).toBe(7);
    expect(getNumberOfMonthsBetweenDates(start, "2019-12-01")).toBe(11);
    expect(getNumberOfMonthsBetweenDates(start, "2019-12-31")).toBe(11);

    expect(getNumberOfMonthsBetweenDates(start, "2020-01-01")).toBe(12);
    expect(getNumberOfMonthsBetweenDates(start, "2020-01-15")).toBe(12);
    expect(getNumberOfMonthsBetweenDates(start, "2020-01-25")).toBe(12);

    expect(getNumberOfMonthsBetweenDates(start, "2021-01-25")).toBe(24);
  });
});
