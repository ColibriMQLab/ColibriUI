import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";

import Dropdown from ".";
import Menu from "../Menu";
import MenuItem from "../Menu/components/MenuItem";
import Button from "../Button";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    trigger: {
      control: {
        type: "multi-select",
      },
      options: ["click", "hover", "focus"],
      description: "Trigger type(s) that open the dropdown",
    },
    placement: {
      control: "select",
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
      description: "Dropdown menu placement relative to the trigger",
    },
    strategy: {
      control: "select",
      options: ["absolute", "fixed"],
      description: "Menu positioning strategy",
    },
    zIndex: {
      control: "number",
      description: "Dropdown menu container z-index",
    },
    fontSize: {
      control: "number",
      description: "Font size inside the menu",
    },
    disabled: {
      control: "boolean",
      description: "Disables Dropdown so it cannot be opened",
    },
    defaultVisible: {
      control: "boolean",
      description: "Initial dropdown visibility in uncontrolled mode",
    },
    visible: {
      control: "boolean",
      description: "Controlled dropdown visibility state",
    },
    preventOverflow: {
      control: "boolean",
      description: "Prevents the menu from overflowing the viewport",
    },
    preventAutoClose: {
      control: "boolean",
      description: "Keeps the menu open after clicking an item",
    },
    flip: {
      control: "boolean",
      description: "Allows automatic placement changes when space is limited",
    },
    samewidth: {
      control: "boolean",
      description: "Forces the overlay width to match the trigger width",
    },
    onVisibleChange: {
      action: "visibleChange",
      description: "Called when the menu opens or closes",
    },
    overlay: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    disabled: false,
    trigger: ["hover"],
    placement: "bottom",
    preventOverflow: true,
    flip: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "var(--space-24)", textAlign: "center" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const overlayMenu = (
  <Menu>
    <MenuItem>Test 1</MenuItem>
    <MenuItem>Test 2</MenuItem>
    <MenuItem>Test 3</MenuItem>
  </Menu>
);

export const HoverTrigger: Story = {
  name: "Hover Trigger",
  args: {
    children: <Button variant="primary">Hover me</Button>,
    overlay: overlayMenu,
    trigger: ["hover"],
  },
};

export const ClickTrigger: Story = {
  name: "Click Trigger",
  args: {
    children: <Button variant="primary">Click me</Button>,
    overlay: overlayMenu,
    trigger: ["click"],
  },
};

export const FocusTrigger: Story = {
  name: "Focus Trigger",
  args: {
    children: <Button variant="primary">Focus me</Button>,
    overlay: overlayMenu,
    trigger: ["focus"],
  },
};

export const CombinedTriggers: Story = {
  name: "Hover + Click",
  args: {
    children: <Button variant="primary">Hover or Click me</Button>,
    overlay: overlayMenu,
    trigger: ["hover", "click"],
  },
};

export const Controlled: Story = {
  name: "Controlled",
  args: {
    overlay: overlayMenu,
    preventAutoClose: true,
    trigger: ["click"],
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);

    return (
      <Dropdown
        {...args}
        visible={visible}
        onVisibleChange={setVisible}
        overlay={
          <Menu>
            <MenuItem onClick={() => setVisible(false)}>Close on item</MenuItem>
            <MenuItem>Stays open because preventAutoClose is true</MenuItem>
          </Menu>
        }
      >
        <Button variant="primary">Controlled dropdown</Button>
      </Dropdown>
    );
  },
};
