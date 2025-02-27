import React from "react";
import { fn } from "@storybook/test";
import Chevron from "../Icons/Chevron";
import Input from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  parameters: {
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary"],
    },
  },
  args: { 
    onChange: fn(), 
    hasError: false,    
    disabled: false,
    label: "Label",
    variant: "primary",
    hint: "hint",
  },
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

const PLACEHOLDER = "Name";

export const Default: Story = {
  args: {
    placeholder: PLACEHOLDER,
  },
};

export const Required: Story = {
  args: {
    placeholder: PLACEHOLDER,
    required: true,
  },
};

export const TypePassword: Story = {
  args: {
    placeholder: PLACEHOLDER,
    type: 'password',
  },
};

export const Error: Story = {
  args: {
    placeholder: PLACEHOLDER,
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: PLACEHOLDER,
    endIcon: <Chevron />,
  },
};
