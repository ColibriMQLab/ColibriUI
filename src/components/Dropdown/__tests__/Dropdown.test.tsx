import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dropdown from "..";
import Menu from "../../Menu";
import MenuItem from "../../Menu/components/MenuItem";

describe("<Dropdown />", () => {
	const overlay = (
		<Menu>
			<MenuItem>Test 1</MenuItem>
			<MenuItem>Test 2</MenuItem>
			<MenuItem>Test 3</MenuItem>
		</Menu>
	);

	it("renders without crashing", () => {
		render(<Dropdown overlay={overlay}>Open</Dropdown>);
		expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
	});

	it("has the correct title", () => {
		render(<Dropdown overlay={overlay}>Open</Dropdown>);
		expect(screen.getByRole("button")).toHaveTextContent("Open");
	});

	it("displays dropdown content on click when trigger is 'click'", async () => {
		render(
			<Dropdown trigger={["click"]} overlay={overlay}>
				Open
			</Dropdown>
		);
		const button = screen.getByRole("button", { name: /open/i });
		fireEvent.click(button);

		const menuItems = screen.getAllByTestId("menuitem");

		await waitFor(() => {
			expect(menuItems[0]).toBeVisible();
			expect(menuItems[0]).toHaveTextContent("Test 1");
			expect(menuItems[1]).toHaveTextContent("Test 2");
			expect(menuItems[2]).toHaveTextContent("Test 3");
		});
	});

	it("displays dropdown content on hover when trigger is 'hover'", async () => {
		render(
			<Dropdown trigger={["hover"]} overlay={overlay}>
				Open
			</Dropdown>
		);
		const button = screen.getByRole("button", { name: /open/i });
		fireEvent.mouseEnter(button);

		const menuItems = screen.getAllByTestId("menuitem");
		await waitFor(() => {
			expect(menuItems[0]).toBeVisible();
			expect(menuItems[0]).toHaveTextContent("Test 1");
		})
	});

	it("contains the correct child element", async () => {
		render(
			<Dropdown trigger={["hover"]} overlay={overlay}>
				Open
			</Dropdown>
		);
		const button = screen.getByRole("button", { name: /open/i });
		fireEvent.mouseEnter(button);

		const menuItems = screen.getAllByTestId("menuitem");
		await waitFor(() => {
			expect(menuItems[0]).toHaveTextContent("Test 1");
		})
	});
});
