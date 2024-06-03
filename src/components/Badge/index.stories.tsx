import React from "react";
import styled from "@emotion/styled";
import User from "../Icons/User";
import Badge from ".";
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
    <div>
      {Array(1)
        .fill(null)
        .map((_, i: number) => {
          return (
            <Badge key={i} content={3} {...args}>
              <User />
            </Badge>
          );
        })}
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flexwrap: wrap;
  gap: 10px;
`;

export const Default = (args) => {
  return <Wrapper>{render(args)}</Wrapper>;
};
