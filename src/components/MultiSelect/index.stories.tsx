import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import MultiSelect from ".";
import { fn } from "storybook/test";
import type { SelectedItem } from "./index.props";

const meta: Meta<typeof MultiSelect> = {
	title: "UI/MultiSelect",
	component: MultiSelect,
	parameters: {
		// layout: "centered",
	},
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["chip"],
			description: "Changes the visual style of selected items to 'chips'.",
		},
		disabled: {
			control: "boolean",
			description: "Disables the MultiSelect component.",
		},
		fullWidth: {
			control: "boolean",
			description: "Expands the component to fill its container width.",
		},
		required: {
			control: "boolean",
			description: "Marks the field as required.",
		},
		hasError: {
			control: "boolean",
			description: "Displays an error state and hint message.",
		},
		label: {
			control: "text",
			description: "Label displayed above the field.",
		},
		hint: {
			control: "text",
			description: "Helper or error text displayed below the field.",
		},
		placeholder: {
			control: "text",
			description: "Text displayed when no options are selected.",
		},
		onChange: { table: { disable: true } },
	},
	args: {
		required: false,
		fullWidth: false,
		disabled: false,
		hasError: false,
		placeholder: "Select options",
		label: "Label",
		hint: "Hint text",
		onChange: fn()
	},
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

// ---------------------------
// Mock Data
// ---------------------------

const groups = [
	{
		title: "Haircut",
		value: "haircut",
		options: [
			{ value: "shampoo-and-blow-dry", label: "Shampoo and Blow-Dry" },
			{ value: "hair-treatment", label: "Hair Treatment" },
			{ value: "trim", label: "Trim" },
		],
	},
	{
		title: "Hair Coloring",
		value: "hair-coloring",
		options: [
			{ value: "hair-coloring", label: "Hair Coloring" },
			{ value: "highlights", label: "Highlights" },
		],
	},
	{
		title: "Hair Care",
		value: "hair-care",
		options: [
			{ value: "scalp-treatment", label: "Scalp Treatment", disabled: true },
			{ value: "hair-mask", label: "Hair Mask" },
			{ value: "olaplex-treatment", label: "Olaplex Treatment" },
		],
	},
];

// ---------------------------
// Template
// ---------------------------

const Template = (args: React.ComponentProps<typeof MultiSelect>) => {
	const [value, setValue] = useState<SelectedItem[]>([]);

	return (
		<div style={{ width: args.fullWidth ? "100%" : 320 }}>
			<MultiSelect
				{...args}
				value={value}
				groups={groups}
				onChange={(v) => {
					setValue(v);
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
	args: {},
};

export const ChipType: Story = {
	render: Template,
	args: {
		type: "chip",
	},
};

export const WithPreselectedValues: Story = {
	render: (args) => {
		const [value, setValue] = useState<SelectedItem[]>([
			{ group: "haircut", option: "trim" },
			{ group: "haircut", option: "shampoo-and-blow-dry" },
			{ group: "hair-care", option: "hair-mask" },
		]);

		return (
			<div style={{ width: 320 }}>
				<MultiSelect
					{...args}
					value={value}
					groups={groups}
					onChange={(v) => {
						setValue(v);
					}}
				/>
			</div>
		);
	},
	args: {
		type: "chip",
		label: "Preselected options",
	},
};

export const Disabled: Story = {
	render: Template,
	args: {
		disabled: true,
		label: "Disabled MultiSelect",
	},
};

export const WithError: Story = {
	render: Template,
	args: {
		hasError: true,
		hint: "This field is required",
	},
};

export const FullWidth: Story = {
	render: Template,
	args: {
		fullWidth: true,
		label: "Full-width MultiSelect",
	},
};
