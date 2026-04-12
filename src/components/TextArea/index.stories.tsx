import React, { useState } from "react";
import TextArea from "./index";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { ITextAreaProps } from "./index.props";

const meta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the textarea",
    },
    hint: {
      control: "text",
      description: "Helper text displayed below the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the textarea is empty",
    },
    value: {
      control: "text",
      description: "Controlled value of the textarea",
    },
    minRows: {
      control: { type: "number", min: 1 },
      description: "Minimum number of visible rows",
    },
    maxRows: {
      control: { type: "number", min: 1 },
      description: "Maximum number of rows before scrolling",
    },
    required: {
      control: "boolean",
      description: "Marks the field as required",
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea",
    },
    hasError: {
      control: "boolean",
      description: "Puts the textarea into an error state",
    },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

const ControlledTemplate = (args: ITextAreaProps) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <div style={{ width: 360 }}>
      <TextArea
        {...args}
        value={value}
        onChange={(newValue, event) => {
          setValue(newValue);
          args.onChange?.(newValue, event);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    label: "Label",
    hint: "Hint text",
    placeholder: "Type something…",
    minRows: 3,
    maxRows: 6,
    required: false,
    disabled: false,
    hasError: false,
  },
};

export const WithLabel: Story = {
  render: ControlledTemplate,
  args: {
    label: "Description",
    placeholder: "Enter description…",
    minRows: 3,
    maxRows: 6,
  },
};

export const Required: Story = {
  render: ControlledTemplate,
  args: {
    label: "Required field",
    placeholder: "This field is required",
    required: true,
    minRows: 3,
    maxRows: 6,
  },
};

export const WithHint: Story = {
  render: ControlledTemplate,
  args: {
    label: "Notes",
    hint: "Maximum 500 characters",
    placeholder: "Add notes…",
    minRows: 3,
    maxRows: 6,
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    label: "Comment",
    hint: "This field is required",
    placeholder: "Enter comment…",
    hasError: true,
    required: true,
    minRows: 3,
    maxRows: 6,
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    label: "Disabled field",
    placeholder: "You cannot edit this",
    value: "Some pre-filled text",
    disabled: true,
    minRows: 3,
    maxRows: 6,
  },
};

export const AutoResize: Story = {
  render: ControlledTemplate,
  args: {
    label: "Auto-resize (1–8 rows)",
    hint: "Grows as you type",
    placeholder: "Start typing to see it grow…",
    minRows: 1,
    maxRows: 8,
  },
};
