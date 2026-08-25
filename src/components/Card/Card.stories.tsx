import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Card, CardContent, CardInnerContent } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    backgroundType: {
      control: { type: "select" },
      options: ["none", "solid"],
    },
    selected: {
      control: { type: "boolean" },
    },
    view: {
      control: { type: "text" },
    },
    className: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    size: "m",
    view: "default",
    orientation: "horizontal",
    backgroundType: "solid",
    selected: false,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const mediaStyles = {
  blue: {
    background:
      "linear-gradient(135deg, var(--color-expressive-blue), var(--color-expressive-purple))",
    height: "100%",
    width: "100%",
  },
  warm: {
    background:
      "linear-gradient(135deg, var(--color-expressive-orange), var(--color-expressive-yellow))",
    height: "100%",
    width: "100%",
  },
};

export const Default: Story = {
  render: (args) => (
    <Card
      {...args}
      style={{ width: "calc(var(--space-32) * 3 + var(--space-8))" }}
    >
      <CardContent aspectRatio="4 / 3" style={{ width: "100%" }}>
        <div aria-hidden="true" style={mediaStyles.blue} />
        <CardInnerContent
          style={{
            alignItems: "flex-end",
            boxSizing: "border-box",
            padding: "var(--space-6)",
          }}
        >
          <strong
            style={{
              color: "var(--color-text-inverse)",
              fontFamily: "var(--font-family-ui)",
              fontSize: "var(--font-size-heading-md)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "var(--line-height-heading-md)",
            }}
          >
            Card title
          </strong>
        </CardInnerContent>
      </CardContent>
    </Card>
  ),
};

export const Selected: Story = {
  args: { selected: true },
  render: Default.render,
};

export const WithoutBackground: Story = {
  args: { backgroundType: "none" },
  render: Default.render,
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--space-4)" }}>
      {(["s", "m", "l"] as const).map((size) => (
        <Card
          key={size}
          {...args}
          size={size}
          style={{ width: "calc(var(--space-24) * 2)" }}
        >
          <CardContent aspectRatio="1 / 1" style={{ width: "100%" }}>
            <div aria-hidden="true" style={mediaStyles.blue} />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const VerticalWithOuterContent: Story = {
  args: { orientation: "horizontal", selected: true },
  render: (args) => (
    <Card
      {...args}
      style={{
        gap: "var(--space-4)",
        width: "calc(var(--space-32) * 4)",
      }}
    >
      <CardContent aspectRatio="1 / 1" style={{ width: "var(--space-32)" }}>
        <div aria-hidden="true" style={mediaStyles.warm} />
      </CardContent>
      <div
        style={{
          color: "var(--color-text-primary)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font-family-ui)",
          gap: "var(--space-2)",
          justifyContent: "center",
          minWidth: 0,
          padding: "var(--space-3) var(--space-4) var(--space-3) 0",
        }}
      >
        <strong
          style={{
            fontSize: "var(--font-size-heading-sm)",
            lineHeight: "var(--line-height-heading-sm)",
          }}
        >
          Side content
        </strong>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-text-sm)",
            lineHeight: "var(--line-height-text-sm)",
            marginBottom: 0,
          }}
        >
          A card can render any React content.
        </p>
      </div>
    </Card>
  ),
};

export const VerticalInnerContent: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Card {...args} style={{ width: "calc(var(--space-20) * 4)" }}>
      <CardContent
        orientation="vertical"
        aspectRatio="16 / 9"
        style={{ width: "100%" }}
      >
        <div aria-hidden="true" style={mediaStyles.blue} />
        <CardInnerContent
          orientation="vertical"
          style={{
            boxSizing: "border-box",
            color: "var(--color-text-inverse)",
            fontFamily: "var(--font-family-ui)",
            justifyContent: "flex-end",
            padding: "var(--space-4)",
          }}
        >
          <strong>Vertical overlay</strong>
          <span>Inner content follows the selected orientation.</span>
        </CardInnerContent>
      </CardContent>
    </Card>
  ),
};
