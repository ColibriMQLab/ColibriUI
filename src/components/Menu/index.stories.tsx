import React, { useState } from "react";
import Menu from ".";
import type { Meta } from "@storybook/react-webpack5";
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
  const [selected, setSelected] = useState<string[]>(['2', '4']);

  return (
    <Menu {...args} selected={selected} onClick={(k) => setSelected([k])}>
      <MenuItem key="1">Menu item 1</MenuItem>
      <MenuItem key="2">Menu item 2</MenuItem>
      <MenuItem disabled key="3">
        Menu item 3
      </MenuItem>
      <MenuItem key="4">Menu item 4</MenuItem>
      <MenuItem key="5">Menu item 5</MenuItem>
      <MenuItem key="6">Menu item 6</MenuItem>
    </Menu>
  );
};

export const Default = Template.bind({});

Default.args = {};
