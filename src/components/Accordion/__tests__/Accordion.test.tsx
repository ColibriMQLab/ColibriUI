import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Accordion } from "..";

type ResizeCallback = () => void;

describe("<Accordion />", () => {
  let resizeCallbacks: ResizeCallback[];
  const originalResizeObserver = global.ResizeObserver;

  beforeEach(() => {
    resizeCallbacks = [];
    global.ResizeObserver = class {
      constructor(callback: ResizeCallback) {
        resizeCallbacks.push(callback);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  const getContent = () =>
    screen.getByText("Body").parentElement?.parentElement as HTMLElement;

  const mockScrollHeight = (height: number) => {
    const inner = screen.getByText("Body").parentElement as HTMLElement;
    Object.defineProperty(inner, "scrollHeight", {
      configurable: true,
      value: height,
    });
  };

  it("is collapsed by default", () => {
    render(
      <Accordion title="Title">
        <div>Body</div>
      </Accordion>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(getContent()).toHaveStyle({ blockSize: "0" });
  });

  it("toggles on click", () => {
    render(
      <Accordion title="Title">
        <div>Body</div>
      </Accordion>,
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(getContent()).toHaveStyle({ blockSize: "0" });
  });

  it("is expanded initially when defaultOpen is true", () => {
    render(
      <Accordion title="Title" defaultOpen>
        <div>Body</div>
      </Accordion>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("updates the height when the expanded content resizes", () => {
    render(
      <Accordion title="Title" defaultOpen>
        <div>Body</div>
      </Accordion>,
    );

    mockScrollHeight(240);
    act(() => resizeCallbacks.forEach((callback) => callback()));

    expect(getContent()).toHaveStyle({ blockSize: "240px" });
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Accordion title="Title" defaultOpen>
        <div>Body</div>
      </Accordion>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
