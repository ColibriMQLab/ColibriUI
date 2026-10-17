import React from "react";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Plus, User } from "../Icons";
import { NavigationMenu } from "./NavigationMenu";
import type { NavigationMenuItem, NavigationMenuProps } from "./index.props";

const ITEMS: NavigationMenuItem[] = [
  { id: "cinema", label: "Cinema", href: "#cinema" },
  { id: "concert", label: "Concerts", href: "#concert" },
  { id: "theatre", label: "Theatre", href: "#theatre" },
  { id: "certificates", label: "Gift certificates", href: "#certificates" },
  { id: "art", label: "Exhibitions", href: "#art", active: true },
  { id: "festivals", label: "Festivals", href: "#festivals" },
  { id: "kids", label: "Kids", href: "#kids" },
];

const PINNED_ITEMS: NavigationMenuItem[] = [
  { id: "sale", label: "Sale", href: "#sale" },
];

const MORE_ITEMS: NavigationMenuItem[] = [
  { id: "show", label: "Shows", href: "#show" },
  { id: "masterclass", label: "Master classes", href: "#masterclass" },
  { id: "lectures", label: "Lectures", href: "#lectures" },
  { id: "free", label: "Free", href: "#free" },
];

const meta: Meta<NavigationMenuProps> = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "padded",
  },
  args: {
    items: ITEMS,
    pinnedItems: PINNED_ITEMS,
    moreItems: [],
    layout: "overflow",
    size: "m",
    moreLabel: "More",
    "aria-label": "Sections",
    onItemClick: fn(),
  },
  argTypes: {
    layout: {
      control: { type: "inline-radio" },
      options: ["overflow", "scroll"],
    },
    size: { control: { type: "inline-radio" }, options: ["s", "m"] },
    moreLabel: { control: { type: "text" } },
    items: { control: { type: "object" } },
    pinnedItems: { control: { type: "object" } },
    moreItems: { control: { type: "object" } },
    renderLink: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "50rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<NavigationMenuProps>;

export const Default: Story = {};

export const WithMoreItems: Story = {
  args: { moreItems: MORE_ITEMS },
};

/** The active fifth item stays in the row, its neighbours move to "More". */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "22rem" }}>
        <Story />
      </div>
    ),
  ],
};

/** Drag the right edge of the frame: the menu recalculates on the fly. */
export const Resizable: Story = {
  args: { moreItems: MORE_ITEMS },
  decorators: [
    (Story) => (
      <div
        style={{
          border: "1px dashed var(--color-border-default)",
          minHeight: "20rem",
          minWidth: "12rem",
          overflow: "auto",
          padding: "0.75rem",
          resize: "horizontal",
          width: "40rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  args: {
    items: ITEMS.map((item) =>
      item.id === "kids"
        ? { ...item, icon: <User width={16} height={16} /> }
        : item,
    ),
    pinnedItems: PINNED_ITEMS.map((item) => ({
      ...item,
      icon: <Plus width={16} height={16} />,
    })),
  },
};

/** Touch screens: a horizontal strip that scrolls to the active item. */
export const Scroll: Story = {
  args: { layout: "scroll", size: "s", moreItems: MORE_ITEMS },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

/** `renderLink` receives ready props for a router link. */
export const CustomLink: Story = {
  args: {
    moreItems: MORE_ITEMS,
    renderLink: ({ item, ...props }) => (
      <a {...props} href={item.href} data-router-link="">
        {props.children}
      </a>
    ),
  },
};
