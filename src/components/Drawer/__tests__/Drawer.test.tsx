import React from "react";
import { act, render, screen } from "@testing-library/react";

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
});
