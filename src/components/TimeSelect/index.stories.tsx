import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import TimeSelect from ".";
import { fn } from "storybook/test";

const meta: Meta<typeof TimeSelect> = {
	title: "UI/TimeSelect",
	component: TimeSelect,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		interval: {
			control: { type: "select" },
			options: [5, 10, 15, 30],
			description: "Time interval between options in minutes.",
		},
		currentDate: {
			control: "date",
			description: "The current date used to disable past times.",
		},
		selectedDate: {
			control: "date",
			description:
				"The reference start date. Times before it will be disabled.",
		},
		allowedTimeRange: {
			control: "object",
			description:
				"Defines the allowed time range in HH:mm format (e.g., 09:00–18:00).",
		},
		disabled: {
			control: "boolean",
			description: "Disables the select component.",
		},
		label: {
			control: "text",
			description: "Label displayed above the field.",
		},
		placeholder: {
			control: "text",
			description: "Text displayed when no time is selected.",
		},
	},
	args: {
		interval: 15,
		label: "Select time",
		placeholder: "Select options",
		onChange: fn(),
		fullWidth: true,
	},
};

export default meta;

type Story = StoryObj<typeof TimeSelect>;

// ---------------------------
// Template
// ---------------------------

const Template = (args: React.ComponentProps<typeof TimeSelect>) => {
	const [value, setValue] = useState<string>("");

	return (
		<div style={{ width: args.fullWidth ? "240px" : "auto" }}>
			<TimeSelect
				{...args}
				value={value}
				onChange={(v) => {
					setValue(v);
					args.onChange(v);
				}}
			/>
		</div>
	);
};

// ---------------------------
// Stories
// ---------------------------

export const Default: Story = {
	render: Template,
	args: {
		label: "Start time",
		placeholder: "Select time",
		interval: 10,
		currentDate: new Date(),
	},
};

export const WithoutCurrentDate: Story = {
	render: Template,
	args: {
		label: "Select time",
		interval: 10,
	},
};

export const WithSelectedDate: Story = {
	render: Template,
	args: {
		label: "End time (start was 14:30)",
		placeholder: "Select end time",
		interval: 15,
		selectedDate: new Date("2024-07-24T14:30:00"),
	},
};

export const WithPastSelectedDate: Story = {
	render: Template,
	args: {
		label: "End time (start was 10:00)",
		placeholder: "Select end time",
		interval: 30,
		selectedDate: new Date("2024-07-24T10:00:00"),
	},
};

export const WithCurrentAndSelectedDate: Story = {
	render: Template,
	args: {
		label: "Considering current and selected dates",
		placeholder: "Select end time",
		interval: 15,
		currentDate: new Date("2024-07-24T12:00:00"),
		selectedDate: new Date("2024-07-24T13:30:00"),
	},
};

export const WithBusinessHoursAndSelectedDate: Story = {
	render: Template,
	args: {
		label: "Business hours (start was 14:00)",
		placeholder: "Select end time",
		interval: 15,
		allowedTimeRange: { start: "09:00", end: "18:00" },
		selectedDate: new Date("2024-07-24T14:00:00"),
	},
};
