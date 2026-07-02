import React from "react";
import { fn } from "storybook/test";
import More from "../Icons/More";
import Button from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "outline",
        "pseudo",
        "clear",
        "alert",
        "success",
      ],
    },
    disabled: {
      control: { type: "boolean" },
      options: [true, false],
    },
    fullWidth: {
      control: { type: "boolean" },
      options: [true, false],
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    icon: {
      table: { disable: true },
    },
    iconStart: {
      table: { disable: true },
    },
    iconEnd: {
      table: { disable: true },
    },
    onClick: {
      action: "click",
    },
  },
  args: { onClick: fn(), type: "button" },
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

export const withStartIcon: Story = {
  args: {
    children: TEXT,
    iconStart: <More />,
  },
};

export const onlyIcon: Story = {
  args: {
    icon: <More />,
    size: "xs",
  },
};

export const Sizes = (args) => (
  <div>
    <Button {...args} size="xs">
      size = xs
    </Button>{" "}
    <Button {...args} size="s">
      size = s
    </Button>{" "}
    <Button {...args} size="m">
      size = m
    </Button>{" "}
    <Button {...args} size="l">
      size = l
    </Button>
  </div>
);

export const Variants = (args) => (
  <div>
    <Button {...args} size="m" variant="primary">
      primary
    </Button>{" "}
    <Button {...args} size="m" variant="secondary">
      secondary
    </Button>{" "}
    <Button {...args} size="m" variant="outline">
      outline
    </Button>{" "}
    <Button {...args} size="m" variant="pseudo">
      pseudo
    </Button>{" "}
    <Button {...args} size="m" variant="clear">
      clear
    </Button>
    <Button {...args} size="m" variant="alert">
      alert
    </Button>{" "}
    <Button {...args} size="m" variant="success">
      success
    </Button>
  </div>
);

export const LongText = (args) => (
  <div style={{ width: "200px" }}>
    <Button size="m" variant="primary" {...args} fullWidth>
      Lorem ipsum dolor sit amet consectetur adipisicing elit
    </Button>
  </div>
);
