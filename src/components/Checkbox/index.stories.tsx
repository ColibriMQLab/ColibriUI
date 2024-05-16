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
  <ul>
    <li style={{ padding: "3px" }}>
      <Example text="Label one" />
    </li>
    <li style={{ padding: "3px" }}>
      <Example text="Label two" />
    </li>
    <li style={{ padding: "3px" }}>
      <Example text="Disabled" disabled />
    </li>
    <li style={{ padding: "3px" }}>
      <Example text="Disabled checked" checked disabled />
    </li>
  </ul>
);

export const LongText = (): JSX.Element => (
  <div style={{ width: 200 }}>
    <Example text="Very very very very very very very long text" />
  </div>
);
