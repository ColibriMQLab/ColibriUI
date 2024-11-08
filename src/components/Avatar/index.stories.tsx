import React from "react";
import Avatar from ".";
import type { Meta } from "@storybook/react";
import { AccountType } from "./index.props";
import { AvatarSizes } from "./constants";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    accountType: {
      control: { type: "select" },
      options: Object.values(AccountType),
    },
    size: {
      control: { type: "select" },
      options: [AvatarSizes.S, AvatarSizes.M, AvatarSizes.L, AvatarSizes.XL, AvatarSizes.XXL],
    },
    bordered: {
      control: { type: "boolean" },
    },
  },
  args: {
    size: AvatarSizes.XXL
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