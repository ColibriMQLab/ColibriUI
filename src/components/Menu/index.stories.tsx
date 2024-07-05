import React, { useState } from "react";
import Menu from ".";
import type { Meta } from "@storybook/react";

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
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Menu {...args} selected={selected} onClick={(k) => setSelected([k])}>
      <Menu.Item key="1">Menu item 1</Menu.Item>
      <Menu.Item key="2">Menu item 2</Menu.Item>
      <Menu.Item disabled key="3">
        Menu item 3
      </Menu.Item>
      <Menu.Item key="4">Menu item 4</Menu.Item>
    </Menu>
  );
};

export const Default = Template.bind({});

Default.args = {};
