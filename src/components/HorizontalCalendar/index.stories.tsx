
import React from 'react';
import { fn } from "@storybook/test";
import { HorizontalCalendar } from '.';

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HorizontalCalendar> = {
  title: "UI/HorizontalCalendar",
  parameters: {
    layout: "centered",
  },
  args: { onChange: fn() },
  component: HorizontalCalendar,
} satisfies Meta<typeof HorizontalCalendar>;

export default meta;

type Story = StoryObj<typeof HorizontalCalendar>;

const Template = (args: any) => {
  return (
  <div style={{width: '1260px'}}><HorizontalCalendar size="l" {...args} /></div>);
};

export const Default: Story = Template.bind({});

Default.args = {};