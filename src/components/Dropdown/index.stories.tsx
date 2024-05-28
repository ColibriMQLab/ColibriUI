import React from "react";
import Menu from "../Menu";
import Dropdown from ".";
import type { Meta } from "@storybook/react";
import Button from "../Button";

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
          <Menu.Item>Test 1</Menu.Item>
          <Menu.Item>Test 2</Menu.Item>
          <Menu.Item>Test 3</Menu.Item>
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
