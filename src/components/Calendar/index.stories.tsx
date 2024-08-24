import React from "react";
import Calendar from ".";
import type { Meta } from "@storybook/react";
import { toISODate } from "../helpers/date";

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  parameters: {
    layout: "centered",
  },
  args: {},
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

const Template = (args) => {
  return (
    <Calendar
      {...args}
      today={toISODate(new Date())}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};

export const withContinueButton = Template.bind({});

withContinueButton.args = {
  withContinueButton: true
};
