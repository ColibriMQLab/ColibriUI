import React from "react";
import Calendar from ".";
import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { toISODate } from "../helpers/date";
import { getPresets } from "./utils/getPresets";
import { PRESETS } from "./components/Presets";
import { useArgs } from "@storybook/preview-api";


const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  parameters: {
    layout: "centered",
  },
  args: { onChange: fn()},
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

const Template = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <Calendar
      {...args}
      today={toISODate(new Date())}
      onChange={(val) => {
        updateArgs({ selectedDate: val.date, selectedPeriod: val.period });
        args.onChange(val);
      }}
    />
  );
};

export const Today = Template.bind({});
Today.args = {
  today: '2025-06-17',
};

export const SingleDateSelection = Template.bind({});
SingleDateSelection.args = {
  selectedDate: '2025-06-17',
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
