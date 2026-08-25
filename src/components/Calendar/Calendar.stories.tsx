import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";

import Calendar from ".";
import type { CalendarProps, CalendarSize } from ".";

const baseMonth = new Date(2026, 4, 1);
const selectedDate = new Date(2026, 4, 14);
const rangeStart = new Date(2026, 4, 12);
const rangeEnd = new Date(2026, 4, 18);

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  args: {
    defaultVisibleMonth: baseMonth,
    defaultView: "days",
    locale: "en-US",
    monthLabel: "Month",
    monthsToShow: 1,
    nextMonthLabel: "Next month",
    onChange: fn(),
    onVisibleMonthChange: fn(),
    previousMonthLabel: "Previous month",
    showOutsideDays: true,
    size: "m",
    weekStartsOn: 1,
    yearLabel: "Year",
  },
  argTypes: {
    className: { control: "text" },
    defaultVisibleMonth: { control: "date" },
    defaultView: {
      control: "inline-radio",
      options: ["days", "months", "years"],
    },
    disabledDates: { control: false },
    events: { control: false },
    locale: { control: "text" },
    maxDate: { control: "date" },
    minDate: { control: "date" },
    monthLabel: { control: "text" },
    monthsToShow: { control: "inline-radio", options: [1, 2] },
    nextMonthLabel: { control: "text" },
    onChange: { control: false },
    onVisibleMonthChange: { control: false },
    previousMonthLabel: { control: "text" },
    selectionMode: { control: "inline-radio", options: ["single", "range"] },
    showOutsideDays: { control: "boolean" },
    size: {
      control: "inline-radio",
      options: ["xs", "s", "m", "l", "xl"],
    },
    value: { control: false },
    visibleMonth: { control: false },
    weekStartsOn: { control: "inline-radio", options: [0, 1] },
    yearLabel: { control: "text" },
    yearRange: { control: "object" },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

type SingleArgs = Omit<
  Extract<CalendarProps, { selectionMode?: "single" }>,
  "selectionMode" | "value"
>;

type RangeArgs = Omit<
  Extract<CalendarProps, { selectionMode: "range" }>,
  "selectionMode" | "value"
>;

const SingleExample = (args: SingleArgs) => {
  const [value, setValue] = useState<Date | null>(selectedDate);
  const { onChange, ...calendarArgs } = args;
  const handleChange = (nextValue: Date) => {
    setValue(nextValue);
    onChange(nextValue);
  };

  return (
    <Calendar
      {...calendarArgs}
      selectionMode="single"
      value={value}
      onChange={handleChange}
    />
  );
};

const RangeExample = (args: RangeArgs) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    rangeStart,
    rangeEnd,
  ]);
  const { onChange, ...calendarArgs } = args;
  const handleChange = (nextValue: [Date | null, Date | null]) => {
    setValue(nextValue);
    onChange(nextValue);
  };

  return (
    <Calendar
      {...calendarArgs}
      selectionMode="range"
      value={value}
      onChange={handleChange}
    />
  );
};

const SizesExample = (args: SingleArgs) => {
  const [values, setValues] = useState<Record<CalendarSize, Date | null>>({
    l: selectedDate,
    m: selectedDate,
    s: selectedDate,
    xl: selectedDate,
    xs: selectedDate,
  });
  const { onChange, ...calendarArgs } = args;

  return (
    <div style={{ display: "grid", gap: "var(--space-5)" }}>
      {(["xs", "s", "m", "l", "xl"] satisfies CalendarSize[]).map((size) => (
        <Calendar
          {...calendarArgs}
          key={size}
          selectionMode="single"
          size={size}
          value={values[size]}
          onChange={(nextValue) => {
            setValues((currentValues) => ({
              ...currentValues,
              [size]: nextValue,
            }));
            onChange(nextValue);
          }}
        />
      ))}
    </div>
  );
};

export const Single: Story = {
  render: (args) => <SingleExample {...args} />,
};

export const Range: Story = {
  render: (args) => <RangeExample {...args} />,
};

export const DoubleMonth: Story = {
  args: { monthsToShow: 2 },
  render: (args) => <RangeExample {...args} />,
};

export const MonthSelection: Story = {
  args: { defaultView: "months" },
  render: (args) => <SingleExample {...args} />,
};

export const YearSelection: Story = {
  args: { defaultView: "years" },
  render: (args) => <SingleExample {...args} />,
};

export const Sizes: Story = {
  render: (args) => <SizesExample {...args} />,
};

export const WeekStartsOnSunday: Story = {
  args: { weekStartsOn: 0 },
  render: (args) => <SingleExample {...args} />,
};

export const WithoutOutsideDays: Story = {
  args: { showOutsideDays: false },
  render: (args) => <SingleExample {...args} />,
};

export const WithLimits: Story = {
  args: {
    maxDate: new Date(2026, 4, 24),
    minDate: new Date(2026, 4, 8),
    yearRange: [2026, 2026],
  },
  render: (args) => <SingleExample {...args} />,
};

export const WithDisabledDates: Story = {
  args: {
    disabledDates: [
      new Date(2026, 4, 6),
      new Date(2026, 4, 7),
      new Date(2026, 4, 20),
    ],
  },
  render: (args) => <SingleExample {...args} />,
};

export const WithDisabledDateMatcher: Story = {
  args: {
    disabledDates: (date) => date.getDay() === 0 || date.getDay() === 6,
  },
  render: (args) => <SingleExample {...args} />,
};

export const WithEvents: Story = {
  args: {
    events: [
      {
        color: "var(--color-expressive-blue)",
        date: new Date(2026, 4, 14),
        label: "Release",
      },
      {
        color: "var(--color-expressive-pink)",
        date: new Date(2026, 4, 18),
        label: "Design review",
      },
      {
        color: "var(--color-expressive-orange)",
        date: new Date(2026, 4, 18),
        label: "Customer call",
      },
    ],
  },
  render: (args) => <SingleExample {...args} />,
};

export const ControlledVisibleMonth: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(selectedDate);
    const [visibleMonth, setVisibleMonth] = useState(baseMonth);
    const handleChange = (nextValue: Date) => {
      setValue(nextValue);
      args.onChange(nextValue);
    };
    const handleVisibleMonthChange = (nextMonth: Date) => {
      setVisibleMonth(nextMonth);
      args.onVisibleMonthChange(nextMonth);
    };

    return (
      <Calendar
        {...args}
        selectionMode="single"
        value={value}
        visibleMonth={visibleMonth}
        onChange={handleChange}
        onVisibleMonthChange={handleVisibleMonthChange}
      />
    );
  },
};
