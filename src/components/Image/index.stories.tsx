import Image from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Image> = {
  title: "UI/Image",
  parameters: {
    layout: "centered",
  },
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof Image>;

const IMG =
  "https://images.unsplash.com/photo-1714329454117-b12e6729c1e1?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const Default: Story = {
  args: {
    src: IMG,
    width: 400,
    height: 300,
  },
};
