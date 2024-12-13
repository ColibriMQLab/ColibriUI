import React from "react";
import Datepicker from ".";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Datepicker> = {
  title: "UI/Datepicker",
  parameters: {
    layout: "centered",
  },
  argTypes: {
  },
  component: Datepicker,
} satisfies Meta<typeof Datepicker>;

export default meta;

export const Default = (args) => {
  return (
    <Datepicker {...args} selectedTime="10:00" selectedDate="2024-12-22"/>
  );
};
