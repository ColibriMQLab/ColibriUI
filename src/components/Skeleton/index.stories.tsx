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
    radius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "full"],
    },
    size: {
      control: "text",
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    width: "var(--component-skeleton-rect-width)",
    height: "var(--component-skeleton-rect-height)",
    radius: "sm",
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
    return (
      <SkeletonText
        width={args.width}
        size={args.size ?? "var(--component-skeleton-text-height)"}
      />
    );
  },
  args: {
    width: "var(--component-skeleton-rect-width)",
    size: "var(--component-skeleton-text-height)",
  },
};
