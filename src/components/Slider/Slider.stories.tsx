import React, { useEffect, useState } from "react";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Slider } from "./Slider";
import type {
  SliderProps,
  SliderRangeProps,
  SliderSingleProps,
} from "./index.props";

type SliderValue = number | [number, number];
type SliderStoryArgs = Omit<
  SliderProps,
  "value" | "onChange" | "onChangeCommitted"
> & {
  value?: SliderValue;
  onChange?: (value: SliderValue) => void;
  onChangeCommitted?: (value: SliderValue) => void;
};

const tickOptions = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];

const meta: Meta<SliderStoryArgs> = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "range"],
    },
    value: {
      control: { type: "object" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
    label: {
      control: { type: "text" },
    },
    labelContent: {
      table: { disable: true },
    },
    labelPlacement: {
      control: { type: "select" },
      options: ["top", "left", "none"],
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    reversed: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
    view: {
      control: { type: "select" },
      options: ["default", "accent", "gradient"],
    },
    pointerSize: {
      control: { type: "select" },
      options: ["small", "large", "none"],
    },
    pointerVisibility: {
      control: { type: "select" },
      options: ["always", "hover"],
    },
    showValue: {
      control: { type: "boolean" },
    },
    valueFormatter: {
      table: { disable: true },
    },
    ticks: {
      control: { type: "object" },
    },
    tickType: {
      control: { type: "select" },
      options: ["bullet", "separator"],
    },
    ariaLabel: {
      control: { type: "object" },
    },
    name: {
      control: { type: "object" },
    },
    minDistance: {
      control: { type: "number" },
    },
    className: {
      table: { disable: true },
    },
    onChange: {
      action: "change",
    },
    onChangeCommitted: {
      action: "change committed",
    },
  },
  args: {
    mode: "single",
    value: 40,
    min: 0,
    max: 100,
    step: 1,
    label: "Volume",
    labelPlacement: "top",
    orientation: "horizontal",
    reversed: false,
    disabled: false,
    size: "m",
    view: "default",
    pointerSize: "small",
    pointerVisibility: "always",
    showValue: true,
    ticks: tickOptions,
    tickType: "bullet",
    ariaLabel: "Volume",
    name: "volume",
    minDistance: 0,
    onChange: fn(),
    onChangeCommitted: fn(),
  },
} satisfies Meta<SliderStoryArgs>;

export default meta;

type Story = StoryObj<SliderStoryArgs>;

const getInitialValue = (args: SliderStoryArgs): SliderValue => {
  if (args.value !== undefined) {
    return args.value;
  }

  return args.mode === "range" ? [25, 75] : 40;
};

const SliderWithState = (args: SliderStoryArgs) => {
  const [value, setValue] = useState<SliderValue>(() => getInitialValue(args));

  useEffect(() => {
    setValue(getInitialValue(args));
  }, [args.mode, args.value]);

  if (args.mode === "range") {
    const rangeValue: [number, number] = Array.isArray(value)
      ? value
      : [25, 75];

    return (
      <Slider
        {...(args as SliderRangeProps)}
        value={rangeValue}
        onChange={(nextValue) => {
          setValue(nextValue);
          args.onChange?.(nextValue);
        }}
        onChangeCommitted={(nextValue) => {
          args.onChangeCommitted?.(nextValue);
        }}
      />
    );
  }

  const singleValue = typeof value === "number" ? value : 40;

  return (
    <Slider
      {...(args as SliderSingleProps)}
      mode="single"
      value={singleValue}
      onChange={(nextValue) => {
        setValue(nextValue);
        args.onChange?.(nextValue);
      }}
      onChangeCommitted={(nextValue) => {
        args.onChangeCommitted?.(nextValue);
      }}
    />
  );
};

export const Default: Story = {
  render: SliderWithState,
};

export const WithoutTicks: Story = {
  render: SliderWithState,
  args: {
    label: "Brightness",
    ticks: [],
    value: 48,
  },
};

export const Range: Story = {
  render: SliderWithState,
  args: {
    mode: "range",
    value: [25, 75],
    label: "Price range",
    ariaLabel: ["Minimum price", "Maximum price"],
    name: ["priceFrom", "priceTo"],
    minDistance: 10,
  },
};

export const Accent: Story = {
  render: SliderWithState,
  args: {
    view: "accent",
    label: "Saturation",
    value: 64,
  },
};

export const Gradient: Story = {
  render: SliderWithState,
  args: {
    view: "gradient",
    label: "Mood",
    value: 72,
    valueFormatter: (current) => `${current}%`,
  },
};

export const Vertical: Story = {
  render: SliderWithState,
  args: {
    orientation: "vertical",
    label: "Level",
    value: 35,
  },
};

export const WithLeftLabel: Story = {
  render: SliderWithState,
  args: {
    label: "Temperature",
    labelPlacement: "left",
    value: 55,
    valueFormatter: (current) => `${current} C`,
  },
};

export const Separators: Story = {
  render: SliderWithState,
  args: {
    label: "Progress",
    tickType: "separator",
    ticks: [0, 20, 40, 60, 80, 100],
    value: 60,
  },
};

export const HoverPointer: Story = {
  render: SliderWithState,
  args: {
    label: "Gain",
    pointerVisibility: "hover",
    pointerSize: "large",
    value: 45,
  },
};

export const Disabled: Story = {
  render: SliderWithState,
  args: {
    disabled: true,
    label: "Disabled",
    value: 40,
  },
};
