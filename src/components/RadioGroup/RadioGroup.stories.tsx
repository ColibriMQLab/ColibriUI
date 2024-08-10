import React, { useState } from 'react';
import RadioGroup from '.';

import type { Meta } from "@storybook/react";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  parameters: {
    layout: "centered",
  },
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

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

const getSomeDisabledOptions = (name?: string) =>
  getOptions(name).map((option, index) => ({
    ...option,
    disabled: index % 2 !== 0,
  }));

export const Default: React.FC = () => {
  const [checked, setChecked] = useState<string>('1');
  return (
    <div style={{ margin: 20 }}>
      <RadioGroup
        val={checked}
        options={getOptions()}
        onChange={(value: string) => setChecked(value)}
      />
    </div>
  );
};

export const Disabled: React.FC = () => (
  <div style={{ margin: 20 }}>
    <RadioGroup
      val="1"
      options={getOptions('Radio')}
      onChange={() => null}
      disabled
    />
  </div>
);

export const DisabledRadio: React.FC = () => {
  const [checked, setChecked] = useState<string>('1');

  return (
    <div style={{ margin: 20 }}>
      <RadioGroup
        val={checked}
        options={getSomeDisabledOptions('Radio')}
        onChange={(value: string) => setChecked(value)}
      />
    </div>
  );
};

export const WithNote: React.FC = () => {
  const [checked, setChecked] = useState<string>('1');

  return (
    <RadioGroup
      val={checked}
      options={[
        {
          name: 'With Note',
          val: 'With Note',
          text: 'With Note',
          note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        },
      ]}
      onChange={(value: string) => setChecked(value)}
    />
  );
};

export const LongText: React.FC = () => {
  const [checked, setChecked] = useState<string>('1');

  return (
    <RadioGroup
      val={checked}
      options={[
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
      ]}
      onChange={(value: string) => setChecked(value)}
    />
  );
};