import React, { useEffect, useState } from "react";
import { Datepicker } from ".";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { Props } from "./index.props";

const meta: Meta<typeof Datepicker> = {
  title: "UI/Datepicker",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    endPlaceholder: {
      control: "text",
    },
    hasError: {
      control: "boolean",
    },
    hint: {
      control: "text",
    },
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    selectedDate: {
      control: "text",
    },
    selectedRange: {
      control: "object",
    },
    selectionMode: {
      control: "inline-radio",
      options: ["single", "range"],
    },
    size: {
      control: "inline-radio",
      options: ["s", "m", "l"],
    },
    startPlaceholder: {
      control: "text",
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    hasError: false,
    hint: undefined,
    label: undefined,
    onChangeDate: fn(),
    onChangeRange: fn(),
    placeholder: "Select date",
    required: false,
    selectedDate: new Date().toISOString().split("T")[0],
    selectedRange: ["2026-05-12", "2026-05-18"],
    selectionMode: "single",
    size: "m",
  },
  component: Datepicker,
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof Datepicker>;

const ControlledTemplate = (args: Props) => {
  const [selectedDate, setSelectedDate] = useState(args.selectedDate);
  const [selectedRange, setSelectedRange] = useState(args.selectedRange);

  useEffect(() => {
    setSelectedDate(args.selectedDate);
  }, [args.selectedDate]);

  useEffect(() => {
    setSelectedRange(args.selectedRange);
  }, [args.selectedRange]);

  return (
    <Datepicker
      {...args}
      selectedDate={selectedDate}
      selectedRange={selectedRange}
      onChangeDate={(date) => {
        setSelectedDate(date);
        args.onChangeDate?.(date);
      }}
      onChangeRange={(range) => {
        setSelectedRange(range);
        args.onChangeRange?.(range);
      }}
    />
  );
};

export const Default: Story = {
  render: ControlledTemplate,
};

export const Empty: Story = {
  args: {
    selectedDate: "",
  },
  render: ControlledTemplate,
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Choose a date",
    selectedDate: "",
  },
  render: ControlledTemplate,
};

export const WithLabelAndHint: Story = {
  args: {
    hint: "Use your local date format.",
    label: "Start date",
  },
  render: ControlledTemplate,
};

export const Required: Story = {
  args: {
    label: "Start date",
    required: true,
  },
  render: ControlledTemplate,
};

export const WithError: Story = {
  args: {
    hasError: true,
    hint: "Date is required.",
    label: "Start date",
    selectedDate: "",
  },
  render: ControlledTemplate,
};

export const Range: Story = {
  args: {
    endPlaceholder: "End date",
    label: "Period",
    selectedDate: "",
    selectionMode: "range",
    startPlaceholder: "Start date",
  },
  render: ControlledTemplate,
};

export const EmptyRange: Story = {
  args: {
    endPlaceholder: "End date",
    placeholder: "",
    selectedDate: "",
    selectedRange: ["", ""],
    selectionMode: "range",
    startPlaceholder: "Start date",
  },
  render: ControlledTemplate,
};

export const RangeWithError: Story = {
  args: {
    endPlaceholder: "End date",
    hasError: true,
    hint: "Select both dates.",
    label: "Period",
    selectedDate: "",
    selectedRange: ["2026-05-12", ""],
    selectionMode: "range",
    startPlaceholder: "Start date",
  },
  render: ControlledTemplate,
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-5)" }}>
      {(["s", "m", "l"] as const).map((size) => (
        <ControlledTemplate key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
