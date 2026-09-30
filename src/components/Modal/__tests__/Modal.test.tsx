import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "..";

describe("<Modal />", () => {
  it("renders legacy title and wraps children", () => {
    render(<Modal title="Legacy title">content</Modal>);

    const dialog = screen.getByRole("dialog");
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(dialog).toHaveAttribute(
      "aria-labelledby",
      screen.getByText("Legacy title").id,
    );
  });

  it("renders close button without title", () => {
    const onClose = jest.fn();
    render(<Modal onClose={onClose}>content</Modal>);

    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-labelledby");
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders compound parts and closes from header", () => {
    const onClose = jest.fn();
    render(
      <Modal onClose={onClose} title="Ignored">
        <Modal.Header>
          <Modal.Title>Compound title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>,
    );

    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      screen.getByText("Compound title").id,
    );
    expect(screen.getAllByLabelText("Close modal")).toHaveLength(1);

    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps close button when compound modal has no header", () => {
    render(
      <Modal>
        <Modal.Body>Body</Modal.Body>
      </Modal>,
    );

    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  it("applies overlay and bleed modifiers", () => {
    render(
      <Modal>
        <Modal.Header overlay data-testid="header" />
        <Modal.Body bleed data-testid="body" />
      </Modal>,
    );

    expect(screen.getByTestId("header")).toHaveClass("root_overlay");
    expect(screen.getByTestId("body")).toHaveClass("root_bleed");
  });

  it("closes on Escape", () => {
    const onClose = jest.fn();
    render(<Modal onClose={onClose}>content</Modal>);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("<Modal /> nested", () => {
  it("closes only the topmost modal on Escape", () => {
    const onOuterClose = jest.fn();
    const onInnerClose = jest.fn();
    const { rerender } = render(
      <Modal onClose={onOuterClose}>outer</Modal>,
    );

    rerender(
      <>
        <Modal onClose={onOuterClose}>outer</Modal>
        <Modal onClose={onInnerClose}>inner</Modal>
      </>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onInnerClose).toHaveBeenCalledTimes(1);
    expect(onOuterClose).not.toHaveBeenCalled();

    rerender(<Modal onClose={onOuterClose}>outer</Modal>);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOuterClose).toHaveBeenCalledTimes(1);
  });
});

describe("<Modal withinParent />", () => {
  it("renders inside the parent modal window", () => {
    render(
      <Modal>
        <Modal.Body>outer</Modal.Body>
        <Modal withinParent>inner</Modal>
      </Modal>,
    );

    const [outerDialog, innerDialog] = screen.getAllByRole("dialog");
    expect(outerDialog).toContainElement(innerDialog);
    expect(innerDialog).toHaveClass("root_contained");
  });

  it("falls back to document body without a parent modal", () => {
    render(<Modal withinParent>alone</Modal>);

    const dialog = screen.getByRole("dialog");
    expect(dialog.parentElement).toBe(document.body);
    expect(dialog).not.toHaveClass("root_contained");
  });
});
