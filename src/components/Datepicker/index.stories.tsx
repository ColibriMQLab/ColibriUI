import React, { useEffect, useState } from "react";
import Datepicker from ".";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { Props } from "./index.props";

const meta: Meta<typeof Datepicker> = {
  title: "UI/Datepicker",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selectedTime: {
      control: "text",
    },
    selectedDate: {
      control: "text",
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    onChangeDate: fn(),
    onChangeTime: fn(),
    selectedTime: "10:00",
    selectedDate: new Date().toISOString().split("T")[0],
  },
  component: Datepicker,
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof Datepicker>;

const ControlledTemplate = (args: Props) => {
  const [selectedTime, setSelectedTime] = useState(args.selectedTime);
  const [selectedDate, setSelectedDate] = useState(args.selectedDate);

  useEffect(() => {
    setSelectedTime(args.selectedTime);
  }, [args.selectedTime]);

  useEffect(() => {
    setSelectedDate(args.selectedDate);
  }, [args.selectedDate]);

  return (
    <Datepicker
      {...args}
      selectedTime={selectedTime}
      selectedDate={selectedDate}
      onChangeTime={(time) => {
        setSelectedTime(time);
        args.onChangeTime?.(time);
      }}
      onChangeDate={(date) => {
        setSelectedDate(date);
        args.onChangeDate?.(date);
      }}
    />
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};
