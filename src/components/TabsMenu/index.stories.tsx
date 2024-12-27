import React, { useState } from 'react'
import TabsMenu from ".";
import type { Meta, StoryObj } from "@storybook/react";

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
  },
  component: TabsMenu,
} satisfies Meta<typeof TabsMenu>;

export default meta;

type Story = StoryObj<typeof TabsMenu>;


export const Default = (args: Story) => {
  const [activeTab, setActiveTab] = useState('tab1')

  return(
  <div>
    <TabsMenu
      {...args}
      activeTab={activeTab}
      tabs={[
        { id: 'tab1', onClick: () => setActiveTab('tab1'), content: 'Tab 1'},
        { id: 'tab2', onClick: () => setActiveTab('tab2'), content: 'Tab 2', disabled: true},
        { id: 'tab3', onClick: () => setActiveTab('tab3'), content: 'Tab 3' },
        { id: 'tab4', onClick: () => setActiveTab('tab4'), content: 'Tab 4' },
      ]}
    />
  </div>
)};