import React from "react";
import { fn } from "@storybook/test";
import More from "../Icons/More";
import { SIZE, VARIANT } from "./index.props";
import Button from ".";
import type { Meta, StoryObj } from "@storybook/react";

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
  args: { onClick: fn() },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

const TEXT = "Click me";

export const Default: Story = {
  args: {
    children: TEXT,
  },
};

export const withIcon: Story = {
  args: {
    children: TEXT,
    iconEnd: <More />,
  },
};

export const onlyIcon: Story = {
  args: {
    icon: <More />,
  },
};
