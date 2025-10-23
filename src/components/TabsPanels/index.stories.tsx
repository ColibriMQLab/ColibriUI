import React from 'react'
import TabsPanels from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof TabsPanels> = {
  title: "UI/TabsPanels",
  parameters: {
    layout: "centered",
  },
  argTypes: {
  },
  component: TabsPanels,
} satisfies Meta<typeof TabsPanels>;

export default meta;

type Story = StoryObj<typeof TabsPanels>;

export const Default = (args: Story) => {
  return(
  <TabsPanels
    {...args}
    activePanel="2"
    panels={[
      { id: '1', content: 'Pane 1 content' },
      { id: '2', content: 'Pane 2 content' },
    ]}
  />
)};