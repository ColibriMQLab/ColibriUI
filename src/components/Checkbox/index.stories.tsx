import React, { useMemo, useState } from "react";
import { fn } from "@storybook/test";
import Checkbox from ".";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary"],
    },
    disabled: {
      control: { type: "boolean" },
      options: [true, false],
    },
    isError: {
      control: { type: "boolean" },
      options: [true, false],
    },
  },
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

const Example = (args): JSX.Element => {
  const [isChecked, setChecked] = useState<boolean>(false);
  return (
    <Checkbox
      onChange={() => {
        setChecked(!isChecked);
      }}
      hint={args.isError ? 'Ошибка' : ''}
      checked={isChecked}
      {...args}
    />
  );
};

export const Default = (args): JSX.Element => (
  <ul style={{ listStyleType: "none" }}>
    <li style={{ padding: "3px" }}>
      <Example {...args} label="Label one" />
    </li>
    <li style={{ padding: "3px" }}>
      <Example {...args} label="Label two" />
    </li>
    <li style={{ padding: "3px" }}>
      <Example {...args} label="Disabled" disabled />
    </li>
    <li style={{ padding: "3px" }}>
      <Example {...args} label="Disabled checked" checked disabled />
    </li>
  </ul>
);

export const LongText = (args): JSX.Element => (
  <div style={{ width: 300 }}>
    <Example label={TEXT} {...args} />
  </div>
);
