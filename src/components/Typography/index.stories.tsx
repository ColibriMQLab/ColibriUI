import Typography from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["secondary", "alert", "success"],
    },
    tag: {
      control: { type: "select" },
      options: ["span", "p", "h1", "h2", "h3", "div"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    fontWeight: {
      control: { type: "select" },
      options: ["normal", "bold", "light"],
    },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const Default: Story = {
  args: {
    children: TEXT,
  },
};

export const Secondary: Story = {
  args: {
    children: TEXT,
    variant: "secondary",
  },
};

export const Alert: Story = {
  args: {
    children: TEXT,
    variant: "alert",
  },
};

export const Success: Story = {
  args: {
    children: TEXT,
    variant: "success",
  },
};

export const CustomTag: Story = {
  args: {
    children: TEXT,
    tag: "h1",
  },
};
