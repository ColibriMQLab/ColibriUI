import React from "react";
import User from "../Icons/User";
import Cart from "../Icons/Cart";
import generateUniqID from '../helpers/generateUniqID';
import Badge from ".";
import type { ReactNode } from "react";
import type { Meta } from "@storybook/react";

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
    color: {
      control: { type: "color" },
    },
    background: {
      control: { type: "color" },
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
  },
  args: {
    invisible: false,
    showZero: false,
    background: "#FC5759",
    color: "#fff",
    direction: "right",
  },
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

function render(args) {
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {[<Cart />, <User />].map((icon: ReactNode, index: number) => {
        return (
          <Badge key={generateUniqID(index)} content={3} {...args}>
            {icon}
          </Badge>
        );
      })}
    </div>
  );
}

export const Default = (args) => {
  return <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}} >{render(args)}</div>;
};
