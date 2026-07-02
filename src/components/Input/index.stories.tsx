import React from "react";
import { fn } from "storybook/test";
import Chevron from "../Icons/Chevron";
import Input from ".";

import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  parameters: {},
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary"],
    },
    label: {
      control: "text",
    },
    hint: {
      control: "text",
    },
    hasError: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    type: {
      control: "text",
    },
    value: {
      control: "text",
    },
    startIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    inputRef: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    onFocus: {
      action: "focus",
    },
    onBlur: {
      action: "blur",
    },
    onKeyDown: {
      action: "keyDown",
    },
    onInput: {
      action: "input",
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
    type: "password",
  },
};

export const Error: Story = {
  args: {
    placeholder: PLACEHOLDER,
    hasError: true,
    hint: "Error text",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: PLACEHOLDER,
    endIcon: <Chevron />,
  },
};
