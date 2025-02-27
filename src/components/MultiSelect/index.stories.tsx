import React from "react";
import MultiSelect from "./";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: { layout: "centered" },
  argTypes: {},
  args: {
    required: false,
    fullWidth: false,
    disabled: false,
    hasError: false,
    placeholder: "select options",
    label: "Label",
    hint: "hint",
  },
};

export default meta;

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

const Template = (args) => (
  <div style={{ width: "300px" }}>
    <MultiSelect {...args} groups={groups} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const Chip = Template.bind({});
Chip.args = { type: "chip" };
