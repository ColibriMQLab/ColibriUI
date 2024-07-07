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
        <strong>options</strong> {i}
      </span>
    ),
    value: i,
  }));

const Template = (args) => {
  const [value, setValue] = useState<number>();

  return (
    <Select
      {...args}
      value={value}
      options={options}
      onChange={(v) => setValue(Number(v))}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "select options",
  disabled: false,
  error: true,
  label: "Label",
  hint: "hint",
  fullWidth: true,
};
