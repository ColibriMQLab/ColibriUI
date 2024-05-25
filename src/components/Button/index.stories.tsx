import React from "react";
import { fn } from "@storybook/test";
import More from "../Icons/More";
import { VARIANT } from "./index.props";
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
      options: ["s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: Object.values(VARIANT),
    },
    disabled: {
      control: { type: "boolean" },
      options: [true, false],
    },
    fullWidth: {
      control: { type: "boolean" },
      options: [true, false],
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

export const Sizes = (args) => (
  <div>
    <Button size="xs" {...args}>
      size = xs
    </Button>
    <Button size="s" {...args}>
      size = s
    </Button>
    <Button size="m" {...args}>
      size = m
    </Button>
    <Button size="l" {...args}>
      size = l
    </Button>
  </div>
);

export const Variants = (args) => (
  <div>
    <Button size="m" variant={VARIANT.PRIMARY} {...args}>
      primary
    </Button>
    <Button size="m" variant={VARIANT.SECONDARY} {...args}>
      secondary
    </Button>
    <Button size="m" variant={VARIANT.PSEUDO} {...args}>
      pseudo
    </Button>
    <Button size="m" variant={VARIANT.CLEAR} {...args}>
      clear
    </Button>
  </div>
);
