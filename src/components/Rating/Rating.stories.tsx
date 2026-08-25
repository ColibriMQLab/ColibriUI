import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Rating from ".";

const meta = {
  title: "UI/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    valuePlacement: {
      control: { type: "select" },
      options: ["before", "after"],
    },
    iconQuantity: {
      control: { type: "select" },
      options: [1, 5, 10],
    },
    helperTextStretching: {
      control: { type: "select" },
      options: ["fixed", "filled"],
    },
    size: {
      control: { type: "select" },
      options: [
        "xxs",
        "xs",
        "s",
        "m",
        "l",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "displayS",
        "displayM",
        "displayL",
      ],
    },
    view: {
      control: { type: "select" },
      options: ["default", "accent"],
    },
    fillColor: {
      control: { type: "color" },
    },
    outlineColor: {
      control: { type: "color" },
    },
    className: {
      table: { disable: true },
    },
    iconSlot: {
      table: { disable: true },
    },
    iconSlotHalf: {
      table: { disable: true },
    },
    iconSlotOutline: {
      table: { disable: true },
    },
  },
  args: {
    value: 3.8,
    precision: 1,
    iconQuantity: 5,
    hasValue: true,
    hasIcons: true,
    valuePlacement: "before",
    helperText: "Based on 128 reviews",
    helperTextStretching: "filled",
    size: "l",
    view: "default",
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accent: Story = {
  args: { view: "accent" },
};

export const YellowFill: Story = {
  args: { fillColor: "var(--color-yellow-400)" },
};

export const TenStars: Story = {
  args: { value: 7.6, iconQuantity: 10, precision: 2 },
};

export const SingleIcon: Story = {
  args: { value: 4.9, iconQuantity: 1, size: "displayS" },
};

export const WithoutValue: Story = {
  args: { hasValue: false },
};

export const ValueOnly: Story = {
  args: { hasIcons: false, value: 4.5 },
};

export const CustomIcon: Story = {
  args: {
    iconSlot: <span aria-hidden="true">●</span>,
    iconSlotHalf: <span aria-hidden="true">◐</span>,
    iconSlotOutline: <span aria-hidden="true">○</span>,
  },
};
