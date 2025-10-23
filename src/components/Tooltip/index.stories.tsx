import React from "react";
import Button from "../Button";
import Tooltip from ".";

import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Tooltip> = {
	title: "UI/Tooltip",
	parameters: {
		layout: "centered",
	},
	argTypes: {
		withTail: {
			control: { type: "boolean" },
			options: [true, false],
		},
	},
	component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

export const Default: Story = {
	args: {
		children: <Button variant="primary">Кнопка</Button>,
		content: (
			<span>
				{TEXT}
			</span>
		),
		placement: "top-end",
	},
};

export const WithTail: Story = {
	args: {
		children: <Button variant="primary">Кнопка</Button>,
		content: (
			<span>
				{TEXT}
			</span>
		),
		// withTail: true,
		placement: "top-end",
	},
};











