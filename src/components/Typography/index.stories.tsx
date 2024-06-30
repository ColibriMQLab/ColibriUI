import Typography from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["secondary", "alert", "success"],
    },
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
