import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { Drawer, DrawerContent } from "..";

describe("Drawer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("calls onClosed once the closing animation has finished", () => {
    const onClosed = jest.fn();
    const { rerender } = render(
      <Drawer aria-label="Settings" opened onClosed={onClosed}>
        <DrawerContent>Content</DrawerContent>
      </Drawer>,
    );

    rerender(
      <Drawer aria-label="Settings" opened={false} onClosed={() => onClosed()}>
        <DrawerContent>Content</DrawerContent>
      </Drawer>,
    );
    expect(screen.getByText("Content")).toBeTruthy();
    expect(onClosed).not.toHaveBeenCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText("Content")).toBeNull();
    expect(onClosed).toHaveBeenCalledTimes(1);
  });

  it("does not call onClosed while it stays open", () => {
    const onClosed = jest.fn();
    render(
      <Drawer aria-label="Settings" opened onClosed={onClosed}>
        <DrawerContent>Content</DrawerContent>
      </Drawer>,
    );

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onClosed).not.toHaveBeenCalled();
  });

  it("keeps focus and scroll lock when the parent passes a new onClose", () => {
    const drawer = () => (
      <Drawer aria-label="Profile" opened onClose={() => undefined}>
        <DrawerContent>
          <input aria-label="First" />
          <input aria-label="Second" />
        </DrawerContent>
      </Drawer>
    );
    const { rerender } = render(drawer());
    act(() => {
      jest.runOnlyPendingTimers();
    });

    const second = screen.getByLabelText("Second");
    second.focus();
    rerender(drawer());
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(document.activeElement).toBe(second);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("calls the latest onClose on Escape", () => {
    const first = jest.fn();
    const latest = jest.fn();
    const { rerender } = render(
      <Drawer aria-label="Profile" opened onClose={first} />,
    );
    rerender(<Drawer aria-label="Profile" opened onClose={latest} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });
});
