import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Sheet } from "..";

describe("Sheet", () => {
  it("labels the dialog and preserves uncontrolled and controlled heights", () => {
    const onOpenChange = jest.fn();
    const { rerender } = render(
      <Sheet
        open
        onOpenChange={onOpenChange}
        title="Settings"
        description="Preferences"
        snapPoints={["30vh", "60vh"]}
        defaultSnapPoint="60vh"
      >
        Content
      </Sheet>,
    );
    expect(screen.getByRole("dialog").getAttribute("aria-labelledby")).toBe(
      screen.getByText("Settings").id,
    );
    expect(screen.getByRole("dialog").getAttribute("aria-describedby")).toBe(
      screen.getByText("Preferences").id,
    );
    expect(screen.getByRole("dialog").style.height).toBe("60vh");
    rerender(
      <Sheet
        open
        onOpenChange={onOpenChange}
        snapPoints={["30vh", "60vh"]}
        snapPoint="30vh"
      />,
    );
    expect(screen.getByRole("dialog").style.height).toBe("30vh");
  });

  it("requests close on Escape and overlay click and respects opt-outs", () => {
    const onOpenChange = jest.fn();
    const { rerender } = render(
      <Sheet open onOpenChange={onOpenChange} title="Settings" />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "escape");
    fireEvent.click(
      screen.getByRole("dialog").previousElementSibling as HTMLElement,
    );
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "overlay");
    onOpenChange.mockClear();
    rerender(
      <Sheet
        open
        onOpenChange={onOpenChange}
        closeOnEscape={false}
        closeOnOverlayClick={false}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.click(
      screen.getByRole("dialog").previousElementSibling as HTMLElement,
    );
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("traps Tab in modal mode and restores body scrolling", () => {
    const previousOverflow = document.body.style.overflow;
    const { unmount } = render(
      <Sheet open onOpenChange={jest.fn()}>
        <button>First</button>
        <button>Last</button>
      </Sheet>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    screen.getByText("Last").focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByText("First"));
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(screen.getByText("Last"));
    unmount();
    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it("leaves scrolling and keyboard focus unrestricted in non-modal mode", () => {
    const previousOverflow = document.body.style.overflow;
    render(
      <Sheet open onOpenChange={jest.fn()} modal={false}>
        <button>Action</button>
      </Sheet>,
    );
    expect(screen.getByRole("dialog").hasAttribute("aria-modal")).toBe(false);
    expect(screen.getByRole("dialog").previousElementSibling).toBeNull();
    expect(document.body.style.overflow).toBe(previousOverflow);
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("has no axe violations", async () => {
    const { baseElement } = render(
      <Sheet open onOpenChange={jest.fn()} title="Settings">
        Content
      </Sheet>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });

  it("calls onClosed once the closing animation has finished", () => {
    jest.useFakeTimers();
    const onClosed = jest.fn();
    const { rerender } = render(
      <Sheet open onOpenChange={jest.fn()} onClosed={onClosed} title="Settings">
        Content
      </Sheet>,
    );

    rerender(
      <Sheet
        open={false}
        onOpenChange={jest.fn()}
        onClosed={() => onClosed()}
        title="Settings"
      >
        Content
      </Sheet>,
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(onClosed).not.toHaveBeenCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onClosed).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
