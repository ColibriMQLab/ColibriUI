import Typography from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const typographySizes = [
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
] as const;

const typographyTags = [
  "span",
  "label",
  "legend",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "s",
] as const;

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
      options: typographyTags,
    },
    size: {
      control: { type: "select" },
      options: typographySizes,
    },
    fontWeight: {
      control: { type: "select" },
      options: ["normal", "medium", "bold"],
    },
    className: { table: { disable: true } },
    style: { control: "object" },
  },
  args: {
    tag: "span",
    size: "m",
    fontWeight: "normal",
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
