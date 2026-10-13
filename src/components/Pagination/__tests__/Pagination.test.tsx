import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Pagination, getPaginationItems } from "..";

describe("getPaginationItems", () => {
  test("shows every page when they fit", () => {
    expect(getPaginationItems(1, 1)).toEqual([1]);
    expect(getPaginationItems(5, 3)).toEqual([1, 2, 3, 4, 5]);
  });

  test("replaces a single hidden page with the page itself", () => {
    expect(getPaginationItems(7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("adds ellipses around the current page", () => {
    expect(getPaginationItems(24, 1)).toEqual([1, 2, "end-ellipsis", 24]);
    expect(getPaginationItems(24, 12)).toEqual([
      1,
      "start-ellipsis",
      11,
      12,
      13,
      "end-ellipsis",
      24,
    ]);
    expect(getPaginationItems(24, 24)).toEqual([1, "start-ellipsis", 23, 24]);
  });

  test("shows only siblings without boundaries", () => {
    expect(getPaginationItems(50, 25, 1, 0)).toEqual([24, 25, 26]);
  });

  test("names ellipses by their side of the current page", () => {
    expect(getPaginationItems(50, 47, 1, 2)).toEqual([
      1,
      2,
      "start-ellipsis",
      46,
      47,
      48,
      49,
      50,
    ]);
  });

  test("clamps invalid input", () => {
    expect(getPaginationItems(0, 5)).toEqual([1]);
    expect(getPaginationItems(10, 99, 1, 1)).toEqual([
      1,
      "start-ellipsis",
      9,
      10,
    ]);
  });
});

describe("<Pagination />", () => {
  test("marks the current page", () => {
    render(<Pagination totalPages={10} page={3} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("calls onPageChange from pages and arrows", () => {
    const onPageChange = jest.fn();
    render(<Pagination totalPages={10} page={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 4" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange.mock.calls).toEqual([[4], [2], [4]]);
  });

  test("works uncontrolled", () => {
    render(<Pagination totalPages={10} defaultPage={2} />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("skips disabled pages with arrows", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        totalPages={10}
        page={4}
        disabledPages={[5, 6]}
        onPageChange={onPageChange}
      />,
    );
    expect(screen.getByRole("button", { name: "Page 5" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(7);
  });

  test("disables arrows at the edges", () => {
    render(<Pagination totalPages={3} page={1} />);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
  });

  test("jumps to the typed page on Enter", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        totalPages={30}
        page={1}
        showQuickJump
        onPageChange={onPageChange}
      />,
    );
    const input = screen.getByLabelText("Go to page");
    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onPageChange).toHaveBeenCalledWith(30);
    expect(input).toHaveValue("1");
  });

  test("ignores an empty quick jump", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        totalPages={30}
        page={5}
        showQuickJump
        onPageChange={onPageChange}
      />,
    );
    const input = screen.getByLabelText("Go to page");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
    expect(onPageChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("5");
  });

  test("has no accessibility violations", async () => {
    const { container } = render(
      <Pagination totalPages={24} page={7} showQuickJump showPageSize />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
