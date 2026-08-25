import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Progress } from "./Progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    hasValue: {
      control: { type: "boolean" },
    },
    view: {
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "accent",
        "accentGradient",
        "info",
        "positive",
        "warning",
        "negative",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    progressSize: {
      control: { type: "select" },
      options: ["2", "4", "6", "8"],
    },
    label: {
      control: { type: "text" },
    },
    labelIcon: {
      table: { disable: true },
    },
    labelTextPlacement: {
      control: { type: "select" },
      options: ["left", "right", "none"],
    },
    labelPlacement: {
      control: { type: "select" },
      options: ["top", "left", "none"],
    },
    valuePlacement: {
      control: { type: "select" },
      options: ["top", "right", "none"],
    },
    valueAlign: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    caption: {
      control: { type: "text" },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    value: 60,
    view: "accent",
    size: "m",
    progressSize: "4",
    label: "File upload",
    labelPlacement: "top",
    labelTextPlacement: "right",
    valuePlacement: "right",
    valueAlign: "start",
    hasValue: true,
    caption: "About two minutes remaining",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "calc(var(--space-32) * 4 + var(--space-2))" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Views: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      {(["default", "secondary", "accent", "accentGradient", "info", "positive", "warning", "negative"] as const).map(
        (view, index) => (
          <Progress
            key={view}
            {...args}
            caption={view}
            value={(index + 1) * 12}
            view={view}
          />
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      {(["s", "m", "l"] as const).map((size) => (
        <Progress key={size} {...args} caption={`${size.toUpperCase()} size`} size={size} />
      ))}
    </div>
  ),
};

export const BarSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      {(["2", "4", "6", "8"] as const).map((progressSize) => (
        <Progress key={progressSize} {...args} caption={`${progressSize}px bar`} progressSize={progressSize} />
      ))}
    </div>
  ),
};

export const Positive: Story = {
  args: { value: 100, view: "positive", caption: "Upload complete" },
};

export const WithLabelIcon: Story = {
  args: {
    labelIcon: <span aria-hidden="true">●</span>,
    labelTextPlacement: "left",
  },
};

export const LabelOnLeft: Story = {
  args: { labelPlacement: "left", value: 35 },
};

export const ValueOnTop: Story = {
  args: { labelPlacement: "none", valuePlacement: "top", valueAlign: "center" },
};

export const WithoutValue: Story = {
  args: { hasValue: false },
};

export const WithoutLabel: Story = {
  args: { labelPlacement: "none", label: undefined, labelIcon: undefined },
};

const InteractiveExample = (args: React.ComponentProps<typeof Progress>) => {
  const [value, setValue] = useState(40);
  return (
    <div>
      <Progress {...args} value={value} />
      <input
        aria-label="Progress"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.currentTarget.value))}
        style={{ marginTop: "var(--space-6)", width: "100%" }}
      />
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveExample {...args} />,
};
