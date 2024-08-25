import React, { useState } from "react";
import Menu from ".";
import type { Meta } from "@storybook/react";
import MenuItem from "./components/MenuItem";

const meta: Meta<typeof Menu> = {
  title: "UI/Menu",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;

const Template = (args) => {
  const [selected, setSelected] = useState<string[]>(['2']);

  return (
    <Menu {...args} selected={selected} onClick={(k) => setSelected([k])}>
      <MenuItem key="1">Menu item 1</MenuItem>
      <MenuItem key="2">Menu item 2</MenuItem>
      <MenuItem disabled key="3">
        Menu item 3
      </MenuItem>
      <MenuItem key="4">Menu item 4</MenuItem>
    </Menu>
  );
};

export const Default = Template.bind({});

Default.args = {};
