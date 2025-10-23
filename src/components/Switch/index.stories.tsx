import React, { useState } from "react";
import Switch from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    hasError: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    hint: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const SwitchWithState = (args: any) => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: SwitchWithState,
  args: {},
};

export const WithLabel: Story = {
  render: SwitchWithState,
  args: {
    label: "Enable notifications",
  },
};

export const WithHint: Story = {
  render: SwitchWithState,
  args: {
    label: "Dark mode",
    hint: "Switch between light and dark themes",
  },
};

export const WithError: Story = {
  render: SwitchWithState,
  args: {
    label: "Accept terms",
    hint: "You must accept the terms and conditions",
    hasError: true,
  },
};

export const Disabled: Story = {
  render: SwitchWithState,
  args: {
    label: "Disabled switch",
    hint: "This option is currently unavailable",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (args) => (
    <Switch
      {...args}
      checked={true}
      onChange={() => {}}
    />
  ),
  args: {
    label: "Premium feature",
    hint: "Available in premium plan",
    disabled: true,
  },
};