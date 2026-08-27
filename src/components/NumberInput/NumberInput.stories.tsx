import React, { useEffect, useState } from "react";
import { fn } from "storybook/test";
import { NumberInput } from "./NumberInput";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { NumberInputProps } from "./index.props";

const meta: Meta<NumberInputProps> = {
  title: "UI/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "text" },
    },
    defaultValue: {
      control: { type: "text" },
    },
    thousandSeparator: {
      control: { type: "text" },
    },
    decimalSeparator: {
      control: { type: "text" },
    },
    thousandsGroupStyle: {
      control: { type: "select" },
      options: ["thousand", "lakh", "wan", "none"],
    },
    decimalScale: {
      control: { type: "number" },
    },
    fixedDecimalScale: {
      control: { type: "boolean" },
    },
    allowNegative: {
      control: { type: "boolean" },
    },
    allowLeadingZeros: {
      control: { type: "boolean" },
    },
    prefix: {
      control: { type: "text" },
    },
    suffix: {
      control: { type: "text" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    isAllowed: {
      table: { disable: true },
    },
    label: {
      control: { type: "text" },
    },
    hint: {
      control: { type: "text" },
    },
    hasError: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    clearLabel: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary"],
    },
    startIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    inputRef: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
    },
    name: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    autoComplete: {
      control: { type: "text" },
    },
    onValueChange: {
      action: "value change",
    },
    onFocus: {
      action: "focus",
    },
    onBlur: {
      action: "blur",
    },
    onKeyDown: {
      action: "keyDown",
    },
    onInput: {
      action: "input",
    },
  },
  args: {
    value: "125000.5",
    thousandSeparator: " ",
    decimalSeparator: ".",
    thousandsGroupStyle: "thousand",
    decimalScale: 2,
    fixedDecimalScale: false,
    allowNegative: false,
    allowLeadingZeros: false,
    prefix: "",
    suffix: "",
    label: "Amount",
    hint: "",
    hasError: false,
    clearable: true,
    clearLabel: "Clear",
    size: "m",
    variant: "primary",
    disabled: false,
    readOnly: false,
    required: false,
    id: "number-input",
    name: "amount",
    placeholder: "Enter amount",
    autoComplete: "off",
    onValueChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    onInput: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<NumberInputProps>;

export default meta;

type Story = StoryObj<NumberInputProps>;

const NumberInputWithState = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...args
}: NumberInputProps) => {
  const [value, setValue] = useState(controlledValue ?? defaultValue ?? "");

  useEffect(() => {
    setValue(controlledValue ?? defaultValue ?? "");
  }, [controlledValue, defaultValue]);

  return (
    <NumberInput
      {...args}
      value={value}
      onValueChange={(nextValues) => {
        setValue(nextValues.value);
        onValueChange?.(nextValues);
      }}
    />
  );
};

export const Default: Story = {
  render: NumberInputWithState,
};

export const Currency: Story = {
  render: NumberInputWithState,
  args: {
    label: "Amount",
    value: "125000.5",
    decimalSeparator: ",",
    thousandSeparator: " ",
    decimalScale: 2,
    fixedDecimalScale: true,
    suffix: " EUR",
    hint: "Formatted as currency",
  },
};

export const Percentage: Story = {
  render: NumberInputWithState,
  args: {
    label: "Rate",
    value: "12.5",
    suffix: " %",
    max: 100,
    decimalScale: 2,
    hint: "Maximum value is 100",
  },
};

export const WithPrefix: Story = {
  render: NumberInputWithState,
  args: {
    label: "Budget",
    value: "2500",
    prefix: "$",
    decimalScale: 0,
    hint: "Whole numbers only",
  },
};

export const LeadingZeros: Story = {
  render: NumberInputWithState,
  args: {
    label: "Account code",
    value: "00125",
    allowLeadingZeros: true,
    decimalScale: 0,
    thousandSeparator: false,
  },
};

export const NegativeAllowed: Story = {
  render: NumberInputWithState,
  args: {
    label: "Balance delta",
    value: "-1500.25",
    allowNegative: true,
    decimalScale: 2,
  },
};

export const GroupStyles: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <NumberInputWithState
        {...args}
        label="Thousand"
        value="123456789"
        thousandsGroupStyle="thousand"
      />
      <NumberInputWithState
        {...args}
        label="Lakh"
        value="123456789"
        thousandsGroupStyle="lakh"
      />
      <NumberInputWithState
        {...args}
        label="Wan"
        value="123456789"
        thousandsGroupStyle="wan"
      />
      <NumberInputWithState
        {...args}
        label="No grouping"
        value="123456789"
        thousandsGroupStyle="none"
      />
    </div>
  ),
  args: {
    decimalScale: 0,
    clearable: false,
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <NumberInputWithState
        {...args}
        label="Error"
        value="-10"
        hasError
        hint="Value must be positive"
        allowNegative
      />
      <NumberInputWithState
        {...args}
        label="Valid"
        value="2500"
        hint="Value accepted"
      />
      <NumberInputWithState {...args} label="Disabled" value="1000" disabled />
      <NumberInputWithState {...args} label="Read only" value="1000" readOnly />
    </div>
  ),
  args: {
    clearable: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <NumberInputWithState {...args} label="size = s" size="s" value="1000" />
      <NumberInputWithState {...args} label="size = m" size="m" value="1000" />
      <NumberInputWithState {...args} label="size = l" size="l" value="1000" />
    </div>
  ),
};

export const NarrowContainer: Story = {
  render: (args) => (
    <div style={{ width: "7.5rem" }}>
      <NumberInputWithState {...args} label="Narrow container" value="1000" />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
