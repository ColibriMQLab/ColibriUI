import React, { useState } from "react";
import Menu from ".";
import { fn } from "storybook/test";
import type { Meta } from "@storybook/react-webpack5";
import MenuItem from "./components/MenuItem";

const meta: Meta<typeof Menu> = {
  title: "UI/Menu",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selected: {
      control: "object",
    },
    variant: {
      control: { type: "select" },
      options: ["primary"],
    },
    className: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    onClick: {
      action: "click",
    },
  },
  args: {
    selected: ["2", "4"],
    variant: "primary",
    onClick: fn(),
  },
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;

const Template = (args) => {
  const [selected, setSelected] = useState<string[]>(args.selected);

  return (
    <Menu
      {...args}
      selected={selected}
      onClick={(key, event) => {
        setSelected([key]);
        args.onClick?.(key, event);
      }}
    >
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
