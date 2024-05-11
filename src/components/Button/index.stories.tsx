import React from "react";
import Button from "./index";
import Globe from "../Icons/Globe";
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

export const Primary: Story = {
  args: {
    children: "Click me",
    variant: "primary",
    disabled: false,
  },
};

export const withIcons: Story = {
  args: {
    children: "Кнопка",
    variant: "primary",
    iconEnd: <Globe />,
  },
};

export const onlyIcon: Story = {
  args: {
    variant: "primary",
    icon: <Globe />,
  },
};
