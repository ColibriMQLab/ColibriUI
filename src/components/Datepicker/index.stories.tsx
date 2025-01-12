import React from "react";
import Datepicker from ".";
import { fn } from '@storybook/test';
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Datepicker> = {
  title: "UI/Datepicker",
  parameters: {
    layout: "centered",
  },
  argTypes: {

  },
  args: {
    onChangeDate: fn(),
    onChangeTime: fn(),
  }, 
  component: Datepicker,
} satisfies Meta<typeof Datepicker>;

export default meta;

export const Default = (args) => {
  const date = new Date();
const formattedDate = date.toISOString().split('T')[0];
  return (
    <Datepicker {...args} selectedTime="10:00" selectedDate={formattedDate} />
  );
};
