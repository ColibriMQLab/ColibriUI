import React from "react";
import Button from "../Button";
import Tooltip from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    withTail: {
      control: { type: "boolean" },
      options: [true, false],
    },
  },
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: <Button variant="primary">Кнопка</Button>,
    content: (
      <span>
        Я Tooltip и у меня много много текста. Я Tooltip и у меня много много
        текста. Я Tooltip и у меня много много текста.
      </span>
    ),
    placement: "top-end",
  },
};













