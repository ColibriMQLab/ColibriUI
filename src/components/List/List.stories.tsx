import React, { useState } from "react";
import { fn } from "storybook/test";

import { Chevron } from "../Icons/Chevron";
import { Info } from "../Icons/Info";
import { Shield } from "../Icons/Shield";
import { User } from "../Icons/User";
import { List, ListItem, ListSection } from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { ListProps } from "./index.props";

const ChevronRight = () => (
  <Chevron aria-hidden="true" style={{ transform: "rotate(-90deg)" }} />
);

const meta: Meta<typeof List> = {
  title: "UI/List",
  component: List,
  parameters: { layout: "centered" },
  argTypes: {
    ariaLabel: { control: "text" },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    density: { control: "inline-radio", options: ["compact", "normal"] },
    disabled: { control: "boolean" },
    dividers: { control: "boolean" },
    size: { control: "inline-radio", options: ["s", "m", "l"] },
    surface: { control: "inline-radio", options: ["none", "container", "items"] },
  },
  args: {
    ariaLabel: "Settings",
    density: "normal",
    disabled: false,
    dividers: true,
    size: "m",
    surface: "container",
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

const StoryFrame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: "calc(var(--space-32) * 3)" }}>{children}</div>
);

const DefaultTemplate = (args: ListProps) => {
  const [selected, setSelected] = useState("profile");

  return (
    <StoryFrame>
      <List {...args}>
        <ListItem
          contentLeft={<User />}
          contentRight={<ChevronRight />}
          description="Name, photo, and contact details"
          selected={selected === "profile"}
          onAction={() => setSelected("profile")}
        >
          Profile
        </ListItem>
        <ListItem
          contentLeft={<Info />}
          contentRight={<ChevronRight />}
          description="Messages and product updates"
          selected={selected === "notifications"}
          onAction={() => setSelected("notifications")}
        >
          Notifications
        </ListItem>
        <ListItem
          contentLeft={<Shield />}
          contentRight={<ChevronRight />}
          disabled
          onAction={fn()}
        >
          Security
        </ListItem>
      </List>
    </StoryFrame>
  );
};

export const Default: Story = {
  render: DefaultTemplate,
};

export const ItemCards: Story = {
  args: {
    density: "compact",
    dividers: false,
    surface: "items",
  },
  render: (args) => (
    <StoryFrame>
      <List {...args} ariaLabel="Files">
        <ListItem href="#documents" contentRight={<ChevronRight />}>
          Documents
        </ListItem>
        <ListItem href="#images" contentRight={<ChevronRight />}>
          Images
        </ListItem>
        <ListItem href="#archive" contentRight={<ChevronRight />}>
          Archive
        </ListItem>
      </List>
    </StoryFrame>
  ),
};

export const Sections: Story = {
  args: {
    ariaLabel: "Navigation",
    dividers: false,
    surface: "container",
  },
  render: (args) => (
    <StoryFrame>
      <List {...args}>
        <ListSection title="Main">
          <ListItem onAction={fn()}>Home</ListItem>
          <ListItem onAction={fn()}>Catalog</ListItem>
        </ListSection>
        <ListSection title="Support">
          <ListItem href="#support">Support Center</ListItem>
          <ListItem>Version 2.0.0</ListItem>
        </ListSection>
      </List>
    </StoryFrame>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: DefaultTemplate,
};

export const Sizes: Story = {
  args: {
    dividers: true,
    surface: "container",
  },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gap: "var(--space-5)",
        width: "calc(var(--space-32) * 3)",
      }}
    >
      {(["s", "m", "l"] as const).map((size) => (
        <List key={size} {...args} ariaLabel={`Size ${size}`} size={size}>
          <ListItem
            contentLeft={<Info />}
            contentRight={<ChevronRight />}
            description={`${size.toUpperCase()} size list item`}
            selected
            onAction={fn()}
          >
            Size {size}
          </ListItem>
          <ListItem contentRight={<ChevronRight />} onAction={fn()}>
            Secondary item
          </ListItem>
        </List>
      ))}
    </div>
  ),
};
