import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Dropdown from ".";
import Menu from "../Menu";
import MenuItem from "../Menu/components/MenuItem";
import Button from "../Button";
import type { DropdownProps } from "./index.props";

const meta: Meta<typeof Dropdown> = {
	title: "UI/Dropdown",
	component: Dropdown,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		trigger: {
			control: {
				type: "multi-select",
			},
			options: ["click", "hover", "focus"],
			description: "Тип(ы) триггера, которые открывают дропдаун",
		},
		placement: {
			control: "select",
			options: [
				"top", "bottom", "left", "right",
				"top-start", "top-end",
				"bottom-start", "bottom-end",
				"left-start", "left-end",
				"right-start", "right-end",
			],
			description: "Позиция выпадающего меню относительно триггера",
		},
		strategy: {
			control: "select",
			options: ["absolute", "fixed"],
			description: "Способ позиционирования меню",
		},
		zIndex: {
			control: "number",
			description: "Z-index контейнера выпадающего меню",
		},
		fontSize: {
			control: "number",
			description: "Размер шрифта внутри меню",
		},
		disabled: {
			control: "boolean",
			description: "Отключает Dropdown (не открывается)",
		},
		preventOverflow: {
			control: "boolean",
			description: "Запрещает выход меню за границы экрана",
		},
		preventAutoClose: {
			control: "boolean",
			description: "Меню не закрывается при клике на пункт",
		},
		flip: {
			control: "boolean",
			description: "Разрешить автоматическое изменение позиции при нехватке места",
		},
		samewidth: {
			control: "boolean",
			description: "Принудительно выравнивает ширину overlay под ширину триггера",
		},
		onVisibleChange: {
			action: "visibleChange",
			description: "Вызывается при открытии/закрытии меню",
		},
	},
	args: {
		disabled: false,
		trigger: ["hover"],
		placement: "bottom",
		preventOverflow: true,
		flip: true,
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

type Story = StoryObj<typeof Dropdown>;

const overlayMenu = (
	<Menu>
		<MenuItem>Test 1</MenuItem>
		<MenuItem>Test 2</MenuItem>
		<MenuItem>Test 3</MenuItem>
	</Menu>
);

export const HoverTrigger: Story = {
	name: "Hover Trigger",
	args: {
		children: <Button variant="primary">Hover me</Button>,
		overlay: overlayMenu,
		trigger: ["hover"],
	},
};

export const ClickTrigger: Story = {
	name: "Click Trigger",
	args: {
		children: <Button variant="primary">Click me</Button>,
		overlay: overlayMenu,
		trigger: ["click"],
	},
};

export const FocusTrigger: Story = {
	name: "Focus Trigger",
	args: {
		children: <Button variant="primary">Focus me</Button>,
		overlay: overlayMenu,
		trigger: ["focus"],
	},
};

export const CombinedTriggers: Story = {
	name: "Hover + Click",
	args: {
		children: <Button variant="primary">Hover or Click me</Button>,
		overlay: overlayMenu,
		trigger: ["hover", "click"],
	},
};
