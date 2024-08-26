import React from "react";
import Calendar from ".";
import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { toISODate } from "../helpers/date";
import { getPresets } from "./utils/getPresets";
import { PRESETS } from "./components/Presets";

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

export const withPresets = Template.bind({});

withPresets.args = {
  datePresets: getPresets([PRESETS.TODAY, PRESETS.TOMORROW]),
  withContinueButton: true,
  canSelectRange: true
};