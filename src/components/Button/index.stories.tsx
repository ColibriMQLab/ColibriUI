import React from "react";
import { fn } from "@storybook/test";
import More from "../Icons/More";
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
      options: ["xs", "s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "pseudo", "clear", "alert", "success"],
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
    size: 'xs'
  },
};

export const Sizes = (args) => (
  <div>
    <Button size="xs" {...args}>
      size = xs
    </Button>{' '}
    <Button size="s" {...args}>
      size = s
    </Button>{' '}
    <Button size="m" {...args}>
      size = m
    </Button>{' '}
    <Button size="l" {...args}>
      size = l
    </Button>
  </div>
);

export const Variants = (args) => (
  <div>
    <Button size="m" variant="primary" {...args}>
      primary
    </Button>{' '}
    <Button size="m" variant="secondary" {...args}>
      secondary
    </Button>{' '}
    <Button size="m" variant="outline" {...args}>
      outline
    </Button>{' '}
    <Button size="m" variant="pseudo" {...args}>
      pseudo
    </Button>{' '}
    <Button size="m" variant="clear" {...args}>
      clear
    </Button>
    <Button size="m" variant="alert" {...args}>
      alert
    </Button>{' '}
    <Button size="m" variant="success" {...args}>
      success
    </Button>
  </div>
);

export const LongText = (args) => (
  <div style={{width: '200px'}}>
    <Button size="m" variant="primary" {...args} fullWidth>
      Lorem ipsum dolor sit amet consectetur adipisicing elit
    </Button>
  </div>
);
