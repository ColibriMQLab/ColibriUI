import React from "react";
import { useState } from "react";
import Select from "./";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

const options = Array(5)
  .fill(null)
  .map((_, i) => ({
    label: (
      <span>
        <strong>options</strong> {String(i)}
      </span>
    ),
    value: String(i),
    disabled: i === 2,
  }));

const Template = (args) => {
  const [value, setValue] = useState<string>();

  return (
    <Select
      {...args}
      value={value}
      options={options}
      onChange={(v) => setValue(v)}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "select options",
  label: "Label",
  hint: "hint",
};

export const Error = Template.bind({});

Error.args = {
  placeholder: "select options",
  error: true,
  label: "Label",
  hint: "hint",
};

export const FullWidth = Template.bind({});

FullWidth.args = {
  placeholder: "select options",
  label: "Label",
  hint: "hint",
  fullWidth: true,
};