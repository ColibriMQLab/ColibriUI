import React from "react";
import Avatar from ".";
import type { Meta } from "@storybook/react";
import { AccountType } from "./index.props";
import { textChangeRangeIsUnchanged } from "typescript";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    accountType: {
      control: { type: "select" },
      options: [AccountType.Organization, AccountType.Person],
    },
    bordered: {
      control: { type: "boolean" },
    },
  },
  args: {
  },
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

export const Default = (args) => {
  return <Avatar {...args}/>;
};

export const Bordered = (args) => {
  return <Avatar bordered={true} {...args}/>;
};