import React, { useState } from "react";
import { fn } from "@storybook/test";
import Checkbox from ".";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  parameters: {
    layout: "centered",
  },
  args: { onChange: fn() },
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

const Example = (props): JSX.Element => {
  const [isChecked, setChecked] = useState<boolean>(false);
  return (
    <Checkbox
      onChange={() => {
        setChecked(!isChecked);
      }}
      checked={isChecked}
      {...props}
    />
  );
};

export const Default = (): JSX.Element => (
  <ul style={{ listStyleType: "none" }}>
    <li style={{ padding: "3px" }}>
      <Example label="Label one" />
    </li>
    <li style={{ padding: "3px" }}>
      <Example label="Label two" />
    </li>
    <li style={{ padding: "3px" }}>
      <Example label="Disabled" disabled />
    </li>
    <li style={{ padding: "3px" }}>
      <Example label="Disabled checked" checked disabled />
    </li>
  </ul>
);

export const LongText = (): JSX.Element => (
  <div style={{ width: 300 }}>
    <Example label={TEXT} />
  </div>
);
