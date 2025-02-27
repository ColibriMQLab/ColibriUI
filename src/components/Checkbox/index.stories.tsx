import React, { useEffect, useState } from "react";
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
  },
  args: {
    disabled: false,
    hasError: false,
    checked: false,
  },
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

const Example = ({ checked: controlledChecked, onChange, ...args }): JSX.Element => {
  const [isChecked, setChecked] = useState<boolean>(controlledChecked ?? false);

  useEffect(() => {
    setChecked(controlledChecked);
  }, [controlledChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange?.(event);
  };

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      hint={args.hasError ? "Error text" : ""}
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
