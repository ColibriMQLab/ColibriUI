import React from "react";
import { useState } from "react";
import Counter from ".";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Counter> = {
  title: "UI/Counter",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "number" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    disabled: {
      control: { type: "boolean" },
      options: [true, false],
    },
    fullWidth: {
      control: { type: "boolean" },
      options: [true, false],
    },
  },
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;

export const Default = (args) => {
  const [value, setValue] = useState(1);
  return (
    <Counter onChange={setValue} min={1} value={value} max={10} {...args} />
  );
};
