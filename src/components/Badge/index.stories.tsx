import React from "react";
import { User } from "../Icons/User";
import { Cart } from "../Icons/Cart";
import generateUniqID from "../helpers/generateUniqID";
import { Badge } from ".";
import type { ReactNode } from "react";
import type { Meta } from "@storybook/react-webpack5";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    content: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    invisible: {
      control: { type: "boolean" },
      options: [true, false],
    },
    showZero: {
      control: { type: "boolean" },
      options: [true, false],
    },
    direction: {
      control: { type: "select" },
      options: ["right", "left"],
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    content: 3,
    max: 99,
    invisible: false,
    showZero: false,
    direction: "right",
  },
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

function render(args) {
  return (
    <div style={{ display: "flex", gap: "var(--space-8)" }}>
      {[<Cart />, <User />].map((icon: ReactNode, index: number) => {
        return (
          <Badge key={generateUniqID(index)} {...args}>
            {icon}
          </Badge>
        );
      })}
    </div>
  );
}

export const Default = (args) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
      {render(args)}
    </div>
  );
};

export const ShowZero = (args) => {
  return (
    <Badge {...args} content={0} showZero>
      <Cart />
    </Badge>
  );
};
