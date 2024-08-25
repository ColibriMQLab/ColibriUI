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

  return (<div style={{ width: '10vw' }}>
    <TimeSelect
      {...args}
      value={value}
      fullWidth
      onChange={(v) => setValue(v)}
    /></div>
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "Select options",
};
