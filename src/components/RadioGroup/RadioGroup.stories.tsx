import React, { useState } from 'react';
import RadioGroup, { RadioGroupProps } from '.';

import type { Meta, StoryObj } from "@storybook/react-webpack5";

const getOptions = (name?: string) => [
  {
    name: name || 'Option',
    val: '1',
    text: 'Option 1',
  },
  {
    name: name || 'Option',
    val: '2',
    text: 'Option 2',
  },
  {
    name: name || 'Option',
    val: '3',
    text: 'Option 3',
  },
];

export const Example = (args: RadioGroupProps) => {
  const [checked, setChecked] = useState<string>('1');
  return (
    <div style={{ margin: 20 }}>
      <RadioGroup
        {...args}
        val={checked}
        options={args.options || getOptions()}
        onChange={(value: string) => setChecked(value)}
      />
    </div>
  );
};

const meta: Meta<typeof Example> = {
  title: "UI/RadioGroup",
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
    column: false,
    
    wrapped: false
  },
  component: Example,
} satisfies Meta<typeof Example>;

type Story = StoryObj<typeof meta>;

export default meta;

const getSomeDisabledOptions = (name?: string) =>
  getOptions(name).map((option, index) => ({
    ...option,
    disabled: index % 2 !== 0,
  }));

export const Default: Story = {
  args: {
  },
};

export const DisabledRadio: Story = {
  args: {
    options: getSomeDisabledOptions('Radio')
  },
};

export const WithNote: Story = {
  args: {
    options: [
      {
        name: 'With Note',
        val: 'With Note',
        text: 'With Note',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      },
    ]
  },
};

export const LongText: Story = {
  args: {
    options: [
      {
        name: 'Long Text',
        val: '1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      },
      {
        name: 'Long Text',
        val: '2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      },
    ]
  },
};