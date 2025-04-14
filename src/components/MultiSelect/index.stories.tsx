import React, { useState } from "react";
import MultiSelect from "./";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectedItem } from "./index.props";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["chip", "text"],
    },
  },
  args: {
    required: false,
    fullWidth: false,
    disabled: false,
    hasError: false,
    placeholder: "Select options",
    label: "Label",
    hint: "Hint",
    onChange: action("onChange"),
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const groups = [
  {
    title: "Haircut",
    value: "haircut",
    options: [
      { value: "shampoo-and-blow-dry", label: "Shampoo and Blow-Dry" },
      { value: "hair-treatment", label: "Hair Treatment" },
      { value: "trim", label: "Trim" },
    ],
  },
  {
    title: "Hair Coloring",
    value: "hair-coloring",
    options: [
      { value: "hair-coloring", label: "Hair Coloring" },
      { value: "highlights", label: "Highlights" },
    ],
  },
  {
    title: "Hair Care",
    value: "hair-care",
    options: [
      { value: "scalp-treatment", label: "Scalp Treatment", disabled: true },
      { value: "hair-mask", label: "Hair Mask" },
      { value: "olaplex-treatment", label: "Olaplex Treatment" },
    ],
  },
];

const Template = (args) => {
  const [value, setValue] = useState<SelectedItem[]>();
  return (
  <div style={{ width: "300px" }}>
    <MultiSelect {...args} value={value} groups={groups} onChange={(v) => setValue(v)} />
  </div>
)};

export const Default: Story = {
  render: Template,
};

export const Chip: Story = {
  render: Template,
  args: {
    type: "chip",
  },
};

export const ChipWithValue: Story = {
  render: Template,
  args: {
    type: "chip",
    value: [
      { group: "haircut", option: "trim" },
      { group: "haircut", option: "shampoo-and-blow-dry" },
      { group: "hair-care", option: "hair-mask" },
    ],
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    hasError: true,
    hint: "This field is required",
  },
};
