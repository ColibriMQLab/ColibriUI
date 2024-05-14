import type { Meta, StoryObj } from "@storybook/react";
import { Color } from "../Theme/color";

import DotsLoader from ".";

const meta: Meta<typeof DotsLoader> = {
  title: "UI/DotsLoader",
  parameters: {
    layout: "centered",
  },
  component: DotsLoader,
} satisfies Meta<typeof DotsLoader>;

export default meta;

type Story = StoryObj<typeof DotsLoader>;

export const Default: Story = {
  args: {},
};

export const Colored: Story = {
  args: {
    color: Color.BLUE_9,
  },
};
