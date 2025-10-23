import React from "react";
import Avatar from ".";
import type { Meta } from "@storybook/react-webpack5";
import { AccountType, AvatarProps } from "./index.props";
import { AvatarSize } from "./constants";

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
      options: [AvatarSize.S, AvatarSize.M, AvatarSize.L, AvatarSize.XL, AvatarSize.XXL, AvatarSize.XXXL],
    },
  },
  args: {
    size: AvatarSize.XXL
  },
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

export const Default = (args: AvatarProps) => {
  return <Avatar {...args} />;
};

export const WithSrc = (args: AvatarProps) => {
  return <Avatar src='https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg' {...args} />;
};

export const Bordered = (args: AvatarProps) => {
  return <Avatar bordered {...args}/>;
};

export const Initials = (args: AvatarProps) => {
  return <Avatar initials="SB" src='https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg' {...args}/>;
};

export const Loader = (args: AvatarProps) => {
  return <Avatar loading {...args}/>;
};