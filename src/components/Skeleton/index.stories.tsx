import React from "react";
import { SkeletonRect, SkeletonText } from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof SkeletonRect> = {
  title: "UI/Skeleton",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    width: {
      control: "text",
    },
    height: {
      control: "text",
    },
    borderRadius: {
      control: "text",
    },
    size: {
      control: "number",
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    width: 128,
    height: 32,
    borderRadius: 6,
  },
  component: SkeletonRect,
} satisfies Meta<typeof SkeletonRect>;

export default meta;

type Story = StoryObj<typeof SkeletonRect>;

export const Rect: Story = {
  render: (args) => {
    return <SkeletonRect {...args} />;
  },
};

export const Text: Story = {
  render: (args) => {
    return <SkeletonText width={args.width} size={Number(args.size ?? 16)} />;
  },
  args: {
    width: 128,
    size: 16,
  },
};
