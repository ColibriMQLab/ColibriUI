import React from "react";
import { useState } from "react";
import TimeSelect from "./";

import type { Meta } from "@storybook/react-webpack5";

const meta: Meta<typeof TimeSelect> = {
  title: "UI/TimeSelect",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  component: TimeSelect,
} satisfies Meta<typeof TimeSelect>;

export default meta;

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
  currentDate: new Date()
};

export const WithOutCurrentDate = Template.bind({});

WithOutCurrentDate.args = {
  placeholder: "Select options",
  interval: 10,
};

export const WithSelectedDate = Template.bind({});

WithSelectedDate.args = {
  label: "End time (start was 14:30)",
  placeholder: "Select end time",
  interval: 15,
  selectedDate: new Date('2024-07-24T14:30:00')
};

export const WithPastSelectedDate = Template.bind({});

WithPastSelectedDate.args = {
  label: "End time (start was 10:00)",
  placeholder: "Select end time", 
  interval: 30,
  selectedDate: new Date('2024-07-24T10:00:00')
};

export const WithCurrentAndSelectedDate = Template.bind({});

WithCurrentAndSelectedDate.args = {
  label: "End time (considering both current and start time)",
  placeholder: "Select end time",
  interval: 15,
  currentDate: new Date('2024-07-24T12:00:00'),
  selectedDate: new Date('2024-07-24T13:30:00')
};

export const WithBusinessHoursAndSelectedDate = Template.bind({});

WithBusinessHoursAndSelectedDate.args = {
  label: "Business hours end time (start was 14:00)",
  placeholder: "Select end time",
  interval: 15,
  allowedTimeRange: { start: "09:00", end: "18:00" },
  selectedDate: new Date('2024-07-24T14:00:00')
};