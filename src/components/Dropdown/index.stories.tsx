import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Dropdown from ".";
import Menu from "../Menu";
import MenuItem from "../Menu/components/MenuItem";
import Button from "../Button";

const meta: Meta<typeof Dropdown> = {
	title: "UI/Dropdown",
	component: Dropdown,
	parameters: {
		layout: "centered",
	},
	args: {
		disabled: false,
		trigger: ["hover"],
	},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
	args: {
		children: <Button variant="primary">Hover me</Button>,
		overlay: (
			<Menu>
				<MenuItem>Test 1</MenuItem>
				<MenuItem>Test 2</MenuItem>
				<MenuItem>Test 3</MenuItem>
			</Menu>
		),
	},
};
