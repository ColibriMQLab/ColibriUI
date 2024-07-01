import { Color } from "../Theme/color";

import DotsLoader from ".";
import type { Meta, StoryObj } from "@storybook/react";

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
    color: Color.PRIMARY_4,
  },
};
