import React, { useState } from "react";
import Switch from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  parameters: {
    layout: "centered",
  },
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Deafault = ({ args }: Story) => {
  const [value, setValue] = useState(false);

  return (
    <Switch
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
      {...args}
    />
  );
};
