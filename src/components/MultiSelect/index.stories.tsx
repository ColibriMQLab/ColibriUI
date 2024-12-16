import React from "react";
import { useState } from "react";
import MultiSelect from "./";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

export default meta;

const groups = [{
    title: 'Group 1',
    options: [
      { 
        value: '1', 
        label: <span>Long long option</span> 
      }, 
      { 
        value: '2', 
        label: <span>Long long option</span>
      }
    ],
  }, {
    title: 'Group 2',
    options: [
      { 
        value: '3', 
        label: <span>Long long option</span> 
      }, 
      { 
        value: '4', 
        label: <span>Long long option</span>
      }
    ],
  }, {
    title: 'Group 3',
    options: [
      { 
        value: '5', 
        label: <span>Long long option</span>,
        disabled: true
      }, 
      { 
        value: '6', 
        label: <span>Long long option</span>,
      }
    ],
  },
];

const Template = (args) => {
  const [value, setValue] = useState<string>();

  return (
    <MultiSelect
      {...args}
      value={value}
      groups={groups}
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