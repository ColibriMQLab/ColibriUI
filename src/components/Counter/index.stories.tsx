import React, { useEffect, useState } from "react";
import Counter from ".";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { CounterProps } from "./index.props";

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
    className: {
      table: { disable: true },
    },
  },
  args: {
    value: 1,
    min: 1,
    max: 10,
    disabled: false,
    fullWidth: false,
    onChange: fn(),
  },
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof Counter>;

const ControlledTemplate = ({
  value: initialValue = 1,
  onChange,
  ...args
}: CounterProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Counter
      {...args}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
    />
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  render: ControlledTemplate,
  args: {
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};
