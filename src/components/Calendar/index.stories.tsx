import React from "react";
import Calendar from ".";
import type { Meta, StoryFn } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { toISODate } from "../helpers/date";
import { getPresets } from "./utils/getPresets";
import { PRESETS } from "./components/Presets";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Calendar>;

export default meta;

// Type Template as StoryFn.
const Template: StoryFn<typeof Calendar> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <Calendar
      {...args}
      today={toISODate(new Date())}
      onChange={(val) => {
        updateArgs({ selectedDate: val.date, selectedPeriod: val.period });
        args.onChange?.(val);
      }}
    />
  );
};

// TS now knows about .args.
export const Today = Template.bind({});
Today.args = {
  today: toISODate(new Date()),
  selectedDate: toISODate(new Date()),
};

// Other scenarios stay unchanged.
export const SingleDateSelection = Template.bind({});
SingleDateSelection.args = {
  selectedDate: "2025-12-17",
};

export const RangeSelection = Template.bind({});
RangeSelection.args = {
  canSelectRange: true,
  selectedDate: toISODate(new Date()),
};

export const WithPresetsAndRange = Template.bind({});
WithPresetsAndRange.args = {
  datePresets: getPresets([PRESETS.TODAY, PRESETS.TOMORROW]),
  canSelectRange: true,
};

export const PreselectedRange = Template.bind({});
PreselectedRange.args = {
  selectedDate: toISODate(new Date()),
  selectedPeriod: 3,
  withContinueButton: true,
};

export const LimitedByAvailableDates = Template.bind({});
LimitedByAvailableDates.args = {
  availableDates: [
    toISODate(new Date()),
    toISODate(new Date(Date.now() + 86400000)),
  ],
};

export const WithCustomMinWidth = Template.bind({});
WithCustomMinWidth.args = {
  minWidth: 500,
};

// Scenarios that demonstrate different months.
export const ShowDecember = Template.bind({});
ShowDecember.args = {
  selectedDate: "2025-12-15",
  today: "2025-01-15", // Today is in January, but December is shown.
};

export const ShowJune = Template.bind({});
ShowJune.args = {
  selectedDate: "2025-06-20",
  today: "2025-01-15", // Today is in January, but June is shown.
};

// Scenarios with active dates.
export const WithActiveDates = Template.bind({});
WithActiveDates.args = {
  activeDates: [
    "2025-01-15",
    "2025-01-16",
    "2025-01-17",
    "2025-02-10",
    "2025-02-11",
  ],
  selectedDate: "2025-01-15",
};

export const ShowMonthByActiveDates = Template.bind({});
ShowMonthByActiveDates.args = {
  activeDates: [
    "2025-08-15", // August.
    "2025-08-16",
  ],
  today: "2025-01-15",
};

// Scenarios with presets.
export const AllPresets = Template.bind({});
AllPresets.args = {
  datePresets: getPresets([
    PRESETS.TODAY,
    PRESETS.TOMORROW,
    PRESETS.CURWEEK,
    PRESETS.NEXTWEEK,
    PRESETS.WEEKENDS,
  ]),
  canSelectRange: true,
};

export const OnlyWeekPresets = Template.bind({});
OnlyWeekPresets.args = {
  datePresets: getPresets([PRESETS.CURWEEK, PRESETS.NEXTWEEK]),
  canSelectRange: true,
};

// Scenarios with the continue button.
export const WithContinueButton = Template.bind({});
WithContinueButton.args = {
  withContinueButton: true,
  selectedDate: toISODate(new Date()),
  selectedPeriod: 1,
  canSelectRange: true,
};

export const WithContinueButtonAndPresets = Template.bind({});
WithContinueButtonAndPresets.args = {
  withContinueButton: true,
  datePresets: getPresets([PRESETS.TODAY, PRESETS.TOMORROW, PRESETS.CURWEEK]),
  canSelectRange: true,
};

// Scenarios with different title sizes.
export const SmallTitle = Template.bind({});
SmallTitle.args = {
  titleSize: "h4",
  selectedDate: toISODate(new Date()),
};

export const LargeTitle = Template.bind({});
LargeTitle.args = {
  titleSize: "h2",
  selectedDate: toISODate(new Date()),
};

export const EndOfYear = Template.bind({});
EndOfYear.args = {
  selectedDate: "2025-12-31",
  today: "2025-01-15",
};

// Interactive scenarios.
export const InteractiveRangeSelection = Template.bind({});
InteractiveRangeSelection.args = {
  canSelectRange: true,
  datePresets: getPresets([PRESETS.CURWEEK, PRESETS.NEXTWEEK]),
  withContinueButton: true,
};

// Scenario with a custom class.
export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  className: "custom-calendar-style",
  selectedDate: toISODate(new Date()),
  minWidth: 400,
};
