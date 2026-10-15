import React, { useState } from "react";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button } from "../Button";
import { More } from "../Icons";
import { Typography } from "../Typography";
import { ColorPicker } from "./ColorPicker";
import { COLOR_PICKER_PRESETS } from "./presets";
import type { ColorPickerProps } from "./index.props";

const meta: Meta<ColorPickerProps> = {
  title: "UI/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  args: {
    value: "#d81b60",
    columns: 6,
    disabled: false,
    placement: "bottom-start",
    onChange: fn(),
  },
  argTypes: {
    value: { control: { type: "color" } },
    columns: { control: { type: "number", min: 1 } },
    disabled: { control: { type: "boolean" } },
    placement: {
      control: { type: "select" },
      options: ["bottom-start", "bottom", "bottom-end", "top-start", "right"],
    },
    zIndex: { control: { type: "number" } },
    presets: { control: { type: "object" } },
    labels: { control: { type: "object" } },
    children: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<ColorPickerProps>;

const ControlledPicker = ({ value, onChange, ...args }: ColorPickerProps) => {
  const [color, setColor] = useState(value);

  return (
    <div style={{ alignItems: "center", display: "flex", gap: "0.75rem" }}>
      <ColorPicker
        {...args}
        value={color}
        onChange={(next) => {
          setColor(next);
          onChange(next);
        }}
      />
      <Typography>{color ?? "No color"}</Typography>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ControlledPicker {...args} />,
};

export const CustomValue: Story = {
  args: { value: "#1e90ff" },
  render: (args) => <ControlledPicker {...args} />,
};

export const NoValue: Story = {
  args: { value: undefined },
  render: (args) => <ControlledPicker {...args} />,
};

export const CalendarOptionsTrigger: Story = {
  render: ({ value, onChange, ...args }) => {
    const [color, setColor] = useState(value);

    return (
      <div style={{ alignItems: "center", display: "flex", gap: "0.5rem" }}>
        <span
          style={{
            backgroundColor: color,
            borderRadius: "0.25rem",
            display: "inline-block",
            height: "1rem",
            width: "1rem",
          }}
        />
        <Typography>Holidays in United Kingdom</Typography>
        <ColorPicker
          {...args}
          value={color}
          onChange={(next) => {
            setColor(next);
            onChange(next);
          }}
        >
          <Button
            variant="clear"
            size="s"
            icon={<More />}
            aria-label="Options for Holidays in United Kingdom"
          />
        </ColorPicker>
      </div>
    );
  },
};

export const CustomPresets: Story = {
  args: {
    columns: 4,
    presets: COLOR_PICKER_PRESETS.slice(0, 8),
    value: "#0b8043",
  },
  render: (args) => <ControlledPicker {...args} />,
};

export const CustomLabels: Story = {
  args: {
    labels: {
      trigger: "Event color",
      palette: "Event colors",
      addCustom: "More colors",
      customTitle: "Pick event color",
      customDescription:
        "Pick a color for the event. The text color is chosen for contrast.",
      hex: "HEX",
      eyeDropper: "Sample a color",
      saturation: "Saturation and value",
      hue: "Hue angle",
      cancel: "Discard",
      save: "Apply",
    },
  },
  render: (args) => <ControlledPicker {...args} />,
};

export const TriggerOnly: Story = {
  render: ({ value, onChange, ...args }) => {
    const [color, setColor] = useState(value);

    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={(next) => {
          setColor(next);
          onChange(next);
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <ControlledPicker {...args} />,
};
