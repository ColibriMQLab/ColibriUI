import React from "react";
import TextArea from "./index";
import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";

const meta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  parameters: {
    layout: "centered",
  },
  argTypes: {
  },
  args: {},
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;

const Template = (args) => {
  const [value, setValue] = useState("");

  return <TextArea {...args} value={value} onChange={(v) => setValue(v)} />;
};

export const Default = Template.bind({});

Default.args = {
  required: true,
  disabled: false,
  placeholder: 'Type text',
  label: 'Label',
  hint: 'Hint'
};
