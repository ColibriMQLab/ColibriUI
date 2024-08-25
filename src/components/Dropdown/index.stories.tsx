import React from "react";
import Menu from "../Menu";
import Button from "../Button";
import Dropdown from ".";
import type { Meta } from "@storybook/react";
import MenuItem from "../Menu/components/MenuItem";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  parameters: {
    layout: "centered",
  },
  args: {},
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

const Template = (args) => {
  return (
    <Dropdown
      {...args}
      overlay={
        <Menu>
          <MenuItem>Test 1</MenuItem>
          <MenuItem>Test 2</MenuItem>
          <MenuItem>Test 3</MenuItem>
        </Menu>
      }
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  children: <Button variant="primary">Hover me</Button>,
  trigger: ["hover"],
  disabled: false,
};
