import React from "react";
import Button from "../Button";
import Tooltip from ".";

import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Tooltip> = {
	title: "UI/Tooltip",
	component: Tooltip,
	parameters: { layout: "centered" },
	argTypes: {
		withTail: {
			control: "boolean",
			description: "Показывать ли стрелку у тултипа",
		},
		placement: {
			control: "select",
			options: [
				"top", "right", "bottom", "left",
				"top-start", "top-end",
				"right-start", "right-end",
				"bottom-start", "bottom-end",
				"left-start", "left-end",
			],
		},
		zIndex: { control: "number" },
		strategy: {
			control: "select",
			options: ["absolute", "fixed"],
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "100px", textAlign: "center" }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const Default: Story = {
	args: {
		children: <Button variant="primary">Hover me</Button>,
		content: <span>{TEXT}</span>,
		placement: "top",
	},
};

export const WithTail: Story = {
	args: {
		children: <Button variant="primary">Hover me</Button>,
		content: <span>{TEXT}</span>,
		withTail: true,
		placement: "right",
	},
};
