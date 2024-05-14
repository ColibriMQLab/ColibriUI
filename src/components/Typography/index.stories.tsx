import type { Meta, StoryObj } from "@storybook/react";
import Typography from ".";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  parameters: {
    layout: "centered",
  },
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

export const Default: Story = {
  args: {
    children: TEXT,
  },
};
