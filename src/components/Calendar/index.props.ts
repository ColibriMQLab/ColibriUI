import type { HTMLAttributes, ReactNode } from "react";

export type CalendarSize = "xs" | "s" | "m" | "l" | "xl";
export type CalendarSelectionMode = "single" | "range";
export type CalendarView = "days" | "months" | "years";

export interface CalendarEvent {
  date: Date;
  color?: string;
  label?: ReactNode;
}

export interface CalendarCommonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  defaultVisibleMonth?: Date;
  defaultView?: CalendarView;
  disabledDates?: Date[] | ((date: Date) => boolean);
  events?: CalendarEvent[];
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  monthLabel?: string;
  monthsToShow?: 1 | 2;
  nextMonthLabel?: string;
  onVisibleMonthChange?: (month: Date) => void;
  previousMonthLabel?: string;
  showOutsideDays?: boolean;
  size?: CalendarSize;
  visibleMonth?: Date;
  weekStartsOn?: 0 | 1;
  yearLabel?: string;
  yearRange?: [number, number];
}

export interface CalendarSingleProps extends CalendarCommonProps {
  onChange: (value: Date) => void;
  selectionMode?: "single";
  value: Date | null;
}

export interface CalendarRangeProps extends CalendarCommonProps {
  onChange: (value: [Date | null, Date | null]) => void;
  selectionMode: "range";
  value: [Date | null, Date | null];
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;
