import React from "react";
import { useState } from "react";
import TimeSelect from "./";

import type { Meta } from "@storybook/react";
import { addHours, startOfDay } from "date-fns";

const meta: Meta<typeof TimeSelect> = {
  title: "UI/TimeSelect",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  component: TimeSelect,
} satisfies Meta<typeof TimeSelect>;

export default meta;

const LONDON_TIMEZONE_OFFSET = (): number => {
  const now = new Date();

  const londonOffsetMinutes = -new Date(
    now.toLocaleString("en-GB", { timeZone: "Europe/London" })
  ).getTimezoneOffset();

  return londonOffsetMinutes / 60;
};

const getToday = (): Date => {
  const hoursOffset =
    new Date().getTimezoneOffset() / 60 + LONDON_TIMEZONE_OFFSET();
  const londonDate = addHours(new Date(), hoursOffset);

  return startOfDay(londonDate);
};

const Template = (args) => {
  const [value, setValue] = useState<string>('');

  return (<div style={{ width: '10vw' }}>
    <TimeSelect
      {...args}
      value={value}
      fullWidth
      onChange={(v) => setValue(v)}
    /></div>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "Start time",
  placeholder: "Select options",
  interval: 10,
  currentDate: getToday()
};

export const WithOutCurrentDate = Template.bind({});

WithOutCurrentDate.args = {
  placeholder: "Select options",
  interval: 10,
};