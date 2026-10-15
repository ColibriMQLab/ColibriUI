import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
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

describe("<Modal /> focus", () => {
  it("moves focus to the first focusable element and restores it on close", () => {
    const { rerender } = render(<button type="button">Open</button>);
    const trigger = screen.getByText("Open");
    trigger.focus();

    rerender(
      <>
        <button type="button">Open</button>
        <Modal>
          <Modal.Body>
            <div role="button" tabIndex={0}>
              Select
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div tabIndex={0}>Custom</div>
          </Modal.Footer>
        </Modal>
      </>,
    );

    expect(screen.getByLabelText("Close modal")).toHaveFocus();

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(screen.getByText("Custom")).toHaveFocus();

    rerender(<button type="button">Open</button>);
    expect(trigger).toHaveFocus();
  });

  it("returns focus to the outer modal when a nested modal closes", () => {
    const { rerender } = render(<Modal>outer</Modal>);
    const outerClose = screen.getByLabelText("Close modal");
    expect(outerClose).toHaveFocus();

    rerender(
      <>
        <Modal>outer</Modal>
        <Modal>inner</Modal>
      </>,
    );
    expect(screen.getAllByLabelText("Close modal")[1]).toHaveFocus();

    rerender(<Modal>outer</Modal>);
    expect(screen.getByLabelText("Close modal")).toHaveFocus();
  });

  it("keeps focus on autofocused content and restores it on close", () => {
    const { rerender } = render(<button type="button">Open</button>);
    const trigger = screen.getByText("Open");
    trigger.focus();

    rerender(
      <>
        <button type="button">Open</button>
        <Modal>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input aria-label="Name" autoFocus />
        </Modal>
      </>,
    );
    expect(screen.getByLabelText("Name")).toHaveFocus();

    rerender(<button type="button">Open</button>);
    expect(trigger).toHaveFocus();
  });

  it("leaves focus in the remaining modal when a lower one closes", () => {
    const { rerender } = render(<button type="button">Open</button>);
    const trigger = screen.getByText("Open");
    trigger.focus();

    rerender(
      <>
        <button type="button">Open</button>
        <Modal key="a">a</Modal>
      </>,
    );
    rerender(
      <>
        <button type="button">Open</button>
        <Modal key="a">a</Modal>
        <Modal key="b">b</Modal>
      </>,
    );
    const closeB = screen.getAllByLabelText("Close modal")[1];
    expect(closeB).toHaveFocus();

    rerender(
      <>
        <button type="button">Open</button>
        <Modal key="b">b</Modal>
      </>,
    );
    expect(closeB).toHaveFocus();

    rerender(<button type="button">Open</button>);
    expect(trigger).toHaveFocus();
  });

  it("skips disabled and non-focusable elements when wrapping Tab", () => {
    render(
      <Modal>
        <Modal.Body>
          <input aria-label="Name" />
          <div role="button">Not focusable</div>
          <button type="button" disabled tabIndex={0}>
            Disabled
          </button>
        </Modal.Body>
      </Modal>,
    );
    const close = screen.getByLabelText("Close modal");
    const input = screen.getByLabelText("Name");
    expect(close).toHaveFocus();

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(input).toHaveFocus();

    fireEvent.keyDown(document, { key: "Tab" });
    expect(close).toHaveFocus();
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

  it("fills the parent window only with withinParent and fillParent", () => {
    render(
      <Modal>
        <Modal.Body>outer</Modal.Body>
        <Modal withinParent>inset</Modal>
        <Modal withinParent fillParent>
          fill
        </Modal>
        <Modal fillParent>ignored</Modal>
      </Modal>,
    );

    const windowOf = (text: string) =>
      screen.getByText(text).closest("[class*='modal-wrapper']");
    expect(windowOf("fill")).toHaveClass("modal-wrapper_fill");
    expect(windowOf("inset")).not.toHaveClass("modal-wrapper_fill");
    expect(windowOf("ignored")).not.toHaveClass("modal-wrapper_fill");
    expect(windowOf("outer")).not.toHaveClass("modal-wrapper_fill");
  });

  it("has no axe violations", async () => {
    const { baseElement } = render(
      <Modal title="Title" onClose={jest.fn()}>
        content
      </Modal>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
