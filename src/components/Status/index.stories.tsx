import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Status from ".";
import { STATUS_TYPE } from "./index.props";

const list = [
  {
    text: "Neutral",
  },
  {
    type: STATUS_TYPE.SUCCESS,
    text: "Success",
  },
  {
    type: STATUS_TYPE.FAILURE,
    text: "Failure",
  },
  {
    type: STATUS_TYPE.WARNING,
    text: "Warning",
  },
  {
    type: STATUS_TYPE.INFO,
    text: "Info",
  },
];

const meta: Meta<typeof Status> = {
  title: "UI/Status",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: Object.values(STATUS_TYPE),
    },
    tag: {
      control: { type: "select" },
      options: ["span", "div"],
    },
    showIndicator: {
      control: { type: "boolean" },
    },
    indicator: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    showIndicator: true,
    tag: "span",
  },
  component: Status,
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--space-4)" }}>
      {list.map(({ text, type }, index) => (
        <Status type={type} {...args} key={index}>
          {text}
        </Status>
      ))}
    </div>
  ),
};

export const WithoutIndicator: Story = {
  args: {
    showIndicator: false,
    type: STATUS_TYPE.SUCCESS,
  },
  render: (args) => <Status {...args}>Without indicator</Status>,
};

export const CustomIndicator: Story = {
  args: {
    indicator: (
      <span
        style={{
          color: "var(--color-status-warning)",
          fontSize: "var(--font-size-text-xs)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--line-height-text-xs)",
        }}
      >
        ✓
      </span>
    ),
    type: STATUS_TYPE.WARNING,
  },
  render: (args) => <Status {...args}>Custom indicator</Status>,
};
