import React, { useEffect, useState } from "react";
import { fn } from "storybook/test";

import CodeField, { ONLY_DIGITS_AND_CHARS_PATTERN } from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof CodeField> = {
  title: "UI/CodeField",
  component: CodeField,
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    caption: {
      control: "text",
    },
    codeLength: {
      control: { type: "select" },
      options: [4, 5, 6],
    },
    size: {
      control: { type: "select" },
      options: ["m", "l", "xl"],
    },
    shape: {
      control: { type: "select" },
      options: ["default", "segmented"],
    },
    disabled: {
      control: "boolean",
    },
    isError: {
      control: "boolean",
    },
    allowedSymbols: {
      table: { disable: true },
    },
    setIsError: {
      table: { disable: true },
    },
    onChange: {
      action: "change",
    },
    onFullCodeEnter: {
      action: "fullCodeEnter",
    },
  },
  args: {
    codeLength: 6,
    size: "l",
    shape: "default",
    placeholder: "0",
    caption: "Enter the code from the message",
    onChange: fn(),
    onFullCodeEnter: fn(),
  },
} satisfies Meta<typeof CodeField>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledExample = (args: React.ComponentProps<typeof CodeField>) => {
  const [value, setValue] = useState(args.value ?? "");

  useEffect(() => {
    setValue(args.value ?? "");
  }, [args.value]);

  return (
    <CodeField
      {...args}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        args.onChange?.(nextValue);
      }}
    />
  );
};

export const Default: Story = { render: ControlledExample };
export const Segmented: Story = {
  render: ControlledExample,
  args: { shape: "segmented", value: "123" },
};
export const Error: Story = {
  render: ControlledExample,
  args: { value: "123456", isError: true, codeErrorBehavior: "keep" },
};
export const LettersAndDigits: Story = {
  render: ControlledExample,
  args: {
    codeLength: 4,
    value: "A7B",
    allowedSymbols: ONLY_DIGITS_AND_CHARS_PATTERN,
    inputMode: "text",
  },
};
export const Disabled: Story = {
  render: ControlledExample,
  args: { value: "123456", disabled: true },
};
