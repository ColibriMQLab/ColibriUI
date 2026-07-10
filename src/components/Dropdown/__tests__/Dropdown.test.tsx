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

	it("opens and closes on trigger click in uncontrolled mode", () => {
		render(
			<Dropdown
				trigger={["click"]}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		const button = screen.getByRole("button", { name: /open/i });

		fireEvent.click(button);
		expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();

		fireEvent.click(button);
		expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
	});

	it("calls onVisibleChange in controlled mode without changing DOM until visible changes", () => {
		const onVisibleChange = jest.fn();
		const { rerender } = render(
			<Dropdown
				visible={false}
				onVisibleChange={onVisibleChange}
				trigger={["click"]}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		fireEvent.click(screen.getByRole("button", { name: /open/i }));

		expect(onVisibleChange).toHaveBeenCalledWith(true);
		expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();

		rerender(
			<Dropdown
				visible
				onVisibleChange={onVisibleChange}
				trigger={["click"]}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
	});

	it("hides overlay when controlled visible changes to false", () => {
		const { rerender } = render(
			<Dropdown
				visible
				trigger={["click"]}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();

		rerender(
			<Dropdown
				visible={false}
				trigger={["click"]}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
	});

	it("does not close on overlay click when preventAutoClose is true", () => {
		const onVisibleChange = jest.fn();

		render(
			<Dropdown
				defaultVisible
				preventAutoClose
				onVisibleChange={onVisibleChange}
				overlay={<button type="button">Inside</button>}
			>
				Open
			</Dropdown>
		);

		fireEvent.click(screen.getByRole("button", { name: /inside/i }));

		expect(screen.getByRole("button", { name: /inside/i })).toBeInTheDocument();
		expect(onVisibleChange).not.toHaveBeenCalled();
	});

	it("closes and calls onVisibleChange on overlay click when preventAutoClose is false", () => {
		const onVisibleChange = jest.fn();

		render(
			<Dropdown
				defaultVisible
				onVisibleChange={onVisibleChange}
				overlay={<button type="button">Inside</button>}
			>
				Open
			</Dropdown>
		);

		fireEvent.click(screen.getByRole("button", { name: /inside/i }));

		expect(onVisibleChange).toHaveBeenCalledWith(false);
		expect(screen.queryByRole("button", { name: /inside/i })).not.toBeInTheDocument();
	});

	it("closes and calls onVisibleChange on outside click", () => {
		const onVisibleChange = jest.fn();

		render(
			<Dropdown
				defaultVisible
				onVisibleChange={onVisibleChange}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		fireEvent.mouseDown(document.body);

		expect(onVisibleChange).toHaveBeenCalledWith(false);
		expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
	});

	it("closes and calls onVisibleChange through useDismiss", () => {
		const onVisibleChange = jest.fn();

		render(
			<Dropdown
				defaultVisible
				onVisibleChange={onVisibleChange}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		fireEvent.keyDown(screen.getByTestId("popper-container"), {
			key: "Escape",
		});

		expect(onVisibleChange).toHaveBeenCalledWith(false);
		expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
	});

	it("does not open when disabled", () => {
		const onVisibleChange = jest.fn();

		render(
			<Dropdown
				disabled
				trigger={["click"]}
				onVisibleChange={onVisibleChange}
				overlay={<div data-testid="dropdown-content">Content</div>}
			>
				Open
			</Dropdown>
		);

		fireEvent.click(screen.getByRole("button", { name: /open/i }));

		expect(onVisibleChange).not.toHaveBeenCalled();
		expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
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
