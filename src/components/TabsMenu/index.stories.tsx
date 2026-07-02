import React, { useEffect, useState } from "react";
import TabsMenu from ".";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof TabsMenu> = {
  title: "UI/TabsMenu",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "s", "m", "l"],
    },
    activeTab: {
      control: "text",
    },
    tabs: {
      control: "object",
    },
    className: {
      table: { disable: true },
    },
    innerRef: {
      table: { disable: true },
    },
    onChange: {
      action: "change",
    },
  },
  args: {
    activeTab: "tab1",
    size: "m",
    tabs: [
      { id: "tab1", content: "Tab 1" },
      { id: "tab2", content: "Tab 2", disabled: true },
      { id: "tab3", content: "Tab 3" },
      { id: "tab4", content: "Tab 4" },
    ],
    onChange: fn(),
  },
  component: TabsMenu,
} satisfies Meta<typeof TabsMenu>;

export default meta;

type Story = StoryObj<typeof TabsMenu>;

export const Default = (args: Story) => {
  const [activeTab, setActiveTab] = useState(args.activeTab ?? "tab1");

  useEffect(() => {
    setActiveTab(args.activeTab ?? "tab1");
  }, [args.activeTab]);

  return (
    <div>
      <TabsMenu
        {...args}
        activeTab={activeTab}
        onChange={(tabId) => {
          setActiveTab(tabId);
          args.onChange?.(tabId);
        }}
      />
    </div>
  );
};
