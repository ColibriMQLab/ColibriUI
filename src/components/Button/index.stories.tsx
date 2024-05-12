import React from "react";
import Button from "./index";
import More from "../Icons/More";
import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "default",
    disabled: false,
  },
};

export const Primary: Story = {
  args: {
    children: "Click me",
    variant: "primary",
    disabled: false,
  },
};

export const Clear: Story = {
  args: {
    children: "Click me",
    variant: "clear",
    disabled: false,
  },
};

export const withIcon: Story = {
  args: {
    children: "Click me",
    variant: "primary",
    iconEnd: <More />,
  },
};

export const onlyIcon: Story = {
  args: {
    variant: "primary",
    icon: <More />,
  },
};
