import React from 'react'
import TabsPanes from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TabsPanes> = {
  title: "UI/TabsPanes",
  parameters: {
    layout: "centered",
  },
  argTypes: {
  },
  component: TabsPanes,
} satisfies Meta<typeof TabsPanes>;

export default meta;

type Story = StoryObj<typeof TabsPanes>;

export const Default = (args: Story) => {
  return(
  <TabsPanes
    {...args}
    activePane="2"
    panes={[
      { id: '1', content: 'Pane 1 content' },
      { id: '2', content: 'Pane 2 content' },
    ]}
  />
)};