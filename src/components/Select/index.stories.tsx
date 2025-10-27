import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Select from ".";
import Button from "../Button";

const meta: Meta<typeof Select> = {
	title: "UI/Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		hasError: {
			control: "boolean",
			description: "Shows error state",
		},
		fullWidth: {
			control: "boolean",
			description: "Makes the select take up the full width of the container",
		},
		disabled: {
			control: "boolean",
			description: "Disables the select input",
		},
		label: {
			control: "text",
			description: "Label text above the field",
		},
		hint: {
			control: "text",
			description: "Helper text displayed below the field",
		},
		placeholder: {
			control: "text",
			description: "Placeholder text when no option is selected",
		},
		size: {
			control: "select",
			options: ["s", "m", "l"],
			description: "Defines the size of the input",
		},
		zIndex: {
			control: "number",
			description: "Z-index value for the dropdown menu",
		},
		fontSize: {
			control: "number",
			description: "Font size inside the dropdown menu",
		},
	},
	args: {
		hasError: false,
		fullWidth: false,
		disabled: false,
		placeholder: "Select an option",
		label: "Label",
		hint: "Hint text",
		size: "m",
	},
};

export default meta;

type Story = StoryObj<typeof Select>;

// ----------------------------
// Common options
// ----------------------------
const options = Array.from({ length: 20 }).map((_, i) => ({
	label: (
		<span>
			<strong>Long option</strong> {i + 1}
		</span>
	),
	value: String(i + 1),
	disabled: i === 2,
}));

// ----------------------------
// Template
// ----------------------------
const Template = (args: any) => {
	const [value, setValue] = useState<string>();
	return (
		<div style={{ width: args.fullWidth ? "100%" : 300 }}>
			<Select {...args} value={value} onChange={setValue} options={options} />
		</div>
	);
};

// ----------------------------
// Stories
// ----------------------------

export const Default: Story = {
	render: Template,
	args: {},
};

export const WithError: Story = {
	render: Template,
	args: {
		hasError: true,
		hint: "Something went wrong",
	},
};

export const Disabled: Story = {
	render: Template,
	args: {
		disabled: true,
	},
};

export const FullWidth: Story = {
	render: Template,
	args: {
		fullWidth: true,
		label: "Full width select",
	},
};

export const CustomTrigger: Story = {
	render: (args) => {
		const [value, setValue] = useState<string>();
		return (
			<Select
				{...args}
				value={value}
				onChange={setValue}
				options={options}
				customInputRoot={
					<Button variant="outline" fullWidth>
						Custom trigger
					</Button>
				}
			/>
		);
	},
	args: {
		label: "Custom trigger",
	},
};