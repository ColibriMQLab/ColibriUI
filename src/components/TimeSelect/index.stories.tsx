import React from "react";
import { useState } from "react";
import TimeSelect from "./";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof TimeSelect> = {
  title: "UI/TimeSelect",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  component: TimeSelect,
} satisfies Meta<typeof TimeSelect>;

export default meta;

const Template = (args) => {
  const [value, setValue] = useState<string>('');

  return (
    <TimeSelect
      {...args}
      value={value}
      onChange={(v) => setValue(v)}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "Select options",
};
