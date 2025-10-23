import { Color } from "../Theme/colors/theme_default";

import DotsLoader from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

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
    color: Color.PRIMARY_DEFAULT_5,
  },
};
