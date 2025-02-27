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
  args: {
    hasError: false,
    fullWidth: false,
    placeholder: "select options",
    label: "Label",
    hint: "hint",
  },
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

const options = Array(5)
  .fill(null)
  .map((_, i) => ({
    label: (
      <span>
        <strong>Long long option</strong> {String(i)}
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

Default.args = {};
