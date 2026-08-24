import React, { useEffect, useState } from "react";
import { fn } from "storybook/test";

import Editable from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Editable> = {
  title: "UI/Editable",
  component: Editable,
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    maxLength: {
      control: { type: "number", min: 1 },
    },
    name: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    spellCheck: {
      control: "boolean",
    },
    textComponent: {
      table: { disable: true },
    },
    icon: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    onChange: {
      action: "change",
    },
    onBlur: {
      action: "blur",
    },
    onPaste: {
      action: "paste",
    },
  },
  args: {
    value: "Document 1",
    placeholder: "Document title",
    maxLength: 40,
    disabled: false,
    spellCheck: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Editable>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledTemplate = (args: React.ComponentProps<typeof Editable>) => {
  const [value, setValue] = useState(args.value ?? "");

  useEffect(() => {
    setValue(args.value ?? "");
  }, [args.value]);

  return (
    <Editable
      {...args}
      value={value}
      onChange={(event, nextValue) => {
        setValue(nextValue);
        args.onChange?.(event, nextValue);
      }}
    />
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const Empty: Story = {
  render: ControlledTemplate,
  args: { value: "" },
};

export const CustomTypography: Story = {
  render: ControlledTemplate,
  args: {
    value: "Page heading",
    textComponent: "h2",
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    value: "Read-only title",
    disabled: true,
  },
};
