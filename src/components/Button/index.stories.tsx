import React from "react";
import Button from "./index";
import More from "../Icons/More";
import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { SIZE, VARIANT } from "./index.props";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.values(SIZE),
    },
    variant: {
      control: { type: "select" },
      options: Object.values(VARIANT),
    },
  },
  args: { onClick: fn(), size: SIZE.M, variant: VARIANT.DEFAULT },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    disabled: false,
  },
};

export const withIcon: Story = {
  args: {
    children: "Click me",
    iconEnd: <More />,
  },
};

export const onlyIcon: Story = {
  args: {
    icon: <More />,
  },
};
