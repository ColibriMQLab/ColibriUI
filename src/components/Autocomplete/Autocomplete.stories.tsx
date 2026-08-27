import React, { useEffect, useState } from "react";
import { fn } from "storybook/test";

import { Autocomplete } from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { AutocompleteProps } from "./index.props";

const cities = [
  { value: "london", label: "London", description: "United Kingdom" },
  { value: "paris", label: "Paris", description: "France" },
  { value: "berlin", label: "Berlin", description: "Germany" },
  { value: "tokyo", label: "Tokyo", description: "Japan" },
  { value: "lisbon", label: "Lisbon", description: "Portugal" },
];

const meta: Meta<typeof Autocomplete> = {
  title: "UI/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  argTypes: {
    clearLabel: { control: "text" },
    clearable: { control: "boolean" },
    className: { table: { disable: true } },
    containerClassName: { table: { disable: true } },
    defaultOpen: { control: "boolean" },
    defaultValue: { control: "text" },
    disabled: { control: "boolean" },
    emptyText: { control: "text" },
    filterOption: { table: { disable: true } },
    getOptionKey: { table: { disable: true } },
    hasError: { control: "boolean" },
    hint: { control: "text" },
    label: { control: "text" },
    listMaxHeight: { control: "text" },
    loading: { control: "boolean" },
    loadingText: { control: "text" },
    minQueryLength: { control: { type: "number" } },
    onOpenChange: { table: { disable: true } },
    onOptionSelect: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    open: { control: "boolean" },
    openOnFocus: { control: "boolean" },
    options: { control: "object" },
    readOnly: { control: "boolean" },
    renderOption: { table: { disable: true } },
    required: { control: "boolean" },
    size: { control: "inline-radio", options: ["s", "m", "l"] },
    success: { control: "boolean" },
    value: { control: "text" },
  },
  args: {
    clearLabel: "Clear value",
    clearable: true,
    disabled: false,
    emptyText: "No results found",
    hasError: false,
    label: "City",
    loading: false,
    loadingText: "Loading...",
    minQueryLength: 0,
    onOpenChange: fn(),
    onOptionSelect: fn(),
    onValueChange: fn(),
    openOnFocus: true,
    options: cities,
    placeholder: "Start typing",
    required: false,
    size: "m",
    success: false,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const ControlledTemplate = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value ?? "");

  useEffect(() => {
    setValue(args.value ?? "");
  }, [args.value]);

  return (
    <Autocomplete
      {...args}
      value={value}
      onValueChange={(nextValue) => {
        setValue(nextValue);
        args.onValueChange?.(nextValue);
      }}
    />
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const WithHint: Story = {
  args: {
    hint: "Use arrow keys and Enter to choose an option.",
  },
  render: ControlledTemplate,
};

export const CustomOptions: Story = {
  args: {
    label: "Country",
    options: [
      { value: "gb", label: "United Kingdom", description: "Code +44" },
      { value: "fr", label: "France", description: "Code +33" },
      { value: "de", label: "Germany", description: "Code +49" },
    ],
    placeholder: "Select country",
    renderOption: (option) => (
      <>
        <strong style={{ minWidth: "var(--space-16)" }}>{option.value}</strong>
        <span style={{ flex: 1 }}>{option.label}</span>
        <small>{option.description}</small>
      </>
    ),
  },
  render: ControlledTemplate,
};

export const Loading: Story = {
  args: {
    defaultOpen: true,
    label: "Search",
    loading: true,
    options: [],
    value: "",
  },
  render: ControlledTemplate,
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-5)" }}>
      <Autocomplete
        {...args}
        hasError
        hint="Select a value from the list."
        label="Error"
        value=""
      />
      <Autocomplete
        {...args}
        defaultValue="London"
        hint="The city is selected."
        label="Success"
        success
      />
      <Autocomplete {...args} disabled label="Disabled" value="" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-5)" }}>
      {(["s", "m", "l"] as const).map((size) => (
        <ControlledTemplate
          key={size}
          {...args}
          label={`Size ${size}`}
          size={size}
        />
      ))}
    </div>
  ),
};
