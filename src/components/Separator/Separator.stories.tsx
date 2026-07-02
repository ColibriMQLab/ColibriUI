import React from "react";

import Separator from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: (args) => <Separator {...args} />,
};
