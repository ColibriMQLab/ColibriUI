import React from "react";
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
      label: "Long long option"
    },
    {
      value: '2',
      label: "Long long option"
    }
  ],
}, {
  title: 'Group 2',
  options: [
    {
      value: '3',
      label: "Long long option"
    },
    {
      value: '4',
      label: "Long long option",
    }
  ],
}, {
  title: 'Group 3',
  options: [
    {
      value: '5',
      label: "Long long option",
      disabled: true,
    },
    {
      value: '6',
      label: "Long long option",
    },
    {
      value: '7',
      label: "Long long option",
    }
  ],
},
];

const Template = (args) => {
  return (
    <div style={{ width: '300px' }}>
      <MultiSelect
        {...args}
        groups={groups}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "select options",
  label: "Label",
  hint: "hint",
};